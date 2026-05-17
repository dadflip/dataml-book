import React from 'react';


export default function Regularization() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col text-left gap-3">
         <h2 className="font-bold text-xl md:text-2xl text-white">4. Régularisation (Le Frein)</h2>
         <p className="text-sm md:text-base leading-relaxed text-white/70 max-w-2xl">
            Empêche le modèle d'apprendre par cœur (Overfitting) en le <strong>pénalisant</strong> s'il utilise des poids (w) trop gros. Comme un impôt sur la complexité.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        
        {/* RIDGE */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
              <path d="M 10,50 Q 50,52 90,50" className="opacity-40" />
              <path d="M 50,10 Q 48,50 50,90" className="opacity-40" />
              
              {/* Ridge Circle (budget) */}
              <circle cx="50" cy="50" r="25" className="fill-white/5 stroke-white" strokeDasharray="4 2" />
              
              {/* Ellipses (cost contours) */}
              <ellipse cx="80" cy="30" rx="40" ry="15" transform="rotate(-30 80 30)" className="stroke-blue-400/40" />
              <ellipse cx="80" cy="30" rx="30" ry="10" transform="rotate(-30 80 30)" className="stroke-blue-400/60" />
              <ellipse cx="80" cy="30" rx="20" ry="5" transform="rotate(-30 80 30)" className="stroke-blue-400/80" />
              
              {/* Center dot (unregularized) */}
              <circle cx="80" cy="30" r="2" className="fill-blue-400 stroke-none" />
              
              {/* Intersection dot (Ridge solution) */}
              <circle cx="68" cy="32" r="3" className="fill-blue-500 stroke-none" />
            </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-white">Ridge (L2)</span>
              <span className="font-mono text-[10px] md:text-xs opacity-70 text-white/70 mt-1">
                 + λ Σ w<sub>i</sub>²
              </span>
            </div>
          </div>
          <p className="text-[10px] md:text-xs text-left text-white/50 leading-relaxed">
            Met les poids au "régime" globalement. Les poids deviennent petits mais ne valent (presque) jamais zéro.
          </p>
        </div>

        {/* LASSO */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
              <path d="M 10,50 Q 50,52 90,50" className="opacity-40" />
              <path d="M 50,10 Q 48,50 50,90" className="opacity-40" />
              
              {/* Lasso Diamond (budget) */}
              <polygon points="50,25 75,50 50,75 25,50" className="fill-white/5 stroke-white" strokeDasharray="4 2" strokeLinejoin="round" />
              
              {/* Ellipses (cost contours) */}
              <ellipse cx="80" cy="30" rx="40" ry="20" transform="rotate(20 80 30)" className="stroke-blue-400/40" />
              <ellipse cx="80" cy="30" rx="30" ry="15" transform="rotate(20 80 30)" className="stroke-blue-400/60" />
              <ellipse cx="80" cy="30" rx="20" ry="10" transform="rotate(20 80 30)" className="stroke-blue-400/80" />
              
              {/* Center dot (unregularized) */}
              <circle cx="80" cy="30" r="2" className="fill-blue-400 stroke-none" />
              
              {/* Intersection dot (Lasso solution) -> hits the corner! */}
              <circle cx="75" cy="50" r="3" className="fill-blue-500 stroke-none" />
            </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-white">Lasso (L1)</span>
              <span className="font-mono text-[10px] md:text-xs opacity-70 text-white/70 mt-1">
                 + λ Σ |w<sub>i</sub>|
              </span>
            </div>
          </div>
          <p className="text-[10px] md:text-xs text-left text-white/50 leading-relaxed">
            Grâce à sa forme en losange "pointue", la solution tombe souvent sur un coin (un axe). Résultat : des poids valent <strong>exactement 0</strong> (sélection de variables).
          </p>
        </div>

        {/* ELASTIC NET */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full shrink-0">
            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
              <path d="M 10,50 Q 50,52 90,50" className="opacity-40" />
              <path d="M 50,10 Q 48,50 50,90" className="opacity-40" />
              
              {/* Elastic Net shape (between diamond and circle) */}
              <path d="M 50,22 Q 68,32 78,50 Q 68,68 50,78 Q 32,68 22,50 Q 32,32 50,22 Z" className="fill-white/5 stroke-white" strokeDasharray="4 2" strokeLinejoin="round" />
              
              {/* Ellipses */}
              <ellipse cx="80" cy="30" rx="35" ry="18" transform="rotate(10 80 30)" className="stroke-blue-400/40" />
              <ellipse cx="80" cy="30" rx="25" ry="12" transform="rotate(10 80 30)" className="stroke-blue-400/60" />
              
              <circle cx="80" cy="30" r="2" className="fill-blue-400 stroke-none" />
              
              {/* Intersection dot */}
              <circle cx="71" cy="40" r="3" className="fill-blue-500 stroke-none" />
            </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-white">Elastic Net</span>
              <span className="font-mono text-[10px] md:text-xs opacity-70 text-white/70 mt-1">
                 + λ₁L1 + λ₂L2
              </span>
            </div>
          </div>
          <p className="text-[10px] md:text-xs text-left text-white/50 leading-relaxed">
            Le meilleur des deux mondes. Sélectionne des caractéristiques pertinentes (comme L1) mais garde les groupes de variables corrélées ensemble (comme L2).
          </p>
        </div>
      </div>
      
      

      <div className="flex items-start gap-4 mt-4 pt-4 border-t border-white/5">
        <svg className="w-5 h-5 md:w-6 md:h-6 shrink-0 stroke-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed">
            <strong>Intuition géométrique :</strong> Les ellipses représentent l'erreur du modèle (MSE) face aux données. Le point centré est la solution idéale (sans régularisation). Les formes géométriques en pointillés (cercle, losange) représentent notre <em>budget contraint</em> pour les poids. La solution finale est le point d'impact exact où l'erreur minimale "touche" notre budget permis. Parce que le losange Lasso a des coins pointus sur les axes, le point de contact tombe souvent exactement sur l'axe, mettant ainsi l'une des variables à zéro !
        </p>
      </div>
      


    </div>
  );
}
