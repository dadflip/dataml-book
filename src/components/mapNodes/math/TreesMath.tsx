import React from 'react';

export default function TreesMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Arbres & Forêts</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Arbre de décision */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="50" cy="15" r="8" className="fill-white/10 stroke-white/40" />
               <text x="50" y="18" fontSize="6" className="fill-white stroke-none font-sans" textAnchor="middle">&gt; 30?</text>
               
               <path d="M 45 22 L 25 35" className="stroke-white/30" />
               <path d="M 55 22 L 75 35" className="stroke-white/30" />
               
               <circle cx="25" cy="40" r="8" className="fill-white/10 stroke-white/40" />
               <circle cx="75" cy="40" r="8" className="fill-white/10 stroke-white/40" />
               
               <path d="M 21 47 L 10 60" className="stroke-white/30" />
               <path d="M 29 47 L 40 60" className="stroke-white/30" />
               
               <rect x="5" y="60" width="10" height="10" className="fill-violet-400 stroke-none" />
               <rect x="35" y="60" width="10" height="10" className="fill-amber-400 stroke-none" />
               <rect x="70" y="48" width="10" height="10" className="fill-violet-400 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Partition de l'Espace</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Un arbre de décision pose une série de questions (Ex: Age &gt; 30?). Chaque nœud coupe l'espace en deux jusqu'à arriver à des "feuilles" homogènes (une prédiction pure).
               </span>
            </div>
         </div>

         {/* Random Forest */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 20 20 L 10 40 L 30 40 Z" className="fill-white/10 stroke-white/40" />
               <path d="M 50 20 L 40 40 L 60 40 Z" className="fill-white/10 stroke-white/40" />
               <path d="M 80 20 L 70 40 L 90 40 Z" className="fill-white/10 stroke-white/40" />
               
               <path d="M 20 45 L 50 70 M 50 45 L 50 70 M 80 45 L 50 70" className="stroke-violet-400" strokeDasharray="2 2" />
               <circle cx="50" cy="80" r="10" className="fill-violet-400 stroke-none" />
               <text x="50" y="83" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">VOTE</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Random Forest (Bagging)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Plutôt qu'un seul arbre puissant mais qui apprend "par cœur" (Overfitting), on crée 100 arbres moyens sur des sous-échantillons. La prédiction finale est un <strong>vote à la majorité</strong>.
               </span>
            </div>
         </div>
         
         {/* Gradient Boosting */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 30 L 5 45 L 15 45 Z" className="fill-white/10 stroke-white/40" />
               <text x="25" y="40" fontSize="12" className="fill-white stroke-none font-bold">+</text>
               <path d="M 40 30 L 35 45 L 45 45 Z" className="fill-violet-400/50 stroke-violet-400" />
               <text x="55" y="40" fontSize="12" className="fill-white stroke-none font-bold">+</text>
               <path d="M 70 30 L 65 45 L 75 45 Z" className="fill-violet-400 stroke-violet-400/80" />
               
               <path d="M 42 55 L 42 75 L 70 75" className="stroke-white/30" strokeWidth="1" fill="none" />
               <text x="55" y="85" fontSize="8" className="fill-white/60 stroke-none text-center">Correction séquentielle</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Gradient Boosting</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Les arbres sont construits l'un après l'autre. Le premier fait une prédiction, le deuxième essaie de prédire <strong>l'erreur du premier</strong>, le troisième corrige l'erreur du deuxième, etc.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"></path>
                 </svg>
                 Cas concret : Faut-il accorder un crédit bancaire ?
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Imaginons qu'on utilise un Random Forest avec 5 arbres pour décider d'accorder ou non un prêt à un client.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">Les Votes des arbres :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li>Arbre 1 (Expert en patrimoine &gt; 50k€) : <strong className="text-violet-400">Oui</strong></li>
                        <li>Arbre 2 (Expert en défauts de paiement passés) : <strong className="text-red-400">Non</strong></li>
                        <li>Arbre 3 (Expert en profil jeune actif) : <strong className="text-violet-400">Oui</strong></li>
                        <li>Arbre 4 (Modèle généraliste) : <strong className="text-violet-400">Oui</strong></li>
                        <li>Arbre 5 (Expert en dette existante) : <strong className="text-red-400">Non</strong></li>
                     </ul>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">L'Agrégation (Bagging) :</p>
                     <p>On a 3 votes "Oui" contre 2 votes "Non".</p>
                     <p className="text-violet-400 font-bold">Résultat : Le crédit est accordé avec une confiance de 60%.</p>
                     <p className="mt-1 text-[10px] text-white/50">L'avantage du Random Forest est sa robustesse : si l'Arbre 2 s'est trompé à cause d'une anomalie dans les données d'entraînement, le vote majoritaire compense.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
