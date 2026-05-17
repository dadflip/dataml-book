import React from 'react';


export default function KernelNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Kernel Trick</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Espace Original</span>
              <span><b>x</b> ∈ ℝ<i><sup>d</sup></i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Projection</span>
              <span><i>ϕ</i>(<b>x</b>) ∈ ℝ<i><sup>D</sup></i></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Kernel Trick</span>
              <span className="text-[#e2b5ff]"><i>K</i>(<b>x</b>, <b>y</b>) = ⟨<i>ϕ</i>(<b>x</b>), <i>ϕ</i>(<b>y</b>)⟩</span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* 1. Projection en 3D */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* 2D Original Space (Bottom Plane) */}
                  <path d="M 10 80 Q 50 60 90 80 Q 50 100 10 80 Z" strokeWidth="1" className="opacity-40 stroke-dasharray-[2,2]" />
                  
                  {/* Non-linear 2D data */}
                  <circle cx="50" cy="80" r="1.5" className="fill-[#f87171]" />
                  <circle cx="45" cy="78" r="1.5" className="fill-[#f87171]" />
                  <circle cx="55" cy="82" r="1.5" className="fill-[#f87171]" />
                  
                  <ellipse cx="50" cy="80" rx="15" ry="5" strokeWidth="1" className="opacity-30 stroke-white" />
                  <circle cx="28" cy="75" r="1.5" className="fill-white" />
                  <circle cx="72" cy="85" r="1.5" className="fill-white" />
                  
                  {/* Arrow up */}
                  <line x1="50" y1="75" x2="50" y2="40" strokeWidth="1.5" strokeDasharray="1,2" className="opacity-60" />
                  
                  {/* 3D Projected Space (Paraboloid) */}
                  <path d="M 20 40 Q 50 -10 80 40" strokeWidth="2" className="opacity-80 stroke-purple-300" />
                  
                  {/* Projected points */}
                  <circle cx="50" cy="15" r="2.5" className="fill-[#f87171]" />
                  <circle cx="43" cy="22" r="2.5" className="fill-[#f87171]" />
                  <circle cx="57" cy="22" r="2.5" className="fill-[#f87171]" />
    
                  <circle cx="25" cy="35" r="2.5" className="fill-white" />
                  <circle cx="75" cy="35" r="2.5" className="fill-white" />
                  
                  {/* Hyperplane cutting through */}
                  <line x1="10" y1="28" x2="90" y2="28" strokeWidth="2.5" stroke="white" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Projection Dimensionnelle</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-purple-300 bg-purple-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap"><i>ϕ</i> : ℝ<i><sup>d</sup></i> → ℝ<i><sup>D</sup></i> (où D ≫ d)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Des données non-séparables par une droite en 2D peuvent le devenir par un <strong>plan en 3D</strong> (ou plus). Le Kernel transforme indirectement les données pour les rendre <strong>linéairement séparables</strong>.
                </p>
             </div>
           </div>
        </div>

        {/* 2. RBF Kernel */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Axes / Ground plane */}
                  <line x1="10" y1="80" x2="90" y2="80" strokeWidth="1" className="opacity-40" />
                  
                  {/* Gaussian bell curve */}
                  <path d="M 10 80 Q 35 80 40 45 Q 50 15 60 45 Q 65 80 90 80" className="stroke-[#e2b5ff]" strokeWidth="2" />
                  
                  {/* Center point y */}
                  <circle cx="50" cy="80" r="2.5" className="fill-white stroke-none" />
                  <text x="50" y="93" fontSize="8" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">y</text>
                  
                  {/* Point x */}
                  <circle cx="70" cy="80" r="2.5" className="fill-white stroke-none" />
                  <text x="70" y="93" fontSize="8" className="fill-white stroke-none font-bold font-serif" textAnchor="middle">x</text>
                  
                  {/* Distance line */}
                  <path d="M 50 85 L 50 87 L 70 87 L 70 85" strokeWidth="1" className="opacity-50" />
                  <text x="60" y="96" fontSize="6" className="fill-white stroke-none font-mono opacity-70" textAnchor="middle">||x-y||²</text>
    
                  {/* Projection to curve */}
                  <line x1="70" y1="80" x2="70" y2="52" strokeWidth="1" className="stroke-[#e2b5ff] opacity-60" strokeDasharray="2,2" />
                  <circle cx="70" cy="52" r="2" className="fill-[#e2b5ff] stroke-none" />
                  
                  {/* Output value projection */}
                  <line x1="70" y1="52" x2="20" y2="52" strokeWidth="1" className="opacity-40" strokeDasharray="2,2" />
                  <text x="18" y="54" fontSize="7" className="fill-[#e2b5ff] stroke-none font-mono" textAnchor="end">K(x,y)</text>
                  
                  {/* Equation */}
                  <text x="50" y="25" fontSize="6.5" className="fill-white stroke-none font-mono opacity-80" textAnchor="middle">exp(-γ||x-y||²)</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Radial Basis Function (RBF)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-[#e2b5ff] bg-[#e2b5ff]/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap"><i>K</i>(<b>x</b>, <b>y</b>) ∈ ℝ (Scalaire)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  L'astuce (<strong>The Trick</strong>) est de ne <em>jamais calculer</em> la projection explicite <i>ϕ</i>(<b>x</b>) (qui est de dimension <strong>infinie</strong> pour RBF). On calcule directement le produit scalaire via la fonction <i>K</i>, d'où un gain de calcul majeur.
                </p>
             </div>
           </div>
        </div>
      </div>
      

    </div>
  );
}
