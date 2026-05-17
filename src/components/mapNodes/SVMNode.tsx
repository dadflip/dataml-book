import React from 'react';
import SVMMath from './math/SVMMath';


export default function SVMNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90 ">
      
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      
      {/* 1. Support Vector Machine (SVM) */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
         <div className="flex flex-col gap-6">
           <div className="flex justify-center w-full shrink-0">
             <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Outline box sketchy */}
                <path d="M 5 5 Q 50 2 95 8 L 98 90 Q 50 95 5 92 Z" className="stroke-white/30 fill-white/5" strokeDasharray="4 4" />
                
                {/* Hyperplane (Solid) */}
                <path d="M 15 85 Q 50 50 85 15" strokeWidth="2.5" className="stroke-white" />
                
                {/* Margin Borders (Dashed) */}
                <path d="M 5 70 Q 30 45 70 5" strokeWidth="1" strokeDasharray="3 3" className="stroke-white/50" />
                <path d="M 30 95 Q 55 70 95 30" strokeWidth="1" strokeDasharray="3 3" className="stroke-white/50" />

                {/* Class A (Top Left) */}
                <path d="M 25 35 A 2 2 0 1 1 29 35 A 2 2 0 1 1 25 35 Z" className="fill-white stroke-none opacity-50" />
                <path d="M 40 20 A 2 2 0 1 1 44 20 A 2 2 0 1 1 40 20 Z" className="fill-white stroke-none opacity-50" />
                
                {/* Support Vector A */}
                <path d="M 38 42 A 2.5 2.5 0 1 1 43 42 A 2.5 2.5 0 1 1 38 42 Z" className="fill-yellow-400 stroke-none" />
                <path d="M 36 42 A 4 4 0 1 1 45 42 A 4 4 0 1 1 36 42 Z" className="stroke-yellow-400 stroke-[1] fill-none" />

                {/* Class B (Bottom Right) */}
                <rect x="70" y="70" width="4" height="4" className="fill-white stroke-none opacity-50" transform="rotate(15 72 72)" />
                <rect x="85" y="50" width="4" height="4" className="fill-white stroke-none opacity-50" transform="rotate(-15 87 52)" />
                
                {/* Support Vector B1 */}
                <rect x="61" y="61" width="5" height="5" className="fill-yellow-400 stroke-none" transform="rotate(10 63 63)" />
                <circle cx="63.5" cy="63.5" r="5" className="stroke-yellow-400 stroke-[1] fill-none" />
             </svg>
           </div>
           
           <div className="flex flex-col gap-3 text-left">
              <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Concept SVM</h2>
              <div className="flex flex-col font-mono text-[10px] md:text-sm text-yellow-300 bg-yellow-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                 <span className="whitespace-nowrap">Hypothèse : <b>w</b><sup>T</sup><b>x</b> + <i>b</i> = 0</span>
                 <span className="whitespace-nowrap mt-1">Marge : 2 / ||<b>w</b>||₂</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Trouve l'hyperplan qui sépare les classes tout en <strong>maximisant l'espace</strong> (la marge) de part et d'autre. Seuls les points sur les bordures (les <strong>Vecteurs de Support</strong>) définissent le modèle.
              </p>
           </div>
         </div>

         {/* PIPELINE SVM */}
         <div className="flex flex-col gap-4 mt-6">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Spam vs Non-Spam</span>
            <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
               {/* Step 1 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <circle cx="20" cy="65" r="3" className="fill-blue-400 stroke-none" />
                     <circle cx="30" cy="55" r="3" className="fill-blue-400 stroke-none" />
                     <circle cx="70" cy="35" r="3" className="fill-red-400 stroke-none" />
                     <circle cx="80" cy="25" r="3" className="fill-red-400 stroke-none" />
                     <text x="25" y="75" fontSize="8" className="fill-blue-400 stroke-none">Normal</text>
                     <text x="75" y="20" fontSize="8" className="fill-red-400 stroke-none">Spam</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Données</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Nuage de points 2D</span>
                  </div>
               </div>
               
               <div className="flex shrink-0 mt-8 md:mt-10">
                 <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </div>

               {/* Step 2 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <circle cx="30" cy="55" r="5" className="stroke-yellow-400 opacity-60" />
                     <circle cx="70" cy="35" r="5" className="stroke-yellow-400 opacity-60" />
                     <path d="M 10 90 L 90 10" strokeWidth="2" className="stroke-white" />
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Optimisation</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Trouver la Marge Max</span>
                  </div>
               </div>
               
               <div className="flex shrink-0 mt-8 md:mt-10">
                 <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </div>

               {/* Step 3 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <path d="M 10 90 L 90 10" strokeWidth="2" className="stroke-white" />
                     <circle cx="45" cy="45" r="4" className="fill-white stroke-none" />
                     <text x="65" y="50" fontSize="8" className="fill-white stroke-none font-bold">Classé :</text>
                     <text x="65" y="60" fontSize="8" className="fill-blue-400 stroke-none font-bold">Normal</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Prédiction</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">De quel côté ?</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Soft Margin (C) */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
         <div className="flex flex-col gap-6">
           <div className="flex justify-center w-full shrink-0">
             <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 5 5 Q 50 2 95 8 L 98 90 Q 50 95 5 92 Z" className="stroke-white/10 fill-white/5" strokeDasharray="2 4" />
                
                <path d="M 15 85 Q 50 50 85 15" strokeWidth="2.5" className="stroke-white" />
                <path d="M 5 70 Q 30 45 70 5" strokeWidth="1" strokeDasharray="3 3" className="stroke-white/50" />
                <path d="M 30 95 Q 55 70 95 30" strokeWidth="1" strokeDasharray="3 3" className="stroke-white/50" />

                <circle cx="35" cy="25" r="2.5" className="fill-white stroke-none" />
                {/* Outlier A, inside margin, but right side of plane */}
                <circle cx="55" cy="35" r="2.5" className="fill-white stroke-none" />
                <path d="M 55 35 Q 50 40 45 45" strokeWidth="1.5" className="stroke-red-400" markerEnd="url(#arrowError)" />
                <text x="40" y="42" fontSize="6" className="fill-red-400 stroke-none font-bold font-serif italic">ξ</text>

                <rect x="65" y="65" width="5" height="5" className="fill-white stroke-none" />
                {/* Outlier B, completely wrong side of plane */}
                <rect x="42" y="32" width="5" height="5" className="fill-white stroke-none" />
                <path d="M 45 35 Q 50 40 55 45" strokeWidth="1.5" className="stroke-red-400" markerEnd="url(#arrowError)" />

                <defs>
                     <marker id="arrowError" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                       <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-red-400 stroke-red-400" />
                     </marker>
                 </defs>
             </svg>
           </div>
           
           <div className="flex flex-col gap-3 text-left">
              <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Soft Margin (Paramètre C)</h2>
              <div className="flex flex-col font-mono text-[10px] md:text-sm text-red-300 bg-red-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                 <span className="whitespace-nowrap"><i>y<sub>i</sub></i>(<b>w</b><sup>T</sup><b>x</b><i><sub>i</sub></i> + <i>b</i>) ≥ 1 - <i>ξ<sub>i</sub></i></span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Le hyper-paramètre <strong>C</strong> autorise et pénalise les violations de marge (variables d'écart <i className="font-serif">ξ</i>).<br/>- C élevé : Marge stricte, peu d'erreurs (risque d'Overfit).<br/>- C faible : Marge plus large et souple.
              </p>
           </div>
         </div>
      </div>
    </div>

      <SVMMath />
      


    </div>
  );
}

