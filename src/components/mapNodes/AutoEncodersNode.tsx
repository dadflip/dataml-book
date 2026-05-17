import React from 'react';


export default function AutoEncodersNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Auto-Encodeurs</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Entrée</span>
              <span><b>X</b></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Encodeur</span>
              <span><i>f<sub>θ</sub></i>(<b>X</b>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Espace Latent</span>
              <span className="text-[#93c5fd]"><b>Z</b></span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Décodeur</span>
              <span><i>g<sub>ϕ</sub></i>(<b>Z</b>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Reconstruction</span>
              <span className="text-[#93c5fd]"><b>X̂</b></span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
        {/* PIPELINE Auto-Encodeur */}
        <div className="flex flex-col gap-4 lg:col-span-2">
           <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Nettoyage d'une Vieille Photo (Denoising)</span>
           <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4 mb-4">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                 <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                    <rect x="25" y="20" width="50" height="50" rx="2" className="stroke-white/30 fill-transparent" />
                    {/* Noise */}
                    <circle cx="35" cy="35" r="1" className="fill-white" />
                    <circle cx="65" cy="30" r="1" className="fill-white" />
                    <circle cx="45" cy="60" r="1" className="fill-white" />
                    <circle cx="55" cy="45" r="1" className="fill-white" />
                    {/* Subject */}
                    <path d="M 40 40 Q 50 60 60 40" strokeWidth="2" className="stroke-white" />
                 </svg>
                 <div className="flex flex-col gap-1 items-center text-left">
                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Input Bruitée</span>
                    <span className="text-[10px] md:text-xs text-white/60 text-center">Photo abîmée (Pixels)</span>
                 </div>
              </div>
              
              <div className="flex shrink-0 mt-8 md:mt-10">
                <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                 <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                    <rect x="40" y="25" width="20" height="40" rx="4" className="fill-blue-400/20 stroke-blue-400" />
                    <line x1="45" y1="35" x2="55" y2="35" strokeWidth="1.5" className="stroke-blue-400" />
                    <line x1="45" y1="45" x2="55" y2="45" strokeWidth="1.5" className="stroke-blue-400" />
                    <line x1="45" y1="55" x2="55" y2="55" strokeWidth="1.5" className="stroke-blue-400" />
                 </svg>
                 <div className="flex flex-col gap-1 items-center text-left">
                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Compression Latente</span>
                    <span className="text-[10px] md:text-xs text-white/60 text-center">Capture uniquement les grands traits (Le sourire)</span>
                 </div>
              </div>
              
              <div className="flex shrink-0 mt-8 md:mt-10">
                <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                 <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                    <rect x="25" y="20" width="50" height="50" rx="2" className="fill-green-400/10 stroke-green-400" />
                    <path d="M 40 40 Q 50 60 60 40" strokeWidth="2" className="stroke-green-400" />
                 </svg>
                 <div className="flex flex-col gap-1 items-center text-left">
                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Reconstruction</span>
                    <span className="text-[10px] md:text-xs text-white/60 text-center">Décode le motif "propre" (Le bruit a été oublié)</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Architecture Goulot */}
        <div className="flex items-start gap-4 md:gap-6 mt-4">
           <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="10,10 40,35 40,65 10,90" className="fill-white/10 stroke-white" />
              <text x="25" y="54" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Encoder</text>

              <rect x="42" y="38" width="16" height="24" rx="2" className="fill-[#93c5fd]/50 stroke-[#93c5fd]" />
              <text x="50" y="54" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Z</text>

              <polygon points="90,10 60,35 60,65 90,90" className="fill-white/10 stroke-white" />
              <text x="75" y="54" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Decoder</text>

              <circle cx="5" cy="50" r="1" className="fill-white" />
              <circle cx="5" cy="30" r="1" className="fill-white" />
              <circle cx="5" cy="70" r="1" className="fill-white" />
              
              <circle cx="95" cy="50" r="1" className="fill-white" />
              <circle cx="95" cy="30" r="1" className="fill-white" />
              <circle cx="95" cy="70" r="1" className="fill-white" />
           </svg>
           <div className="flex flex-col gap-1 pt-1">
              <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">Architecture Goulot</span>
              <span className="font-mono text-[8px] md:text-[9px] opacity-70 mb-1">
                 Loss = MSE(<b>X</b>, <b>X̂</b>)
              </span>
              <span className="text-[9px] md:text-[10px] leading-relaxed opacity-80">En forçant les données à passer par un espace mathématique compressé de très basse dimension (le Goulot), le réseau est incapable de mémoriser l'image par cœur. Il est obligé d'apprendre les "recettes" (features latentes profondes) qui composent la donnée pour pouvoir la recréer.<br/><br/>Cette propriété est massivement utilisée en filtrage de bruit (Denoising Auto-Encoder) ou détection d'anomalies : si une donnée atypique (ex: fraude carte bleue) passe par le goulot, sa reconstruction sera très mauvaise (car le réseau n'a appris qu'à compresser la normalité).</span>
           </div>
        </div>

        {/* Espace Latent (Interpolation) */}
        <div className="flex items-start gap-4 md:gap-6 mt-4">
           <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Espace Latent continu */}
              <rect x="10" y="10" width="80" height="80" rx="4" className="stroke-white/30 fill-white/5" />
              
              {/* Image 1 -> Latent 1 */}
              <circle cx="25" cy="25" r="4" className="fill-white" />
              <text x="25" y="28" fontSize="8" className="fill-black stroke-none font-bold" textAnchor="middle">A</text>
              
              {/* Image 2 -> Latent 2 */}
              <circle cx="75" cy="75" r="4" className="fill-white" />
              <text x="75" y="78" fontSize="8" className="fill-black stroke-none font-bold" textAnchor="middle">B</text>

              {/* Interpolation line */}
              <line x1="25" y1="25" x2="75" y2="75" strokeWidth="2" strokeDasharray="2,2" className="opacity-80 stroke-[#93c5fd]" />
              
              {/* Intermediate points */}
              <circle cx="41.6" cy="41.6" r="2.5" className="fill-[#93c5fd] opacity-80" />
              <circle cx="58.3" cy="58.3" r="2.5" className="fill-[#93c5fd] opacity-80" />

              <text x="35" y="65" fontSize="8" className="fill-white stroke-none font-mono opacity-80" textAnchor="middle">Transition</text>
              <text x="65" y="35" fontSize="8" className="fill-white stroke-none font-mono opacity-80" textAnchor="middle">Continue</text>
           </svg>
           <div className="flex flex-col gap-1 pt-1">
              <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-wider">L'Espace Latent (Z)</span>
              <span className="font-mono text-[8px] md:text-[9px] opacity-70 mb-1">
                 <b>z</b><i><sub>new</sub></i> = <i>α</i><b>z</b><sub>1</sub> + (1-<i>α</i>)<b>z</b><sub>2</sub>
              </span>
              <span className="text-[9px] md:text-[10px] leading-relaxed opacity-80">L'espace compressé <strong>Z</strong> regroupe sémantiquement les concepts similaires (ex: tous les "visages avec lunettes" seront proches temporellement).<br/><br/>L'interpolation arithmétique entre deux points latents de Z génère des transitions fluides et cohérentes une fois repassée dans le décodeur. Si on part du point codant "Visage Homme" et on avance vers "Visage Femme", on decodera une séquence fluide où les traits se modifient subtilement. Cela a donné plus tard naissance aux générateurs VAE (Variational Auto-Encoders).</span>
           </div>
        </div>
      </div>
      

    </div>
  );
}
