
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Business, MatchResult, BusinessGenome } from '../types';
import { generateBusinessMatches } from '../services/geminiService';
import { MY_BUSINESS_GENOME } from '../constants';

interface NetworkIntelligenceProps {
  businesses: Business[];
  userGenome: BusinessGenome; // Now required prop from parent
}

const NetworkIntelligence: React.FC<NetworkIntelligenceProps> = ({ businesses, userGenome }) => {
  const { t, language } = useLanguage();
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<{result: MatchResult, business: Business} | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  
  // Sort State
  const [sortOrder, setSortOrder] = useState<'default' | 'score'>('default');

  // Derive unique options for dropdowns (for filters)
  const { uniqueIndustries, uniqueSizes } = useMemo(() => {
    const industries = new Set<string>();
    const sizes = new Set<string>();
    
    businesses.forEach(b => {
       if (b.isOccupied && b.genomeProfile) {
           if (b.genomeProfile.industrySector) industries.add(b.genomeProfile.industrySector);
           if (b.genomeProfile.companySize) sizes.add(b.genomeProfile.companySize);
       }
    });

    return {
        uniqueIndustries: Array.from(industries).sort(),
        uniqueSizes: Array.from(sizes).sort()
    };
  }, [businesses]);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
        // 1. Filter available candidates based on user criteria (Scoped Matching)
        const filteredCandidates = businesses.filter(b => {
            if (!b.isOccupied) return false;
            
            const matchesSearch = !searchQuery || b.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesIndustry = !selectedIndustry || b.genomeProfile?.industrySector === selectedIndustry;
            const matchesSize = !selectedSize || b.genomeProfile?.companySize === selectedSize;
            
            return matchesSearch && matchesIndustry && matchesSize;
        });

        // 2. Use userGenome passed from parent
        const results = await generateBusinessMatches(userGenome, filteredCandidates, language);
        setMatches(results);
    } catch (error) {
        console.error(error);
        setMatches([]);
    } finally {
        setLoading(false);
    }
  }, [businesses, language, searchQuery, selectedIndustry, selectedSize, userGenome]); // Re-fetch when userGenome changes

  useEffect(() => {
    fetchMatches();
  }, [userGenome]); // Trigger on genome change or initial load (via fetchMatches dep)

  const getBusinessById = (id: string) => businesses.find(b => b.id === id);

  // Sort Logic
  const sortedMatches = useMemo(() => {
      let result = [...matches];
      if (sortOrder === 'score') {
          result.sort((a, b) => b.score - a.score);
      }
      // Default preserves original order from AI (relevance)
      return result;
  }, [matches, sortOrder]);

  const getFactorIcon = (factor: string) => {
    const f = factor.toLowerCase();
    if (f.includes('industry') || f.includes('sector')) return (
       // Building Icon
       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    );
    if (f.includes('service') || f.includes('match') || f.includes('offer') || f.includes('need') || f.includes('synergy')) return (
       // Handshake/Puzzle Icon
       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
    );
    if (f.includes('strategic') || f.includes('fit') || f.includes('market') || f.includes('size')) return (
       // Chart/Target Icon
       <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    );
    return <div className="w-1.5 h-1.5 rounded-full bg-current"></div>;
  };

  return (
    <div className="animate-fade-in h-full flex flex-col bg-brand-surface rounded-3xl overflow-hidden border border-slate-200 shadow-card">
      
      {/* Header */}
      <div className="bg-white p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h2 className="text-2xl font-heading font-bold text-brand-primary mb-1">{t('smartLounge')}</h2>
           <p className="text-sm text-brand-secondary">{t('network_intelligenceDesc')}</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">AI Engine Active</span>
            </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-50 p-6 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
             {/* Name Search */}
             <div className="relative lg:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{t('searchPlaceholder')}</label>
                <div className="relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. Tech..."
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm font-medium text-brand-primary"
                    />
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
             </div>

             {/* Industry Filter */}
             <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{t('filterIndustry')}</label>
                <div className="relative">
                    <select 
                       value={selectedIndustry}
                       onChange={(e) => setSelectedIndustry(e.target.value)}
                       className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm appearance-none bg-white cursor-pointer font-bold text-brand-primary"
                    >
                       <option value="">{t('allIndustries')}</option>
                       {uniqueIndustries.map(ind => (
                           <option key={ind} value={ind}>{ind}</option>
                       ))}
                    </select>
                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                </div>
             </div>

             {/* Company Size Filter */}
             <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{t('filterSize')}</label>
                <div className="relative">
                    <select 
                       value={selectedSize}
                       onChange={(e) => setSelectedSize(e.target.value)}
                       className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm appearance-none bg-white cursor-pointer font-bold text-brand-primary"
                    >
                       <option value="">{t('allSizes')}</option>
                       {uniqueSizes.map(size => (
                           <option key={size} value={size}>{size}</option>
                       ))}
                    </select>
                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                </div>
             </div>
             
             {/* Sort Dropdown */}
             <div className="relative">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">{t('sortBy')}</label>
                <div className="relative">
                    <select 
                       value={sortOrder}
                       onChange={(e) => setSortOrder(e.target.value as 'default' | 'score')}
                       disabled={loading || matches.length === 0}
                       className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm appearance-none bg-white cursor-pointer font-bold text-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       <option value="default">{t('sortDefault')}</option>
                       <option value="score">{t('sortScoreHigh')}</option>
                    </select>
                    <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                </div>
             </div>

             {/* Action Button */}
             <button 
                onClick={fetchMatches}
                disabled={loading}
                className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl shadow-sm hover:bg-blue-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 h-[46px]"
             >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {t('applyFilters')}
                    </>
                )}
             </button>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
         
         {/* Matches Grid (TOP 3 from Sorted List) */}
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{t('highValueMatch')}</h3>
         
         {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
               <div className="w-12 h-12 border-2 border-brand-surface border-t-brand-primary rounded-full animate-spin mb-4"></div>
               <p className="text-brand-secondary animate-pulse">{t('generatingMatches')}</p>
            </div>
         ) : sortedMatches.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 text-2xl">🔍</div>
                <h3 className="text-lg font-bold text-slate-600 mb-2">{t('noResults')}</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">{t('tryRefreshing')}</p>
            </div>
         ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {sortedMatches.slice(0, 3).map((match, idx) => {
                    const business = getBusinessById(match.companyId);
                    if (!business) return null;

                    const isHighPriority = match.score > 80;

                    return (
                        <div key={idx} className={`group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col ${isHighPriority ? 'border-brand-gold ring-1 ring-brand-gold/20' : 'border-slate-100'}`}>
                            {isHighPriority && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold"></div>
                             )}
                            {/* Decorative DNA Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-50 rounded-bl-full -mr-8 -mt-8 pointer-events-none"></div>

                            <div className="relative z-10 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-brand-surface border flex items-center justify-center overflow-hidden shrink-0 transition-transform ${isHighPriority ? 'border-brand-gold/30 scale-110' : 'border-slate-100'}`}>
                                        {business.logoUrl ? (
                                            <img src={business.logoUrl} className="w-full h-full object-cover" alt={business.name} />
                                        ) : (
                                            <div className="text-xs font-bold text-brand-secondary">LOGO</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-primary text-lg leading-tight line-clamp-1">{business.name}</h4>
                                        <span className="text-xs text-brand-secondary">{business.category}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className={`text-2xl font-bold ${isHighPriority ? 'text-brand-gold' : 'text-brand-primary'}`}>{match.score}%</div>
                                    <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isHighPriority ? 'bg-brand-gold/10 text-brand-gold' : 'text-green-600 bg-green-50'}`}>{t('matchScore')}</div>
                                </div>
                            </div>

                            {/* AI Insight */}
                            <div className="bg-brand-surface rounded-xl p-4 mb-6 border border-slate-100 flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg className={`w-4 h-4 ${isHighPriority ? 'text-brand-gold' : 'text-brand-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    <span className={`text-xs font-bold uppercase ${isHighPriority ? 'text-brand-gold' : 'text-brand-primary'}`}>{t('aiInsight')}</span>
                                </div>
                                <p className="text-sm text-text-sub leading-relaxed font-medium mb-4">{match.matchReason}</p>
                                
                                {/* Detailed Analysis Points */}
                                {match.analysisPoints && match.analysisPoints.length > 0 && (
                                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-200/60">
                                        {/* Visual header for data analysis */}
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Data-Driven Compatibility</p>
                                        {match.analysisPoints.map((point, i) => (
                                        <div 
                                            key={i} 
                                            className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
                                                isHighPriority 
                                                    ? 'bg-brand-gold/5 border-brand-gold/20' 
                                                    : 'bg-slate-50 border-slate-100'
                                            }`}
                                        >
                                            <div className={`mt-0.5 shrink-0 p-1.5 rounded-lg ${
                                                isHighPriority 
                                                    ? 'bg-white text-brand-gold shadow-sm' 
                                                    : 'bg-white text-slate-400 border border-slate-200'
                                            }`}>
                                              {getFactorIcon(point.factor)}
                                            </div>
                                            <div>
                                                <span className={`block text-[10px] font-bold uppercase tracking-wider mb-0.5 ${
                                                    isHighPriority ? 'text-brand-primary' : 'text-slate-500'
                                                }`}>
                                                    {point.factor}
                                                </span>
                                                <p className={`text-xs leading-relaxed ${
                                                    isHighPriority ? 'text-brand-primary/80' : 'text-slate-600'
                                                }`}>
                                                    {point.description}
                                                </p>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                             {/* Shared Interests Grouping - ENHANCED VISUALS */}
                             {match.sharedInterests && match.sharedInterests.length > 0 && (
                                <div className={`mb-6 rounded-xl p-4 border border-dashed ${isHighPriority ? 'bg-yellow-50/50 border-brand-gold/40' : 'bg-slate-50 border-slate-200'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`p-1 rounded-full ${isHighPriority ? 'bg-brand-gold text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                        <span className={`text-[11px] font-bold uppercase tracking-widest ${isHighPriority ? 'text-brand-primary' : 'text-slate-500'}`}>{t('sharedInterests')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {match.sharedInterests.map((tag, tIdx) => (
                                            <span key={tIdx} className={`px-3 py-1.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 shadow-sm ${isHighPriority ? 'bg-white border-brand-gold/30 text-brand-primary ring-1 ring-brand-gold/10' : 'bg-white border-slate-200 text-slate-600'}`}>
                                                <svg className={`w-3 h-3 ${isHighPriority ? 'text-green-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                             )}

                            <button 
                                onClick={() => setSelectedMatch({result: match, business})}
                                className={`w-full py-3 rounded-xl font-bold text-sm shadow-soft transition-all active:scale-95 flex items-center justify-center gap-2 mt-auto ${isHighPriority ? 'bg-brand-gold text-white hover:bg-amber-600' : 'bg-brand-primary text-white hover:bg-[#052c42]'}`}
                            >
                                <span>{t('requestIntro')}</span>
                                <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                            </div>
                        </div>
                    );
                })}
                </div>

                {/* Recommended Connections Carousel (Remaining Matches from Sorted List) */}
                {sortedMatches.length > 3 && (
                    <div className="border-t border-slate-100 pt-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span>{t('recommendedConnections')}</span>
                            <div className="h-px flex-1 bg-slate-100"></div>
                        </h3>
                        
                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x custom-scrollbar">
                            {sortedMatches.slice(3).map((match, idx) => {
                                const business = getBusinessById(match.companyId);
                                if (!business) return null;
                                
                                // Extract service-related reason from analysis points if available
                                const servicePoint = match.analysisPoints?.find(p => 
                                    p.factor.toLowerCase().includes('service') || 
                                    p.factor.toLowerCase().includes('need') || 
                                    p.factor.toLowerCase().includes('offer')
                                );
                                const briefReason = servicePoint ? servicePoint.description : match.matchReason;

                                return (
                                    <div key={`rec-${idx}`} className="snap-start min-w-[280px] w-[280px] bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-surface border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                                                {business.logoUrl ? (
                                                    <img src={business.logoUrl} className="w-full h-full object-cover" alt={business.name} />
                                                ) : (
                                                    <div className="text-[10px] font-bold text-brand-secondary">LOGO</div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-brand-primary text-sm truncate">{business.name}</h4>
                                                <div className="flex items-center gap-1 text-[10px] text-brand-secondary">
                                                   <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                   <span className="truncate">{t('serviceSynergy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-blue-50 rounded-xl p-4 mb-4 flex-1 border border-blue-100/50">
                                            <div className="flex gap-2 mb-2">
                                                <svg className="w-3 h-3 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <p className="text-xs text-blue-900 leading-relaxed line-clamp-3 font-medium">
                                                    "{briefReason}"
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={() => setSelectedMatch({result: match, business})}
                                            className="w-full py-2.5 rounded-lg border border-brand-primary text-brand-primary font-bold text-xs hover:bg-brand-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span>Connect</span>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </>
         )}
      </div>

      {/* Introduction Room Modal */}
      {selectedMatch && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-primary/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-elevated overflow-hidden animate-slide-up">
               <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-brand-surface">
                  <div>
                     <h3 className="text-xl font-bold text-brand-primary mb-1">{t('introRoom')}</h3>
                     <p className="text-sm text-brand-secondary">{t('smartIntroMsg', { field: selectedMatch.result.sharedInterests[0] || 'Business', topic: selectedMatch.result.collaborationOpportunity })}</p>
                  </div>
                  <button onClick={() => setSelectedMatch(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-red-500">✕</button>
               </div>
               
               <div className="p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                     {/* Me */}
                     <div className="flex-1 bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                        <div className="w-12 h-12 bg-brand-primary rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl">M</div>
                        <div className="font-bold text-brand-primary text-sm">{MY_BUSINESS_GENOME.name}</div>
                     </div>
                     
                     <div className="flex flex-col items-center justify-center text-slate-300 px-4">
                        <div className="h-px w-full min-w-[40px] bg-slate-300 mb-2"></div>
                        <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap text-green-600 bg-green-50 px-2 py-1 rounded-md">{selectedMatch.result.score}% Match</span>
                        <div className="h-px w-full min-w-[40px] bg-slate-300 mt-2"></div>
                     </div>

                     {/* Them */}
                     <div className="flex-1 bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                        <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
                           {selectedMatch.business.logoUrl ? (
                                <img src={selectedMatch.business.logoUrl} className="w-full h-full object-cover" />
                           ) : (
                                <span className="text-xs font-bold">LOGO</span>
                           )}
                        </div>
                        <div className="font-bold text-brand-primary text-sm">{selectedMatch.business.name}</div>
                     </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                     <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{t('collaborationOpp')}</h4>
                     <p className="text-brand-primary font-medium leading-relaxed">
                        "{selectedMatch.result.collaborationOpportunity}"
                     </p>
                  </div>

                  <button className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-[#052c42] shadow-lg transition-all active:scale-95">
                     {t('sendMessage')}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default NetworkIntelligence;
