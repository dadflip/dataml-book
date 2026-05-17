import React from 'react';


export default function LinearRegression() {
  return (
    <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center w-full shrink-0">
        <svg viewBox="0 0 100 100" className="w-28 h-28 md:w-36 md:h-36 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Hand drawn axes */}
            <path d="M 8,92 Q 50,90 92,92" className="opacity-40" />
            <path d="M 10,92 Q 12,50 8,10" className="opacity-40" />
            
            {/* Hand drawn straight line slightly imperfect */}
            <path d="M 12,85 Q 50,45 88,15" className="stroke-blue-400" strokeWidth="3" />
            
            {/* Points and residuals */}
            <path d="M 20,80 A 2.5 2.5 0 1 1 25 80 A 2.5 2.5 0 1 1 20 80 Z" className="fill-white stroke-none" />
            <path d="M 35,55 A 2.5 2.5 0 1 1 40 55 A 2.5 2.5 0 1 1 35 55 Z" className="fill-white stroke-none" />
            <path d="M 37,55 L 37,65" className="stroke-white opacity-60" strokeDasharray="3 3" />
            
            <path d="M 50,65 A 2.5 2.5 0 1 1 55 65 A 2.5 2.5 0 1 1 50 65 Z" className="fill-white stroke-none" />
            <path d="M 52,65 L 52,50" className="stroke-white opacity-60" strokeDasharray="3 3" />
            
            <path d="M 65,40 A 2.5 2.5 0 1 1 70 40 A 2.5 2.5 0 1 1 65 40 Z" className="fill-white stroke-none" />
            <path d="M 67,40 L 67,36" className="stroke-white opacity-60" strokeDasharray="3 3" />
            
            <path d="M 80,35 A 2.5 2.5 0 1 1 85 35 A 2.5 2.5 0 1 1 80 35 Z" className="fill-white stroke-none" />
            <path d="M 82,35 L 82,22" className="stroke-white opacity-60" strokeDasharray="3 3" />
        </svg>
        </div>
        <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-xl md:text-2xl uppercase tracking-wider text-white">Régression Linéaire</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 font-mono text-xs md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg">
              <span className="font-bold whitespace-nowrap">ŷ = wᵀx + b</span>
              <span className="hidden md:block opacity-30 text-white">|</span>
              <span className="whitespace-nowrap">J(w) = ½ Σ (ŷᵢ - yᵢ)²</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-2xl">
              Trace une ligne droite optimale qui minimise la distance (résidus) avec les points. Prédit une valeur <strong>Continue</strong>. Ex: Prix d'une maison selon sa surface.
            </p>
        </div>
      </div>

      

      {/* PIPELINE */}
      <div className="flex flex-col gap-4 mt-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Pipeline type : Prédiction Continue</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-4">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full aspect-square flex items-center justify-center">
              <svg viewBox="0 0 100 80" className="w-full shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 20 45 L 20 20 L 30 15 L 40 20 L 40 45 Z" className="stroke-white" fill="transparent" />
                <rect x="27" y="30" width="6" height="8" className="fill-white/10 stroke-none" />
                <text x="30" y="63" fontSize="10" className="stroke-none fill-white opacity-80 font-mono font-bold" textAnchor="middle">80m²</text>
                <path d="M 45 40 Q 50 35 55 40" className="stroke-white/50" />
                <path d="M 60 25 Q 75 25 85 25 L 85 45 Q 75 45 60 45 Z" className="fill-blue-400/10 stroke-blue-400" />
                <text x="73" y="38" fontSize="10" textAnchor="middle" className="stroke-none fill-blue-300 font-bold">150k€</text>
              </svg>
            </div>
            <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[11px] md:text-xs uppercase tracking-wider text-white">1. Data </span>
               <span className="text-[10px] opacity-60">Surface &rarr; Prix</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full aspect-square flex items-center justify-center">
              <svg viewBox="0 0 100 80" className="w-full shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <rect x="15" y="15" width="70" height="50" rx="3" className="stroke-white/30" />
                <line x1="15" y1="35" x2="85" y2="35" className="stroke-white/30" />
                <line x1="50" y1="15" x2="50" y2="65" className="stroke-white/30" />
                <text x="32.5" y="28" fontSize="9" className="stroke-none fill-white/80 font-bold font-mono" textAnchor="middle">X (m²)</text>
                <text x="67.5" y="28" fontSize="9" className="stroke-none fill-blue-400 font-bold font-mono" textAnchor="middle">y (€)</text>
                
                <text x="32.5" y="48" fontSize="9" className="stroke-none fill-white opacity-60 font-mono" textAnchor="middle">60</text>
                <text x="67.5" y="48" fontSize="9" className="stroke-none fill-blue-300 font-mono" textAnchor="middle">150k</text>
                
                <path d="M 17 55 L 83 55" stroke="rgb(248 113 113)" strokeDasharray="2 2" strokeWidth="2" />
                <text x="32.5" y="63" fontSize="8" className="stroke-none fill-white/30 font-mono line-through" textAnchor="middle">9000</text>
              </svg>
            </div>
            <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[11px] md:text-xs uppercase tracking-wider text-white">2. Clean</span>
               <span className="text-[10px] opacity-60">Filtrer outliers</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full aspect-square flex items-center justify-center">
              <svg viewBox="0 0 100 80" className="w-full shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 20 65 Q 50 65 80 65" className="stroke-white/40" />
                <path d="M 20 65 Q 20 35 20 15" className="stroke-white/40" />
                <text x="85" y="70" fontSize="9" className="stroke-none fill-white/80 font-mono font-bold" textAnchor="middle">X</text>
                <text x="15" y="10" fontSize="9" className="stroke-none fill-blue-400 font-mono font-bold" textAnchor="middle">y</text>
                <circle cx="35" cy="55" r="3" className="fill-white stroke-none" />
                <circle cx="50" cy="45" r="3" className="fill-white stroke-none" />
                <circle cx="65" cy="30" r="3" className="fill-white stroke-none" />
                <circle cx="80" cy="25" r="3" className="fill-white stroke-none" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[11px] md:text-xs uppercase tracking-wider text-white">3. Viz</span>
               <span className="text-[10px] opacity-60">Distribution</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-3">
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full aspect-square flex items-center justify-center">
               <svg viewBox="0 0 100 80" className="w-full shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                 <path d="M 20 65 Q 50 65 80 65" className="stroke-white/20" />
                 <path d="M 20 65 Q 20 35 20 15" className="stroke-white/20" />
                 <path d="M 20 67 Q 50 40 85 15" className="stroke-blue-400" strokeWidth="2.5" />
                 <path d="M 30,20 Q 50,15 70,25" className="stroke-white/10" fill="transparent" strokeWidth="10" strokeLinecap="square" />
                 <text x="50" y="25" fontSize="9" className="stroke-none fill-blue-300 font-bold font-mono" textAnchor="middle">ŷ = wX + b</text>
               </svg>
             </div>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[11px] md:text-xs uppercase tracking-wider text-white">4. Hypothèse</span>
               <span className="text-[10px] opacity-60">Modèle H(x)</span>
             </div>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col items-center gap-3">
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full aspect-square flex items-center justify-center">
               <svg viewBox="0 0 100 80" className="w-full shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <path d="M 20 15 Q 50 85 80 15" className="stroke-white/40" />
                  <text x="25" y="20" fontSize="9" className="stroke-none fill-white/80 font-mono font-bold" textAnchor="middle">J(w)</text>
                  <circle cx="25" cy="42" r="3" className="fill-blue-400/50 stroke-none" />
                  <path d="M 28 45 Q 35 55 45 61" className="stroke-blue-400" strokeWidth="2" markerEnd="url(#arrowGradBlue)" />
                  <circle cx="50" cy="65" r="4" className="fill-blue-400 stroke-none" />
                  <text x="50" y="78" fontSize="10" className="stroke-none fill-blue-300 font-bold" textAnchor="middle">w*</text>
                  <defs>
                     <marker id="arrowGradBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                       <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-blue-400 stroke-blue-400" />
                     </marker>
                  </defs>
               </svg>
             </div>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[11px] md:text-xs uppercase tracking-wider text-white">5. Optim</span>
               <span className="text-[10px] opacity-60">Descente Grad.</span>
             </div>
          </div>

        </div>
      </div>
      

    </div>
  );
}
