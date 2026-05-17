import React from 'react';


export default function PolynomialRegression() {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
         <div className="flex justify-center w-full shrink-0">
         <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 8,92 Q 50,90 92,92" className="opacity-40" />
            <path d="M 10,92 Q 12,50 8,10" className="opacity-40" />
            
            {/* Polynomial curve */}
            <path d="M 10,85 C 30,10 50,0 70,30 C 80,45 85,50 95,30" className="stroke-blue-400" strokeWidth="2.5" />
            
            {/* Data points */}
            <circle cx="20" cy="65" r="2.5" className="fill-white stroke-none" />
            <circle cx="35" cy="35" r="2.5" className="fill-white stroke-none" />
            <circle cx="50" cy="20" r="2.5" className="fill-white stroke-none" />
            <circle cx="65" cy="25" r="2.5" className="fill-white stroke-none" />
            <circle cx="80" cy="40" r="2.5" className="fill-white stroke-none" />
            <circle cx="95" cy="30" r="2.5" className="fill-white stroke-none" />
         </svg>
         </div>
         <div className="flex flex-col gap-3 text-left">
            <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">Régression Polynomiale</h2>
            <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
               <span className="font-bold">ŷ = w₁x + w₂x² + ... + b</span>
               <span className="text-[8px] md:text-xs opacity-60">J(w) = MSE</span>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Ajoute des puissances aux données (x², x³) pour permettre au modèle de courber sa ligne et capturer des <strong>Relations non-linéaires</strong> complexes.
            </p>
         </div>
      </div>
      

      
      
    </div>
  );
}
