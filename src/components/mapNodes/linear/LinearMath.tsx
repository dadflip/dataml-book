import React from 'react';

export default function LinearMath() {
  return (
     <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
       <div className="flex flex-col text-left gap-3">
         <h2 className="font-bold text-xl md:text-2xl text-white">Digression Mathématique : Sous le capot Linéaire</h2>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         
         {/* Reg linéaire */}
         <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-xl border border-white/5 h-full">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-full h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 10 90 L 90 90" className="stroke-white/20" />
                  <path d="M 10 90 L 10 10" className="stroke-white/20" />
                  <path d="M 10 70 L 90 20" className="stroke-blue-400" strokeWidth="2.5" />
                  <circle cx="30" cy="50" r="2.5" className="fill-white stroke-none" />
                  <path d="M 30 50 L 30 57.5" className="stroke-blue-200" strokeDasharray="2 2" />
                  <circle cx="60" cy="45" r="2.5" className="fill-white stroke-none" />
                  <path d="M 60 45 L 60 38.5" className="stroke-blue-200" strokeDasharray="2 2" />
                  <text x="45" y="15" fontSize="10" className="stroke-none fill-blue-300 font-bold font-mono">y = wx + b</text>
               </svg>
            </div>
            <div className="flex flex-col text-left gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">1. L'Erreur (MSE)</span>
               <span className="text-[10px] md:text-xs leading-relaxed text-white/70 mt-1">
                 Minimiser la distance au carré (en bleu clair) entre la prédiction et le point réel. L'algorithme ajuste la pente (w) et l'ordonnée (b).
               </span>
            </div>
         </div>

         {/* Rég logistique */}
         <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-xl border border-white/5 h-full">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-full h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 10 90 L 90 90" className="stroke-white/20" />
                  <path d="M 10 90 L 10 10" className="stroke-white/20" />
                  <path d="M 10 50 L 90 50" className="stroke-white/10" strokeDasharray="2 2" />
                  <path d="M 10 80 Q 50 80 50 50 T 90 20" className="stroke-blue-400" strokeWidth="2.5" />
                  <text x="25" y="45" fontSize="10" className="stroke-none fill-blue-300 font-bold font-mono">σ(z)</text>
               </svg>
            </div>
            <div className="flex flex-col text-left gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">2. La Sigmoïde</span>
               <span className="text-[10px] md:text-xs leading-relaxed text-white/70 mt-1">
                 La régression logistique passe la sortie `wx+b` dans une fonction sigmoïde σ(z) = 1/(1+e⁻ᶻ) pour l'écraser entre 0 et 1 (une probabilité).
               </span>
            </div>
         </div>

         {/* Polynomial */}
         <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-xl border border-white/5 h-full">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-full h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 10 90 L 90 90" className="stroke-white/20" />
                  <path d="M 10 90 L 10 10" className="stroke-white/20" />
                  <circle cx="30" cy="80" r="2.5" className="fill-blue-400 stroke-none" />
                  <circle cx="50" cy="40" r="2.5" className="fill-white stroke-none" />
                  <circle cx="70" cy="80" r="2.5" className="fill-blue-400 stroke-none" />
                  
                  <path d="M 10 60 Q 50 -10 90 60" className="stroke-blue-400" strokeWidth="2.5" />
               </svg>
            </div>
            <div className="flex flex-col text-left gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">3. Polynomiale (Astuce)</span>
               <span className="text-[10px] md:text-xs leading-relaxed text-white/70 mt-1">
                 Au lieu de tracer une courbe, on ajoute de fausses variables ! On remplace la donnée étudiée <b>x</b> par <b>(x, x²)</b>. Le modèle reste mathématiquement linéaire, mais plie la courbe ! 
               </span>
            </div>
         </div>

         {/* Régularisation */}
         <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-xl border border-white/5 h-full">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-full h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 50 10 L 50 90" className="stroke-white/20" />
                  <path d="M 10 50 L 90 50" className="stroke-white/20" />
                  
                  <circle cx="50" cy="50" r="25" className="stroke-blue-400/50 fill-blue-400/10" />
                  <polygon points="50,25 75,50 50,75 25,50" className="stroke-blue-500/50 fill-blue-500/10" />
                  
                  <text x="75" y="25" fontSize="8" className="stroke-none fill-blue-300 font-bold font-mono">L1 (Lasso)</text>
                  <text x="75" y="80" fontSize="8" className="stroke-none fill-blue-200 font-bold font-mono">L2 (Ridge)</text>
               </svg>
            </div>
            <div className="flex flex-col text-left gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">4. Pénalité de Poids</span>
               <span className="text-[10px] md:text-xs leading-relaxed text-white/70 mt-1">
                 L2 (cercle) force les poids w à être petits. L1 (losange) a des "pointes" sur les axes, forçant certains poids w à valoir exactement ZÉRO (sélection de variables).
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
                 Exemples de bout en bout
             </span>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm text-white/70 mt-2 leading-relaxed text-left">
                
                {/* Linear Logic */}
                <div className="flex flex-col gap-3">
                   <span className="font-bold text-white border-b border-white/10 pb-1 border-dashed uppercase tracking-wider">Descente de Gradient (Linéaire)</span>
                   <p><b>Objectif</b> : Prédire <i>y</i> (Prix) selon <i>x</i> (Surface). Équation : <i>y = w·x</i></p>
                   <p><b>Donnée</b> : <i>x</i> = 2, vrai <i>y</i> = 10</p>
                   <p>1. <b>Init</b> : <i>w</i> = 3 ➔ <i>ŷ</i> = 3 × 2 = <span className="font-mono text-white">6</span></p>
                   <p>2. <b>Erreur (L)</b> : (<i>ŷ − y</i>)² = (6 − 10)² = <span className="font-mono text-white">16</span></p>
                   <p>3. <b>Gradient (∂L/∂w)</b> : 2<i>x</i>(<i>ŷ − y</i>) = 4(6 − 10) = <span className="font-mono text-white">−16</span></p>
                   <p>4. <b>Update</b> : <i>w<sub>new</sub> = w − (α × ∂L/∂w)</i></p>
                   <p className="ml-4">Si <i>α</i> = 0.1 ➔ <i>w</i> = 3 − (0.1 × −16) = <b>4.6</b></p>
                   <p>5. <b>Résultat</b> : <i>ŷ</i> = 4.6 × 2 = <span className="font-bold font-mono text-white text-lg">9.2</span> <i className="text-white/40 ml-1">(Plus proche de 10)</i></p>
                </div>

                {/* Logistic / L1 Logic */}
                <div className="flex flex-col gap-3">
                   <span className="font-bold text-white border-b border-white/10 pb-1 border-dashed uppercase tracking-wider">Logit & Régularisation</span>
                   
                   <p className="font-bold text-blue-400">A. Sigmoïde (Classification)</p>
                   <p>Si sortie linéaire <b>z = 2.0</b>.</p>
                   <p>On applique <i>σ(z) = 1 / (1 + e<sup>−z</sup>)</i> :</p>
                   <p>σ(2.0) ≈ <b>0.88</b> <br/><i className="opacity-70">(88% de probabilité)</i>.</p>
                   
                   <p className="mt-2 font-bold text-blue-300">B. L1 (Lasso) vs L2 (Ridge)</p>
                   <p>- <b>L2 (+ Σw²)</b> : Réduit proportionnellement tous les poids, évite les extrêmes.</p>
                   <p>- <b>L1 (+ Σ|w|)</b> : Pousse les petits poids vers <span className="text-white font-bold">ZÉRO</span> pour supprimer les variables inutiles.</p>
                   <p className="mt-1 opacity-70 italic text-[10px]">Indispensable pour éviter le sur-apprentissage.</p>
                </div>

             </div>
         </div>
       </div>

     </div>
  );
}
