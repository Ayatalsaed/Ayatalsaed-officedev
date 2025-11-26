
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Business } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface OfficeMapProps {
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onRentClick: (business: Business) => void;
  onAddBusiness: (business: Business) => void;
  onUpdateBusiness: (business: Business) => void;
}

const getSphericalPos = (index: number, total: number) => {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;
  return {
    x: Math.cos(theta) * Math.sin(phi),
    y: Math.sin(theta) * Math.sin(phi),
    z: Math.cos(phi)
  };
};

const OfficeMap: React.FC<OfficeMapProps> = ({ businesses, favorites, onRentClick }) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // UI State
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [hoveredBusinessId, setHoveredBusinessId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Globe State
  const [rotation, setRotation] = useState({ x: 0.2, y: 0 }); // Initial slight tilt
  const [zoom, setZoom] = useState(1.2);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);
  
  // Auto-rotation state
  const autoRotate = useRef(true);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Map businesses to 3D points
  const globePoints = useMemo(() => {
    return businesses.map((b, i) => {
       const pos = getSphericalPos(i, businesses.length + 5); 
       return {
         ...b,
         pos: {
           x: pos.x * 200, 
           y: pos.y * 200,
           z: pos.z * 200
         },
         color: b.isOccupied ? '#00A3FF' : '#4ADE80' 
       };
    });
  }, [businesses]);

  const handleInteractionStart = (x: number, y: number) => {
    isDragging.current = true;
    lastMousePos.current = { x, y };
    autoRotate.current = false;
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
  };

  const handleInteractionMove = (x: number, y: number) => {
    if (isDragging.current) {
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      setRotation(prev => ({ x: prev.x + dy * 0.005, y: prev.y + dx * 0.005 }));
      lastMousePos.current = { x, y };
    }
    return isDragging.current;
  };

  const handleInteractionEnd = () => {
    isDragging.current = false;
    // Resume auto-rotation after delay
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
        autoRotate.current = true;
    }, 3000);
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => handleInteractionStart(e.clientX, e.clientY);
  const handleMouseMove = (e: React.MouseEvent) => {
    const isDrag = handleInteractionMove(e.clientX, e.clientY);
    
    // Hover logic only if not dragging
    if (!isDrag && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        
        let foundId: string | null = null;
        globePoints.forEach(point => {
            const rotated = rotatePoint(point.pos, rotation.x, rotation.y);
            if (rotated.z > 0) {
                const scale = (400 * zoom) / (400 - rotated.z);
                const x2d = rotated.x * scale;
                const y2d = rotated.y * scale;
                const dist = Math.sqrt(Math.pow(mouseX - x2d, 2) + Math.pow(mouseY - y2d, 2));
                if (dist < 15 * zoom) foundId = point.id;
            }
        });
        setHoveredBusinessId(foundId);
        canvasRef.current.style.cursor = foundId ? 'pointer' : 'grab';
    } else if (isDrag && canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing';
    }
  };
  const handleMouseUp = handleInteractionEnd;
  const handleMouseLeave = handleInteractionEnd;

  // Touch Events for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
          handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY);
      }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
          handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY);
      }
  };

  // Scroll Zoom
  const handleWheel = (e: React.WheelEvent) => {
      const delta = -Math.sign(e.deltaY) * 0.15;
      setZoom(z => Math.min(Math.max(z + delta, 0.5), 3));
  };

  const handleClick = () => {
     if (hoveredBusinessId) {
        const biz = businesses.find(b => b.id === hoveredBusinessId);
        if (biz) {
           setSelectedBusiness(biz);
           setIsSidebarOpen(true);
        }
     }
  };

  const rotatePoint = (p: {x:number, y:number, z:number}, rx: number, ry: number) => {
     let x = p.x * Math.cos(ry) - p.z * Math.sin(ry);
     let z = p.x * Math.sin(ry) + p.z * Math.cos(ry);
     let y = p.y;
     
     let y_new = y * Math.cos(rx) - z * Math.sin(rx);
     let z_new = y * Math.sin(rx) + z * Math.cos(rx);
     
     return { x, y: y_new, z: z_new };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
       if (!canvas) return;
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       
       const centerX = canvas.width / 2;
       const centerY = canvas.height / 2;

       // Globe Atmosphere/Glow
       const gradient = ctx.createRadialGradient(centerX, centerY, 100 * zoom, centerX, centerY, 220 * zoom);
       gradient.addColorStop(0, 'rgba(7, 61, 90, 0.2)');
       gradient.addColorStop(1, 'rgba(7, 61, 90, 0)');
       ctx.fillStyle = gradient;
       ctx.beginPath();
       ctx.arc(centerX, centerY, 220 * zoom, 0, Math.PI * 2);
       ctx.fill();

       // Wireframe Sphere
       ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
       ctx.lineWidth = 1;
       ctx.beginPath();
       ctx.arc(centerX, centerY, 200 * zoom, 0, Math.PI * 2);
       ctx.stroke();

       // Longitude/Latitude lines (Simple visual effect)
       ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
       for (let i = 0; i < 6; i++) {
           ctx.beginPath();
           ctx.ellipse(centerX, centerY, 200 * zoom, (60 * i * zoom) % (200 * zoom), rotation.y + (i * Math.PI/6), 0, Math.PI * 2);
           ctx.stroke();
       }

       // Project Points
       const projectedPoints = globePoints.map(p => {
           const rotated = rotatePoint(p.pos, rotation.x, rotation.y);
           const scale = (400 * zoom) / (400 - rotated.z);
           const x2d = rotated.x * scale + centerX;
           const y2d = rotated.y * scale + centerY;
           return { ...p, rotated, x2d, y2d, scale };
       }).sort((a, b) => a.rotated.z - b.rotated.z);

       // Draw Connections
       ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
       ctx.lineWidth = 0.5;
       ctx.beginPath();
       projectedPoints.forEach((p, i) => {
           if (p.rotated.z > -50) { 
               // Connect neighbors roughly
               for(let j = 1; j <= 3; j++) {
                   const next = projectedPoints[(i + j) % projectedPoints.length];
                   const dist = Math.sqrt(Math.pow(p.x2d - next.x2d, 2) + Math.pow(p.y2d - next.y2d, 2));
                   if (dist < 80 * zoom && next.rotated.z > -50) {
                      ctx.moveTo(p.x2d, p.y2d);
                      ctx.lineTo(next.x2d, next.y2d);
                   }
               }
           }
       });
       ctx.stroke();

       // Draw Nodes
       projectedPoints.forEach(p => {
           const size = Math.max(1, 4 * p.scale);
           const alpha = Math.max(0.1, (p.rotated.z + 200) / 400); 
           
           ctx.globalAlpha = alpha;
           
           if (p.id === hoveredBusinessId) {
               // Hover Glow
               ctx.shadowBlur = 20;
               ctx.shadowColor = p.color;
               ctx.fillStyle = '#FFFFFF';
               ctx.beginPath();
               ctx.arc(p.x2d, p.y2d, size * 2, 0, Math.PI * 2);
               ctx.fill();
               ctx.shadowBlur = 0;
               
               // Connecting line to label
               ctx.strokeStyle = 'rgba(255,255,255,0.5)';
               ctx.beginPath();
               ctx.moveTo(p.x2d, p.y2d);
               ctx.lineTo(p.x2d + 20, p.y2d - 20);
               ctx.lineTo(p.x2d + 100, p.y2d - 20);
               ctx.stroke();

               // Label Box
               ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
               ctx.fillRect(p.x2d + 20, p.y2d - 45, 120, 50);
               ctx.fillStyle = '#fff';
               ctx.font = 'bold 12px Cairo';
               ctx.fillText(p.name, p.x2d + 30, p.y2d - 25);
               ctx.font = '10px Cairo';
               ctx.fillStyle = '#cbd5e1';
               ctx.fillText(p.category, p.x2d + 30, p.y2d - 10);
               
           } else {
               ctx.fillStyle = p.color;
               ctx.beginPath();
               ctx.arc(p.x2d, p.y2d, size, 0, Math.PI * 2);
               ctx.fill();
           }
       });

       ctx.globalAlpha = 1;

       // Auto Rotate
       if (autoRotate.current) {
           setRotation(prev => ({ ...prev, y: prev.y + 0.001 }));
       }

       animationFrameId.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [globePoints, rotation, zoom, hoveredBusinessId]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
        if (canvasRef.current && canvasRef.current.parentElement) {
            canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
            canvasRef.current.height = canvasRef.current.parentElement.clientHeight;
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 w-full font-sans relative">
       
       <div className="relative flex-1 h-[600px] lg:h-full bg-[#0B1121] overflow-hidden rounded-2xl border border-slate-700 shadow-card group outline-none">
           {/* Stars Background */}
           <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           
           <canvas 
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleInteractionEnd}
              onWheel={handleWheel}
              onClick={handleClick}
              className="absolute inset-0 z-10 block cursor-grab active:cursor-grabbing touch-none"
           />

           {/* Controls Overlay */}
           <div className="absolute top-6 left-6 z-20 flex flex-col gap-4 pointer-events-none">
               <div className="pointer-events-auto bg-slate-900/80 backdrop-blur-md shadow-lg border border-slate-700 rounded-2xl p-4 w-72 text-white">
                   <h2 className="text-sm font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                       {t('globeControls')}
                   </h2>
                   <div className="relative">
                       <input 
                         type="text" 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         placeholder={t('aiSearchPlaceholder')}
                         className="w-full bg-slate-800 border border-slate-600 px-3 py-2 rounded-lg text-xs outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors"
                       />
                       <svg className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <div className="mt-3 flex gap-2">
                       <div className="text-[10px] text-slate-400 flex items-center gap-1">
                           <span className="w-2 h-2 rounded-full bg-[#00A3FF]"></span> {t('occupied')}
                       </div>
                       <div className="text-[10px] text-slate-400 flex items-center gap-1">
                           <span className="w-2 h-2 rounded-full bg-[#4ADE80]"></span> {t('available')}
                       </div>
                   </div>
               </div>
           </div>

           {/* Zoom Controls */}
           <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
               <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="w-10 h-10 bg-slate-800/80 backdrop-blur hover:bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center text-white transition-colors" title={t('zoomIn')}>
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
               </button>
               <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="w-10 h-10 bg-slate-800/80 backdrop-blur hover:bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center text-white transition-colors" title={t('zoomOut')}>
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
               </button>
               <button onClick={() => setRotation(r => ({...r, x: 0.2, y: r.y + 1}))} className="w-10 h-10 bg-slate-800/80 backdrop-blur hover:bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center text-white transition-colors mt-2" title={t('rotate')}>
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
               </button>
           </div>
       </div>

       {/* Sidebar Details */}
       {isSidebarOpen && selectedBusiness && (
           <div className="absolute inset-0 lg:relative lg:inset-auto w-full lg:w-96 bg-white shadow-2xl lg:rounded-2xl flex flex-col z-30 animate-slide-up overflow-hidden border-l border-slate-100">
               <div className="relative h-32 bg-brand-primary">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   <button onClick={() => setIsSidebarOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 rounded-full p-1">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
               </div>
               
               <div className="px-6 -mt-10 relative z-10">
                   <div className="w-20 h-20 bg-white p-1 rounded-2xl shadow-lg mb-3">
                       <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
                           {selectedBusiness.logoUrl ? (
                               <img src={selectedBusiness.logoUrl} className="w-full h-full object-cover" alt="logo" />
                           ) : (
                               <span className="text-xs font-bold text-slate-400">LOGO</span>
                           )}
                       </div>
                   </div>
                   <h2 className="text-2xl font-bold text-brand-primary mb-1">{selectedBusiness.name}</h2>
                   <div className="flex gap-2 mb-4">
                       <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">{selectedBusiness.category}</span>
                       <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${selectedBusiness.isOccupied ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                           {selectedBusiness.isOccupied ? t('occupied') : t('available')}
                       </span>
                   </div>
               </div>

               <div className="p-6 pt-0 flex-1 overflow-y-auto">
                   <div className="prose prose-sm text-slate-500 mb-6 leading-relaxed">
                       {selectedBusiness.description}
                   </div>
                   
                   <div className="space-y-3">
                       <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t('servicesOffered')}</h4>
                       <div className="flex flex-wrap gap-2">
                           {selectedBusiness.services?.map((s, i) => (
                               <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-600">
                                   {s}
                               </span>
                           ))}
                       </div>
                   </div>
               </div>

               <div className="p-6 border-t border-slate-100 bg-slate-50">
                   {selectedBusiness.isOccupied ? (
                       <button className="w-full py-3.5 bg-brand-primary text-white rounded-xl font-bold text-sm shadow-lg hover:bg-[#052c42] transition-colors">
                           {t('contact')}
                       </button>
                   ) : (
                       <button onClick={() => onRentClick(selectedBusiness)} className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-green-700 transition-colors">
                           {t('rentFree')}
                       </button>
                   )}
               </div>
           </div>
       )}
    </div>
  );
};

export default OfficeMap;
    