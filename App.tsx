
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
import ConsultingPage from './components/ConsultingPage'; // NEW
import { Business, ServiceType, Invoice, BusinessGenome } from './types';
import { getMockBusinesses, MY_BUSINESS_GENOME } from './constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from './utils/translations';

type AppView = 'home' | 'map' | 'services' | 'business-network' | 'consulting' | 'profile' | 'subscription' | 'about' | 'faq' | 'contact' | 'our-services';

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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-slate-100' 
            : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            
            {/* Right: Logo (Typographic) */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-sm text-xl font-bold font-serif">
                 B
              </div>
              <div className="hidden sm:flex flex-col">
                <span className={`font-bold text-lg leading-none text-brand-primary tracking-tight font-heading`}>
                  {t('appTitle')}
                </span>
              </div>
            </div>

            {/* Center-Right: Links */}
            <nav className="hidden md:flex items-center gap-8">
              {(['home', 'map', 'our-services', 'consulting', 'business-network', 'subscription', 'about'] as AppView[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    activeTab === tab 
                      ? 'text-brand-primary font-bold' 
                      : 'text-text-sub hover:text-brand-primary'
                  }`}
                >
                  {t(tab === 'subscription' ? 'plansTitle' : tab === 'our-services' ? 'ourServices' : tab === 'consulting' ? 'consultingPage' : tab === 'business-network' ? 'businessNetworkPage' : tab)}
                </button>
              ))}
            </nav>

            {/* Left: Actions */}
            <div className="flex items-center gap-6">
               {/* Language */}
               <div className="relative group">
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="appearance-none bg-transparent text-xs font-bold uppercase cursor-pointer text-text-sub py-1 pr-4 outline-none hover:text-brand-primary"
                  >
                    <option value="ar">AR</option>
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                  </select>
               </div>

               {/* User Profile / Login */}
               {isLoggedIn ? (
                 <button 
                   onClick={() => setActiveTab('profile')}
                   className="relative group ml-2"
                 >
                    <div className={`p-0.5 rounded-full transition-all duration-300 ${activeTab === 'profile' ? 'ring-2 ring-brand-primary' : ''}`}>
                      <div className="w-9 h-9 rounded-full bg-brand-surface flex items-center justify-center text-brand-primary border border-slate-200">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                         </svg>
                      </div>
                    </div>
                 </button>
               ) : (
                 <button
                   onClick={() => setShowAuthModal(true)}
                   className="ml-2 px-6 py-3 rounded-2xl bg-brand-primary hover:bg-[#052c42] text-white font-semibold text-sm shadow-card hover:shadow-card-hover transition-all"
                 >
                   {t('loginButton')}
                 </button>
               )}
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        
        {activeTab === 'home' && (
          <LandingPage 
            onNavigate={(tab) => setActiveTab(tab as any)} 
            isLoggedIn={isLoggedIn}
            onLogin={() => setShowAuthModal(true)}
          />
        )}

        {activeTab === 'about' && (
           <div className="max-w-7xl mx-auto px-6 mt-12">
              <AboutPage />
           </div>
        )}
        
        {activeTab === 'our-services' && (
           <ServicesPage />
        )}

        {activeTab === 'business-network' && (
           <BusinessNetworkPage businesses={businesses} />
        )}

        {activeTab === 'consulting' && (
           <ConsultingPage />
        )}

        {activeTab === 'faq' && (
           <div className="max-w-7xl mx-auto px-6 mt-12">
              <FaqPage />
           </div>
        )}

        {activeTab === 'contact' && (
           <div className="max-w-7xl mx-auto px-6 mt-12">
              <ContactPage />
           </div>
        )}

        {activeTab === 'profile' && isLoggedIn && (
          <div className="max-w-7xl mx-auto px-6 mt-12">
             <ProfilePage 
                onLogout={handleLogout} 
                invoices={invoices}
                onPayInvoice={handlePayInvoice}
                onAddBusiness={handleAddBusiness}
                businesses={businesses}
             />
          </div>
        )}

        {activeTab === 'subscription' && (
           <div className="max-w-7xl mx-auto px-6 mt-12">
              <SubscriptionPage onSubscribe={handleSubscribe} />
           </div>
        )}

        {activeTab === 'map' && (
          <div className="h-[calc(100vh-5rem)] w-full relative bg-brand-surface">
            <div className="absolute inset-0 max-w-[1800px] mx-auto p-6">
              <OfficeMap 
                businesses={businesses} 
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onRentClick={handleRentClick}
                onAddBusiness={handleAddBusiness}
                onUpdateBusiness={handleUpdateBusiness}
              />
            </div>
          </div>
        )}

        {activeTab === 'services' && isLoggedIn && (
          <div className="max-w-[1600px] mx-auto animate-fade-in px-6 mt-12">
            <ServiceStats consultationCount={consultationCount} />
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-22rem)] min-h-[600px]">
               <div className="xl:col-span-3 h-full overflow-y-auto custom-scrollbar pr-2">
                 <ServicesDashboard activeService={activeService} onSelectService={setActiveService} />
               </div>
               
               <div className="xl:col-span-9 h-full">
                 {activeService === ServiceType.NETWORK_INTELLIGENCE ? (
                    <NetworkIntelligence businesses={businesses} userGenome={MY_BUSINESS_GENOME.genomeProfile as BusinessGenome} />
                 ) : activeService === ServiceType.CONSULTING ? (
                   <AIConsultant onMessageSent={handleConsultationSent} />
                 ) : activeService === ServiceType.TASK_MANAGER ? (
                   <TaskManager />
                 ) : (
                   <div className="h-full min-h-[400px] bg-white rounded-3xl border border-slate-100 shadow-card flex flex-col items-center justify-center text-center p-10">
                      <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center text-brand-primary mb-6">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold mb-2 font-heading text-brand-primary">{t('comingSoon')}</h2>
                      <p className="text-text-sub max-w-md leading-relaxed">
                        {t('serviceDeveloping', { service: t(activeService.toLowerCase() as any) })}
                      </p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {activeTab !== 'map' && <Footer onNavigate={(view) => setActiveTab(view)} />}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm overflow-y-auto flex items-center justify-center">
           <div className="relative w-full max-w-md">
             <button 
               onClick={() => setShowAuthModal(false)}
               className="absolute -top-12 right-0 p-2 text-white hover:opacity-80"
             >
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <AuthPage onLogin={handleLogin} />
           </div>
        </div>
      )}

      {/* Rental Modal */}
      {showRentalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
           <div className="bg-white rounded-2xl shadow-elevated w-full max-w-lg overflow-hidden border border-slate-100">
              <div className="p-10 text-center">
                 {rentalStep === 'confirm' && (
                   <>
                     <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                     </div>
                     <h2 className="text-2xl font-bold text-brand-primary mb-2 font-heading">{t('confirmBooking')}</h2>
                     <p className="text-text-sub mb-8 text-sm">{t('getFreePlan')}</p>
                     <div className="bg-brand-surface rounded-xl p-6 text-start mb-8 space-y-3 border border-slate-100">
                        <p className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">{t('planFeatures')}</p>
                        {['Address', 'AI Assistant', 'Network Access'].map((item,i) => (
                            <li key={i} className="text-sm text-text-sub flex items-center gap-3">
                               <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                               {item}
                            </li>
                        ))}
                     </div>
                     <div className="flex gap-3">
                        <button 
                          onClick={() => setShowRentalModal(false)}
                          className="flex-1 h-12 rounded-xl border border-slate-200 font-semibold text-text-sub hover:bg-slate-50 transition-colors"
                        >
                          {t('cancel')}
                        </button>
                        <button 
                          onClick={confirmRental}
                          className="flex-1 h-12 rounded-xl bg-brand-primary hover:bg-[#052c42] text-white font-semibold shadow-sm transition-all"
                        >
                          {t('confirm')}
                        </button>
                     </div>
                   </>
                 )}

                 {rentalStep === 'processing' && (
                   <div className="py-12">
                      <div className="w-12 h-12 border-2 border-brand-surface border-t-brand-primary rounded-full animate-spin mx-auto mb-6"></div>
                      <h3 className="text-lg font-bold mb-2 text-brand-primary">{t('processing')}</h3>
                      <p className="text-text-sub text-sm">{t('activating')}</p>
                   </div>
                 )}

                 {rentalStep === 'success' && (
                   <>
                     <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                     </div>
                     <h2 className="text-2xl font-bold text-brand-primary mb-2 font-heading">{t('successBooking')}</h2>
                     <p className="text-text-sub mb-8 max-w-xs mx-auto leading-relaxed text-sm">{t('congratsBooking')}</p>
                     <button 
                       onClick={() => {
                         setShowRentalModal(false);
                         setActiveTab('profile');
                       }}
                       className="w-full h-12 rounded-xl bg-brand-primary hover:bg-[#052c42] text-white font-bold shadow-sm transition-colors"
                     >
                       {t('startWork')}
                     </button>
                   </>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default App;
