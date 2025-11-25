import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageProps {
  onNavigate: (tab: 'map' | 'services' | 'subscription') => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isLoggedIn, onLogin }) => {
  const { t, language } = useLanguage();

  // Unsplash Images - Corporate & High End
  const images = {
    hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", 
    feature1: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    feature2: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    feature3: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    testimonials: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    ]
  };

  return (
    <div className="animate-fade-in flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full bg-brand-surface pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border-l-2 border-brand-gold">
                <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">The New Standard</span>
              </div>
              
              <h1 className={`text-[42px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] text-brand-primary tracking-tight mb-8 ${language !== 'ar' ? 'font-serif' : 'font-heading'}`}>
                {isLoggedIn ? t('welcomeBack') : t('heroTitle')}
              </h1>
              
              <p className="text-lg text-text-sub leading-relaxed font-light max-w-xl mb-10">
                {isLoggedIn ? t('dashboardSubtitle') : t('heroSubtitle')}
              </p>
              
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => onNavigate('map')}
                      className="h-12 px-8 rounded-lg bg-brand-primary text-white font-semibold text-sm hover:bg-[#052c42] transition-all duration-300 min-w-[160px]"
                    >
                      {t('exploreCity')}
                    </button>
                    <button
                      onClick={() => onNavigate('services')}
                      className="h-12 px-8 rounded-lg bg-white border border-slate-200 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-all duration-300 min-w-[160px]"
                    >
                      {t('manageServices')}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('subscription')}
                      className="h-12 px-8 rounded-lg bg-brand-primary text-white font-semibold text-sm hover:bg-[#052c42] transition-all duration-300 min-w-[160px]"
                    >
                      {t('startNow')}
                    </button>
                    <button
                      onClick={onLogin}
                      className="h-12 px-8 rounded-lg bg-white border border-slate-200 text-brand-primary font-semibold text-sm hover:bg-slate-50 transition-all duration-300 min-w-[160px]"
                    >
                      {t('joinCommunity')}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Image Content */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full">
                 <div className="absolute top-4 -right-4 w-full h-full border border-brand-gold/30 rounded-sm"></div>
                 <div className="relative w-full h-full rounded-sm shadow-2xl overflow-hidden">
                    <img 
                      src={images.hero} 
                      alt="Corporate Office" 
                      className="w-full h-full object-cover"
                    />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PARTNERS --- */}
      <div className="w-full py-12 border-b border-slate-100 bg-white">
         <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">{t('trustedBy')}</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-80 transition-all duration-500">
               <span className="text-xl font-serif font-bold text-slate-800">TechVision</span>
               <span className="text-xl font-serif font-bold text-slate-800">ARAMCO Digital</span>
               <span className="text-xl font-serif font-bold text-slate-800">STC Solutions</span>
               <span className="text-xl font-serif font-bold text-slate-800">Riyadh Valley</span>
            </div>
         </div>
      </div>

      {/* --- FEATURES --- */}
      
      {/* Feature 1 */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/3]">
               <img src={images.feature1} alt="Prestigious Office" className="relative rounded-lg shadow-xl w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
               <div className="w-12 h-12 rounded-lg bg-brand-surface border border-slate-100 flex items-center justify-center text-brand-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
               </div>
               <h2 className="text-3xl font-heading font-bold text-brand-primary leading-tight">
                  {t('feat_prestige_title')}
               </h2>
               <p className="text-lg text-text-sub leading-relaxed font-light">
                  {t('feat_prestige_desc')}
               </p>
               <ul className="space-y-3 pt-4">
                  {['Official Commercial Address', 'Mail Handling', 'Receptionist Service'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                        {item}
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </div>

      {/* Feature 2 */}
      <div className="w-full bg-brand-surface py-24 border-y border-slate-100">
         <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="order-2 lg:order-1 space-y-6">
                  <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-brand-gold">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-brand-primary leading-tight">
                      {t('feat_ai_title')}
                  </h2>
                  <p className="text-lg text-text-sub leading-relaxed font-light">
                      {t('feat_ai_desc')}
                  </p>
                </div>
                <div className="order-1 lg:order-2 relative aspect-[4/3]">
                   <img src={images.feature2} alt="AI Technology" className="relative rounded-lg shadow-xl w-full h-full object-cover" />
                </div>
            </div>
         </div>
      </div>

      {/* Feature 3 */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/3]">
               <img src={images.feature3} alt="Networking" className="relative rounded-lg shadow-xl w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
               <div className="w-12 h-12 rounded-lg bg-brand-surface border border-slate-100 flex items-center justify-center text-brand-gold">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
               </div>
               <h2 className="text-3xl font-heading font-bold text-brand-primary leading-tight">
                  {t('feat_network_title')}
               </h2>
               <p className="text-lg text-text-sub leading-relaxed font-light">
                  {t('feat_network_desc')}
               </p>
            </div>
         </div>
      </div>

      {/* --- STATISTICS --- */}
      <div className="w-full bg-brand-primary text-white py-24">
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { val: '5,000+', label: t('stats_members') },
              { val: '1,200', label: t('stats_companies') },
              { val: '98%', label: t('stats_satisfaction') },
              { val: '240%', label: t('stats_growth') }
            ].map((stat, i) => (
              <div key={i} className="space-y-3">
                 <div className="text-4xl md:text-5xl font-bold font-serif tracking-tight text-white">{stat.val}</div>
                 <div className="text-xs font-medium text-brand-gold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
         </div>
      </div>

      {/* --- CTA --- */}
      <div className="w-full px-6 py-24 bg-white">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-primary leading-tight">
               {t('cta_title')}
            </h2>
            <p className="text-lg text-text-sub leading-relaxed font-light">
               {t('cta_desc')}
            </p>
            <div className="pt-4">
              <button 
                 onClick={onLogin}
                 className="h-14 px-12 rounded-lg bg-brand-primary text-white font-bold text-sm hover:bg-[#052c42] transition-colors shadow-lg"
              >
                 {t('cta_button')}
              </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default LandingPage;