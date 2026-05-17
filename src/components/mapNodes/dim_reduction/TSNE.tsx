import React from 'react';


export default function TSNE() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         <div className="flex justify-center w-full">
            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               {/* Cluster 1 Cloud */}
               <path d="M 18,22 C 25,10 45,15 42,25 C 40,35 25,45 20,38 C 15,30 10,35 18,22 Z" className="fill-blue-400/10 stroke-none" />
               <circle cx="25" cy="25" r="2.5" className="fill-white stroke-none" />
               <circle cx="32" cy="20" r="2.5" className="fill-white stroke-none" />
               <circle cx="35" cy="28" r="2.5" className="fill-white stroke-none" />
               <circle cx="28" cy="35" r="2.5" className="fill-white stroke-none" />
               
               {/* Cluster 2 Cloud */}
               <path d="M 60,70 C 70,55 95,65 92,75 C 90,85 75,95 65,88 C 55,80 50,85 60,70 Z" className="fill-blue-400/10 stroke-none" />
               <circle cx="70" cy="70" r="2.5" className="fill-white stroke-none" />
               <circle cx="78" cy="65" r="2.5" className="fill-white stroke-none" />
               <circle cx="82" cy="75" r="2.5" className="fill-white stroke-none" />
               <circle cx="75" cy="82" r="2.5" className="fill-white stroke-none" />
               <circle cx="85" cy="85" r="2.5" className="fill-white stroke-none" />
    
                {/* Interactions */}
               {/* Local attraction within cluster */}
               <path d="M 35,28 Q 30,22 25,25" className="stroke-blue-400" strokeDasharray="3 3" />
               
               {/* Global repulsion between clusters */}
               <path d="M 35,28 Q 50,50 70,70" className="stroke-red-400 opacity-60" strokeDasharray="2 4" strokeWidth="2" />
               <path d="M 48,45 L 53,53 M 48,45 L 43,49" strokeWidth="1.5" className="stroke-red-400 opacity-60" />
               
               {/* Arrows moving clusters apart */}
               <path d="M 15,15 L 10,10" className="stroke-white opacity-30" strokeWidth="2" />
               <path d="M 100,100 L 90,90" className="stroke-white opacity-30" strokeWidth="2" />
            </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">t-SNE</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">Min D<sub>KL</sub>(P || Q)</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Convertit les distances en probabilités ("Tu es proche de moi, donc tu es mon ami"). <strong>Non-linéaire</strong>. Privilégie la conservation du <strong>voisinage local</strong> créant de très beaux "groupes" (clusters) visuels.
            </p>
         </div>
      </div>
      
      

      <div className="flex flex-col mt-2 relative py-6 px-4 md:px-6 bg-white/[0.02] border border-white/5 rounded-xl">
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                 </svg>
                 Cas concret : Génomique (Single-Cell)
             </span>
             <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-start text-left">
               <div className="flex justify-center w-full xl:w-1/3 shrink-0">
                  <svg viewBox="0 0 100 60" className="w-40 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     {/* Raw data pile */}
                     <rect x="5" y="20" width="30" height="30" rx="4" className="stroke-white/20 fill-white/5" />
                     <path d="M 10 25 L 30 25 M 10 30 L 30 30 M 10 35 L 30 35 M 10 40 L 30 40 M 10 45 L 30 45" className="stroke-white/20" strokeWidth="1" />
                     <text x="20" y="15" fontSize="4" className="stroke-none fill-white/60 font-mono" textAnchor="middle">20000 Dimensions</text>
                     <path d="M 38 35 L 48 35 L 45 32 M 48 35 L 45 38" className="stroke-blue-400" />
                     <text x="43" y="30" fontSize="5" className="fill-blue-400 stroke-none font-bold" textAnchor="middle">t-SNE</text>

                     {/* Resulting 2D Island 1 */}
                     <path d="M 60,25 C 65,15 75,20 72,30 C 70,40 60,35 58,30 M 58,30" className="fill-emerald-400/20 stroke-none" />
                     <circle cx="65" cy="25" r="1.5" className="fill-emerald-400 stroke-none" />
                     <circle cx="68" cy="28" r="1.5" className="fill-emerald-400 stroke-none" />
                     <circle cx="62" cy="27" r="1.5" className="fill-emerald-400 stroke-none" />
                     <text x="65" y="15" fontSize="4" className="fill-emerald-400 stroke-none font-bold" textAnchor="middle">Cellules B</text>
                     
                     {/* Resulting 2D Island 2 */}
                     <path d="M 80,45 C 85,35 95,40 92,50 C 90,60 80,55 78,50 M 78,50" className="fill-purple-400/20 stroke-none" />
                     <circle cx="85" cy="45" r="1.5" className="fill-purple-400 stroke-none" />
                     <circle cx="88" cy="48" r="1.5" className="fill-purple-400 stroke-none" />
                     <circle cx="82" cy="47" r="1.5" className="fill-purple-400 stroke-none" />
                     <circle cx="85" cy="52" r="1.5" className="fill-purple-400 stroke-none" />
                     <text x="85" y="60" fontSize="4" className="fill-purple-400 stroke-none font-bold" textAnchor="middle">Cellules T</text>
                  </svg>
               </div>
               <p className="text-sm text-white/80 leading-relaxed">
                 <b>Problème</b> : Un biologiste a séquencé 10 000 cellules. Chaque cellule a 20 000 gènes (dimensions). Impossible de voir s'il y a des "types" de cellules différents.<br/><br/>
                 <b>La Magie t-SNE</b> : Il projette ces données en <b>2D</b>. L'algorithme place les cellules ayant une expression génétique proche à côté les unes des autres. Résultat : une magnifique carte avec des îlots distincts (Cellules T d'un côté, Cellules B de l'autre). Note: l'espace entre les îlots n'a pas vraiment de sens en t-SNE, seul le groupe local compte!
               </p>
             </div>
         </div>
      </div>
      

    </div>
  );
}
