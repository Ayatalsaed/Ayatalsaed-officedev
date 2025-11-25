
import { Business } from './types';

// Mock "Me" Business for matching context
export const MY_BUSINESS_GENOME = {
  id: 'ME',
  name: 'TechVision',
  category: 'TECHNOLOGY',
  genomeProfile: {
    industrySector: 'Software Development',
    servicesOffered: ['AI Consulting', 'Web Development', 'SaaS Products'],
    servicesNeeded: ['Legal Counsel', 'Marketing Strategy', 'Logistics'],
    targetMarkets: ['Saudi Arabia', 'UAE'],
    companySize: 'SME',
    collaborationPreferences: ['Joint Venture', 'Service Swapping']
  }
};

const BUSINESSES_DATA = {
  ar: [
    {
      id: '1',
      name: 'تقنيات المستقبل',
      description: 'حلول برمجية متكاملة للشركات الناشئة، نركز على تطوير التطبيقات والذكاء الاصطناعي لتحسين كفاءة الأعمال.',
      category: 'TECHNOLOGY',
      logoUrl: 'https://picsum.photos/100/100?random=1',
      color: 'bg-cyan-600',
      isOccupied: true,
      gridPosition: { x: 1, y: 1 },
      activeVisitors: 14,
      services: ['تطوير ويب', 'تطبيقات جوال', 'استشارات تقنية', 'ذكاء اصطناعي'],
      genomeProfile: {
        industrySector: 'Technology',
        servicesOffered: ['Web Dev', 'Mobile Apps'],
        servicesNeeded: ['Marketing', 'Legal'],
        targetMarkets: ['KSA'],
        companySize: 'Startup',
        collaborationPreferences: ['Contract']
      },
      contact: {
        email: 'info@futuretech.sa',
        phone: '+966 50 123 4567',
        website: 'www.futuretech.sa'
      }
    },
    {
      id: '2',
      name: 'إعمار ديزاين',
      description: 'تصميم داخلي وهندسة معمارية حديثة. نحول المساحات إلى بيئات عمل ملهمة باستخدام أحدث تقنيات التصميم.',
      category: 'ENGINEERING',
      logoUrl: 'https://picsum.photos/100/100?random=2',
      color: 'bg-purple-600',
      isOccupied: true,
      gridPosition: { x: 2, y: 1 },
      activeVisitors: 8,
      services: ['تصميم داخلي', 'مخططات معمارية', 'إشراف هندسي'],
      genomeProfile: {
        industrySector: 'Engineering',
        servicesOffered: ['Interior Design', 'Architecture'],
        servicesNeeded: ['Software', 'Accounting'],
        targetMarkets: ['GCC'],
        companySize: 'SME',
        collaborationPreferences: ['Project Basis']
      },
      contact: {
        email: 'contact@emaar-design.com',
        phone: '+966 55 987 6543',
        website: 'www.emaar-design.com'
      }
    },
    {
      id: '3',
      name: 'لوجستيك بلس',
      description: 'خدمات شحن وتوصيل ذكية. نقدم حلول لوجستية متكاملة للمتاجر الإلكترونية والشركات.',
      category: 'TRANSPORT',
      logoUrl: 'https://picsum.photos/100/100?random=3',
      color: 'bg-orange-600',
      isOccupied: true,
      gridPosition: { x: 3, y: 2 },
      activeVisitors: 32,
      services: ['شحن دولي', 'تخزين ذكي', 'إدارة مخزون', 'توصيل سريع'],
      genomeProfile: {
        industrySector: 'Logistics',
        servicesOffered: ['Shipping', 'Storage'],
        servicesNeeded: ['Vehicle Maintenance', 'Tracking Software'],
        targetMarkets: ['Global'],
        companySize: 'Enterprise',
        collaborationPreferences: ['Long-term Partnership']
      },
      contact: {
        email: 'support@logisticsplus.sa',
        phone: '+966 11 222 3333',
        website: 'www.logisticsplus.sa'
      }
    },
    {
      id: '4',
      name: 'مساحة شاغرة',
      description: 'احجز مكتبك الافتراضي الآن مجاناً وابدأ رحلتك الريادية في بيئة متكاملة.',
      category: 'AVAILABLE',
      logoUrl: '',
      color: 'bg-gray-700',
      isOccupied: false,
      gridPosition: { x: 1, y: 2 }
    },
    {
      id: '5',
      name: 'مساحة شاغرة',
      description: 'موقع مميز لشركتك القادمة مع كافة الخدمات الرقمية.',
      category: 'AVAILABLE',
      logoUrl: '',
      color: 'bg-gray-700',
      isOccupied: false,
      gridPosition: { x: 2, y: 2 }
    },
    {
      id: '6',
      name: 'أكاديمية المعرفة',
      description: 'تدريب واستشارات تعليمية عن بعد. منصة رائدة لتقديم الدورات وورش العمل المتخصصة.',
      category: 'EDUCATION',
      logoUrl: 'https://picsum.photos/100/100?random=4',
      color: 'bg-emerald-600',
      isOccupied: true,
      gridPosition: { x: 3, y: 1 },
      activeVisitors: 65,
      services: ['دورات أونلاين', 'شهادات معتمدة', 'ورش عمل', 'استشارات'],
      genomeProfile: {
        industrySector: 'Education',
        servicesOffered: ['Training', 'Consulting'],
        servicesNeeded: ['Video Production', 'LMS Platform'],
        targetMarkets: ['MENA'],
        companySize: 'SME',
        collaborationPreferences: ['Content Partnership']
      },
      contact: {
        email: 'admission@knowledge-academy.edu',
        phone: '+966 54 000 1111',
        website: 'www.knowledge-academy.edu'
      }
    }
  ],
  en: [
    {
      id: '1',
      name: 'Future Tech',
      description: 'Integrated software solutions for startups, focusing on app development and AI to improve business efficiency.',
      category: 'TECHNOLOGY',
      logoUrl: 'https://picsum.photos/100/100?random=1',
      color: 'bg-cyan-600',
      isOccupied: true,
      gridPosition: { x: 1, y: 1 },
      activeVisitors: 14,
      services: ['Web Dev', 'Mobile Apps', 'Tech Consulting', 'AI'],
      genomeProfile: {
        industrySector: 'Technology',
        servicesOffered: ['Web Dev', 'Mobile Apps'],
        servicesNeeded: ['Marketing', 'Legal'],
        targetMarkets: ['KSA'],
        companySize: 'Startup',
        collaborationPreferences: ['Contract']
      },
      contact: {
        email: 'info@futuretech.sa',
        phone: '+966 50 123 4567',
        website: 'www.futuretech.sa'
      }
    },
    // ... (Other EN entries follow same pattern with genomeProfile)
    {
      id: '2',
      name: 'Emaar Design',
      description: 'Modern interior design and architecture.',
      category: 'ENGINEERING',
      logoUrl: 'https://picsum.photos/100/100?random=2',
      color: 'bg-purple-600',
      isOccupied: true,
      gridPosition: { x: 2, y: 1 },
      activeVisitors: 8,
      services: ['Interior Design', 'Architectural Plans', 'Supervision'],
       genomeProfile: {
        industrySector: 'Engineering',
        servicesOffered: ['Interior Design', 'Architecture'],
        servicesNeeded: ['Software', 'Accounting'],
        targetMarkets: ['GCC'],
        companySize: 'SME',
        collaborationPreferences: ['Project Basis']
      },
      contact: {
        email: 'contact@emaar-design.com',
        phone: '+966 55 987 6543',
        website: 'www.emaar-design.com'
      }
    },
    {
      id: '3',
      name: 'Logistics Plus',
      description: 'Smart shipping and delivery services.',
      category: 'TRANSPORT',
      logoUrl: 'https://picsum.photos/100/100?random=3',
      color: 'bg-orange-600',
      isOccupied: true,
      gridPosition: { x: 3, y: 2 },
      activeVisitors: 32,
      services: ['Intl Shipping', 'Smart Storage', 'Inventory Mgmt', 'Fast Delivery'],
      genomeProfile: {
        industrySector: 'Logistics',
        servicesOffered: ['Shipping', 'Storage'],
        servicesNeeded: ['Vehicle Maintenance', 'Tracking Software'],
        targetMarkets: ['Global'],
        companySize: 'Enterprise',
        collaborationPreferences: ['Long-term Partnership']
      },
      contact: {
        email: 'support@logisticsplus.sa',
        phone: '+966 11 222 3333',
        website: 'www.logisticsplus.sa'
      }
    },
    {
      id: '4',
      name: 'Vacant Space',
      description: 'Book your virtual office now for free.',
      category: 'AVAILABLE',
      logoUrl: '',
      color: 'bg-gray-700',
      isOccupied: false,
      gridPosition: { x: 1, y: 2 }
    },
    {
      id: '5',
      name: 'Vacant Space',
      description: 'A prime location for your next company.',
      category: 'AVAILABLE',
      logoUrl: '',
      color: 'bg-gray-700',
      isOccupied: false,
      gridPosition: { x: 2, y: 2 }
    },
    {
      id: '6',
      name: 'Knowledge Academy',
      description: 'Remote educational training and consulting.',
      category: 'EDUCATION',
      logoUrl: 'https://picsum.photos/100/100?random=4',
      color: 'bg-emerald-600',
      isOccupied: true,
      gridPosition: { x: 3, y: 1 },
      activeVisitors: 65,
      services: ['Online Courses', 'Certified Certs', 'Workshops', 'Consulting'],
      genomeProfile: {
        industrySector: 'Education',
        servicesOffered: ['Training', 'Consulting'],
        servicesNeeded: ['Video Production', 'LMS Platform'],
        targetMarkets: ['MENA'],
        companySize: 'SME',
        collaborationPreferences: ['Content Partnership']
      },
      contact: {
        email: 'admission@knowledge-academy.edu',
        phone: '+966 54 000 1111',
        website: 'www.knowledge-academy.edu'
      }
    }
  ],
  es: [
     // Simplified ES mock for brevity, assuming structure matches AR/EN
    {
      id: '1',
      name: 'Tecnologías del Futuro',
      description: 'Soluciones de software integrales.',
      category: 'TECHNOLOGY',
      logoUrl: 'https://picsum.photos/100/100?random=1',
      color: 'bg-cyan-600',
      isOccupied: true,
      gridPosition: { x: 1, y: 1 },
      activeVisitors: 14,
      services: ['Desarrollo Web', 'Apps Móviles', 'Consultoría', 'IA'],
      genomeProfile: {
        industrySector: 'Technology',
        servicesOffered: ['Web Dev', 'Mobile Apps'],
        servicesNeeded: ['Marketing', 'Legal'],
        targetMarkets: ['KSA'],
        companySize: 'Startup',
        collaborationPreferences: ['Contract']
      },
      contact: {
        email: 'info@futuretech.sa',
        phone: '+966 50 123 4567',
        website: 'www.futuretech.sa'
      }
    },
    // ... others
     {
      id: '2',
      name: 'Emaar Diseño',
      description: 'Diseño de interiores y arquitectura moderna.',
      category: 'ENGINEERING',
      logoUrl: 'https://picsum.photos/100/100?random=2',
      color: 'bg-purple-600',
      isOccupied: true,
      gridPosition: { x: 2, y: 1 },
      activeVisitors: 8,
      services: ['Diseño Interior', 'Planos', 'Supervisión'],
       genomeProfile: {
        industrySector: 'Engineering',
        servicesOffered: ['Interior Design', 'Architecture'],
        servicesNeeded: ['Software', 'Accounting'],
        targetMarkets: ['GCC'],
        companySize: 'SME',
        collaborationPreferences: ['Project Basis']
      },
      contact: {
        email: 'contact@emaar-design.com',
        phone: '+966 55 987 6543',
        website: 'www.emaar-design.com'
      }
    },
    {
      id: '3',
      name: 'Logística Plus',
      description: 'Servicios de envío y entrega inteligentes.',
      category: 'TRANSPORT',
      logoUrl: 'https://picsum.photos/100/100?random=3',
      color: 'bg-orange-600',
      isOccupied: true,
      gridPosition: { x: 3, y: 2 },
      activeVisitors: 32,
      services: ['Envío Intl', 'Almacenamiento', 'Inventario', 'Entrega Rápida'],
      genomeProfile: {
        industrySector: 'Logistics',
        servicesOffered: ['Shipping', 'Storage'],
        servicesNeeded: ['Vehicle Maintenance', 'Tracking Software'],
        targetMarkets: ['Global'],
        companySize: 'Enterprise',
        collaborationPreferences: ['Long-term Partnership']
      },
      contact: {
        email: 'support@logisticsplus.sa',
        phone: '+966 11 222 3333',
        website: 'www.logisticsplus.sa'
      }
    },
    {
      id: '4',
      name: 'Espacio Disponible',
      description: 'Reserva tu oficina virtual ahora gratis.',
      category: 'AVAILABLE',
      logoUrl: '',
      color: 'bg-gray-700',
      isOccupied: false,
      gridPosition: { x: 1, y: 2 }
    },
    {
      id: '5',
      name: 'Espacio Disponible',
      description: 'Una ubicación privilegiada.',
      category: 'AVAILABLE',
      logoUrl: '',
      color: 'bg-gray-700',
      isOccupied: false,
      gridPosition: { x: 2, y: 2 }
    },
    {
      id: '6',
      name: 'Academia del Conocimiento',
      description: 'Formación educativa y consultoría remota.',
      category: 'EDUCATION',
      logoUrl: 'https://picsum.photos/100/100?random=4',
      color: 'bg-emerald-600',
      isOccupied: true,
      gridPosition: { x: 3, y: 1 },
      activeVisitors: 65,
      services: ['Cursos Online', 'Certificados', 'Talleres', 'Consultoría'],
      genomeProfile: {
        industrySector: 'Education',
        servicesOffered: ['Training', 'Consulting'],
        servicesNeeded: ['Video Production', 'LMS Platform'],
        targetMarkets: ['MENA'],
        companySize: 'SME',
        collaborationPreferences: ['Content Partnership']
      },
      contact: {
        email: 'admission@knowledge-academy.edu',
        phone: '+966 54 000 1111',
        website: 'www.knowledge-academy.edu'
      }
    }
  ]
};

export const getMockBusinesses = (lang: string = 'ar'): Business[] => {
  return (BUSINESSES_DATA as any)[lang] || BUSINESSES_DATA['ar'];
};

export const MOCK_BUSINESSES = BUSINESSES_DATA['ar'];

export const getSystemInstruction = (lang: string) => {
  const instructions = {
    ar: `
    أنت "مستشار مطورو الاعمال"، خبير أعمال ذكي متخصص في إدارة المكاتب الافتراضية وتطوير الشركات الناشئة.
    `,
    en: `
    You are "Business Developers Advisor", a smart business expert specializing in virtual office management and startup development.
    `,
    es: `
    Eres "Business Developers Advisor", un experto en negocios inteligente especializado en gestión de oficinas virtuales y desarrollo de startups.
    `
  };
  return (instructions as any)[lang] || instructions['ar'];
};