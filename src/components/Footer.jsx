import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Phone, Mail, Send, Check } from 'lucide-react';

export default function Footer() {
  const { language } = useContext(AppContext);
  const navigate = useNavigate();

  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (newsEmail) {
      setSubscribed(true);
      setNewsEmail('');
    }
  };

  const handleNavClick = (sectionId, path = '/') => {
    if (path === '/') {
      navigate('/');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const t = {
    en: {
      tag: 'SunVoit Energy is a leading global renewable energy platform delivering luxury rooftop systems and smart storage batteries.',
      c1Title: 'Company',
      c2Title: 'Services',
      c3Title: 'Products',
      c4Title: 'Newsletter',
      newsSub: 'Subscribe to get the latest solar subsidies, pricing guides, and tech releases.',
      newsPlaceholder: 'Enter email address',
      copyright: '© 2026 SunVoit Energy. All Rights Reserved. Made for modern clean power.'
    },
    hi: {
      tag: 'सनवोइट एनर्जी एक अग्रणी वैश्विक नवीकरणीय ऊर्जा मंच है जो लक्जरी रूफटॉप सिस्टम और स्मार्ट स्टोरेज बैटरी प्रदान करता है।',
      c1Title: 'कंपनी',
      c2Title: 'सेवाएं',
      c3Title: 'उत्पाद',
      c4Title: 'न्यूज़लेटर',
      newsSub: 'नवीनतम सौर सब्सिडी, मूल्य निर्धारण गाइड और तकनीकी विज्ञप्ति प्राप्त करने के लिए सदस्यता लें।',
      newsPlaceholder: 'ईमेल पता दर्ज करें',
      copyright: '© 2026 सनवोइट एनर्जी। सर्वाधिकार सुरक्षित। आधुनिक स्वच्छ ऊर्जा के लिए निर्मित।'
    }
  }[language];

  return (
    <footer className="bg-solar-bgLight dark:bg-solar-bgDark/90 border-t border-gray-150 dark:border-gray-900 py-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        
        {/* Brand Description */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('', '/')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-solar-primary to-solar-yellow flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
            <span className="font-sans font-bold text-lg tracking-tight bg-gradient-to-r from-solar-primary to-solar-secondary bg-clip-text text-transparent">
              SunVoit <span className="text-solar-textDark dark:text-white">Energy</span>
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-sm">
            {t.tag}
          </p>
          <div className="space-y-2 text-gray-500">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-solar-primary" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-solar-primary" />
              <span>support@sunvoit.com</span>
            </div>
          </div>
        </div>

        {/* Company links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-bold text-solar-textDark dark:text-white uppercase tracking-wider">{t.c1Title}</h4>
          <div className="flex flex-col gap-2.5 font-medium text-gray-500 dark:text-gray-400">
            <button onClick={() => { navigate('/about'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">About Us</button>
            <button onClick={() => { navigate('/projects'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Portfolio Projects</button>
            <button onClick={() => { navigate('/blog'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Solar Guides</button>
            <button onClick={() => { navigate('/contact'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">FAQs & Contact</button>
            <button onClick={() => { navigate('/admin'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Admin Panel</button>
          </div>
        </div>

        {/* Services Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-bold text-solar-textDark dark:text-white uppercase tracking-wider">{t.c2Title}</h4>
          <div className="flex flex-col gap-2.5 font-medium text-gray-500 dark:text-gray-400">
            <button onClick={() => { navigate('/services'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Residential Solar</button>
            <button onClick={() => { navigate('/services'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Commercial Solar</button>
            <button onClick={() => { navigate('/services'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Battery Vault Storage</button>
            <button onClick={() => { navigate('/calculator'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Savings Calculator</button>
            <button onClick={() => { navigate('/store'); window.scrollTo(0,0); }} className="hover:text-solar-primary text-left">Online Store</button>
          </div>
        </div>


        {/* Newsletter Signup */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-bold text-solar-textDark dark:text-white uppercase tracking-wider">{t.c4Title}</h4>
          <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            {t.newsSub}
          </p>

          {!subscribed ? (
            <form onSubmit={handleNewsSubmit} className="flex gap-2">
              <input 
                type="email" 
                required
                placeholder={t.newsPlaceholder}
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-850 dark:text-white focus:outline-none focus:ring-1 focus:ring-solar-primary text-xs"
              />
              <button type="submit" className="p-3 bg-solar-primary text-white rounded-xl hover-glow glow-btn">
                <Send size={14} />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-solar-primary font-bold bg-green-500/10 p-3 rounded-xl border border-green-500/20">
              <Check size={16} />
              <span>Subscribed successfully!</span>
            </div>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-gray-150 dark:border-gray-900 mt-12 pt-8 text-center text-gray-400 text-xs">
        {t.copyright}
      </div>
    </footer>
  );
}
