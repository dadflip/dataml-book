import DeepMath from './math/DeepMath';
import React from 'react';


export default function ANNNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/90">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60 mb-1 border-b border-white/10 pb-2">Fiche Récap : Réseaux Denses (ANN)</h4>
      
      {/* Full Network Diagram */}
      <div className="flex flex-col items-center justify-center w-full py-2 mb-4">
        <span className="font-bold text-[11px] uppercase tracking-wider text-left opacity-80 mb-4">Architecture Standard (MLP)</span>
        <div className="w-full max-w-[320px] mx-auto">
           <svg viewBox="0 0 300 200" className="w-full h-auto opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Input Layer */}
              <circle cx="50" cy="50" r="14" className="fill-blue-400/20" />
              <circle cx="50" cy="100" r="14" className="fill-blue-400/20" />
              <circle cx="50" cy="150" r="14" className="fill-blue-400/20" />
              <text x="50" y="53" fontSize="10" className="fill-white stroke-none font-mono" textAnchor="middle">x1</text>
              <text x="50" y="103" fontSize="10" className="fill-white stroke-none font-mono" textAnchor="middle">x2</text>
              <text x="50" y="153" fontSize="10" className="fill-white stroke-none font-mono" textAnchor="middle">x3</text>
              
              {/* Hidden Layer 1 */}
              <circle cx="150" cy="30" r="14" className="fill-white/10" />
              <circle cx="150" cy="76" r="14" className="fill-white/10" />
              <circle cx="150" cy="123" r="14" className="fill-white/10" />
              <circle cx="150" cy="170" r="14" className="fill-white/10" />
              
              {/* Output Layer */}
              <circle cx="250" cy="75" r="14" className="fill-blue-400/80" />
              <circle cx="250" cy="125" r="14" className="fill-blue-400/80" />
              <text x="250" y="78" fontSize="10" className="fill-white stroke-none font-mono" textAnchor="middle">y1</text>
              <text x="250" y="128" fontSize="10" className="fill-white stroke-none font-mono" textAnchor="middle">y2</text>
              
              {/* Connections In -> Hidden */}
              {[50, 100, 150].map((y1, i) => 
                [30, 76, 123, 170].map((y2, j) => (
                  <line key={`in-${i}-${j}`} x1="62" y1={y1} x2="138" y2={y2} strokeWidth={y1 === 100 && y2 === 76 ? "2" : "0.5"} className={y1 === 100 && y2 === 76 ? "stroke-blue-400" : "opacity-30 stroke-white"} />
                ))
              )}

              {/* Connections Hidden -> Out */}
              {[30, 76, 123, 170].map((y1, i) => 
                [75, 125].map((y2, j) => (
                  <line key={`out-${i}-${j}`} x1="162" y1={y1} x2="238" y2={y2} strokeWidth="0.5" className="opacity-30 stroke-white" />
                ))
              )}

              <text x="50" y="18" fontSize="10" className="fill-white stroke-none font-bold opacity-60" textAnchor="middle">Input Array</text>
              <text x="150" y="10" fontSize="10" className="fill-white stroke-none font-bold opacity-60" textAnchor="middle">Hidden Layers</text>
              <text x="250" y="18" fontSize="10" className="fill-white stroke-none font-bold opacity-60" textAnchor="middle">Predictions</text>
           </svg>
        </div>
      </div>

      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* PIPELINE ANN */}
        <div className="flex flex-col gap-4 lg:col-span-2 mt-2">
           <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Estimation Prix Immobilier</span>
           <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4 mb-4">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="15" y="15" width="70" height="50" rx="4" className="stroke-white/30 fill-transparent" />
                  <text x="50" y="32" fontSize="9" className="fill-white stroke-none font-bold" textAnchor="middle">85 m²</text>
                  <text x="50" y="45" fontSize="9" className="fill-white stroke-none font-bold" textAnchor="middle">3 Chambres</text>
                  <text x="50" y="58" fontSize="9" className="fill-white stroke-none font-bold" textAnchor="middle">Paris 11e</text>
               </svg>
                 <div className="flex flex-col gap-1 items-center text-left">
                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Features</span>
                    <span className="text-[10px] md:text-xs text-white/60 text-center">Données d'entrée brutes encodées</span>
                 </div>
              </div>
              
              <div className="flex shrink-0 mt-8 md:mt-10">
                <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
                 <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                    <circle cx="30" cy="40" r="15" className="fill-blue-400/20 stroke-blue-400" />
                    <circle cx="70" cy="40" r="15" className="fill-blue-400/20 stroke-blue-400" />
                    <path d="M 45 40 L 55 40 M 45 35 L 55 45 M 45 45 L 55 35" strokeWidth="1" className="stroke-white/40" />
                 </svg>
                 <div className="flex flex-col gap-1 items-center text-left">
                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Propagation (Hidden)</span>
                    <span className="text-[10px] md:text-xs text-white/60 text-center">Le réseau croise les variables (Surface × Quartier)</span>
                 </div>
              </div>
              
              <div className="flex shrink-0 mt-8 md:mt-10">
                <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="15" y="25" width="70" height="30" rx="6" className="fill-green-400/20 stroke-green-400" />
                  <text x="50" y="44" fontSize="10" className="fill-green-400 stroke-none font-bold" textAnchor="middle">850 000 €</text>
               </svg>
                 <div className="flex flex-col gap-1 items-center text-left">
                    <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Output (Régression)</span>
                    <span className="text-[10px] md:text-xs text-white/60 text-center">Prédiction numérique finale</span>
                 </div>
              </div>
           </div>
        </div>

        {/* 1. Anatomie & Forward Pass */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Inputs */}
                  <circle cx="20" cy="30" r="10" className="fill-blue-400/20" />
                  <circle cx="20" cy="70" r="10" className="fill-blue-400/20" />
                  <text x="20" y="33" fontSize="9" className="fill-white stroke-none font-mono" textAnchor="middle">x₁</text>
                  <text x="20" y="73" fontSize="9" className="fill-white stroke-none font-mono" textAnchor="middle">x₂</text>
    
                  {/* Weights */}
                  <line x1="30" y1="30" x2="62" y2="50" strokeWidth="1.5" className="opacity-50" />
                  <line x1="30" y1="70" x2="62" y2="50" strokeWidth="1.5" className="opacity-50" />
                  <text x="45" y="35" fontSize="8" className="fill-white stroke-none font-mono opacity-80 z-10" textAnchor="middle">w₁</text>
                  <text x="45" y="72" fontSize="8" className="fill-white stroke-none font-mono opacity-80 z-10" textAnchor="middle">w₂</text>
    
                  {/* Neuron */}
                  <circle cx="70" cy="50" r="16" className="fill-white/10" />
                  <path d="M 64 42 L 64 58" strokeWidth="1" className="opacity-40" />
                  <text x="58" y="53" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">Σ</text>
                  <path d="M 68 55 Q 73 55 74 45" strokeWidth="2" className="stroke-blue-400" />
    
                  {/* Bias */}
                  <circle cx="70" cy="20" r="8" className="fill-white/5" />
                  <text x="70" y="23" fontSize="8" className="fill-white stroke-none font-mono" textAnchor="middle">b</text>
                  <line x1="70" y1="28" x2="70" y2="34" strokeWidth="1.5" strokeDasharray="2,2" className="opacity-50" />
    
                  {/* Output */}
                  <line x1="86" y1="50" x2="95" y2="50" strokeWidth="2" markerEnd="url(#arrowWhite)" />
                  <text x="94" y="44" fontSize="10" className="fill-white stroke-none font-mono font-bold" textAnchor="middle">y</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Anatomie (Forward Pass)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">z = (w₁x₁ + w₂x₂ + ...) + b</span>
                   <span className="whitespace-nowrap mt-1">y = Activation(z)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Chaque neurone fait la <strong>somme pondérée</strong> de ses entrées, y ajoute un biais. Puis on passe le résultat dans une <strong>Fonction d'Activation (ex: ReLU, Sigmoïde, Tanh)</strong> pour introduire de la non-linéarité.<br/><br/>
                  Sans cette non-linéarité, un réseau empilant 100 couches serait mathématiquement strictement équivalent à une seule couche de régression linéaire. C'est l'empilement de couches cachées (Hidden Layers) équipées de ces fonctions non-linéaires qui permet au réseau d'apprendre des représentations de plus en plus abstraites et de résoudre des problèmes extrêmement complexes et non-séparables linéairement.
                </p>
             </div>
           </div>
        </div>

        {/* 2. Apprentissage (Backpropagation) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-90 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Loss */}
                  <rect x="70" y="35" width="26" height="26" rx="4" className="stroke-red-400 fill-red-400/10" />
                  <text x="83" y="51" fontSize="9" className="fill-red-400 stroke-none font-bold" textAnchor="middle">Loss</text>
    
                  {/* Nodes */}
                  <circle cx="20" cy="48" r="10" className="fill-white/10" />
                  <circle cx="50" cy="48" r="10" className="fill-white/10" />
                  
                  {/* Forward arrow */}
                  <line x1="30" y1="44" x2="40" y2="44" strokeWidth="2" className="opacity-20" />
                  <line x1="60" y1="44" x2="70" y2="44" strokeWidth="2" className="opacity-20" />
    
                  {/* Backward arrow */}
                  <path d="M 70 54 L 56 54" strokeWidth="2" strokeDasharray="3,3" className="stroke-red-400" />
                  <polygon points="56,54 62,50 62,58" className="fill-red-400 stroke-none" />
                  
                  <path d="M 40 54 L 26 54" strokeWidth="2" strokeDasharray="3,3" className="stroke-red-400" />
                  <polygon points="26,54 32,50 32,58" className="fill-red-400 stroke-none" />
    
                  <text x="33" y="68" fontSize="8" className="fill-red-400 stroke-none font-mono font-bold" textAnchor="middle">∂L/∂w</text>
                  <text x="63" y="68" fontSize="8" className="fill-red-400 stroke-none font-mono font-bold" textAnchor="middle">∂L/∂y</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Apprentissage (Backprop)</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-red-300 bg-red-400/10 w-fit px-3 py-2 rounded-lg leading-tight">
                   <span className="whitespace-nowrap">w_new = w - η·(∂L/∂w)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Le réseau réalise une prédiction (Forward pass), puis la compare à la vérité terrain via une <strong>Fonction de Coût (Loss)</strong>. L'objectif profond de l'entraînement est de trouver les paramètres minimisant cette erreur.<br/><br/>
                  Grâce à la <strong>Backpropagation</strong> (rétropropagation du gradient basée sur la règle mathématique de la chaîne), l'algorithme "comprend" la responsabilité de chaque sous-composant dans l'erreur globale. L'optimiseur (ex: <strong>Descente de Gradient Stochastique, Adam</strong>) met ensuite à jour individuellement chaque point du réseau pour l'améliorer pas à pas, formant le cycle de base du Machine Learning moderne.
                </p>
             </div>
           </div>
        </div>

        {/* 3. Feed Forward (MLP) Lien */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 lg:col-span-2">
           <div className="flex items-start gap-4 p-2 rounded-xl">
             <svg className="w-8 h-8 shrink-0 opacity-80 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
             <div className="flex flex-col pb-1">
                <span className="font-bold text-lg uppercase tracking-wider mb-2 text-white">Lien avec les Transformers (LLM)</span>
                <p className="text-sm leading-relaxed text-white/70">
                  L'architecture ANN n'est pas morte avec l'arrivée des LLM ! Dans chaque bloc d'un Transformer (ex: GPT-4), on trouve un sous-bloc appelé <strong>"Feed Forward Network"</strong> (qui est un simple MLP avec 1 couche cachée bien plus large que l'entrée).<br/><br/>
                  Là où l'<i>Attention</i> mixe les mots entre-eux, le <i>Feed Forward</i> (ANN) est appliqué <b>individuellement</b> sur chaque Token pour "réfléchir" aux informations extraites. C'est dans ces énormes matrices de poids denses que réside une grande partie du "savoir" ou monde factuel du LLM.
                </p>
             </div>
           </div>
        </div>
      </div>
      

      <DeepMath />
    </div>
  );
}
