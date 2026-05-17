import GeneticMath from './math/GeneticMath';
import React from 'react';


export default function GeneticNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Algorithmes Évolutifs</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Population</span>
              <span>{`{P_i}`}</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Évaluation</span>
              <span>Fitness <i>f</i>(<i>x</i>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Sélection</span>
              <span className="text-blue-400">Elite</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Croisement / Mutation</span>
              <span>Offspring</span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        {/* 1. Algo Genetique */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Parents */}
                  <text x="10" y="20" fontSize="6" className="fill-white stroke-none font-bold">Parents</text>
                  <rect x="10" y="25" width="30" height="10" className="fill-white/20 stroke-none" />
                  <rect x="40" y="25" width="20" height="10" className="fill-blue-400/50 stroke-none" />
                  <rect x="60" y="25" width="20" height="10" className="fill-white/20 stroke-none" />
    
                  <rect x="10" y="40" width="20" height="10" className="fill-blue-300/50 stroke-none" />
                  <rect x="30" y="40" width="30" height="10" className="fill-white/20 stroke-none" />
                  <rect x="60" y="40" width="20" height="10" className="fill-blue-300/50 stroke-none" />
    
                  {/* Crossover Arrow */}
                  <path d="M 40 55 L 40 65 L 50 65 M 60 55 L 60 65 L 50 65 " strokeWidth="1.5" className="opacity-60" />
                  <text x="75" y="60" fontSize="5" className="fill-white stroke-none font-mono opacity-80">Croisement</text>
                  
                  {/* Offspring */}
                  <text x="10" y="80" fontSize="6" className="fill-white stroke-none font-bold">Enfants</text>
                  <rect x="10" y="85" width="20" height="10" className="fill-blue-300/50 stroke-none" />
                  <rect x="30" y="85" width="30" height="10" className="fill-blue-400/50 stroke-none" />
                  <rect x="60" y="85" width="20" height="10" className="fill-white/20 stroke-none" />
    
                  {/* Mutation */}
                  <circle cx="45" cy="90" r="1.5" className="fill-white stroke-none" />
                  <text x="45" y="100" fontSize="4" className="fill-white stroke-none font-mono">Mutation</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Algorithme Génétique</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-green-300 bg-green-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Inspiré par Darwin</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Encode la solution sous forme de gènes (ex: binaire). Combine les meilleurs individus (<strong>Croisement</strong>) et introduit aléatoirement des <strong>Mutations</strong> pour explorer de nouvelles solutions.
                </p>
             </div>
           </div>

           {/* PIPELINE Genetic */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Voyageur de Commerce (TSP)</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="20" y="30" width="60" height="20" rx="2" className="fill-white/10 stroke-none" />
                       <text x="50" y="43" fontSize="8" className="fill-white stroke-none font-mono font-bold" textAnchor="middle">[Paris, Lyon, Nice]</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Trajet = ADN</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Ordre des villes</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="25" y="10" width="50" height="10" className="fill-blue-400/50 stroke-none" />
                       <rect x="25" y="25" width="50" height="10" className="fill-blue-400/50 stroke-none" />
                       <text x="50" y="55" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">1200 km (Best)</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Sélection</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Les plus courts</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="20" y="30" width="60" height="20" rx="2" className="fill-green-400/20 stroke-green-400" />
                       <text x="50" y="43" fontSize="8" className="fill-green-400 stroke-none font-mono font-bold" textAnchor="middle">[Lyon, Paris, Nice]</text>
                       <circle cx="30" cy="20" r="2" className="fill-white stroke-none" />
                       <circle cx="45" cy="20" r="2" className="fill-white stroke-none" />
                       <path d="M 30 20 Q 37 10 45 20" stroke="white" strokeWidth="1" fill="none" />
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Mutation</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Inverser 2 villes</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. PSO (Swarm) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 10 90 Q 50 50 90 90" strokeWidth="1" className="opacity-20" />
                  <path d="M 20 80 Q 50 60 80 80" strokeWidth="1" className="opacity-40" />
                  <path d="M 30 70 Q 50 70 70 70" strokeWidth="1" className="opacity-60" />
                  
                  <circle cx="50" cy="80" r="2" className="fill-blue-400 stroke-none" />
                  <text x="50" y="88" fontSize="5" className="fill-blue-400 stroke-none font-mono" textAnchor="middle">Global Best</text>
    
                  {/* Particle 1 */}
                  <circle cx="20" cy="40" r="2" className="fill-white stroke-none" />
                  <path d="M 20 40 L 30 50" strokeWidth="1" className="opacity-80" markerEnd="url(#arrowWhiteRL)" />
                  <path d="M 30 50 Q 40 65 48 76" strokeWidth="0.5" strokeDasharray="1,1" className="opacity-50 stroke-blue-400" />
    
                  {/* Particle 2 */}
                  <circle cx="80" cy="30" r="2" className="fill-white stroke-none" />
                  <path d="M 80 30 L 70 45" strokeWidth="1" className="opacity-80" markerEnd="url(#arrowWhiteRL)" />
                  
                  {/* Particle 3 */}
                  <circle cx="45" cy="20" r="2" className="fill-white stroke-none" />
                  <path d="M 45 20 L 48 35" strokeWidth="1" className="opacity-80" markerEnd="url(#arrowWhiteRL)" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Particle Swarm (PSO)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap"><i>v<sub>t+1</sub></i> = <i>w·v<sub>t</sub></i> + <i>c</i><sub>1</sub>(<i>p<sub>best</sub>-x</i>) + <i>c</i><sub>2</sub>(<i>g<sub>best</sub>-x</i>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Inspiré du comportement des bancs de poissons ou nuées d'oiseaux. Chaque particule se déplace selon son inertie, sa <strong>meilleure position personnelle</strong>, et la <strong>meilleure position globale</strong> connue de l'essaim.
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <GeneticMath />
    </div>
  );
}
