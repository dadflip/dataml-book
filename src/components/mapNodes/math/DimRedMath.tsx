import React from 'react';

export default function DimRedMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Réalité en Haute Dimension</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Le Fléau de la dimension */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="20" y="20" width="60" height="60" className="stroke-white/20 fill-white/5" strokeWidth="1" />
               <circle cx="80" cy="80" r="1.5" className="fill-red-400 stroke-none" />
               <circle cx="20" cy="20" r="1.5" className="fill-red-400 stroke-none" />
               <line x1="20" y1="20" x2="80" y2="80" className="stroke-red-400/50" strokeDasharray="2 2" strokeWidth="1" />
               <text x="50" y="50" fontSize="8" className="fill-white/80 stroke-none font-bold" transform="rotate(45 50 50) translate(0 -5)">Distance s'étire</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">La Malédiction (Curse)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Dans un espace à 1000 dimensions (ex: chaque pixel d'une image), le vide devient immense. Tous les points finissent par être presque à la même distance les uns des autres.
               </span>
            </div>
         </div>

         {/* PCA Projection */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               {/* Nuage 3D simulé */}
               <ellipse cx="50" cy="50" rx="40" ry="15" className="stroke-white/20 fill-none" transform="rotate(-30 50 50)" />
               <path d="M 15 70 L 85 30" className="stroke-violet-400" strokeWidth="2.5" />
               <path d="M 40 10 L 60 90" className="stroke-violet-400/40" strokeWidth="1" />
               <circle cx="50" cy="50" r="2" className="fill-white stroke-none" />
               <circle cx="35" cy="59" r="1.5" className="fill-white stroke-none" />
               <circle cx="65" cy="41" r="1.5" className="fill-white stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">PCA (Projection Linéaire)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 L'Analyse en Composantes Principales cherche les axes (directions) où les données s'étalent le plus (variance max). C'est comme trouver le meilleur angle pour prendre une photo d'un objet 3D en 2D.
               </span>
            </div>
         </div>
         
         {/* t-SNE / UMAP */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               {/* Topology */}
               <path d="M 10 50 Q 30 10 50 50 T 90 50" className="stroke-white/10" strokeWidth="8" fill="none" />
               <circle cx="20" cy="40" r="2" className="fill-violet-400 stroke-none" />
               <circle cx="25" cy="45" r="2" className="fill-violet-400 stroke-none" />
               <circle cx="30" cy="35" r="2" className="fill-violet-400 stroke-none" />
               
               <circle cx="70" cy="55" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="75" cy="50" r="2" className="fill-amber-400 stroke-none" />
               <circle cx="80" cy="60" r="2" className="fill-amber-400 stroke-none" />
               
               <path d="M 40 80 Q 50 90 60 80" className="stroke-white/40" strokeDasharray="1 2" fill="none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">t-SNE / UMAP (Topologie)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Plutôt que des droites rigides, ces algos mesurent les voisinages locaux en haute dimension et tentent de recréer une carte 2D flexible respectant l'idée de "qui est à côté de qui".
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path>
                 </svg>
                 Cas concret : Gènes et Cancers (Microscopie)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Un hôpital profile 10 000 gènes pour 50 patients atteints de leucémie. On se retrouve avec un tableau de 50 lignes (patients) et 10 000 colonnes (gènes). Il est presque impossible d'y appliquer un modèle simple sans risquer "l'overfit".
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">Compression (PCA) :</p>
                     <p>On applique une PCA qui dit : "En fait, 90% des différences entre ces patients s'expliquent par seulement <strong>3 grosses combinaisons de gènes</strong>".</p>
                     <p className="text-violet-400 font-bold">On passe de 10 000 colonnes à 3 colonnes !</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">Bénéfice direct :</p>
                     <p>En traçant ces 50 patients sur un graphe 3D avec nos 3 nouvelles colonnes, les médecins s'aperçoivent de l'existence de <strong>2 sous-groupes très distincts</strong>.</p>
                     <p>En réduisant le bruit (les 9997 colonnes inutiles), on a compressé l'information vitale, ce qui rend l'entraînement des modèles de survie beaucoup plus stable et rapide.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
