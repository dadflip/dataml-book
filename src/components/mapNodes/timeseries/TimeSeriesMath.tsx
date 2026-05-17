import React from 'react';

export default function TimeSeriesMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Lissage Exponentiel & Mémoire</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Pondération Exponentielle */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 80 L 10 20 M 10 80 L 90 80" className="stroke-white/20" strokeWidth="1" />
               <path d="M 20 70 Q 40 40 80 20" className="stroke-amber-400" strokeWidth="2.5" />
               
               <line x1="20" y1="80" x2="20" y2="82" className="stroke-white/40" />
               <text x="20" y="90" fontSize="8" className="fill-white/60 stroke-none font-mono" textAnchor="middle">Hier</text>

               <line x1="50" y1="80" x2="50" y2="82" className="stroke-white/40" />
               <text x="50" y="90" fontSize="8" className="fill-white/60 stroke-none font-mono" textAnchor="middle">J-5</text>

               <line x1="80" y1="80" x2="80" y2="82" className="stroke-white/40" />
               <text x="80" y="90" fontSize="8" className="fill-white/60 stroke-none font-mono" textAnchor="middle">J-10</text>
               
               <text x="10" y="10" fontSize="8" className="fill-amber-400 stroke-none font-bold" textAnchor="start">Poids (Importance)</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Pondération Décroissante</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Plutôt que de faire une simple moyenne de tout l'historique, on donne plus d'importance aux <strong>données récentes</strong>. Le poids diminue de façon exponentielle au fur et à mesure qu'on remonte dans le temps.
               </span>
            </div>
         </div>

         {/* La Formule Simple */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="5" y="25" width="90" height="50" rx="4" className="stroke-white/40 fill-white/5" />
               <text x="50" y="45" fontSize="9" className="stroke-none fill-amber-400 font-bold font-serif" textAnchor="middle">S(t) = α·y(t) + (1-α)·S(t-1)</text>
               <text x="50" y="65" fontSize="8" className="stroke-none fill-white/60 font-serif" textAnchor="middle">Lissage Exponentiel Simple</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Le facteur α (Alpha)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Le paramètre de lissage <span className="font-serif font-bold text-amber-400">α</span> va de 0 à 1. Si <span className="font-serif">α ≈ 1</span>, le modèle s'adapte très vite aux changements. Si <span className="font-serif">α ≈ 0</span>, le modèle a une très grande inertie et lisse fortement le bruit.
               </span>
            </div>
         </div>
         
         {/* Composantes Avancées */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 60 Q 20 60 30 40 T 50 30 T 70 30 T 90 20" className="stroke-white/20" strokeWidth="1" strokeDasharray="2,2" />
               <path d="M 10 50 L 30 40 L 50 60 L 70 40 L 90 60" className="stroke-white/40" strokeWidth="1" />
               
               <path d="M 10 80 Q 20 60 30 70 T 50 60 T 70 60 T 90 40" className="stroke-amber-400" strokeWidth="2" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Tendance & Saison</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Pour les données complexes, <strong>Holt-Winters</strong> ajoute 2 équations similaires : l'une pour capter la tendance globale (<span className="font-serif">β</span>) et l'autre pour retenir le motif saisonnier (<span className="font-serif">γ</span>).
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-amber-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                 </svg>
                 Cas concret : Prédiction des Ventes avec α = 0.5
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Imaginons qu'on gère une boulangerie. Notre historique commence, la estimation initiale de nos ventes (notre inertie <span className="font-serif">S<sub>0</sub></span>) était fixée à <strong>100</strong> croissants.
                </p>
                
                <p>
                  L'équation est : <span className="font-serif text-amber-400 font-bold block mt-1">Nouvelle Prédiction = 0.5 × Ventes du Jour + 0.5 × Ancienne Prédiction</span>
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">Lundi :</p>
                     <p>Il pleut, on ne vend que <strong>50</strong> croissants.</p>
                     <p>Prédiction pour Mardi = (0.5 × 50) + (0.5 × 100)</p>
                     <p className="text-amber-400 font-bold">Prédiction pour Mardi = 25 + 50 = 75 croissants.</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">Mardi :</p>
                     <p>Il fait beau, on vend <strong>110</strong> croissants ! (L'affluence est de retour)</p>
                     <p>Prédiction pour Mercredi = (0.5 × 110) + (0.5 × 75)</p>
                     <p className="text-amber-400 font-bold">Prédiction pour Mercredi = 55 + 37.5 = 92.5 croissants.</p>
                   </div>
                </div>
                
                <p className="mt-2">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-white/50 block">Moralité</span>
                  L'inertie (le paramètre <span className="font-serif text-amber-400">α</span>) détermine si le modèle doit paniquer. Si <span className="font-serif">α</span> avait été <strong>0.9</strong>, le modèle aurait commandé 55 croissants pour Mardi suite à la pluie (s'adaptant trop vite au bruit) et on se serait retrouvé en rupture de stock.
                </p>
             </div>
         </div>
       </div>

    </div>
  );
}
