
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const FaqPage: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">{t('faqTitle')}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t('faqSubtitle')}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className={`bg-white dark:bg-slate-800 rounded-2xl border overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-slate-200 dark:border-slate-700'}`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-5 text-start flex justify-between items-center outline-none"
            >
              <span className="font-bold text-lg text-slate-800 dark:text-white">{faq.q}</span>
              <span className={`transform transition-transform duration-300 text-blue-500 ${openIndex === idx ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div 
              className={`px-6 text-slate-600 dark:text-slate-300 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {faq.a}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
         <p className="text-slate-600 dark:text-slate-300 mb-4 font-medium">{t('contactUsSubtitle')}</p>
         <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all">
            {t('contact')}
         </button>
      </div>
    </div>
  );
};

export default FaqPage;
