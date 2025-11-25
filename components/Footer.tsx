
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleNav = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0B1121] border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-heading font-bold text-xl shadow-md">
                م
              </div>
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-white tracking-tight">{t('footer_about')}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              {t('footer_about_desc')}
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm">
                𝕏
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300 shadow-sm">
                in
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 shadow-sm">
                📸
              </button>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-6 text-lg">{t('footer_links')}</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><button onClick={(e) => handleNav(e, 'home')} className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">{t('home')}</button></li>
              <li><button onClick={(e) => handleNav(e, 'map')} className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">{t('map')}</button></li>
              <li><button onClick={(e) => handleNav(e, 'subscription')} className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">{t('plansTitle')}</button></li>
              <li><button onClick={(e) => handleNav(e, 'about')} className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">{t('aboutUs')}</button></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-6 text-lg">{t('footer_support')}</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><button onClick={(e) => handleNav(e, 'faq')} className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">{t('faqTitle')}</button></li>
              <li><button onClick={(e) => handleNav(e, 'contact')} className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">{t('footer_contact')}</button></li>
              <li><button className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">Privacy Policy</button></li>
              <li><button className="hover:text-blue-600 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all inline-block">Terms of Service</button></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white mb-6 text-lg">{t('footer_contact')}</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-lg">📍</span> 
                <span>Riyadh, Business Developers District<br/><span className="text-xs opacity-70">Kingdom of Saudi Arabia</span></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">📧</span> <a href="mailto:support@businessdev.sa" className="hover:text-blue-600">support@businessdev.sa</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">📞</span> <span className="font-mono" dir="ltr">+966 11 234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-500 text-center md:text-start font-medium">
            {t('rights_reserved')}
          </p>
          <div className="flex gap-2 items-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-700">
            <span>Powered by</span>
            <span className="font-bold text-blue-600">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
