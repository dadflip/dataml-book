import React from 'react';

export default function BayesTheorem() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-left">
         <h2 className="font-bold text-xl md:text-2xl text-white">1. Théorème de Bayes (Le Cœur)</h2>
         <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-2xl">
            Mettre à jour nos croyances (<span className="font-mono text-white font-bold">Prior</span>) mathématiquement lorsque l'on observe de nouvelles données (<span className="font-mono text-white font-bold">Likelihood</span>), pour obtenir notre nouvelle croyance mise à jour (<span className="font-mono font-bold text-blue-400">Posterior</span>).
         </p>
      </div>
      
      {/* Visual representation of Bayes' Theorem */}
      <div className="flex justify-center w-full mt-4 shrink-0 relative p-6 bg-black/20 rounded-2xl border border-white/10">
         <svg viewBox="0 0 240 160" className="w-full max-w-2xl overflow-visible font-sans">
           <defs>
             <linearGradient id="priorGrad" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
               <stop offset="100%" stopColor="rgba(255,255,255,0)" />
             </linearGradient>
             <linearGradient id="likeGrad" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="rgba(250,204,21,0.2)" />
               <stop offset="100%" stopColor="rgba(250,204,21,0)" />
             </linearGradient>
             <linearGradient id="postGrad" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="rgba(96,165,250,0.3)" />
               <stop offset="100%" stopColor="rgba(96,165,250,0)" />
             </linearGradient>
             <marker id="arrowUpdate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
               <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-white/30 stroke-none" />
             </marker>
           </defs>
           
           {/* Axis */}
           <path d="M 20 100 L 220 100" className="stroke-white/20" strokeWidth="1" strokeLinecap="round" />
           <text x="215" y="110" className="fill-white/40 text-[6px] font-mono font-medium" textAnchor="end">Paramètre θ</text>
           <text x="20" y="15" className="fill-white/40 text-[6px] font-mono font-medium" textAnchor="start">Probabilité (Croyance)</text>

           {/* Prior Curve */}
           <path d="M 20 100 C 40 100, 60 50, 80 50 C 100 50, 120 100, 150 100" fill="url(#priorGrad)" className="stroke-white/50" strokeDasharray="2 2" strokeWidth="1.5" />
           <text x="65" y="42" className="fill-white/70 text-[8px] font-mono font-medium" textAnchor="middle">Prior P(θ)</text>

           {/* Likelihood Curve */}
           <path d="M 90 100 C 120 100, 130 35, 150 35 C 170 35, 180 100, 220 100" fill="url(#likeGrad)" className="stroke-yellow-400/60" strokeWidth="1.5" />
           <text x="165" y="28" className="fill-yellow-400/80 text-[8px] font-mono font-medium" textAnchor="middle">Likelihood P(D|θ)</text>

           {/* Posterior Curve (taller, narrower, shifted) */}
           <path d="M 70 100 C 100 100, 115 15, 125 15 C 135 15, 150 100, 180 100" fill="url(#postGrad)" className="stroke-blue-400" strokeWidth="2" />
           <text x="125" y="5" className="fill-blue-400 font-bold text-[10px] font-mono" textAnchor="middle">Posterior P(θ|D)</text>
           
           {/* Shift Arrow */}
           <path d="M 85 55 Q 105 45, 120 25" className="stroke-white/30" strokeWidth="1" fill="none" markerEnd="url(#arrowUpdate)" />
           
           {/* Formula Area at bottom */}
           <g transform="translate(120, 140)">
              <rect x="-85" y="-18" width="170" height="36" rx="6" className="fill-black/40 stroke-white/10" />
              
              <text x="-40" y="4" className="fill-blue-400 font-mono font-bold text-[14px]" textAnchor="middle">P(θ|D)</text>
              <text x="-12" y="3" className="fill-white/40 font-mono text-[14px]" textAnchor="middle">=</text>
              
              <text x="25" y="-5" className="fill-yellow-400/90 font-mono font-semibold text-[11px]" textAnchor="middle">P(D|θ)</text>
              <text x="50" y="-5" className="fill-white/50 font-mono font-semibold text-[11px]" textAnchor="middle">×</text>
              <text x="68" y="-5" className="fill-white/90 font-mono font-semibold text-[11px]" textAnchor="middle">P(θ)</text>
              
              <path d="M 6 0 L 85 0" className="stroke-white/30" strokeWidth="1" />
              
              <text x="45" y="10" className="fill-white/50 font-mono font-medium text-[11px]" textAnchor="middle">P(D)</text>
           </g>
         </svg>
       </div>
    </div>
  );
}
