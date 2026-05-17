import KNNMath from './math/KNNMath';
import React from 'react';


export default function KNNNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : K-Plus Proches Voisins (K-NN)</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Dataset Mémorisé</span>
              <span><i>D</i> = {'{'}<b>x</b><i><sub>i</sub></i>, <i>y<sub>i</sub></i>{'}'}</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Recherche</span>
              <span><i>d</i>(<b>x</b><sub>new</sub>, <b>x</b><i><sub>i</sub></i>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Tri des K</span>
              <span>top_<i>K</i>(<i>D</i>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Agrégation</span>
              <span className="text-[#d8b4fe]">Vote (Mode)</span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        {/* 1. Concept K-NN */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Search point */}
                  <circle cx="50" cy="50" r="15" fill="none" className="stroke-white opacity-40 stroke-dasharray-[2,2]" />
                  <circle cx="50" cy="50" r="3" className="fill-blue-400" />
                  
                  {/* Class A (Squares) */}
                  <rect x="20" y="20" width="5" height="5" className="fill-white opacity-70" />
                  <rect x="35" y="40" width="5" height="5" className="fill-white opacity-70" />
                  <rect x="42" y="55" width="5" height="5" className="fill-white" /> {/* In radius */}
                  <rect x="30" y="60" width="5" height="5" className="fill-white opacity-70" />
                  
                  {/* Class B (Circles) */}
                  <circle cx="70" cy="30" r="3" className="fill-white opacity-70" />
                  <circle cx="65" cy="45" r="3" className="fill-white" /> {/* In radius */}
                  <circle cx="58" cy="58" r="3" className="fill-white" /> {/* In radius */}
                  <circle cx="80" cy="70" r="3" className="fill-white opacity-70" />
    
                  {/* Class B wins 2 vs 1 */}
                  <path d="M 50 50 L 44.5 57.5" strokeWidth="1" className="opacity-50" />
                  <path d="M 50 50 L 65 45" strokeWidth="1" className="opacity-50" />
                  <path d="M 50 50 L 58 58" strokeWidth="1" className="opacity-50" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Classification K-NN</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">{'{'}1_A, 2_B{'}'} → ŷ = B</span>
                   <span className="whitespace-nowrap mt-1">(où K = 3)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Pour inférer la classe d'un nouveau point, ce modèle regarde les K points d'apprentissage les plus proches en distance et applique un vote majoritaire. C'est un <strong>Lazy Learner</strong> : l'entraînement ne fait que stocker les données.
                </p>
             </div>
           </div>

           {/* PIPELINE KNN */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Recommandation de Films</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="50" cy="40" r="15" className="fill-white/10 stroke-none" />
                       <text x="50" y="44" fontSize="12" className="fill-white stroke-none font-bold" textAnchor="middle">User</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Cible</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Profil d'utilisateur</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="30" cy="40" r="8" className="fill-blue-400 stroke-none" />
                       <circle cx="50" cy="40" r="8" className="fill-blue-400 stroke-none" />
                       <circle cx="70" cy="40" r="8" className="fill-blue-400 stroke-none" />
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Proximité</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Trouver les 3 profils similaires</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="25" y="30" width="50" height="20" rx="4" className="fill-green-400/20 stroke-green-400" />
                       <text x="50" y="44" fontSize="8" className="fill-green-400 stroke-none font-bold" textAnchor="middle">"Avatar"</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Recommandation</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Le film qu'ils ont aimé</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Boundaries Non-Linéaires */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Field Background / Diagram to show Voronoi-like complex boundary */}
                  
                  {/* Decision Border */}
                  <path d="M 10 70 Q 30 70, 50 50 T 90 20" strokeWidth="2.5" />
                  
                  {/* Top/Right Area */}
                  <circle cx="45" cy="30" r="2.5" className="fill-white" />
                  <circle cx="60" cy="20" r="2.5" className="fill-white" />
                  <circle cx="75" cy="40" r="2.5" className="fill-white" />
                  <circle cx="90" cy="50" r="2.5" className="fill-white" />
                  
                  {/* Bottom/Left Area */}
                  <rect x="20" y="80" width="4" height="4" className="fill-white" />
                  <rect x="35" y="60" width="4" height="4" className="fill-white" />
                  <rect x="55" y="85" width="4" height="4" className="fill-white" />
                  <rect x="70" y="65" width="4" height="4" className="fill-white" />
                  
                  {/* Distance metrics lines to boundary */}
                  <line x1="45" y1="30" x2="43" y2="48" strokeWidth="1" strokeDasharray="1,2" className="opacity-50" />
                  <line x1="35" y1="60" x2="38" y2="48" strokeWidth="1" strokeDasharray="1,2" className="opacity-50" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Frontière de Décision</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-amber-300 bg-amber-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap"><i>K</i> Petit : Surapprentissage</span>
                   <span className="whitespace-nowrap mt-1"><i>K</i> Grand : Lissage (Biais)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Permet de capturer des géométries complexes très fortement non-linéaires. C'est l'équivalent de tracer un polygone de Voronoï lissé sur tout l'espace d'entrée. Très sensible à la <strong>malédiction de la dimensionnalité</strong>.
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <KNNMath />
    </div>
  );
}
