import React from 'react';

export default function RLMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Apprentissage par Renforcement (RL)</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Agent et Environnement */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="10" y="20" width="30" height="60" rx="4" className="stroke-violet-400 fill-violet-400/10" />
               <text x="25" y="52" fontSize="8" className="fill-violet-400 stroke-none font-bold" textAnchor="middle">AGENT</text>
               
               <rect x="60" y="20" width="30" height="60" rx="4" className="stroke-amber-400 fill-amber-400/10" />
               <text x="75" y="52" fontSize="6" className="fill-amber-400 stroke-none font-bold" textAnchor="middle">ENVIRONNEMENT</text>
               
               {/* Action -> Env */}
               <path d="M 40 30 L 60 30" className="stroke-white" />
               <polygon points="60,30 55,27 55,33" className="fill-white stroke-none" />
               <text x="50" y="25" fontSize="6" className="fill-white stroke-none" textAnchor="middle">Action</text>
               
               {/* Env -> Agent (State) */}
               <path d="M 60 60 L 40 60" className="stroke-white" />
               <polygon points="40,60 45,57 45,63" className="fill-white stroke-none" />
               <text x="50" y="55" fontSize="6" className="fill-white stroke-none" textAnchor="middle">État</text>
               
               {/* Env -> Agent (Reward) */}
               <path d="M 60 70 L 40 70" className="stroke-green-400" />
               <polygon points="40,70 45,67 45,73" className="fill-green-400 stroke-none" />
               <text x="50" y="80" fontSize="6" className="fill-green-400 stroke-none" textAnchor="middle">Récompense</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">La Boucle Centrale</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 L'agent observe l'Environnement, prend une Action. L'Environnement change d'État et lui renvoie une Récompense (positive ou négative). Le but est de maximiser la récompense totale.
               </span>
            </div>
         </div>

         {/* Exploration vs Exploitation */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 50 80 L 50 50 M 50 50 L 30 20 M 50 50 L 70 20" className="stroke-white/40" />
               <circle cx="30" cy="20" r="5" className="fill-violet-400 stroke-none" />
               <text x="30" y="10" fontSize="6" className="fill-white stroke-none" textAnchor="middle">Exploiter (Sûr)</text>
               
               <circle cx="70" cy="20" r="5" className="fill-amber-400 stroke-none" />
               <text x="70" y="10" fontSize="6" className="fill-white stroke-none" textAnchor="middle">Explorer (Risque)</text>
               
               <circle cx="50" cy="50" r="3" className="fill-white/80 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Le Dilemme (Exploration)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 L'agent doit-il choisir l'action qui lui rapporte déjà des points (Exploitation), ou essayer une nouvelle action inconnue au risque de perdre, mais avec l'espoir de trouver un "jackpot" (Exploration) ?
               </span>
            </div>
         </div>
         
         {/* Q-Learning */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="20" y="20" width="60" height="60" className="stroke-white/30 fill-none" />
               <line x1="40" y1="20" x2="40" y2="80" className="stroke-white/30" />
               <line x1="60" y1="20" x2="60" y2="80" className="stroke-white/30" />
               <line x1="20" y1="40" x2="80" y2="40" className="stroke-white/30" />
               <line x1="20" y1="60" x2="80" y2="60" className="stroke-white/30" />
               
               <text x="30" y="32" fontSize="6" className="fill-white/40 stroke-none text-center">-1</text>
               <text x="50" y="32" fontSize="6" className="fill-green-400 stroke-none text-center">+10</text>
               <text x="70" y="32" fontSize="6" className="fill-red-400 stroke-none text-center">-100</text>
               
               <path d="M 30 70 L 30 35 L 45 35" className="stroke-violet-400" strokeWidth="2" fill="none" />
               <polygon points="45,35 40,32 40,38" className="fill-violet-400 stroke-none" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Polices & Q-Values</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 L'algorithme mémorise la "qualité" (Q-Value) d'une action dans un état donné. C'est comme construire une carte (ou un réseau de neurones avec le Deep RL) qui lui dit : "Si tu es ici, va à droite".
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 4 13V6l6-3 6 3v7a7 7 0 0 1-7 7z"></path>
                 </svg>
                 Cas concret : Apprendre à jouer à Mario
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Imaginons qu'on entraîne un agent d'IA à finir un niveau de Super Mario Bros. On ne lui dit PAS quelles touches presser.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">Les règles du jeu (Configuration de l'Env) :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li><strong>État (State) :</strong> Les pixels de l'écran à l'instant T.</li>
                        <li><strong>Action :</strong> Appuyer sur Gauche, Droite, ou Saut.</li>
                        <li><strong>Récompenses :</strong> +1 point s'il avance à droite. -100 S'il meurt. +1000 S'il touche le drapeau de fin.</li>
                     </ul>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">L'Apprentissage (10 000 parties) :</p>
                     <p>Les 100 premières parties, il appuie au hasard et tombe sans cesse dans le premier trou (-100).</p>
                     <p>Par chance, à la partie 101, il saute par dessus le trou et avance (+5 points). Il met à jour sa fonction de "valeur" car il a trouvé une récompense inattendue.</p>
                     <p className="text-violet-400 font-bold">Après des milliers d'essais, l'algorithme finit par anticiper (Bellman Equation) : "Si je saute sur ce Goomba, je gagne des points à l'avenir !". Il a appris une stratégie optimale.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
