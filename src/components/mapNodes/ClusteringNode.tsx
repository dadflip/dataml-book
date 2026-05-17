import ClusteringMath from './math/ClusteringMath';
import React from 'react';


export default function ClusteringNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Clustering</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Données Brutes</span>
              <span><i>D</i> = {'{'}<b>x</b><i><sub>i</sub></i>{'}'}</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Métrique</span>
              <span>Distance <i>d</i>(<b>x</b>, <b>y</b>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Algorithme</span>
              <span>Optimisation</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Résultat</span>
              <span className="text-blue-400"><i>K</i> Clusters (C<i><sub>k</sub></i>)</span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* 1. K-Means */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Cluster 1 */}
                  <circle cx="30" cy="30" r="2.5" className="fill-white opacity-40" />
                  <circle cx="20" cy="25" r="2.5" className="fill-white opacity-40" />
                  <circle cx="38" cy="40" r="2.5" className="fill-white opacity-40" />
                  <circle cx="25" cy="42" r="2.5" className="fill-white opacity-40" />
                  {/* Centroid 1 */}
                  <path d="M 28 28 L 36 36 M 36 28 L 28 36" strokeWidth="2" className="stroke-blue-400" />
                  {/* Voronoi cell approximate */}
                  <polygon points="5,5 50,20 40,60 5,60" strokeWidth="1" strokeDasharray="2,2" className="opacity-30" />
    
                  {/* Cluster 2 */}
                  <circle cx="70" cy="70" r="2.5" className="fill-white opacity-40" />
                  <circle cx="85" cy="65" r="2.5" className="fill-white opacity-40" />
                  <circle cx="65" cy="85" r="2.5" className="fill-white opacity-40" />
                  <circle cx="80" cy="80" r="2.5" className="fill-white opacity-40" />
                  {/* Centroid 2 */}
                  <path d="M 71 69 L 79 77 M 79 69 L 71 77" strokeWidth="2" className="stroke-blue-400" />
                  <polygon points="50,20 95,5 95,95 40,60" strokeWidth="1" strokeDasharray="2,2" className="opacity-30" />
                  
                  {/* Lines from points to centroids showing assignment */}
                  <line x1="32" y1="32" x2="38" y2="40" strokeWidth="1" className="opacity-40" />
                  <line x1="32" y1="32" x2="25" y2="42" strokeWidth="1" className="opacity-40" />
                  <line x1="75" y1="73" x2="65" y2="85" strokeWidth="1" className="opacity-40" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. K-Means</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">min Σ ||<b>x</b><i><sub>i</sub></i> - <i>μ<sub>k</sub></i>||²</span>
                   <span className="whitespace-nowrap mt-1">(où <i>μ<sub>k</sub></i> = Centroïde)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Algorithme itératif paramétrique : affecte les points au centroïde le plus proche, puis recalcule les centroïdes. Sensible aux valeurs extrêmes et nécessite de choisir K à l'avance. Crée des clusters convexes (Voronoï).
                </p>
             </div>
           </div>

           {/* PIPELINE K-Means */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Segmentation Client</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="30" cy="50" r="2" className="fill-white stroke-none" />
                       <circle cx="40" cy="60" r="2" className="fill-white stroke-none" />
                       <circle cx="70" cy="30" r="2" className="fill-white stroke-none" />
                       <circle cx="80" cy="20" r="2" className="fill-white stroke-none" />
                       <path d="M 10 70 L 90 70 M 10 70 L 10 10" className="opacity-30" />
                       <text x="50" y="80" fontSize="6" className="fill-white stroke-none">Âge</text>
                       <text x="5" y="40" fontSize="6" className="fill-white stroke-none" transform="rotate(-90 5 40)">Dépense</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Données Brutes</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Âge vs Dépenses</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="30" cy="50" r="2" className="fill-blue-400 stroke-none" />
                       <circle cx="40" cy="60" r="2" className="fill-blue-400 stroke-none" />
                       <circle cx="70" cy="30" r="2" className="fill-pink-400 stroke-none" />
                       <circle cx="80" cy="20" r="2" className="fill-pink-400 stroke-none" />
                       
                       <path d="M 33 53 L 37 57 M 37 53 L 33 57" strokeWidth="2" className="stroke-white" />
                       <path d="M 73 23 L 77 27 M 77 23 L 73 27" strokeWidth="2" className="stroke-white" />
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Centres (K=2)</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Trouver 2 groupes (X)</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="30" cy="55" r="20" className="fill-blue-400/20 stroke-blue-400" />
                       <text x="30" y="58" fontSize="6" className="fill-blue-400 stroke-none font-bold" textAnchor="middle">Etudiants</text>
                       <circle cx="75" cy="25" r="18" className="fill-pink-400/20 stroke-pink-400" />
                       <text x="75" y="27" fontSize="6" className="fill-pink-400 stroke-none font-bold" textAnchor="middle">Cadres</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Profilage</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Comprendre qui = quoi</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. DBSCAN */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Non-convex cluster */}
                  {/* Inner points (Core) */}
                  <circle cx="30" cy="50" r="2" className="fill-blue-400" />
                  <circle cx="40" cy="35" r="2" className="fill-blue-400" />
                  <circle cx="55" cy="30" r="2" className="fill-blue-400" />
                  <circle cx="70" cy="35" r="2" className="fill-blue-400" />
                  <circle cx="80" cy="50" r="2" className="fill-blue-400" />
                  
                  {/* Epsilon circles around cores */}
                  <circle cx="30" cy="50" r="10" className="stroke-blue-400 opacity-30 stroke-[0.5]" />
                  <circle cx="40" cy="35" r="10" className="stroke-blue-400 opacity-30 stroke-[0.5]" />
                  <circle cx="55" cy="30" r="10" className="stroke-blue-400 opacity-30 stroke-[0.5]" />
                  
                  {/* Boundary points */}
                  <circle cx="23" cy="55" r="2" className="fill-white opacity-60" />
                  <circle cx="78" cy="42" r="2" className="fill-white opacity-60" />
                  
                  {/* Noise (Outlier) */}
                  <circle cx="20" cy="20" r="2" className="fill-red-400 stroke-none" />
                  <text x="25" y="15" fontSize="6" className="fill-red-400 stroke-none font-bold">Noise</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. DBSCAN (Densité)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-green-300 bg-green-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Paramètres: <i>ε</i> (rayon), <i>MinPts</i></span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Regroupe les points fortement denses. Peut découvrir des clusters de <strong>formes arbitraires</strong> (non-convexes) et identifie naturellement les anomalies (bruit). Ne nécessite pas de définir le nombre K.
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <ClusteringMath />
    </div>
  );
}
