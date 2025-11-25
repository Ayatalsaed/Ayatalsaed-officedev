import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthPageProps {
  onLogin: () => void;
}

type AuthMode = 'login' | 'signup' | 'forgot';

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }
    
    if (!formData.email || !formData.password) {
        if (mode !== 'forgot' && !formData.password) {
            setError(t('fillAllFields'));
            return;
        }
        if (mode === 'forgot' && !formData.email) {
            setError(t('fillAllFields'));
            return;
        }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot') {
        setSuccessMsg(t('resetSentDesc'));
      } else {
        onLogin();
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-offWhite">
      <div className="w-full max-w-md z-10 animate-scale-in">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg mx-auto mb-6 cursor-pointer" onClick={() => setMode('login')}>
            م
          </div>
          <h1 className="text-3xl font-bold text-brand-primary mb-2 font-heading">{t('appTitle')}</h1>
          <p className="text-text-sub">{t('digitalDistrict')}</p>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
          
          <div className="mb-8 text-center">
            {mode === 'forgot' ? (
               successMsg ? (
                 <div className="animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-green-600 animate-bounce">
                       ✉️
                    </div>
                    <h2 className="text-2xl font-bold text-brand-primary mb-2">{t('resetSent')}</h2>
                    <p className="text-sm text-text-sub">{successMsg}</p>
                 </div>
               ) : (
                 <>
                    <h2 className="text-2xl font-bold text-brand-primary mb-2">{t('resetPasswordTitle')}</h2>
                    <p className="text-sm text-text-sub">{t('resetPasswordSubtitle')}</p>
                 </>
               )
            ) : (
               <>
                  <h2 className="text-2xl font-bold text-brand-primary mb-2">
                    {mode === 'login' ? t('loginTitle') : t('signupTitle')}
                  </h2>
                  <p className="text-sm text-text-sub">
                    {mode === 'login' ? t('loginSubtitle') : t('signupSubtitle')}
                  </p>
               </>
            )}
          </div>

          {!successMsg && (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {mode === 'signup' && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('fullName')}</label>
                  <input 
                    name="fullName"
                    type="text" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-offWhite border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-brand-primary font-medium"
                    placeholder={t('fullName')}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('email')}</label>
                <input 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-offWhite border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-brand-primary font-medium"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-1 animate-fade-in">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('password')}</label>
                    {mode === 'login' && (
                      <button 
                        type="button" 
                        onClick={() => { setMode('forgot'); setError(''); }}
                        className="text-xs text-blue-600 hover:underline font-bold"
                      >
                        {t('forgotPassword')}
                      </button>
                    )}
                  </div>
                  <input 
                    name="password"
                    type="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-offWhite border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-brand-primary font-medium"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              )}

              {mode === 'signup' && (
                <div className="space-y-1 animate-fade-in">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('confirmPassword')}</label>
                  <input 
                    name="confirmPassword"
                    type="password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 rounded-xl bg-offWhite border ${error ? 'border-red-500' : 'border-slate-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-brand-primary font-medium`}
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}
              
              {error && <p className="text-xs text-red-500 font-bold animate-pulse bg-red-50 p-2 rounded-lg text-center">{error}</p>}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-brand-primary hover:bg-[#052c42] text-white font-bold shadow-lg shadow-blue-900/20 transition-all transform active:scale-95 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  mode === 'login' ? t('loginButton') : mode === 'signup' ? t('signupButton') : t('sendResetLink')
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            {mode === 'forgot' || successMsg ? (
              <button 
                onClick={() => { setMode('login'); setSuccessMsg(''); setError(''); }}
                className="text-sm text-slate-500 hover:text-brand-primary font-bold transition-colors flex items-center justify-center gap-2 w-full"
              >
                ← {t('backToLogin')}
              </button>
            ) : (
              <p className="text-sm text-slate-500 font-medium">
                {mode === 'login' ? t('noAccount') : t('haveAccount')}{' '}
                <button 
                  onClick={() => { 
                    setMode(mode === 'login' ? 'signup' : 'login'); 
                    setError('');
                    setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
                  }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  {mode === 'login' ? t('createAccount') : t('loginTitle')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;