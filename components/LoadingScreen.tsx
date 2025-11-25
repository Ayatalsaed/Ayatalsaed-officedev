
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Initializing System...');

  useEffect(() => {
    const messages = [
      'Establishing Secure Connection...',
      'Loading Digital District Assets...',
      'Syncing Virtual Offices...',
      'Calibrating AI Advisor...',
      'Welcome to Business Developers'
    ];
    
    let msgIndex = 0;
    setMessage(messages[0]);

    const msgInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % messages.length;
        setMessage(messages[msgIndex]);
    }, 1200);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          clearInterval(msgInterval);
          setTimeout(onFinished, 800);
          return 100;
        }
        return Math.min(prev + Math.random() * 3, 100);
      });
    }, 80);

    return () => {
        clearInterval(interval);
        clearInterval(msgInterval);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0B1121] text-white flex flex-col items-center justify-center overflow-hidden font-sans">
       
       {/* Background Grid Animation */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-30 animate-[grid-scroll_20s_linear_infinite]"
               style={{
                   backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)',
                   backgroundSize: '60px 60px',
                   transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(-100px)'
               }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B1121_80%)]"></div>
       </div>

       {/* Centerpiece: Digital City Constructing */}
       <div className="relative w-64 h-64 mb-16 preserve-3d flex items-center justify-center">
           <div className="relative w-32 h-32 animate-[spin-slow_12s_linear_infinite] preserve-3d">
               {/* Central Core */}
               <div className="absolute inset-0 bg-blue-600/20 border border-blue-400/50 rounded-lg shadow-[0_0_30px_rgba(59,130,246,0.3)] backdrop-blur-sm transform translate-z-0"></div>
               
               {/* Floating Blocks */}
               {[
                  { top: '0', left: '0', color: 'bg-blue-500' },
                  { top: '0', right: '0', color: 'bg-indigo-500' },
                  { bottom: '0', left: '0', color: 'bg-purple-500' },
                  { bottom: '0', right: '0', color: 'bg-cyan-500' }
               ].map((pos, i) => (
                   <div 
                     key={i}
                     className={`absolute w-10 h-10 ${pos.color} opacity-80 border border-white/30 shadow-lg transition-all`}
                     style={{
                         ...pos,
                         animation: `float-building 2s ease-in-out infinite`,
                         animationDelay: `${i * 0.5}s`
                     }}
                   />
               ))}
               
               {/* Scanning Ring */}
               <div className="absolute inset-[-30px] border-2 border-dashed border-blue-400/30 rounded-full animate-[spin-reverse_8s_linear_infinite]"></div>
           </div>
       </div>

       {/* Loading Status */}
       <div className="relative z-10 w-80 md:w-96 space-y-4">
           <div className="flex justify-between items-end px-1">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-widest animate-pulse">System Boot</span>
                <span className="text-2xl font-mono font-bold text-white">{Math.round(progress)}<span className="text-sm text-blue-400">%</span></span>
           </div>
           
           <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative">
               <div 
                   className="h-full bg-gradient-to-r from-blue-600 via-indigo-400 to-purple-500 relative"
                   style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
               >
                   <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_15px_white] animate-pulse"></div>
               </div>
           </div>
           
           <div className="text-center h-8">
               <p className="text-sm font-medium text-slate-300">
                   <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
                   {message}
               </p>
           </div>
       </div>

       <style>{`
         @keyframes grid-scroll {
           0% { background-position: 0 0; }
           100% { background-position: 0 60px; }
         }
         @keyframes spin-slow {
           0% { transform: rotateX(60deg) rotateZ(0deg); }
           100% { transform: rotateX(60deg) rotateZ(360deg); }
         }
         @keyframes spin-reverse {
           0% { transform: rotateX(60deg) rotateZ(360deg); }
           100% { transform: rotateX(60deg) rotateZ(0deg); }
         }
         @keyframes float-building {
           0%, 100% { transform: translateZ(0); }
           50% { transform: translateZ(40px); }
         }
         .preserve-3d { transform-style: preserve-3d; }
       `}</style>
    </div>
  );
};

export default LoadingScreen;
