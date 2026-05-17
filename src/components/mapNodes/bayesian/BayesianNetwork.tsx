import React from 'react';


export default function BayesianNetwork() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         {/* Sketchy DAG */}
         <div className="flex justify-center w-full shrink-0">
         <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
               <marker id="arrowBNetSketch" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                 <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-white stroke-white" strokeWidth="1" strokeLinejoin="round" />
               </marker>
            </defs>
            
            {/* Nodes */}
            <path d="M 20,25 C 25,18 35,18 38,28 C 40,36 30,38 23,36 C 18,34 16,28 20,25 Z" className="fill-white/5 stroke-white/30" />
            <path d="M 68,23 C 75,18 80,22 83,28 C 85,34 78,38 72,37 C 65,36 62,30 68,23 Z" className="fill-white/5 stroke-white/30" />
            <path d="M 40,50 C 45,40 55,42 58,50 C 62,60 52,60 45,58 C 38,55 35,55 40,50 Z" className="fill-blue-400/20 stroke-blue-400" strokeWidth="2" />
            <path d="M 18,75 C 25,68 35,70 36,78 C 38,86 28,90 22,86 C 16,84 15,80 18,75 Z" className="fill-white/5 stroke-white/30" />
            <path d="M 72,74 C 78,68 85,72 84,78 C 82,86 75,88 70,84 C 65,80 66,76 72,74 Z" className="fill-white/5 stroke-white/30" />
  
             {/* Edges */}
            <path d="M 36,32 Q 40,38 46,45" markerEnd="url(#arrowBNetSketch)" className="stroke-white/50" />
            <path d="M 70,32 Q 65,38 58,44" markerEnd="url(#arrowBNetSketch)" className="stroke-white/50" />
            <path d="M 46,58 Q 40,65 32,71" markerEnd="url(#arrowBNetSketch)" className="stroke-white/50" />
            <path d="M 58,58 Q 63,65 72,72" markerEnd="url(#arrowBNetSketch)" className="stroke-white/50" />
         </svg>
         </div>
         
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">Réseaux Bayésiens (Graphes)</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">P(X) = ∏ P(X|Parents(X))</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Un graphe (DAG) qui modélise explicitement la <strong>causalité</strong>. Idéal quand l'interprétabilité est vitale. Permet d'inférer la probabilité de n'importe quel nœud sachant d'autres.
            </p>
         </div>
      </div>
      

      
      
    </div>
  );
}
