import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { faqAccordions } from '../data/mockData';
import { ChevronDown, MessageSquare, Phone, Mail, MapPin, Clock, Send, Check, Search, Star, Award, ShieldAlert, BadgeCheck, Zap, ArrowRight, TreePine } from 'lucide-react';

export default function FAQAndContact() {
  const { language, addContactMessage } = useContext(AppContext);
  const [openFAQIdx, setOpenFAQIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFAQ = (idx) => {
    setOpenFAQIdx(openFAQIdx === idx ? -1 : idx);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addContactMessage({ name, email, phone, subject, message });
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setFormSubmitted(false);
  };

  // Filter FAQ based on search query
  const filteredFAQs = faqAccordions.filter(faq => {
    const q = faq.question.toLowerCase();
    const a = faq.answer.toLowerCase();
    const s = searchQuery.toLowerCase();
    return q.includes(s) || a.includes(s);
  });

  const t = {
    en: {
      faqTag: 'COMMON INQUIRIES',
      faqTitle: 'Frequently Asked Questions',
      faqDesc: 'Find answers to common questions about solar installation, government subsidy, battery backup and maintenance.',
      contactTag: 'CONNECT WITH US',
      contactTitle: 'Schedule a Consultation',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formPhone: 'Phone Number',
      formSubj: 'Subject / Interest Area',
      formMsg: 'Detailed Message',
      formBtn: '📨 Schedule Free Consultation',
      contactPhone: '+91 98765 43210',
      contactMail: 'support@sunvoit.com',
      contactAddr: 'Level 4, SunVoit TechPark, Sector 62, Noida, UP, India',
      contactHours: 'Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)'
    },
    hi: {
      faqTag: 'सामान्य प्रश्नोत्तरी',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल',
      faqDesc: 'सौर स्थापना, सरकारी सब्सिडी, बैटरी बैकअप और रखरखाव के बारे में सामान्य प्रश्नों के उत्तर खोजें।',
      contactTag: 'हमसे संपर्क करें',
      contactTitle: 'मुफ्त परामर्श बुक करें',
      formName: 'पूरा नाम',
      formEmail: 'ईमेल पता',
      formPhone: 'फ़ोन नंबर',
      formSubj: 'विषय / रुचि का क्षेत्र',
      formMsg: 'विस्तृत संदेश',
      formBtn: '📨 मुफ्त परामर्श बुक करें',
      contactPhone: '+91 98765 43210',
      contactMail: 'support@sunvoit.com',
      contactAddr: 'लेवल 4, सनवोइट टेकपार्क, सेक्टर 62, नोएडा, यूपी, भारत',
      contactHours: 'सोम - शनि: सुबह 9:00 - शाम 6:00 (रविवार बंद)'
    }
  }[language];

  return (
    <section id="faq" className="relative py-24 overflow-hidden bg-gradient-to-b from-[#F8FAF7] via-white to-[#F8FAF7] dark:from-solar-bgDark dark:via-solar-bgDark/98 dark:to-gray-950 text-left">
      
      {/* Background Solar Grid & Blur Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-solar-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-solar-secondary/6 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#2E7D32_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* ══════════ TOP HEADING & STATS ══════════ */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-3">
            <span className="text-xs font-black tracking-[0.25em] text-solar-primary uppercase block">
              {t.faqTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-solar-textDark dark:text-white uppercase tracking-tight" style={{ letterSpacing: '-0.04em' }}>
              {t.faqTitle}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
              {t.faqDesc}
            </p>
          </div>

          {/* Impact Statistics Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-150 dark:border-gray-800 shadow-sm max-w-3xl mx-auto">
            <div className="text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-solar-primary block font-mono">⚡ 5000+</span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">Installations</span>
            </div>
            <div className="text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-solar-primary block font-mono">⭐ 4.9</span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">Customer Rating</span>
            </div>
            <div className="text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-solar-primary block font-mono">🏆 10+</span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">Years Legacy</span>
            </div>
            <div className="text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-solar-primary block font-mono">🌞 50 MW+</span>
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-extrabold">Solar Capacity</span>
            </div>
          </div>
        </div>

        {/* ══════════ COLUMN GRID LAYOUT ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* LEFT COLUMN: FAQ Accordion with Live Search */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Search Input Box */}
            <div className="relative w-full">
              <input 
                type="text"
                placeholder="🔍 Search Question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pr-12 rounded-2xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white font-semibold focus:ring-1 focus:ring-solar-primary focus:border-solar-primary outline-none transition-all shadow-sm text-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-450 hover:text-red-500 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Accordion Cards */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, idx) => {
                  const isOpen = openFAQIdx === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-2xl border-l-[4px] border-l-solar-primary border-y border-r border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-850 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                      <button 
                        onClick={() => toggleFAQ(idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left font-black text-sm sm:text-base text-solar-textDark dark:text-white hover:text-solar-primary transition-colors"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <ChevronDown 
                          size={18} 
                          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-solar-primary' : 'text-gray-400'}`} 
                        />
                      </button>

                      {/* Smooth Collapsible container */}
                      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                        <div className="px-6 pb-6 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800/40 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 bg-white dark:bg-gray-850 rounded-2xl border border-gray-150 dark:border-gray-800">
                  <span className="text-2xl block">🔍</span>
                  <span className="text-xs font-bold text-gray-400 block mt-2">No matching questions found.</span>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE: Vertical Gradient Line Divider (Large Screens Only) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-solar-primary/20 to-transparent -translate-x-1/2" />

          {/* RIGHT COLUMN: Contact Cards & Consultation Form */}
          <div id="contact" className="lg:col-span-6 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Card */}
              <a href={`tel:${t.contactPhone.replace(/\s+/g, '')}`} className="flex gap-4 items-start p-4 bg-white/70 dark:bg-gray-850/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800 hover:border-solar-primary/30 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="p-3 bg-solar-primary/10 rounded-xl text-solar-primary flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-gray-450 block uppercase font-black tracking-wider">Call Us</span>
                  <span className="font-extrabold text-xs sm:text-sm text-solar-textDark dark:text-gray-200 block mt-0.5">{t.contactPhone}</span>
                  <span className="text-[8px] font-black uppercase text-solar-primary tracking-wider block mt-1 bg-solar-primary/10 px-2 py-0.5 rounded-full inline-block">Available 24/7</span>
                </div>
              </a>

              {/* Email Card */}
              <a href={`mailto:${t.contactMail}`} className="flex gap-4 items-start p-4 bg-white/70 dark:bg-gray-850/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800 hover:border-solar-primary/30 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="p-3 bg-solar-primary/10 rounded-xl text-solar-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-gray-450 block uppercase font-black tracking-wider">Email Us</span>
                  <span className="font-extrabold text-xs sm:text-sm text-solar-textDark dark:text-gray-200 block mt-0.5">{t.contactMail}</span>
                  <span className="text-[8px] font-black uppercase text-solar-primary tracking-wider block mt-1 bg-solar-primary/10 px-2 py-0.5 rounded-full inline-block">Reply &lt; 2 Hrs</span>
                </div>
              </a>

              {/* Address Card */}
              <a 
                href="https://maps.google.com/?q=Noida" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sm:col-span-2 flex gap-4 items-start p-4 bg-white/70 dark:bg-gray-850/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800 hover:border-solar-primary/30 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="p-3 bg-solar-primary/10 rounded-xl text-solar-primary flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <span className="text-[9px] text-gray-450 block uppercase font-black tracking-wider">Visit Office</span>
                  <span className="font-extrabold text-xs sm:text-sm text-solar-textDark dark:text-gray-200 block mt-0.5 leading-snug">{t.contactAddr}</span>
                  <span className="text-[8px] font-black text-solar-primary uppercase tracking-wider block mt-1 hover:underline">View on Google Maps →</span>
                </div>
              </a>
            </div>

            {/* Premium Consultation Form Panel */}
            <div className="relative group bg-white dark:bg-gray-850/90 p-6 sm:p-8 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-[0_30px_80px_rgba(0,0,0,0.06)] w-full overflow-hidden transition-all duration-300">
              
              {/* Green Glow Behind Consultation Form */}
              <div className="absolute -inset-10 bg-solar-primary/5 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-5 relative z-10">
                  
                  {/* Consultation Form Header */}
                  <div className="space-y-1 pb-2 border-b border-gray-100 dark:border-gray-800/60">
                    <span className="text-[10px] font-black text-solar-primary uppercase tracking-widest block">FREE CONSULTATION</span>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8px] font-bold text-gray-400 uppercase">
                      <span>✓ No Hidden Charges</span>
                      <span>✓ Free Site Visit</span>
                      <span>✓ Custom Solar Design</span>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary focus:border-solar-primary focus:shadow-[0_0_10px_rgba(46,125,50,0.1)] transition-all font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john@example.com"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary focus:border-solar-primary focus:shadow-[0_0_10px_rgba(46,125,50,0.1)] transition-all font-semibold"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="9876543210"
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary focus:border-solar-primary focus:shadow-[0_0_10px_rgba(46,125,50,0.1)] transition-all font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">Subject / Interest Area</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Residential Solar Installation"
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary focus:border-solar-primary focus:shadow-[0_0_10px_rgba(46,125,50,0.1)] transition-all font-semibold"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-black text-gray-400 dark:text-gray-550 uppercase tracking-wider">Detailed Message</label>
                      <textarea 
                        rows="3" 
                        required
                        placeholder="Details about your property, bill size, or requirements..."
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white outline-none focus:ring-1 focus:ring-solar-primary focus:border-solar-primary focus:shadow-[0_0_10px_rgba(46,125,50,0.1)] transition-all font-semibold resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 bg-gradient-to-r from-solar-primary to-solar-secondary text-white rounded-xl font-bold text-xs uppercase hover-glow glow-btn flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-98 transition-all"
                  >
                    <Send size={14} />
                    {t.formBtn}
                  </button>

                  {/* Trust Badge Below Form */}
                  <div className="text-center pt-2 border-t border-gray-100 dark:border-gray-800/40">
                    <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block leading-loose">
                      ⭐⭐⭐⭐⭐ 4.9/5 Rating | 1000+ Happy Customers | MNRE Approved
                    </span>
                  </div>
                </form>
              ) : (
                <div className="p-8 text-center space-y-4 animate-fade-in relative z-10">
                  <div className="w-16 h-16 bg-solar-primary text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-solar-primary/20">
                    <Check size={32} />
                  </div>
                  <h3 className="font-extrabold text-base text-solar-primary uppercase">✅ Thank You!</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold leading-relaxed">
                    Our Solar Expert will contact you within 30 minutes.
                  </p>
                  <button 
                    onClick={resetForm} 
                    className="px-6 py-2.5 border border-solar-primary text-solar-primary rounded-xl text-xs font-bold hover:bg-solar-primary/10 transition-colors"
                  >
                    Send another inquiry
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
