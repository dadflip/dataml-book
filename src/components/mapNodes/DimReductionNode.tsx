import DimRedMath from './math/DimRedMath';
import React from 'react';
import PCA from './dim_reduction/PCA';
import TSNE from './dim_reduction/TSNE';
import UMAP from './dim_reduction/UMAP';
import LDA from './dim_reduction/LDA';
import CovarianceMath from './dim_reduction/CovarianceMath';

export default function DimReductionNode() {
  return (
    <div className="flex flex-col gap-10 mt-6 text-white max-w-7xl mx-auto">
      {/* Global Pipeline Graphic: Hand-drawn look */}
      <div className="flex flex-col items-center justify-center w-full py-6 mt-2">
        <div className="relative w-full max-w-2xl bg-white/[0.02] border border-white/5 rounded-2xl p-8">
          <div className="relative z-10 flex items-center gap-4 md:gap-8 font-mono text-xs md:text-sm w-full justify-center flex-wrap py-8 px-4">
            
             <div className="flex flex-col items-center text-left gap-2 relative">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 font-sans font-bold">1. High-Dim Data</span>
                <span className="text-white font-bold text-lg">X ∈ ℝ<sup className="text-sm">D</sup></span>
                <div className="grid grid-cols-4 grid-rows-4 gap-0.5 mt-2 opacity-50">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-[1px]" />
                    ))}
                </div>
             </div>
             
             <div className="flex flex-col items-center gap-1">
                 <svg className="w-10 md:w-16 h-4 overflow-visible" preserveAspectRatio="none">
                    <path d="M 0,2 Q 25,0 50,2 M 25,-5 L 50,2 L 25,9" stroke="white" strokeWidth="1.5" fill="none" className="opacity-50" />
                 </svg>
                 <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 font-sans font-bold">f(X)</span>
             </div>
             
             <div className="flex flex-col items-center text-left gap-2 relative">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 font-sans font-bold">2. Low-Dim Embedding</span>
                <div className="relative">
                   <svg className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)] opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M 10,50 Q 50,20 90,50 Q 50,80 10,50 Z" className="fill-blue-400 stroke-blue-400 stroke-[2]"/>
                   </svg>
                   <span className="text-blue-400 font-bold tracking-tighter relative z-10 text-lg">Z ∈ ℝ<sup className="text-sm">d</sup></span>
                </div>
                <div className="flex gap-1 mt-2 mx-auto">
                   <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-400 rounded-full" />
                   <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-400/60 rounded-full" />
                   <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-400/30 rounded-[1px]" />
                </div>
             </div>

          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PCA />
        <LDA />
      </div>

      <CovarianceMath />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <TSNE />
        <UMAP />
      </div>
      <DimRedMath />
    </div>
  );
}
