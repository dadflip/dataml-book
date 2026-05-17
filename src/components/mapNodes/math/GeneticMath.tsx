import React from 'react';

export default function GeneticMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Évolution Artificielle</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 mt-4">
         
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="10" y="20" width="10" height="15" className="fill-amber-400 stroke-none" />
               <rect x="25" y="20" width="10" height="15" className="fill-blue-400 stroke-none" />
               <rect x="40" y="20" width="10" height="15" className="fill-amber-400 stroke-none" />
               
               <rect x="60" y="20" width="10" height="15" className="fill-violet-400 stroke-none" />
               <rect x="75" y="20" width="10" height="15" className="fill-green-400 stroke-none" />
               <rect x="90" y="20" width="10" height="15" className="fill-violet-400 stroke-none" />
               
               <path d="M 30 45 L 45 60 M 80 45 L 65 60" className="stroke-white/40" strokeWidth="2" />
               
               {/* Child crossover */}
               <rect x="40" y="70" width="10" height="15" className="fill-amber-400 stroke-none" />
               <rect x="55" y="70" width="10" height="15" className="fill-green-400 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Croisement et Mutation</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Inspiré par Darwin. On génère 100 solutions aléatoires, on élimine les pires (Sélection), et on mélange les "gènes" (morceaux de code) des meilleures pour créer une nouvelle génération. Avec de légères mutations (hasard) pour éviter de tourner en rond.
               </span>
            </div>
         </div>

       </div>
    </div>
  );
}
