import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { blogGuides } from '../data/mockData';
import { Star, MessageSquare, ArrowRight, User } from 'lucide-react';

export default function TestimonialsAndBlog() {
  const { language } = useContext(AppContext);

  const testimonials = [
    {
      name: 'Dr. Vikrant Mehta',
      role: 'Homeowner, Delhi',
      comment: 'SunVoit installed our 5kW system. Our electric bills dropped from ₹8,500 to zero! The PM Surya Ghar subsidy was credited to our bank in just 3 weeks.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Aditya Birla Group (Facilities)',
      role: 'Commercial Partner, Bangalore',
      comment: 'We integrated a 250kW hybrid array at our corporate office. Reliability has been flawless, and the real-time app dashboard makes tracking energy savings incredibly easy.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Ramesh Chaudhary',
      role: 'Farmer, Rajasthan',
      comment: 'The Solar Pump set has changed farming for us. We now irrigate our crops during the day without relying on erratic grid power cuts. Highly recommended AMC service.',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
    }
  ];

  const t = {
    en: {
      testTag: 'CUSTOMER REVIEWS',
      testTitle: 'What Our Clients Say',
      blogTag: 'SOLAR KNOWLEDGE HUB',
      blogTitle: 'Latest Guides & Scheme Updates',
      readArticle: 'Read Guide'
    },
    hi: {
      testTag: 'ग्राहक समीक्षाएं',
      testTitle: 'हमारे ग्राहक क्या कहते हैं',
      blogTag: 'सौर ज्ञान केंद्र',
      blogTitle: 'नवीनतम गाइड और योजना अपडेट',
      readArticle: 'गाइड पढ़ें'
    }
  }[language];

  return (
    <section id="blog" className="py-20 bg-white dark:bg-solar-bgDark">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Testimonials */}
        <div className="space-y-12">
          <div className="text-left space-y-4 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-solar-primary uppercase block">
              {t.testTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-solar-textDark dark:text-white uppercase leading-none">
              {t.testTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="glass rounded-3xl p-6 border dark:border-gray-800 text-left flex flex-col justify-between h-64 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-0.5 text-solar-yellow">
                    {Array.from({ length: Math.floor(test.rating) }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                    {test.rating % 1 !== 0 && <Star size={14} className="opacity-50" />}
                  </div>

                  <p className="text-xs sm:text-sm font-light text-gray-600 dark:text-gray-300 leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                  <div>
                    <h4 className="text-sm font-bold text-solar-textDark dark:text-white">{test.name}</h4>
                    <span className="text-[10px] text-gray-400 block font-semibold">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Guides Grid */}
        <div className="space-y-12 border-t border-gray-100 dark:border-gray-900 pt-16">
          <div className="text-left space-y-4 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-solar-primary uppercase block">
              {t.blogTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-solar-textDark dark:text-white uppercase leading-none">
              {t.blogTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogGuides.map((guide) => (
              <div 
                key={guide.id}
                className="group rounded-3xl overflow-hidden glass border dark:border-gray-800 flex flex-col h-[400px] hover:shadow-xl transition-all duration-300"
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-solar-primary text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                    {guide.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between items-start text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase">
                      <span>{guide.date}</span>
                      <span>{guide.readTime}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-solar-textDark dark:text-white group-hover:text-solar-primary transition-colors line-clamp-2 uppercase">
                      {guide.title}
                    </h3>
                    <p className="text-xs font-light text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {guide.excerpt}
                    </p>
                  </div>

                  <button className="flex items-center gap-1.5 text-xs font-extrabold text-solar-primary dark:text-solar-secondary hover:underline group/btn pt-2">
                    <span>{t.readArticle}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
