import React from 'react';


export default function NaiveBayes() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         {/* Hand drawn network */}
         <div className="flex w-full justify-center shrink-0">
         <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <defs>
               <marker id="arrowSketchNb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                 <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-white stroke-white" strokeWidth="1" strokeLinejoin="round" />
               </marker>
            </defs>
            
            {/* Y node */}
            <path d="M 50,11 C 59,10 65,16 63,25 C 61,34 52,39 42,37 C 33,35 34,26 38,18 C 42,10 49,11 50,11 Z" className="fill-blue-400/20 stroke-blue-400" strokeWidth="2" />
            <text x="50" y="30" fontSize="14" className="fill-blue-400 stroke-none font-bold" textAnchor="middle">Y</text>
            
            {/* X1, X2, X3 nodes */}
            <path d="M 20,64 C 26,62 31,68 31,75 C 31,82 25,87 18,85 C 11,83 8,76 11,70 C 14,64 19,65 20,64 Z" className="fill-white/5 stroke-white/40" />
            <text x="21" y="80" fontSize="11" className="fill-white/70 stroke-none font-bold" textAnchor="middle">X₁</text>
            
            <path d="M 50,65 C 57,63 60,69 59,75 C 58,81 53,86 46,85 C 39,84 39,76 41,70 C 44,64 49,66 50,65 Z" className="fill-white/5 stroke-white/40" />
            <text x="50" y="80" fontSize="11" className="fill-white/70 stroke-none font-bold" textAnchor="middle">X₂</text>
            
            <path d="M 80,64 C 85,61 90,67 91,73 C 92,79 88,86 81,86 C 74,86 70,78 72,72 C 75,66 79,65 80,64 Z" className="fill-white/5 stroke-white/40" />
            <text x="80" y="80" fontSize="11" className="fill-white/70 stroke-none font-bold" textAnchor="middle">X₃</text>
            
            {/* Sketchy arrows */}
            <path d="M 42,39 Q 30,50 25,62" markerEnd="url(#arrowSketchNb)" strokeDasharray="3 3" />
            <path d="M 50,40 Q 52,50 50,62" markerEnd="url(#arrowSketchNb)" strokeDasharray="3 3" />
            <path d="M 57,38 Q 68,48 76,61" markerEnd="url(#arrowSketchNb)" strokeDasharray="3 3" />
         </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">Naïve Bayes (Bayes Naïf)</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold whitespace-nowrap">P(Y|X) ∝ P(Y) × Π P(Xᵢ|Y)</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Fait une supposition "naïve" : <strong>toutes les caractéristiques sont indépendantes</strong> sachant Y. Très utilisé pour le NLP (texte) car rapide.
            </p>
         </div>
      </div>

      

      <div className="flex flex-col gap-4 mt-6">
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">Pipeline type : Filtre Anti-Spam</span>
        <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
            <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
              {/* Paper shadow */}
              <path d="M 17,27 L 87,27 L 87,67 L 17,67 Z" className="fill-white/10 stroke-none" />
              {/* Envelope drawn */}
              <path d="M 15 25 L 85 24 L 86 65 L 14 64 Z" className="fill-white/5" />
              <path d="M 15 25 Q 50 48 85 24" className="stroke-white" />
              {/* Text stamp */}
              <path d="M 30,8 Q 50,5 70,6 Q 72,16 68,18 Q 48,20 30,17 Z" className="fill-blue-400/30 stroke-none" />
              <text x="50" y="15" fontSize="7" className="stroke-none fill-white font-bold" textAnchor="middle">SPAM?</text>
            </svg>
            <div className="flex flex-col gap-1 items-center text-left">
              <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Texte</span>
              <span className="text-[10px] md:text-xs text-white/60">Email entrant</span>
            </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
            <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
              {/* Bag sketchy */}
              <path d="M 22,25 C 22,15 78,15 78,25 C 85,45 80,70 50,70 C 20,70 15,45 22,25 Z" className="fill-white/5" />
              <path d="M 30,22 Q 50,30 70,22" className="stroke-white" />
              {/* Words coming out */}
              <text x="50" y="38" fontSize="8" className="stroke-none fill-white/80 font-mono font-bold" textAnchor="middle">"gagnez": 1</text>
              <text x="50" y="50" fontSize="8" className="stroke-none fill-white/80 font-mono font-bold" textAnchor="middle">"argent": 1</text>
              <text x="50" y="62" fontSize="8" className="stroke-none fill-white/40 font-mono font-bold" textAnchor="middle">"salut": 0</text>
            </svg>
            <div className="flex flex-col gap-1 items-center text-left">
              <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Comptage</span>
              <span className="text-[10px] md:text-xs text-white/60">Features X</span>
            </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 12,22 Q 25,18 36,20 Q 40,40 38,58 Q 20,62 10,58 Z" className="fill-white/10 stroke-none" />
               <text x="24" y="38" fontSize="8" className="stroke-none fill-white font-bold" textAnchor="middle">P(Spam)</text>
               <text x="24" y="50" fontSize="9" className="stroke-none fill-white/70 font-mono" textAnchor="middle">0.4</text>
               
               <text x="50" y="44" fontSize="12" className="stroke-none fill-white font-bold" textAnchor="middle">×</text>
               
               <path d="M 60,22 Q 75,18 86,24 Q 90,40 86,58 Q 70,62 58,56 Z" className="fill-blue-400/20 stroke-none" />
               <text x="73" y="38" fontSize="7" className="stroke-none fill-blue-400 font-bold" textAnchor="middle">P(mot|Spam)</text>
               <text x="73" y="50" fontSize="9" className="stroke-none fill-blue-400 font-mono" textAnchor="middle">0.8</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Produit</span>
               <span className="text-[10px] md:text-xs text-white/60">Prior × Likelihood</span>
             </div>
          </div>

          <div className="flex shrink-0 mt-8 md:mt-10">
            <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
             <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 22,22 L 78,20 L 80,62 L 20,60 Z" className="fill-blue-400/40" stroke="white" />
               <path d="M 22,22 Q 50,40 80,20" className="stroke-white/40" />
               <path d="M 80,15 C 90,13 95,20 90,30 C 85,35 75,30 80,15" className="fill-red-500 stroke-none" />
               <text x="85" y="24" fontSize="8" className="stroke-none fill-white font-bold" textAnchor="middle">!</text>
               <text x="50" y="50" fontSize="8" className="stroke-none fill-white font-bold" textAnchor="middle">98% SPAM</text>
             </svg>
             <div className="flex flex-col gap-1 items-center text-left">
               <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">4. Décision</span>
               <span className="text-[10px] md:text-xs text-white/60">Classe Maximale</span>
             </div>
          </div>

        </div>
      </div>
      

    </div>
  );
}
