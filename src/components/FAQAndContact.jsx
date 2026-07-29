import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { faqAccordions } from '../data/mockData';
import { ChevronDown, MessageSquare, Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';

export default function FAQAndContact() {
  const { language, addContactMessage } = useContext(AppContext);
  const [openFAQIdx, setOpenFAQIdx] = useState(0);

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

  const t = {
    en: {
      faqTag: 'COMMON INQUIRIES',
      faqTitle: 'Frequently Asked Questions',
      contactTag: 'CONNECT WITH US',
      contactTitle: 'Schedule a Consultation',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formPhone: 'Phone Number',
      formSubj: 'Subject / Interest Area',
      formMsg: 'Detailed Message',
      formBtn: 'Send Message via Email & SMS',
      contactPhone: '+91 98765 43210',
      contactMail: 'support@sunvoit.com',
      contactAddr: 'Level 4, SunVoit TechPark, Sector 62, Noida, UP, India',
      contactHours: 'Mon - Sat: 9:00 AM - 6:00 PM (Sunday Closed)'
    },
    hi: {
      faqTag: 'सामान्य प्रश्नोत्तरी',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल',
      contactTag: 'हमसे संपर्क करें',
      contactTitle: 'मुफ्त परामर्श बुक करें',
      formName: 'पूरा नाम',
      formEmail: 'ईमेल पता',
      formPhone: 'फ़ोन नंबर',
      formSubj: 'विषय / रुचि का क्षेत्र',
      formMsg: 'विस्तृत संदेश',
      formBtn: 'ईमेल और एसएमएस द्वारा भेजें',
      contactPhone: '+91 98765 43210',
      contactMail: 'support@sunvoit.com',
      contactAddr: 'लेवल 4, सनवोइट टेकपार्क, सेक्टर 62, नोएडा, यूपी, भारत',
      contactHours: 'सोम - शनि: सुबह 9:00 - शाम 6:00 (रविवार बंद)'
    }
  }[language];

  return (
    <section id="faq" className="py-20 bg-solar-bgLight/30 dark:bg-solar-bgDark/40">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: FAQ Accordion */}
        <div className="lg:col-span-6 text-left space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-solar-primary uppercase block">
              {t.faqTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-solar-textDark dark:text-white uppercase leading-none">
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {faqAccordions.map((faq, idx) => {
              const isOpen = openFAQIdx === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-3xl border border-gray-200/60 dark:border-gray-800 bg-white dark:bg-gray-850 overflow-hidden transition-all duration-300 shadow-sm"
                >
                  <button 
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-solar-textDark dark:text-white hover:text-solar-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={18} className={`transform transition-transform ${isOpen ? 'rotate-180 text-solar-primary' : 'text-gray-400'}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm font-light text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Premium Contact Form */}
        <div id="contact" className="lg:col-span-6 text-left space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-solar-primary uppercase block">
              {t.contactTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-solar-textDark dark:text-white uppercase leading-none">
              {t.contactTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Info contacts panel */}
            <div className="lg:col-span-4 space-y-6 text-xs sm:text-sm">
              <div className="flex gap-3">
                <div className="p-2.5 bg-solar-primary/10 rounded-full text-solar-primary flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Call Us</span>
                  <span className="font-semibold text-solar-textDark dark:text-gray-200">{t.contactPhone}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-solar-primary/10 rounded-full text-solar-primary flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Email Us</span>
                  <span className="font-semibold text-solar-textDark dark:text-gray-200">{t.contactMail}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-solar-primary/10 rounded-full text-solar-primary flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Visit Office</span>
                  <span className="font-semibold text-solar-textDark dark:text-gray-200 leading-snug">{t.contactAddr}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-solar-primary/10 rounded-full text-solar-primary flex-shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Hours</span>
                  <span className="font-semibold text-solar-textDark dark:text-gray-200">{t.contactHours}</span>
                </div>
              </div>
            </div>

            {/* Main Form panel */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-850 p-6 sm:p-8 rounded-3xl border shadow-xl w-full">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">{t.formName}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">{t.formEmail}</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john@example.com"
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">{t.formPhone}</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="9876543210"
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">{t.formSubj}</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Residential Solar Installation"
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">{t.formMsg}</label>
                      <textarea 
                        rows="4" 
                        required
                        placeholder="Details about your property, bill size, or requirements..."
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3 bg-solar-primary text-white rounded-xl font-bold text-xs uppercase hover-glow glow-btn flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    {t.formBtn}
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-solar-primary text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check size={32} />
                  </div>
                  <h3 className="font-extrabold text-lg text-solar-primary">Message Sent Successfully!</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    Thank you for reaching out to SunVoit. We will contact you via email and SMS within 2 hours with initial layout plans.
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
