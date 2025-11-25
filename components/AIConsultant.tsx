import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateBusinessAdvice } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

interface AIConsultantProps {
  onMessageSent?: () => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ onMessageSent }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset/Initialize messages when language changes
  useEffect(() => {
    setMessages([
      {
        id: '0',
        role: 'model',
        text: t('welcomeMessage'),
        timestamp: new Date()
      }
    ]);
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    
    if (onMessageSent) {
      onMessageSent();
    }

    const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Consultant'}: ${m.text}`);
    const responseText = await generateBusinessAdvice(userMsg.text, history, language);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        text: t('welcomeMessage'),
        timestamp: new Date()
      }
    ]);
  };

  const suggestions = [
    'suggest_marketing',
    'suggest_swot',
    'suggest_funding',
    'suggest_growth'
  ];

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-[32px] overflow-hidden shadow-card border border-slate-100 relative">
      {/* Header */}
      <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
          </div>
          <div>
            <h3 className="font-bold text-brand-primary text-xl leading-tight">{t('consultantTitle')}</h3>
            <p className="text-xs text-blue-600 flex items-center gap-1.5 font-bold bg-blue-50 px-2.5 py-1 rounded-full w-fit mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              {t('connectedGemini')}
            </p>
          </div>
        </div>
        <button 
          onClick={handleClearChat}
          className="p-3 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all"
          title={t('clear_chat')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-offWhite custom-scrollbar scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-4 group items-end animate-slide-up`}
          >
             {msg.role === 'model' && (
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-brand-primary text-xs font-bold border border-slate-100">
                   AI
                </div>
             )}
             
            <div
              className={`relative max-w-[80%] p-5 text-[15px] leading-relaxed shadow-sm transition-all duration-300 ${
                msg.role === 'user'
                  ? 'bg-brand-primary text-white rounded-2xl rounded-br-sm shadow-blue-900/10'
                  : 'bg-white text-slate-700 rounded-2xl rounded-bl-sm border border-slate-100'
              }`}
            >
              <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
              <span className={`text-[11px] block mt-2 opacity-70 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'} text-end`}>
                {msg.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-SA' : language, { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

             {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center shrink-0 overflow-hidden border border-white shadow-sm">
                   <img src="https://picsum.photos/seed/user123/50" alt="User" className="w-full h-full object-cover" />
                </div>
             )}
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start gap-4 items-end animate-pulse">
             <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-brand-primary text-xs font-bold border border-slate-100">
                   AI
             </div>
             <div className="bg-white p-5 rounded-2xl rounded-bl-sm border border-slate-100 flex gap-2 items-center shadow-sm">
                <span className="text-xs text-slate-400 font-bold">{t('advisor_typing')}</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions & Input Area */}
      <div className="bg-white border-t border-slate-100 p-6">
        {/* Suggestions */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar mask-fade-right">
           {suggestions.map((key) => (
              <button 
                key={key}
                onClick={() => handleSend(t(key))}
                disabled={loading}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all active:scale-95"
              >
                ✨ {t(key)}
              </button>
           ))}
        </div>

        {/* Floating Input */}
        <div className="relative flex items-end gap-3 bg-slate-50 p-2 rounded-[20px] border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
              }}
              placeholder={t('writeConsultation')}
              rows={1}
              className="flex-1 bg-transparent border-none px-4 py-3 text-slate-800 placeholder-slate-400 focus:ring-0 outline-none font-medium resize-none custom-scrollbar max-h-32 min-h-[48px]"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="h-12 w-12 mb-0.5 rounded-2xl bg-brand-primary hover:bg-[#052c42] disabled:bg-slate-300 text-white shadow-lg shadow-blue-900/10 transition-all active:scale-90 flex items-center justify-center shrink-0"
            >
              {loading ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rtl:rotate-180 translate-x-[1px]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;