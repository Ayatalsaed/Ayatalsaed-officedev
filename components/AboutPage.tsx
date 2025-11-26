
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const team = [
    { name: 'Dr. Sarah Al-Majed', role: 'role_ceo', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Eng. Faisal Rahman', role: 'role_cto', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Noura Al-Salem', role: 'role_cmo', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="w-full bg-white animate-fade-in font-sans overflow-x-hidden">
      
      {/* --- IMMERSIVE HERO SECTION --- */}
      <div className="relative w-full h-[700px] flex items-center justify-center bg-[#073D5A] overflow-hidden">
         {/* Dynamic Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#073D5A] via-[#052c42] to-[#021824] z-0"></div>
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
         
         {/* Animated Orbs */}
         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

         <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
            <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-[0.25em] mb-8 animate-slide-up">
              Est. 2023 • Riyadh, KSA
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 leading-tight drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-200">
              {t('aboutHeroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-3xl mx-auto font-light leading-relaxed">
              {t('aboutHeroSubtitle')}
            </p>
         </div>

         {/* Floating Glass Stats Strip */}
         <div className="absolute -bottom-12 w-full px-4 z-20">
            <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-elevated border border-white/40 p-10 grid grid-cols-2 md:grid-cols-4 gap-8 transform hover:-translate-y-2 transition-transform duration-500">
                {[
                    { label: 'stats_offices', value: '5,000+' },
                    { label: 'stats_countries', value: '12' },
                    { label: 'stats_valuation', value: '$50M+' },
                    { label: 'stats_satisfaction', value: '99%' }
                ].map((stat, i) => (
                    <div key={i} className="text-center group relative">
                       <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">{stat.value}</div>
                       <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t(stat.label)}</div>
                       {i !== 3 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-slate-200"></div>}
                    </div>
                ))}
            </div>
         </div>
      </div>

      <div className="h-32 bg-white"></div> 

      {/* --- STORYTELLING SECTION (Zig-Zag) --- */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
         
         {/* Block 1: Mission */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8 animate-slide-up order-2 lg:order-1">
                <div className="inline-flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-xs">
                   <div className="w-12 h-0.5 bg-brand-gold"></div>
                   {t('missionTitle')}
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-primary leading-tight">
                   Breaking Barriers. <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Building Futures.</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-light text-justify">
                   {t('missionDesc')}
                </p>
             </div>
             <div className="relative order-1 lg:order-2 group">
                <div className="absolute inset-0 bg-brand-gold rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Mission" 
                />
             </div>
         </div>

         {/* Block 2: Story */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="relative group">
                <div className="absolute inset-0 bg-brand-primary rounded-[2rem] -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Story" 
                />
             </div>
             <div className="space-y-8 animate-slide-up">
                <div className="inline-flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest text-xs">
                   <div className="w-12 h-0.5 bg-brand-gold"></div>
                   {t('storyTitle')}
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-primary leading-tight">
                   From Idea to <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Reality.</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-light text-justify">
                   {t('storyDesc')}
                </p>
             </div>
         </div>
      </div>

      {/* --- INTERACTIVE VALUES GRID --- */}
      <div className="bg-brand-surface py-32 border-y border-slate-200/60 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-heading font-bold text-brand-primary mb-6">{t('valuesTitle')}</h2>
               <div className="w-24 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { title: 'value_1_title', descKey: 'value_1_desc', icon: '💡' },
                   { title: 'value_2_title', descKey: 'value_2_desc', icon: '🤝' },
                   { title: 'value_3_title', descKey: 'value_3_desc', icon: '🛡️' }
                ].map((item, i) => (
                   <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-elevated hover:-translate-y-3 transition-all duration-500 border border-slate-100 group cursor-default">
                      <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                         {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-brand-primary mb-4 group-hover:text-blue-600 transition-colors">{t(item.title)}</h3>
                      <p className="text-slate-500 leading-relaxed font-light">{t(item.descKey)}</p>
                   </div>
                ))}
            </div>
         </div>
      </div>

      {/* --- TIMELINE ROADMAP --- */}
      <div className="max-w-5xl mx-auto px-6 py-32">
         <div className="text-center mb-24">
            <h2 className="text-4xl font-heading font-bold text-brand-primary">{t('timeline')}</h2>
         </div>
         <div className="relative space-y-24 before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {[1, 2, 3].map((num) => (
               <div key={num} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-300 group-hover:bg-brand-primary transition-colors shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shrink-0 z-10"></div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 bg-white border border-slate-100 rounded-[2rem] shadow-card group-hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                     <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-3">Phase 0{num}</span>
                     <h3 className="text-xl font-bold text-brand-primary">{t(`timeline_${num}`)}</h3>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* --- LEADERSHIP TEAM --- */}
      <div className="bg-[#0B1121] text-white py-32 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-20 -mt-20"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -mr-20 -mb-20"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t('teamTitle')}</h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                  {t('teamDesc')}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {team.map((member, i) => (
                  <div key={i} className="group relative">
                     <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-8 border border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity z-10"></div>
                        <img 
                           src={member.img} 
                           alt={member.name} 
                           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                        />
                        <div className="absolute bottom-6 left-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                           <p className="text-brand-gold text-sm font-bold uppercase tracking-wider">{t(member.role)}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- FINAL CTA --- */}
      <div className="bg-brand-gold py-24 text-center px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-10">{t('joinTheFuture')}</h2>
             <button className="px-12 py-5 bg-white text-brand-primary font-bold rounded-2xl shadow-2xl hover:bg-slate-50 transform hover:scale-105 transition-all text-lg">
                {t('startNow')}
             </button>
         </div>
      </div>

    </div>
  );
};

export default AboutPage;
