import React from 'react';

export default function LinearMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Régression Linéaire & Optimisation</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Ligne de Régression */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 90 L 10 10 M 10 90 L 90 90" className="stroke-white/20" strokeWidth="1" />
               <circle cx="20" cy="70" r="1.5" className="fill-white stroke-none" />
               <circle cx="30" cy="50" r="1.5" className="fill-white stroke-none" />
               <circle cx="45" cy="40" r="1.5" className="fill-white stroke-none" />
               <circle cx="60" cy="35" r="1.5" className="fill-white stroke-none" />
               <circle cx="80" cy="15" r="1.5" className="fill-white stroke-none" />
               <path d="M 10 75 L 90 20" className="stroke-violet-400" strokeWidth="2.5" />
               <line x1="30" y1="50" x2="30" y2="61" className="stroke-red-400" strokeWidth="1" strokeDasharray="1,1" />
               <line x1="45" y1="40" x2="45" y2="51" className="stroke-red-400" strokeWidth="1" strokeDasharray="1,1" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Moindres Carrés</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Le but est de tracer la droite qui minimise la distance (l'erreur au carré) avec tous les points. Une équation simple : <span className="font-serif">y = ax + b</span>.
               </span>
            </div>
         </div>

         {/* Régression Logistique */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 90 L 10 10 M 10 90 L 90 90" className="stroke-white/20" strokeWidth="1" />
               <line x1="10" y1="50" x2="90" y2="50" className="stroke-white/20" strokeWidth="1" strokeDasharray="2,2" />
               <path d="M 10 85 Q 45 85 50 50 T 90 15" className="stroke-violet-400" strokeWidth="2.5" />
               <circle cx="20" cy="88" r="1.5" className="fill-blue-400 stroke-none" />
               <circle cx="35" cy="85" r="1.5" className="fill-blue-400 stroke-none" />
               <circle cx="65" cy="12" r="1.5" className="fill-amber-400 stroke-none" />
               <circle cx="80" cy="15" r="1.5" className="fill-amber-400 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">La Courbe Logistique</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Plutôt que de prédire une valeur continue, la courbe en "S" (Sigmoïde) écrase les valeurs entre 0 et 1 pour prédire des <strong>probabilités d'appartenance</strong> à une classe (Classification).
               </span>
            </div>
         </div>
         
         {/* Descente de gradient */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 20 Q 50 100 90 20" className="stroke-white/40" strokeWidth="2" />
               <circle cx="20" cy="35" r="3" className="fill-white stroke-none" />
               <path d="M 23 38 L 33 55" className="stroke-violet-400" strokeWidth="1.5" />
               <polygon points="33,55 29,51 34,49" className="fill-violet-400 stroke-none" />
               
               <circle cx="35" cy="58" r="3" className="fill-white stroke-none" />
               <path d="M 38 61 L 45 72" className="stroke-violet-400" strokeWidth="1.5" />
               <polygon points="45,72 40,68 45,66" className="fill-violet-400 stroke-none" />
               
               <circle cx="50" cy="80" r="3" className="fill-amber-400 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Descente de Gradient</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Comment trouver les bons paramètres ? On se "promène" sur la courbe d'erreur. À chaque pas, on calcule la pente (dérivée) et on va vers le point le plus bas (le minimum d'erreur).
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                 </svg>
                 Cas concret : Prédire le prix d'un appartement
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Imaginons qu'on veuille prédire le prix d'un appartement en fonction de sa surface. On a : <span className="font-serif">Prix = a × Surface + b</span>.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">L'Apprentissage :</p>
                     <p>Le modèle regarde 1000 annonces immobilières. Au début, il propose une droite au hasard (<span className="font-serif">a=1000, b=0</span>).</p>
                     <p>Il voit qu'il se trompe en moyenne de 100 000€.</p>
                     <p className="text-violet-400 font-bold">Via la descente de gradient, il ajuste `a` et `b` jusqu'à minimiser cette erreur.</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">L'Infèrence (Prédiction) :</p>
                     <p>Le modèle a finalement trouvé que la meilleure droite était <span className="font-serif">Prix = 5000 × Surface + 20000</span>.</p>
                     <p>Pour un nouvel appartement de 50m² :</p>
                     <p className="text-violet-400 font-bold">Prix Prédit = (5000 × 50) + 20000 = 270 000€.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
