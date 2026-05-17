import React from 'react';

export default function ClusteringMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : L'Art du Regroupement</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* K-Means */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="30" cy="30" r="1.5" className="fill-white stroke-none" />
               <circle cx="25" cy="35" r="1.5" className="fill-white stroke-none" />
               <circle cx="35" cy="25" r="1.5" className="fill-white stroke-none" />
               <rect x="28" y="28" width="4" height="4" className="fill-violet-400 stroke-none" />
               <circle cx="30" cy="30" r="15" className="stroke-violet-400/30 fill-violet-400/10" />

               <circle cx="70" cy="70" r="1.5" className="fill-white stroke-none" />
               <circle cx="65" cy="75" r="1.5" className="fill-white stroke-none" />
               <circle cx="75" cy="65" r="1.5" className="fill-white stroke-none" />
               <rect x="68" y="68" width="4" height="4" className="fill-amber-400 stroke-none" />
               <circle cx="70" cy="70" r="15" className="stroke-amber-400/30 fill-amber-400/10" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">K-Means (Barycentres)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 On place K "centres" (centroïdes) au hasard. Chaque point se rattache au centre le plus proche. Puis le centre se déplace au milieu de ses points. On répète jusqu'à stabilité. Forme des amas sphériques.
               </span>
            </div>
         </div>

         {/* DBSCAN */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 20 50 Q 50 10 80 50" className="stroke-violet-400" strokeWidth="6" strokeLinecap="round" fill="none" />
               <path d="M 20 80 Q 50 40 80 80" className="stroke-amber-400" strokeWidth="6" strokeLinecap="round" fill="none" />
               {/* Bruit */}
               <circle cx="50" cy="85" r="1.5" className="fill-white/40 stroke-none" />
               <circle cx="10" cy="20" r="1.5" className="fill-white/40 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">DBSCAN (Densité)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Cherche des zones continues à haute densité de points, séparées par du vide. Parfait pour les formes complexes (ex: demi-lunes) et l'exclusion naturelle du "bruit" (les points isolés ne sont pas forcés dans un groupe).
               </span>
            </div>
         </div>
         
         {/* Hiérarchique */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 20 80 L 20 60 L 40 60 L 40 80" className="stroke-white/40" />
               <path d="M 60 80 L 60 60 L 80 60 L 80 80" className="stroke-white/40" />
               
               <path d="M 30 60 L 30 40 L 70 40 L 70 60" className="stroke-violet-400" />
               <path d="M 50 40 L 50 20" className="stroke-violet-400" />
               <line x1="10" y1="50" x2="90" y2="50" className="stroke-amber-400" strokeDasharray="2 2" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Clustering Hiérarchique</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Construit un "arbre" de groupes (Dendrogramme). Chaque point commence seul, puis on fusionne les deux plus proches, et ainsi de suite. On peut "couper" l'arbre à l'endroit désiré pour choisir le bon nombre de groupes.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                 </svg>
                 Cas concret : Ciblage Marketing (Segmentation Clients)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Une boutique en ligne possède les données de 5000 clients (Age, Revenu, Dépenses mensuelles) mais <strong>aucune étiquette</strong> explicite. On veut réaliser des campagnes mails personnalisées.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">Application de l'Algo (ex: K-Means avec K=3) :</p>
                     <p>On demande à K-Means de forcer la création de 3 profils types.</p>
                     <p>L'algo regroupe les clients minimisant les distances. On observe les "centroïdes" (la moyenne) de chaque groupe final.</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">Interprétation Humaine :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li><strong>Groupe 1</strong> (Revenu bas, Dépenses élevées) : <span className="text-violet-400 font-bold">Impulsifs</span> -&gt; Email "Promos Flash".</li>
                        <li><strong>Groupe 2</strong> (Age &gt; 50, Revenu Haut, Dépenses faibles) : <span className="text-violet-400 font-bold">Conservateurs aisés</span> -&gt; Email catalogue produits premium.</li>
                        <li><strong>Groupe 3</strong> (Revenu Haut, Dépenses Elevées) : <span className="text-violet-400 font-bold">VIP</span> -&gt; Accès avant-premières.</li>
                     </ul>
                     <p className="mt-2 text-[10px] text-white/50">Ce qui était un nuage de 5000 points est devenu une stratégie marketing claire.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
