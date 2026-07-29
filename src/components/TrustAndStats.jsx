import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Award, ShieldAlert, BadgeCheck, ClipboardCheck, Zap } from 'lucide-react';

export default function TrustAndStats() {
  const { language } = useContext(AppContext);

  const t = {
    en: {
      trustTitle: 'GOVERNMENT CERTIFIED & TRUSTED PARTNER',
      statsTitle: 'DELIVERING IMPACT AT SCALE',
      badge1: 'MNRE Approved',
      badge2: 'ISO 9001:2015 Certified',
      badge3: '25 Years Warranty',
      badge4: 'Govt. Registered',
      badge5: 'Tier-1 Components Only',
      stat1Val: '10,000+',
      stat1Lbl: 'Happy Customers',
      stat2Val: '500+',
      stat2Lbl: 'Commercial Projects',
      stat3Val: '350 MW+',
      stat3Lbl: 'Installed Capacity',
      stat4Val: '98%',
      stat4Lbl: 'Customer Satisfaction',
      stat5Val: '20+',
      stat5Lbl: 'Years Experience'
    },
    hi: {
      trustTitle: 'सरकारी प्रमाणित और विश्वसनीय भागीदार',
      statsTitle: 'पैमाने पर प्रभाव डालना',
      badge1: 'एमएनआरई (MNRE) स्वीकृत',
      badge2: 'आईएसओ (ISO) प्रमाणित',
      badge3: '25 साल की वारंटी',
      badge4: 'सरकारी पंजीकृत',
      badge5: 'केवल टियर-1 कंपोनेंट्स',
      stat1Val: '10,000+',
      stat1Lbl: 'संतुष्ट ग्राहक',
      stat2Val: '500+',
      stat2Lbl: 'व्यावसायिक परियोजनाएं',
      stat3Val: '350 MW+',
      stat3Lbl: 'स्थापित क्षमता',
      stat4Val: '98%',
      stat4Lbl: 'ग्राहक संतुष्टि',
      stat5Val: '20+',
      stat5Lbl: 'वर्षों का अनुभव'
    }
  }[language];

  const badges = [
    { icon: BadgeCheck, text: t.badge1 },
    { icon: Award, text: t.badge2 },
    { icon: ClipboardCheck, text: t.badge3 },
    { icon: ShieldAlert, text: t.badge4 },
    { icon: Zap, text: t.badge5 },
  ];

  const stats = [
    { val: t.stat1Val, lbl: t.stat1Lbl },
    { val: t.stat2Val, lbl: t.stat2Lbl },
    { val: t.stat3Val, lbl: t.stat3Lbl },
    { val: t.stat4Val, lbl: t.stat4Lbl },
    { val: t.stat5Val, lbl: t.stat5Lbl },
  ];

  return (
    <section id="trust" className="py-16 bg-white dark:bg-solar-bgDark/80 border-y border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Trust Badges Grid */}
        <div className="text-center space-y-6">
          <span className="text-xs font-bold tracking-widest text-solar-primary uppercase block">
            {t.trustTitle}
          </span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center">
            {badges.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center gap-2 p-4 rounded-3xl bg-solar-bgLight/40 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 hover:scale-105 transition-all duration-300 ${
                    idx === 4 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-solar-primary/10 to-solar-secondary/10 flex items-center justify-center text-solar-primary dark:text-solar-secondary mb-1">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-solar-textDark dark:text-gray-200">
                    {b.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
