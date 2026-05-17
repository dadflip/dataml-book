import React from 'react';


export default function EnsembleNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Méthodes Ensemblistes</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Dataset</span>
              <span><i>D</i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Modèles Faibles</span>
              <span><i>h</i><sub>1</sub>(<b>x</b>), .., <i>h<sub>K</sub></i>(<b>x</b>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Agrégation</span>
              <span>Σ (Vote / Moyenne)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Prédiction Fort</span>
              <span className="text-[#d8b4fe]"><i>H</i>(<b>x</b>)</span>
           </div>
        </div>
      </div>

      

      {/* 3 Models Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-2">
        {/* 1. Bagging (Random Forest) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Data Subsets */}
                  <rect x="5" y="10" width="15" height="15" rx="2" className="fill-white/20 stroke-none" />
                  <rect x="5" y="42.5" width="15" height="15" rx="2" className="fill-white/20 stroke-none" />
                  <rect x="5" y="75" width="15" height="15" rx="2" className="fill-white/20 stroke-none" />
                  
                  <text x="12.5" y="20.5" fontSize="7" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">D₁</text>
                  <text x="12.5" y="53" fontSize="7" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">D₂</text>
                  <text x="12.5" y="85.5" fontSize="7" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">D₃</text>
    
                  {/* Arrows to models */}
                  <line x1="25" y1="17.5" x2="35" y2="17.5" strokeWidth="1" className="opacity-50" />
                  <line x1="25" y1="50" x2="35" y2="50" strokeWidth="1" className="opacity-50" />
                  <line x1="25" y1="82.5" x2="35" y2="82.5" strokeWidth="1" className="opacity-50" />
    
                  {/* Trees (Parallel) */}
                  {/* Tree 1 */}
                  <line x1="45" y1="10" x2="40" y2="18" strokeWidth="1.5" />
                  <line x1="45" y1="10" x2="50" y2="18" strokeWidth="1.5" />
                  <line x1="40" y1="18" x2="38" y2="25" strokeWidth="1.5" />
                  <line x1="40" y1="18" x2="42" y2="25" strokeWidth="1.5" />
                  <circle cx="45" cy="10" r="2" className="fill-white" />
                  
                  {/* Tree 2 */}
                  <line x1="45" y1="42.5" x2="40" y2="50.5" strokeWidth="1.5" />
                  <line x1="45" y1="42.5" x2="50" y2="50.5" strokeWidth="1.5" />
                  <line x1="50" y1="50.5" x2="48" y2="57.5" strokeWidth="1.5" />
                  <line x1="50" y1="50.5" x2="52" y2="57.5" strokeWidth="1.5" />
                  <circle cx="45" cy="42.5" r="2" className="fill-white" />
    
                  {/* Tree 3 */}
                  <line x1="45" y1="75" x2="40" y2="83" strokeWidth="1.5" />
                  <line x1="45" y1="75" x2="50" y2="83" strokeWidth="1.5" />
                  <line x1="40" y1="83" x2="38" y2="90" strokeWidth="1.5" />
                  <line x1="40" y1="83" x2="42" y2="90" strokeWidth="1.5" />
                  <circle cx="45" cy="75" r="2" className="fill-white" />
    
                  {/* Arrows to Aggregation */}
                  <line x1="55" y1="17.5" x2="70" y2="40" strokeWidth="1" className="opacity-50" />
                  <line x1="55" y1="50" x2="70" y2="50" strokeWidth="1" className="opacity-50" />
                  <line x1="55" y1="82.5" x2="70" y2="60" strokeWidth="1" className="opacity-50" />
    
                  {/* Aggregation Node */}
                  <circle cx="80" cy="50" r="10" className="fill-white/10" />
                  <text x="80" y="53" fontSize="10" className="fill-white stroke-none font-bold font-sans" textAnchor="middle">∑</text>
                  
                  {/* Final Prediction */}
                  <line x1="90" y1="50" x2="98" y2="50" strokeWidth="1.5" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Bagging (Random Forest)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap"><i>D<sub>k</sub></i> ~ Bootstrap(<i>D</i>)</span>
                   <span className="whitespace-nowrap mt-1">H(<b>x</b>) = 1/K Σ <i>h<sub>k</sub></i>(<b>x</b>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Entraîne des arbres en <strong>parallèle</strong> sur des échantillons modifiés (Bootstrap). Réduit massivement la variance et le risque d'overfitting.
                </p>
             </div>
           </div>

           {/* PIPELINE Random Forest */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Diagnostic Médical</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="30" cy="40" r="15" className="fill-white/10 stroke-none" />
                       <circle cx="50" cy="40" r="15" className="fill-white/10 stroke-none" />
                       <circle cx="70" cy="40" r="15" className="fill-white/10 stroke-none" />
                       <text x="50" y="43" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Docteurs</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Experts</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">100 médecins spécialisés</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="20" y="20" width="60" height="10" className="fill-blue-400/50 stroke-none" />
                       <rect x="20" y="35" width="60" height="10" className="fill-blue-400/50 stroke-none" />
                       <rect x="20" y="50" width="60" height="10" className="fill-red-400/50 stroke-none" />
                       <text x="50" y="28" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">OUI</text>
                       <text x="50" y="43" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">OUI</text>
                       <text x="50" y="58" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">NON</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Vote</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Chacun donne son avis</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="50" cy="40" r="20" className="fill-blue-400/20 stroke-blue-400" />
                       <text x="50" y="44" fontSize="10" className="fill-blue-400 stroke-none font-bold" textAnchor="middle">98% OUI</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Majorité</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Décision robuste</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Boosting (AdaBoost) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Sequence of Trees */}
                  
                  {/* Step 1 */}
                  <circle cx="15" cy="50" r="2.5" className="fill-white" />
                  <line x1="15" y1="50" x2="10" y2="60" strokeWidth="1.5" />
                  <line x1="15" y1="50" x2="20" y2="60" strokeWidth="1.5" />
                  
                  {/* Data Points below tree 1 (even size) */}
                  <circle cx="10" cy="70" r="1.5" className="fill-white" />
                  <circle cx="15" cy="70" r="1.5" className="fill-white" />
                  <circle cx="20" cy="70" r="1.5" className="fill-red-400 stroke-none" /> {/* Error */}
                  
                  {/* Arrow */}
                  <line x1="25" y1="50" x2="40" y2="50" strokeWidth="1.5" className="opacity-50" />
                  
                  {/* Step 2 */}
                  <circle cx="50" cy="50" r="2.5" className="fill-white" />
                  <line x1="50" y1="50" x2="45" y2="60" strokeWidth="1.5" />
                  <line x1="50" y1="50" x2="55" y2="60" strokeWidth="1.5" />
                  
                  {/* Data Points below tree 2 (error point is larger) */}
                  <circle cx="45" cy="70" r="1.5" className="fill-white" />
                  <circle cx="50" cy="70" r="1.5" className="fill-white" />
                  <circle cx="55" cy="70" r="3.5" className="fill-white opacity-80" /> {/* Larger, focused */}
                  
                  {/* Arrow */}
                  <line x1="60" y1="50" x2="75" y2="50" strokeWidth="1.5" className="opacity-50" />
    
                  {/* Step 3 */}
                  <circle cx="85" cy="50" r="2.5" className="fill-white" />
                  <line x1="85" y1="50" x2="80" y2="60" strokeWidth="1.5" />
                  <line x1="85" y1="50" x2="90" y2="60" strokeWidth="1.5" />
                  
                  {/* Final points */}
                  <circle cx="80" cy="70" r="1.5" className="fill-white" />
                  <circle cx="85" cy="70" r="1.5" className="fill-white" />
                  <circle cx="90" cy="70" r="1.5" className="fill-white" />
                  
                  {/* Top weights formula visual */}
                  <text x="50" y="25" fontSize="6" className="fill-white/60 stroke-none font-mono" textAnchor="middle">w_t(i) augmente si erreur</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Boosting (AdaBoost)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-orange-300 bg-orange-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap"><i>w<sub>t</sub></i> = <i>w<sub>t-1</sub></i> · exp(<i>α</i> · <i>err</i>)</span>
                   <span className="whitespace-nowrap mt-1">H(<b>x</b>) = sign(Σ <i>α<sub>t</sub></i><i>h<sub>t</sub></i>(<b>x</b>))</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Arbres entraînés en <strong>séquence</strong>. Chaque arbre se focalise sur les erreurs du précédent (augmente le poids des points mal classés). Réduit le Biais.
                </p>
             </div>
           </div>
        </div>

        {/* 3. Gradient Boosting */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Equation Visual: y => F(x) + tree(residual) */}
                  <rect x="5" y="30" width="16" height="40" rx="2" className="fill-white/20 stroke-none" />
                  <text x="13" y="53" fontSize="10" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">y</text>
                  
                  <text x="26.5" y="53" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">≈</text>
                  
                  <rect x="32" y="30" width="16" height="40" rx="2" className="fill-[#d8b4fe]/40 stroke-none" />
                  <text x="40" y="53" fontSize="10" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">F₀</text>
    
                  <text x="53.5" y="53" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">+</text>
                  
                  <rect x="59" y="30" width="16" height="40" rx="2" className="fill-white/20 stroke-none" />
                  <circle cx="67" cy="45" r="2.5" className="fill-white" />
                  <line x1="67" y1="45" x2="63" y2="55" strokeWidth="1.5" />
                  <line x1="67" y1="45" x2="71" y2="55" strokeWidth="1.5" />
                  <text x="67" y="75" fontSize="6" className="fill-white stroke-none font-mono" textAnchor="middle">h₁(r₁)</text>
                  
                  <text x="80.5" y="53" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">+</text>
    
                  <rect x="86" y="30" width="12" height="40" rx="2" className="fill-white/10 stroke-none stroke-white/50 stroke-dasharray-[2,2]" />
                  <text x="92" y="53" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">...</text>
    
                  {/* Arrow loop indicating residual matching */}
                  <path d="M 40 25 Q 40 10, 67 10 L 67 25" strokeWidth="1" strokeDasharray="2,2" className="opacity-50" />
                  <polygon points="67,25 65,22 69,22" className="fill-white stroke-none opacity-50"/>
                  <text x="53.5" y="8" fontSize="6" className="fill-white stroke-none font-mono font-serif" textAnchor="middle">r₁ = y - F₀</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">3. Gradient Boosting (XGB...)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-pink-300 bg-pink-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap"><i>r<sub>t</sub></i> = -∂<i>J</i> / ∂<i>F<sub>t-1</sub></i>(<b>x</b>)</span>
                   <span className="whitespace-nowrap mt-1"><i>F<sub>t</sub></i>(<b>x</b>) = <i>F<sub>t-1</sub></i>(<b>x</b>) + <i>η</i>·<i>h<sub>t</sub></i>(<b>x</b>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Chaque nouvel arbre s'entraîne à prédire le <strong>résidu</strong> (l'erreur restante) de l'ensemble précédent. Gradient Boosting pur, XGBoost, LightGBM (très dominant sur données tabulaires).
                </p>
             </div>
           </div>
        </div>

      </div>
      

    </div>
  );
}
