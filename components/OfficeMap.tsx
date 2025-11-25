
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Business } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { searchBusinessesWithAI } from '../services/geminiService';

declare const ResizeObserver: any;

// --- Constants for Spatial Layout ---
const CONTAINER_SIZE = 1000;
const GRID_COLS = 3;
const PADDING = 96;
const GAP = 96;
const CELL_SIZE = (CONTAINER_SIZE - (PADDING * 2) - (GAP * (GRID_COLS - 1))) / GRID_COLS;

type MapMode = 'standard' | 'heatmap' | 'networking' | 'traffic';

interface OfficeMapProps {
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onRentClick: (business: Business) => void;
  onAddBusiness: (business: Business) => void;
  onUpdateBusiness: (business: Business) => void;
}

interface BuildingBlockProps {
  business: Business;
  isHovered: boolean;
  isSelected: boolean;
  isFeatured: boolean;
  lod: 'high' | 'medium' | 'low';
  onSelect: (business: Business) => void;
  onHover: (id: string | null) => void;
  t: (key: string) => string;
  mapMode: MapMode;
}

const BuildingBlock = React.memo(({ business, isHovered, isSelected, isFeatured, lod, onSelect, onHover, t, mapMode }: BuildingBlockProps) => {
  // Dimensions & Physics
  const baseDepth = 30;
  const hoverLift = isHovered ? 20 : 0; 
  
  let statusColor = 'bg-slate-100'; 
  let dotColor = 'bg-slate-400'; 
  let statusText = t('available');
  let statusShadow = 'shadow-sm';

  // Heatmap Logic
  let heatmapIntensity = 0;
  if (mapMode === 'heatmap' && business.isOccupied) {
     const visitors = business.activeVisitors || 0;
     heatmapIntensity = Math.min(visitors / 50, 1); 
  }

  if (business.isOccupied) {
      if (mapMode === 'heatmap') {
         // Stepped colors for badges to ensure readability
         if (heatmapIntensity > 0.8) statusColor = 'bg-red-600 shadow-red-500/50';
         else if (heatmapIntensity > 0.6) statusColor = 'bg-orange-500 shadow-orange-500/50';
         else if (heatmapIntensity > 0.4) statusColor = 'bg-yellow-500 shadow-yellow-500/50';
         else if (heatmapIntensity > 0.2) statusColor = 'bg-green-500 shadow-green-500/50';
         else statusColor = 'bg-blue-500 shadow-blue-500/50';
         
         dotColor = 'bg-white';
         statusText = `${business.activeVisitors} ${t('active')}`;
      } else {
          statusColor = 'bg-brand-primary'; 
          dotColor = 'bg-green-400';
          statusText = t('occupied');
          statusShadow = 'shadow-blue-900/20';
          
          if (isFeatured) {
              dotColor = 'bg-brand-gold';
          }
      }
  }

  const borderColor = isSelected 
    ? 'border-brand-gold ring-1 ring-brand-gold' 
    : isHovered
      ? 'border-brand-primary shadow-xl'
      : 'border-slate-200';

  const showSides = lod !== 'low';
  const showBanner = (lod === 'high' || isSelected || isHovered) && business.isOccupied; 
  
  const faceClass = "absolute inset-0 backface-hidden transition-colors duration-300";

  // --- Texture & Facade Logic ---
  const { frontFacade, sideFacade, backFacade, scaffoldStyle } = useMemo(() => {
    if (lod === 'low') return { frontFacade: {}, sideFacade: {}, backFacade: {}, scaffoldStyle: {} };
    const isOcc = business.isOccupied;
    
    let wallBase = isOcc 
      ? (isFeatured ? '#073D5A' : '#1F2937') 
      : '#F9FAFB';

    if (mapMode === 'heatmap' && isOcc) {
         const visitors = business.activeVisitors || 0;
         const intensity = Math.min(visitors / 50, 1);
         // Continuous HSL Gradient: Blue (240) -> Cyan -> Green -> Yellow -> Red (0)
         const hue = Math.max(0, 240 - (intensity * 240));
         wallBase = `hsl(${hue}, 70%, 50%)`;
    }

    const winLight = isFeatured ? 'rgba(255,255,255,0.8)' : 'rgba(200,200,200,0.3)';
    const winDim = 'rgba(255,255,255,0.05)';
    const activeWin = isOcc ? winLight : winDim;
    const frameColor = 'rgba(0,0,0,0.1)';

    const front = {
      backgroundColor: wallBase,
      backgroundImage: `
        linear-gradient(to right, ${frameColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${frameColor} 1px, transparent 1px),
        linear-gradient(to bottom, transparent 4px, ${activeWin} 4px, ${activeWin} 16px, transparent 16px)
      `,
      backgroundSize: '25% 100%, 100% 20px, 100% 20px',
    };
    
    const side = {
      backgroundColor: wallBase,
      backgroundImage: `repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 10px)`,
      backgroundSize: '100% 100%',
      filter: 'brightness(0.95)'
    };
    const back = { backgroundColor: wallBase, filter: 'brightness(0.9)' };
    const scaffold = {
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
      backgroundSize: '40px 40px',
      backgroundColor: '#F9FAFB',
    };

    return { frontFacade: front, sideFacade: side, backFacade: back, scaffoldStyle: scaffold };
  }, [business.isOccupied, isFeatured, lod, mapMode, business.activeVisitors]);

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(business); }}
      onMouseEnter={() => onHover(business.id)}
      onMouseLeave={() => onHover(null)}
      className="relative w-full h-full group pointer-events-auto cursor-pointer preserve-3d"
    >
        {/* Shadow */}
        <div 
          className={`absolute inset-4 bg-black/10 blur-xl rounded-full transition-all duration-500`}
          style={{
            transform: `translateZ(0) scale(${isHovered ? 0.9 : 1})`, 
            opacity: isHovered ? 0.3 : 0.1
          }}
        />

        {/* 3D Block */}
        <div 
          className="w-full h-full preserve-3d transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateZ(${baseDepth + hoverLift}px)` }}
        >
            {business.isOccupied ? (
                <>
                  {/* Roof */}
                  <div className={`
                      absolute inset-0 bg-white rounded-sm overflow-hidden
                      border ${borderColor}
                      flex flex-col items-center justify-center p-4 text-center shadow-inner
                      backface-hidden z-10 transition-colors duration-300
                  `}>
                      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${dotColor} z-20`} />
                      
                      {lod !== 'low' && (
                        <>
                          <div className="w-16 h-16 rounded-lg bg-brand-surface mb-3 p-1 border border-slate-100 relative">
                              {/* Placeholder for logo if image fails */}
                              <div className="w-full h-full bg-white rounded flex items-center justify-center text-xs font-bold text-slate-300">LOGO</div>
                              <img src={business.logoUrl} alt="" className="absolute inset-0 w-full h-full object-cover rounded" loading="lazy" />
                          </div>
                          {(lod === 'high' || isHovered) && (
                             <h3 className="font-heading font-bold text-brand-primary text-xs truncate w-full px-1 tracking-wide">{business.name}</h3>
                          )}
                        </>
                      )}
                  </div>

                  {/* Facades */}
                  {showSides && (
                    <>
                      <div className={`${faceClass} origin-bottom rotate-x-90 h-[30px] bottom-0 border-b border-white/10`} style={frontFacade}>
                         {/* Minimal Door */}
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-5 bg-[#111827]"></div>
                      </div>
                      <div className={`${faceClass} origin-top rotate-x-[-90deg] h-[30px] top-0`} style={backFacade} />
                      <div className={`${faceClass} origin-right rotate-y-90 w-[30px] right-0 top-0 bottom-0`} style={sideFacade} />
                      <div className={`${faceClass} origin-left rotate-y-[-90deg] w-[30px] left-0 top-0 bottom-0`} style={sideFacade} />
                    </>
                  )}
                </>
            ) : (
                /* Vacant Lot */
                <div className="w-full h-full relative preserve-3d opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 border border-dashed border-slate-300 bg-white/40 rounded-sm flex flex-col items-center justify-center backdrop-blur-sm ${borderColor}`}>
                      {isHovered && <span className="text-[10px] font-bold mt-1 text-brand-primary uppercase tracking-widest">{t('available')}</span>}
                  </div>
                </div>
            )}

            {/* Minimal Status Banner */}
            {showBanner && (
              <div 
                className="absolute top-1/2 left-1/2 w-0 h-0 preserve-3d pointer-events-none z-50"
                style={{ transform: 'translateZ(50px)' }} 
              >
                 <div 
                    className="absolute top-0 left-0 flex flex-col items-center gap-1 transition-all duration-300 origin-bottom"
                    style={{
                        transform: `translate(-50%, -100%) rotateX(var(--map-inv-rotate-x)) rotateZ(var(--map-inv-rotate-z))`
                    }}
                 >
                    <div className={`px-3 py-1.5 rounded-md shadow-lg border border-white/10 flex items-center gap-2 ${statusColor} text-white`}>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{statusText}</span>
                    </div>
                    <div className={`w-px h-4 opacity-50 ${statusColor}`}></div>
                 </div>
              </div>
            )}
        </div>
    </div>
  );
});

