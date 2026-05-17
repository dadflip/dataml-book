import DeepMath from './math/DeepMath';
import React from 'react';

export default function RNNNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Réseaux Récurrents (RNN)</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Séquence</span>
              <span>[ x₁, x₂, x₃ ]</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Cellule RNN / LSTM</span>
              <span>Mémoire (hₜ)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Dense (FC)</span>
              <span className="text-blue-400">Prédiction (yₜ)</span>
           </div>
        </div>
      </div>

      {/* 2 Models Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
        {/* 1. L'idée du RNN */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Folded view */}
                  <rect x="10" y="35" width="20" height="30" rx="4" className="stroke-white/80 fill-white/5" />
                  <text x="20" y="52" fontSize="9" className="fill-white stroke-none font-bold" textAnchor="middle">RNN</text>
                  <circle cx="20" cy="85" r="4" className="fill-blue-400/50 stroke-none" />
                  <text x="20" y="94" fontSize="8" className="fill-white stroke-none" textAnchor="middle">X (Mot)</text>
                  <path d="M 20 80 L 20 65" className="stroke-white" markerEnd="url(#arrowWhite)" />
                  <path d="M 12 35 C 10 15, 30 15, 28 35" className="stroke-blue-400" markerEnd="url(#arrowBlue)" />
                  <text x="20" y="10" fontSize="8" className="fill-blue-400 stroke-none" textAnchor="middle">Mémoire (h)</text>
                  
                  <line x1="38" y1="50" x2="48" y2="50" strokeWidth="1.5" strokeDasharray="2,2" className="opacity-50" />
                  <text x="43" y="45" fontSize="7" className="fill-white stroke-none opacity-80" textAnchor="middle">Déroulé</text>

                  {/* Unfolded view */}
                  {[60, 85].map((x, i) => (
                    <g key={i}>
                       <rect x={x} y="35" width="15" height="20" rx="2" className="stroke-white/80 fill-white/5" />
                       <text x={x+7.5} y="47" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">h{i}</text>
                       {/* Input */}
                       <circle cx={x+7.5} cy="75" r="3" className="fill-blue-400/50 stroke-none" />
                       <text x={x+7.5} y="84" fontSize="7" className="fill-white stroke-none" textAnchor="middle">x{i}</text>
                       <path d={`M ${x+7.5} 70 L ${x+7.5} 55`} className="stroke-white" markerEnd="url(#arrowWhite)" />
                       {/* Output */}
                       <circle cx={x+7.5} cy="18" r="3" className="fill-green-400/50 stroke-none" />
                       <path d={`M ${x+7.5} 35 L ${x+7.5} 22`} className="stroke-white" markerEnd="url(#arrowWhite)" />
                    </g>
                  ))}
                  {/* Connection between states */}
                  <path d="M 75 45 L 85 45" className="stroke-blue-400" markerEnd="url(#arrowBlue)" />

                  <defs>
                    <marker id="arrowWhite" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                      <polygon points="0,0 6,3 0,6" className="fill-white stroke-none opacity-80" />
                    </marker>
                    <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto-start-reverse">
                      <polygon points="0,0 6,3 0,6" className="fill-blue-400 stroke-none opacity-80" />
                    </marker>
                  </defs>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Introduction au RNN</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">hₜ = f(W·xₜ + U·hₜ₋₁)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Contrairement aux réseaux denses qui traitent des entrées de taille fixe, un RNN est conçu pour traiter les <strong>données séquentielles et temporelles</strong> (texte, son, cours de la bourse).<br/><br/>
                  La révolution du RNN est de posséder une <strong>boucle de mémoire interne (l'état caché h)</strong>. À chaque pas de temps <i>t</i>, le RNN combine l'information du nouveau mot entrant <i>(x)</i> avec l'état caché précédent <i>(h)</i> pour se "souvenir" du contexte passé. Le réseau est ainsi "déroulé" au fil du temps pour lire toute la phrase mot à mot.
                </p>
             </div>
           </div>
        </div>

        {/* 2. LSTM & GRU */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="25" y="30" width="60" height="40" rx="4" className="stroke-white/60 fill-white/5" />
                  
                  {/* Cell state (Long term memory) */}
                  <line x1="15" y1="40" x2="95" y2="40" strokeWidth="2" className="stroke-amber-400" />
                  <text x="85" y="34" fontSize="8" className="fill-amber-400 stroke-none" textAnchor="middle">Cellule (C)</text>

                  {/* Gates */}
                  {/* Forget gate */}
                  <circle cx="35" cy="55" r="5" className="fill-red-400/50 stroke-none" />
                  <text x="35" y="57" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">×</text>
                  <path d="M 35 65 L 35 60 M 35 50 L 35 40" className="stroke-white/50" />
                  
                  {/* Input gate */}
                  <circle cx="55" cy="55" r="5" className="fill-green-400/50 stroke-none" />
                  <text x="55" y="57" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">+</text>
                  <path d="M 55 65 L 55 60 M 55 50 L 55 40" className="stroke-white/50" />

                  {/* Output gate */}
                  <circle cx="75" cy="55" r="5" className="fill-blue-400/50 stroke-none" />
                  <text x="75" y="57" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">×</text>
                  <path d="M 75 40 L 75 50 M 75 60 L 75 75 M 75 55 L 95 55" className="stroke-white/50" />

                  {/* Input / previous hidden state */}
                  <line x1="20" y1="80" x2="35" y2="65" strokeWidth="1" className="stroke-white/30" />
                  <line x1="10" y1="65" x2="35" y2="65" strokeWidth="1" className="stroke-white/30" />
                  <text x="15" y="85" fontSize="7" className="fill-white stroke-none opacity-60">xₜ</text>
                  <text x="10" y="60" fontSize="7" className="fill-white stroke-none opacity-60">hₜ₋₁</text>
                  
                  <line x1="35" y1="65" x2="75" y2="65" strokeWidth="1" className="stroke-white/30" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. LSTM & GRU</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-amber-300 bg-amber-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Oublier, Mettre à jour, Extraire</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Les RNNs classiques souffrent du problème du <strong>gradient évanescent</strong> : ils "oublient" rapidement les premiers mots d'une longue phrase.<br/><br/>
                  Les architectures <strong>LSTM (Long Short-Term Memory)</strong> et <strong>GRU</strong> résolvent cela en ajoutant un "tapis roulant" central (Le Cell State) et un système intelligent de <strong>Portes (Gates)</strong>. Ces portes sont de petits réseaux neuronaux internes qui apprennent automatiquement quoi <i>effacer</i>, quoi <i>ajouter</i>, et quoi <i>extraire</i> comme information d'un mot à l'autre. Elles ont dominé le NLP (Traduction automatique, Siri) jusqu'à l'invention du Transformer en 2017.
                </p>
             </div>
           </div>
        </div>
      </div>
       
      {/* PIPELINE RNN */}
      <div className="flex flex-col gap-4 mt-6">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Saisie Automatique de Texte</span>
         <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="10" y="25" width="80" height="30" rx="4" className="stroke-white/30 fill-transparent" />
                  <text x="50" y="44" fontSize="9" className="fill-white stroke-none font-bold" textAnchor="middle">"Je mange une..."</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Input Temporel</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Mots donnés un à un</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="25" y="20" width="20" height="20" rx="2" className="fill-blue-400/20 stroke-blue-400" />
                  <rect x="55" y="20" width="20" height="20" rx="2" className="fill-blue-400/60 stroke-blue-400" />
                  <path d="M 45 30 L 55 30" className="stroke-white max-w-[2px]" markerEnd="url(#arrowWhite)" />
                  <circle cx="35" cy="60" r="4" className="fill-white/20 stroke-none" />
                  <circle cx="65" cy="60" r="4" className="fill-white/60 stroke-none" />
                  <path d="M 35 56 L 35 40" className="stroke-white max-w-[2px]" />
                  <path d="M 65 56 L 65 40" className="stroke-white max-w-[2px]" />
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Accumulation</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">L'état caché se met à jour</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="15" y="25" width="70" height="30" rx="6" className="fill-green-400/20 stroke-green-400" />
                  <text x="50" y="44" fontSize="9" className="fill-green-400 stroke-none font-bold" textAnchor="middle">"POMME" (95%)</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Prédiction</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Prochain mot le plus probable</span>
               </div>
            </div>
         </div>
      </div>

      <DeepMath />
    </div>
  );
}
