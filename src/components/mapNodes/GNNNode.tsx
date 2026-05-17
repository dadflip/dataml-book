import GNNMath from './math/GNNMath';
import React from 'react';


export default function GNNNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Graph Neural Networks (GNN)</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Graphe & Noeuds</span>
              <span><b>G</b> = (<b>V</b>, <b>E</b>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Message Passing</span>
              <span><i>Agregation</i>(<b>V</b><i><sub>voisins</sub></i>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Mise à Jour</span>
              <span className="text-[#8b5cf6]"><b>H</b><i><sub>node</sub></i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Prédiction</span>
              <span className="text-[#8b5cf6]">Node / Edge / Graph</span>
           </div>
        </div>
      </div>

      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
         {/* 1. Message Passing */}
         <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center w-full shrink-0">
                <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   {/* Central Node */}
                   <circle cx="50" cy="50" r="12" className="fill-[#8b5cf6] stroke-none" />
                   <text x="50" y="54" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">v</text>
    
                   {/* Neighbors */}
                   <circle cx="20" cy="20" r="10" className="fill-white/20 stroke-none" />
                   <text x="20" y="24" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">u1</text>
                   <path d="M 28 28 L 42 42" strokeWidth="1.5" className="opacity-80" markerEnd="url(#arrowWhiteGNN)" />
    
                   <circle cx="80" cy="30" r="10" className="fill-white/20 stroke-none" />
                   <text x="80" y="34" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">u2</text>
                   <path d="M 72 36 L 58 45" strokeWidth="1.5" className="opacity-80" markerEnd="url(#arrowWhiteGNN)" />
    
                   <circle cx="30" cy="80" r="10" className="fill-white/20 stroke-none" />
                   <text x="30" y="84" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">u3</text>
                   <path d="M 35 73 L 45 58" strokeWidth="1.5" className="opacity-80" markerEnd="url(#arrowWhiteGNN)" />
    
                   <defs>
                      <marker id="arrowWhiteGNN" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                         <polygon points="0,0 6,3 0,6" className="fill-white stroke-none" />
                      </marker>
                   </defs>
                   
                   {/* Aggregation text */}
                   <text x="75" y="80" fontSize="9" className="fill-white stroke-none opacity-80 font-mono" textAnchor="middle">h_v = f(Σ h_u)</text>
                </svg>
              </div>
              
              <div className="flex flex-col gap-3 text-left">
                 <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Message Passing</h2>
                 <div className="flex flex-col font-mono text-[10px] md:text-sm text-purple-300 bg-purple-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                    <span className="whitespace-nowrap">Agrégation de voisinage</span>
                 </div>
                 <p className="text-sm leading-relaxed text-white/70">
                   Le cœur d'un GNN est le <strong>Message Passing</strong>. À chaque couche du réseau (ou "hop"), un noeud rassemble et agrège mathématiquement les "messages" (les vecteurs de caractéristiques) de ses <strong>voisins directement connectés</strong>. Il combine ensuite cette information avec son propre état actuel pour le mettre à jour.<br/><br/>
                   Après <i>k</i> couches itératives, un noeud intègre non seulement ses propres informations initiales, mais aussi la structure globale et les attributs du graphe jusqu'à une distance de <i>k</i> sauts. C'est idéal pour déceler des clusters, des fraudes en cascade, ou le rôle pivot d'un compte sur Twitter.
                 </p>
              </div>
            </div>

            {/* PIPELINE GNN */}
            <div className="flex flex-col gap-4 mt-6">
               <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Suggestion d'Amis</span>
               <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                     <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                        <circle cx="50" cy="40" r="10" className="fill-[#8b5cf6] stroke-none" />
                        <circle cx="20" cy="40" r="8" className="fill-white/10 stroke-none" />
                        <circle cx="80" cy="40" r="8" className="fill-white/10 stroke-none" />
                        <path d="M 30 40 L 40 40 M 60 40 L 70 40" className="stroke-white" />
                     </svg>
                     <div className="flex flex-col gap-1 items-center text-left">
                        <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Graphe</span>
                        <span className="text-[10px] md:text-xs text-white/60 text-center">Réseau Social</span>
                     </div>
                  </div>
                  
                  <div className="flex shrink-0 mt-8 md:mt-10">
                    <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
   
                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                     <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                        <circle cx="50" cy="40" r="15" className="fill-[#8b5cf6]/30 stroke-[#8b5cf6]" />
                        <path d="M 30 40 Q 50 20 70 40" strokeWidth="1" strokeDasharray="2,2" className="stroke-white/50" />
                     </svg>
                     <div className="flex flex-col gap-1 items-center text-left">
                        <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Propagation</span>
                        <span className="text-[10px] md:text-xs text-white/60 text-center">Récupère infos des amis</span>
                     </div>
                  </div>
                  
                  <div className="flex shrink-0 mt-8 md:mt-10">
                    <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
   
                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                     <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                        <path d="M 50 10 L 50 70 M 10 40 L 90 40" className="opacity-10" />
                        <circle cx="65" cy="25" r="4" className="fill-[#8b5cf6] stroke-none" />
                        <circle cx="70" cy="30" r="4" className="fill-white/80 stroke-none" />
                        <path d="M 65 25 L 70 30" strokeWidth="1" className="stroke-[#8b5cf6]" strokeDasharray="1,1" />
                     </svg>
                     <div className="flex flex-col gap-1 items-center text-left">
                        <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Embeddings</span>
                        <span className="text-[10px] md:text-xs text-white/60 text-center">Profils similaires proches</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* 2. Types de Tâches */}
         <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center w-full shrink-0">
                <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   {/* Node Level */}
                   <circle cx="25" cy="25" r="8" className="fill-[#8b5cf6]/50 stroke-[#8b5cf6]" />
                   <circle cx="15" cy="10" r="4" className="stroke-white/40" />
                   <circle cx="40" cy="15" r="4" className="stroke-white/40" />
                   <line x1="18" y1="13" x2="21" y2="20" strokeWidth="1.5" />
                   <line x1="36" y1="17" x2="30" y2="22" strokeWidth="1.5" />
                   <text x="25" y="45" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Node Classif.</text>
    
                   {/* Edge Level */}
                   <circle cx="75" cy="15" r="5" className="stroke-white/40" />
                   <circle cx="85" cy="35" r="5" className="stroke-white/40" />
                   <line x1="77" y1="18" x2="83" y2="32" strokeWidth="3" className="stroke-[#8b5cf6]" />
                   <text x="80" y="50" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Link Predict.</text>
    
                   {/* Graph Level */}
                   <rect x="25" y="60" width="50" height="25" rx="4" className="fill-white/5 stroke-[#8b5cf6]" />
                   <circle cx="35" cy="72" r="3" className="stroke-white/40" />
                   <circle cx="50" cy="65" r="3" className="stroke-white/40" />
                   <circle cx="65" cy="75" r="3" className="stroke-white/40" />
                   <line x1="38" y1="70" x2="47" y2="67" />
                   <line x1="53" y1="67" x2="62" y2="73" />
                   <text x="50" y="95" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Graph Classif.</text>
                </svg>
              </div>
              
              <div className="flex flex-col gap-3 text-left">
                 <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. 3 Niveaux de Prédiction</h2>
                 <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                    <span className="whitespace-nowrap">Node / Edge / Graph</span>
                 </div>
                 <p className="text-sm leading-relaxed text-white/70">
                   Contrairement à une image (classification globale), un graphe permet d'effectuer des prédictions à 3 échelles différentes :<br/><br/>
                   1. <strong>Au niveau du Noeud (Node-level)</strong> : Prédire les propriétés individuelles d'une entité (ex: ce compte bancaire est-il tenu par un fraudeur ?).<br/>
                   2. <strong>Au niveau de l'Arête (Edge-level)</strong> : Prédire l'existence ou le poids d'un lien (ex: Suggestion d'amis sur Facebook, ou recommandation de films sur Netflix).<br/>
                   3. <strong>Au niveau du Graphe entier (Graph-level)</strong> : Extraire une seule prédiction pour tout le réseau (ex: Cette molécule 3D représentée en graphe est-elle toxique ?).
                 </p>
              </div>
            </div>
         </div>
      </div>
      

      <GNNMath />
    </div>
  );
}
