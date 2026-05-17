import React from 'react';

export default function SVMMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Frontières et Dimensions Supplémentaires</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* La Marge Maximale */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="20" cy="20" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="30" cy="15" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="15" cy="30" r="2" className="fill-blue-400 stroke-none" />
               
               <circle cx="80" cy="80" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="70" cy="85" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="85" cy="70" r="2" className="fill-amber-400 stroke-none" />
               
               <path d="M 10 90 L 90 10" className="stroke-violet-400" strokeWidth="2" />
               <path d="M 20 100 L 100 20" className="stroke-white/20" strokeDasharray="2 2" />
               <path d="M 0 80 L 80 0" className="stroke-white/20" strokeDasharray="2 2" />
               
               {/* Support vectors */}
               <circle cx="45" cy="35" r="3" className="stroke-blue-400 fill-none" />
               <circle cx="45" cy="35" r="1.5" className="fill-blue-400 stroke-none" />
               <circle cx="55" cy="65" r="3" className="stroke-amber-400 fill-none" />
               <circle cx="55" cy="65" r="1.5" className="fill-amber-400 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Marge Maximale</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Les SVM ne cherchent pas n'importe quelle ligne pour séparer les classes, ils cherchent <strong>LA ligne ayant la plus grande marge de sécurité</strong>. Seuls les points les plus proches (Support Vectors) influencent la frontière.
               </span>
            </div>
         </div>

         {/* L'Astuce du Noyau (Kernel Trick) */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               {/* 2D non linearly separable */}
               <circle cx="20" cy="50" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="30" cy="55" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="40" cy="45" r="2" className="fill-amber-400 stroke-none" />
               
               <path d="M 45 50 Q 50 20 55 50" className="stroke-violet-400" fill="none" strokeWidth="1" strokeDasharray="2 2" />
               <polygon points="55,50 52,45 58,45" className="fill-violet-400 stroke-none" />
               
               {/* 3D linearly separable */}
               <path d="M 70 60 Q 80 40 90 60" className="stroke-white/10" fill="none" strokeWidth="1" />
               <circle cx="70" cy="60" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="80" cy="40" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="90" cy="60" r="2" className="fill-amber-400 stroke-none" />
               <path d="M 60 50 L 100 50" className="stroke-violet-400" strokeWidth="1.5" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Le Noyau (Kernel Trick)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Si les ronds bleus sont entourés de carrés jaunes, aucune ligne droite ne peut les séparer. L'astuce est de <strong>projeter les points dans un espace en 3D</strong> où une simple "feuille" (Hyperplan) pourra les couper.
               </span>
            </div>
         </div>
         
         {/* Marge Souple */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="20" cy="20" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="30" cy="15" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="70" cy="70" r="2" className="fill-blue-400 stroke-none" /> {/* Outlier */}
               
               <circle cx="80" cy="80" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="85" cy="70" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="25" cy="35" r="2" className="fill-amber-400 stroke-none" /> {/* Outlier */}
               
               <path d="M 10 90 L 90 10" className="stroke-violet-400" strokeWidth="2" />
               <path d="M 67 67 L 73 73 M 73 67 L 67 73" className="stroke-red-400" strokeWidth="1" /> {/* Cross over outlier */}
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Paramètre C (Marge Souple)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Dans la vraie vie, les données sont "sales". Plutôt que de tordre la frontière pour ne faire aucune erreur (Overfitting), on autorise certaines erreurs. Le paramètre C est le "prix" de ces erreurs.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                 </svg>
                 Cas concret : Classification des Textes (Spam ou Non-Spam)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Dans les années 2000, avant l'hégémonie du Deep Learning, les SVM étaient l'arme absolue pour filtrer vos emails.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">L'Espace des Mots (Haute Dimension) :</p>
                     <p>Si la langue française a 50 000 mots, chaque email est un point dans un espace de taille 50 000. L'axe "Viagra" vaut 1 si le mot y figure, 0 sinon.</p>
                     <p className="text-violet-400 font-bold">Un SVM trouve l'Hyperplan (un "mur" en 49 999 dimensions) parfait qui coupe cet espace pour laisser d'un côté la boîte de réception légitime, et de l'autre le dossier Spams.</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">L'efficacité des Support Vectors :</p>
                     <p>Le SVM se fiche de la majorité des milliers d'emails évidents ("Coucou maman"). Seuls les "cas limites" posent le mur de la frontière :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li>Un mail qui dit <i>"Gagne de l'argent"</i> mais qui est en fait votre banque (<strong className="text-blue-400">Non-Spam limite</strong>).</li>
                        <li>Un mail qui dit <i>"Remboursement urgent"</i> mais sans logo (<strong className="text-amber-400">Spam limite</strong>).</li>
                     </ul>
                     <p className="mt-2 text-[10px] text-white/50">C'est la beauté du SVM : il compresse son apprentissage sur les quelques points les plus durs à discriminer (les fameux Vecteurs de Support).</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
