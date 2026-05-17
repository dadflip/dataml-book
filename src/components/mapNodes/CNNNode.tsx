import DeepMath from './math/DeepMath';
import React from 'react';


export default function CNNNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Architecture CNN</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Input</span>
              <span>Image (Pixels)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Conv + ReLU</span>
              <span>Features Grille</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Pooling</span>
              <span>Downsample</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Dense (FC)</span>
              <span className="text-blue-400">Classification</span>
           </div>
        </div>
      </div>

      

      {/* 2 Models Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
        {/* 1. Convolution */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Image grid */}
                  <rect x="5" y="15" width="40" height="40" rx="2" className="stroke-white/30" />
                  <line x1="15" y1="15" x2="15" y2="55" strokeWidth="1" className="opacity-30" />
                  <line x1="25" y1="15" x2="25" y2="55" strokeWidth="1" className="opacity-30" />
                  <line x1="35" y1="15" x2="35" y2="55" strokeWidth="1" className="opacity-30" />
                  <line x1="5" y1="25" x2="45" y2="25" strokeWidth="1" className="opacity-30" />
                  <line x1="5" y1="35" x2="45" y2="35" strokeWidth="1" className="opacity-30" />
                  <line x1="5" y1="45" x2="45" y2="45" strokeWidth="1" className="opacity-30" />
    
                  {/* Filter / Kernel moving over Image */}
                  <rect x="15" y="25" width="20" height="20" rx="1" className="stroke-blue-400 fill-blue-400/20" strokeWidth="2" />
                  
                  {/* Arrow from Filter to Feature Map */}
                  <path d="M 35 35 L 60 25" strokeWidth="1.5" strokeDasharray="2,2" className="opacity-80" />
                  <path d="M 35 35 L 60 45" strokeWidth="1.5" strokeDasharray="2,2" className="opacity-80" />
    
                  {/* Feature map (smaller grid) */}
                  <rect x="60" y="25" width="20" height="20" rx="1" className="stroke-white/50 fill-blue-400/10" />
                  <line x1="70" y1="25" x2="70" y2="45" strokeWidth="1" className="opacity-50" />
                  <line x1="60" y1="35" x2="80" y2="35" strokeWidth="1" className="opacity-50" />
    
                  {/* The highlighted output pixel */}
                  <rect x="60" y="25" width="10" height="10" className="fill-blue-400" />
                  
                  {/* Math for sliding window */}
                  <text x="50" y="82" fontSize="7" className="fill-white stroke-none font-mono opacity-80" textAnchor="middle">Output = Σ (Image × Filtre)</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. La Convolution</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Partage de Poids & Invariance aux Translations</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Contrairement aux réseaux denses qui perdent la structure spatiale en "aplatissant" l'image (en un long vecteur 1D), le CNN utilise de petits filtres matriciels (ex: 3x3) qui glissent (opération de convolution) sur toute l'image. Chaque filtre s'entraîne à détecter un motif visuel spécifique (un bord vertical, une courbe, un contraste).<br/><br/>
                  Cette architecture offre deux immenses avantages : le <strong>partage des poids</strong> (un même filtre est réutilisé partout, réduisant drastiquement le nombre de paramètres) et l'<strong>invariance spatiale aux translations</strong> (un œil de chat sera reconnu indépendamment de sa position exacte dans l'image).
                </p>
             </div>
           </div>
        </div>

        {/* 2. Pooling & Hierarchy */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Box 1 (Large, shallow) */}
                  <path d="M 10 30 L 30 20 L 30 70 L 10 80 Z" className="fill-white/10 stroke-white/50" strokeWidth="1" />
                  <path d="M 30 20 L 35 15 L 35 65 L 30 70 Z" className="fill-white/10 stroke-white/50" strokeWidth="1" />
                  <path d="M 10 30 L 15 25 L 35 15 L 30 20 Z" className="fill-white/10 stroke-white/50" strokeWidth="1" />
    
                  {/* Pooling operation arrow */}
                  <line x1="40" y1="45" x2="50" y2="45" strokeWidth="2" markerEnd="url(#arrowWhite)" className="opacity-80" />
                  <text x="45" y="40" fontSize="7" className="fill-white stroke-none opacity-80 font-bold" textAnchor="middle">Max Pool</text>
    
                  {/* Box 2 (Smaller, deeper channels) */}
                  <path d="M 55 35 L 70 30 L 70 60 L 55 65 Z" className="fill-blue-400/20 stroke-blue-400/80" strokeWidth="1" />
                  <path d="M 70 30 L 80 20 L 80 50 L 70 60 Z" className="fill-blue-400/20 stroke-blue-400/80" strokeWidth="1" />
                  <path d="M 55 35 L 65 25 L 80 20 L 70 30 Z" className="fill-blue-400/20 stroke-blue-400/80" strokeWidth="1" />
    
                  {/* Hierarchy labels */}
                  <text x="25" y="95" fontSize="8" className="fill-white stroke-none opacity-60" textAnchor="middle">Bords (Haut D.)</text>
                  <text x="70" y="75" fontSize="8" className="fill-white stroke-none opacity-60" textAnchor="middle">Yeux, Nez (Basse D.)</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Max Pooling & Hiérarchie</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-green-300 bg-green-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Réduction spatiale (Downsampling)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  L'opération de <strong>Pooling</strong> (généralement Max Pooling) réduit la dimension spatiale de la Feature Map en ne gardant que le pixel contenant le plus fort signal dans une petite fenêtre (ex: 2x2). Cela compresse l'information et rend le modèle plus robuste aux petites déformations.<br/><br/>
                  L'alternance entre Couches de Convolution et Pooling crée une forte <strong>profondeur hiérarchique</strong> : les premières couches détectent de simples lignes, les couches intermédiaires les combinent en textures ou géométries simples, et les dernières couches identifient des concepts complexes (un museau, une roue de voiture). Enfin, la carte générée est vectorisée ("Flatten") et avalée par un Réseau Dense classique opérant la classification finale.
                </p>
             </div>
           </div>
        </div>
      </div>
       
      {/* PIPELINE CNN */}
      <div className="flex flex-col gap-4 mt-6">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Scan de Chien vs Chat</span>
         <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="25" y="20" width="50" height="50" rx="4" className="stroke-white/30 fill-transparent" />
                  <circle cx="40" cy="40" r="4" className="fill-white stroke-none" />
                  <circle cx="60" cy="40" r="4" className="fill-white stroke-none" />
                  <path d="M 45 55 Q 50 65 55 55" className="stroke-white" />
                  {/* Ears */}
                  <path d="M 30 30 L 25 10 L 45 25" className="stroke-white" />
                  <path d="M 70 30 L 75 10 L 55 25" className="stroke-white" />
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Input</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Photo en pixels</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="25" y="20" width="20" height="20" rx="2" className="fill-blue-400/20 stroke-blue-400" />
                  <rect x="30" y="30" width="20" height="20" rx="2" className="fill-blue-400/40 stroke-blue-400" />
                  <rect x="35" y="40" width="20" height="20" rx="2" className="fill-blue-400/60 stroke-blue-400" />
                  <path d="M 40 45 L 45 45" className="stroke-white max-w-[2px]" />
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Filtres</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Trouver les oreilles</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="15" y="25" width="70" height="30" rx="6" className="fill-green-400/20 stroke-green-400" />
                  <text x="50" y="44" fontSize="10" className="fill-green-400 stroke-none font-bold" textAnchor="middle">CHAT (95%)</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Classe finale</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Réseau Dense</span>
               </div>
            </div>
         </div>
      </div>

      <DeepMath />
    </div>
  );
}
