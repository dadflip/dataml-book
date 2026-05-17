import React from 'react';


export default function PCA() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         <div className="flex justify-center w-full">
            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
               {/* Coordinate System */}
               <path d="M 5,50 Q 50,48 95,50" className="opacity-30" />
               <path d="M 50,5 Q 52,50 50,95" className="opacity-30" />
               
               {/* Principal Component 1 (the line) */}
               <path d="M 12,85 Q 50,50 88,15" className="stroke-blue-400" strokeWidth="2.5" />
               
               {/* Principal Component 2 (orthogonal) */}
               <path d="M 33,18 Q 50,50 67,82" className="stroke-white opacity-30" strokeDasharray="3 3" />
               
               {/* Data Points and projections */}
               <circle cx="30" cy="75" r="2.5" className="fill-white stroke-none" />
               <path d="M 30,75 L 26.5,68.5" className="stroke-white opacity-40" strokeDasharray="2 2" />
               
               <circle cx="45" cy="40" r="2.5" className="fill-white stroke-none" />
               <path d="M 45,40 L 58.5,43" className="stroke-white opacity-40" strokeDasharray="2 2" />
               
               <circle cx="60" cy="55" r="2.5" className="fill-white stroke-none" />
               <path d="M 60,55 L 68,36" className="stroke-white opacity-40" strokeDasharray="2 2" />

               <circle cx="75" cy="20" r="2.5" className="fill-white stroke-none" />
               <path d="M 75,20 L 83.5,23.5" className="stroke-white opacity-40" strokeDasharray="2 2" />
            </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">ACP / PCA</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">PCA Max Var(Z)</span>
               <span className="text-[8px] md:text-xs opacity-60">Max Tr(WᵀΣW)</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Recherche les axes orthogonaux (composantes principales) qui maximisent la <strong>variance</strong> (l'étalement) globale des données. Transformation linéaire, très rapide, mais ne capture que la structure globale.
            </p>
         </div>
      </div>
      
      

      <div className="flex flex-col gap-4 mt-4">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">L'Intuition Géométrique</span>
        <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 10 70 L 90 70" className="stroke-white/30" />
                <path d="M 10 70 L 10 10" className="stroke-white/30" />
                
                <circle cx="40" cy="50" r="2" className="fill-white stroke-none" />
                <circle cx="45" cy="40" r="2" className="fill-white stroke-none" />
                <circle cx="50" cy="45" r="2" className="fill-white stroke-none" />
                <circle cx="55" cy="35" r="2" className="fill-white stroke-none" />
                <circle cx="60" cy="30" r="2" className="fill-white stroke-none" />
                
                <ellipse cx="50" cy="40" rx="25" ry="8" transform="rotate(-45 50 40)" className="stroke-blue-400/40 opacity-50" strokeDasharray="2 2" />
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Centrage</span>
               <span className="text-[10px] md:text-xs text-white/60">Nuage de points 2D</span>
             </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <circle cx="40" cy="50" r="2" className="fill-white stroke-none opacity-40" />
                <circle cx="45" cy="40" r="2" className="fill-white stroke-none opacity-40" />
                <circle cx="50" cy="45" r="2" className="fill-white stroke-none opacity-40" />
                <circle cx="55" cy="35" r="2" className="fill-white stroke-none opacity-40" />
                <circle cx="60" cy="30" r="2" className="fill-white stroke-none opacity-40" />

                <path d="M 25 65 L 75 15" className="stroke-blue-400" strokeWidth="2" />
                <path d="M 35 25 L 65 55" className="stroke-red-400" strokeWidth="2" strokeDasharray="3 3"/>
                <text x="75" y="10" fontSize="8" className="stroke-none fill-blue-400 font-bold font-sans">PC1</text>
                <text x="65" y="65" fontSize="8" className="stroke-none fill-red-400 font-bold font-sans">PC2</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Covariance</span>
               <span className="text-[10px] md:text-xs text-white/60">Vecteurs Propres</span>
             </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 10 50 L 90 50" className="stroke-blue-400" strokeWidth="2" />
                
                <circle cx="25" cy="50" r="3" className="fill-blue-400 stroke-none" />
                <circle cx="40" cy="50" r="3" className="fill-blue-400 stroke-none" />
                <circle cx="50" cy="50" r="3" className="fill-blue-400 stroke-none" />
                <circle cx="65" cy="50" r="3" className="fill-blue-400 stroke-none" />
                <circle cx="75" cy="50" r="3" className="fill-blue-400 stroke-none" />
                
                <path d="M 25 45 Q 50 30 75 45" className="stroke-white/30" strokeDasharray="2 2" fill="none" />
                <text x="50" y="25" fontSize="7" className="stroke-none fill-white/60 font-bold font-sans" textAnchor="middle">1D (Variance Max)</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Projection</span>
               <span className="text-[10px] md:text-xs text-white/60">Ignorer PC2</span>
             </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-2 relative py-6 px-4 md:px-6 bg-white/[0.02] border border-white/5 rounded-xl">
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-blue-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                 </svg>
                 Cas concret : Compression d'Images (Eigenfaces)
             </span>
             <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-start text-left">
               <div className="flex justify-center w-full xl:w-1/3 shrink-0">
                  <svg viewBox="0 0 100 60" className="w-40 h-24 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                     <rect x="10" y="10" width="20" height="20" className="fill-white/20 stroke-none" />
                     <rect x="30" y="10" width="20" height="20" className="fill-white/60 stroke-none" />
                     <rect x="10" y="30" width="20" height="20" className="fill-white/30 stroke-none" />
                     <rect x="30" y="30" width="20" height="20" className="fill-white/80 stroke-none" />
                     
                     <path d="M 60 30 L 70 30 L 66 26 M 70 30 L 66 34" className="stroke-blue-400" />
                     
                     <rect x="80" y="20" width="20" height="20" className="fill-blue-400/40 stroke-none" />
                     <text x="90" y="48" fontSize="8" className="fill-blue-300 stroke-none font-bold font-mono text-left" textAnchor="middle">PC1</text>
                  </svg>
               </div>
               <p className="text-sm text-white/80 leading-relaxed">
                 <b>Le problème</b> : Vous avez 10 000 photos de visages en 100x100 pixels. Chaque visage = 10 000 dimensions. Trop lourd !<br/><br/>
                 <b>L'approche ACP</b> : L'ACP trouve les "visages moyens" (Eigenfaces) qui varient le plus (ex: direction de l'éclairage, forme du visage). En ne gardant que les 150 premières Eigenfaces (PC1 à PC150), vous pouvez reconstruire n'importe quel visage avec à peine 1% du poids original. Vous avez écrasé le bruit et gardé l'<strong>essence</strong>.
               </p>
             </div>
         </div>
      </div>
      

    </div>
  );
}
