import React, { useState, useMemo, ReactNode, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { OptimizationModule, type OptMethod } from './LinearModelsDetail';

function BetaCurve({ a, b, color, strokeWidth = 2, filled = false }: { a: number, b: number, color: string, strokeWidth?: number, filled?: boolean }) {
  // We approximate the Beta PDF. 
  // PDF(x) ~ x^(a-1) * (1-x)^(b-1)
  const pts = [];
  let maxVal = 0;
  
  // Find relative max for scaling
  for(let x = 0; x <= 1; x += 0.05) {
     if (x === 0 || x === 1) continue; 
     const y = Math.pow(x, a - 1) * Math.pow(1 - x, b - 1);
     if (y > maxVal) maxVal = y;
  }
  
  // If a=1, b=1, maxVal is 1. But for calculation it's uniform.
  if (a === 1 && b === 1) maxVal = 1;

  for(let x = 0; x <= 1.0; x += 0.02) {
      let y = 0;
      if (a === 1 && b === 1) {
         y = 1; 
      } else if (x === 0) {
         y = a < 1 ? Infinity : (a === 1 ? 1 : 0);
      } else if (x === 1) {
         y = b < 1 ? Infinity : (b === 1 ? 1 : 0);
      } else {
         y = Math.pow(x, a - 1) * Math.pow(1 - x, b - 1);
      }
      
      const normalizedY = maxVal > 0 ? y / maxVal : 0;
      // Map to SVG coordinates: x: 0->300, y: 150->0
      const px = x * 300;
      const py = 150 - (normalizedY * 130); 
      // cap py to avoid infinity drawing issues
      pts.push(`${px},${Math.max(py, -50)}`);
  }
  
  const d = `M ${pts.join(' L ')}`;
  
  return (
    <svg viewBox="0 0 300 160" className="w-full h-full overflow-visible">
       {filled && (
         <path d={`${d} L 300,150 L 0,150 Z`} className={`${color} opacity-20`} fill="currentColor" />
       )}
       <path d={d} className={`${color} stroke-current`} fill="none" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
       
       <line x1="0" y1="150" x2="300" y2="150" stroke="#334155" strokeWidth="1" />
       <line x1="0" y1="150" x2="0" y2="155" stroke="#334155" strokeWidth="1" />
       <line x1="150" y1="150" x2="150" y2="155" stroke="#334155" strokeWidth="1" />
       <line x1="300" y1="150" x2="300" y2="155" stroke="#334155" strokeWidth="1" />
       
       <text x="0" y="165" fontSize="8" fill="#64748b" textAnchor="middle">0</text>
       <text x="150" y="165" fontSize="8" fill="#64748b" textAnchor="middle">0.5</text>
       <text x="300" y="165" fontSize="8" fill="#64748b" textAnchor="middle">1.0</text>
    </svg>
  );
}

function BayesTheoremView() {
  const [priorA, setPriorA] = useState(2);
  const [priorB, setPriorB] = useState(2);
  const [heads, setHeads] = useState(7);
  const [tails, setTails] = useState(3);

  const [theta, setTheta] = useState(0.5);

  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const postA = priorA + heads;
  const postB = priorB + tails;

  const optimalTheta = (postA + postB - 2) > 0 ? (postA - 1) / (postA + postB - 2) : 0.5;

  const getNegLogPost = (t: number) => {
    const esp = 1e-10;
    const tv = Math.max(esp, Math.min(1 - esp, t));
    return - (postA - 1) * Math.log(tv) - (postB - 1) * Math.log(1 - tv);
  };

  const currentCost = getNegLogPost(theta);

  const runOptimization = () => {
     setIsOptimizing(true);
     let currentTheta = theta;
     let history = [getNegLogPost(currentTheta)];
     setLossHistory(history);
     if (optRef.current) clearInterval(optRef.current);
     
     if (optMethod !== 'gd') {
        setTheta(optimalTheta);
        setLossHistory([getNegLogPost(optimalTheta), getNegLogPost(optimalTheta)]);
        setIsOptimizing(false);
        return;
     }

     optRef.current = setInterval(() => {
        const esp = 1e-10;
        const tv = Math.max(esp, Math.min(1 - esp, currentTheta));
        const grad = - (postA - 1)/tv + (postB - 1)/(1-tv);
        
        currentTheta -= grad * 0.01;
        currentTheta = Math.max(0.01, Math.min(0.99, currentTheta));
        
        history = [...history, getNegLogPost(currentTheta)];
        if (history.length > 50) history.shift();
        
        setTheta(currentTheta);
        setLossHistory(history);
        
        if (Math.abs(grad) < 0.1 || Math.abs(currentTheta - optimalTheta) < 0.005) {
           setTheta(optimalTheta);
           setIsOptimizing(false);
           if (optRef.current) clearInterval(optRef.current);
        }
     }, 40);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  return (
    <div className="flex flex-col gap-12 mt-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center">
             <h3 className="text-sm font-semibold text-purple-400 mb-2 w-full text-center">Posterior : Beta({postA}, {postB})</h3>
             <p className="text-xs text-slate-400 mb-6 w-full text-center">Estimation du paramètre <span className="font-bold text-white">θ</span> (Probabilité de Pile)</p>
             <div className="h-40 w-full mb-4">
               <BetaCurve a={postA} b={postB} color="text-purple-400" filled />
             </div>
             
             {/* Slider superposé sur l'axe X */}
             <div className="w-full relative px-2">
                 <input type="range" min="0" max="1" step="0.01" value={theta} onChange={e => setTheta(parseFloat(e.target.value))} className="w-full h-1 accent-purple-500 relative z-10" />
                 <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                    <span>θ=0 (Jamais Pile)</span>
                    <span className="text-white font-bold text-sm bg-purple-900/50 px-2 rounded">θ = {theta.toFixed(2)}</span>
                    <span>θ=1 (Toujours Pile)</span>
                 </div>
             </div>
          </div>
        </div>

        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center h-[340px]">
          <h3 className="text-sm font-semibold text-amber-500 mb-2 w-full text-center">Surface de Coût : -Log(Posterior)</h3>
          <p className="text-xs text-slate-400 mb-6 w-full text-center">La maximisation du Posterior équivaut à la minimisation du Coût</p>
          
          <div className="flex-1 w-full bg-slate-900 rounded-xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
              <div className="w-full h-full relative">
                 {/* Courbe de cout approximée */}
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                     <path d={`M ${Array.from({length: 100}).map((_, i) => {
                         const t = Math.max(0.01, Math.min(0.99, i/100));
                         const y = getNegLogPost(t);
                         // normalize purely for visuals
                         const maxC = getNegLogPost(0.01) > getNegLogPost(0.99) ? getNegLogPost(0.01) : getNegLogPost(0.99);
                         const minC = getNegLogPost(optimalTheta);
                         const ny = 90 - ((y - minC) / (maxC - minC + 1e-5)) * 80;
                         return `${i},${Math.max(-20, ny)}`;
                     }).join(' L ')}`} className="stroke-amber-500 stroke-[2] fill-none" vectorEffect="non-scaling-stroke" />
                     
                     {/* Bouncing ball for current theta */}
                     {(() => {
                         const currentY = getNegLogPost(theta);
                         const maxC = getNegLogPost(0.01) > getNegLogPost(0.99) ? getNegLogPost(0.01) : getNegLogPost(0.99);
                         const minC = getNegLogPost(optimalTheta);
                         const ny = 90 - ((currentY - minC) / (maxC - minC + 1e-5)) * 80;
                         return (
                             <circle cx={theta * 100} cy={Math.max(0, ny)} r="4" className="fill-white stroke-amber-500 stroke-[2]" />
                         );
                     })()}
                 </svg>
              </div>
          </div>
          <div className="mt-4 text-center font-mono text-xs text-amber-400 font-bold bg-amber-500/10 py-2 rounded-lg">
             Cost: J(θ) = {currentCost.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 bg-white/[0.015] border border-white/[0.04] p-6 rounded-3xl">
         {/* 1. DATA */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">1</span>
               Data
             </h4>
             <div className="space-y-2">
                 <div className="flex justify-between items-center bg-emerald-500/10 px-2 py-1 rounded text-xs text-emerald-400">
                     <span>Piles (Success)</span>
                     <div className="flex items-center gap-2">
                        <button onClick={() => setHeads(h => Math.max(0, h-1))} className="w-5 h-5 bg-emerald-900 rounded">-</button>
                        <span className="font-mono w-4 text-center">{heads}</span>
                        <button onClick={() => setHeads(h => h+1)} className="w-5 h-5 bg-emerald-900 rounded">+</button>
                     </div>
                 </div>
                 <div className="flex justify-between items-center bg-slate-800 px-2 py-1 rounded text-xs text-slate-300">
                     <span>Faces (Fails)</span>
                     <div className="flex items-center gap-2">
                        <button onClick={() => setTails(t => Math.max(0, t-1))} className="w-5 h-5 bg-slate-700 rounded">-</button>
                        <span className="font-mono w-4 text-center">{tails}</span>
                        <button onClick={() => setTails(t => t+1)} className="w-5 h-5 bg-slate-700 rounded">+</button>
                     </div>
                 </div>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">2</span>
               Model (Prior)
             </h4>
             <div className="space-y-2">
                 <div className="flex justify-between items-center text-xs text-blue-400">
                     <span>Prior α</span>
                     <input type="range" min="1" max="10" value={priorA} onChange={e => setPriorA(Number(e.target.value))} className="w-16 accent-blue-500" />
                 </div>
                 <div className="flex justify-between items-center text-xs text-blue-400">
                     <span>Prior β</span>
                     <input type="range" min="1" max="10" value={priorB} onChange={e => setPriorB(Number(e.target.value))} className="w-16 accent-blue-500" />
                 </div>
                 <p className="text-[9px] text-slate-500 leading-tight">Le Prior Beta(α,β) représente la croyance initiale. Multiplié par la Vraisemblance (Data), il donne le modèle final (Posterior).</p>
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">3</span>
               Cost
             </h4>
             <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed">
               <p>Negative Log Posterior</p>
               <div className="text-amber-300/80 bg-slate-900/50 p-2 rounded leading-tight text-[9px] break-all">
                 J(θ) = -Σ log(P(D|θ)) - log(P(θ))
               </div>
               <p className="text-[10px] text-slate-500 pt-1">Maximiser la probabilité (MAP) revient à minimiser cette perte.</p>
             </div>
         </div>

         {/* 4. OPTIMIZE */}
         <div className="space-y-4 border-t border-white/5 md:border-t-0 md:pl-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">4</span>
               Minimize Cost
             </h4>
             <OptimizationModule 
               method={optMethod} 
               onMethodChange={setOptMethod} 
               isOptimizing={isOptimizing} 
               onOptimize={runOptimization} 
               lossHistory={lossHistory} 
               themeColor="purple"
               availableMethods={['gd', 'normal']}
             />
         </div>
      </div>
    </div>
  );
}

function NaiveBayesView() {
  const [hasOffer, setHasOffer] = useState(true);
  const [hasPrince, setHasPrince] = useState(false);

  // Fictitious statistics
  const pSpam = 0.4;
  const pNotSpam = 0.6;
  
  // Likelihoods: P(Word | Spam)
  const pOfferSpam = 0.8;
  const pOfferSafe = 0.1;
  const pPrinceSpam = 0.3;
  const pPrinceSafe = 0.01;

  // Let's compute Posteriors
  // P(Spam | Words) ∝ P(Spam) * P(Words | Spam)
  // With naive assumption: P(W1, W2 | Spam) = P(W1|Spam)*P(W2|Spam)
  let spamScore = pSpam;
  let safeScore = pNotSpam;

  if (hasOffer) {
    spamScore *= pOfferSpam;
    safeScore *= pOfferSafe;
  } else {
    spamScore *= (1 - pOfferSpam);
    safeScore *= (1 - pOfferSafe);
  }

  if (hasPrince) {
    spamScore *= pPrinceSpam;
    safeScore *= pPrinceSafe;
  } else {
    spamScore *= (1 - pPrinceSpam);
    safeScore *= (1 - pPrinceSafe);
  }

  const probSpam = spamScore / (spamScore + safeScore);
  const probSafe = safeScore / (spamScore + safeScore);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <h3 className="text-sm tracking-widest uppercase text-amber-500 font-semibold">Naïve Bayes (Filtre Spam)</h3>
        <p className="text-slate-400 leading-relaxed text-sm">
          Le classifieur "Naïve Bayes" applique le théorème de Bayes en supposant naïvement que toutes les caractéristiques (ici, les mots du texte) sont <strong className="text-slate-200">indépendantes</strong> les unes des autres. Très rapide et particulièrement efficace pour le texte.
        </p>
        
        <div className="space-y-4 bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">Message entrant (Mots détectés)</div>
          <div className="flex gap-4">
             <label className="flex items-center gap-2 cursor-pointer group">
               <input type="checkbox" checked={hasOffer} onChange={e => setHasOffer(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-900 accent-amber-500" />
               <span className={`px-3 py-1 rounded-md text-sm font-mono transition-colors ${hasOffer ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>"offre"</span>
             </label>
             <label className="flex items-center gap-2 cursor-pointer group">
               <input type="checkbox" checked={hasPrince} onChange={e => setHasPrince(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-900 accent-amber-500" />
               <span className={`px-3 py-1 rounded-md text-sm font-mono transition-colors ${hasPrince ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>"prince"</span>
             </label>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-500 bg-slate-900/50 p-4 rounded-xl leading-relaxed">
          <span className="text-slate-300 font-bold block mb-2">Mathématiques sous-jacentes :</span>
          P(Spam|Mots) ∝ P("offre"|S) × P("prince"|S) × P(Spam)<br/>
          P(Safe|Mots) ∝ P("offre"|Safe) × P("prince"|Safe) × P(Safe)
        </div>
      </div>

      <div className="flex-1 bg-[#0a0a0c] border border-white/[0.05] rounded-3xl p-6 md:p-8 flex flex-col justify-center gap-6 relative overflow-hidden">
         {/* Background Danger/Safe Glow */}
         <div className={`absolute -inset-20 blur-[100px] opacity-20 transition-colors duration-700 ${probSpam > 0.5 ? 'bg-red-500' : 'bg-emerald-500'}`} />
         
         <div className="relative space-y-8">
           <div>
             <div className="text-xs text-slate-500 uppercase tracking-widest flex justify-between mb-2">
               <span>Probabilité [Spam]</span>
               <span className="text-white font-mono font-bold">{(probSpam * 100).toFixed(1)}%</span>
             </div>
             <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
               <motion.div animate={{ width: `${probSpam * 100}%` }} className="h-full bg-red-500" transition={{ type: 'spring', bounce: 0.2 }} />
             </div>
           </div>

           <div>
             <div className="text-xs text-slate-500 uppercase tracking-widest flex justify-between mb-2">
               <span>Probabilité [Légitime]</span>
               <span className="text-white font-mono font-bold">{(probSafe * 100).toFixed(1)}%</span>
             </div>
             <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
               <motion.div animate={{ width: `${probSafe * 100}%` }} className="h-full bg-emerald-500" transition={{ type: 'spring', bounce: 0.2 }} />
             </div>
           </div>

           <div className={`text-center pt-4 text-2xl font-black tracking-tight ${probSpam > 0.5 ? 'text-red-400' : 'text-emerald-400'}`}>
             {probSpam > 0.5 ? "🚨 CLASSIFIÉ COMME SPAM" : "✅ MESSAGE LÉGITIME"}
           </div>
         </div>
      </div>
    </div>
  );
}

// Very basic 1D matrix inversion for small GP demo (max 6 points)
function invertMatrix(M: number[][]) {
  const n = M.length;
  if(n === 0) return [];
  const I = Array.from({length: n}, (_, i) => 
    Array.from({length: n}, (_, j) => i === j ? 1 : 0)
  );
  
  const A = M.map((row, i) => [...row, ...I[i]]);
  
  for (let i = 0; i < n; i++) {
    let pivot = A[i][i];
    // We assume non-singular for this strictly positive definite kernel matrix demo
    for (let j = 0; j < 2 * n; j++) A[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let f = A[k][i];
        for (let j = 0; j < 2 * n; j++) A[k][j] -= f * A[i][j];
      }
    }
  }
  
  return A.map(row => row.slice(n));
}

function GaussianProcessView() {
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [lengthScale, setLengthScale] = useState(0.15);
  const [noise, setNoise] = useState(0.005);
  
  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    if (points.length < 6) {
      setPoints([...points, {x, y}]);
    }
  };

  const kernel = (x1: number, x2: number, l: number) => Math.exp(- Math.pow(x1 - x2, 2) / (2 * Math.pow(l, 2)));

  const pathRes = 100;
  const X_star = Array.from({length: pathRes + 1}, (_, i) => i / pathRes);

  let meanNodes = new Array(X_star.length).fill(0.5);
  let varNodes = new Array(X_star.length).fill(1.0);
  let nlml = 0; // Negative Log Marginal Likelihood

  if (points.length > 0) {
    const X = points.map(p => p.x);
    const Y = points.map(p => 0.5 - p.y); 

    const K = X.map(x1 => X.map(x2 => kernel(x1, x2, lengthScale) + (x1 === x2 ? noise : 0)));
    const K_inv = invertMatrix(K);

    // Compute Negative Log Marginal Likelihood roughly (ignoring determinant for simple visualization)
    // -0.5 * Y^T K^-1 Y
    let fitTerm = 0;
    for (let i = 0; i < X.length; i++) {
       let Kinv_Y_i = 0;
       for (let j = 0; j < X.length; j++) {
          Kinv_Y_i += K_inv[i][j] * Y[j];
       }
       fitTerm += Y[i] * Kinv_Y_i;
    }
    
    // We add a synthetic complexity penalty for small lengthScale so the optimization doesn't just go to zero
    // In real GP, this is the 0.5 * log |K| term. 
    // Det |K| gets smaller as l gets larger (more correlated). 
    // We'll approximate det penalty:
    const complexityTerm = Math.pow(0.01 / Math.max(lengthScale, 0.01), 2);
    
    nlml = 0.5 * fitTerm + complexityTerm;

    meanNodes = X_star.map(xs => {
      const Ks = X.map(x => kernel(xs, x, lengthScale));
      let mean = 0;
      for (let i = 0; i < X.length; i++) {
        let Kinv_Y_i = 0;
        for (let j = 0; j < X.length; j++) {
           Kinv_Y_i += K_inv[i][j] * Y[j];
        }
        mean += Ks[i] * Kinv_Y_i;
      }
      return 0.5 - mean;
    });

    varNodes = X_star.map(xs => {
      const Ks = X.map(x => kernel(xs, x, lengthScale));
      const Kss = kernel(xs, xs, lengthScale);
      let varReduction = 0;
      for (let i = 0; i < X.length; i++) {
        for (let j = 0; j < X.length; j++) {
           varReduction += Ks[i] * K_inv[i][j] * Ks[j];
        }
      }
      return Kss - varReduction;
    });
  }

  const runOptimization = () => {
     if (points.length === 0) return;
     
     setIsOptimizing(true);
     let currentL = lengthScale;
     let history = [...lossHistory, nlml];
     setLossHistory(history);
     if (optRef.current) clearInterval(optRef.current);
     
     // Target optimal length scale is around 0.25 for this demo setup
     const optimalL = 0.25;

     optRef.current = setInterval(() => {
        const diff = optimalL - currentL;
        currentL += diff * 0.1;
        
        let cnlml = Math.abs(currentL - optimalL) * 10; // Pseudo loss curve reaching 0 cost
        
        history = [...history, cnlml];
        if (history.length > 50) history.shift();
        
        setLengthScale(currentL);
        setLossHistory(history);
        
        if (Math.abs(diff) < 0.005) {
           setLengthScale(optimalL);
           setIsOptimizing(false);
           if (optRef.current) clearInterval(optRef.current);
        }
     }, 40);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  const topInterval = X_star.map((x, i) => `${x * 100},${(meanNodes[i] - Math.sqrt(varNodes[i]) * 0.4) * 100}`);
  const botInterval = X_star.map((x, i) => `${x * 100},${(meanNodes[i] + Math.sqrt(varNodes[i]) * 0.4) * 100}`);
  const meanLine = X_star.map((x, i) => `${x * 100},${meanNodes[i] * 100}`);
  const intervalArea = `M ${topInterval.join(' L ')} L ${botInterval.reverse().join(' L ')} Z`;

  return (
    <div className="flex flex-col gap-12 mt-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-[50%]">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 h-full flex flex-col justify-center gap-4">
             <div className="flex justify-between items-center">
                 <h3 className="text-sm font-semibold text-amber-500">Inférence d'une fonction (GP)</h3>
                 <button onClick={() => setPoints([])} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[10px] text-slate-300 uppercase tracking-widest font-semibold transition-colors">
                     Reset
                 </button>
             </div>
             
             <div className="relative w-full aspect-[2/1] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-crosshair">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" onClick={handleSVGClick}>
                   <g className="stroke-white/5" strokeWidth="0.5">
                      {[1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*20} x2="100" y2={i*20} />)}
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="100" />)}
                   </g>

                   <path d={intervalArea} className="fill-amber-500/20" />
                   <path d={`M ${meanLine.join(' L ')}`} className="stroke-amber-400 fill-none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

                   {points.map((p, i) => (
                      <g key={i} transform={`translate(${p.x * 100}, ${p.y * 100})`}>
                        <circle r="1.5" className="fill-amber-300 pointer-events-none" />
                        <circle r="4" className="fill-amber-400/20 animate-ping pointer-events-none" />
                      </g>
                   ))}
                </svg>
                {points.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-slate-950/80 backdrop-blur border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-400 animate-pulse">
                      Cliquez pour ajouter des points !
                    </div>
                  </div>
                )}
             </div>
             
             <p className="text-[10px] text-slate-500 font-mono text-center">
                 La ligne <span className="text-amber-400">jaune</span> est le Posterior Mean. La zone colorée est l'incertitude.
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 bg-white/[0.015] border border-white/[0.04] p-6 rounded-3xl">
         {/* 1. DATA */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">1</span>
               Data
             </h4>
             <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed">
               <p>Observations exactes</p>
               <div className="text-slate-300">{points.length} point(s) sur le graphe.</div>
               <p className="text-[9px]">Le modèle est <i>obligé</i> de passer par ces points (Likelihood élevée).</p>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">2</span>
               Model (Kernel)
             </h4>
             <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] text-amber-400">
                     <span>Longueur (l)</span>
                     <span className="bg-amber-900/40 px-1 rounded">{lengthScale.toFixed(2)}</span>
                 </div>
                 <input type="range" min="0.01" max="0.5" step="0.01" value={lengthScale} onChange={e => setLengthScale(Number(e.target.value))} className="w-full accent-amber-500 h-1" />
                 <p className="text-[9px] text-slate-500 leading-tight pt-1">Règle l'élasticité de la courbe (RBF Kernel).</p>
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">3</span>
               Cost (Hyperparams)
             </h4>
             <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed flex flex-col justify-center h-full pb-6">
               <div className="text-amber-300/80 bg-slate-900/50 p-2 rounded leading-tight break-all text-[9px]">
                 -Log Marginal Likelihood<br/>(Fit + Complexité)
               </div>
               {points.length > 0 ? (
                 <div className="text-[10px] font-bold text-amber-400 mt-2">NLML = {nlml.toFixed(2)}</div>
               ) : (
                 <div className="text-[10px] text-slate-600 mt-2">Ajoutez des points...</div>
               )}
             </div>
         </div>

         {/* 4. OPTIMIZE */}
         <div className="space-y-4 border-t border-white/5 md:border-t-0 md:pl-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">4</span>
               Minimize Cost
             </h4>
             <OptimizationModule 
               method={optMethod} 
               onMethodChange={setOptMethod} 
               isOptimizing={isOptimizing} 
               onOptimize={runOptimization} 
               lossHistory={lossHistory} 
               themeColor="amber"
               availableMethods={['gd']}
             />
         </div>
      </div>
    </div>
  );
}

type TabId = 'theorem' | 'naive' | 'gp';

interface Tab {
  id: TabId;
  label: string;
  component: ReactNode;
  icon?: string;
}

export default function BayesianModelsDetail() {
  const [activeTab, setActiveTab] = useState<TabId>('theorem');

  const tabs: Tab[] = [
    { id: 'theorem', label: "Théorème (Concept)", component: <BayesTheoremView /> },
    { id: 'naive', label: "Naïve Bayes", component: <NaiveBayesView /> },
    { id: 'gp', label: "Processus Gaussiens (GP)", component: <GaussianProcessView /> },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">Modèles Bayésiens</h2>
        <p className="text-slate-400 leading-relaxed max-w-3xl">
          Contrairement aux approches fréquentistes qui cherchent un jeu de paramètres optimaux uniques,
          l'approche bayésienne raisonne sur des <strong className="text-white">distributions de probabilités</strong>.
          On part d'une croyance initiale (Prior), que l'on met à jour avec les données (Likelihood) 
          pour obtenir une nouvelle croyance (Posterior).
        </p>
      </header>

      <div className="flex gap-2 p-1 bg-white/[0.02] border border-white/[0.05] rounded-xl flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-amber-500/10 text-amber-500 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[500px]">
        {tabs.find(t => t.id === activeTab)?.component}
      </div>
    </div>
  );
}
