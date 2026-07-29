import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {
  Home, Building2, Factory, Waves, BatteryFull,
  ShieldCheck, Car, CalendarRange, ArrowUpRight,
  Star, Zap, Phone, CheckCircle2, X, MapPin, Award
} from 'lucide-react';

/* ── Animated counter ── */
function useCounter(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function Services() {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedService, setSelectedService] = useState(null);
  const [sectionRef, inView] = useInView();

  const mw      = useCounter(350,  1800, inView);
  const proj    = useCounter(15000, 2000, inView);
  const yrs     = useCounter(20,   1600, inView);
  const success = useCounter(98,   1500, inView);

  const t = {
    en: {
      tag: 'OUR SOLAR SERVICES',
      title: 'Premium Sustainable\nSolar Engineering',
      desc: 'SunVoit provides custom solar integration with grid-level reliability and luxury architectural aesthetics.',
      divider: 'Trusted by 15,000+ Customers',
      learnMore: 'Learn More',
      getQuote: 'Get Free Quote',
      viewDetails: 'View Details →',
      bottomCta: 'Need a Custom Solar Solution?',
      consultBtn: 'Get Free Consultation',
      callBtn: '📞 Call Expert Now',
      overlay1: '25 Year Warranty',
      overlay2: 'Free Survey',
    },
    hi: {
      tag: 'हमारी सौर सेवाएं',
      title: 'प्रीमियम और टिकाऊ\nसोलर इंजीनियरिंग',
      desc: 'सनवोइट ग्रिड-स्तर की विश्वसनीयता और शानदार आर्किटेक्चरल सौंदर्य के साथ कस्टम सोलर एकीकरण प्रदान करता है।',
      divider: '15,000+ ग्राहकों का विश्वास',
      learnMore: 'अधिक जानें',
      getQuote: 'मुफ़्त कोट लें',
      viewDetails: 'विवरण देखें →',
      bottomCta: 'कस्टम सोलर समाधान चाहिए?',
      consultBtn: 'मुफ़्त परामर्श लें',
      callBtn: '📞 विशेषज्ञ को कॉल करें',
      overlay1: '25 साल वारंटी',
      overlay2: 'मुफ़्त सर्वे',
    }
  }[language];

  const filters = ['All', 'Residential', 'Commercial', 'Industrial', 'Maintenance'];

  const services = [
    {
      icon: Home, category: 'Residential',
      badge: { text: '⭐ Most Popular', color: 'bg-yellow-500' },
      title: language === 'en' ? 'Residential Solar'    : 'आवासीय सोलर',
      desc:  language === 'en' ? 'Sleek roof panels designed to match premium architecture while reducing electric bills to zero.' : 'बिजली बिल को शून्य करते हुए प्रीमियम घरों के लिए अनुकूलित रूफ पैनल।',
      img: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80',
      features: ['25 Year Warranty', 'Free Installation', 'Government Subsidy'],
      price: '₹49,999', emi: '₹999/month',
      rating: 4.9, reviews: 2300,
      time: '2–3 Days', efficiency: '99.5%', warranty: '25 Years',
    },
    {
      icon: Building2, category: 'Commercial',
      badge: { text: '🔥 Best Seller', color: 'bg-orange-500' },
      title: language === 'en' ? 'Commercial Solar'    : 'व्यावसायिक सोलर',
      desc:  language === 'en' ? 'Increase ROI for office buildings, malls, and shops with customized commercial solar configurations.' : 'कार्यालय भवनों और मॉल के लिए अनुकूलित व्यावसायिक सौर ऊर्जा।',
      img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
      features: ['25 Year Warranty', 'Priority Support', 'Tax Benefits'],
      price: '₹1,99,999', emi: '₹4,999/month',
      rating: 4.8, reviews: 1850,
      time: '5–7 Days', efficiency: '99.2%', warranty: '25 Years',
    },
    {
      icon: Factory, category: 'Industrial',
      badge: { text: '⚡ Fast Install', color: 'bg-blue-500' },
      title: language === 'en' ? 'Industrial Solar'    : 'औद्योगिक सोलर',
      desc:  language === 'en' ? 'Heavy-duty MW installations with double-glass tracking modules built to withstand manufacturing loads.' : 'विनिर्माण भार के लिए डबल-ग्लास ट्रैकिंग मॉड्यूल वाले बड़े सिस्टम।',
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
      features: ['MW Scale Ready', 'Dedicated Manager', 'Custom Design'],
      price: '₹9,99,999', emi: '₹24,999/month',
      rating: 4.9, reviews: 920,
      time: '15–30 Days', efficiency: '99.8%', warranty: '25 Years',
    },
    {
      icon: Waves, category: 'Residential',
      badge: { text: '🌱 Eco Friendly', color: 'bg-green-600' },
      title: language === 'en' ? 'Solar Water Heater' : 'सौर जल हीटर',
      desc:  language === 'en' ? 'ETC vacuum pressurized collectors delivering scalding hot water under zero grid electrical supply.' : 'बिना ग्रिड बिजली के गर्म पानी प्रदान करने वाले उच्च क्षमता वाले वैक्यूम हीटर।',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
      features: ['Zero Electricity', '5 Year Warranty', 'Easy Install'],
      price: '₹24,999', emi: '₹599/month',
      rating: 4.7, reviews: 1200,
      time: '1–2 Days', efficiency: '92%', warranty: '5 Years',
    },
    {
      icon: BatteryFull, category: 'Residential',
      badge: { text: '💰 Save 70% Bills', color: 'bg-purple-600' },
      title: language === 'en' ? 'Battery Storage'    : 'बैटरी स्टोरेज',
      desc:  language === 'en' ? 'Integrated smart lithium cells providing seamless power backup during grid power shutdowns.' : 'ग्रिड बंद होने के दौरान निर्बाध बैकअप प्रदान करने वाली स्मार्ट लिथियम बैटरी।',
      img: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
      features: ['10-Year Battery Life', 'Smart BMS', 'App Monitoring'],
      price: '₹89,999', emi: '₹1,999/month',
      rating: 4.8, reviews: 780,
      time: '1 Day', efficiency: '98%', warranty: '10 Years',
    },
    {
      icon: ShieldCheck, category: 'Maintenance',
      badge: { text: '⚡ Fast Service', color: 'bg-blue-500' },
      title: language === 'en' ? 'Solar Maintenance'  : 'सौर रखरखाव',
      desc:  language === 'en' ? 'Thermal imaging scans, cell cleaning audits, and structure load testing for maximum panel performance.' : 'थर्मल इमेजिंग स्कैन, cell cleaning और structure load testing।',
      img: '/solar-maintenance.png',
      features: ['Thermal Imaging', '24/7 Support', 'Performance Report'],
      price: '₹2,999', emi: null,
      rating: 4.9, reviews: 3100,
      time: 'Same Day', efficiency: '100%', warranty: 'Service Warranty',
    },


    {
      icon: CalendarRange, category: 'Maintenance',
      badge: { text: '⭐ Most Popular', color: 'bg-yellow-500' },
      title: language === 'en' ? 'AMC Services'       : 'एएमसी सेवाएं',
      desc:  language === 'en' ? 'Annual Maintenance Contracts giving you premium guaranteed system uptime and 24/7 technical help.' : 'वार्षिक रखरखाव अनुबंध — गारंटीकृत अपटाइम और चौबीसों घंटे सहायता।',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      features: ['Quarterly Visits', 'Priority Response', '24/7 Helpline'],
      price: '₹9,999/yr', emi: null,
      rating: 4.8, reviews: 2200,
      time: 'Ongoing', efficiency: '99%', warranty: 'Full Year',
    },
  ];

  const filtered = activeFilter === 'All'
    ? services
    : services.filter(s => s.category === activeFilter);

  return (
    <>
    <section id="services" ref={sectionRef} className="relative py-20 overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/40 to-emerald-50/30 dark:from-solar-bgDark dark:via-solar-bgDark/90 dark:to-green-950/20" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-solar-primary/6 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-solar-secondary/5 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-solar-yellow/4 blur-2xl animate-float-slow" style={{ animationDelay: '4s' }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-solar-primary/20 animate-ping"
            style={{ top: `${15 + i * 14}%`, left: `${8 + i * 14}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${2.5 + i * 0.3}s` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">

        {/* ── Header ── */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-sm font-extrabold tracking-[0.25em] text-solar-primary uppercase">{t.tag}</span>
            <h2 className="text-3xl sm:text-5xl font-black text-solar-textDark dark:text-white leading-tight" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}>
              {t.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{t.desc}</p>

            {/* Section Divider */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-gradient-to-r from-solar-primary/40 to-transparent" />
              <span className="text-xs font-semibold text-solar-primary whitespace-nowrap">{t.divider}</span>
              <div className="h-px flex-1 bg-gradient-to-l from-solar-primary/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-solar-primary text-white shadow-lg shadow-solar-primary/30 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-solar-primary hover:text-solar-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                onClick={() => setSelectedService(srv)}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-850 border border-gray-100 dark:border-gray-800 flex flex-col shadow-sm
                  hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)] hover:-translate-y-3 hover:border-solar-primary/40 transition-all duration-500 cursor-pointer"
                style={{ minHeight: '440px' }}
              >
                {/* ── Image with overlay ── */}
                <div className="h-44 overflow-hidden relative flex-shrink-0">
                  <img
                    src={srv.img.startsWith('http') ? srv.img : `${import.meta.env.BASE_URL}${srv.img.replace(/^\//, '')}`}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700"
                  />
                  {/* Always-on gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Hover overlay — slides up */}
                  <div className="absolute inset-0 bg-solar-primary/80 flex flex-col items-center justify-center gap-3
                    opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="flex gap-3">
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/30">
                        ✓ {t.overlay1}
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/30">
                        ✓ {t.overlay2}
                      </span>
                    </div>
                    <span className="text-white/90 text-sm font-bold">{t.viewDetails}</span>
                  </div>

                  {/* Badge top-right */}
                  <div className={`absolute top-3 right-3 ${srv.badge.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg`}>
                    {srv.badge.text}
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute -bottom-5 left-5 w-11 h-11 rounded-full bg-gradient-to-tr from-solar-primary to-solar-secondary flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-gray-850 z-10 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={18} />
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="p-5 pt-8 flex-1 flex flex-col gap-3 text-left">

                  {/* Title */}
                  <h3 className="font-bold text-base text-solar-textDark dark:text-white group-hover:text-solar-primary transition-colors leading-tight">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed line-clamp-2">
                    {srv.desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-1">
                    {srv.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                        <CheckCircle2 size={11} className="text-solar-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Comparison labels */}
                  <div className="flex gap-3">
                    <div className="text-center">
                      <div className="text-xs font-extrabold text-solar-primary">{srv.efficiency}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Efficiency</div>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-gray-700" />
                    <div className="text-center">
                      <div className="text-xs font-extrabold text-solar-primary">{srv.warranty}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Warranty</div>
                    </div>
                    <div className="w-px bg-gray-200 dark:bg-gray-700" />
                    <div className="text-center">
                      <div className="text-xs font-extrabold text-solar-textDark dark:text-white">{srv.time}</div>
                      <div className="text-[9px] text-gray-400 uppercase tracking-wide">Install</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < Math.floor(srv.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-solar-textDark dark:text-white">{srv.rating}</span>
                    <span className="text-[10px] text-gray-400">({srv.reviews.toLocaleString()} Reviews)</span>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-auto">
                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Starting From</div>
                    <div className="text-base font-extrabold text-solar-textDark dark:text-white">{srv.price}</div>
                    {srv.emi && <div className="text-[10px] text-solar-primary font-semibold">or {srv.emi} EMI</div>}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => navigate('/contact')}
                      className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-solar-primary text-white rounded-xl text-xs font-semibold hover:bg-solar-secondary transition-colors"
                    >
                      <Zap size={11} className="text-yellow-300" />
                      {t.getQuote}
                    </button>
                    <button
                      onClick={() => navigate('/services')}
                      className="flex items-center gap-1 py-2.5 px-3 border border-solar-primary text-solar-primary rounded-xl text-xs font-semibold hover:bg-solar-primary hover:text-white transition-all group/btn"
                    >
                      {t.learnMore}
                      <ArrowUpRight size={11} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="text-center space-y-5 py-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-solar-textDark dark:text-white">{t.bottomCta}</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3.5 bg-gradient-to-r from-solar-primary to-solar-secondary text-white rounded-xl font-semibold text-sm hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Zap size={15} className="text-yellow-300" />
              {t.consultBtn}
            </button>
            <a
              href="tel:+919876543210"
              className="px-8 py-3.5 border-2 border-solar-primary text-solar-primary rounded-xl font-semibold text-sm hover:bg-solar-primary hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Phone size={14} />
              {t.callBtn}
            </a>
          </div>
        </div>

      </div>
    </section>

      {selectedService && (() => {
        const srv = selectedService;
        const Icon = srv.icon;
        const steps = [
          { n:'01', title:'Free Site Survey',   desc:'Our expert visits, measures rooftop area and evaluates solar potential.' },
          { n:'02', title:'Custom Design',       desc:'Optimal system — panel type, inverter, battery & wiring plan.' },
          { n:'03', title:'Govt. Subsidy',       desc:'We file all MNRE subsidy and DISCOM net-metering paperwork for you.' },
          { n:'04', title:'Installation',        desc:'Certified engineers install within the promised timeline, zero mess.' },
          { n:'05', title:'Handover & Training', desc:'App setup, training, 25-year warranty card & 24/7 support activation.' },
        ];
        const faqs = [
          { q:'How long does installation take?', a:`${srv.time} after approval.` },
          { q:'Is government subsidy available?',  a:'Yes! Up to ₹78,000 MNRE subsidy for residential systems.' },
          { q:'What warranty do I get?',           a:`${srv.warranty} on panels & inverter + 1 year free AMC.` },
          { q:'Do you handle all paperwork?',      a:'Yes — DISCOM, MNRE subsidy, net-metering all handled by us.' },
        ];
        return (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedService(null)}>
            <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-solar-bgDark rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-slide-up" onClick={e => e.stopPropagation()}>

              <div className="relative h-52 overflow-hidden rounded-t-3xl">
                <img src={srv.img.startsWith('http') ? srv.img : `${import.meta.env.BASE_URL}${srv.img.replace(/^\//, '')}`} alt={srv.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all"><X size={20} /></button>
                <div className={`absolute top-4 left-4 ${srv.badge.color} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>{srv.badge.text}</div>
                <div className="absolute bottom-4 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-solar-primary to-solar-secondary flex items-center justify-center text-white"><Icon size={16} /></div>
                      <span className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider">{srv.category}</span>
                    </div>
                    <h2 className="text-white text-lg sm:text-2xl font-extrabold" style={{letterSpacing:'-0.03em'}}>{srv.title}</h2>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-white/60 text-[9px] sm:text-[10px] uppercase">Starting From</div>
                    <div className="text-white text-base sm:text-xl font-extrabold">{srv.price}</div>
                    {srv.emi && <div className="text-solar-yellow text-[10px] sm:text-[11px] font-semibold">{srv.emi} EMI</div>}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex flex-wrap gap-4 items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">{[...Array(5)].map((_,i)=><Star key={i} size={13} className={i<Math.floor(srv.rating)?'fill-yellow-400 text-yellow-400':'text-gray-300'}/>)}</div>
                    <span className="font-bold text-sm">{srv.rating}</span>
                    <span className="text-xs text-gray-400">({srv.reviews.toLocaleString()} Reviews)</span>
                  </div>
                  <div className="flex gap-5">
                    {[{val:srv.efficiency,lbl:'Efficiency'},{val:srv.warranty,lbl:'Warranty'},{val:srv.time,lbl:'Timeline'}].map((s,i)=>(
                      <div key={i} className="text-center">
                        <div className="text-sm font-extrabold text-solar-primary">{s.val}</div>
                        <div className="text-[10px] text-gray-400 uppercase">{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-solar-textDark dark:text-white mb-2">About This Service</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{srv.desc}</p>
                </div>

                <div>
                  <h3 className="font-bold text-base text-solar-textDark dark:text-white mb-3">What's Included</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[...srv.features,'MNRE Approved Equipment','Dedicated Project Manager','App-Based Monitoring','Free Site Survey'].map((f,i)=>(
                      <div key={i} className="flex items-center gap-2.5 p-3 bg-solar-primary/5 dark:bg-solar-primary/10 rounded-xl">
                        <CheckCircle2 size={13} className="text-solar-primary flex-shrink-0"/>
                        <span className="text-sm font-medium text-solar-textDark dark:text-white">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-solar-textDark dark:text-white mb-3">Installation Process</h3>
                  <div className="space-y-2.5">
                    {steps.map((step,i)=>(
                      <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl hover:bg-solar-primary/5 transition-colors">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-solar-primary to-solar-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{step.n}</div>
                        <div>
                          <div className="font-bold text-sm text-solar-textDark dark:text-white">{step.title}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{step.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-solar-textDark dark:text-white mb-3">Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    {faqs.map((faq,i)=>(
                      <details key={i} className="group border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
                        <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-sm text-solar-textDark dark:text-white list-none">
                          {faq.q}<span className="text-solar-primary group-open:rotate-45 transition-transform text-lg leading-none ml-2 flex-shrink-0">+</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</div>
                      </details>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 py-3 border-t border-gray-100 dark:border-gray-800">
                  {['MNRE Approved','ISO 9001','NABCEP Certified','Govt. Registered'].map((c,i)=>(
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-solar-primary/8 border border-solar-primary/20 rounded-full text-xs font-semibold text-solar-primary">
                      <Award size={10}/> {c}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1 sticky bottom-0 bg-white dark:bg-solar-bgDark pb-2">
                  <button onClick={()=>{setSelectedService(null);navigate('/calculator');}} className="flex-1 py-3.5 bg-gradient-to-r from-solar-primary to-solar-secondary text-white rounded-xl font-bold text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <Zap size={15} className="text-yellow-300"/> Get Free Quote
                  </button>
                  <a href="tel:+919876543210" className="flex-1 py-3.5 border-2 border-solar-primary text-solar-primary rounded-xl font-bold text-sm hover:bg-solar-primary hover:text-white transition-all flex items-center justify-center gap-2">
                    <Phone size={14}/> 📞 Call Expert Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
