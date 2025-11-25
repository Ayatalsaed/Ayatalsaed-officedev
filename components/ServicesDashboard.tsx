
import React from 'react';
import { ServiceType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ServicesDashboardProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
}

const ServicesDashboard: React.FC<ServicesDashboardProps> = ({ activeService, onSelectService }) => {
  const { t } = useLanguage();
  
  // SVG Icon paths (Clean, linear style)
  const icons = {
    task: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    consulting: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    mailbox: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    receptionist: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    logistics: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m2 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    lab: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    networking: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    intelligence: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  };

  const services = [
    { id: ServiceType.NETWORK_INTELLIGENCE, icon: icons.intelligence, title: t('network_intelligence'), desc: t('network_intelligenceDesc'), highlight: true },
    { id: ServiceType.TASK_MANAGER, icon: icons.task, title: t('taskManager'), desc: t('taskManagerDesc') },
    { id: ServiceType.CONSULTING, icon: icons.consulting, title: t('consultant'), desc: t('consultantDesc') },
    { id: ServiceType.MAILBOX, icon: icons.mailbox, title: t('mailbox'), desc: t('mailboxDesc') },
    { id: ServiceType.RECEPTIONIST, icon: icons.receptionist, title: t('receptionist'), desc: t('receptionistDesc') },
    { id: ServiceType.LOGISTICS, icon: icons.logistics, title: t('logistics'), desc: t('logisticsDesc') },
    { id: ServiceType.VIRTUAL_LAB, icon: icons.lab, title: t('virtualLab'), desc: t('virtualLabDesc') },
    { id: ServiceType.NETWORKING, icon: icons.networking, title: t('networking'), desc: t('networkingDesc') },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 mb-6">
      {services.map((service) => {
        const isActive = activeService === service.id;
        const isHighlight = (service as any).highlight;

        return (
          <button
            key={service.id}
            onClick={() => onSelectService(service.id)}
            className={`
              p-6 rounded-2xl text-start transition-all duration-200 border flex flex-col gap-4 group relative overflow-hidden
              ${isActive 
                ? 'bg-brand-primary text-white border-brand-primary shadow-card-hover' 
                : 'bg-white border-slate-100 hover:border-brand-primary/30 hover:shadow-card'
              }
            `}
          >
            {isHighlight && !isActive && (
               <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-brand-gold/20 to-transparent rounded-bl-full"></div>
            )}

            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center transition-colors
              ${isActive 
                  ? 'bg-white/10 text-white' 
                  : isHighlight ? 'bg-brand-gold/10 text-brand-gold' : 'bg-brand-surface text-brand-secondary group-hover:text-brand-primary group-hover:bg-blue-50'
              }
            `}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className={`font-bold text-sm mb-1 font-heading ${isActive ? 'text-white' : 'text-brand-primary'}`}>
                {service.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isActive ? 'text-blue-100' : 'text-text-sub'}`}>
                {service.desc}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ServicesDashboard;