import React from 'react';

export default function SVMMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white ">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression Mathématique : Sous le capot du SVM</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* Margin distance */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 20 80 Q 50 50 80 20" className="stroke-white" strokeWidth="2.5" />
               <path d="M 20 80 Q 20 20 80 20" className="stroke-white/10" />
               <path d="M 60 40 Q 64 44 68 48" className="stroke-yellow-400" markerEnd="url(#arrowSvmMath)" />
               <path d="M 60 40 L 52 32" className="stroke-white/50" strokeDasharray="2 2" />
               <text x="75" y="55" fontSize="10" className="stroke-none fill-yellow-400 font-bold font-serif italic">w</text>
               <defs>
                   <marker id="arrowSvmMath" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                     <path d="M 1 1 L 9 5 L 1 9 Z" className="fill-yellow-400 stroke-yellow-400" />
                   </marker>
               </defs>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">1. Vecteur w (Normal)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 L'hyperplan séparateur est <span className="font-serif"><b>w</b>·<b>x</b> + <i>b</i> = 0</span>. Le vecteur <span className="font-serif text-yellow-400 font-bold italic">w</span> est perpendiculaire (normal) à la frontière. Sa longueur ||<b>w</b>|| détermine la largeur de la marge.
               </span>
            </div>
         </div>

         {/* Optimisation */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="15" y="25" width="70" height="50" rx="4" className="stroke-white/40 fill-white/5" />
               <text x="50" y="45" fontSize="10" className="stroke-none fill-white font-serif" textAnchor="middle">min ½||w||² + CΣξ</text>
               <text x="50" y="65" fontSize="8" className="stroke-none fill-white/60 font-serif" textAnchor="middle">sous contrainte y(w·x+b) ≥ 1-ξ</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">2. Optimisation Lagrangienne</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Minimiser ||w|| maximise la marge (qui vaut 2/||w||). On convertit ce problème sous contrainte en utilisant les <strong>multiplicateurs de Lagrange (α)</strong> pour le résoudre efficacement.
               </span>
            </div>
         </div>

         {/* Vecteurs de support uniquement */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="20" cy="50" r="3" className="fill-white/20 stroke-none" />
               <circle cx="35" cy="35" r="3" className="fill-white/20 stroke-none" />
               <circle cx="50" cy="50" r="4" className="fill-yellow-400 stroke-none" />
               <text x="50" y="40" fontSize="8" className="stroke-none fill-yellow-400 font-bold font-serif" textAnchor="middle">α &gt; 0</text>
               
               <circle cx="80" cy="50" r="3" className="fill-white/20 stroke-none" />
               <text x="30" y="65" fontSize="8" className="stroke-none fill-white/50 font-serif" textAnchor="middle">α = 0</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">3. Sparsité (α)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Après résolution, la plupart des α valent 0. Seuls les points sur les bordures ont un <strong>α &gt; 0</strong>. Ce sont les seuls points qui "soutiennent" la frontière (les vecteurs de support).
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-yellow-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                 </svg>
                 Démonstration intuitive : Pourquoi la marge dépend de w ?
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Imaginons que notre frontière de décision soit l'équation <span className="font-serif"><b>w</b>·<b>x</b> + <i>b</i> = 0</span>.
                </p>
                <div className="pl-4 py-2 text-left">
                   <p>1. Les points exactement sur au bord de la marge positive vérifient <span className="font-serif"><b>w</b>·<b>x</b><sub>pos</sub> + <i>b</i> = 1</span></p>
                   <p>2. Les points sur le bord de la marge négative vérifient <span className="font-serif"><b>w</b>·<b>x</b><sub>neg</sub> + <i>b</i> = −1</span></p>
                </div>
                <p>
                  En soustrayant ces deux équations, on obtient :
                  <br/><span className="font-serif pl-4 block mt-1 text-yellow-400"><b>w</b> · (<b>x</b><sub>pos</sub> − <b>x</b><sub>neg</sub>) = 2</span>
                </p>
                <p>
                  La distance <span className="font-serif">(<b>x</b><sub>pos</sub> − <b>x</b><sub>neg</sub>)</span> projetée sur le vecteur normal <span className="font-serif"><b>w</b> / ||<b>w</b>||</span> (vecteur de longueur 1 perpendiculaire à la frontière) représente exactement la largeur géométrique de la marge (M).
                </p>
                <p>
                  On obtient donc : <span className="font-serif">||<b>w</b>|| · M = 2</span>, d'où <span className="font-serif bg-white/10 px-2 py-0.5 rounded font-bold text-white">M = 2 / ||<b>w</b>||</span>
                </p>
                <p className="mt-2">
                  <span className=" font-bold uppercase tracking-wider text-[10px] text-white/50 block">Moralité</span>
                  Pour avoir la marge <strong>la plus large possible</strong> (M maximum), le modèle SVM doit trouver les paramètres qui rendent <strong>||w|| le plus petit possible</strong> (Minimiser ½||w||²), tout en respectant les contraintes de classement correct (les points doivent rester derrière les marges). 
                </p>
             </div>
         </div>
       </div>

    </div>
  );
}
