import RLMath from './math/RLMath';
import React from 'react';


export default function RLNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Reinforcement Learning</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">État & Récompense</span>
              <span><i>S<sub>t</sub></i>, <i>R<sub>t</sub></i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Agent (Politique)</span>
              <span><i>π</i>(<i>a</i>|<i>s</i>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Action</span>
              <span className="text-[#fca5a5]"><i>A<sub>t</sub></i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Environnement</span>
              <span>Transition</span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* 1. La boucle d'interaction */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                     <marker id="arrowWhiteRL" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                       <path d="M 0 0 L 10 5 L 0 10 z" className="fill-white stroke-none" />
                     </marker>
                  </defs>
                  
                  {/* Agent Box */}
                  <rect x="25" y="15" width="50" height="25" rx="4" className="stroke-white fill-[#fca5a5]/10" strokeWidth="2" />
                  <text x="50" y="30" fontSize="8" className="fill-[#fca5a5] stroke-none font-bold" textAnchor="middle">Agent</text>
                  <text x="50" y="36" fontSize="5" className="fill-white/60 stroke-none font-mono" textAnchor="middle">Politique π, Valeur V/Q</text>
                  
                  {/* Env Box */}
                  <rect x="25" y="60" width="50" height="25" rx="4" className="stroke-white fill-white/10" strokeWidth="2" />
                  <text x="50" y="72" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Environnement</text>
                  <text x="50" y="78" fontSize="5" className="fill-white/60 stroke-none font-mono" textAnchor="middle">S_t+1, R_t+1</text>
    
                  {/* Action arrow (Down) */}
                  <path d="M 85 27 Q 95 50 85 72" strokeWidth="1.5" markerEnd="url(#arrowWhiteRL)" />
                  <text x="96" y="52" fontSize="6" className="fill-[#fca5a5] stroke-none font-bold" textAnchor="middle">Action (A)</text>
                  
                  {/* State/Reward arrow (Up) */}
                  <line x1="25" y1="72" x2="15" y2="72" strokeWidth="1.5" />
                  <line x1="15" y1="72" x2="15" y2="27" strokeWidth="1.5" />
                  <line x1="15" y1="27" x2="23" y2="27" strokeWidth="1.5" markerEnd="url(#arrowWhiteRL)" />
                  <text x="5" y="52" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle" transform="rotate(-90 5 52)">État (S), Récompense (R)</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. La Boucle d'Interaction</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-red-300 bg-red-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Idée : Maximiser Σ <i>γ<sup>t</sup>R<sub>t</sub></i></span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  L'agent observe un État de l'Environnement, choisit une Action. L'Environnement change pour un nouvel État et renvoie une <strong>Récompense</strong> (ou pénalité). L'agent cherche à maximiser le gain cumulé futur.
                </p>
             </div>
           </div>

           {/* PIPELINE RL */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Apprendre à jouer à Mario</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="20" y="20" width="60" height="40" rx="2" className="fill-white/10 stroke-none" />
                       <circle cx="35" cy="40" r="5" className="fill-red-400 stroke-none" />
                       <rect x="65" y="35" width="10" height="10" className="fill-yellow-400 stroke-none" />
                       <path d="M 45 42 L 55 42 M 50 37 L 50 47" className="stroke-white" />
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Observation</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Écran du jeu (État)</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="50" cy="40" r="20" className="fill-[#fca5a5]/10 stroke-[#fca5a5]" strokeWidth="2" />
                       <path d="M 40 40 L 60 40 L 50 25 Z" className="fill-[#fca5a5] stroke-none" />
                       <text x="50" y="65" fontSize="8" className="fill-[#fca5a5] stroke-none font-bold" textAnchor="middle">SAUT</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Action</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Appuyer sur A</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <text x="50" y="44" fontSize="16" className="fill-green-400 stroke-none font-bold" textAnchor="middle">+100</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Récompense</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Score augmente</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Value vs Policy Methods */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="50" y1="10" x2="50" y2="90" strokeWidth="1" strokeDasharray="2,2" className="opacity-40" />
    
                  {/* Q-Learning (Left) */}
                  <text x="25" y="20" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">Basé Valeur (Q-Learning)</text>
                  <rect x="10" y="30" width="30" height="40" className="fill-white/10 stroke-none" />
                  <line x1="10" y1="40" x2="40" y2="40" strokeWidth="1" className="opacity-40" />
                  <line x1="10" y1="50" x2="40" y2="50" strokeWidth="1" className="opacity-40" />
                  <line x1="10" y1="60" x2="40" y2="60" strokeWidth="1" className="opacity-40" />
                  <line x1="25" y1="30" x2="25" y2="70" strokeWidth="1" className="opacity-40" />
                  <circle cx="17" cy="45" r="2" className="fill-[#fca5a5]" />
                  <text x="25" y="85" fontSize="5" className="fill-white stroke-none font-mono" textAnchor="middle">Estime Q(s,a)</text>
                  
                  {/* Policy Gradient (Right) */}
                  <text x="75" y="20" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">Policy Gradients (PPO)</text>
                  
                  <ellipse cx="75" cy="50" rx="15" ry="5" className="stroke-white/50" />
                  <ellipse cx="75" cy="50" rx="10" ry="3" className="stroke-white/80" />
                  <circle cx="75" cy="50" r="1.5" className="fill-[#fca5a5]" />
                  
                  <path d="M 60 70 Q 75 40 75 50" strokeWidth="1" />
                  <polygon points="75,50 73,46 77,46" className="fill-white stroke-none" />
                  <text x="75" y="85" fontSize="5" className="fill-white stroke-none font-mono" textAnchor="middle">Optimise π(a|s)</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Deux Approches</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Q*(<i>s</i>,<i>a</i>) vs <i>∇_θ J(θ)</i></span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  - <strong>Basé Valeur</strong> : Apprend la "qualité" (Q) d'une action dans un état donné. (ex: DQN)<br/>- <strong>Policy Gradient</strong> : Ajuste directement les probabilités des actions à prendre pour augmenter la récompense. (ex: PPO).
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <RLMath />
    </div>
  );
}
