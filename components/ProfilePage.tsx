
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Invoice, Business } from '../types';

interface ProfilePageProps {
  onLogout: () => void;
  invoices?: Invoice[];
  onPayInvoice?: (invoiceId: string) => void;
  onAddBusiness?: (business: Business) => void;
  businesses?: Business[];
}

type DashboardTab = 'dashboard' | 'wallet' | 'companies' | 'notifications' | 'orders' | 'services' | 'support' | 'settings';

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout, invoices = [], onPayInvoice, onAddBusiness, businesses = [] }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Add Company Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      category: 'TECHNOLOGY',
      description: '',
      logoUrl: ''
  });

  // Filter businesses that look like they belong to the user
  const myCompanies = businesses.filter(b => b.isOccupied).slice(0, 3);

  // Mock Data for Dashboard Sections
  const notifications = [
    { id: 1, type: 'system', title: t('systemAlert'), msg: t('securityAlert'), time: '2h' },
    { id: 2, type: 'offer', title: t('offerAlert'), msg: 'Special discount on Annual Plan', time: '1d' },
    { id: 3, type: 'account', title: t('accountUpdate'), msg: 'Profile information updated successfully', time: '3d' },
  ];

  const orders = [
    { id: 'ORD-1024', service: t('virtualOffice'), date: '2024-11-10', status: 'completed', amount: '199' },
    { id: 'ORD-1025', service: t('consultant'), date: '2024-11-12', status: 'processing', amount: '0' },
    { id: 'ORD-1026', service: 'License Issue', date: '2024-11-15', status: 'pending', amount: '499' },
  ];

  const tickets = [
    { id: 'TCK-552', subject: 'Invoice Discrepancy', status: 'open', lastUpdate: '1h ago' },
    { id: 'TCK-491', subject: 'Office Access Issue', status: 'closed', lastUpdate: '2d ago' },
  ];

  const activeServicesList = [
    { id: 1, name: t('virtualOffice'), renewal: '2024-12-01', status: 'active' },
    { id: 2, name: t('consultant'), renewal: 'Monthly', status: 'active' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCreateBusiness = (e: React.FormEvent) => {
      e.preventDefault();
      if (!onAddBusiness) return;

      const newBusiness: Business = {
          id: `user-biz-${Date.now()}`,
          name: formData.name,
          description: formData.description || 'New Company',
          category: formData.category,
          logoUrl: formData.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=073D5A&color=fff`,
          color: 'bg-blue-600',
          isOccupied: true,
          gridPosition: { x: Math.floor(Math.random() * 3) + 1, y: Math.floor(Math.random() * 3) + 1 },
          activeVisitors: 0,
          services: [formData.category],
          contact: { email: 'admin@' + formData.name.toLowerCase().replace(' ', '') + '.com' }
      };

      onAddBusiness(newBusiness);
      setShowAddModal(false);
      setFormData({ name: '', category: 'TECHNOLOGY', description: '', logoUrl: '' });
  };

  const SidebarItem = ({ tab, icon, label }: { tab: DashboardTab, icon: React.ReactNode, label: string }) => (
     <button 
        onClick={() => setActiveTab(tab)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-bold ${
            activeTab === tab 
            ? 'bg-white text-brand-primary shadow-sm' 
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
     >
        {icon}
        <span>{label}</span>
     </button>
  );

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-12 min-h-[800px] flex flex-col lg:flex-row gap-6">
       
       {/* Sidebar Navigation */}
       <div className="w-full lg:w-64 bg-brand-primary rounded-3xl p-6 flex flex-col shrink-0 h-fit">
          {/* User Mini Profile */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
             <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-primary font-bold text-xl overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Ahmed+Ali&background=fff&color=073D5A" alt="User" />
             </div>
             <div className="overflow-hidden">
                <h3 className="text-white font-bold truncate">Ahmed Ali</h3>
                <p className="text-white/60 text-xs truncate">CEO @ TechVision</p>
             </div>
          </div>

          <nav className="space-y-1 flex-1">
             <SidebarItem tab="dashboard" label={t('myDashboard')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
             <SidebarItem tab="wallet" label={t('wallet')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
             <SidebarItem tab="services" label={t('myServices')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
             <SidebarItem tab="orders" label={t('orders')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} />
             <SidebarItem tab="notifications" label={t('notifications')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} />
             <SidebarItem tab="companies" label={t('myCompanies')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
             <SidebarItem tab="support" label={t('support')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
             <SidebarItem tab="settings" label={t('personalInfo')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
          </nav>

          <div className="pt-6 border-t border-white/10 mt-6">
             <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>{t('logout')}</span>
             </button>
          </div>
       </div>

       {/* Main Content Area */}
       <div className="flex-1">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold text-brand-primary font-heading">
                {activeTab === 'dashboard' ? t('myDashboard') : 
                 activeTab === 'wallet' ? t('wallet') :
                 activeTab === 'companies' ? t('myCompanies') :
                 activeTab === 'notifications' ? t('notifications') :
                 activeTab === 'orders' ? t('orders') :
                 activeTab === 'services' ? t('myServices') :
                 activeTab === 'support' ? t('support') : t('personalInfo')}
             </h1>
             <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 text-sm font-bold text-slate-500">
                 {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </div>
          </div>

          {/* Content Views */}
          <div className="bg-white rounded-[32px] shadow-card border border-slate-100 p-8 min-h-[600px]">
             
             {/* DASHBOARD OVERVIEW */}
             {activeTab === 'dashboard' && (
                 <div className="space-y-8 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
                           <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">{t('serviceCredit')}</p>
                           <div className="text-3xl font-bold mb-1">450.00 <span className="text-sm opacity-80">{t('currency')}</span></div>
                           <button onClick={() => setActiveTab('wallet')} className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors mt-4">Top Up</button>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('activeServices')}</p>
                           <div className="text-3xl font-bold text-brand-primary mb-1">{activeServicesList.length}</div>
                           <div className="text-xs text-green-600 font-bold flex items-center gap-1 mt-4"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> All Systems Operational</div>
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{t('newMessages')}</p>
                           <div className="text-3xl font-bold text-brand-primary mb-1">5</div>
                           <div className="text-xs text-slate-400 mt-4">2 from Support</div>
                        </div>
                     </div>

                     {/* Recent Activity / Notifications Preview */}
                     <div>
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="font-bold text-brand-primary text-lg">{t('recentActivity')}</h3>
                           <button onClick={() => setActiveTab('notifications')} className="text-sm text-blue-600 font-bold hover:underline">{t('viewAll')}</button>
                        </div>
                        <div className="space-y-3">
                           {notifications.slice(0,2).map(n => (
                              <div key={n.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.type === 'system' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {n.type === 'system' ? '⚠️' : '🔔'}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-sm text-brand-primary">{n.title}</h4>
                                    <p className="text-xs text-slate-500">{n.msg}</p>
                                 </div>
                                 <span className="ml-auto text-xs text-slate-400 font-bold">{n.time}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                 </div>
             )}

             {/* WALLET */}
             {activeTab === 'wallet' && (
                 <div className="space-y-8 animate-fade-in">
                    <div className="flex justify-between items-end bg-slate-50 p-6 rounded-2xl border border-slate-100">
                       <div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t('serviceCredit')}</p>
                          <div className="text-4xl font-bold text-brand-primary">450.00 <span className="text-lg text-slate-400">{t('currency')}</span></div>
                       </div>
                       <button className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-lg">
                          + Add Funds
                       </button>
                    </div>

                    <div>
                       <h3 className="font-bold text-brand-primary text-lg mb-4">{t('invoices')}</h3>
                       {invoices.length === 0 ? (
                           <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
                               {t('noInvoices')}
                           </div>
                       ) : (
                           <div className="border border-slate-100 rounded-2xl overflow-hidden">
                              <table className="w-full text-sm text-left rtl:text-right">
                                 <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                                    <tr>
                                       <th className="px-6 py-4">{t('invoiceId')}</th>
                                       <th className="px-6 py-4">{t('serviceType')}</th>
                                       <th className="px-6 py-4">{t('amount')}</th>
                                       <th className="px-6 py-4">{t('status')}</th>
                                       <th className="px-6 py-4">Action</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                    {invoices.map(inv => (
                                       <tr key={inv.id} className="hover:bg-slate-50/50">
                                          <td className="px-6 py-4 font-mono text-slate-500">#{inv.reference}</td>
                                          <td className="px-6 py-4 font-bold text-brand-primary">{inv.planName}</td>
                                          <td className="px-6 py-4 font-bold">{inv.amount} {t('currency')}</td>
                                          <td className="px-6 py-4">
                                             <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${inv.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {t(inv.status)}
                                             </span>
                                          </td>
                                          <td className="px-6 py-4">
                                             {inv.status === 'pending' && (
                                                <button className="text-blue-600 font-bold hover:underline">{t('payNow')}</button>
                                             )}
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                       )}
                    </div>
                 </div>
             )}

             {/* NOTIFICATIONS */}
             {activeTab === 'notifications' && (
                 <div className="space-y-4 animate-fade-in">
                    <div className="flex justify-end gap-2 mb-2">
                       <button className="text-xs font-bold text-slate-400 hover:text-brand-primary">{t('markAsRead')}</button>
                       <button className="text-xs font-bold text-slate-400 hover:text-red-500">{t('clearAll')}</button>
                    </div>
                    {notifications.map(n => (
                        <div key={n.id} className="flex gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group">
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl ${n.type === 'system' ? 'bg-red-50 text-red-500' : n.type === 'offer' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                                {n.type === 'system' ? '⚠️' : n.type === 'offer' ? '🏷️' : '👤'}
                             </div>
                             <div className="flex-1">
                                <div className="flex justify-between items-start">
                                   <h4 className="font-bold text-brand-primary text-base mb-1 group-hover:text-blue-600 transition-colors">{n.title}</h4>
                                   <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">{n.time}</span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed">{n.msg}</p>
                             </div>
                        </div>
                    ))}
                 </div>
             )}

             {/* ORDERS */}
             {activeTab === 'orders' && (
                <div className="animate-fade-in space-y-6">
                   <div className="flex justify-between items-center">
                       <div className="flex gap-2">
                          <button className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg">All Orders</button>
                          <button className="px-4 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100">Pending</button>
                          <button className="px-4 py-2 bg-slate-50 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-100">Completed</button>
                       </div>
                       <button className="px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                          + {t('newOrder')}
                       </button>
                   </div>
                   
                   <div className="border border-slate-100 rounded-2xl overflow-hidden">
                       <table className="w-full text-sm text-left rtl:text-right">
                           <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                               <tr>
                                  <th className="px-6 py-4">{t('orderId')}</th>
                                  <th className="px-6 py-4">{t('serviceType')}</th>
                                  <th className="px-6 py-4">{t('invoiceDate')}</th>
                                  <th className="px-6 py-4">{t('amount')}</th>
                                  <th className="px-6 py-4">{t('status')}</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                               {orders.map(order => (
                                  <tr key={order.id} className="hover:bg-slate-50/50">
                                     <td className="px-6 py-4 font-mono text-slate-500 font-bold">{order.id}</td>
                                     <td className="px-6 py-4 font-bold text-brand-primary">{order.service}</td>
                                     <td className="px-6 py-4 text-slate-500">{order.date}</td>
                                     <td className="px-6 py-4 font-bold">{order.amount} {t('currency')}</td>
                                     <td className="px-6 py-4">
                                         <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase flex items-center gap-1 w-fit
                                            ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                              order.status === 'processing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {order.status === 'completed' && '✓'} {t('order' + order.status.charAt(0).toUpperCase() + order.status.slice(1))}
                                         </span>
                                     </td>
                                  </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
                </div>
             )}

             {/* SERVICES */}
             {activeTab === 'services' && (
                 <div className="animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {activeServicesList.map(service => (
                             <div key={service.id} className="border border-slate-100 rounded-2xl p-6 hover:border-brand-primary transition-colors relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-20 h-20 bg-brand-surface rounded-bl-full -mr-10 -mt-10"></div>
                                 <div className="relative z-10">
                                     <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white mb-4 text-xl">
                                        ⚡
                                     </div>
                                     <h3 className="text-xl font-bold text-brand-primary mb-2">{service.name}</h3>
                                     <div className="flex justify-between items-center mt-6">
                                         <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Renews: {service.renewal}</span>
                                         <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg uppercase">{t('active')}</span>
                                     </div>
                                     <div className="mt-4 flex gap-2">
                                         <button className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">{t('manage')}</button>
                                         <button className="flex-1 py-2 bg-brand-primary text-white rounded-lg text-xs font-bold hover:bg-blue-800">{t('renew')}</button>
                                     </div>
                                 </div>
                             </div>
                         ))}
                         
                         {/* Add New Service Card */}
                         <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group">
                             <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:bg-blue-200 group-hover:text-blue-600 transition-colors">+</div>
                             <h3 className="font-bold text-slate-600 group-hover:text-blue-700">Add New Service</h3>
                             <p className="text-xs text-slate-400 mt-1">Browse our catalog</p>
                         </div>
                     </div>
                 </div>
             )}

             {/* SUPPORT */}
             {activeTab === 'support' && (
                <div className="animate-fade-in space-y-6">
                    <div className="flex justify-between items-center bg-blue-50 p-6 rounded-2xl border border-blue-100">
                       <div>
                          <h3 className="font-bold text-blue-800 text-lg">Need Help?</h3>
                          <p className="text-sm text-blue-600">Our support team is available 24/7.</p>
                       </div>
                       <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">
                          {t('openTicket')}
                       </button>
                    </div>

                    <div>
                       <h3 className="font-bold text-brand-primary mb-4">{t('supportTickets')}</h3>
                       <div className="space-y-3">
                          {tickets.map(ticket => (
                             <div key={ticket.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                   <div className={`w-2 h-12 rounded-full ${ticket.status === 'open' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                                   <div>
                                      <div className="text-xs font-bold text-slate-400 mb-0.5">{ticket.id}</div>
                                      <h4 className="font-bold text-brand-primary">{ticket.subject}</h4>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase mb-1 ${ticket.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                      {t('ticket' + ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1))}
                                   </span>
                                   <div className="text-xs text-slate-400">{ticket.lastUpdate}</div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                </div>
             )}

             {/* SETTINGS (Existing Info Tab) */}
             {activeTab === 'settings' && (
                  <div className="animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div className="space-y-1">
                              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t('fullName')}</label>
                              <input type="text" value="Ahmed Ali" className="w-full p-3 border border-slate-200 rounded-lg font-bold text-brand-primary bg-slate-50" readOnly />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t('email')}</label>
                              <input type="text" value="ahmed@techvision.sa" className="w-full p-3 border border-slate-200 rounded-lg font-bold text-brand-primary bg-slate-50" readOnly />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t('phone')}</label>
                              <input type="text" value="+966 55 123 4567" className="w-full p-3 border border-slate-200 rounded-lg font-bold text-brand-primary bg-slate-50" readOnly />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">{t('companyName')}</label>
                              <input type="text" value="TechVision Co." className="w-full p-3 border border-slate-200 rounded-lg font-bold text-brand-primary bg-slate-50" readOnly />
                          </div>
                      </div>
                      <div className="mt-8 flex justify-end">
                          <button className="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl hover:bg-blue-800 transition-colors">
                              {t('saveChanges')}
                          </button>
                      </div>
                  </div>
             )}

             {/* MY COMPANIES (Existing) */}
             {activeTab === 'companies' && (
                 <div className="space-y-6 animate-fade-in">
                     <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-brand-primary">{t('myCompanies')}</h2>
                        <button 
                            onClick={() => setShowAddModal(true)}
                            className="px-4 py-2 bg-brand-primary text-white rounded-xl font-bold text-sm shadow-card hover:bg-[#052c42] transition-colors"
                        >
                            {t('addCompanyButton')}
                        </button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {myCompanies.map(company => (
                             <div key={company.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all flex gap-4 items-start">
                                 <div className="w-16 h-16 rounded-lg bg-brand-surface border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                                     {company.logoUrl ? (
                                         <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover" />
                                     ) : (
                                         <div className="text-xs font-bold text-slate-400">LOGO</div>
                                     )}
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-brand-primary text-lg">{company.name}</h3>
                                     <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md inline-block mb-2">{company.category}</span>
                                     <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{company.description}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             )}

          </div>
       </div>

       {/* Add Company Modal */}
       {showAddModal && (
           <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white w-full max-w-lg rounded-3xl shadow-elevated border border-slate-100 p-8 animate-scale-in">
                   <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-brand-primary font-heading">{t('addCompanyButton')}</h2>
                       <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-red-500 transition-colors">✕</button>
                   </div>
                   
                   <form onSubmit={handleCreateBusiness} className="space-y-5">
                       <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('companyName')}</label>
                           <input 
                              type="text" 
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-brand-primary"
                           />
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('classification')}</label>
                           <select 
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-brand-primary"
                           >
                               <option value="TECHNOLOGY">Technology</option>
                               <option value="ENGINEERING">Engineering</option>
                               <option value="EDUCATION">Education</option>
                               <option value="TRANSPORT">Transport</option>
                           </select>
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('description')}</label>
                           <textarea 
                              required
                              rows={3}
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-brand-primary resize-none"
                           />
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('logoUrl')}</label>
                           <input 
                              type="text" 
                              value={formData.logoUrl}
                              onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                              placeholder="https://..."
                              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-brand-primary"
                           />
                       </div>
                       
                       <div className="pt-4 flex gap-3">
                           <button 
                               type="button"
                               onClick={() => setShowAddModal(false)}
                               className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                           >
                               {t('cancel')}
                           </button>
                           <button 
                               type="submit"
                               className="flex-1 py-3 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:bg-[#052c42] transition-colors"
                           >
                               {t('saveCompany')}
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}
    </div>
  );
};

export default ProfilePage;
