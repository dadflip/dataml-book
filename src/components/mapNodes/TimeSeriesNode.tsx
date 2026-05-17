import React from 'react';


import TimeSeriesMath from './timeseries/TimeSeriesMath';

export default function TimeSeriesNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Séries Temporelles</h4>

      

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
      
      {/* 1. Modèle Auto-Régressif (AR) */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
         <div className="flex flex-col gap-6">
           <div className="flex justify-center w-full shrink-0">
             <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Axes */}
                <path d="M 10 90 L 90 90 M 10 90 L 10 10" strokeWidth="1" className="opacity-40" />
                
                {/* Time Series Data */}
                <path d="M 10 70 Q 25 20, 40 50 T 70 40 T 90 60" className="stroke-amber-400" strokeWidth="2" />
                
                {/* Points (t-2, t-1, t) */}
                <circle cx="40" cy="50" r="2.5" className="fill-amber-400 stroke-none" />
                <text x="35" y="42" fontSize="6" className="fill-white stroke-none font-bold">t-2</text>
                
                <circle cx="70" cy="40" r="2.5" className="fill-amber-400 stroke-none" />
                <text x="65" y="32" fontSize="6" className="fill-white stroke-none font-bold">t-1</text>
                
                <circle cx="90" cy="60" r="2.5" className="fill-amber-400 stroke-none" />
                <text x="96" y="62" fontSize="6" className="fill-white stroke-none font-bold">t</text>
                
                {/* AR dependencies */}
                <path d="M 45 45 Q 55 30, 65 35" strokeWidth="1" className="stroke-white opacity-60" strokeDasharray="2,2" />
                <polygon points="65,35 62,32 66,31" className="fill-white opacity-60 stroke-none" />
                
                <path d="M 75 38 Q 85 45, 87 55" strokeWidth="1" className="stroke-white opacity-60" strokeDasharray="2,2" />
                <polygon points="87,55 86,51 89,52" className="fill-white opacity-60 stroke-none" />
             </svg>
           </div>
           
           <div className="flex flex-col gap-3 text-left">
              <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Modèle Auto-Régressif (AR)</h2>
              <div className="flex flex-col font-mono text-[10px] md:text-sm text-amber-300 bg-amber-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                 <span className="whitespace-nowrap"><i className="font-serif">y<sub>t</sub></i> = <i className="font-serif">c</i> + Σ (ϕ<i className="font-serif"><sub>i</sub></i> · <i className="font-serif">y<sub>t-i</sub></i>) + ε<i className="font-serif"><sub>t</sub></i></span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Prédit la valeur actuelle basée sur une combinaison linéaire de ses <strong>valeurs passées</strong> (lags). Exploite la notion de mémoire ou d'inertie dans la série temporelle.
              </p>
           </div>
         </div>

         {/* PIPELINE AR */}
         <div className="flex flex-col gap-4 mt-6">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Inertie Temporelle (Température)</span>
            <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
               {/* Step 1 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <path d="M 20 60 Q 50 30 80 50" strokeWidth="2" className="stroke-white/30" />
                     <circle cx="20" cy="60" r="3" className="fill-white/30 stroke-none" />
                     <circle cx="50" cy="30" r="3" className="fill-white/60 stroke-none" />
                     <circle cx="80" cy="50" r="4" className="fill-white stroke-none" />
                     <text x="50" y="20" fontSize="8" className="fill-white stroke-none text-center">Lags</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Historique</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Prendre J-1, J-2</span>
                  </div>
               </div>
               
               <div className="flex shrink-0 mt-8 md:mt-10">
                 <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </div>

               {/* Step 2 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <rect x="20" y="30" width="60" height="30" rx="4" className="fill-amber-400/20 stroke-amber-400" />
                     <text x="50" y="47" fontSize="5" className="fill-amber-400 stroke-none font-bold" textAnchor="middle">0.7*(J-1) + 0.2*(J-2)</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Pondération</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Régression Linéaire</span>
                  </div>
               </div>
               
               <div className="flex shrink-0 mt-8 md:mt-10">
                 <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </div>

               {/* Step 3 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <circle cx="50" cy="40" r="15" className="fill-amber-400 stroke-none" />
                     <text x="50" y="44" fontSize="12" className="fill-black stroke-none font-bold" textAnchor="middle">y_T</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Prédiction</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Température J</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Modèle Moyenne Mobile (MA) */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
         <div className="flex flex-col gap-6">
           <div className="flex justify-center w-full shrink-0">
             <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Axes */}
                <path d="M 10 90 L 90 90 M 10 90 L 10 10" strokeWidth="1" className="opacity-40" />
                
                {/* Mean line */}
                <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" className="stroke-amber-400 opacity-60" strokeDasharray="3,3" />
                <text x="96" y="52" fontSize="6" className="fill-amber-400 stroke-none">μ</text>
                
                {/* Error terms visualization */}
                <line x1="30" y1="50" x2="30" y2="30" strokeWidth="1.5" className="stroke-pink-400" />
                <circle cx="30" cy="30" r="2.5" className="fill-amber-400 stroke-none" />
                <text x="25" y="25" fontSize="6" className="fill-white stroke-none font-mono">ε<tspan fontSize="4" dy="3">t-2</tspan></text>
                
                <line x1="60" y1="50" x2="60" y2="70" strokeWidth="1.5" className="stroke-pink-400" />
                <circle cx="60" cy="70" r="2.5" className="fill-amber-400 stroke-none" />
                <text x="55" y="80" fontSize="6" className="fill-white stroke-none font-mono">ε<tspan fontSize="4" dy="3">t-1</tspan></text>
                
                <line x1="85" y1="50" x2="85" y2="40" strokeWidth="1.5" className="stroke-pink-400" />
                <circle cx="85" cy="40" r="2.5" className="fill-amber-400 stroke-none" />
                
                {/* MA dependencies */}
                <path d="M 33 30 Q 50 20, 58 65" strokeWidth="1" className="stroke-white opacity-50" strokeDasharray="2,2" />
                <path d="M 63 70 Q 75 80, 83 45" strokeWidth="1" className="stroke-white opacity-50" strokeDasharray="2,2" />
             </svg>
           </div>
           
           <div className="flex flex-col gap-3 text-left">
              <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Moyenne Mobile (MA)</h2>
              <div className="flex flex-col font-mono text-[10px] md:text-sm text-pink-300 bg-pink-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                 <span className="whitespace-nowrap"><i className="font-serif">y<sub>t</sub></i> = μ + ε<i className="font-serif"><sub>t</sub></i> + Σ (θ<i className="font-serif"><sub>i</sub></i> · ε<i className="font-serif"><sub>t-i</sub></i>)</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Modélise la valeur actuelle comme la moyenne (μ) plus une dépendance aux <strong>chocs (erreurs de prédiction passées)</strong>. Capte les événements soudains et opère un lissage à court terme.
              </p>
           </div>
         </div>

         {/* PIPELINE MA */}
         <div className="flex flex-col gap-4 mt-6">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Choc de Bourse</span>
            <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
               {/* Step 1 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <path d="M 20 50 L 80 50" strokeWidth="1" className="opacity-40 stroke-dasharray-[2,2]" />
                     <line x1="50" y1="50" x2="50" y2="20" strokeWidth="3" className="stroke-pink-400" />
                     <text x="70" y="30" fontSize="8" className="fill-pink-400 stroke-none">Choc (ε)</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Événement</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Baisse inattendue</span>
                  </div>
               </div>
               
               <div className="flex shrink-0 mt-8 md:mt-10">
                 <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </div>

               {/* Step 2 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <rect x="20" y="30" width="60" height="30" rx="4" className="fill-pink-400/20 stroke-pink-400" />
                     <text x="50" y="47" fontSize="6" className="fill-pink-400 stroke-none font-bold" textAnchor="middle">μ + θ₁*(ε_{"{t-1}"})</text>
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Propagation</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Impact sur le jour J</span>
                  </div>
               </div>
               
               <div className="flex shrink-0 mt-8 md:mt-10">
                 <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
               </div>

               {/* Step 3 */}
               <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                  <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <path d="M 20 20 Q 50 60 80 50" strokeWidth="2" className="stroke-pink-400" />
                     <circle cx="80" cy="50" r="4" className="fill-white stroke-none" />
                  </svg>
                  <div className="flex flex-col gap-1 items-center text-left">
                     <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Résorption</span>
                     <span className="text-[10px] md:text-xs text-white/60 text-center">Retour à la moyenne</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 3. Intégration (I) & ARIMA */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
         <div className="flex flex-col gap-6">
           <div className="flex justify-center w-full shrink-0">
             <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {/* Non-stationary series */}
                <path d="M 5 60 L 15 55 L 25 45 L 35 50 L 45 35" className="stroke-white opacity-40" strokeWidth="1.5" />
                <text x="5" y="70" fontSize="5" className="fill-white stroke-none opacity-60">Série non-stationnaire</text>
                
                {/* Differentiation arrow */}
                <path d="M 45 45 Q 50 65, 55 65" strokeWidth="1" className="stroke-amber-400" markerEnd="url(#arrowBlue)" />
                <text x="36" y="55" fontSize="6" className="fill-amber-400 stroke-none font-mono">Δ = y<tspan fontSize="4" dy="3">t</tspan> - y<tspan fontSize="4" dy="3">t-1</tspan></text>
                
                {/* Stationary series */}
                <path d="M 60 50 L 70 45 L 80 55 L 90 48" className="stroke-amber-400" strokeWidth="2" />
                <line x1="55" y1="50" x2="95" y2="50" strokeWidth="1" className="stroke-amber-400 opacity-60" strokeDasharray="2,2" />
                <text x="60" y="65" fontSize="5" className="fill-amber-400 stroke-none opacity-90">Série Différenciée</text>

                <defs>
                  <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                    <polygon points="0,0 6,3 0,6" className="fill-amber-400 stroke-none" />
                  </marker>
                </defs>
             </svg>
           </div>
           
           <div className="flex flex-col gap-3 text-left">
              <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">3. ARIMA(p, d, q)</h2>
              <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                 <span className="whitespace-nowrap">Δ<i className="font-serif"><sup>d</sup>y<sub>t</sub></i> = AR(<i>p</i>) + MA(<i>q</i>)</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Combine l'Auto-Régression et la Moyenne Mobile. L'étape <strong>I (Intégrée)</strong> différencie les données pour éliminer la tendance et rendre la série stationnaire avant d'appliquer (AR) et (MA).
              </p>
           </div>
         </div>
      </div>

      {/* 4. Lissage Exponentiel & Prophet */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
         <div className="flex flex-col gap-6">
           <div className="flex justify-center w-full shrink-0">
             <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 10 90 L 90 90 M 10 90 L 10 10" strokeWidth="1" className="opacity-40" />
                
                {/* Data points */}
                <circle cx="20" cy="70" r="1.5" className="fill-white opacity-40 stroke-none" />
                <circle cx="35" cy="55" r="1.5" className="fill-white opacity-60 stroke-none" />
                <circle cx="50" cy="65" r="1.5" className="fill-white opacity-80 stroke-none" />
                <circle cx="65" cy="40" r="1.5" className="fill-white opacity-100 stroke-none" />
                
                {/* Solid line (smoothed) */}
                <path d="M 20 70 Q 30 60, 35 55 T 50 65 T 65 40" className="stroke-amber-400" strokeWidth="2" />
                
                {/* Prediction area */}
                <path d="M 65 40 Q 75 35, 85 20 M 65 40 Q 75 45, 85 50" className="stroke-amber-400" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 65 40 Q 75 40, 85 35" className="stroke-amber-400" strokeWidth="2" strokeDasharray="3,3" />

                <text x="35" y="80" fontSize="5" className="fill-white stroke-none opacity-60">Poids: α, α(1-α), ...</text>
             </svg>
           </div>
           
           <div className="flex flex-col gap-3 text-left">
              <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">4. Lissage Exponentiel</h2>
              <div className="flex flex-col font-mono text-[10px] md:text-sm text-green-300 bg-green-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                 <span className="whitespace-nowrap"><i className="font-serif">S<sub>t</sub></i> = α·<i className="font-serif">y<sub>t</sub></i> + (1-α)·<i className="font-serif">S<sub>t-1</sub></i></span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Accorde un poids décroissant exponentiellement aux observations passées. Des variantes complexes (Holt-Winters, <strong>Prophet</strong>) ajoutent des composantes explicites pour la Tendance et la Saisonnalité.
              </p>
           </div>
         </div>
      </div>

    </div>
    
    <TimeSeriesMath />
      

    </div>
  );
}
