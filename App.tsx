
import React, { useState, useEffect } from 'react';
import OfficeMap from './components/OfficeMap';
import AIConsultant from './components/AIConsultant';
import TaskManager from './components/TaskManager';
import ServicesDashboard from './components/ServicesDashboard';
import ServiceStats from './components/ServiceStats';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import SubscriptionPage from './components/SubscriptionPage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import FaqPage from './components/FaqPage';
import ContactPage from './components/ContactPage';
import ServicesPage from './components/ServicesPage';
import LoadingScreen from './components/LoadingScreen';
import NetworkIntelligence from './components/NetworkIntelligence'; 
import BusinessNetworkPage from './components/BusinessNetworkPage'; 
import ConsultingPage from './components/ConsultingPage';
import AiModelsPage from './components/AiModelsPage';
import { Business, ServiceType, Invoice, BusinessGenome } from './types';
import { getMockBusinesses, MY_BUSINESS_GENOME } from './constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from './utils/translations';

type AppView = 'home' | 'map' | 'services' | 'ai-models' | 'business-network' | 'consulting' | 'profile' | 'subscription' | 'about' | 'faq' | 'contact' | 'our-services';

const App: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  
  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<AppView>('home');
  const [scrolled, setScrolled] = useState(false);
  
  const [businesses, setBusinesses] = useState<Business[]>(() => getMockBusinesses(language));
  const [activeService, setActiveService] = useState<ServiceType>(ServiceType.NETWORK_INTELLIGENCE);
  const [consultationCount, setConsultationCount] = useState(24);
  
  // Favorite State
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Rental Modal State
  const [rentingBusiness, setRentingBusiness] = useState<Business | null>(null);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [rentalStep, setRentalStep] = useState<'confirm' | 'processing' | 'success'>('confirm');

  // Invoice & Wallet State
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language Switcher Logic
  useEffect(() => {
    const localizedBusinesses = getMockBusinesses(language);
    setBusinesses(prev => {
        if (prev.length === 0) return localizedBusinesses;
        return localizedBusinesses.map(biz => {
            const existing = prev.find(b => b.id === biz.id);
            if (existing) {
                if (existing.isOccupied && (biz.id === '4' || biz.id === '5')) {
                    return existing;
                }
                return { 
                    ...biz, 
                    isOccupied: existing.isOccupied, 
                    activeVisitors: existing.activeVisitors,
                    genomeProfile: biz.genomeProfile // Keep Genome data sync
                };
            }
            return biz;
        });
    });
  }, [language]);

  // Real-time data simulation
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setBusinesses(prev => prev.map(b => {
        if (b.isOccupied) {
          const variance = Math.floor(Math.random() * 7) - 3; 
          const current = b.activeVisitors || 0;
          const next = Math.max(0, current + variance);
          return { ...b, activeVisitors: next };
        }
        return b;
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home'); 
  };

  const toggleFavorite = (id: string) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const handleRentClick = (business: Business) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setRentingBusiness(business);
    setRentalStep('confirm');
    setShowRentalModal(true);
  };

  const handleAddBusiness = (newBusiness: Business) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setBusinesses(prev => [...prev, newBusiness]);
  };

  const handleUpdateBusiness = (updatedBusiness: Business) => {
    setBusinesses(prev => prev.map(b => b.id === updatedBusiness.id ? updatedBusiness : b));
  };

  const confirmRental = () => {
    setRentalStep('processing');
    setTimeout(() => {
      if (rentingBusiness) {
        const updatedBusiness: Business = {
          ...rentingBusiness,
          isOccupied: true,
          name: language === 'ar' ? 'شركتك الناشئة' : 'Your Startup',
          category: 'TECHNOLOGY',
          logoUrl: `https://ui-avatars.com/api/?name=New+Company&background=073D5A&color=fff`,
          description: language === 'ar' ? 'مكتب افتراضي جديد.' : 'New virtual office.',
          activeVisitors: 1, 
          services: [t('cat_TECHNOLOGY')],
          contact: {
             email: 'contact@startup.com',
             website: 'www.startup.com'
          }
        };
        setBusinesses(prev => prev.map(b => b.id === rentingBusiness.id ? updatedBusiness : b));
      }
      setRentalStep('success');
    }, 2500);
  };

  const handleConsultationSent = () => {
    setConsultationCount(prev => prev + 1);
  };

  const handleSubscribe = (planId: string) => {
      if (!isLoggedIn) {
          setShowAuthModal(true);
          return;
      }
      const planPrice = planId === 'free' ? '0' : planId === 'pro' ? '299' : '899';
      const planName = planId === 'free' ? t('planFree') : planId === 'pro' ? t('planPro') : t('planEnterprise');
      
      const newInvoice: Invoice = {
          id: Date.now().toString(),
          planName: planName,
          amount: planPrice,
          date: new Date(),
          status: 'pending',
          reference: Math.floor(100000 + Math.random() * 900000).toString()
      };

      setInvoices(prev => [newInvoice, ...prev]);
      setActiveTab('profile');
  };

  const handlePayInvoice = (invoiceId: string) => {
      setInvoices(prev => prev.map(inv => 
          inv.id === invoiceId ? { ...inv, status: 'paid' } : inv
      ));
  };

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-text-main flex flex-col font-sans relative selection:bg-brand-primary selection:text-white">
      
      {/* Navigation Bar */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-slate-100' 
            : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setActiveTab('home')}
              >
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-heading font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                   م
                </div>
                <div className="flex flex-col">
                   <span className="font-heading font-bold text-lg text-brand-primary leading-none group-hover:text-blue-700 transition-colors">
                     {t('appTitle')}
                   </span>
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors">
                     Digital District
                   </span>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1">
                 {[
                   { id: 'home', label: t('home') },
                   { id: 'map', label: t('map') },
                   { id: 'services', label: t('manageServices') },
                   { id: 'ai-models', label: t('aiModelsPage') },
                   { id: 'business-network', label: t('businessNetworkPage') },
                   { id: 'consulting', label: t('consultingPage') },
                   { id: 'subscription', label: t('plansTitle') },
                   { id: 'about', label: t('aboutUs') },
                 ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as AppView)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 relative group overflow-hidden ${
                        activeTab === item.id 
                          ? 'text-brand-primary bg-slate-50' 
                          : 'text-slate-500 hover:text-brand-primary hover:bg-slate-50/50'
                      }`}
                    >
                       <span className="relative z-10">{item.label}</span>
                       {activeTab === item.id && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary animate-fade-in"></span>
                       )}
                    </button>
                 ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-3">
                 {/* Lang Switcher */}
                 <div className="flex bg-slate-100 rounded-lg p-1">
                    <button 
                      onClick={() => setLanguage('ar')}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${language === 'ar' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400'}`}
                    >
                      عربي
                    </button>
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400'}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => setLanguage('es')}
                      className={`px-2 py-1 rounded text-xs font-bold transition-all ${language === 'es' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400'}`}
                    >
                      ES
                    </button>
                 </div>

                 {isLoggedIn ? (
                    <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                       <button 
                         onClick={() => setActiveTab('profile')}
                         className="flex items-center gap-2 hover:bg-slate-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-slate-100 transition-all"
                       >
                          <img src="https://ui-avatars.com/api/?name=Ahmed+Ali&background=random" className="w-8 h-8 rounded-full shadow-sm" alt="Profile" />
                          <div className="hidden xl:block text-start">
                             <span className="block text-xs font-bold text-brand-primary">Ahmed Ali</span>
                             <span className="block text-[10px] text-slate-400">TechVision</span>
                          </div>
                       </button>
                    </div>
                 ) : (
                    <button 
                      onClick={() => setShowAuthModal(true)}
                      className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/10 hover:bg-[#052c42] hover:shadow-blue-900/20 transition-all active:scale-95"
                    >
                      {t('loginButton')}
                    </button>
                 )}
              </div>
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'home' && (
          isLoggedIn ? (
            <div className="animate-fade-in space-y-8">
               <ServiceStats consultationCount={consultationCount} />
               
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
                  {/* Left: Map Preview */}
                  <div className="lg:col-span-2 bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden relative group">
                      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold text-brand-primary shadow-sm flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                         {t('liveActivity')}
                      </div>
                      <OfficeMap 
                        businesses={businesses}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        onRentClick={handleRentClick}
                        onAddBusiness={handleAddBusiness}
                        onUpdateBusiness={handleUpdateBusiness}
                      />
                      {/* Overlay to encourage clicking full map */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none"></div>
                  </div>

                  {/* Right: AI Assistant */}
                  <div className="lg:col-span-1 h-full">
                      <AIConsultant 
                        onMessageSent={handleConsultationSent}
                      />
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                     <div className="bg-white p-6 rounded-3xl shadow-card border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-brand-primary text-lg">{t('servicesDashboard')}</h3>
                            <button onClick={() => setActiveTab('services')} className="text-xs font-bold text-blue-600 hover:underline">{t('viewAll')}</button>
                        </div>
                        <ServicesDashboard activeService={activeService} onSelectService={setActiveService} />
                     </div>
                  </div>
                  <div className="lg:col-span-1">
                     <TaskManager />
                  </div>
               </div>
            </div>
          ) : (
            <LandingPage 
              onNavigate={setActiveTab} 
              isLoggedIn={isLoggedIn} 
              onLogin={() => setShowAuthModal(true)} 
            />
          )
        )}

        {activeTab === 'map' && (
           <div className="h-[calc(100vh-140px)] rounded-3xl overflow-hidden shadow-elevated border border-slate-200 bg-slate-900 animate-scale-in">
              <OfficeMap 
                businesses={businesses}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onRentClick={handleRentClick}
                onAddBusiness={handleAddBusiness}
                onUpdateBusiness={handleUpdateBusiness}
              />
           </div>
        )}

        {activeTab === 'services' && (
           <div className="animate-fade-in">
              <ServicesPage />
           </div>
        )}

        {activeTab === 'ai-models' && (
           <div className="animate-fade-in">
              <AiModelsPage />
           </div>
        )}

        {activeTab === 'business-network' && (
           <div className="animate-fade-in">
              <BusinessNetworkPage businesses={businesses} />
           </div>
        )}

        {activeTab === 'consulting' && (
           <div className="animate-fade-in">
              <ConsultingPage />
           </div>
        )}

        {activeTab === 'subscription' && (
           <div className="animate-fade-in">
              <SubscriptionPage onSubscribe={handleSubscribe} />
           </div>
        )}

        {activeTab === 'profile' && (
           <div className="animate-fade-in">
              <ProfilePage 
                onLogout={handleLogout} 
                invoices={invoices}
                onPayInvoice={handlePayInvoice}
                onAddBusiness={handleAddBusiness}
                businesses={businesses}
              />
           </div>
        )}

        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'faq' && <FaqPage />}
        {activeTab === 'contact' && <ContactPage />}

      </main>

      <Footer onNavigate={setActiveTab} />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div className="relative w-full max-w-md">
             <button 
               onClick={() => setShowAuthModal(false)}
               className="absolute -top-12 right-0 text-white hover:text-slate-200 transition-colors"
             >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <AuthPage onLogin={handleLogin} />
          </div>
        </div>
      )}

      {/* Rental Modal */}
      {showRentalModal && rentingBusiness && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-scale-in">
            {rentalStep === 'confirm' && (
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto text-blue-600">
                   🏢
                </div>
                <h3 className="text-2xl font-bold text-center text-brand-primary mb-2 font-heading">{t('confirmBooking')}</h3>
                <p className="text-center text-slate-500 mb-8">{t('getFreePlan')}</p>
                
                <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100">
                  <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">{t('planFeatures')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-bold text-brand-primary">
                       <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                       {t('featureAddress')}
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-brand-primary">
                       <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                       {t('featureAI')}
                    </li>
                    <li className="flex items-center gap-3 text-sm font-bold text-brand-primary">
                       <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                       {t('featureNetwork')}
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowRentalModal(false)}
                    className="flex-1 py-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    {t('cancel')}
                  </button>
                  <button 
                    onClick={confirmRental}
                    className="flex-1 py-4 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:bg-[#052c42] transition-colors"
                  >
                    {t('confirm')}
                  </button>
                </div>
              </div>
            )}

            {rentalStep === 'processing' && (
              <div className="p-12 text-center">
                 <div className="relative w-20 h-20 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">⚙️</div>
                 </div>
                 <h3 className="text-xl font-bold text-brand-primary mb-2 animate-pulse">{t('processing')}</h3>
                 <p className="text-slate-400 text-sm">{t('activating')}</p>
              </div>
            )}

            {rentalStep === 'success' && (
              <div className="p-8 text-center bg-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-blue-500/5"></div>
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto animate-bounce text-green-600 shadow-lg shadow-green-200 relative z-10">
                    🎉
                 </div>
                 <h3 className="text-2xl font-bold text-brand-primary mb-2 relative z-10">{t('successBooking')}</h3>
                 <p className="text-slate-600 mb-8 max-w-xs mx-auto relative z-10">{t('congratsBooking')}</p>
                 <button 
                    onClick={() => { setShowRentalModal(false); setActiveTab('profile'); }}
                    className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-[#052c42] transition-colors relative z-10"
                 >
                    {t('startWork')}
                 </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
