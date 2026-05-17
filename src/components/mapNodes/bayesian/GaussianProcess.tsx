import React from 'react';


export default function GaussianProcess() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         {/* Sketchy Gaussian Process */}
         <div className="flex justify-center w-full shrink-0">
         <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Axis */}
            <path d="M 8,92 Q 50,90 92,92" className="opacity-40" />
            <path d="M 10,92 Q 12,50 8,10" className="opacity-40" />
            
            {/* Uncertainty zone hand drawn */}
            <path d="M 10,65 C 18,35 25,50 30,55 C 40,65 45,45 55,50 C 65,55 75,30 80,40 C 85,50 95,35 100,45 
                     L 100,55 C 95,45 85,60 80,50 C 75,40 65,65 55,60 C 45,55 40,75 30,65 C 25,60 18,45 10,75 Z" 
                  className="fill-blue-400/20 stroke-none" />
                  
            {/* Main mean function */}
            <path d="M 10,70 C 18,40 25,55 30,60 C 40,70 45,50 55,55 C 65,60 75,35 80,45 C 85,55 95,40 100,50" 
                  className="stroke-blue-400" strokeWidth="2.5" />
            
            {/* Observation points */}
            <path d="M 28,60 A 2 2 0 1 1 32 60 A 2 2 0 1 1 28 60 Z" className="fill-white" />
            <path d="M 53,55 A 2 2 0 1 1 57 55 A 2 2 0 1 1 53 55 Z" className="fill-white" />
            <path d="M 78,45 A 2 2 0 1 1 82 45 A 2 2 0 1 1 78 45 Z" className="fill-white" />
         </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">Processus Gaussiens (GP)</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">f(x) ~ 𝒢𝒫(m(x), k(x, x'))</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Cherche directement la <strong>distribution sur les fonctions</strong>. Donne un <strong>intervalle de confiance (en bleu clair)</strong> ! L'incertitude est minimale (et se pince) aux endroits où l'on a des données.
            </p>
         </div>
      </div>
      
      

      <div className="flex flex-col gap-4 mt-6">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">Pipeline type : Interpolation Spatiale</span>
        <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 12 18 C 30 15, 70 12, 88 18 C 92 30, 85 60, 84 64 C 60 70, 30 65, 16 62 C 10 40, 15 20, 12 18 Z" className="fill-white/10 stroke-white/40" />
                
                <circle cx="30" cy="30" r="3" className="fill-white stroke-none" />
                <path d="M 30,22 L 30,12" className="stroke-white/50" />
                <text x="30" y="9" fontSize="6" className="stroke-none fill-white font-mono font-bold" textAnchor="middle">z=12</text>
                
                <circle cx="70" cy="40" r="3" className="fill-white stroke-none" />
                <path d="M 70,32 L 70,22" className="stroke-white/50" />
                <text x="70" y="19" fontSize="6" className="stroke-none fill-white font-mono font-bold" textAnchor="middle">z=18</text>
                
                <circle cx="45" cy="55" r="3" className="fill-white stroke-none" />
                <path d="M 45,63 L 45,73" className="stroke-white/50" />
                <text x="45" y="80" fontSize="6" className="stroke-none fill-white font-mono font-bold" textAnchor="middle">z=15</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Mesures</span>
               <span className="text-[10px] md:text-xs text-white/60">Observations fixes</span>
             </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
            <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 20 65 L 80 65" className="stroke-white/30" />
                <path d="M 20 65 L 20 20" className="stroke-white/30" />
                <path d="M 20 65 Q 40 25, 80 60" className="stroke-blue-400" strokeWidth="2" />
                <text x="50" y="74" fontSize="7" className="stroke-none fill-white font-mono font-bold" textAnchor="middle">Dist d(x,x')</text>
                <text x="50" y="24" fontSize="7" className="stroke-none fill-blue-400 font-mono font-bold" textAnchor="middle">Kernel K</text>
            </svg>
            <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Corrélation</span>
               <span className="text-[10px] md:text-xs text-white/60">Matrice K</span>
            </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 20,20 Q 50,18 80,22 Q 82,50 78,65 Q 50,68 22,62 Z" className="stroke-white fill-white/10" strokeDasharray="4 2" />
                <path d="M 20,40 Q 50,38 80,42" className="stroke-white/20" />
                <path d="M 50,20 Q 48,45 50,66" className="stroke-white/20" />
                <text x="50" y="30" fontSize="8" className="stroke-none fill-blue-400 font-bold font-mono" textAnchor="middle">K⁻¹</text>
                <text x="50" y="55" fontSize="12" className="stroke-none fill-white opacity-20 font-bold" textAnchor="middle">O(N³)</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Inférence</span>
               <span className="text-[10px] md:text-xs text-white/60">Inversion K</span>
             </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                <path d="M 12 18 C 30 15, 70 12, 88 18 C 92 30, 85 60, 84 64 C 60 70, 30 65, 16 62 C 10 40, 15 20, 12 18 Z" className="fill-blue-400/20 stroke-none" />
                
                <circle cx="30" cy="30" r="3" className="fill-white stroke-none" />
                <circle cx="70" cy="40" r="3" className="fill-white stroke-none" />
                <circle cx="45" cy="55" r="3" className="fill-white stroke-none" />
                
                <circle cx="60" cy="30" r="2" className="fill-blue-400 stroke-none" />
                <circle cx="60" cy="30" r="8" className="stroke-blue-400 fill-blue-400/20" strokeDasharray="2 2" />
                
                <path d="M 64,25 Q 75,18 85,15" className="stroke-blue-400" />
                <text x="88" y="14" fontSize="6" className="stroke-none fill-blue-400 font-mono font-bold">14 ± 2</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">4. Interpolation</span>
               <span className="text-[10px] md:text-xs text-white/60">Moyenne ± Var</span>
             </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}
