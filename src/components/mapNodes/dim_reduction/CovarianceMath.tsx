import React from 'react';

export default function CovarianceMath() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
       <div className="flex flex-col text-left gap-3">
         <h2 className="font-bold text-xl md:text-2xl text-white">Digression Mathématique : Sous le capot de l'ACP</h2>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         
         {/* Covariance */}
         <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 10 90 L 90 90" className="stroke-white/20" />
                  <path d="M 10 90 L 10 10" className="stroke-white/20" />
                  <ellipse cx="50" cy="50" rx="35" ry="10" transform="rotate(-30 50 50)" className="stroke-blue-400 fill-blue-400/10" />
                  <path d="M 20 80 L 80 20" className="stroke-blue-400" strokeWidth="2" strokeDasharray="4 4" />
               </svg>
            </div>
            <div className="flex flex-col gap-1 text-left">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">1. Covariance</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 Mesure comment deux variables X et Y varient <em>ensemble</em>. Positive si elles montent ensemble (ligne croissante), négative si l'une descend quand l'autre monte.
               </span>
            </div>
         </div>

         {/* Matrice de Covariance */}
         <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="25" y="25" width="50" height="50" rx="4" className="stroke-white/40 fill-white/5" />
                  <text x="38" y="45" fontSize="12" className="stroke-none fill-blue-400 font-mono font-bold" textAnchor="middle">σ²<tspan fontSize="8" dy="4">x</tspan></text>
                  <text x="62" y="45" fontSize="12" className="stroke-none fill-white/60 font-mono" textAnchor="middle">σ<tspan fontSize="8" dy="4">xy</tspan></text>
                  <text x="38" y="65" fontSize="12" className="stroke-none fill-white/60 font-mono" textAnchor="middle">σ<tspan fontSize="8" dy="4">yx</tspan></text>
                  <text x="62" y="65" fontSize="12" className="stroke-none fill-blue-400 font-mono font-bold" textAnchor="middle">σ²<tspan fontSize="8" dy="4">y</tspan></text>
               </svg>
            </div>
            <div className="flex flex-col gap-1 text-left">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">2. Matrice de Cov.</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 Un tableau (Σ) qui résume toutes les relations. La diagonale contient la <strong>variance unique</strong> de X et de Y. Le reste contient les covariances croisées.
               </span>
            </div>
         </div>

         {/* Vecteurs Propres */}
         <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <ellipse cx="50" cy="50" rx="35" ry="15" transform="rotate(-20 50 50)" className="stroke-blue-400/30 fill-blue-400/5" />
                  <path d="M 50 50 L 80 39" className="stroke-red-400" strokeWidth="2.5" markerEnd="url(#arrowEigenWhite)" />
                  <path d="M 50 50 L 40 22" className="stroke-red-400" strokeWidth="2.5" markerEnd="url(#arrowEigenWhite)" />
                  <path d="M 50 50 L 50 25" className="stroke-white/30" strokeDasharray="2 2" strokeWidth="1.5" />
                  <path d="M 50 50 L 75 50" className="stroke-white/30" strokeDasharray="2 2" strokeWidth="1.5" />
                  <text x="75" y="30" fontSize="10" className="stroke-none fill-red-400 font-bold font-mono">v₁</text>
                  <text x="45" y="15" fontSize="10" className="stroke-none fill-red-400 font-bold font-mono">v₂</text>
                  <defs>
                      <marker id="arrowEigenWhite" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                        <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-red-400 stroke-red-400" />
                      </marker>
                  </defs>
               </svg>
            </div>
            <div className="flex flex-col gap-1 text-left">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">3. Vecteurs Propres</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 Les directions "magiques" (flèches rouges) qui indiquent les axes d'étirement naturel des données. Ce deviennent nos <strong>nouveaux axes (PC1, PC2)</strong>.
               </span>
            </div>
         </div>

         {/* Valeurs Propres */}
         <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="25" y="60" width="15" height="20" className="fill-blue-400" />
                  <text x="32.5" y="55" fontSize="8" className="stroke-none fill-blue-400 font-bold font-mono" textAnchor="middle">λ₃</text>
                  
                  <rect x="45" y="40" width="15" height="40" className="fill-blue-400" />
                  <text x="52.5" y="35" fontSize="8" className="stroke-none fill-blue-400 font-bold font-mono" textAnchor="middle">λ₂</text>

                  <rect x="65" y="10" width="15" height="70" className="fill-red-400" />
                  <text x="72.5" y="5" fontSize="8" className="stroke-none fill-red-400 font-bold font-mono" textAnchor="middle">λ₁ (80%)</text>
                  
                  <path d="M 15 80 L 85 80" className="stroke-white/50" />
               </svg>
            </div>
            <div className="flex flex-col gap-1 text-left">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">4. Valeurs Propres (λ)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1 text-white/70">
                 Indique l'importance de l'axe (variance). On trie les vecteurs par λ décroissante et on jette les plus faibles pour compresser !
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-blue-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                 </svg>
                 Exemple de bout en bout : Calcul sur 2 points (2D ➔ 1D)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>1. <b>Données initiales</b> : <i>P<sub>1</sub>(1, 1)</i> et <i>P<sub>2</sub>(3, 3)</i> <i className="opacity-50 ml-2 text-white/50 text-[10px] md:text-xs">Coordonnées (x, y)</i></p>
                
                <p>2. <b>Moyennes</b> : <span className="font-serif">μ<sub>x</sub> = (1+3)/2 = 2, &nbsp; μ<sub>y</sub> = (1+3)/2 = 2</span></p>
                
                <p>3. <b>Centrage (Point − Moyenne)</b> : <i>P'<sub>1</sub>(−1, −1)</i> et <i>P'<sub>2</sub>(1, 1)</i></p>
                
                <div className="flex flex-col gap-2">
                  <span className="text-white">4. <b>Matrice de covariance Σ</b> : </span>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                     <div className="flex items-center gap-2  text-sm text-white">
                       <span>Σ = </span>
                       <div className="relative px-3 py-1 flex flex-col items-center">
                          <div className="absolute inset-y-0 left-0 w-1.5 border-l-2 border-t border-b border-white/50"></div>
                          <div className="absolute inset-y-0 right-0 w-1.5 border-r-2 border-t border-b border-white/50"></div>
                          <div className="flex gap-4 px-2">
                            <span className="w-3 text-left">2</span>
                            <span className="w-3 text-left">2</span>
                          </div>
                          <div className="flex gap-4 px-2 mt-0.5">
                            <span className="w-3 text-left">2</span>
                            <span className="w-3 text-left">2</span>
                          </div>
                       </div>
                     </div>
                     <div className="flex flex-col text-[10px] md:text-xs text-white/60">
                        <span className="opacity-60 italic font-serif">Var(X) = 2, Var(Y) = 2</span>
                        <span className="opacity-60 italic font-serif">Cov(X,Y) = [(−1)(−1) + (1)(1)] / 1 = 2</span>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-white/90">
                  <span>5. <b>Vecteurs & Valeurs Propres de Σ</b> :</span>
                  <span className="ml-4 font-serif text-[11px] md:text-sm">- λ<sub>1</sub> = 4, <span className="inline-block px-1">v<sub>1</sub> = [0.707, 0.707]</span> <i className="opacity-50 ml-1 text-white/50 text-[10px] md:text-xs">(Axe principal, garde 100% de variance)</i></span>
                  <span className="ml-4 font-serif text-[11px] md:text-sm">- λ<sub>2</sub> = 0, <span className="inline-block px-1">v<sub>2</sub> = [−0.707, 0.707]</span> <i className="opacity-50 ml-1 text-white/50 text-[10px] md:text-xs">(Axe orthogonal, 0% de variance)</i></span>
                </div>

                <p className="mt-2 text-white leading-relaxed">
                  6. <b>Projection (L'ACP)</b> : On élimine la dimension <i>v<sub>2</sub></i> (car λ<sub>2</sub>=0) et on projette sur <i>v<sub>1</sub></i>.<br/>
                  Nos points 2D d'origine se transforment en coordonnées 1D : <br/>
                  <span className="font-mono text-sm shadow-sm px-1 rounded bg-white/5 border border-white/10"><b>−1.41</b></span> et <span className="font-mono text-sm shadow-sm px-1 rounded bg-white/5 border border-white/10"><b>+1.41</b></span> sur ce nouvel axe ! Compression réussie sans perte.
                </p>
             </div>
         </div>
       </div>

    </div>
  );
}
