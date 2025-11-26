




import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AiModel {
  id: string;
  titleKey: string;
  descKey: string;
  price: number;
  icon: string;
  category: 'Developers' | 'Marketing' | 'Support' | 'Sales' | 'HR' | 'Operations' | 'Design' | 'Legal' | 'Business' | 'Finance';
  features: string[];
}

const AiModelsPage: React.FC = () => {
  const { t } = useLanguage();
  
  // State
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<{id: string, total: number, addOns: string[]}[]>([]);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AiModel | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Model Data - Updated with full list
  const models: AiModel[] = [
    // --- DEVELOPERS / IT ---
    {
      id: 'dev_code',
      titleKey: 'model_dev_code_title',
      descKey: 'model_dev_code_desc',
      price: 1999,
      icon: '💻',
      category: 'Developers',
      features: ['Code Generation', 'Refactoring', 'Polyglot Support']
    },
    {
      id: 'dev_debug',
      titleKey: 'model_dev_debug_title',
      descKey: 'model_dev_debug_desc',
      price: 1499,
      icon: '🐛',
      category: 'Developers',
      features: ['Bug Detection', 'Security Scan', 'Performance Tips']
    },
    {
      id: 'dev_api',
      titleKey: 'model_dev_api_title',
      descKey: 'model_dev_api_desc',
      price: 1299,
      icon: '🔌',
      category: 'Developers',
      features: ['Endpoint Integration', 'Error Handling', 'Swagger Docs']
    },
    {
        id: 'dev_ops',
        titleKey: 'model_dev_ops_title',
        descKey: 'model_dev_ops_desc',
        price: 2499,
        icon: '⚙️',
        category: 'Developers',
        features: ['CI/CD Pipelines', 'Log Monitoring', 'Auto-Deployment']
    },

    // --- MARKETING ---
    {
      id: 'mkt_content',
      titleKey: 'model_mkt_content_title',
      descKey: 'model_mkt_content_desc',
      price: 1299,
      icon: '✍️',
      category: 'Marketing',
      features: ['Ad Copy', 'Blog Posts', 'Social Media Scripts']
    },
    {
      id: 'mkt_ad',
      titleKey: 'model_mkt_ad_title',
      descKey: 'model_mkt_ad_desc',
      price: 1599,
      icon: '🎯',
      category: 'Marketing',
      features: ['A/B Testing', 'CTR Optimization', 'Audience Targeting']
    },
    {
      id: 'mkt_seo',
      titleKey: 'model_mkt_seo_title',
      descKey: 'model_mkt_seo_desc',
      price: 1899,
      icon: '🔍',
      category: 'Marketing',
      features: ['Keyword Research', 'On-Page SEO', 'Competitor Analysis']
    },

    // --- SUPPORT ---
    {
      id: 'sup_bot',
      titleKey: 'model_sup_bot_title',
      descKey: 'model_sup_bot_desc',
      price: 999,
      icon: '🤖',
      category: 'Support',
      features: ['24/7 Reply', 'Ticket Creation', 'FAQ Handling']
    },
    {
      id: 'sup_sent',
      titleKey: 'model_sup_sent_title',
      descKey: 'model_sup_sent_desc',
      price: 1199,
      icon: '❤️',
      category: 'Support',
      features: ['Tone Analysis', 'Escalation Trigger', 'Customer Satisfaction']
    },

    // --- SALES ---
    {
      id: 'sales_lead',
      titleKey: 'model_sales_lead_title',
      descKey: 'model_sales_lead_desc',
      price: 2199,
      icon: '🔥',
      category: 'Sales',
      features: ['Lead Scoring', 'Purchase Probability', 'CRM Sync']
    },
    {
      id: 'sales_email',
      titleKey: 'model_sales_email_title',
      descKey: 'model_sales_email_desc',
      price: 1399,
      icon: '📧',
      category: 'Sales',
      features: ['Cold Outreach', 'Follow-up Sequence', 'Persuasion AI']
    },

    // --- HR ---
    {
      id: 'hr_cv',
      titleKey: 'model_hr_cv_title',
      descKey: 'model_hr_cv_desc',
      price: 1499,
      icon: '📄',
      category: 'HR',
      features: ['Resume Parsing', 'Skill Matching', 'Shortlisting']
    },
    {
      id: 'hr_int',
      titleKey: 'model_hr_int_title',
      descKey: 'model_hr_int_desc',
      price: 1699,
      icon: '🎤',
      category: 'HR',
      features: ['Question Gen', 'Answer Evaluation', 'Soft Skills Check']
    },

    // --- OPERATIONS ---
    {
      id: 'ops_auto',
      titleKey: 'model_ops_auto_title',
      descKey: 'model_ops_auto_desc',
      price: 2599,
      icon: '⚡',
      category: 'Operations',
      features: ['Invoice Processing', 'Scheduling', 'Report Gen']
    },
    {
      id: 'ops_fore',
      titleKey: 'model_ops_fore_title',
      descKey: 'model_ops_fore_desc',
      price: 2899,
      icon: '📈',
      category: 'Operations',
      features: ['Demand Forecast', 'Inventory Alert', 'Revenue Prediction']
    },

    // --- DESIGN ---
    {
      id: 'des_img',
      titleKey: 'model_des_img_title',
      descKey: 'model_des_img_desc',
      price: 1899,
      icon: '🎨',
      category: 'Design',
      features: ['Product Photos', 'Social Visuals', 'Mockups']
    },
    {
      id: 'des_ui',
      titleKey: 'model_des_ui_title',
      descKey: 'model_des_ui_desc',
      price: 2199,
      icon: '📱',
      category: 'Design',
      features: ['Wireframing', 'Dashboard Layouts', 'Component Library']
    },

    // --- LEGAL ---
    {
      id: 'legal_contract',
      titleKey: 'model_legal_contract_title',
      descKey: 'model_legal_contract_desc',
      price: 2499,
      icon: '⚖️',
      category: 'Legal',
      features: ['Risk Analysis', 'Clause Suggestion', 'Auto-Review']
    },
    {
      id: 'legal_comp',
      titleKey: 'model_legal_comp_title',
      descKey: 'model_legal_comp_desc',
      price: 1999,
      icon: '📜',
      category: 'Legal',
      features: ['Regulatory Checks', 'Policy Updates', 'Audit Logs']
    },
    {
      id: 'legal_ip',
      titleKey: 'model_legal_ip_title',
      descKey: 'model_legal_ip_desc',
      price: 1799,
      icon: '🛡️',
      category: 'Legal',
      features: ['Trademark Search', 'Copyright Claims', 'IP Monitoring']
    },

    // --- BUSINESS SERVICES ---
    {
      id: 'biz_feasibility',
      titleKey: 'model_biz_feasibility_title',
      descKey: 'model_biz_feasibility_desc',
      price: 2999,
      icon: '📊',
      category: 'Business',
      features: ['Market Analysis', 'Financial Projections', 'SWOT Gen']
    },
    {
      id: 'biz_deck',
      titleKey: 'model_biz_deck_title',
      descKey: 'model_biz_deck_desc',
      price: 1599,
      icon: '📽️',
      category: 'Business',
      features: ['Slide Design', 'Storytelling', 'Data Viz']
    },
    {
      id: 'biz_plan',
      titleKey: 'model_biz_plan_title',
      descKey: 'model_biz_plan_desc',
      price: 2299,
      icon: '🧭',
      category: 'Business',
      features: ['OKR Setting', 'KPI Tracking', 'Roadmap Gen']
    },

    // --- FINANCE & TAX ---
    {
      id: 'fin_tax',
      titleKey: 'model_fin_tax_title',
      descKey: 'model_fin_tax_desc',
      price: 2599,
      icon: '💰',
      category: 'Finance',
      features: ['VAT/Zakat Calc', 'Compliance Check', 'Deduction Finder']
    },
    {
      id: 'fin_book',
      titleKey: 'model_fin_book_title',
      descKey: 'model_fin_book_desc',
      price: 1899,
      icon: '📒',
      category: 'Finance',
      features: ['Expense Categorization', 'Bank Reconciliation', 'Ledger Update']
    },
    {
      id: 'fin_cfo',
      titleKey: 'model_fin_cfo_title',
      descKey: 'model_fin_cfo_desc',
      price: 3499,
      icon: '💼',
      category: 'Finance',
      features: ['Cash Flow Forecast', 'Investment ROI', 'Budget Planning']
    }
  ];

  const addOns = [
    { id: 'whatsapp', labelKey: 'addon_whatsapp', price: 299 },
    { id: 'voice', labelKey: 'addon_voice', price: 499 },
    { id: 'dashboard', labelKey: 'addon_dashboard', price: 199 },
    { id: 'crm', labelKey: 'addon_crm', price: 399 },
    { id: 'lang', labelKey: 'addon_multi_lang', price: 150 },
  ];

  // Handlers
  const openCustomize = (model: AiModel) => {
    setSelectedModel(model);
    setSelectedAddons([]);
    setCurrentTotal(model.price);
    setIsCustomizeOpen(true);
  };

  const openDemo = (model: AiModel) => {
    setSelectedModel(model);
    setIsDemoOpen(true);
  };

  const toggleAddon = (addonId: string, price: number) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(prev => prev.filter(id => id !== addonId));
      setCurrentTotal(prev => prev - price);
    } else {
      setSelectedAddons(prev => [...prev, addonId]);
      setCurrentTotal(prev => prev + price);
    }
  };

  const confirmAddToCart = () => {
    if (selectedModel) {
      setCart([...cart, { id: selectedModel.id, total: currentTotal, addOns: selectedAddons }]);
      setIsCustomizeOpen(false);
      setShowCart(true);
    }
  };

  const calculateGrandTotal = () => {
    return cart.reduce((acc, item) => acc + item.total, 0);
  };

  const handleCheckout = () => {
    setOrderSuccess(true);
    setTimeout(() => {
        setOrderSuccess(false);
        setCart([]);
        setShowCart(false);
    }, 3000);
  };

  // Categories definition mapping to translation keys
  const categoriesList = [
      { id: 'All', labelKey: 'cat_all' },
      { id: 'Legal', labelKey: 'cat_legal' },
      { id: 'Business', labelKey: 'cat_business' },
      { id: 'Finance', labelKey: 'cat_finance' },
      { id: 'Developers', labelKey: 'cat_developers' },
      { id: 'Marketing', labelKey: 'cat_marketing' },
      { id: 'Support', labelKey: 'cat_support' },
      { id: 'Sales', labelKey: 'cat_sales' },
      { id: 'HR', labelKey: 'cat_hr' },
      { id: 'Operations', labelKey: 'cat_ops' },
      { id: 'Design', labelKey: 'cat_design' }
  ];

  const filteredModels = activeCategory === 'All' ? models : models.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-offWhite animate-fade-in relative">
      
      {/* Hero Section */}
      <div className="bg-[#0B1121] text-white pt-20 pb-32 relative overflow-hidden">
         {/* Neural Network Background Effect */}
         <div className="absolute inset-0 opacity-20" style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, #1e40af 2px, transparent 2.5px)',
             backgroundSize: '30px 30px' 
         }}></div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

         <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                AI Marketplace
             </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">
                {t('aiModelsPage')}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
               {t('aiModelsSubtitle')}
            </p>
         </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-24">
         
         {/* Filter Tabs - Horizontal Scroll for mobile */}
         <div className="flex justify-start lg:justify-center gap-2 mb-12 overflow-x-auto pb-4 lg:pb-0 no-scrollbar snap-x">
            {categoriesList.map(cat => (
                <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm whitespace-nowrap snap-center shrink-0 ${
                        activeCategory === cat.id 
                        ? 'bg-brand-primary text-white shadow-lg scale-105' 
                        : 'bg-white text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    {t(cat.labelKey)}
                </button>
            ))}
         </div>

         {/* Models Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredModels.map(model => (
                <div key={model.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-card hover:shadow-elevated transition-all duration-300 group flex flex-col relative overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-colors"></div>
                    
                    <div className="relative z-10 flex-1">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 bg-brand-surface rounded-2xl border border-slate-100 flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {model.icon}
                            </div>
                            <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-slate-100">
                                {model.category}
                            </span>
                        </div>

                        <h3 className="text-2xl font-heading font-bold text-brand-primary mb-3">{t(model.titleKey)}</h3>
                        <p className="text-slate-500 leading-relaxed mb-6 text-sm min-h-[3.5rem] line-clamp-3">
                            {t(model.descKey)}
                        </p>

                        <div className="space-y-2 mb-8">
                            {model.features.slice(0,3).map((feat, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    {feat}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{t('startingFrom')}</span>
                            <div className="text-xl font-bold text-brand-gold">{model.price} <span className="text-xs text-brand-primary">{t('currency')}</span></div>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => openDemo(model)}
                                className="px-4 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors"
                            >
                                {t('viewDemo')}
                            </button>
                            <button 
                                onClick={() => openCustomize(model)}
                                className="px-5 py-3 bg-brand-primary text-white font-bold rounded-xl text-xs hover:bg-[#052c42] shadow-lg shadow-blue-900/10 transition-colors"
                            >
                                {t('customizeModel')}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
         </div>
      </div>

      {/* Customization Modal */}
      {isCustomizeOpen && selectedModel && (
          <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-scale-in relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-brand-gold"></div>
                  
                  <div className="flex justify-between items-center mb-6">
                      <div>
                          <h3 className="text-xl font-bold text-brand-primary font-heading">{t('customizationOptions')}</h3>
                          <p className="text-sm text-slate-500">{t(selectedModel.titleKey)}</p>
                      </div>
                      <button onClick={() => setIsCustomizeOpen(false)} className="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">✕</button>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar mb-6 p-1">
                      {addOns.map(addon => {
                          const isSelected = selectedAddons.includes(addon.id);
                          return (
                              <div 
                                key={addon.id}
                                onClick={() => toggleAddon(addon.id, addon.price)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center ${isSelected ? 'border-brand-primary bg-blue-50' : 'border-slate-200 hover:border-brand-primary/50'}`}
                              >
                                  <span className={`text-sm font-bold ${isSelected ? 'text-brand-primary' : 'text-slate-600'}`}>{t(addon.labelKey)}</span>
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-brand-primary border-brand-primary' : 'border-slate-300 bg-white'}`}>
                                      {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                  </div>
                              </div>
                          )
                      })}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-slate-100 mb-6">
                      <span className="text-slate-500 font-bold text-sm">{t('totalPrice')}</span>
                      <span className="text-2xl font-bold text-brand-primary">{currentTotal} {t('currency')}</span>
                  </div>

                  <button 
                    onClick={confirmAddToCart}
                    className="w-full py-4 bg-brand-primary text-white font-bold rounded-xl shadow-lg hover:bg-[#052c42] transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                      <span>{t('addToCart')}</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </button>
              </div>
          </div>
      )}

      {/* Demo Modal */}
      {isDemoOpen && selectedModel && (
          <div className="fixed inset-0 z-[100] bg-[#0B1121]/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-3xl h-[600px] rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
                  <div className="bg-brand-primary p-4 flex justify-between items-center text-white shrink-0">
                      <div className="flex items-center gap-3">
                          <span className="text-2xl">{selectedModel.icon}</span>
                          <div>
                              <h3 className="font-bold text-sm">{t(selectedModel.titleKey)}</h3>
                              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-blue-100 uppercase tracking-wider">Live Demo</span>
                          </div>
                      </div>
                      <button onClick={() => setIsDemoOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">✕</button>
                  </div>
                  
                  <div className="flex-1 bg-slate-50 flex flex-col justify-center items-center p-8 text-center">
                      <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-5xl mb-6 animate-pulse">
                          {selectedModel.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('demoTitle')}</h2>
                      <p className="text-slate-500 mb-8 max-w-md">{t('demoDesc')}</p>
                      
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
                          <div className="flex gap-3 mb-4">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">AI</div>
                              <div className="bg-blue-50 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 text-start">
                                  Hello! I am your {t(selectedModel.titleKey)}. How can I assist you today?
                              </div>
                          </div>
                          <div className="flex gap-3 justify-end">
                              <div className="bg-brand-primary text-white p-3 rounded-2xl rounded-tr-none text-sm text-start">
                                  Show me a report.
                              </div>
                              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">U</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Floating Cart */}
      {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-slide-up">
              <div className="bg-brand-primary text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between backdrop-blur-md bg-opacity-95">
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowCart(!showCart)}>
                      <div className="relative">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                             🤖
                          </div>
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-brand-primary">
                              {cart.length}
                          </span>
                      </div>
                      <div>
                          <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">{t('basket')}</div>
                          <div className="font-bold">{calculateGrandTotal()} {t('currency')}</div>
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

      {/* Cart Modal */}
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
                            {cart.map((item, idx) => {
                                const model = models.find(m => m.id === item.id);
                                if (!model) return null;
                                return (
                                    <div key={idx} className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex gap-3">
                                                <span className="text-2xl">{model.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-brand-primary text-sm">{t(model.titleKey)}</h4>
                                                    <span className="text-xs text-slate-400">{item.addOns.length} {t('addons')}</span>
                                                </div>
                                            </div>
                                            <div className="font-bold text-brand-gold text-sm">{item.total} {t('currency')}</div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button onClick={() => setCart(prev => prev.filter((_, i) => i !== idx))} className="text-xs text-red-500 font-bold hover:underline">{t('delete')}</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-slate-500 font-bold">{t('total')}</span>
                                <span className="text-2xl font-bold text-brand-primary">{calculateGrandTotal()} {t('currency')}</span>
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

export default AiModelsPage;