import React from 'react';


export default function BayesianRegression() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         {/* Sketchy Bayesian Regression lines */}
         <div className="flex justify-center w-full shrink-0">
         <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Axes */}
            <path d="M 8,92 Q 50,90 92,92" className="opacity-40" />
            <path d="M 10,92 Q 12,50 8,10" className="opacity-40" />
            
            {/* Main line */}
            <path d="M 15,85 Q 50,50 85,15" className="stroke-blue-400" strokeWidth="2.5" />
            
            {/* Samples from posterior */}
            <path d="M 18,70 Q 50,50 80,30" className="stroke-white opacity-30" strokeDasharray="4 4" />
            <path d="M 22,90 Q 50,50 78,10" className="stroke-white opacity-30" strokeDasharray="4 4" />
            
            {/* Data points */}
            <path d="M 23,75 A 2.5 2.5 0 1 1 28 75 A 2.5 2.5 0 1 1 23 75 Z" className="fill-white stroke-none" />
            <path d="M 48,50 A 2.5 2.5 0 1 1 53 50 A 2.5 2.5 0 1 1 48 50 Z" className="fill-white stroke-none" />
            <path d="M 73,25 A 2.5 2.5 0 1 1 78 25 A 2.5 2.5 0 1 1 73 25 Z" className="fill-white stroke-none" />
         </svg>
         </div>
         
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">Régression Bayésienne</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">w ~ 𝓝(μ₀, Σ₀)</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Ne trouve pas qu'une seule droite (comme l'OLS), mais une <strong>distribution (un éventail) sur les paramètres w</strong>. Permet de savoir quand le modèle est incertain.
            </p>
         </div>
      </div>
      

      
      
    </div>
  );
}
