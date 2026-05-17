import GenerativeMath from './math/GenerativeMath';
import React from 'react';


export default function GenerativeNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 mb-1 border-b border-white/20 pb-2">Fiche Récap : Modèles Génératifs</h4>
      
      {/* Global Pipeline Graphic */}
      <div className="flex flex-col items-center justify-center w-full py-2">
        <div className="flex items-center gap-x-1.5 gap-y-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] w-full font-bold justify-center flex-wrap">
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Bruit Latent</span>
              <span><b>z</b> ~ 𝓝(0, 1)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Génération</span>
              <span><i>G<sub>θ</sub></i>(<b>z</b>)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Évaluation</span>
              <span>Loss (Adv / MSE)</span>
           </div>
           <svg className="w-3 h-3 opacity-60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
           <div className="flex flex-col items-center text-left">
              <span className="mb-1 text-[8px] uppercase tracking-widest opacity-60">Échantillon Synthétique</span>
              <span className="text-blue-400"><b>x̃</b> ≈ <i>P<sub>data</sub></i></span>
           </div>
        </div>
      </div>

      

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* 1. Generative Adversarial Nets */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Generator pipeline */}
                  <circle cx="15" cy="30" r="4" className="fill-white" />
                  <text x="15" y="42" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Bruit (z)</text>
                  
                  <rect x="25" y="24" width="12" height="12" rx="1" className="fill-blue-400/50 stroke-blue-400" />
                  <text x="31" y="32" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">G</text>
    
                  <path d="M 40 30 L 48 30" strokeWidth="1" strokeDasharray="1,1" className="opacity-60" />
                  
                  <rect x="50" y="24" width="12" height="12" className="fill-white/20 stroke-none" /> {/* Fake Data */}
                  <text x="56" y="32" fontSize="8" className="fill-white stroke-none font-mono" textAnchor="middle">x̃</text>
    
                  {/* Discriminator pipeline */}
                  <rect x="50" y="60" width="12" height="12" className="fill-white stroke-none" /> {/* Real Data */}
                  <text x="56" y="68" fontSize="8" className="fill-white stroke-none font-mono" textAnchor="middle">x</text>
    
                  {/* Lines into Discriminator */}
                  <path d="M 64 30 L 70 30 L 70 42" strokeWidth="1.5" />
                  <path d="M 64 66 L 70 66 L 70 54" strokeWidth="1.5" />
    
                  <rect x="68" y="42" width="12" height="12" rx="1" className="fill-blue-200/50 stroke-blue-200" />
                  <text x="74" y="50" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">D</text>
    
                  <path d="M 82 48 L 92 48" strokeWidth="1.5" />
                  <text x="96" y="50" fontSize="8" className="fill-white stroke-none font-mono font-bold">V/F</text>
    
                  {/* Arrow representing gradient feedback from D to G */}
                  <path d="M 74 40 Q 74 10 31 20" strokeWidth="1" strokeDasharray="2,2" className="stroke-blue-200" />
                  <polygon points="31,20 34,18 34,22" className="fill-blue-200 stroke-none" />
    
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. GANs (Réseaux Antagonistes)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">min(<i>G</i>) max(<i>D</i>) <i>V</i>(<i>D</i>, <i>G</i>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Le concept repose sur la théorie des jeux : deux réseaux s'affrontent simultanément. Le <strong>Générateur</strong> (le Faussaire) prend du pur hasard (un vecteur de bruit) et tente de créer une fausse donnée. Le <strong>Discriminateur</strong> (le Policier) analyse un jeu de données contenant de vraies images mélangées aux fausses, et doit distinguer le vrai du faux.<br/><br/>
                  La perte (Loss) de l'un est le gain de l'autre ! Ce tango mathématique oblige le Générateur à créer des images de plus en plus réalistes pour tromper le Policier. Historiquement redoutables, les GANs produisent des images très nettes très rapidement, mais sont notoirement instables à l'entraînement (effondrement de mode).
                </p>
             </div>
           </div>

           {/* PIPELINE GAN */}
           <div className="flex flex-col gap-4 mt-6">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Création de Visages</span>
              <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
                 {/* Step 1 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="20" y="20" width="60" height="40" rx="4" className="stroke-white/30 fill-transparent stroke-dasharray-[2,2]" />
                       <circle cx="50" cy="40" r="16" className="fill-white/10 stroke-none" />
                       <text x="50" y="44" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Bruit Aléatoire</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Graine</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Pixels Chaotiques</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 2 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <rect x="30" y="20" width="40" height="40" rx="4" className="fill-blue-400/20 stroke-blue-400" />
                       <circle cx="50" cy="35" r="5" className="fill-white/80 stroke-none" />
                       <path d="M 40 50 Q 50 60 60 50" className="stroke-white" />
                       <text x="50" y="15" fontSize="10" className="fill-blue-400 stroke-none font-bold" textAnchor="middle">Générateur</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Génération</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Tente de dessiner un visage</span>
                    </div>
                 </div>
                 
                 <div className="flex shrink-0 mt-8 md:mt-10">
                   <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                 </div>
  
                 {/* Step 3 */}
                 <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                    <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                       <circle cx="50" cy="40" r="20" className="fill-red-400/20 stroke-red-400" />
                       <text x="50" y="42" fontSize="8" className="fill-red-400 stroke-none font-bold" textAnchor="middle">FAKE (0%)</text>
                    </svg>
                    <div className="flex flex-col gap-1 items-center text-left">
                       <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Correction</span>
                       <span className="text-[10px] md:text-xs text-white/60 text-center">Discriminateur rejette → G s'améliore</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. Modèles de Diffusion */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Forward Process (Adding Noise) */}
                  <rect x="5" y="20" width="12" height="12" className="fill-white stroke-none" /> {/* Clear Image */}
                  <text x="11" y="16" fontSize="8" className="fill-white stroke-none font-mono" textAnchor="middle">x₀</text>
    
                  <path d="M 20 26 L 30 26" strokeWidth="1.5" className="opacity-60" />
    
                  {/* Noisy Image 1 */}
                  <rect x="35" y="20" width="12" height="12" className="fill-white/70 stroke-none" /> 
                  {/* Noise pixels */}
                  <circle cx="38" cy="24" r="0.5" className="fill-black stroke-none" />
                  <circle cx="44" cy="28" r="0.5" className="fill-black stroke-none" />
                  <circle cx="39" cy="29" r="0.5" className="fill-black stroke-none" />
    
                  <path d="M 50 26 L 60 26" strokeWidth="1.5" className="opacity-60" />
    
                  {/* Pure Noise Image */}
                  <rect x="65" y="20" width="12" height="12" className="fill-white/30 stroke-none" />
                  {/* Many Noise pixels */}
                  <circle cx="68" cy="24" r="0.5" className="fill-black stroke-none" />
                  <circle cx="74" cy="28" r="0.5" className="fill-black stroke-none" />
                  <circle cx="69" cy="29" r="0.5" className="fill-black stroke-none" />
                  <circle cx="70" cy="22" r="0.5" className="fill-black stroke-none" />
                  <circle cx="67" cy="28" r="0.5" className="fill-black stroke-none" />
                  <text x="71" y="16" fontSize="8" className="fill-white stroke-none font-mono" textAnchor="middle">x_T</text>
    
                  {/* Denoising Process (U-Net) */}
                  <path d="M 70 38 Q 70 80 41 80" strokeWidth="1.5" />
                  <polygon points="41,80 44,78 44,82" className="fill-white stroke-none" />
    
                  <rect x="25" y="72" width="16" height="16" rx="2" className="fill-blue-400/50 stroke-blue-400" />
                  <text x="33" y="82" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">U-Net</text>
    
                  <path d="M 25 80 Q 11 80 11 40" strokeWidth="1.5" />
                  <polygon points="11,40 9,43 13,43" className="fill-white stroke-none" />
    
                  <text x="45" y="45" fontSize="7" className="fill-white stroke-none font-bold opacity-60">Débruitage Itératif</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Modèles de Diffusion</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-purple-300 bg-purple-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">Apprend à prédire le Bruit : <i>ε<sub>θ</sub></i>(<b>x</b><i><sub>t</sub></i>, <i>t</i>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Le concept est révolutionnaire : on prend une pile de vraies photos, on y ajoute mathématiquement du <strong>bruit gaussien statique</strong> étape par étape (Processus de Markov), jusqu'à obtenir de la pure "neige" télévisuelle. On entraîne alors un énorme réseau de neurones (souvent une architecture auto-encodeur U-Net) à <strong>inverser ce processus</strong> : on lui donne l'image bruitée, et il doit prédire le bruit exact à soustraire pour revenir à l'étape précédente.<br/><br/>
                  Une fois entraîné, on part de pur hasard (neige) et le modèle sculpte itérativement l'image en retirant le bruit imaginé. Entraînement extrêmement stable, c'est l'architecture derrière Midjourney, DALL-E 3 et Stable Diffusion.
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <GenerativeMath />
    </div>
  );
}
