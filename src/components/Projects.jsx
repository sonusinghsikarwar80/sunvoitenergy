import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { showcaseProjects } from '../data/mockData';
import {
  Sliders, MapPin, Eye, Zap, Star, Trophy, Clock, CheckCircle2,
  Play, X, ArrowRight, ShieldCheck, HelpCircle, FileText
} from 'lucide-react';

/* ── Counter hook for stats ── */
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

function useInView(threshold = 0.2) {
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

export default function Projects() {
  const { language } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeGalleryImg, setActiveGalleryImg] = useState('slider'); // 'slider', 'before', 'after', 'drone'
  const [showVideo, setShowVideo] = useState(false);
  const [sectionRef, inView] = useInView();

  // Stats Counters
  const mwCount = useCounter(350, 1500, inView);
  const projCount = useCounter(15000, 1800, inView);
  const rateCount = useCounter(98, 1400, inView);
  const expCount = useCounter(20, 1200, inView);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

  const filtered = selectedCategory === 'All'
    ? showcaseProjects
    : showcaseProjects.filter(p => p.category === selectedCategory);

  const activeProj = showcaseProjects[activeProjectIdx] || showcaseProjects[0];

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleMapClick = (location) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  // Hardcoded premium stats per project (matching mockup data index)
  const projectDetailMap = {
    1: {
      statusBadge: '🏆 Award Winning',
      installTime: '12 Days',
      solarPanels: '42 Panels',
      co2Saved: '18 Tons / Yr',
      roi: '3.5 Years',
      clientReview: '"Excellent installation and outstanding support throughout the project."',
      clientName: 'Rajesh Sharma',
      clientRating: 5.0,
      lifetimeSavings: '₹42 Lakhs',
      elecSaved: '82%',
      carbonOffset: '420 Tons',
      technologies: ['Mono PERC Panels', 'Huawei Inverter', 'Lithium Battery', 'Smart Monitoring'],
      clientType: 'Luxury Villa',
      efficiency: '99.7%',
      warranty: '25 Year',
    },
    2: {
      statusBadge: '⚡ Live Project',
      installTime: '24 Days',
      solarPanels: '4,500 Panels',
      co2Saved: '1,200 Tons / Yr',
      roi: '4.2 Years',
      clientReview: '"Power generation exceeded our initial projections. Excellent industrial design."',
      clientName: 'Vikas Singhal (COO)',
      clientRating: 4.9,
      lifetimeSavings: '₹3.4 Crores',
      elecSaved: '75%',
      carbonOffset: '8,500 Tons',
      technologies: ['Bifacial N-Type Panels', 'Growatt Max Inverter', 'SCADA Grid Control', 'Substation Lock'],
      clientType: 'Manufacturing Unit',
      efficiency: '99.8%',
      warranty: '30 Year',
    },
    3: {
      statusBadge: '● Completed',
      installTime: '18 Days',
      solarPanels: '980 Panels',
      co2Saved: '320 Tons / Yr',
      roi: '3.9 Years',
      clientReview: '"Perfect integration with our building design. Great team and seamless delivery."',
      clientName: 'Priya Nair (TechPark Mgr)',
      clientRating: 5.0,
      lifetimeSavings: '₹88 Lakhs',
      elecSaved: '80%',
      carbonOffset: '2,200 Tons',
      technologies: ['High Efficiency Mono Panels', 'SMA Sunny Inverter', '200kWh Storage Vault', 'EV Smart Chargers'],
      clientType: 'IT TechPark',
      efficiency: '99.5%',
      warranty: '25 Year',
    }
  };

  const details = projectDetailMap[activeProj.id] || projectDetailMap[1];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-solar-bgLight/40 via-green-50/10 to-emerald-50/20 dark:from-solar-bgDark dark:via-solar-bgDark/95 dark:to-green-950/10"
    >
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-solar-primary/5 blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-solar-secondary/6 blur-3xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* ══════════ Section Header ══════════ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 text-left">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold tracking-[0.22em] text-solar-primary uppercase block">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-solar-textDark dark:text-white uppercase leading-none tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Explore our landmark residential installations, factory rooftops, and commercial solar grids.
            </p>
          </div>

          {/* Categories / Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-solar-primary text-white border-solar-primary shadow-lg shadow-solar-primary/25 scale-105'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-solar-textDark dark:text-gray-300 hover:border-solar-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ Statistics Row ══════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: `${mwCount} MW+`, label: 'Installed', icon: '⚡' },
            { value: projCount >= 15000 ? '15,000+' : `${projCount}+`, label: 'Projects Completed', icon: '🏗️' },
            { value: `${rateCount}%`, label: 'Customer Satisfaction', icon: '⭐' },
            { value: `${expCount}+`, label: 'Years Experience', icon: '🏆' },
          ].map((stat, idx) => (
            <div key={idx} className="glass rounded-2xl p-5 border border-gray-150 dark:border-gray-800 flex items-center gap-4 hover:shadow-md transition-all duration-300">
              <span className="text-3xl">{stat.icon}</span>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-solar-primary leading-none">{stat.value}</div>
                <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════ Interactive Slider & Case Study Info ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white/70 dark:bg-gray-850/70 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-2xl relative">
          
          {/* LEFT COLUMN: Visual Media (Slider, Gallery, Play Button) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-sm text-solar-textDark dark:text-white uppercase tracking-wider">
                Transformation View
              </h3>
              {activeGalleryImg === 'slider' && (
                <span className="text-xs font-bold text-solar-primary bg-solar-primary/10 px-3 py-1 rounded-full uppercase flex items-center gap-1">
                  <Sliders size={12} /> Slide to compare
                </span>
              )}
            </div>

            {/* Main Visual Frame */}
            <div className="relative w-full h-[380px] rounded-[24px] overflow-hidden shadow-2xl border border-white/20 select-none group">
              
              {/* Image views depending on gallery selection */}
              {activeGalleryImg === 'slider' ? (
                <>
                  {/* Before Installation (underneath) */}
                  <img
                    src={activeProj.imageBefore}
                    alt="Before Solar Installation"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase z-20">
                    Before Installation
                  </div>

                  {/* After Installation (clipped) */}
                  <div
                    className="absolute inset-0 z-10 w-full h-full overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                  >
                    <img
                      src={activeProj.imageAfter}
                      alt="After Solar Installation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-solar-primary/95 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full uppercase z-20">
                      After Installation
                    </div>
                  </div>

                  {/* Slider Control Line & Grabber */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-solar-primary border-2 border-white text-white flex items-center justify-center shadow-2xl font-bold text-sm">
                      ⇄
                    </div>
                  </div>

                  {/* Invisible Range Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  />
                </>
              ) : (
                <img
                  src={
                    activeGalleryImg === 'before' ? activeProj.imageBefore :
                    activeGalleryImg === 'after' ? activeProj.imageAfter : activeProj.droneImage
                  }
                  alt="Solar Project View"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Status Badge top-right */}
              <div className="absolute top-4 right-4 z-20 bg-gradient-to-tr from-solar-primary to-solar-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                {details.statusBadge}
              </div>

              {/* Floating metrics badge bottom-left */}
              <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-1.5">
                <span className="glass-premium text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  ⚡ {details.efficiency} Efficiency
                </span>
                <span className="glass-premium text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  ☀️ {details.warranty} Warranty
                </span>
                <span className="glass-premium text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  🔋 Battery Ready
                </span>
              </div>

              {/* Video Play Button in Center */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-2xl"
                >
                  <Play size={24} className="text-white fill-white ml-1" />
                </button>
              </div>

              {/* Watch Video Label */}
              <div className="absolute bottom-4 right-4 z-20">
                <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">▶ Watch Installation</span>
              </div>
            </div>

            {/* Gallery Thumbnail Images */}
            <div className="flex gap-3 justify-center">
              {[
                { id: 'slider', label: 'B & A Slider', img: activeProj.imageAfter },
                { id: 'before', label: 'Before View', img: activeProj.imageBefore },
                { id: 'after', label: 'After View', img: activeProj.imageAfter },
                { id: 'drone', label: 'Drone View', img: activeProj.droneImage },
              ].map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryImg(t.id)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 relative transition-all duration-300 ${
                    activeGalleryImg === t.id ? 'border-solar-primary scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={t.img} alt={t.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                    <span className="text-[8px] text-white font-bold uppercase tracking-tighter whitespace-nowrap">{t.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Project Progress Bar */}
            <div className="space-y-1.5 p-4 glass-premium rounded-2xl border">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-500 dark:text-gray-400">PROJECT SYSTEM INTEGRATION</span>
                <span className="text-solar-primary">100% COMPLETE</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-solar-primary to-solar-secondary w-full" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Project Details, Stats, Technology, Savings Card */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Customer Information Header */}
            <div className="border-b border-gray-150 dark:border-gray-800 pb-4">
              <span className="text-xs font-bold text-solar-primary uppercase">{activeProj.category} Case Study</span>
              <h3 className="text-2xl font-black text-solar-textDark dark:text-white uppercase leading-tight mt-1" style={{ letterSpacing: '-0.03em' }}>
                {activeProj.title}
              </h3>
              
              {/* Customer Metas */}
              <div className="flex flex-wrap gap-4 mt-3 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1">
                  <span>Client:</span>
                  <span className="text-solar-textDark dark:text-white">{details.clientType}</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full self-center" />
                <button
                  onClick={() => handleMapClick(activeProj.location)}
                  className="flex items-center gap-1 text-solar-primary hover:underline"
                >
                  <MapPin size={13} /> {activeProj.location} (View on Map)
                </button>
                <div className="w-1 h-1 bg-gray-300 rounded-full self-center" />
                <div>
                  <span>Completed: 2026</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-light text-gray-600 dark:text-gray-300 leading-relaxed">
              {activeProj.description}
            </p>

            {/* 4 Project Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Installation Time', value: details.installTime, icon: Clock },
                { title: 'Solar Panels Used', value: details.solarPanels, icon: Sliders },
                { title: 'CO₂ Saved Yearly', value: details.co2Saved, icon: Zap },
                { title: 'Payback Period (ROI)', value: details.roi, icon: Star },
              ].map((s, i) => {
                const StatIcon = s.icon;
                return (
                  <div key={i} className="glass rounded-xl p-3 border flex items-center gap-3">
                    <div className="p-2 bg-solar-primary/10 rounded-lg text-solar-primary flex-shrink-0">
                      <StatIcon size={14} />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase leading-none">{s.title}</div>
                      <div className="text-sm font-extrabold text-solar-textDark dark:text-white mt-1">{s.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Savings Green Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-5 rounded-2xl text-white shadow-xl relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/10 blur-xl" />
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">Project Financial Impact</span>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-[9px] font-bold">LIFETIME IMPACT</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-black text-white">{details.lifetimeSavings}</div>
                  <div className="text-[9px] text-emerald-100 uppercase mt-0.5">Lifetime Savings</div>
                </div>
                <div className="border-l border-white/20">
                  <div className="text-lg font-black text-white">{details.elecSaved}</div>
                  <div className="text-[9px] text-emerald-100 uppercase mt-0.5">Electricity Saved</div>
                </div>
                <div className="border-l border-white/20">
                  <div className="text-lg font-black text-white">{details.carbonOffset}</div>
                  <div className="text-[9px] text-emerald-100 uppercase mt-0.5">Carbon Offset</div>
                </div>
              </div>
            </div>

            {/* Technology Used */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Technology Deployed</span>
              <div className="grid grid-cols-2 gap-2">
                {details.technologies.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs font-semibold text-solar-textDark dark:text-gray-300">
                    <CheckCircle2 size={12} className="text-solar-primary flex-shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Review Box */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800/40 border rounded-2xl text-left space-y-2 relative">
              <div className="flex text-yellow-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-yellow-500" />)}
                <span className="text-[10px] font-bold text-solar-textDark dark:text-white ml-1">5.0 Review</span>
              </div>
              <p className="text-xs italic text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                {details.clientReview}
              </p>
              <span className="text-[10px] font-bold text-solar-primary block">— {details.clientName}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleMapClick(activeProj.location)}
                className="flex-1 py-3 bg-solar-primary text-white rounded-xl text-xs font-bold hover:bg-solar-secondary hover-glow transition-all flex items-center justify-center gap-1.5"
              >
                View Project <ArrowRight size={13} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex-1 py-3 border-2 border-solar-primary text-solar-primary rounded-xl text-xs font-bold hover:bg-solar-primary hover:text-white transition-all"
              >
                Request Similar Installation
              </button>
            </div>

            {/* Quick Switchers */}
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Explore Other Landmarks</span>
              <div className="flex gap-2">
                {showcaseProjects.map((p, index) => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveProjectIdx(index); setSliderPosition(50); setActiveGalleryImg('slider'); }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      activeProjectIdx === index
                        ? 'bg-solar-primary text-white border-solar-primary shadow-sm'
                        : 'bg-solar-bgLight dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-solar-textDark dark:text-gray-300 hover:bg-gray-150'
                    }`}
                  >
                    House {p.id}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ══════════ Bottom Grid Layout of All Projects ══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {filtered.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => {
                const targetIdx = showcaseProjects.findIndex(p => p.id === proj.id);
                if (targetIdx !== -1) {
                  setActiveProjectIdx(targetIdx);
                  setSliderPosition(50);
                  setActiveGalleryImg('slider');
                  window.scrollTo({ top: document.getElementById('projects').offsetTop + 100, behavior: 'smooth' });
                }
              }}
              className="group rounded-3xl overflow-hidden bg-white dark:bg-gray-850 border border-gray-150 dark:border-gray-800 shadow-sm cursor-pointer
                hover:shadow-[0_20px_45px_rgba(34,197,94,0.12)] hover:-translate-y-2.5 hover:border-solar-primary/30 transition-all duration-500"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={proj.imageAfter}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-[10px] font-bold text-solar-secondary uppercase">{proj.category}</span>
                  <h4 className="text-sm font-bold text-white uppercase group-hover:text-solar-primary transition-colors">{proj.title}</h4>
                </div>
              </div>
              <div className="p-5 text-left space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                <div className="flex justify-between items-center text-xs pt-3 border-t border-gray-150 dark:border-gray-800">
                  <span className="font-semibold text-solar-primary">{proj.capacity}</span>
                  <span className="font-bold text-solar-secondary">{proj.savings} Saved</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ══════════ Watch Installation Video Modal ══════════ */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
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
            <div className="aspect-video bg-gradient-to-br from-solar-primary/30 to-solar-secondary/20 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                <Play size={34} className="text-white fill-white ml-1" />
              </div>
              <h4 className="text-white font-bold text-lg uppercase tracking-wider">{activeProj.title}</h4>
              <p className="text-white/60 text-xs">Watch drone footage & client testimony of solar installation</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
