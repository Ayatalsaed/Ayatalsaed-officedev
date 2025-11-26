

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [cart, setCart] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Content with pricing and IDs added
  const content = {
    ar: {
      title: "خدمات المكاتب الافتراضية وحلول تأسيس الأعمال",
      subtitle: "نوفّر لروّاد الأعمال والشركات حضورًا رسميًا متكاملاً دون الحاجة لمقر فعلي.",
      sections: [
        {
          title: "الخدمات الأساسية",
          items: [
            { id: 'addr', title: "العنوان التجاري القانوني", desc: "عنوان فعلي مُعتمد لتسجيل الشركة.", price: 199 },
            { id: 'mail', title: "إدارة البريد والطرود", desc: "استلام وفرز البريد الرسمي والطرود.", price: 99 },
            { id: 'gov', title: "العنوان المعتمد للجهات الحكومية", desc: "مقر افتراضي معتمد وفق النظام الجديد.", price: 299 }
          ]
        },
        {
          title: "الاتصالات والدعم",
          items: [
            { id: 'rec', title: "موظف استقبال افتراضي", desc: "الرد على المكالمات باسم شركتك.", price: 149 },
            { id: 'phone', title: "رقم هاتف مخصص", desc: "رقم محلي مباشر للشركة.", price: 49 },
            { id: 'sec', title: "سكرتارية ومساعدة إدارية", desc: "تنسيق المواعيد وإدارة البريد الإلكتروني.", price: 399 }
          ]
        },
        {
          title: "مساحات العمل",
          items: [
            { id: 'meet', title: "قاعات اجتماعات مجهّزة", desc: "تُحجز بالساعة. شاشات عرض واتصال سريع.", price: 50 },
            { id: 'cowork', title: "مساحات عمل مشتركة", desc: "دخول حسب الطلب أو ساعات شهرية.", price: 150 },
            { id: 'global', title: "الوصول العالمي", desc: "استخدام مكاتب وقاعات اجتماعات حول العالم.", price: 599 }
          ]
        },
        {
          title: "تأسيس الشركات",
          items: [
            { id: 'inc', title: "تأسيس وتسجيل الشركات", desc: "إصدار السجل التجاري والرخصة.", price: 1500 },
            { id: 'fin', title: "خدمات مالية وقانونية", desc: "فتح حساب بنكي ومسك الدفاتر.", price: 800 },
            { id: 'free', title: "خدمات المناطق الحرة", desc: "ملكية 100% للشركة بدون شريك محلي.", price: 2500 }
          ]
        }
      ]
    },
    en: {
      title: "Virtual Office Services",
      subtitle: "Complete official presence without physical headquarters.",
      sections: [
        {
          title: "Core Services",
          items: [
            { id: 'addr', title: "Legal Business Address", desc: "Certified physical address.", price: 199 },
            { id: 'mail', title: "Mail Management", desc: "Receive and sort mail.", price: 99 },
            { id: 'gov', title: "Government Address", desc: "Certified virtual headquarters.", price: 299 }
          ]
        },
        {
          title: "Communication",
          items: [
            { id: 'rec', title: "Virtual Receptionist", desc: "Call answering in company name.", price: 149 },
            { id: 'phone', title: "Dedicated Phone", desc: "Local direct number.", price: 49 },
            { id: 'sec', title: "Secretarial Support", desc: "Scheduling and admin.", price: 399 }
          ]
        },
        {
          title: "Workspaces",
          items: [
            { id: 'meet', title: "Meeting Rooms", desc: "Book by hour. Fully equipped.", price: 50 },
            { id: 'cowork', title: "Coworking Access", desc: "On-demand access.", price: 150 },
            { id: 'global', title: "Global Access", desc: "Use offices worldwide.", price: 599 }
          ]
        },
        {
          title: "Formation",
          items: [
            { id: 'inc', title: "Company Formation", desc: "Commercial registration issuance.", price: 1500 },
            { id: 'fin', title: "Financial & Legal", desc: "Bank account & bookkeeping.", price: 800 },
            { id: 'free', title: "Free Zone Services", desc: "100% ownership setup.", price: 2500 }
          ]
        }
      ]
    },
    es: {
      title: "Servicios de Oficina Virtual",
      subtitle: "Presencia oficial completa sin sede física.",
      sections: [
        {
          title: "Servicios Básicos",
          items: [
            { id: 'addr', title: "Dirección Comercial", desc: "Dirección física certificada.", price: 199 },
            { id: 'mail', title: "Gestión de Correo", desc: "Recepción y clasificación.", price: 99 },
            { id: 'gov', title: "Dirección Gubernamental", desc: "Sede virtual certificada.", price: 299 }
          ]
        },
        {
          title: "Comunicación",
          items: [
            { id: 'rec', title: "Recepcionista Virtual", desc: "Respuesta de llamadas.", price: 149 },
            { id: 'phone', title: "Teléfono Dedicado", desc: "Número local directo.", price: 49 },
            { id: 'sec', title: "Soporte Secretarial", desc: "Agenda y administración.", price: 399 }
          ]
        },
        {
          title: "Espacios de Trabajo",
          items: [
            { id: 'meet', title: "Salas de Reuniones", desc: "Reserva por hora.", price: 50 },
            { id: 'cowork', title: "Acceso Coworking", desc: "Acceso bajo demanda.", price: 150 },
            { id: 'global', title: "Acceso Global", desc: "Uso de oficinas globales.", price: 599 }
          ]
        },
        {
          title: "Formación",
          items: [
            { id: 'inc', title: "Formación de Empresas", desc: "Registro comercial.", price: 1500 },
            { id: 'fin', title: "Financiero y Legal", desc: "Cuenta bancaria y libros.", price: 800 },
            { id: 'free', title: "Zona Franca", desc: "100% propiedad.", price: 2500 }
          ]
        }
      ]
    }
  };

  const tData = (content as any)[language] || content['ar'];

  const addToCart = (id: string) => {
    setCart([...cart, id]);
    // Show temporary feedback could be added here
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach(itemId => {
      tData.sections.forEach((sec: any) => {
        const item = sec.items.find((i: any) => i.id === itemId);
        if (item) total += item.price;
      });
    });
    return total;
  };

  const handleCheckout = () => {
      setOrderSuccess(true);
      setTimeout(() => {
          setOrderSuccess(false);
          setCart([]);
          setShowCart(false);
      }, 3000);
  };

  // Icons Map for sections
  const getIcon = (sectionIdx: number, itemIdx: number) => {
      const paths = [
          ["M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"],
          ["M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"],
          ["M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"],
          ["M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"]
      ];
      return paths[sectionIdx]?.[itemIdx] || paths[0][0];
  };

  return (
    <div className="w-full bg-offWhite min-h-screen pb-32 animate-fade-in relative">
      
      {/* Hero Section */}
      <div className="bg-brand-primary text-white pt-16 pb-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/90"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                Premium Catalog
             </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{tData.title}</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
               {tData.subtitle}
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        
        {/* Services Grid */}
        <div className="space-y-16">
            {tData.sections.map((section: any, idx: number) => (
                <div key={idx} className="animate-slide-up">
                    <div className="flex items-center gap-4 mb-8">
                       <h2 className="text-2xl font-bold text-brand-primary font-heading">{section.title}</h2>
                       <div className="h-px bg-slate-200 flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {section.items.map((item: any, i: number) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-slate-100 group flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-surface rounded-bl-full -mr-12 -mt-12 transition-colors group-hover:bg-blue-50"></div>
                                
                                <div className="relative z-10 mb-6">
                                    <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors shadow-sm">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIcon(idx, i)} />
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-brand-primary mb-2 font-heading">{item.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-6 min-h-[40px]">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{t('startingFrom')}</span>
                                        <div className="text-xl font-bold text-brand-gold">{item.price} <span className="text-xs text-brand-primary">{t('sar')}</span></div>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(item.id)}
                                        className="px-4 py-2 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-[#052c42] transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                    >
                                        <span>{t('addToCart')}</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-slide-up">
              <div className="bg-brand-primary text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between backdrop-blur-md bg-opacity-95">
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowCart(!showCart)}>
                      <div className="relative">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                             🛒
                          </div>
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-brand-primary">
                              {cart.length}
                          </span>
                      </div>
                      <div>
                          <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">{t('basket')}</div>
                          <div className="font-bold">{calculateTotal()} {t('sar')}</div>
                      </div>
                  </div>
                  <button 
                    onClick={() => setShowCart(true)}
                    className="px-6 py-2.5 bg-brand-gold text-brand-primary font-bold rounded-xl text-sm hover:bg-white transition-colors"
                  >
                      {t('goToCart')}
                  </button>
              </div>
          </div>
      )}

      {/* Cart Drawer / Modal */}
      {showCart && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
              <div className="bg-white w-full max-w-lg h-[80vh] sm:h-auto sm:max-h-[80vh] rounded-t-3xl sm:rounded-3xl shadow-elevated flex flex-col animate-slide-up">
                  
                  {orderSuccess ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce text-green-600">
                              🎉
                          </div>
                          <h3 className="text-2xl font-bold text-brand-primary mb-2">{t('successBooking')}</h3>
                          <p className="text-slate-500">{t('orderSuccess')}</p>
                      </div>
                  ) : (
                    <>
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-3xl">
                            <h2 className="text-xl font-bold text-brand-primary">{t('basket')}</h2>
                            <button onClick={() => setShowCart(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="text-center py-10 text-slate-400">{t('cartEmpty')}</div>
                            ) : (
                                cart.map((itemId, idx) => {
                                    // Find item details
                                    let itemDetails: any = null;
                                    tData.sections.forEach((sec: any) => {
                                        const found = sec.items.find((i: any) => i.id === itemId);
                                        if (found) itemDetails = found;
                                    });

                                    if (!itemDetails) return null;

                                    return (
                                        <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-lg font-bold">
                                                    {itemDetails.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-brand-primary text-sm">{itemDetails.title}</div>
                                                    <div className="text-xs text-brand-gold font-bold">{itemDetails.price} {t('sar')}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(idx)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-slate-500 font-bold">{t('total')}</span>
                                <span className="text-2xl font-bold text-brand-primary">{calculateTotal()} {t('sar')}</span>
                            </div>
                            <button 
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-[#052c42] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('checkout')}
                            </button>
                        </div>
                    </>
                  )}
              </div>
          </div>
      )}

    </div>
  );
};

export default ServicesPage;