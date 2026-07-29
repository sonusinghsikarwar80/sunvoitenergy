import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ChevronDown, ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const discoverLabel = language === 'hi' ? 'अधिक जानें'    : 'Discover More';
  const quoteLabel    = language === 'hi' ? 'मुफ़्त कोट लें' : 'Get Free Quote';
  const exploreLabel  = language === 'hi' ? 'उत्पाद देखें'  : 'Explore Products';

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden">
      
      {/* Background Loop Video with Fallback Poster */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={`${import.meta.env.BASE_URL}hero-bg.jpg`}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`, // Parallax effect on scroll
        }}
      >
        <source src={`${import.meta.env.BASE_URL}hero-video.mp4`} type="video/mp4" />
      </video>

      {/* Warm golden-to-dark gradient overlay — matches the autumn sunset tones of the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 z-0" />

      {/* ── Bottom-left content block ── */}
      <div className="relative z-10 w-full max-w-5xl ml-0 mr-auto px-6 sm:pl-16 md:pl-24 pb-20 pt-40 flex flex-col items-start gap-5">

        {/* Tag line — clean, spaced, refined */}
        <p style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 900,
          fontSize: '0.75rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#66BB6A',
          margin: 0,
        }}>
          Solar Panel Installation Solution
        </p>

        {/* Main heading — refined weight 900, tight tracking */}
        <h1 style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2rem, 5vw, 3.6rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.045em',
          color: '#ffffff',
          maxWidth: '620px',
          margin: 0,
        }}>
          Powering Homes<br />
          With Solar Panels
        </h1>

        {/* Sub text — light, airy, readable */}
        <p style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 400,
          fontSize: '0.95rem',
          lineHeight: 1.75,
          letterSpacing: '0.01em',
          color: 'rgba(255,255,255,0.75)',
          maxWidth: '460px',
          margin: 0,
        }}>
          SunVoit Energy — MNRE approved, ISO certified, 25-year warranty solar
          installations for homes, businesses &amp; government projects.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">

          {/* Golden "Discover More" button — matches image button colour */}
          <button
            onClick={() => handleScrollTo('trust')}
            className="group relative px-8 py-3.5 rounded-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #D4831A, #F0A830)',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.02em',
            }}
          >
            <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] bg-white/25 skew-x-[-18deg] transition-transform duration-500" />
            <span className="relative flex items-center gap-2">
              {discoverLabel}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Green "Get Free Quote" button */}
          <button
            onClick={() => handleScrollTo('calculator')}
            className="group px-8 py-3.5 rounded-lg text-white border border-white/30 backdrop-blur-sm bg-solar-primary/80 hover:bg-solar-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.02em',
            }}
          >
            <Zap size={15} className="text-yellow-300" />
            {quoteLabel}
          </button>

          {/* Text link */}
          <button
            onClick={() => navigate('/store')}
            className="text-white/75 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
          >
            {exploreLabel} →
          </button>
        </div>
      </div>

      {/* Scroll-down bounce indicator */}
      <button
        onClick={() => handleScrollTo('trust')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={30} />
      </button>
    </section>
  );
}
