import React from 'react';

export default function BayesianMath() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
       <div className="flex flex-col items-center text-left gap-3">
         <h2 className="font-bold text-xl md:text-2xl text-white">Digression Mathématique : La Logique Bayésienne</h2>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
         
         <div className="flex flex-col items-center gap-4 text-left">
            <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <ellipse cx="50" cy="50" rx="35" ry="35" className="fill-orange-500/10 stroke-orange-500/30" />
               <text x="50" y="55" fontSize="14" className="stroke-none fill-orange-400 font-bold font-mono" textAnchor="middle">Croyance</text>
               <text x="50" y="30" fontSize="10" className="stroke-none fill-white/40 font-mono" textAnchor="middle">PRIOR P(A)</text>
            </svg>
            <div className="flex flex-col gap-1 items-center">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">1. Prior (A Priori)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 Ce qu'on croit savoir du monde <b>avant</b> de voir vos données. Par ex: "Les maladies rares sont rares (1%)".
               </span>
            </div>
         </div>

         <div className="flex flex-col items-center gap-4 text-left">
            <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 10 50 L 90 50" className="stroke-white/20" strokeWidth="2" />
               <path d="M 30 50 Q 50 -10 70 50" className="stroke-blue-400" strokeWidth="2" />
               <circle cx="60" cy="30" r="3" className="fill-white stroke-none" />
               <path d="M 60 30 L 60 50" className="stroke-white/30" strokeDasharray="2 2" />
               <text x="50" y="80" fontSize="12" className="stroke-none fill-blue-400 font-bold font-mono" textAnchor="middle">P(B | A)</text>
            </svg>
            <div className="flex flex-col gap-1 items-center">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">2. Likelihood (Vraisemblance)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 La probabilité de voir vos données <b>si</b> votre hypothèse est vraie. "Quelle est la chance d'être positif si je suis malade ?"
               </span>
            </div>
         </div>

         <div className="flex flex-col items-center gap-4 text-left">
            <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <ellipse cx="40" cy="50" rx="35" ry="35" className="fill-emerald-500/10 stroke-emerald-500/30" />
               <path d="M 20 50 Q 40 -10 60 50" className="stroke-emerald-400" strokeWidth="2" />
               <text x="50" y="80" fontSize="12" className="stroke-none fill-emerald-400 font-bold font-mono" textAnchor="middle">P(A | B)</text>
            </svg>
            <div className="flex flex-col gap-1 items-center">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">3. Posterior (A Posteriori)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 Notre nouvelle croyance mise à jour = Prior × Likelihood. C'est l'objectif final.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         <div className="relative z-10 flex flex-col gap-6">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-white fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                 </svg>
                 Exemple de bout en bout : Le Faux Positif (Paradoxe d'inspection)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  <b>Le scénario</b> : Une maladie touche 1% de la population. Vous faites un test fiable à 90% (détecte 90% des malades). Hélas, il a 5% de Faux Positifs (alarme à tort sur des sains).<br/>
                  <b>Vous testez POSITIF. Êtes-vous malade ?</b>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2 text-[10px] md:text-sm text-left">
                  <div className="flex flex-col gap-2 text-left">
                    <span className="uppercase font-bold text-white/40 tracking-wider text-[10px]">L'intuition (Fausse)</span>
                    <p>On pense instinctivement : "Le test est à 90% exact, donc je suis sûr à 90% d'être malade".<br/><br/>Mais c'est ignorer le <b>Prior</b> : la maladie est très rare au départ !</p>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <span className="uppercase font-bold text-white/40 tracking-wider text-[10px]">La Formule de Bayes</span>
                    <div className="w-full mt-2">
                       <svg viewBox="0 0 250 80" className="w-[240px] max-w-full h-auto stroke-white fill-none overflow-visible">
                            <text x="50" y="45" fontSize="16" className="fill-emerald-400 stroke-none font-bold font-serif" textAnchor="end">P(M|Pos)</text>
                            <text x="65" y="45" fontSize="16" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">=</text>
                            
                            <text x="140" y="25" fontSize="16" className="fill-blue-400 stroke-none font-bold font-serif" textAnchor="end">P(Pos|M)</text>
                            <text x="155" y="25" fontSize="16" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">·</text>
                            <text x="220" y="25" fontSize="16" className="fill-orange-400 stroke-none font-bold font-serif" textAnchor="end">P(M)</text>

                            <line x1="80" y1="35" x2="230" y2="35" strokeWidth="2" className="stroke-white/80" strokeLinecap="round" />
                            
                            <text x="155" y="60" fontSize="16" className="fill-white/60 stroke-none font-bold font-serif" textAnchor="middle">P(Pos)</text>

                            {/* Annotations */}
                            <text x="25" y="65" fontSize="9" className="fill-emerald-400/80 stroke-none font-sans tracking-wide" textAnchor="middle">POSTERIOR</text>
                            <text x="110" y="5" fontSize="9" className="fill-blue-400/80 stroke-none font-sans tracking-wide" textAnchor="middle">LIKELIHOOD</text>
                            <text x="205" y="5" fontSize="9" className="fill-orange-400/80 stroke-none font-sans tracking-wide" textAnchor="middle">PRIOR</text>
                            <text x="195" y="60" fontSize="9" className="fill-white/40 stroke-none font-sans tracking-wide" textAnchor="start">EVIDENCE</text>
                       </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-2 ">
                   <p>1. <b>Prior</b> : <span className="font-serif text-[11px] md:text-[13px]">P(Malade) = 0.01</span> &nbsp;&nbsp;|&nbsp;&nbsp; <span className="font-serif text-[11px] md:text-[13px]">P(Sain) = 0.99</span></p>
                   <p>2. <b>Vraisemblance</b> : <span className="font-serif text-[11px] md:text-[13px]">P(Pos. ∣ Malade) = 0.90</span> &nbsp;&nbsp;|&nbsp;&nbsp; <b>Faux positif</b> : <span className="font-serif text-[11px] md:text-[13px]">P(Pos. ∣ Sain) = 0.05</span></p>
                </div>
                
                <div className="mt-2 text-left">
                  <span className="font-mono text-[11px] md:text-[13px]">P(Positif) = (0.90 × 0.01) + (0.05 × 0.99) = 0.009 + 0.0495 = <b>0.0585</b></span>
                </div>

                <div className="py-1 text-left">
                  <span className="font-mono text-[11px] md:text-[13px]">P(Malade ∣ Positif) = 0.009 / 0.0585 ≈ 0.1538</span> &nbsp;➔&nbsp; <b className="text-emerald-700 font-mono text-xs md:text-sm">15.4%</b>
                </div>

                <p className="mt-2 text-white leading-relaxed">
                  <b>Conclusion</b> : Bien que le test soit positif et réputé "fiable à 90%", vous n'avez que <b>15.4% de chances</b> d'être réellement malade ! Pourquoi ? Parce qu'une maladie de 1% noyée dans le bruit de 5% de faux positifs génère bien plus de fausses alarmes que de vraies détections. Le modèle Bayésien le calcule de façon exacte.
                </p>

             </div>
         </div>
       </div>

    </div>
  );
}
