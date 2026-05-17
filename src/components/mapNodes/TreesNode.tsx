import TreesMath from './math/TreesMath';
import React from 'react';


export default function TreesNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Arbres de Décision</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Racine<br className="sm:hidden"/>(Dataset)</span>
              <span><i>D</i> = {'{'}<b>x</b><i><sub>i</sub></i>, <i>y<sub>i</sub></i>{'}'}</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Critère<br className="sm:hidden"/>(Impureté)</span>
              <span>Gain(<i>D</i>, <i>f</i>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Split<br className="sm:hidden"/>(Condition)</span>
              <span><i>X<sub>j</sub></i> ≤ <i>v</i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Feuille<br className="sm:hidden"/>(Prédiction)</span>
              <span className="text-[#e2b5ff]"><i>ŷ</i></span>
           </div>
        </div>
      </div>

      

      {/* 4 Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        {/* 1. Arbre de Classification */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Root node */}
                  <rect x="40" y="5" width="20" height="15" rx="3" className="fill-white/10" />
                  <circle cx="45" cy="12.5" r="2.5" className="fill-white" />
                  <rect x="52.5" y="10" width="5" height="5" className="fill-white" />
                  
                  {/* Branches */}
                  <line x1="50" y1="20" x2="30" y2="45" strokeWidth="1.5" />
                  <line x1="50" y1="20" x2="70" y2="45" strokeWidth="1.5" />
    
                  {/* Left leaf (mostly pure) */}
                  <rect x="20" y="45" width="20" height="15" rx="3" className="fill-white/10" />
                  <circle cx="25" cy="52.5" r="2.5" className="fill-white" />
                  <circle cx="35" cy="52.5" r="2.5" className="fill-white" />
    
                  {/* Right node (mixed) */}
                  <rect x="60" y="45" width="20" height="15" rx="3" className="fill-white/10" />
                  <circle cx="65" cy="52.5" r="2.5" className="fill-white" />
                  <rect x="72.5" y="50" width="5" height="5" className="fill-white" />
    
                  {/* Branches from right node */}
                  <line x1="70" y1="60" x2="55" y2="80" strokeWidth="1.5" />
                  <line x1="70" y1="60" x2="85" y2="80" strokeWidth="1.5" />
    
                  {/* Leaves */}
                  <rect x="48" y="80" width="14" height="14" rx="3" className="fill-white/10" />
                  <circle cx="55" cy="87" r="2.5" className="fill-white" />
                  
                  <rect x="78" y="80" width="14" height="14" rx="3" className="fill-white/10" />
                  <rect x="82.5" y="84.5" width="5" height="5" className="fill-white" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Classification</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Entropie = -Σ <i>p<sub>i</sub></i>·log₂(<i>p<sub>i</sub></i>)</span>
                   <span className="whitespace-nowrap mt-1">Gini = 1 - Σ <i>p<sub>i</sub></i>²</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Sépare itérativement les données pour obtenir des sous-groupes (feuilles) les plus <strong>purs</strong> (homogènes) possibles selon leurs classes. Très interprétable.
                </p>
             </div>
           </div>

           {/* PIPELINE Trees */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Accord de Prêt Bancaire</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="10" y="20" width="80" height="40" rx="4" className="fill-blue-400/20 stroke-blue-400" />
                       <text x="50" y="43" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Salaire &gt; 3000€ ?</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Nœud Racine</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Meilleur Split</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <path d="M 50 20 L 25 60 M 50 20 L 75 60" strokeWidth="2" className="stroke-white" />
                       <text x="25" y="40" fontSize="8" className="fill-white stroke-none font-bold bg-black" textAnchor="middle">OUI</text>
                       <text x="75" y="40" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">NON</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Branchement</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Division en Sous-groupes</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="20" y="30" width="60" height="20" rx="4" className="fill-green-400/20 stroke-green-400" />
                       <text x="50" y="43" fontSize="8" className="fill-green-400 stroke-none font-bold" textAnchor="middle">PRÊT ACCORDÉ</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Feuille</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Décision Finale (Pur)</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Arbre de Régression */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Axes */}
                  <line x1="10" y1="90" x2="90" y2="90" strokeWidth="1" className="opacity-40" />
                  <line x1="10" y1="90" x2="10" y2="10" strokeWidth="1" className="opacity-40" />
    
                  {/* Data points (scattered) */}
                  <circle cx="20" cy="75" r="1.5" className="fill-white" />
                  <circle cx="30" cy="70" r="1.5" className="fill-white" />
                  <circle cx="40" cy="40" r="1.5" className="fill-white" />
                  <circle cx="50" cy="45" r="1.5" className="fill-white" />
                  <circle cx="65" cy="20" r="1.5" className="fill-white" />
                  <circle cx="75" cy="25" r="1.5" className="fill-white" />
                  <circle cx="85" cy="22" r="1.5" className="fill-white" />
    
                  {/* Regression step function (Stairs) */}
                  <path d="M 10 72.5 L 35 72.5 L 35 42.5 L 55 42.5 L 55 22.3 L 90 22.3" strokeWidth="2.5" />
                  
                  {/* Vertical split boundaries dashed */}
                  <line x1="35" y1="90" x2="35" y2="20" strokeWidth="1" strokeDasharray="2,2" className="opacity-30" />
                  <line x1="55" y1="90" x2="55" y2="20" strokeWidth="1" strokeDasharray="2,2" className="opacity-30" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Régression</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-green-300 bg-green-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Critère = Réduction Variance (MSE)</span>
                   <span className="whitespace-nowrap mt-1"><i>ŷ</i> = Moyenne(<i>y</i><sub>feuille</sub>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Prédit une valeur continue. La prédiction est en <strong>escalier</strong> (step function), chaque palier représentant la moyenne des points atterrissant dans la feuille correspondante.
                </p>
             </div>
           </div>
        </div>

        {/* 3. Partitionnement Orthogonal */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Box */}
                  <rect x="5" y="5" width="90" height="90" className="stroke-white/30" />
                  
                  {/* Splits */}
                  <line x1="45" y1="5" x2="45" y2="95" strokeWidth="2" />
                  <line x1="45" y1="40" x2="95" y2="40" strokeWidth="2" />
                  <line x1="5" y1="65" x2="45" y2="65" strokeWidth="2" />
                  <line x1="70" y1="5" x2="70" y2="40" strokeWidth="2" />
                  
                  {/* Points regions */}
                  {/* Top Left */}
                  <circle cx="20" cy="25" r="2.5" className="fill-white" />
                  <circle cx="30" cy="35" r="2.5" className="fill-white" />
                  <circle cx="25" cy="50" r="2.5" className="fill-white" />
                  {/* Bottom Left */}
                  <rect x="15" y="75" width="4" height="4" className="fill-white" />
                  <rect x="30" y="80" width="4" height="4" className="fill-white" />
                  {/* Top Right (1) */}
                  <circle cx="55" cy="20" r="2.5" className="fill-white" />
                  {/* Top Right (2) */}
                  <rect x="80" y="25" width="4" height="4" className="fill-white" />
                  <rect x="85" y="15" width="4" height="4" className="fill-white" />
                  {/* Bottom Right */}
                  <circle cx="65" cy="70" r="2.5" className="fill-white" />
                  <circle cx="80" cy="60" r="2.5" className="fill-white" />
                  <circle cx="70" cy="85" r="2.5" className="fill-white" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">3. Partition Spatiale</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-pink-300 bg-pink-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Condition := (X_j ≤ v)</span>
                   <span className="whitespace-nowrap mt-1">Espace D = ∪ Régions</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Les conditions transforment l'espace géométrique en de multiples sous-régions rectangulaires, menant à des <strong>frontières de décision non-linéaires</strong> complexes (Orthogonales).
                </p>
             </div>
           </div>
        </div>

        {/* 4. Élagage (Pruning) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Main structure */}
                  <line x1="50" y1="10" x2="30" y2="35" strokeWidth="2.5" />
                  <line x1="50" y1="10" x2="70" y2="35" strokeWidth="2.5" />
                  
                  <line x1="30" y1="35" x2="20" y2="60" strokeWidth="2" />
                  <line x1="30" y1="35" x2="40" y2="60" strokeWidth="2" />
                  <line x1="70" y1="35" x2="60" y2="60" strokeWidth="2" />
                  <line x1="70" y1="35" x2="80" y2="60" strokeWidth="2" />
    
                  {/* Overfitted deep branches to prune */}
                  <line x1="20" y1="60" x2="10" y2="85" strokeWidth="1.5" className="opacity-50" strokeDasharray="2,2"/>
                  <line x1="20" y1="60" x2="30" y2="85" strokeWidth="1.5" className="opacity-50" strokeDasharray="2,2"/>
                  
                  <line x1="40" y1="60" x2="35" y2="85" strokeWidth="1.5" className="opacity-50" strokeDasharray="2,2"/>
                  <line x1="40" y1="60" x2="45" y2="85" strokeWidth="1.5" className="opacity-50" strokeDasharray="2,2"/>
    
                  {/* Cut indicator (Scissors or X) on the deeper levels */}
                  <path d="M 10 50 L 20 60 M 20 50 L 10 60" stroke="#f87171" strokeWidth="2" className="stroke-red-400" />
                  <path d="M 30 50 L 40 60 M 40 50 L 30 60" stroke="#f87171" strokeWidth="2" className="stroke-red-400" />
    
                  {/* Nodes */}
                  <circle cx="50" cy="10" r="4" className="fill-white" />
                  
                  <circle cx="30" cy="35" r="3" className="fill-white" />
                  <circle cx="70" cy="35" r="3" className="fill-white" />
                  
                  <circle cx="20" cy="60" r="3" className="fill-white" />
                  <circle cx="40" cy="60" r="3" className="fill-white" />
                  <circle cx="60" cy="60" r="3" className="fill-white" />
                  <circle cx="80" cy="60" r="3" className="fill-white" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">4. Élagage (Pruning)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-red-300 bg-red-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">J(T) = Impureté(T) + α|T|</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Les arbres profonds s'adaptent trop au bruit (<strong>Overfitting</strong>). L'élagage (Pruning) coupe les branches terminales inutiles pour améliorer la généralisation à l'aide d'une pénalité α de complexité.
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <TreesMath />
    </div>
  );
}
