import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceStatsProps {
  consultationCount: number;
}

const ServiceStats: React.FC<ServiceStatsProps> = ({ consultationCount }) => {
  const { t } = useLanguage();

  // Abstract SVG Icons
  const icons = {
     consulting: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
     inbox: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
     lab: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
     network: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
     credit: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
      {/* Card 1: Consultations */}
      <div className="bg-white p-6 rounded-xl shadow-card border border-slate-100">
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('consultingSessions')}</h3>
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons.consulting}/></svg>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-brand-primary">{consultationCount}</span>
          <span className="text-[10px] font-bold text-green-600 mb-1 px-2 py-0.5 bg-green-50 rounded-full">{t('active')}</span>
        </div>
      </div>

      {/* Card 2: Inbox */}
      <div className="bg-white p-6 rounded-xl shadow-card border border-slate-100">
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('inbox')}</h3>
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons.inbox}/></svg>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-brand-primary">5</span>
          <span className="text-[10px] text-slate-400 mb-1">{t('newMessages')}</span>
        </div>
      </div>

      {/* Card 3: Labs */}
      <div className="bg-white p-6 rounded-xl shadow-card border border-slate-100">
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('activeLabs')}</h3>
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons.lab}/></svg>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-brand-primary">2</span>
          <span className="text-[10px] text-blue-600 mb-1 font-medium">{t('connected')}</span>
        </div>
      </div>

      {/* Card 4: Network */}
      <div className="bg-white p-6 rounded-xl shadow-card border border-slate-100">
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('networkRelations')}</h3>
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons.network}/></svg>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-brand-primary">1,204</span>
          <span className="text-[10px] text-green-600 mb-1 font-bold">↑ 12%</span>
        </div>
      </div>

      {/* Card 5: Credit */}
      <div className="bg-white p-6 rounded-xl shadow-card border border-slate-100">
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('serviceCredit')}</h3>
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons.credit}/></svg>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-brand-primary">450</span>
          <span className="text-[10px] text-slate-400 mb-1">{t('currency')}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceStats;