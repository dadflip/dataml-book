import React from 'react';

export default function TransformerMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : L'Attention et les LLMs</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Les Embeddings */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 90 L 10 10 M 10 90 L 90 90" className="stroke-white/20" strokeWidth="1" />
               <text x="20" y="30" fontSize="8" className="fill-white font-sans stroke-none">Roi</text>
               <circle cx="25" cy="35" r="1.5" className="fill-violet-400 stroke-none" />
               
               <text x="60" y="30" fontSize="8" className="fill-white font-sans stroke-none">Reine</text>
               <circle cx="65" cy="35" r="1.5" className="fill-violet-400 stroke-none" />
               
               <text x="50" y="80" fontSize="8" className="fill-white font-sans stroke-none">Pomme</text>
               <circle cx="55" cy="75" r="1.5" className="fill-amber-400 stroke-none" />
               
               <path d="M 25 35 L 65 35" className="stroke-white/40" strokeDasharray="1 2" strokeWidth="1" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Embeddings (Le sens)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Les mots deviennent des coordonnées mathématiques. Le sens du mot "Roi" est un point. "Reine" est proche. L'ordinateur calcule des opérations : Roi - Homme + Femme ≈ Reine.
               </span>
            </div>
         </div>

         {/* Self-Attention */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <text x="10" y="20" fontSize="7" className="fill-white/80 font-sans stroke-none">Le</text>
               <text x="30" y="20" fontSize="7" className="fill-violet-400 font-sans stroke-none font-bold">chat</text>
               <text x="55" y="20" fontSize="7" className="fill-white/80 font-sans stroke-none">boit</text>
               <text x="80" y="20" fontSize="7" className="fill-white/80 font-sans stroke-none">du</text>
               
               <text x="10" y="90" fontSize="7" className="fill-white/80 font-sans stroke-none">Lait</text>
               <text x="35" y="90" fontSize="7" className="fill-white/80 font-sans stroke-none">car</text>
               <text x="60" y="90" fontSize="7" className="fill-violet-400 font-sans stroke-none font-bold">il</text>
               <text x="80" y="90" fontSize="7" className="fill-white/80 font-sans stroke-none">a</text>
               
               <path d="M 62 82 C 60 50, 40 50, 36 25" className="stroke-violet-400" strokeWidth="2.5" />
               <path d="M 62 82 C 60 60, 20 60, 15 25" className="stroke-white/10" strokeWidth="1" />
               <path d="M 62 82 C 65 60, 70 60, 85 25" className="stroke-white/10" strokeWidth="1" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Self-Attention</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 C'est le secret du Transformer. Chaque mot "regarde" <strong>tous les autres mots</strong> de la phrase pour comprendre le contexte. Ici, le mot "il" donne toute son attention à "chat" pour ne pas confondre.
               </span>
            </div>
         </div>
         
         {/* Auto-Regression */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="10" y="20" width="40" height="20" className="fill-white/10 stroke-none" />
               <text x="30" y="32" fontSize="7" className="fill-white stroke-none font-sans" textAnchor="middle">Il pleut</text>
               
               <path d="M 50 30 L 70 30" className="stroke-violet-400" />
               <polygon points="70,30 65,27 65,33" className="fill-violet-400 stroke-none" />
               
               <text x="80" y="32" fontSize="7" className="fill-amber-400 stroke-none font-sans font-bold text-xl">donc</text>
               
               <rect x="10" y="60" width="60" height="20" className="fill-white/10 stroke-none" />
               <text x="40" y="72" fontSize="7" className="fill-white stroke-none font-sans" textAnchor="middle">Il pleut donc</text>
               <path d="M 70 70 L 85 70" className="stroke-violet-400" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Prédiction NEXT Token</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Les LLMs génèrent un texte comme un clavier prédictif de smartphone, mais sous stéroïdes. Ils prédisent sans cesse <strong>le mot le plus logique juste après</strong>, le rajoutent au texte, et recommencent.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                 </svg>
                 Cas concret : Pourquoi ChatGPT "hallucine" ? (Probabilités)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Un Transformer ne "sait" rien, il ne "réfléchit" pas. Il fait un calcul de probabilités colossal sur des milliards de textes vus pendant son entraînement.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">La génération probabiliste :</p>
                     <p>Si la phrase en cours est : <i>"La capitale de la France est..."</i></p>
                     <p>Le réseau crée un classement des probabilités pour 50 000 mots :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li><strong className="text-violet-400">Paris (99.1%)</strong></li>
                        <li>Lyon (0.5%)</li>
                        <li>Belle (0.1%)</li>
                     </ul>
                     <p>Le modèle "tire au dé" en fonction de ces probabilités (contrôlé par le paramètre <span className="text-violet-400 font-bold">Temperature</span>).</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">L'Hallucination :</p>
                     <p>Si on lui demande une invention complexe qui a peu de documentation (ex: <i>"Raconte-moi la bataille de Glargh de 1845."</i>), aucune suite de mot n'a une très forte probabilité.</p>
                     <p className="text-amber-400 font-bold">Le modèle assemble alors de manière fluide les probabilités "moyennes" associées au mot "bataille" et "1845" (fusils, chevaux, soldats morts) pour écrire un récit qui sonne extrêmement vrai mais mathématiquement inventé.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
