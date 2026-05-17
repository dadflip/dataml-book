import React from 'react';

export default function GNNMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Modéliser le monde en Graphes (GNN)</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 mt-4">
         
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 20 20 L 50 50 M 80 20 L 50 50 M 20 80 L 50 50 M 80 80 L 50 50" className="stroke-white/30" strokeWidth="2" />
               <circle cx="20" cy="20" r="5" className="fill-blue-400 stroke-none" />
               <circle cx="80" cy="20" r="5" className="fill-amber-400 stroke-none" />
               <circle cx="20" cy="80" r="5" className="fill-green-400 stroke-none" />
               <circle cx="80" cy="80" r="5" className="fill-red-400 stroke-none" />
               
               <circle cx="50" cy="50" r="8" className="fill-violet-400 stroke-none" />
               <circle cx="50" cy="50" r="15" className="stroke-violet-400/50" strokeDasharray="2 2" strokeWidth="1" fill="none" />
               
               <path d="M 28 28 L 42 42" className="stroke-white" />
               <polygon points="42,42 38,39 39,45" className="fill-white stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Message Passing</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Dans un réseau social ou une molécule, les pixels et tableaux 2D ne marchent pas. Dans un GNN, chaque Nœud met à jour son état ("sa couleur") en agglomérant les messages envoyés par tous ses voisins connectés. 
               </span>
            </div>
         </div>

       </div>
    </div>
  );
}
