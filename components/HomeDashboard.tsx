
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeDashboardProps {
  onNavigate: (tab: 'map' | 'services') => void;
}

const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  // Mock Data for Dashboard
  const stats = [
    { id: 1, title: t('virtualOffice'), value: 'Active', status: 'success', icon: '🏢' },
    { id: 2, title: t('inbox'), value: '5', status: 'warning', icon: '📬' },
    { id: 3, title: t('totalVisits'), value: '1,240', status: 'neutral', icon: '👥' },
    { id: 4, title: t('systemHealth'), value: t('stable'), status: 'success', icon: '⚡' },
  ];

  const activities = [
    { id: 1, text: t('newMember'), time: '10m', type: 'user' },
    { id: 2, text: t('securityAlert'), time: '1h', type: 'system' },
    { id: 3, text: t('mailboxNote'), time: '2h', type: 'mail' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2 opacity-80">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                {t('weatherRiyadh')} • 28°C {t('clearSky')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {t('welcomeBack')}, <span className="text-blue-200">Explorer</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl opacity-90 leading-relaxed">
              {t('dashboardSubtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('map')}
                className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>🗺️</span> {t('exploreMap')}
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 bg-blue-500/30 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold hover:bg-blue-500/40 hover:border-white/50 transition-all duration-300 flex items-center gap-2"
              >
                <span>⚙️</span> {t('manageServices')}
              </button>
            </div>
          </div>
          
          {/* Abstract Graphic */}
          <div className="hidden lg:block relative w-64 h-64">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
             <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-6xl animate-bounce">🚀</div>
             </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="glass-panel p-6 rounded-2xl hover:translate-y-[-5px] transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-xl text-2xl">
                {stat.icon}
              </div>
              {stat.status === 'success' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
              {stat.status === 'warning' && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>}
              {stat.status === 'neutral' && <span className="w-2 h-2 rounded-full bg-slate-400"></span>}
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Split View: Activity & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="text-blue-500">●</span> {t('recentActivity')}
            </h3>
            <button className="text-sm text-blue-500 hover:underline">{t('viewAll')}</button>
          </div>
          
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 group">
                <div className="relative flex flex-col items-center">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white dark:border-slate-800 
                     ${activity.type === 'user' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' : 
                       activity.type === 'system' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'}`}>
                     {activity.type === 'user' ? '👤' : activity.type === 'system' ? '🛡️' : '📩'}
                   </div>
                   {activity.id !== activities.length && (
                     <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 absolute top-10 -bottom-6"></div>
                   )}
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl flex-1 border border-slate-100 dark:border-slate-700 group-hover:border-blue-200 dark:group-hover:border-blue-900 transition-colors">
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{activity.text}</p>
                  <span className="text-xs text-slate-400 mt-2 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-panel rounded-3xl p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
           <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">{t('quickActions')}</h3>
           <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => onNavigate('services')} 
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div className="text-start">
                  <span className="block font-bold text-slate-800 dark:text-white">{t('createProject')}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Start a new venture</span>
                </div>
              </button>

              <button 
                onClick={() => onNavigate('services')}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <div className="text-start">
                  <span className="block font-bold text-slate-800 dark:text-white">{t('consultant')}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Ask AI Advisor</span>
                </div>
              </button>

              <button className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                  🎧
                </div>
                <div className="text-start">
                  <span className="block font-bold text-slate-800 dark:text-white">{t('contactSupport')}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">24/7 Help Center</span>
                </div>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
