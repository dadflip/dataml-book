import React from 'react';


export default function LDA() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         <div className="flex justify-center w-full">
            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               {/* Coordinate System */}
               <path d="M 5,90 Q 50,88 95,90" className="opacity-30" />
               <path d="M 10,5 Q 12,50 10,95" className="opacity-30" />
               
               {/* Cluster 1: Long ellipse vertically */}
               <ellipse cx="40" cy="50" rx="6" ry="25" className="fill-blue-400/10 stroke-blue-400/40" strokeDasharray="2 2" />
               <circle cx="40" cy="30" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="38" cy="45" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="42" cy="55" r="2" className="fill-blue-400 stroke-none" />
               <circle cx="40" cy="70" r="2" className="fill-blue-400 stroke-none" />
               <path d="M 40,50 L 65,50" className="stroke-emerald-400 opacity-60" strokeDasharray="2 2" />
               
               {/* Cluster 2: Long ellipse vertically */}
               <ellipse cx="65" cy="50" rx="6" ry="25" className="fill-red-400/10 stroke-red-400/40" strokeDasharray="2 2" />
               <circle cx="65" cy="35" r="2" className="fill-red-400 stroke-none" />
               <circle cx="63" cy="50" r="2" className="fill-red-400 stroke-none" />
               <circle cx="67" cy="65" r="2" className="fill-red-400 stroke-none" />
               <circle cx="65" cy="75" r="2" className="fill-red-400 stroke-none" />

               {/* PCA would choose Y axis because it's the direction of max overall variance */}
               <path d="M 52.5 10 L 52.5 90" className="stroke-white opacity-30" strokeDasharray="3 3" />
               <text x="54" y="15" fontSize="5" className="stroke-none fill-white/80 font-bold">ACP = Échec de séparation</text>
               
               {/* LDA chooses X axis to separate the cluster means */}
               <path d="M 15 50 L 90 50" className="stroke-emerald-400" strokeWidth="2.5" />
               <text x="65" y="46" fontSize="5" className="stroke-none fill-emerald-400 font-bold">LDA = Séparation Max</text>

            </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <span className="flex items-center justify-start flex-wrap gap-2 font-bold text-lg md:text-xl uppercase tracking-wider text-white">
              LDA (Analyse Discriminante)
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">Supervisé</span>
            </span>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-emerald-300 bg-emerald-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">Max Tr(S<sub>W</sub>⁻¹S<sub>B</sub>)</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Contrairement à l'ACP qui ignore les classes (non-supervisé), LDA <strong>utilise les étiquettes</strong>. Elle cherche spécifiquement l'axe qui :<br/><br/>
              1. <strong>Éloigne au maximum</strong> les groupes entre eux (<i>S<sub>B</sub></i>)<br/>
              2. <strong>Rapproche au maximum</strong> les éléments d'un même groupe (<i>S<sub>W</sub></i>).
            </p>
         </div>
      </div>
      
      

      <div className="flex flex-col mt-2 relative py-6 px-4 md:px-6 bg-white/[0.02] border border-white/5 rounded-xl">
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                 </svg>
                 Cas concret : Détection Fraude Bancaire
             </span>
             <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-start text-left">
               <div className="flex justify-center w-full xl:w-1/3 shrink-0">
                  <svg viewBox="0 0 100 60" className="w-40 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <path d="M 10 40 L 90 20" className="stroke-white/20" strokeWidth="1.5" strokeDasharray="2 2" />
                     <text x="20" y="32" fontSize="6" className="fill-white/40 stroke-none font-mono" transform="rotate(-14 20 32)">ACP (Erreur)</text>
                     <path d="M 20 15 L 80 45" className="stroke-emerald-400" strokeWidth="2" />
                     <text x="75" y="40" fontSize="8" className="fill-emerald-400 stroke-none font-mono font-bold" transform="rotate(26 75 40)">LDA</text>

                     {/* Legal transactions (tight cluster) */}
                     <ellipse cx="40" cy="20" rx="10" ry="15" className="fill-blue-400/10 stroke-none" transform="rotate(45 40 20)" />
                     <circle cx="40" cy="20" r="3" className="fill-blue-400 stroke-none" />
                     <circle cx="36" cy="18" r="2" className="fill-blue-400 stroke-none" />
                     <circle cx="44" cy="22" r="2" className="fill-blue-400 stroke-none" />
                     <circle cx="42" cy="14" r="2" className="fill-blue-400 stroke-none" />
                     <circle cx="38" cy="26" r="2" className="fill-blue-400 stroke-none" />

                     {/* Fraud transactions (tight cluster) */}
                     <ellipse cx="60" cy="40" rx="10" ry="15" className="fill-red-400/10 stroke-none" transform="rotate(45 60 40)" />
                     <circle cx="60" cy="40" r="3" className="fill-red-400 stroke-none" />
                     <circle cx="56" cy="38" r="2" className="fill-red-400 stroke-none" />
                     <circle cx="64" cy="42" r="2" className="fill-red-400 stroke-none" />
                     <circle cx="62" cy="34" r="2" className="fill-red-400 stroke-none" />
                     <circle cx="58" cy="46" r="2" className="fill-red-400 stroke-none" />
                  </svg>
               </div>
               <p className="text-sm text-white/80 leading-relaxed">
                 <b>Scénario</b> : Vous avez des transactions caractérisées par plein de variables (montant, heure, IP) et vous savez <b>déjà</b> si elles sont frauduleuses ou non (étiquettes = "Supervisé").<br/><br/>
                 <b>Le problème avec l'ACP</b> : L'ACP va étaler les données en suivant simplement l'axe où les transactions varient le plus (ex: le montant!). Elle risque de superposer les fraudes et non-fraudes.<br/><br/>
                 <b>L'avantage LDA</b> : LDA crée un nouvel axe <b>spécialement conçu</b> pour séparer le centre géographique des transactions légales de celui des fraudes, tout en essayant de resserrer ces groupes pour que personne ne se croise. 
               </p>
             </div>
         </div>
      </div>
      

    </div>
  );
}
