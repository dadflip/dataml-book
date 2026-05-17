import React from 'react';


export default function LogisticRegression() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         <div className="flex justify-center w-full shrink-0">
         <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Axis */}
            <path d="M 8,90 Q 50,92 92,90" className="opacity-40" />
            <path d="M 10,92 Q 12,50 8,10" className="opacity-40" />
            
            {/* 0.5 Decision Boundary */}
            <path d="M 8,50 Q 50,52 92,50" className="stroke-white opacity-30" strokeDasharray="3 3" />
            <text x="94" y="52" fontSize="9" className="fill-white/80 font-mono font-bold stroke-none">0.5</text>
            
            {/* Logistic Curve */}
            <path d="M 10,85 C 40,85 45,15 90,15" className="stroke-blue-400" strokeWidth="2.5" />
            
            {/* Data points */}
            <circle cx="20" cy="85" r="2.5" className="fill-white stroke-none" />
            <circle cx="35" cy="85" r="2.5" className="fill-white stroke-none" />
            <circle cx="50" cy="85" r="2.5" className="fill-white stroke-none" />
            
            <circle cx="60" cy="15" r="2.5" className="fill-white stroke-none" />
            <circle cx="75" cy="15" r="2.5" className="fill-white stroke-none" />
            <circle cx="90" cy="15" r="2.5" className="fill-white stroke-none" />
         </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">Régression Logistique</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">ŷ = σ(wᵀx + b)</span>
               <span className="text-[8px] md:text-xs opacity-60">J(w) = LogLoss</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Utilise une fonction S (Sigmoïde) pour compresser les valeurs entre 0 et 1. Prédit une probabilité pour une classe <strong>Binaire</strong>. Ex: Spam ou Non-Spam.
            </p>
         </div>
      </div>

      {/* PIPELINE Logistic */}
      <div className="flex flex-col gap-4 mt-6">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Client Part ou Reste (Churn)</span>
         <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 20 40 L 40 40 M 30 30 L 30 50" className="stroke-white/30" />
                  <circle cx="65" cy="40" r="14" className="fill-white/10 stroke-none" />
                  <text x="65" y="43" fontSize="9" className="fill-white stroke-none font-bold" textAnchor="middle">Client</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Features</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Score d'engagement</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 15 65 C 50 65 50 15 85 15" className="stroke-blue-400" strokeWidth="2.5" />
                  <circle cx="70" cy="25" r="4" className="fill-white stroke-none" />
                  <text x="70" y="40" fontSize="10" className="fill-blue-300 stroke-none font-bold" textAnchor="middle">85%</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Sigmoïde</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Probabilité de départ</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="20" y="25" width="60" height="30" rx="4" className="fill-red-400/20 stroke-red-400" />
                  <text x="50" y="43" fontSize="10" className="fill-red-400 stroke-none font-bold" textAnchor="middle">PART (1)</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Seuil &gt;50%</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Décision binaire</span>
               </div>
            </div>
         </div>
      </div>
      
    </div>
  );
}
