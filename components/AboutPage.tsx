
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
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[600px] flex items-center justify-center bg-brand-primary overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/80 to-transparent"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

         <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-[0.2em] mb-6 animate-slide-up">
              Est. 2023 • Riyadh, KSA
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight drop-shadow-lg">
              {t('aboutPageTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
              {t('aboutPageSubtitle')}
            </p>
         </div>

         {/* Floating Stats Bar */}
         <div className="absolute -bottom-16 w-full px-6 z-20">
            <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-elevated border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: 'Digital Offices', value: '5,000+' },
                    { label: 'Countries', value: '12' },
                    { label: 'Valuation', value: '$50M+' },
                    { label: 'Satisfaction', value: '99%' }
                ].map((stat, i) => (
                    <div key={i} className="text-center group">
                       <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>
         </div>
      </div>

      <div className="h-24 bg-white"></div> {/* Spacer for floating stats */}

      {/* --- OUR STORY (Zig-Zag) --- */}
      <div className="max-w-7xl mx-auto px-6 py-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8 animate-slide-up">
                <div className="inline-flex items-center gap-2 text-brand-gold font-bold uppercase tracking-widest text-xs">
                   <div className="w-8 h-0.5 bg-brand-gold"></div>
                   {t('ourStory')}
                </div>
                <h2 className="text-4xl font-heading font-bold text-brand-primary leading-tight">
                   From a coffee shop idea to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Empire.</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                   {t('ourStoryDesc')}
                </p>
                <div className="flex gap-4 pt-4">
                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 w-full">
                      <div className="text-2xl mb-2">🚀</div>
                      <div className="font-bold text-brand-primary">{t('ourMission')}</div>
                      <div className="text-xs text-slate-500 mt-1">{t('ourMissionDesc')}</div>
                   </div>
                </div>
             </div>
             <div className="relative">
                <div className="absolute top-4 -right-4 w-full h-full border-2 border-brand-gold/30 rounded-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-700" 
                  alt="Our Story" 
                />
             </div>
         </div>
      </div>

      {/* --- VALUES GRID --- */}
      <div className="bg-brand-surface py-24 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-heading font-bold text-brand-primary mb-4">{t('ourValues')}</h2>
               <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { title: 'valueInnovation', icon: '💡', desc: 'Pushing boundaries with AI & Tech.' },
                   { title: 'valueCommunity', icon: '🤝', desc: 'Success is better when shared.' },
                   { title: 'valueGrowth', icon: '📈', desc: 'Sustainable scaling for every member.' }
                ].map((item, i) => (
                   <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 border border-slate-100 group">
                      <div className="w-14 h-14 bg-brand-surface rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                         {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-brand-primary mb-3">{t(item.title)}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                   </div>
                ))}
            </div>
         </div>
      </div>

      {/* --- TIMELINE --- */}
      <div className="max-w-4xl mx-auto px-6 py-24">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-brand-primary">{t('timeline')}</h2>
         </div>
         <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 space-y-12">
            {[1, 2, 3].map((num) => (
               <div key={num} className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center group">
                  <div className="absolute left-[-5px] md:left-1/2 md:-ml-[5px] w-3 h-3 bg-white border-2 border-brand-primary rounded-full z-10 group-hover:scale-150 transition-transform duration-300"></div>
                  
                  <div className={`md:w-1/2 pl-8 md:pl-0 ${num % 2 === 0 ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'}`}>
                     <div className={`p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${num % 2 !== 0 ? 'md:ml-auto' : ''} max-w-md`}>
                        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Milestone 0{num}</span>
                        <h3 className="text-lg font-bold text-brand-primary">{t(`timeline_${num}`)}</h3>
                     </div>
                  </div>
                  {/* Empty div for the other side of the timeline in desktop view */}
                  <div className="hidden md:block md:w-1/2"></div> 
               </div>
            ))}
         </div>
      </div>

      {/* --- LEADERSHIP TEAM --- */}
      <div className="bg-[#0B1121] text-white py-24 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -ml-20 -mt-20"></div>
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl -mr-20 -mb-20"></div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('meet_team')}</h2>
                  <p className="text-slate-400 max-w-xl text-lg font-light">
                     {t('team_desc')}
                  </p>
               </div>
               <button className="px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-brand-primary transition-colors text-sm font-bold">
                  View All Members
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {team.map((member, i) => (
                  <div key={i} className="group relative">
                     <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-6">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"></div>
                        <img 
                           src={member.img} 
                           alt={member.name} 
                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                     </div>
                     <h3 className="text-xl font-bold">{member.name}</h3>
                     <p className="text-brand-gold text-sm font-bold uppercase tracking-wider mt-1">{t(member.role)}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* --- FINAL CTA --- */}
      <div className="bg-brand-gold py-20 text-center px-6">
         <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8">{t('joinTheFuture')}</h2>
         <button className="px-10 py-4 bg-white text-brand-primary font-bold rounded-xl shadow-2xl hover:bg-slate-50 transform hover:scale-105 transition-all">
            {t('startNow')}
         </button>
      </div>

    </div>
  );
};

export default AboutPage;
