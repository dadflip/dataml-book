import React from 'react';

export default function KNNMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Les Plus Proches Voisins (K-NN)</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 mt-4">
         
         {/* K-NN */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="20" cy="30" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="30" cy="20" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="25" cy="40" r="2" className="fill-blue-400 stroke-none" />
               
               <circle cx="80" cy="70" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="70" cy="80" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="85" cy="60" r="2" className="fill-amber-400 stroke-none" />
               
               {/* New Point */}
               <circle cx="50" cy="50" r="3" className="fill-white stroke-none" />
               
               {/* 3 Nearest */}
               <path d="M 50 50 L 25 40" className="stroke-white/40" strokeDasharray="1 2" />
               <path d="M 50 50 L 70 80" className="stroke-white/40" strokeDasharray="1 2" />
               <path d="M 50 50 L 80 70" className="stroke-white/40" strokeDasharray="1 2" />
               
               <circle cx="50" cy="50" r="38" className="stroke-violet-400/50" strokeDasharray="2 2" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Vote de voisinage</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Ce modèle "paresseux" n'apprend aucune équation mathématique. Devant un nouvel objet, il vérifie simplement la classe de ses K voisins les plus proches. Si K=3 et que 2 sont bleus et 1 est jaune, l'objet devient bleu.
               </span>
            </div>
         </div>

       </div>
    </div>
  );
}