const DataStreams: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none preserve-3d">
        {/* Horizontal Data Lines */}
        {Array.from({ length: 5 }).map((_, i) => (
             <div 
               key={`h-${i}`}
               className="absolute h-[1px] bg-blue-400/10 preserve-3d overflow-hidden"
               style={{ left: 0, right: 0, top: 100 + (i * 200) + 'px', transform: 'translateZ(2px)' }}
             >
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[dataStreamX_4s_linear_infinite]" style={{ animationDelay: `${i * 0.5}s` }}></div>
             </div>
        ))}
         {/* Vertical Data Lines */}
         {Array.from({ length: 5 }).map((_, i) => (
             <div 
               key={`v-${i}`}
               className="absolute w-[1px] bg-blue-400/10 preserve-3d overflow-hidden"
               style={{ top: 0, bottom: 0, left: 100 + (i * 200) + 'px', transform: 'translateZ(2px)' }}
             >
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-[dataStreamY_5s_linear_infinite]" style={{ animationDelay: `${i * 0.8}s` }}></div>
             </div>
        ))}
        <style>{`
           @keyframes dataStreamX { 0% { transform: translateX(-100px); opacity:0; } 50% { opacity:1; } 100% { transform: translateX(1000px); opacity:0; } }
           @keyframes dataStreamY { 0% { transform: translateY(-100px); opacity:0; } 50% { opacity:1; } 100% { transform: translateY(1000px); opacity:0; } }
        `}</style>
    </div>
  );
};

