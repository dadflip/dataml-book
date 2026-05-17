import TransformerMath from './math/TransformerMath';
import React from 'react';


export default function TransformerNode() {
  return (
    <div className="flex flex-col gap-6 w-full mt-6 text-white/80">
      <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60 mb-1 border-b border-white/10 pb-2">Fiche Récap : Architecture Transformer</h4>
      
      {/* Schéma Architecture Complet */}
      <div className="flex flex-col items-center justify-center w-full py-2 mb-6 border-b border-white/10 pb-8">
        <span className="font-bold text-[11px] uppercase tracking-wider text-left mb-6 text-white">Schéma Macro : Architecture Complète (Encoder-Decoder)</span>
        <div className="w-full max-w-[540px] overflow-visible mx-auto">
           <svg viewBox="0 0 540 470" className="w-full h-auto stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                 <marker id="arrowWhite" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0,0 6,3 0,6" className="fill-white stroke-none" />
                 </marker>
              </defs>

              {/* ==================== ENCODER (Gauche) ==================== */}
              
              {/* Input Tokens */}
              <rect x="80" y="430" width="120" height="20" rx="4" className="stroke-white fill-blue-400/10" />
              <text x="140" y="443" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Tokens Source ("Le chat")</text>

              <line x1="140" y1="430" x2="140" y2="410" strokeWidth="1.5" markerEnd="url(#arrowWhite)"/>

              {/* Embeddings */}
              <rect x="80" y="390" width="120" height="20" rx="4" className="stroke-white fill-white/5" />
              <text x="140" y="403" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Token Embeddings</text>

              {/* Positional Encoding */}
              <circle cx="230" cy="400" r="12" className="stroke-white fill-white/5" />
              <path d="M 223 400 Q 226 395 230 400 T 237 400" className="stroke-blue-400" />
              <text x="230" y="418" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Pos.</text>
              <line x1="200" y1="400" x2="218" y2="400" strokeWidth="1.5" />
              <text x="209" y="397" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">+</text>

              <line x1="140" y1="390" x2="140" y2="360" strokeWidth="1.5" markerEnd="url(#arrowWhite)"/>

              {/* Encoder Block (Nx) */}
              <rect x="40" y="190" width="180" height="170" rx="6" className="stroke-white stroke-dasharray-[4,4] fill-white/5" strokeDasharray="4,4" />
              <text x="30" y="275" fontSize="10" className="fill-white stroke-none font-bold" transform="rotate(-90 30 275)" textAnchor="middle">N × BLOCS ENCODEURS</text>

              {/* Multi-Head Attention */}
              <rect x="80" y="320" width="120" height="26" rx="4" className="stroke-white fill-blue-400/20" />
              <text x="140" y="333" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Multi-Head Attention</text>

              {/* Enc Skip 1 + AddNorm */}
              <line x1="140" y1="360" x2="140" y2="346" strokeWidth="1.5" />
              <path d="M 140" strokeWidth="1.5" markerEnd="url(#arrowWhite)"/> 
              <path d="M 140 353 L 55 353 L 55 290 L 116 290" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />
              <rect x="120" y="280" width="40" height="20" rx="4" className="stroke-white fill-blue-300/20" />
              <text x="140" y="289" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Add &</text>
              <text x="140" y="296" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Norm</text>
              <line x1="140" y1="320" x2="140" y2="300" strokeWidth="1.5" />

              {/* Enc FFN */}
              <rect x="80" y="240" width="120" height="26" rx="4" className="stroke-white fill-blue-400/20" />
              <text x="140" y="253" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Feed Forward (MLP)</text>

              {/* Enc Skip 2 + AddNorm */}
              <line x1="140" y1="280" x2="140" y2="266" strokeWidth="1.5" />
              <path d="M 140 273 L 55 273 L 55 210 L 116 210" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />
              <rect x="120" y="200" width="40" height="20" rx="4" className="stroke-white fill-blue-300/20" />
              <text x="140" y="209" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Add &</text>
              <text x="140" y="216" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Norm</text>
              <line x1="140" y1="240" x2="140" y2="220" strokeWidth="1.5" />

              {/* Enc flow OUT */}
              <path d="M 140 200 L 140 180 L 260 180 L 260 263 L 315 263" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />
              <circle cx="260" cy="180" r="3" className="fill-white stroke-none" />


              {/* ==================== DECODER (Droite) ==================== */}
              
              {/* Input Tokens */}
              <rect x="320" y="430" width="120" height="20" rx="4" className="stroke-white fill-blue-400/10" />
              <text x="380" y="443" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Token Précédent ("&lt;start&gt;")</text>

              <line x1="380" y1="430" x2="380" y2="410" strokeWidth="1.5" markerEnd="url(#arrowWhite)"/>

              {/* Embeddings */}
              <rect x="320" y="390" width="120" height="20" rx="4" className="stroke-white fill-white/5" />
              <text x="380" y="403" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Output Embeddings</text>

              {/* Positional Encoding */}
              <circle cx="470" cy="400" r="12" className="stroke-white fill-white/5" />
              <path d="M 463 400 Q 466 395 470 400 T 477 400" className="stroke-blue-400" />
              <text x="470" y="418" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Pos.</text>
              <line x1="440" y1="400" x2="458" y2="400" strokeWidth="1.5" />
              <text x="449" y="397" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">+</text>

              <line x1="380" y1="390" x2="380" y2="360" strokeWidth="1.5" markerEnd="url(#arrowWhite)"/>

              {/* Decoder Block (Nx) */}
              <rect x="280" y="110" width="180" height="250" rx="6" className="stroke-white stroke-dasharray-[4,4] fill-white/5" strokeDasharray="4,4" />
              <text x="270" y="235" fontSize="10" className="fill-white stroke-none font-bold" transform="rotate(-90 270 235)" textAnchor="middle">N × BLOCS DÉCODEURS</text>

              {/* Masked Multi-Head Attention */}
              <rect x="320" y="330" width="120" height="26" rx="4" className="stroke-white fill-blue-400/20" />
              <text x="380" y="341" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">Masked Multi-Head</text>
              <text x="380" y="351" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">Attention (Causal)</text>

              {/* Dec Skip 1 + AddNorm */}
              <line x1="380" y1="360" x2="380" y2="356" strokeWidth="1.5" />
              <path d="M 380 360 L 295 360 L 295 300 L 356 300" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />
              <rect x="360" y="290" width="40" height="20" rx="4" className="stroke-white fill-blue-300/20" />
              <text x="380" y="299" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Add &</text>
              <text x="380" y="306" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Norm</text>
              <line x1="380" y1="330" x2="380" y2="310" strokeWidth="1.5" />

              {/* Cross Attention */}
              <rect x="320" y="250" width="120" height="26" rx="4" className="stroke-white fill-blue-400/20" />
              <text x="380" y="261" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">Cross Multi-Head</text>
              <text x="380" y="271" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">Attention (K,V from Enc)</text>

              {/* Dec Skip 2 + AddNorm */}
              <line x1="380" y1="290" x2="380" y2="276" strokeWidth="1.5" />
              <path d="M 380 283 L 295 283 L 295 220 L 356 220" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />
              <rect x="360" y="210" width="40" height="20" rx="4" className="stroke-white fill-blue-300/20" />
              <text x="380" y="219" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Add &</text>
              <text x="380" y="226" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Norm</text>
              <line x1="380" y1="250" x2="380" y2="230" strokeWidth="1.5" />

              {/* Dec FFN */}
              <rect x="320" y="170" width="120" height="26" rx="4" className="stroke-white fill-blue-400/20" />
              <text x="380" y="183" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Feed Forward (MLP)</text>

              {/* Dec Skip 3 + AddNorm */}
              <line x1="380" y1="210" x2="380" y2="196" strokeWidth="1.5" />
              <path d="M 380 203 L 295 203 L 295 140 L 356 140" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />
              <rect x="360" y="130" width="40" height="20" rx="4" className="stroke-white fill-blue-300/20" />
              <text x="380" y="139" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Add &</text>
              <text x="380" y="146" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Norm</text>
              <line x1="380" y1="170" x2="380" y2="150" strokeWidth="1.5" />

              {/* Dec flow OUT */}
              <line x1="380" y1="130" x2="380" y2="105" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />


              {/* ==================== OUTPUTS (Haut Droite) ==================== */}
              
              {/* Linear */}
              <rect x="320" y="85" width="120" height="20" rx="4" className="stroke-white fill-white/5" />
              <text x="380" y="98" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Couche Linéaire</text>

              <line x1="380" y1="85" x2="380" y2="65" strokeWidth="1.5" markerEnd="url(#arrowWhite)" />

              {/* Softmax */}
              <rect x="320" y="45" width="120" height="20" rx="4" className="stroke-white fill-blue-400/20" />
              <text x="380" y="58" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Softmax (Probabilités)</text>

              <line x1="380" y1="45" x2="380" y2="25" strokeWidth="1.5" strokeDasharray="2,2" stroke="white" />
              
              {/* Next Token Out */}
              <rect x="320" y="5" width="120" height="20" rx="4" className="fill-blue-400 stroke-none" />
              <text x="380" y="18" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Output Token: "dort"</text>

           </svg>
        </div>
      </div>

      

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
        
        {/* 1. Token Embeddings */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-80 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <text x="50" y="85" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">"chat"</text>
                  <path d="M 50 75 L 50 65" strokeWidth="1" />
                  <rect x="40" y="50" width="20" height="15" rx="2" className="fill-white/5" />
                  <text x="50" y="60" fontSize="7" className="fill-white stroke-none" textAnchor="middle">4920</text>
                  <path d="M 50 50 L 50 40" strokeWidth="1" />
                  <rect x="40" y="10" width="20" height="30" rx="2" className="fill-blue-400/30 stroke-none" />
                  <line x1="43" y1="16" x2="57" y2="16" stroke="white" strokeWidth="0.8" className="opacity-20" />
                  <line x1="43" y1="25" x2="57" y2="25" stroke="white" strokeWidth="0.8" className="opacity-20" />
                  <line x1="43" y1="34" x2="57" y2="34" stroke="white" strokeWidth="0.8" className="opacity-20" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">1. Token Embeddings</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-blue-300 bg-blue-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap"><i>E<sub>input</sub></i> ∈ ℝ<sup><i>N × d<sub>model</sub></i></sup></span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Chaque mot ou sous-mot (Token) est converti en un entier (ID), puis projeté dans un espace vectoriel dense de dimension <i>d<sub>model</sub></i>. Les mots avec un sens similaire se retrouvent proches dans cet espace.
                </p>
             </div>
           </div>
        </div>

        {/* 2. Positional Encoding */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-80 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="25" y="10" width="50" height="20" rx="2" className="fill-blue-400/30 stroke-none" />
                  <text x="50" y="22" fontSize="5" className="fill-white stroke-none" textAnchor="middle">Emb + Pos</text>
                  <path d="M 35 43 Q 50 35 65 43" strokeWidth="1.5" className="stroke-blue-200" />
                  <text x="80" y="45" fontSize="12" className="fill-blue-200 stroke-none font-bold" textAnchor="middle">+</text>
                  <rect x="25" y="60" width="50" height="20" rx="2" className="fill-white/5 stroke-none" />
                  <text x="50" y="72" fontSize="5" className="fill-white opacity-70 stroke-none" textAnchor="middle">Embedding (mot désincarné)</text>
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">2. Positional Encoding</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-purple-300 bg-purple-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap"><i>PE<sub>(pos, 2i)</sub></i> = sin(<i>pos / 10000<sup>2i / d<sub>model</sub></sup></i>)</span>
                   <span className="whitespace-nowrap mt-1"><i>PE<sub>(pos, 2i+1)</sub></i> = cos(<i>pos / 10000<sup>2i / d<sub>model</sub></sup></i>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Contrairement aux RNNs qui lisent le texte mot par mot, l'Attention traite <b>tous les mots simultanément</b>, ce qui cause la perte de l'ordre de la phrase. On additionne un signal mathématique (souvent sinusoïdal) unique à chaque embedding d'entrée pour intégrer la notion de séquence temporelle <i>(1er mot, 2eme mot...)</i>, permettant au modèle de distinguer "Le chien mange le chat" de "Le chat mange le chien".
                </p>
             </div>
           </div>
        </div>

        {/* 3. Self-Attention */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-80 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="15" y="80" width="15" height="15" rx="2" className="fill-white/10" />
                  <rect x="42.5" y="80" width="15" height="15" rx="2" className="fill-blue-400/50 stroke-none" />
                  <rect x="70" y="80" width="15" height="15" rx="2" className="fill-white/10" />
                  
                  <text x="50" y="90" fontSize="5" className="fill-white stroke-none text-left" textAnchor="middle">Query</text>
                  <path d="M 50 80 L 50 60" strokeWidth="1.5" />
                  <rect x="42.5" y="45" width="15" height="10" className="fill-blue-400/20 stroke-none" />
                  <text x="50" y="52" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Q</text>
                  
                  <path d="M 22 80 L 22 60" strokeWidth="1.5" className="opacity-40" />
                  <rect x="15" y="45" width="15" height="10" className="fill-white/5" />
                  <text x="22.5" y="52" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">K, V</text>
                  
                  <path d="M 22 45 Q 50 20 77 20" strokeWidth="1" strokeDasharray="2,2" className="opacity-50" />
                  <path d="M 50 45 Q 63.5 20 77 20" strokeWidth="3" className="stroke-blue-400/80" />
                  <rect x="70" y="5" width="15" height="15" rx="2" className="fill-blue-400 stroke-none" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">3. Self-Attention</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-green-300 bg-green-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap">Attention(<i>Q, K, V</i>) = softmax(<i>Q·K<sup>T</sup> / √d<sub>k</sub></i>) <i>V</i></span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  C'est le cœur de l'architecture. Chaque Token crée une <b>Query (Q)</b> ("que cherché-je pour comprendre mon rôle ?"), qui est comparée aux <b>Keys (K)</b> ("voici qui je suis et ce que je signifie") de tous les autres mots de la phrase. Le produit scalaire donne un poids de pertinence. Ce poids est utilisé pour moyenner les <b>Values (V)</b> de tout le réseau. Ainsi, le mot "banque" saura s'il regarde plutôt vers "argent" ou vers "rivière" pour désambiguïser son sens global.
                </p>
             </div>
           </div>
        </div>

        {/* 4. Cross Attention */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-80 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="10" y="60" width="30" height="30" rx="3" className="fill-white/5 stroke-white stroke-dasharray-[2,2]" strokeDasharray="2,2" />
                  <text x="25" y="77" fontSize="5" className="fill-white stroke-none text-left font-bold" textAnchor="middle">Encoder</text>
                  <path d="M 25 60 L 25 45" strokeWidth="1.5" className="opacity-40" />
                  <rect x="17.5" y="35" width="15" height="10" className="fill-white/10" />
                  <text x="25" y="42" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">K, V</text>
                  
                  <rect x="60" y="60" width="30" height="30" rx="3" className="fill-white/5 stroke-white stroke-dasharray-[2,2]" strokeDasharray="2,2" />
                  <text x="75" y="77" fontSize="5" className="fill-white stroke-none text-left font-bold" textAnchor="middle">Decoder</text>
                  <path d="M 75 60 L 75 45" strokeWidth="1.5" />
                  <rect x="67.5" y="35" width="15" height="10" className="fill-blue-400/20 stroke-none" />
                  <text x="75" y="42" fontSize="6" className="fill-white stroke-none font-bold" textAnchor="middle">Q</text>
                  
                  <path d="M 25 35 Q 50 10 75 10" strokeWidth="2" className="stroke-blue-400/80" />
                  <circle cx="75" cy="10" r="2" className="fill-blue-400 stroke-none" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">4. Cross-Attention</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-yellow-300 bg-yellow-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap">Attn(<i>Q<sub>dec</sub>, K<sub>enc</sub>, V<sub>enc</sub></i>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Dans une architecture complète Encoder-Decoder (ex: Modèle de Traduction T5), le Décodeur génère la <b>Query (Q)</b> en fonction des mots qu'il a déjà traduits, mais il extrait la compréhension profonde (les <b>Keys et Values</b>) directement depuis les mots encodés du texte source. C'est le "pont" entre la lecture et l'écriture.
                </p>
             </div>
           </div>
        </div>

        {/* 5. Feed Forward (MLP) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-80 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="50" cy="80" r="5" className="fill-blue-400/20" />
                  <path d="M 50 75 L 50 65" strokeWidth="1.5" className="opacity-40" />
                  <line x1="50" y1="75" x2="30" y2="55" strokeWidth="1" className="opacity-30" />
                  <line x1="50" y1="75" x2="70" y2="55" strokeWidth="1" className="opacity-30" />
                  
                  <circle cx="30" cy="50" r="5" className="fill-white" />
                  <circle cx="50" cy="50" r="5" className="fill-white" />
                  <circle cx="70" cy="50" r="5" className="fill-white" />
                  
                  <path d="M 50 45 L 50 25" strokeWidth="1.5" className="opacity-40" />
                  <line x1="30" y1="45" x2="50" y2="25" strokeWidth="1" className="opacity-30" />
                  <line x1="70" y1="45" x2="50" y2="25" strokeWidth="1" className="opacity-30" />
                  
                  <circle cx="50" cy="20" r="5" className="fill-green-400/80 stroke-none" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">5. Position-wise FFN</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-red-300 bg-red-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap">FFN(<i>x</i>) = max(0, <i>xW<sub>1</sub> + b<sub>1</sub></i>) <i>W<sub>2</sub> + b<sub>2</sub></i></span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Après s'être mélangées avec le reste de la phrase via l'Attention (qui ne fait que router l'information de manière linéaire), les représentations vectorielles de chaque Token passent <b>individuellement et en parallèle</b> dans un dense sous-réseau de neurones (MLP avec activation ReLU/GELU). C'est précisément dans les énormes matrices de poids internes à ces FFN que le modèle "réfléchit" et stocke ses "connaissances" mémorisées du monde factuel.
                </p>
             </div>
           </div>
        </div>

        {/* 6. Auto-Regressive Decoding (LLM) */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
           <div className="flex flex-col gap-6">
             <div className="flex justify-center w-full shrink-0">
               <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40 shrink-0 opacity-80 stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Output token boxes */}
                  <rect x="5" y="80" width="20" height="12" rx="2" className="fill-white/10 stroke-none" />
                  <text x="15" y="88" fontSize="6" className="fill-white stroke-none" textAnchor="middle">"Le"</text>
    
                  <rect x="28" y="80" width="23" height="12" rx="2" className="fill-white/10 stroke-none" />
                  <text x="39.5" y="88" fontSize="6" className="fill-white stroke-none" textAnchor="middle">"chat"</text>
    
                  <path d="M 25 78 Q 30 70 40 70 Q 50 70 50 40" strokeWidth="1.5" className="opacity-40" />
                  
                  {/* The LLM Model */}
                  <rect x="35" y="20" width="30" height="20" rx="3" className="fill-blue-400/30 stroke-none" />
                  <text x="50" y="32" fontSize="7" className="fill-white stroke-none font-bold" textAnchor="middle">LLM</text>
    
                  {/* Next Token Probability */}
                  <path d="M 65 30 L 80 30" strokeWidth="1.5" />
                  <polygon points="80,30 77,28 77,32" className="fill-white stroke-none" />
                  
                  <rect x="75" y="10" width="20" height="40" rx="2" className="stroke-white/20 fill-white/10" />
                  <rect x="75" y="10" width="20" height="8" className="fill-green-400 stroke-none block" />
                  <text x="85" y="16" fontSize="5" className="fill-black stroke-none font-mono" textAnchor="middle">dort  (0.8)</text>
                  <text x="85" y="25" fontSize="4" className="fill-white stroke-none font-mono opacity-50" textAnchor="middle">mange (0.1)</text>
    
                  {/* Looping back visually */}
                  <path d="M 85 50 Q 85 86 54 86" strokeWidth="1.5" className="stroke-blue-300" strokeDasharray="2,2" />
                  <polygon points="56,84 53,86 56,88" className="fill-blue-300 stroke-none" />
               </svg>
             </div>
             
             <div className="flex flex-col gap-3 text-left">
                <h2 className="font-bold text-lg md:text-xl uppercase tracking-wider text-white">6. Causal & Auto-Régressif</h2>
                <div className="flex flex-col font-mono text-[10px] md:text-sm text-cyan-300 bg-cyan-400/10 w-fit px-3 py-2 rounded-lg leading-tight overflow-x-auto">
                   <span className="whitespace-nowrap"><i>P</i>(<i>w<sub>t</sub></i> | <i>w<sub>1</sub>, w<sub>2</sub>, ..., w<sub>t-1</sub></i>)</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Les Décodeurs utilisent une <b>Masked Attention Causal</b> pour s'interdire de lire les futurs Tokens. Ils prédisent les probabilités du mot suivant (Softmax), qui est tiré au sort puis <b>ré-injecté en entrée</b> pour continuer la boucle.
                </p>
             </div>
           </div>
        </div>

      </div>

      {/* Familles de Transformers */}
      <div className="flex flex-col w-full py-4 pt-6 border-t border-black/10 mt-2">
         <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-60 mb-6 text-left">Les 3 Familles d'Architectures</h4>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Encoder Only */}
            <div className="flex flex-col items-center">
               <span className="font-bold text-[11px] uppercase tracking-wider mb-2">Encoder Only</span>
               <span className="text-[9px] font-mono opacity-60 mb-4 px-2 py-0.5 rounded border border-black/10">ex: BERT, RoBERTa</span>
               
               <svg viewBox="0 0 100 80" className="w-[100px] h-[80px] mb-4 stroke-black fill-none" strokeWidth="1.5">
                  {/* Bi-directional links */}
                  <circle cx="20" cy="65" r="5" className="fill-white" />
                  <circle cx="50" cy="65" r="5" className="fill-white" />
                  <circle cx="80" cy="65" r="5" className="fill-white" />
                  <path d="M 20 57 L 20 40 M 50 57 L 50 40 M 80 57 L 80 40" strokeWidth="1" />
                  <path d="M 22 57 L 48 40 M 52 57 L 78 40 M 78 57 L 52 40 M 48 57 L 22 40" className="opacity-40" strokeDasharray="1,1" strokeWidth="1" />
                  <path d="M 18 57 L 76 40 M 82 57 L 24 40" className="opacity-20" strokeDasharray="1,1" strokeWidth="1" />
                  
                  <rect x="5" y="20" width="90" height="20" rx="3" className="stroke-black/30 fill-transparent" />
                  <text x="50" y="33" fontSize="7" className="fill-black stroke-none font-bold" textAnchor="middle">Masked Language Modeling</text>
               </svg>

               <p className="text-[9px] text-left leading-relaxed opacity-80 mt-2">
                 Le modèle lit la phrase <b>dans les deux sens</b> (bidirectionnel) simultanément pour extraire un contexte riche et complet. En pré-entraînement, il l'apprend en prédisant des mots masqués ("Le [MASK] dort"). C'est l'architecture reine pour les tâches de <b>classification NLP</b>, d'extraction d'entités, d'analyse de sentiments et embedding de phrases.
               </p>
            </div>

            {/* Decoder Only */}
            <div className="flex flex-col items-center">
               <span className="font-bold text-[11px] uppercase tracking-wider mb-2">Decoder Only</span>
               <span className="text-[9px] font-mono opacity-60 mb-4 px-2 py-0.5 rounded border border-black/10">ex: GPT-3, LLaMA</span>
               
               <svg viewBox="0 0 100 80" className="w-[100px] h-[80px] mb-4 stroke-black fill-none" strokeWidth="1.5">
                  {/* Uni-directional links */}
                  <circle cx="20" cy="65" r="5" className="fill-white" />
                  <circle cx="50" cy="65" r="5" className="fill-white" />
                  <circle cx="80" cy="65" r="5" className="fill-white" />
                  <path d="M 20 57 L 20 40 M 50 57 L 50 40 M 80 57 L 80 40" strokeWidth="1" />
                  {/* Left to right ONLY */}
                  <path d="M 22 57 L 48 40 M 52 57 L 78 40" className="opacity-60" strokeDasharray="1,1" strokeWidth="1" />
                  <path d="M 22 57 L 76 40" className="opacity-40" strokeDasharray="1,1" strokeWidth="1" />
                  
                  <rect x="5" y="20" width="90" height="20" rx="3" className="stroke-[#0c4a6e]/50 stroke-2 fill-transparent" />
                  <text x="50" y="33" fontSize="7" className="fill-[#0c4a6e] stroke-none font-bold" textAnchor="middle">Causal (Auto-régressif)</text>
               </svg>

               <p className="text-[9px] text-left leading-relaxed opacity-80 mt-2">
                 Chaque mot ne peut mathématiquement voir <b>que le passé</b> (via la Masked Causal Attention) pour simuler la lecture ou l'écriture humaine de gauche à droite. Le modèle s'entraîne massivement à toujours prédire de manière auto-régressive le <b>mot suivant</b>. C'est l'architecture adoptée par l'écrasante majorité des LLMs modernes (ChatGPT, Claude, LLaMA) et qui permet de simuler un raisonnement Zero-Shot ou Few-Shot.
               </p>
            </div>

            {/* Encoder-Decoder */}
            <div className="flex flex-col items-center">
               <span className="font-bold text-[11px] uppercase tracking-wider mb-2">Encoder-Decoder</span>
               <span className="text-[9px] font-mono opacity-60 mb-4 px-2 py-0.5 rounded border border-black/10">ex: T5, BART</span>
               
               <svg viewBox="0 0 100 80" className="w-[100px] h-[80px] mb-4 stroke-black fill-none" strokeWidth="1.5">
                  {/* Encoder */}
                  <rect x="10" y="45" width="25" height="25" rx="3" className="stroke-black/30 fill-transparent" />
                  <text x="22.5" y="58" fontSize="6" className="fill-black stroke-none font-bold" textAnchor="middle">ENC</text>
                  
                  <path d="M 35 57 L 50 57" className="opacity-60" />
                  <polygon points="50,57 47,55 47,59" className="fill-black stroke-none" />
                  <text x="42.5" y="50" fontSize="5" className="fill-black stroke-none opacity-80" textAnchor="middle">Contexte</text>

                  {/* Decoder */}
                  <rect x="50" y="25" width="40" height="45" rx="3" className="stroke-[#0c4a6e]/50 stroke-2 fill-transparent" />
                  <text x="70" y="43" fontSize="6" className="fill-[#0c4a6e] stroke-none font-bold" textAnchor="middle">DEC</text>
                  <path d="M 70 25 L 70 15" className="stroke-[#0c4a6e]" />
                  <polygon points="70,15 68,18 72,18" className="fill-[#0c4a6e] stroke-none" />
               </svg>

               <p className="text-[9px] text-left leading-relaxed opacity-80 mt-2">
                 L'<b>Encoder</b> lit toute la séquence entrée simultanément de manière bidirectionnelle pour capturer tout le contexte d'un coup, puis le <b>Decoder</b> auto-régressif génère la réponse finale mot par mot en croisant constamment ses prédictions avec ce qu'a lu l'encodeur (Cross-Attention). Elle reste très utilisée en traduction, résumé de texte, et dictée vocale (Whisper).
               </p>
            </div>
         </div>
      </div>
      
      {/* PIPELINE Transformer */}
      <div className="flex flex-col gap-4 mt-6">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Cas Concret : Traduction (Anglais → Français)</span>
         <div className="flex flex-wrap items-start justify-center md:justify-start gap-y-10 gap-x-2 md:gap-x-6 mt-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="10" y="30" width="80" height="20" rx="4" className="stroke-white/30 fill-transparent" />
                  <text x="50" y="44" fontSize="10" className="fill-white stroke-none font-bold" textAnchor="middle">"The cat sleeps"</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">1. Input</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Phrase Source</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="30" y="20" width="40" height="40" rx="4" className="fill-blue-400/20 stroke-blue-400" />
                  <path d="M 40 30 L 60 50 M 60 30 L 40 50" strokeWidth="1" className="stroke-white/30" />
                  <text x="50" y="68" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Contexte Global</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">2. Encoding</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Attention Bidirectionnelle</span>
               </div>
            </div>
            
            <div className="flex shrink-0 mt-8 md:mt-10">
              <svg className="w-5 h-5 opacity-30 stroke-white" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 w-[110px] md:w-[150px]">
               <svg viewBox="0 0 100 80" className="w-24 md:w-32 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
                  <rect x="15" y="30" width="70" height="20" rx="4" className="fill-green-400/20 stroke-green-400" />
                  <text x="50" y="44" fontSize="10" className="fill-green-400 stroke-none font-bold" textAnchor="middle">"Le chat..."</text>
               </svg>
               <div className="flex flex-col gap-1 items-center text-left">
                  <span className="font-bold text-[10px] md:text-[11px] uppercase tracking-widest text-white">3. Decoding</span>
                  <span className="text-[10px] md:text-xs text-white/60 text-center">Génération mot à mot</span>
               </div>
            </div>
         </div>
      </div>

      <TransformerMath />
    </div>
  );
}
