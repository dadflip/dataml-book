import React from 'react';


export default function UMAP() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         <div className="flex justify-center w-full">
            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               {/* Graph topology representation - nodes connecting together */}
               {/* Outline "fuzzy" manifold */}
               <path d="M 10,40 C 30,10 60,10 85,35" className="stroke-blue-400/10 fill-none" strokeWidth="10" />
               <path d="M 85,35 C 95,50 80,80 50,85" className="stroke-blue-400/10 fill-none" strokeWidth="10" />
               <path d="M 50,85 C 30,90 5,60 10,40" className="stroke-blue-400/10 fill-none" strokeWidth="10" />

               {/* Nodes */}
               <circle cx="20" cy="40" r="3" className="fill-white stroke-none" />
               <circle cx="35" cy="25" r="3" className="fill-white stroke-none" />
               <circle cx="50" cy="50" r="3" className="fill-white stroke-none" />
               <circle cx="65" cy="30" r="3" className="fill-white stroke-none" />
               <circle cx="85" cy="45" r="3" className="fill-white stroke-none" />
               <circle cx="75" cy="75" r="3" className="fill-white stroke-none" />
               <circle cx="45" cy="80" r="3" className="fill-white stroke-none" />

               {/* Edges building a topological manifold */}
               <path d="M 20,40 Q 28,32 35,25" strokeWidth="2" className="opacity-80 stroke-blue-400" />
               <path d="M 35,25 Q 42,38 50,50" strokeWidth="1.5" className="opacity-60 stroke-blue-400" />
               <path d="M 20,40 Q 35,45 50,50" strokeWidth="1.5" className="opacity-60 stroke-blue-400" />
               <path d="M 50,50 Q 58,40 65,30" strokeWidth="2" className="opacity-80 stroke-blue-400" />
               <path d="M 65,30 Q 75,38 85,45" strokeWidth="1.5" className="opacity-60 stroke-blue-400" />
               <path d="M 50,50 Q 68,48 85,45" strokeWidth="1" className="opacity-30 stroke-blue-400" strokeDasharray="3 3"/>
               <path d="M 85,45 Q 80,60 75,75" strokeWidth="2" className="opacity-80 stroke-blue-400" />
               <path d="M 75,75 Q 60,78 45,80" strokeWidth="1.5" className="opacity-60 stroke-blue-400" />
               <path d="M 50,50 Q 48,65 45,80" strokeWidth="1.5" className="opacity-60 stroke-blue-400" />
            </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">UMAP</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">Cross-Entropy(G<sub>H</sub>, G<sub>L</sub>)</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Repose sur une mathématique solide (géométrie Riemannienne). Il construit un maillage ("manifold") des données. Conserve bien mieux la <strong>structure globale</strong> que le t-SNE tout en s'exécutant plus rapidement.
            </p>
         </div>
      </div>

      

      <div className="flex flex-col mt-2 relative py-6 px-4 md:px-6 bg-white/[0.02] border border-white/5 rounded-xl">
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-emerald-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                 </svg>
                 Cas concret : Des Mots dans l'Espace (NLP)
             </span>
             <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-start text-left">
               <div className="flex justify-center w-full xl:w-1/3 shrink-0">
                  <svg viewBox="0 0 100 60" className="w-40 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     {/* Cluster Animaux/Nature */}
                     <circle cx="20" cy="20" r="15" className="fill-emerald-400/10 stroke-none" />
                     <text x="20" y="16" fontSize="4" className="stroke-none fill-emerald-400" textAnchor="middle">Chien</text>
                     <text x="14" y="22" fontSize="4" className="stroke-none fill-emerald-400" textAnchor="middle">Chat</text>
                     <text x="26" y="24" fontSize="4" className="stroke-none fill-emerald-400" textAnchor="middle">Forêt</text>
                     <text x="20" y="30" fontSize="5" className="stroke-none fill-emerald-400 font-bold opacity-50" textAnchor="middle">Nature</text>

                     {/* Distance line interpreting meaningful distance */}
                     <path d="M 35 25 L 65 35" className="stroke-white/30" strokeDasharray="2 2" />
                     <text x="50" y="28" fontSize="4" className="stroke-none fill-white/50" textAnchor="middle">Distance liée au sens</text>

                     {/* Cluster Tech */}
                     <circle cx="80" cy="40" r="15" className="fill-blue-400/10 stroke-none" />
                     <text x="80" y="36" fontSize="4" className="stroke-none fill-blue-400" textAnchor="middle">Robot</text>
                     <text x="74" y="42" fontSize="4" className="stroke-none fill-blue-400" textAnchor="middle">IA</text>
                     <text x="86" y="44" fontSize="4" className="stroke-none fill-blue-400" textAnchor="middle">Code</text>
                     <text x="80" y="50" fontSize="5" className="stroke-none fill-blue-400 font-bold opacity-50" textAnchor="middle">Tech</text>
                  </svg>
               </div>
               <p className="text-sm text-white/80 leading-relaxed">
                 <b>Le problème</b> : Vous avez des milliers de mots représentés par des embeddings (vecteurs de taille 300 par un modèle d'IA). Vous voulez explorer le lexique.<br/><br/>
                 <b>L'avantage UMAP</b> : t-SNE ferait des petits groupes dispersés au hasard. L'UMAP va placer les amas globaux de manière logique vis-à-vis des autres. Le nuage "Animaux" sera proche de la "Nature" et éloigné de "Technologie". Les distances longues restent interprétables ! Et UMAP est assez rapide pour scaler à des millions de points.
               </p>
             </div>
         </div>
      </div>
      

    </div>
  );
}
