import React from 'react';

export default function GenerativeMath() {
  return (
    <div className="flex flex-col gap-6 xl:col-span-2 border-t border-white/10 pt-10 mt-4 text-white">
       <h3 className="font-bold text-lg md:text-xl text-white">Digression : Les Modèles Génératifs</h3>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-4">
         
         {/* GANs */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <rect x="5" y="40" width="20" height="20" rx="2" className="stroke-violet-400 fill-violet-400/20" />
               <text x="15" y="52" fontSize="6" className="fill-violet-400 stroke-none font-bold" textAnchor="middle">GEN</text>
               
               <path d="M 28 50 L 42 50" className="stroke-white/40" />
               
               <rect x="45" y="40" width="20" height="20" rx="2" className="stroke-amber-400 fill-amber-400/20" />
               <text x="55" y="52" fontSize="6" className="fill-amber-400 stroke-none font-bold" textAnchor="middle">DISC</text>
               
               <path d="M 68 50 L 82 50" className="stroke-white/40" />
               
               <text x="90" y="48" fontSize="6" className="fill-red-400 stroke-none" textAnchor="middle">Vrai?</text>
               <text x="90" y="56" fontSize="6" className="fill-green-400 stroke-none" textAnchor="middle">Faux?</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">GANs (Le Faussaire et l'Expert)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Deux réseaux s'affrontent. Le Générateur crée de fausses images (le faussaire). Le Discriminateur essaie de repérer si l'image est vraie ou fausse (l'expert). Les deux s'améliorent en continu.
               </span>
            </div>
         </div>

         {/* Diffusion */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <circle cx="20" cy="50" r="10" className="fill-white/80 stroke-none" />
               <path d="M 33 50 L 45 50" className="stroke-white/40" />
               
               {/* Noise generation */}
               <circle cx="60" cy="50" r="10" className="fill-white/40 stroke-none" />
               <path d="M 60 50 l 2 -2 l -4 1 l 1 3" className="stroke-white/80" strokeWidth="0.5" />
               <path d="M 73 50 L 85 50" className="stroke-white/40" />
               
               <circle cx="95" cy="50" r="10" className="fill-white/10 stroke-none" />
               
               <path d="M 90 25 Q 60 10 30 25" className="stroke-violet-400" strokeWidth="2" fill="none" />
               <polygon points="30,25 35,22 35,28" className="fill-violet-400 stroke-none" />
               <text x="60" y="15" fontSize="6" className="fill-violet-400 stroke-none" textAnchor="middle">Débruitage (UNet)</text>
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Diffusion (Midjourney, Stable Dif.)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 On prend une vraie image, on y ajoute du bruit jusqu'à obtenir de la "neige". Le réseau apprend l'opération inverse : retirer la neige progressivement pour faire (ré)apparaître une image cohérente.
               </span>
            </div>
         </div>
         
         {/* VAE (Auto-encodeurs Variationnels) */}
         <div className="flex flex-col gap-4">
            <svg viewBox="0 0 100 100" className="w-full h-24 shrink-0 stroke-white fill-none overflow-visible" strokeWidth="1.5">
               <path d="M 20 20 L 40 40 L 40 60 L 20 80 Z" className="fill-white/10 stroke-white/40" />
               <circle cx="50" cy="50" r="5" className="fill-violet-400 stroke-none" />
               <circle cx="50" cy="50" r="10" className="stroke-violet-400/40 fill-violet-400/10" />
               
               <path d="M 80 20 L 60 40 L 60 60 L 80 80 Z" className="fill-white/10 stroke-white/40" />
            </svg>
            <div className="flex flex-col gap-1">
               <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wider">Espace Latent (VAE)</span>
               <span className="text-[10px] md:text-xs leading-relaxed opacity-80 mt-1">
                 Comprime une donnée dans un "espace de concepts" (le point violet). Au lieu d'un simple point, le modèle apprend une zone (Distribution Statistique). On peut "piocher" une nouvelle coordonnée dans cette zone pour générer un objet inédit.
               </span>
            </div>
         </div>

       </div>

       {/* Exemple de calcul concret */}
       <div className="flex flex-col mt-8 relative py-8 px-4 md:px-8 bg-white/[0.02] border border-white/5 rounded-xl">
         
         <div className="relative z-10 flex flex-col gap-4">
             <span className="font-bold text-sm text-white inline-flex items-center gap-2">
                 <svg className="w-4 h-4 stroke-violet-400 fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                 </svg>
                 Cas concret : Comment Stable Diffusion "dessine" un astronaute ?
             </span>
             
             <div className="flex flex-col gap-4 text-xs md:text-sm text-white/80 leading-relaxed text-left">
                <p>
                  Les humains dessinent à partir d'une page blanche. Les modèles de Diffusion "dessinent" à partir de la neige de télévision locale.
                </p>
                
                <div className="pl-4 py-2 border-l-2 border-white/10 flex flex-col gap-3">
                   <div>
                     <p className="font-bold text-white/50">L'Étape 0 (Bruit pur) :</p>
                     <p>Le réseau part d'une image remplie de pixels totalement aléatoires (Bruit de Gauss). On lui injecte le texte de la commande (le <i>prompt</i>) : "Un astronaute sur un cheval".</p>
                   </div>
                   
                   <div>
                     <p className="font-bold text-white/50">L'inférence (Le Débruitage Itératif) :</p>
                     <ul className="list-disc pl-5 mt-1 opacity-80 space-y-1">
                        <li><strong>Pas 1 :</strong> Le réseau modifie infimement quelques pixels pour que la neige ressemble 1% à une forme globale claire et sombre (qui lui rappelle mathématiquement l'espace latent d'un cheval et d'un cosmonaute).</li>
                        <li><strong>Pas 20 :</strong> Le réseau affine les textures. Le casque spatial commence à apparaître dans les pixels.</li>
                        <li><strong>Pas 50 :</strong> Le réseau ajoute les détails micro-structuraux (reflets sur le casque, poils du cheval).</li>
                     </ul>
                     <p className="text-violet-400 font-bold mt-2">Résultat : Ce qui était un tas de pixels statiques a été "sculpté" mathématiquement en une image hyperréaliste.</p>
                   </div>
                </div>
             </div>
         </div>
       </div>

    </div>
  );
}
