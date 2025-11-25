
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import NetworkIntelligence from './NetworkIntelligence';
import AIConsultant from './AIConsultant';
import { Business, BusinessGenome } from '../types';
import { MY_BUSINESS_GENOME } from '../constants';

interface BusinessNetworkPageProps {
  businesses: Business[];
}

const BusinessNetworkPage: React.FC<BusinessNetworkPageProps> = ({ businesses }) => {
  const { t } = useLanguage();
  
  // --- Business DNA Profile State ---
  // Initialize with mock data or empty defaults
  const [userGenome, setUserGenome] = useState<BusinessGenome>(MY_BUSINESS_GENOME.genomeProfile as BusinessGenome);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Modal Form States for adding array items
  const [newServiceOffer, setNewServiceOffer] = useState('');
  const [newServiceNeed, setNewServiceNeed] = useState('');
  const [newCollabPref, setNewCollabPref] = useState('');

  // Extract unique industries and sizes from the ecosystem for dropdown options
  const { uniqueIndustries } = useMemo(() => {
    const industries = new Set<string>();
    businesses.forEach(b => {
       if (b.isOccupied && b.genomeProfile?.industrySector) {
           industries.add(b.genomeProfile.industrySector);
       }
    });
    return {
        uniqueIndustries: Array.from(industries).sort()
    };
  }, [businesses]);

  // Handlers for Profile Editing (Array manipulation)
  const addServiceOffer = () => {
      if(newServiceOffer.trim()) {
          setUserGenome(prev => ({...prev, servicesOffered: [...prev.servicesOffered, newServiceOffer]}));
          setNewServiceOffer('');
      }
  };
  const removeServiceOffer = (idx: number) => {
      setUserGenome(prev => ({...prev, servicesOffered: prev.servicesOffered.filter((_, i) => i !== idx)}));
  };

  const addServiceNeed = () => {
      if(newServiceNeed.trim()) {
          setUserGenome(prev => ({...prev, servicesNeeded: [...prev.servicesNeeded, newServiceNeed]}));
          setNewServiceNeed('');
      }
  };
  const removeServiceNeed = (idx: number) => {
      setUserGenome(prev => ({...prev, servicesNeeded: prev.servicesNeeded.filter((_, i) => i !== idx)}));
  };

  const addCollabPref = () => {
      if(newCollabPref.trim()) {
          setUserGenome(prev => ({...prev, collaborationPreferences: [...(prev.collaborationPreferences || []), newCollabPref]}));
          setNewCollabPref('');
      }
  };
  const removeCollabPref = (idx: number) => {
      setUserGenome(prev => ({...prev, collaborationPreferences: (prev.collaborationPreferences || []).filter((_, i) => i !== idx)}));
  };

  return (
    <div className="animate-fade-in w-full bg-brand-surface min-h-screen">
       
       {/* Page Header */}
       <div className="bg-brand-primary pt-16 pb-24 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/90"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                Beta Feature
             </div>
             <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('businessNetworkPage')}</h1>
             <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
               {t('businessNetworkSubtitle')}
             </p>
          </div>
       </div>

       {/* Content Container */}
       <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-20 pb-20">
          
          {/* Network Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
             {[
                { label: 'activeCompanies', value: '1,240', icon: '🏢', color: 'bg-blue-50 text-blue-600' },
                { label: 'totalMatches', value: '85', icon: '🤝', color: 'bg-green-50 text-green-600' },
                { label: 'openOpportunities', value: '12', icon: '💼', color: 'bg-purple-50 text-purple-600' },
                { label: 'newMember', value: '+5', icon: '🚀', color: 'bg-orange-50 text-orange-600' }
             ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-card border border-slate-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${stat.color}`}>
                      {stat.icon}
                   </div>
                   <div>
                      <div className="text-2xl font-bold text-brand-primary">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t(stat.label)}</div>
                   </div>
                </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Main Column: Network Intelligence (8 cols) */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                  <div className="bg-white rounded-3xl shadow-elevated overflow-hidden min-h-[800px] flex flex-col border border-slate-100">
                      {/* Pass the managed genome to the intelligence component */}
                      <NetworkIntelligence businesses={businesses} userGenome={userGenome} />
                  </div>
              </div>

              {/* Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
                  
                  {/* --- AI Networking Assistant (Prominent at top) --- */}
                  <div className="bg-white rounded-[32px] shadow-card border border-slate-100 overflow-hidden h-[500px]">
                     <AIConsultant />
                  </div>

                  {/* --- Live Opportunities Widget --- */}
                  <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="font-heading font-bold text-brand-primary flex items-center gap-2">
                             <span className="text-orange-500 animate-pulse">⚡</span> {t('liveOpportunities')}
                          </h3>
                          <button className="text-xs font-bold text-brand-primary hover:underline">{t('viewAll')}</button>
                      </div>
                      <div className="space-y-4">
                          {[
                             { title: 'rfpRequest', company: 'TechVision', type: 'Project' },
                             { title: 'partnershipReq', company: 'Logistics+', type: 'Partnership' },
                             { title: 'opp_tech', company: 'EduFuture', type: 'Project' }
                          ].map((opp, i) => (
                              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors group">
                                  <div className="flex justify-between items-start mb-2">
                                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-white text-slate-500 border border-slate-200">{opp.type}</span>
                                      <span className="text-[10px] text-slate-400">{t('postedTime')}</span>
                                  </div>
                                  <h4 className="font-bold text-brand-primary text-sm mb-1 leading-tight group-hover:text-blue-700 transition-colors">{t(opp.title)}</h4>
                                  <div className="flex justify-between items-center mt-3">
                                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                         <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                         {opp.company}
                                      </span>
                                      <button className="text-xs font-bold text-white bg-brand-primary px-3 py-1.5 rounded-lg hover:bg-[#052c42] transition-colors shadow-sm">
                                         {t('apply')}
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* --- My Business DNA Widget --- */}
                  <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-gold"></div>
                      
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="text-sm font-bold text-brand-primary uppercase tracking-widest flex items-center gap-2">
                             <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                             {t('businessDNA')}
                          </h3>
                          <button 
                             onClick={() => setIsEditingProfile(true)}
                             className="p-2 bg-slate-50 text-slate-400 hover:text-brand-primary hover:bg-blue-50 rounded-lg transition-colors"
                             title={t('editProfile')}
                          >
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>
                      </div>

                      <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <span className="text-xs text-slate-500 font-bold">{t('industrySector')}</span>
                              <span className="text-xs font-bold text-brand-primary bg-white px-2 py-1 rounded shadow-sm">{userGenome.industrySector || '-'}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <span className="text-xs text-slate-500 font-bold">{t('companySize')}</span>
                              <span className="text-xs font-bold text-brand-primary bg-white px-2 py-1 rounded shadow-sm">{userGenome.companySize || '-'}</span>
                          </div>
                          
                          <div>
                              <span className="text-xs text-slate-400 font-bold mb-2 block">{t('servicesOffered_label')}</span>
                              <div className="flex flex-wrap gap-1.5">
                                  {userGenome.servicesOffered.slice(0,3).map((s,i) => (
                                      <span key={i} className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 truncate max-w-full">
                                          {s}
                                      </span>
                                  ))}
                                  {userGenome.servicesOffered.length > 3 && (
                                      <span className="text-[10px] font-bold bg-slate-50 text-slate-400 px-2 py-1 rounded-md">+{userGenome.servicesOffered.length - 3}</span>
                                  )}
                              </div>
                          </div>
                      </div>
                      
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="w-full mt-6 py-3 border border-brand-primary text-brand-primary font-bold rounded-xl text-xs hover:bg-brand-primary hover:text-white transition-all"
                      >
                        {t('clickToEdit')}
                      </button>
                  </div>

                  {/* Featured Member */}
                  <div className="bg-brand-primary rounded-3xl p-6 text-white shadow-card relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full -mr-10 -mt-10"></div>
                      <h3 className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-4">{t('featuredMember')}</h3>
                      <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-2xl">
                             👨‍💻
                          </div>
                          <div>
                              <div className="font-bold text-lg">Sarah Miller</div>
                              <div className="text-xs text-blue-200">Tech Investor</div>
                          </div>
                      </div>
                      <p className="text-sm text-blue-100 leading-relaxed mb-4">
                         Looking for early-stage AI startups in Riyadh.
                      </p>
                      <button className="w-full py-3 bg-white text-brand-primary font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors">
                         Connect
                      </button>
                  </div>

                  {/* Upcoming Events */}
                  <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
                      <h3 className="font-heading font-bold text-brand-primary mb-6 flex items-center gap-2">
                         <span className="text-blue-500">📅</span> {t('upcomingEvents')}
                      </h3>
                      <div className="space-y-4">
                          {[1, 2].map(i => (
                              <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                  <div className="bg-blue-50 text-blue-600 rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0">
                                      <span className="text-[10px] font-bold uppercase">NOV</span>
                                      <span className="text-lg font-bold leading-none">{10 + i}</span>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-brand-primary text-sm mb-1">Virtual Tech Summit</h4>
                                      <p className="text-xs text-slate-500 mb-2">10:00 AM • Main Hall</p>
                                      <button className="text-xs font-bold text-blue-600 hover:underline">{t('joinEvent')}</button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                   {/* Trending Topics */}
                   <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
                      <h3 className="font-heading font-bold text-brand-primary mb-6 flex items-center gap-2">
                         <span className="text-purple-500">📈</span> {t('trendingTopics')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                          {['#AI_Revolution', '#Saudi_Vision_2030', '#Fintech', '#RemoteWork', '#Startup_Growth'].map(tag => (
                              <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">
                                  {tag}
                              </span>
                          ))}
                      </div>
                  </div>

              </div>
          </div>
       </div>

       {/* --- Edit Profile Modal --- */}
       {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-scale-in my-8 border border-slate-100">
                <h2 className="text-xl font-bold text-brand-primary mb-6 font-heading">{t('editProfile')}</h2>
                
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Industry Sector */}
                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-2">{t('industrySector')}</label>
                        <select 
                            value={userGenome.industrySector}
                            onChange={(e) => setUserGenome({...userGenome, industrySector: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-brand-primary outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="">Select Industry</option>
                            {uniqueIndustries.map(ind => (
                                <option key={ind} value={ind}>{ind}</option>
                            ))}
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Company Size */}
                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-2">{t('companySize')}</label>
                        <select 
                            value={userGenome.companySize}
                            onChange={(e) => setUserGenome({...userGenome, companySize: e.target.value as any})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-brand-primary outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="Startup">Startup</option>
                            <option value="SME">SME</option>
                            <option value="Enterprise">Enterprise</option>
                        </select>
                    </div>

                    {/* Services Offered */}
                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-2">{t('servicesOffered_label')}</label>
                        <div className="flex gap-2 mb-3">
                            <input 
                              type="text" 
                              value={newServiceOffer} 
                              onChange={(e) => setNewServiceOffer(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addServiceOffer()}
                              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500/10 outline-none"
                              placeholder={t('addService')}
                            />
                            <button onClick={addServiceOffer} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {userGenome.servicesOffered.map((s, i) => (
                                <div key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-blue-100">
                                    {s}
                                    <button onClick={() => removeServiceOffer(i)} className="text-blue-400 hover:text-red-500 transition-colors">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services Needed */}
                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-2">{t('servicesNeeded_label')}</label>
                        <div className="flex gap-2 mb-3">
                            <input 
                              type="text" 
                              value={newServiceNeed} 
                              onChange={(e) => setNewServiceNeed(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addServiceNeed()}
                              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-orange-500/10 outline-none"
                              placeholder={t('addService')}
                            />
                            <button onClick={addServiceNeed} className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-sm">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {userGenome.servicesNeeded.map((s, i) => (
                                <div key={i} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-orange-100">
                                    {s}
                                    <button onClick={() => removeServiceNeed(i)} className="text-orange-400 hover:text-red-500 transition-colors">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Collaboration Preferences */}
                    <div>
                        <label className="text-sm font-bold text-slate-500 block mb-2">{t('collaborationPreferences')}</label>
                        <div className="flex gap-2 mb-3">
                            <input 
                              type="text" 
                              value={newCollabPref} 
                              onChange={(e) => setNewCollabPref(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addCollabPref()}
                              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-purple-500/10 outline-none"
                              placeholder={t('addPreference')}
                            />
                            <button onClick={addCollabPref} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-sm">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(userGenome.collaborationPreferences || []).map((s, i) => (
                                <div key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-purple-100">
                                    {s}
                                    <button onClick={() => removeCollabPref(i)} className="text-purple-400 hover:text-red-500 transition-colors">✕</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
                    <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                        {t('cancel')}
                    </button>
                    <button onClick={() => setIsEditingProfile(false)} className="flex-1 py-3 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:bg-[#052c42] transition-colors">
                        {t('saveProfile')}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default BusinessNetworkPage;
