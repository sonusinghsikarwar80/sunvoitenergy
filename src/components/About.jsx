import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Target, Eye, CheckCircle2, Award, ShieldCheck,
  Play, X, Quote, TrendingUp, Star, Leaf, Trophy,
  MapPin, Calendar, Zap, ArrowRight, Download
} from 'lucide-react';

/* ── Animated counter hook ── */
function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

/* ── Intersection observer hook ── */
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ── Animated Progress Bar ── */
function ProgressBar({ label, pct, inView }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(pct), 200);
      return () => clearTimeout(t);
    }
  }, [inView, pct]);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm font-semibold text-solar-textDark dark:text-white">
        <span>{label}</span>
        <span className="text-solar-primary">{pct}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-solar-primary to-solar-secondary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('story');
  const [showVideo, setShowVideo] = useState(false);
  const [sectionRef, inView] = useInView(0.2);

  const years    = useCounter(20,  1800, inView);
  const mw       = useCounter(350, 2000, inView);
  const customers = useCounter(15000, 2200, inView);
  const rating   = useCounter(98, 1600, inView);

  const t = {
    en: {
      tag: 'ABOUT SUNVOIT ENERGY',
      title: 'Powering a Brighter Future with Solar Innovation',
      story: 'Founded in 2006, SunVoit Energy has grown from a local residential installer to an international tier-1 solar developer. We believe in providing clean energy options that reduce monthly operational costs while protecting our planet.',
      mission: 'Our mission is to accelerate the adoption of clean solar energy by providing luxury engineering, affordable pricing, and lifetime service support.',
      vision: 'To build a smart-grid future where every home and factory produces more clean energy than it consumes, fostering total environmental harmony.',
      storyTab: 'Our Story', missionTab: 'Our Mission', visionTab: 'Our Vision',
      value1: 'Innovation first', value2: 'Customer obsessed',
      value3: 'Sustainable practices', value4: 'Uncompromising safety',
      ceoQuote: '"Our mission is to make clean energy affordable for every home and business in India and beyond."',
      ceoName: '— Rajiv Sharma, CEO & Founder, SunVoit Energy',
      ctaConsult: 'Get Free Consultation',
      ctaDownload: 'Download Company Profile',
    },
    hi: {
      tag: 'सनवोइट एनर्जी के बारे में',
      title: 'सौर नवाचार के साथ उज्जवल भविष्य',
      story: '2006 में स्थापित, सनवोइट एनर्जी एक अग्रणी अंतरराष्ट्रीय टियर-1 सौर डेवलपर है। हम घरों, व्यवसायों और उद्योगों के लिए किफायती स्वच्छ ऊर्जा समाधान प्रदान करते हैं।',
      mission: 'हमारा मिशन उच्च-गुणवत्ता सौर इंजीनियरिंग, किफायती मूल्य और आजीवन सहायता के साथ स्वच्छ ऊर्जा को सुलभ बनाना है।',
      vision: 'एक ऐसे भविष्य का निर्माण जहाँ हर घर और कारखाना अपनी ज़रूरत से ज़्यादा स्वच्छ ऊर्जा उत्पन्न करे।',
      storyTab: 'हमारी कहानी', missionTab: 'हमारा उद्देश्य', visionTab: 'हमारी दृष्टि',
      value1: 'नवाचार प्रथम', value2: 'ग्राहक सर्वोपरि',
      value3: 'सतत अभ्यास', value4: 'सुरक्षा अनिवार्य',
      ceoQuote: '"हमारा लक्ष्य है कि स्वच्छ ऊर्जा हर घर और व्यवसाय के लिए सुलभ हो।"',
      ceoName: '— राजीव शर्मा, सीईओ और संस्थापक, सनवोइट एनर्जी',
      ctaConsult: 'मुफ़्त परामर्श लें',
      ctaDownload: 'कंपनी प्रोफ़ाइल डाउनलोड करें',
    }
  }[language];

  const timeline = [
    { year: '2006', title: 'Company Founded',        desc: 'Started with residential rooftop solar installations in Jaipur.' },
    { year: '2012', title: '100 MW Installed',        desc: 'Crossed 100 MW milestone and expanded to commercial sector.' },
    { year: '2018', title: 'International Expansion', desc: 'Entered international markets; launched hybrid battery storage.' },
    { year: '2026', title: '350 MW+ Capacity',        desc: 'Surpassed 350 MW total installed capacity — now a global brand.' },
  ];

  const certs = [
    { icon: ShieldCheck, label: 'ISO 9001 Certified' },
    { icon: Award,       label: 'NABCEP Certified' },
    { icon: CheckCircle2, label: 'Government Approved' },
    { icon: ShieldCheck, label: '25 Year Warranty' },
  ];

  const partners = ['Tesla', 'ABB', 'Siemens', 'Schneider', 'Tata Power', 'Adani Solar'];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-solar-bgLight/30 dark:bg-solar-bgDark/40"
    >
      {/* ── Background Decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-solar-primary/6 blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full bg-solar-secondary/8 blur-2xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-solar-yellow/5 blur-2xl animate-float-slow" style={{ animationDelay: '3s' }} />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-solar-primary/30 animate-ping"
            style={{
              top: `${10 + i * 12}%`,
              left: `${5 + i * 11}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">

        {/* ══════════ ROW 1: Image + Story Content ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ── LEFT: Premium Image Card ── */}
          <div className="relative group">
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-solar-primary/20 to-solar-secondary/10 rounded-[36px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="relative rounded-[28px] overflow-hidden shadow-2xl border border-white/20 cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              {/* Looping background video preview */}
              <video
                src={`${import.meta.env.BASE_URL}about-video.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />
            </div>

            {/* ── Experience Stats Grid (below image) ── */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              {[
                { val: `${years}+`, lbl: 'Years Experience', icon: '🏆' },
                { val: `${mw} MW+`, lbl: 'Solar Installed', icon: '⚡' },
                { val: customers >= 15000 ? '15K+' : `${Math.floor(customers/1000)}K+`, lbl: 'Happy Customers', icon: '😊' },
                { val: `${rating}%`, lbl: 'Satisfaction Rate', icon: '⭐' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-4 border border-gray-100 dark:border-gray-800 flex items-center gap-3 hover:shadow-md transition-all">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="text-xl font-extrabold text-solar-primary leading-none">{stat.val}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">{stat.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Story Content ── */}
          <div className="text-left space-y-7">
            <div className="space-y-3 max-w-xl">
              <span className="text-xs font-black tracking-[0.28em] text-solar-primary uppercase block">{t.tag}</span>
              <h2 className="text-3xl lg:text-[38px] font-black text-solar-textDark dark:text-white leading-[1.12]" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", letterSpacing: '-0.04em' }}>
                {t.title}
              </h2>
            </div>

            {/* Tab switchers */}
            <div className="flex border-b border-gray-200 dark:border-gray-800 gap-6">
              {[
                { id: 'story', label: t.storyTab },
                { id: 'mission', label: t.missionTab },
                { id: 'vision', label: t.visionTab },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 font-bold text-sm uppercase border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-solar-primary text-solar-primary'
                      : 'border-transparent text-gray-400 hover:text-solar-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-[120px]">
              {activeTab === 'story' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">{t.story}</p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {[t.value1, t.value2, t.value3, t.value4].map((v, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-semibold text-solar-textDark dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-solar-secondary flex-shrink-0" />
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'mission' && (
                <div className="flex gap-4 items-start animate-fade-in">
                  <div className="p-3 bg-solar-primary/10 rounded-2xl text-solar-primary mt-1 flex-shrink-0">
                    <Target size={22} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.mission}</p>
                </div>
              )}
              {activeTab === 'vision' && (
                <div className="flex gap-4 items-start animate-fade-in">
                  <div className="p-3 bg-solar-secondary/10 rounded-2xl text-solar-secondary mt-1 flex-shrink-0">
                    <Eye size={22} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t.vision}</p>
                </div>
              )}
            </div>

            {/* ── CEO Quote Box ── */}
            <div className="relative bg-gradient-to-br from-solar-primary/8 to-solar-secondary/5 border border-solar-primary/20 rounded-2xl p-5">
              <Quote size={32} className="text-solar-primary/30 absolute top-4 left-4" />
              <p className="text-sm font-medium italic text-solar-textDark dark:text-gray-200 leading-relaxed pl-6 pr-2">
                {t.ceoQuote}
              </p>
              <p className="text-xs text-solar-primary font-semibold mt-3 pl-6">{t.ceoName}</p>
            </div>

            {/* ── Achievement Badges ── */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-full text-xs font-semibold text-yellow-700 dark:text-yellow-400">
                <Star size={12} className="fill-yellow-500 text-yellow-500" /> 4.9 Rating
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-solar-primary/8 border border-solar-primary/20 rounded-full text-xs font-semibold text-solar-primary">
                <Trophy size={12} /> Best Solar Co. 2025
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-full text-xs font-semibold text-green-700 dark:text-green-400">
                <Leaf size={12} /> Carbon Neutral
              </div>
            </div>

            {/* ── CTA Buttons ── */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-solar-primary to-solar-secondary text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.01em' }}
              >
                <Zap size={15} className="text-yellow-300" />
                {t.ctaConsult}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 border-2 border-solar-primary text-solar-primary rounded-xl font-semibold text-sm hover:bg-solar-primary hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Download size={14} />
                {t.ctaDownload}
              </button>
            </div>
          </div>
        </div>



      </div>

      {/* ══════════ Video Modal ══════════ */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative bg-black rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all"
            >
              <X size={20} />
            </button>
            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={`${import.meta.env.BASE_URL}about-video.mp4`}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