const OfficeMap: React.FC<OfficeMapProps> = ({ businesses, favorites, onToggleFavorite, onRentClick, onAddBusiness, onUpdateBusiness }) => {
  const { t, language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [mapMode, setMapMode] = useState<MapMode>('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingAI, setIsSearchingAI] = useState(false);
  const [aiFilteredIds, setAiFilteredIds] = useState<string[] | null>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Resize Observer
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const updateSize = () => {
      if (mapContainerRef.current) {
        setContainerSize({ width: mapContainerRef.current.clientWidth, height: mapContainerRef.current.clientHeight });
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // AI Search
  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearchingAI(true);
    try {
      const result = await searchBusinessesWithAI(searchQuery, businesses, language);
      setAiFilteredIds(result.ids);
    } catch (e) { console.error(e); } finally { setIsSearchingAI(false); }
  };

  // View State
  const [viewState, setViewState] = useState({ zoom: 1, rotateX: 60, rotateZ: 45, panX: 0, panY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef<{x: number, y: number} | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null); 
  
  // Filter Logic
  const processedBusinesses = useMemo(() => {
    let result = [...businesses];
    if (aiFilteredIds !== null) result = result.filter(b => aiFilteredIds.includes(b.id));
    else if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
    }
    return result;
  }, [businesses, aiFilteredIds, searchQuery]);

  const handleMouseDown = (e: React.MouseEvent) => { 
      if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input')) return;
      setIsDragging(true); lastMousePos.current = { x: e.clientX, y: e.clientY }; 
  };
  const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || !lastMousePos.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      setViewState(prev => ({ ...prev, panX: prev.panX + dx, panY: prev.panY + dy }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp = () => setIsDragging(false);

  const selectedBusiness = useMemo(() => businesses.find(b => b.id === selectedBusinessId) || null, [businesses, selectedBusinessId]);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 w-full font-sans relative">
       
       <div 
          className="relative flex-1 h-[600px] lg:h-full bg-brand-surface overflow-hidden rounded-2xl border border-slate-200 shadow-card group outline-none"
          ref={mapContainerRef}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
       >
           {/* Map Background */}
           <div className="absolute inset-0 bg-white">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
           </div>

           {/* Controls Overlay */}
           <div className="absolute top-6 left-6 z-20 flex flex-col gap-4 pointer-events-none">
               <div className="pointer-events-auto bg-white/90 backdrop-blur shadow-sm border border-slate-100 rounded-lg p-4 w-80">
                   <h2 className="text-lg font-bold text-brand-primary mb-4 font-heading">{t('businessMap')}</h2>
                   <div className="relative">
                       <input 
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder={t('aiSearchPlaceholder')}
                         className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-md text-sm outline-none focus:border-brand-primary"
                       />
                       <button 
                          onClick={handleAISearch}
                          className="absolute right-2 top-2 text-slate-400 hover:text-brand-primary"
                       >
                          {isSearchingAI ? (
                             <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                          )}
                       </button>
                   </div>

                   {/* Map Modes */}
                   <div className="mt-4 pt-4 border-t border-slate-200">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">{t('mapLayers')}</label>
                      <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => setMapMode('standard')}
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                                mapMode === 'standard' 
                                ? 'bg-brand-primary text-white border-brand-primary shadow-sm' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                             {t('standardMode')}
                          </button>
                          <button 
                            onClick={() => setMapMode('heatmap')}
                            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                                mapMode === 'heatmap' 
                                ? 'bg-brand-primary text-white border-brand-primary shadow-sm' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                             {t('heatmapMode')}
                          </button>
                      </div>
                   </div>
               </div>
           </div>

           {/* Scene */}
           <div 
                ref={sceneRef}
                className="absolute inset-0 preserve-3d origin-center transition-transform duration-100 ease-linear"
                style={{
                    transform: `translate3d(${viewState.panX}px, ${viewState.panY}px, 0) scale(${viewState.zoom}) rotateX(${viewState.rotateX}deg) rotateZ(${viewState.rotateZ}deg)`,
                    '--map-inv-rotate-x': `-${viewState.rotateX}deg`,
                    '--map-inv-rotate-z': `-${viewState.rotateZ}deg`
                } as any}
           >
               <div className="absolute top-1/2 left-1/2 preserve-3d" style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, transform: 'translate(-50%, -50%)' }}>
                    {/* Floor */}
                    <div className="absolute inset-0 bg-white rounded-lg shadow-2xl border border-slate-100 opacity-80"></div>
                    
                    <DataStreams />

                    {processedBusinesses.map((business) => {
                        const colIndex = business.gridPosition.x - 1;
                        const rowIndex = business.gridPosition.y - 1;
                        const xPos = PADDING + (colIndex * CELL_SIZE) + (colIndex * GAP);
                        const yPos = PADDING + (rowIndex * CELL_SIZE) + (rowIndex * GAP);
                        
                        return (
                            <div
                               key={business.id}
                               className="absolute preserve-3d"
                               style={{ width: CELL_SIZE, height: CELL_SIZE, left: xPos, top: yPos }}
                            >
                                <BuildingBlock 
                                   business={business}
                                   isHovered={hoveredId === business.id}
                                   isSelected={selectedBusinessId === business.id}
                                   isFeatured={false}
                                   lod={viewState.zoom < 0.6 ? 'low' : 'high'}
                                   onSelect={(b) => { setSelectedBusinessId(b.id); setIsSidebarOpen(true); }}
                                   onHover={setHoveredId}
                                   t={t}
                                   mapMode={mapMode}
                                />
                            </div>
                        );
                    })}
               </div>
           </div>
       </div>

       {/* Sidebar */}
       {isSidebarOpen && selectedBusiness && (
           <div className="w-96 bg-white shadow-2xl border-l border-slate-100 flex flex-col z-30 animate-slide-up">
               <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                   <h2 className="text-xl font-bold text-brand-primary">{selectedBusiness.name}</h2>
                   <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-red-500">✕</button>
               </div>
               <div className="p-6 flex-1 overflow-y-auto">
                   <div className="w-24 h-24 bg-brand-surface rounded-lg mb-6 border border-slate-100 flex items-center justify-center">
                      <img src={selectedBusiness.logoUrl} className="max-w-full max-h-full rounded-lg" alt="logo" />
                   </div>
                   <p className="text-sm text-slate-600 mb-6 leading-relaxed font-light">{selectedBusiness.description}</p>
                   <div className="space-y-3">
                       {selectedBusiness.isOccupied ? (
                          <button className="w-full py-3 bg-brand-primary text-white rounded-lg font-semibold text-sm">{t('contact')}</button>
                       ) : (
                          <button onClick={() => onRentClick(selectedBusiness)} className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-sm">{t('rentFree')}</button>
                       )}
                   </div>
               </div>
               <div className="p-6 border-t border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">{t('liveActivity')}</h3>
                  <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-bold text-brand-primary">{selectedBusiness.activeVisitors || 0} {t('activeVisitorNow')}</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${Math.min((selectedBusiness.activeVisitors || 0) * 2, 100)}%` }}></div>
                  </div>
               </div>
           </div>
       )}
    </div>
  );
};

export default OfficeMap;
