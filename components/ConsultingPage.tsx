
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ConsultingPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    details: '',
    budget: ''
  });

  const categories = [
    { id: 'cons_tech', icon: 'tech', color: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-500' },
    { id: 'cons_marketing', icon: 'market', color: 'bg-purple-50 text-purple-600', border: 'hover:border-purple-500' },
    { id: 'cons_training', icon: 'train', color: 'bg-green-50 text-green-600', border: 'hover:border-green-500' },
    { id: 'cons_recruitment', icon: 'recruit', color: 'bg-orange-50 text-orange-600', border: 'hover:border-orange-500' },
    { id: 'cons_gov', icon: 'gov', color: 'bg-slate-50 text-slate-600', border: 'hover:border-slate-500' },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'tech': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
      case 'market': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />;
      case 'train': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
      case 'recruit': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />;
      case 'gov': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />;
      default: return <path d="" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', company: '', email: '', phone: '', details: '', budget: '' });
        setSelectedCategory(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-offWhite animate-fade-in">
      
      {/* Hero Section */}
      <div className="bg-brand-primary text-white pt-16 pb-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/90"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                Premium Services
             </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('consultingTitle')}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
               {t('consultingSubtitle')}
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-20">
         <div className="bg-white rounded-[32px] shadow-elevated p-8 md:p-12 border border-slate-100">
            
            {/* Steps / Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               
               {/* Left: Category Selection */}
               <div className="lg:col-span-5">
                  <h3 className="text-lg font-bold text-brand-primary mb-6 flex items-center gap-2">
                     <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-xs">1</span>
                     {t('selectConsultingType')}
                  </h3>
                  <div className="space-y-4">
                     {categories.map((cat) => (
                        <button
                           key={cat.id}
                           onClick={() => setSelectedCategory(cat.id)}
                           className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group text-start ${
                              selectedCategory === cat.id 
                              ? 'border-brand-primary bg-blue-50/50 shadow-sm' 
                              : 'border-slate-100 bg-white hover:border-slate-300'
                           }`}
                        >
                           <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-colors ${cat.color} ${selectedCategory === cat.id ? 'ring-2 ring-offset-2 ring-brand-primary/20' : ''}`}>
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 {getIcon(cat.icon)}
                              </svg>
                           </div>
                           <div>
                              <h4 className={`font-bold text-sm ${selectedCategory === cat.id ? 'text-brand-primary' : 'text-slate-700'}`}>
                                 {t(cat.id)}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1">{t(cat.id + '_desc')}</p>
                           </div>
                           {selectedCategory === cat.id && (
                              <div className="ml-auto text-brand-primary">
                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              </div>
                           )}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Right: Request Form */}
               <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l lg:border-slate-100 pt-12 lg:pt-0 lg:pl-12 rtl:lg:pl-0 rtl:lg:pr-12">
                  <h3 className="text-lg font-bold text-brand-primary mb-6 flex items-center gap-2">
                     <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-xs">2</span>
                     {t('requestConsultation')}
                  </h3>

                  {isSubmitted ? (
                     <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center animate-scale-in">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6 text-green-600">
                           ✅
                        </div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-2">{t('requestSentSuccess')}</h3>
                        <p className="text-slate-600 max-w-sm mx-auto">{t('weWillContact')}</p>
                        <button onClick={() => setIsSubmitted(false)} className="mt-8 text-sm font-bold text-green-700 hover:underline">Send another request</button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className={`space-y-6 transition-opacity duration-300 ${!selectedCategory ? 'opacity-50 pointer-events-none blur-[1px]' : 'opacity-100'}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('name')}</label>
                              <input 
                                 type="text" 
                                 required
                                 value={formData.name}
                                 onChange={e => setFormData({...formData, name: e.target.value})}
                                 className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('companyName')}</label>
                              <input 
                                 type="text" 
                                 required
                                 value={formData.company}
                                 onChange={e => setFormData({...formData, company: e.target.value})}
                                 className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('email')}</label>
                              <input 
                                 type="email" 
                                 required
                                 value={formData.email}
                                 onChange={e => setFormData({...formData, email: e.target.value})}
                                 className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('phone')}</label>
                              <input 
                                 type="tel" 
                                 required
                                 value={formData.phone}
                                 onChange={e => setFormData({...formData, phone: e.target.value})}
                                 className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('projectDetails')}</label>
                           <textarea 
                              rows={4}
                              required
                              value={formData.details}
                              onChange={e => setFormData({...formData, details: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none"
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('budgetRange')}</label>
                           <select 
                              value={formData.budget}
                              onChange={e => setFormData({...formData, budget: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                           >
                              <option value="">Select Range</option>
                              <option value="small">Less than 10,000 SAR</option>
                              <option value="medium">10,000 - 50,000 SAR</option>
                              <option value="large">50,000 - 200,000 SAR</option>
                              <option value="enterprise">200,000+ SAR</option>
                           </select>
                        </div>

                        <button 
                           type="submit"
                           disabled={!selectedCategory}
                           className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-[#052c42] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {t('submitRequest')}
                        </button>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ConsultingPage;
