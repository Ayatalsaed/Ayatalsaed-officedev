import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ServicesPage: React.FC = () => {
  const { language } = useLanguage();

  // ... (Existing content object structure kept same, just rendering changed)
  const content = {
    ar: {
      title: "خدمات المكاتب الافتراضية وحلول تأسيس الأعمال",
      subtitle: "نوفّر لروّاد الأعمال والشركات حضورًا رسميًا متكاملاً دون الحاجة لمقر فعلي، مع خدمات احترافية تغطي العنوان التجاري، إدارة الاتصالات، الوصول لمساحات العمل، والدعم القانوني والإداري.",
      sections: [
        {
          title: "أولاً: الخدمات الأساسية للمكتب الافتراضي",
          desc: "هذه هي الركائز التي تمنح شركتك حضورًا مهنيًا وامتثالًا قانونيًا دون مكتب فعلي:",
          items: [
            { title: "العنوان التجاري القانوني", details: ["عنوان فعلي مُعتمد لتسجيل الشركة.", "حماية خصوصيتك بإبعاد عنوانك الشخصي عن السجل العام.", "واجهة مهنية أمام العملاء والهيئات الحكومية."] },
            { title: "إدارة البريد والطرود", details: ["استلام وفرز البريد الرسمي والطرود.", "إعادة التوجيه لأي عنوان تريده.", "إشعارات فورية عند وصول بريد جديد."] },
            { title: "العنوان المعتمد للجهات الحكومية", details: ["السعودية: مقر افتراضي معتمد وفق النظام الجديد.", "الإمارات: عنوان قانوني لإصدار الرخص (إيجاري/استدامة).", "عالمياً: عناوين صالحة لتأسيس الشركات في أمريكا وبريطانيا."] }
          ]
        },
        {
          title: "ثانياً: خدمات الاتصالات والدعم الإداري",
          desc: "نعطي شركتك حضورًا صوتيًا وعملياتيًا احترافيًا:",
          items: [
            { title: "موظف استقبال افتراضي", details: ["الرد على المكالمات باسم شركتك.", "تحويل المكالمات أو تسجيل الرسائل.", "خدمة بلغات متعددة عند الحاجة."] },
            { title: "رقم هاتف مخصص", details: ["رقم محلي مباشر للشركة.", "بريد صوتي مع تحويل التسجيلات للإيميل.", "إمكانية استخدام الرقم عبر تطبيقات الهاتف."] },
            { title: "سكرتارية ومساعدة إدارية", details: ["تنسيق المواعيد وإدارة البريد الإلكتروني.", "إعداد مستندات وعروض تقديمية.", "دعم عملائك والرد على الاستفسارات."] }
          ]
        },
        {
          title: "ثالثاً: خدمات الوصول المادي ومساحات العمل",
          desc: "على الرغم من أن مقرّك افتراضي، يمكنك العمل فعليًا وقت الحاجة:",
          items: [
            { title: "قاعات اجتماعات مجهّزة", details: ["تُحجز بالساعة.", "شاشات عرض – اتصال سريع – ضيافة.", "بيئة احترافية لاستقبال العملاء."] },
            { title: "مساحات عمل مشتركة (Coworking)", details: ["دخول حسب الطلب أو ساعات شهرية.", "مكاتب يومية (Day Office) عند الحاجة.", "بيئة عمل محفزة ومشتركة."] },
            { title: "الوصول العالمي", details: ["استخدام مكاتب وقاعات اجتماعات في مئات المدن حول العالم.", "عضوية مرنة تناسب تنقلاتك."] }
          ]
        },
        {
          title: "رابعاً: خدمات تأسيس الشركات والامتثال",
          desc: "نوفر حلولًا متكاملة تساعدك على تأسيس شركتك وتشغيلها بسهولة:",
          items: [
            { title: "تأسيس وتسجيل الشركات", details: ["إصدار السجل التجاري والرخصة.", "تسجيل فوري أو خلال ساعات حسب الدولة.", "تجهيز العقود والملفات القانونية."] },
            { title: "خدمات مالية وقانونية", details: ["فتح حساب بنكي تجاري.", "مسك الدفاتر، المحاسبة، وضريبة القيمة المضافة.", "خدمات الوكيل المسجل (Registered Agent)."] },
            { title: "خدمات المناطق الحرة (الإمارات)", details: ["ملكية 100% للشركة بدون شريك محلي.", "آلاف الأنشطة التجارية المعتمدة.", "دعم شامل حتى فتح الحساب البنكي."] }
          ]
        }
      ],
      whyUs: {
        title: "خامساً: لماذا المكتب الافتراضي هو الحل؟",
        desc: "لأنه ببساطة \"البدلة الرسمية لعملك\". يعطيك كل ما تحتاجه لتبدو كشركة كاملة—عنوان مرموق، هاتف رسمي، استقبال مكالمات، إدارة بريد، قاعات اجتماعات—بدون تكاليف المقر التقليدي."
      }
    },
    // ... (EN and ES sections omitted for brevity, they use the same structure)
    en: {
       title: "Virtual Office Services & Business Solutions",
       subtitle: "We provide entrepreneurs and companies with a complete official presence without the need for a physical headquarters.",
       sections: [
        {
          title: "1. Core Virtual Office Services",
          desc: "Professional presence and legal compliance:",
          items: [
            { title: "Legal Business Address", details: ["Certified physical address.", "Protect privacy.", "Professional interface."] },
            { title: "Mail & Package Management", details: ["Receive and sort mail.", "Forwarding service.", "Instant notifications."] },
            { title: "Government Approved Address", details: ["KSA: Certified virtual headquarters.", "UAE: Legal address (Ejari).", "Global: Valid addresses."] }
          ]
        },
        // ... other sections similar structure
        {
            title: "2. Communication & Admin Support",
            desc: "Professional vocal and operational presence:",
            items: [
                { title: "Virtual Receptionist", details: ["Call answering.", "Call forwarding.", "Multi-lingual."] },
                { title: "Dedicated Phone Number", details: ["Local number.", "Voicemail to email.", "Mobile app usage."] },
                { title: "Secretarial Support", details: ["Scheduling.", "Docs prep.", "Customer support."] }
            ]
        }
       ],
       whyUs: {
        title: "Why a Virtual Office?",
        desc: "It is the 'Formal Suit for Your Business'. Prestigious address, official phone, without overhead."
       }
    },
    es: {
       title: "Servicios de Oficina Virtual",
       subtitle: "Presencia oficial completa sin sede física.",
       sections: [
           {
               title: "1. Servicios Básicos",
               desc: "Presencia profesional y cumplimiento legal:",
               items: [
                   { title: "Dirección Comercial", details: ["Certificada.", "Privacidad.", "Interfaz profesional."] },
                   { title: "Gestión de Correo", details: ["Recepción.", "Reenvío.", "Notificaciones."] },
                   { title: "Dirección Aprobada", details: ["KSA: Sede virtual.", "EAU: Ejari.", "Global: Direcciones válidas."] }
               ]
           },
           {
            title: "2. Comunicación",
            desc: "Presencia operativa:",
            items: [
                { title: "Recepcionista Virtual", details: ["Respuesta.", "Desvío.", "Multilingüe."] },
                { title: "Número Dedicado", details: ["Número local.", "Buzón de voz.", "App móvil."] },
                { title: "Soporte Admin", details: ["Agenda.", "Documentos.", "Soporte."] }
            ]
           }
       ],
       whyUs: {
           title: "¿Por qué Oficina Virtual?",
           desc: "Es el 'Traje Formal' para su negocio."
       }
    }
  };

  const tData = (content as any)[language] || content['ar'];

  // Icons Map for sections
  const getIcon = (sectionIdx: number, itemIdx: number) => {
      // Simple logic to return SVG paths based on index
      const paths = [
          ["M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"],
          ["M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"],
          ["M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"],
          ["M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"]
      ];
      return paths[sectionIdx]?.[itemIdx] || paths[0][0];
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-primary font-heading mb-6 leading-tight">
          {tData.title}
        </h1>
        <p className="text-xl text-text-sub leading-relaxed font-light">
          {tData.subtitle}
        </p>
      </div>

      {/* Sections Grid */}
      <div className="space-y-24">
        {tData.sections.map((section: any, idx: number) => (
          <div key={idx} className="animate-slide-up">
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-10 border-b border-slate-100 pb-6">
               <div className="text-sm font-bold text-brand-gold uppercase tracking-widest shrink-0">
                  0{idx + 1}
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-brand-primary font-heading mb-2">{section.title}</h2>
                  <p className="text-base text-slate-500 font-light">{section.desc}</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.items.map((item: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 flex flex-col group hover:border-brand-primary/20">
                   <div className="w-12 h-12 bg-brand-surface rounded-lg flex items-center justify-center text-brand-secondary group-hover:text-brand-primary group-hover:bg-blue-50 mb-6 transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={getIcon(idx, i)} />
                      </svg>
                   </div>
                   <h3 className="text-lg font-bold text-brand-primary mb-4 font-heading">{item.title}</h3>
                   <ul className="space-y-4 mt-auto">
                      {item.details.map((detail: string, d: number) => (
                        <li key={d} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed font-light">
                           <div className="w-1 h-1 rounded-full bg-brand-gold mt-2 shrink-0"></div>
                           {detail}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Why Us */}
      <div className="mt-24 bg-brand-primary rounded-2xl p-12 md:p-20 text-white text-center shadow-luxury">
         <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold font-heading">{tData.whyUs.title}</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
            <p className="text-xl md:text-2xl leading-relaxed text-blue-50 font-serif italic">
               "{tData.whyUs.desc}"
            </p>
         </div>
      </div>
    </div>
  );
};

export default ServicesPage;