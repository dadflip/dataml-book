import React from 'react';

export default function DeepMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Les Neurones Artificiels</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Le Perceptron */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="20" cy="20" r="5" className="fill-white/10" />
               <circle cx="20" cy="50" r="5" className="fill-white/10" />
               <circle cx="20" cy="80" r="5" className="fill-white/10" />
               
               <line x1="25" y1="20" x2="65" y2="50" className="stroke-white/40" />
               <line x1="25" y1="50" x2="65" y2="50" className="stroke-white/80" strokeWidth="2" />
               <line x1="25" y1="80" x2="65" y2="50" className="stroke-white/20" />
               
               <circle cx="70" cy="50" r="8" className="fill-violet-400 stroke-none" />
               <text x="70" y="53" fontSize="8" className="fill-white stroke-none font-bold" textAnchor="middle">Σ</text>
               
               <path d="M 78 50 L 95 50" className="stroke-violet-400" strokeWidth="2" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Le Neurone (Perceptron)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Il reçoit des signaux (X), les multiplie par des Poids (les "connexions" claires ou foncées), fait la somme globale, et décide de "s'allumer" ou non via une Fonction d'Activation (ReLU).
               </span>
            </div>
         </div>

         {/* Réseau Profond (MLP) */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               {[20, 50, 80].map(y => <circle key={'in'+y} cx="20" cy={y} r="3" className="fill-white/20 stroke-none" />)}
               {[20, 50, 80].map(y => <circle key={'h1'+y} cx="45" cy={y} r="3" className="fill-violet-400 stroke-none" />)}
               {[20, 50, 80].map(y => <circle key={'h2'+y} cx="70" cy={y} r="3" className="fill-violet-400 stroke-none" />)}
               <circle cx="95" cy="50" r="4" className="fill-amber-400 stroke-none" />
               
               {/* Connections symboliques */}
               <path d="M 23 20 L 42 20 M 23 20 L 42 50 M 23 20 L 42 80" className="stroke-white/10" />
               <path d="M 48 20 L 67 20 M 48 50 L 67 50 M 48 80 L 67 80" className="stroke-violet-400/30" />
               <path d="M 73 50 L 91 50 M 73 20 L 91 50" className="stroke-amber-400/50" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">L'Architecture Profonde (MLP)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Empiler des couches permet d'apprendre des concepts de plus en plus abstraits. Couche 1 : lignes. Couche 2 : formes. Couche 3 : visages. La Rétropropagation ajuste tous les poids d'un coup.
               </span>
            </div>
         </div>
         
         {/* CNN (Convolution) */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="10" y="30" width="30" height="30" className="stroke-white/40 fill-none" />
               <rect x="25" y="45" width="10" height="10" className="stroke-violet-400 fill-violet-400/20" />
               
               <path d="M 35 50 Q 55 25 70 45" className="stroke-white/30" strokeDasharray="2 2" fill="none" />
               
               <rect x="70" y="40" width="15" height="15" className="stroke-violet-400 fill-none" />
               <rect x="75" y="45" width="5" height="5" className="fill-violet-400" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Convolutions (CNN)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Un réseau classique "casse" l'image spatiale (pixels en 1 seule ligne). Le CNN scanne l'image 2D avec de "petits carrés" (filtres) pour trouver des motifs n'importe où dans l'image.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                 </svg>
                 Cas concret : Reconnaissance Chien vs Chat (CNN)
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Comment un algorithme peut-il savoir qu'une photo de 1000x1000 pixels (1 million de chiffres !) représente un chien ?
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">L'extraction hiérarchique (Le scan) :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li><strong>Couche 1 :</strong> De petits filtres (ex: 3x3 pixels) scannent l'image. Ils ne repèrent que des <strong className="text-violet-400">contours et des ombres</strong>.</li>
                        <li><strong>Couche 2 :</strong> Combinent les contours pour repérer des <strong className="text-violet-400">textures et des formes primitives</strong> (ex: un cercle, un poil).</li>
                        <li><strong>Couches suivantes :</strong> Assemblent les formes (un cercle + un triangle = <strong className="text-violet-400">une oreille de chat</strong>).</li>
                     </ul>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">La prise de décision finale :</p>
                     <p>La toute dernière couche du réseau (un MLP classique) reçoit une liste simplifiée : "Présence OreillePointue: 80% / Présence Truffe: 90%".</p>
                     <p className="text-amber-400 font-bold">Le réseau sort une probabilité : "Chat à 95%".</p>
                     <p className="mt-1 text-[10px] text-white/50">L'avantage magique ? L'ingénieur n'a pas eu à coder explicitement à quoi ressemble une oreille. L'algorithme a optimisé ses propres filtres par Descente de Gradient.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
