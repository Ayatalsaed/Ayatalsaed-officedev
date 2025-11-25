
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SubscriptionPageProps {
  onSubscribe: (plan: string) => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onSubscribe }) => {
  const { t } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      id: 'basic',
      name: t('planBasic'),
      price: t('priceBasic'),
      features: [
        t('featureAddress'),
        t('featureMail'),
        'Community Access'
      ],
      isPopular: false
    },
    {
      id: 'comm',
      name: t('planComm'),
      price: t('priceComm'),
      features: [
        t('featureAddress'),
        t('featureMail'),
        t('featureCallCenter'),
        t('featureSecretary')
      ],
      isPopular: true
    },
    {
      id: 'exec',
      name: t('planExec'),
      price: t('priceExec'),
      features: [
        t('featureAddress'),
        t('featureMail'),
        t('featureCallCenter'),
        t('featureMeetingRooms'),
        t('featureEvents')
      ],
      isPopular: false
    },
    {
      id: 'elite',
      name: t('planElite'),
      price: t('priceElite'),
      features: [
        'Everything in Executive',
        t('featureAI'),
        t('logistics'),
        'Unlimited Event Access',
        'Priority Support'
      ],
      isPopular: false
    }
  ];

  const comparisonData = [
    { feature: t('tbl_address'), basic: true, comm: true, exec: true, elite: true },
    { feature: t('tbl_mail'), basic: true, comm: true, exec: true, elite: true },
    { feature: t('tbl_phone'), basic: false, comm: true, exec: true, elite: true },
    { feature: t('tbl_meeting'), basic: 'Pay-as-you-go', comm: '2 hrs/mo', exec: '10 hrs/mo', elite: 'Unlimited' },
    { feature: t('tbl_ai'), basic: false, comm: false, exec: true, elite: true },
    { feature: t('tbl_guests'), basic: '0', comm: '2', exec: '5', elite: '10' },
  ];

  const faqs = [
    { q: t('faq_p1'), a: t('faq_pa1') },
    { q: t('faq_p2'), a: t('faq_pa2') },
    { q: t('faq_p3'), a: t('faq_pa3') },
  ];

  return (
    <div className="w-full bg-white animate-fade-in font-sans">
      
      {/* Hero Header */}
      <div className="bg-brand-primary pt-20 pb-32 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
             <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('plansPageTitle')}</h1>
             <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
               {t('plansSubtitle')}
             </p>

             {/* Pricing Toggle */}
             <div className="flex items-center justify-center mt-10 gap-4">
                <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-blue-200'}`}>{t('monthly')}</span>
                <button 
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${isAnnual ? 'bg-brand-gold' : 'bg-slate-500'}`}
                >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isAnnual ? 'translate-x-6 rtl:-translate-x-6' : ''}`}></div>
                </button>
                <span className={`text-sm font-bold ${isAnnual ? 'text-white' : 'text-blue-200'}`}>
                    {t('yearly')} <span className="text-xs text-brand-primary bg-brand-gold px-2 py-0.5 rounded-full ml-1 font-bold">{t('savePercent')}</span>
                </span>
            </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {plans.map((plan) => (
            <div 
                key={plan.id}
                className={`relative bg-white rounded-[24px] p-8 flex flex-col transition-all duration-300 hover:translate-y-[-8px] ${plan.isPopular ? 'border-2 border-brand-gold shadow-2xl scale-105 z-10' : 'border border-slate-100 shadow-xl'}`}
            >
                {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-primary px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    Recommended
                </div>
                )}

                <h3 className="text-lg font-bold text-brand-primary mb-4 text-center">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-8">
                    <span className="text-4xl font-bold text-brand-primary">{plan.price}</span>
                    <span className="text-slate-500 font-medium text-xs">{t('currency')} / {t('month')}</span>
                </div>

                <div className="w-full h-px bg-slate-100 mb-8"></div>

                <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{feature}</span>
                    </li>
                ))}
                </ul>

                <button 
                onClick={() => onSubscribe(plan.id)}
                className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm
                    ${plan.id === 'comm' 
                    ? 'bg-brand-primary hover:bg-[#052c42] text-white shadow-blue-900/20' 
                    : 'bg-slate-50 text-brand-primary hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                {t('subscribe')}
                </button>
            </div>
            ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-24 animate-slide-up">
            <h2 className="text-3xl font-heading font-bold text-brand-primary text-center mb-12">{t('comparePlans')}</h2>
            <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-card bg-white">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="bg-slate-50 text-brand-primary uppercase font-bold text-xs">
                        <tr>
                            <th className="px-6 py-6 min-w-[200px]">{t('features')}</th>
                            <th className="px-6 py-6 text-center">{t('planBasic')}</th>
                            <th className="px-6 py-6 text-center text-brand-primary bg-blue-50/50 border-x border-blue-100">{t('planComm')}</th>
                            <th className="px-6 py-6 text-center">{t('planExec')}</th>
                            <th className="px-6 py-6 text-center">{t('planElite')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {comparisonData.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-5 font-bold text-slate-700">{row.feature}</td>
                                <td className="px-6 py-5 text-center">
                                    {row.basic === true ? <span className="text-green-500 text-lg">●</span> : row.basic === false ? <span className="text-slate-300">-</span> : <span className="font-medium text-slate-600">{row.basic}</span>}
                                </td>
                                <td className="px-6 py-5 text-center bg-blue-50/30 border-x border-blue-50">
                                    {row.comm === true ? <span className="text-green-500 text-lg">●</span> : row.comm === false ? <span className="text-slate-300">-</span> : <span className="font-medium text-brand-primary">{row.comm}</span>}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {row.exec === true ? <span className="text-green-500 text-lg">●</span> : row.exec === false ? <span className="text-slate-300">-</span> : <span className="font-medium text-slate-600">{row.exec}</span>}
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {row.elite === true ? <span className="text-green-500 text-lg">●</span> : row.elite === false ? <span className="text-slate-300">-</span> : <span className="font-medium text-slate-600">{row.elite}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Enterprise & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Enterprise CTA */}
            <div className="bg-brand-primary rounded-[32px] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-heading font-bold mb-4">{t('enterprisePlan')}</h3>
                    <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                        {t('enterpriseDesc')}
                    </p>
                    <button className="px-8 py-4 bg-white text-brand-primary font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-lg w-fit">
                        {t('contactSales')}
                    </button>
                </div>
            </div>

            {/* FAQ */}
            <div>
                <h3 className="text-2xl font-bold text-brand-primary mb-6">{t('frequentlyAsked')}</h3>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
                            <button 
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full px-6 py-4 text-start font-bold text-brand-primary flex justify-between items-center"
                            >
                                {faq.q}
                                <span className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            <div className={`px-6 text-slate-600 text-sm leading-relaxed transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {faq.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionPage;
