
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-heading">{t('contactUsTitle')}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{t('contactUsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('contactInfo')}</h3>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">📍</div>
                   <div>
                      <p className="font-bold text-slate-800 dark:text-white">Riyadh, Saudi Arabia</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Business Developers Digital District</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xl">📧</div>
                   <div>
                      <p className="font-bold text-slate-800 dark:text-white">support@businessdev.sa</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{t('email')}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 text-xl">📞</div>
                   <div>
                      <p className="font-bold text-slate-800 dark:text-white">+966 11 234 5678</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{t('phone')}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
          {isSent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
               <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce">✅</div>
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('messageSent')}</h3>
               <p className="text-slate-500">We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{t('name')}</label>
                 <input 
                   type="text" 
                   required
                   value={formState.name}
                   onChange={(e) => setFormState({...formState, name: e.target.value})}
                   className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                 />
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{t('email')}</label>
                 <input 
                   type="email" 
                   required
                   value={formState.email}
                   onChange={(e) => setFormState({...formState, email: e.target.value})}
                   className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white"
                 />
              </div>
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{t('message')}</label>
                 <textarea 
                   rows={4}
                   required
                   value={formState.message}
                   onChange={(e) => setFormState({...formState, message: e.target.value})}
                   className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white resize-none"
                 />
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-95"
              >
                {t('sendMessage')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
