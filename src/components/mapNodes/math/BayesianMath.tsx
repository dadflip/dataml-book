import React from 'react';

export default function BayesianMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Théorème de Bayes & Incertitude</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="10" y="30" width="80" height="40" rx="4" className="stroke-white/40 fill-white/5" />
               <text x="50" y="55" fontSize="10" className="stroke-none fill-amber-400 font-bold font-serif" textAnchor="middle">P(A|B) = P(B|A)·P(A) / P(B)</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">La Règle d'Or</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Comment mettre à jour notre croyance <strong>P(A)</strong> quand on observe une nouvelle preuve <strong>B</strong> ? C'est le fondement de la pensée Bayésienne : on ne donne jamais une réponse catégorique, on donne une estimation de certitude.
               </span>
            </div>
         </div>

       </div>
    </div>
  );
}
