import React, { useState, useMemo, ReactNode, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OptimizationModule, type OptMethod } from './LinearModelsDetail';

export default function NonParametricModelsDetail() {
  const [activeTab, setActiveTab] = useState<'knn' | 'tree' | 'svm'>('knn');

  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-3xl">
         <h2 className="text-3xl font-bold tracking-tight text-white font-sans">Modèles Non-Paramétriques</h2>
         <p className="text-white/80 text-lg font-light leading-relaxed">
           Ces modèles ne supposent pas une forme mathématique fixe globale. Ils "mémorisent" les données ou s'adaptent localement à leur structure : K-Nearest Neighbors, Arbres de Décision, et Séparateurs à Vaste Marge (SVM).
         </p>
      </div>

      <div className="flex flex-wrap gap-2 pb-4">
        <TabButton active={activeTab === 'knn'} onClick={() => setActiveTab('knn')} color="purple">K-Nearest Neighbors</TabButton>
        <TabButton active={activeTab === 'tree'} onClick={() => setActiveTab('tree')} color="amber">Arbres de Décision (Split)</TabButton>
        <TabButton active={activeTab === 'svm'} onClick={() => setActiveTab('svm')} color="pink">SVM & Hinge Loss</TabButton>
      </div>

      <div className="min-h-[500px]">
         {activeTab === 'knn' && <KNNView />}
         {activeTab === 'tree' && <TreeView />}
         {activeTab === 'svm' && <SVMView />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, color, children }: { active: boolean, onClick: () => void, color: 'amber'|'blue'|'pink'|'purple'|'emerald', children: ReactNode }) {
  const colors = {
    amber: 'text-white bg-white/10',
    blue: 'text-white bg-white/10',
    pink: 'text-white bg-white/10',
    purple: 'text-white bg-white/10',
    emerald: 'text-white bg-white/10'
  };
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
        active 
          ? `${colors[color]} shadow-[0_0_20px_rgba(0,0,0,0.2)]` 
          : 'text-white/80 bg-white/5 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function KNNView() {
  const [k, setK] = useState(3);
  
  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const { trainData, valData } = useMemo(() => {
     let seed = 1234;
     const rng = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
     const gen = (n: number) => Array.from({length:n}).map(() => {
         const x = rng() * 100;
         const y = 50 + Math.sin(x/10) * 20 + (rng() - 0.5) * 15;
         return {x, y};
     });
     return { trainData: gen(30).sort((a,b)=>a.x-b.x), valData: gen(15).sort((a,b)=>a.x-b.x) };
  }, []);

  const getPrediction = (x: number, cK: number) => {
      const dists = trainData.map(p => ({ y: p.y, d: Math.abs(p.x - x) }));
      dists.sort((a,b) => a.d - b.d);
      const nearest = dists.slice(0, cK);
      return nearest.reduce((sum, p) => sum + p.y, 0) / cK;
  };

  const getValMSE = (cK: number) => {
      let sum = 0;
      valData.forEach(p => {
         const pred = getPrediction(p.x, cK);
         sum += Math.pow(p.y - pred, 2);
      });
      return sum / valData.length;
  };

  const currentCost = getValMSE(k);

  const runHyperparamSearch = () => {
    setIsOptimizing(true);
    let currentK = 1;
    let history: number[] = [];
    if (optRef.current) clearInterval(optRef.current);
    
    // We simulate an optimization by scanning K from 1 to 20
    optRef.current = setInterval(() => {
       const cost = getValMSE(currentK);
       history = [...history, cost];
       if (history.length > 50) history.shift();
       
       setK(currentK);
       setLossHistory(history);
       
       if (currentK >= 15) {
          // Find best K
          let bestK = 1;
          let minErr = Infinity;
          for(let i=1; i<=15; i++){
             const c = getValMSE(i);
             if (c < minErr) { minErr = c; bestK = i; }
          }
          setK(bestK);
          setIsOptimizing(false);
          if (optRef.current) clearInterval(optRef.current);
       } else {
          currentK++;
       }
    }, 150);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  const pathData = useMemo(() => {
    const pts = [];
    for(let x=0; x<=100; x+=1) {
       pts.push(`${x},${getPrediction(x, k)}`);
    }
    return `M ${pts.join(' L ')}`;
  }, [k, trainData]);

  return (
    <div className="flex flex-col gap-12 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm tracking-widest uppercase text-white font-semibold mb-2">Frontière K-NN</h3>
             </div>
             
             <div className="relative w-full aspect-[4/3] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <svg viewBox="0 -10 100 120" preserveAspectRatio="none" className="w-full h-full">
                   <g className="stroke-white/5" strokeWidth="0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`h${i}`} x1="0" y1={i*10} x2="100" y2={i*10} />)}
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="100" />)}
                   </g>
                   
                   <path d={pathData} className="stroke-white fill-none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                   
                   {trainData.map((p, i) => (
                      <circle key={`t${i}`} cx={p.x} cy={p.y} r="1.5" className="fill-white opacity-80" />
                   ))}
                   {valData.map((p, i) => (
                      <circle key={`v${i}`} cx={p.x} cy={p.y} r="1.5" className="fill-white opacity-80" />
                   ))}
                </svg>
             </div>
             
             <p className="text-[10px] text-white/80 font-mono text-center mt-4">
                 <span className="text-white">Mauve: Train ({trainData.length})</span> | <span className="text-white">Rose: Val ({valData.length})</span>
             </p>
          </div>
        </div>

        <div className="flex-[0.8] flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Hyperparamètre <span className="font-mono text-white">K</span></h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] text-white/80 mb-2">
                  <span>Nombre de Voisins (K)</span>
                  <span className="font-mono text-white font-bold">{k}</span>
                </div>
                <input type="range" min="1" max="15" step="1" value={k} onChange={e => setK(parseInt(e.target.value))} className="w-full h-1.5 accent-white rounded-full bg-slate-800" />
              </div>
              
              <div className="text-[10px] text-white/80 font-mono leading-relaxed mt-2 bg-slate-900/50 p-2 rounded">
                 K=1 : Surapprentissage parfait du "Train".<br/>
                 K large : Sous-apprentissage (Moyenne globale).
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
               <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
                 Coût (MSE Validation)
               </h4>
               <div className="w-full h-16 bg-slate-900/50 rounded-lg p-2 flex items-end gap-1 relative overflow-hidden border border-slate-800">
                  {Array.from({length: 15}).map((_, i) => {
                     const c_k = i + 1;
                     const c_mse = getValMSE(c_k);
                     const h = Math.max(5, 100 - (c_mse - 50) * 1.5);
                     return (
                         <div key={c_k} className="flex-1 flex flex-col justify-end items-center group relative cursor-pointer" onClick={() => setK(c_k)}>
                            <div className="absolute opacity-0 group-hover:opacity-100 -top-6 text-[8px] bg-slate-800 text-white/80 px-1 rounded pointer-events-none z-10 transition-opacity whitespace-nowrap">
                              MSE: {c_mse.toFixed(0)}
                            </div>
                            <div className={`w-full max-w-[8px] rounded-t-sm transition-all duration-300 ${k === c_k ? 'bg-white/10' : 'bg-slate-700 group-hover:bg-slate-600'}`} style={{ height: `${h}%` }}></div>
                            <div className={`text-[8px] mt-1 ${k === c_k ? 'text-white font-bold' : 'text-slate-600'}`}>{c_k}</div>
                         </div>
                     );
                  })}
               </div>
               
               <OptimizationModule 
                 method={optMethod} 
                 onMethodChange={setOptMethod} 
                 isOptimizing={isOptimizing} 
                 onOptimize={runHyperparamSearch} 
                 lossHistory={[]} 
                 themeColor="purple"
                 availableMethods={['gd']}
               />
               <p className="text-[10px] text-white/80 text-center font-mono">Bouton pour scanner et trouver le K optimal (Min Validation Loss).</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-white/20 rounded-3xl p-6 text-[11px] text-purple-100/50 font-mono leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <strong className="text-white block mb-2 text-xs">Concepts Clés: K-NN</strong>
            <ul className="space-y-3">
              <li>
                <span className="text-white font-bold">Pas d'équation</span><br/>
                La prédiction se base uniquement sur le vote ou la moyenne des points les plus proches en utilisant une distance (Euclidienne).
              </li>
              <li>
                <span className="text-white font-bold">Biais vs Variance</span><br/>
                Un faible K mène à une grande variance (ligne chahutée). Un grand K apporte un grand biais (ligne plate). On cherche le sweet-spot.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeView() {
  const [threshold, setThreshold] = useState(50);
  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const points = useMemo(() => {
     let seed = 42;
     const rng = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
     const gen = (n: number, mean: number, cls: number) => Array.from({length:n}).map(() => ({
         x: mean + (rng() - 0.5) * 40,
         cls
     }));
     return [...gen(20, 35, 0), ...gen(20, 65, 1)].sort((a,b) => a.x - b.x);
  }, []);

  const getImpurity = (t: number) => {
     const left = points.filter(p => p.x <= t);
     const right = points.filter(p => p.x > t);
     
     const gini = (arr: typeof points) => {
        if(arr.length === 0) return 0;
        const p0 = arr.filter(p => p.cls === 0).length / arr.length;
        const p1 = arr.filter(p => p.cls === 1).length / arr.length;
        return 1 - p0*p0 - p1*p1;
     };
     
     const wL = left.length / points.length;
     const wR = right.length / points.length;
     
     return wL * gini(left) + wR * gini(right);
  };

  const currentCost = getImpurity(threshold);

  const runHyperparamSearch = () => {
    setIsOptimizing(true);
    let currentT = 0;
    let history: number[] = [];
    if (optRef.current) clearInterval(optRef.current);
    
    // We scan T from 0 to 100
    optRef.current = setInterval(() => {
       history = [...history, getImpurity(currentT)];
       if (history.length > 50) history.shift();
       
       setThreshold(currentT);
       setLossHistory(history);
       
       if (currentT >= 100) {
          let bestT = 0;
          let minErr = Infinity;
          for(let i=0; i<=100; i++){
             const c = getImpurity(i);
             if (c < minErr) { minErr = c; bestT = i; }
          }
          setThreshold(bestT);
          setIsOptimizing(false);
          if (optRef.current) clearInterval(optRef.current);
       } else {
          currentT+=2;
       }
    }, 40);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  return (
    <div className="flex flex-col gap-12 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm tracking-widest uppercase text-white font-semibold mb-2">Séparation 1D (Split)</h3>
             </div>
             
             <div className="relative w-full h-32 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center">
                <div className="absolute inset-0 flex">
                   <div className="h-full bg-white/10 transition-all duration-300" style={{ width: `${threshold}%` }}></div>
                   <div className="h-full bg-white/10 transition-all duration-300" style={{ width: `${100 - threshold}%` }}></div>
                </div>
                
                <div className="absolute top-0 bottom-0 w-1 bg-white z-10 transition-all duration-300 -ml-[2px]" style={{ left: `${threshold}%` }}></div>
                
                <div className="relative w-full h-full">
                  {points.map((p, i) => (
                    <div key={i} className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-slate-900 ${p.cls===0 ? 'bg-white/10' : 'bg-white/10'}`} style={{ left: `calc(${p.x}% - 6px)` }}></div>
                  ))}
                </div>
             </div>
             
             <p className="text-[10px] text-white/80 font-mono text-center mt-4">
                 Trouvez la ligne séparatrice qui divise le mieux les deux classes.
             </p>
          </div>
        </div>

        <div className="flex-[0.8] flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Seuil <span className="font-mono text-white">T</span></h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] text-white/80 mb-2">
                  <span>Position du Seuil (x = T)</span>
                  <span className="font-mono text-white font-bold">{threshold.toFixed(1)}</span>
                </div>
                <input type="range" min="0" max="100" step="1" value={threshold} onChange={e => setThreshold(parseFloat(e.target.value))} className="w-full h-1.5 accent-white rounded-full bg-slate-800" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
               <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
                 Coût (Impureté de Gini)
               </h4>
               <div className="flex items-center gap-4">
                 <div className="text-3xl font-mono font-bold text-white">{currentCost.toFixed(3)}</div>
                 <div className="text-[10px] text-white/80 leading-tight">G = 1 - Σ p(i)²<br/>Coût = Pondération G_gauche + G_droite</div>
               </div>
               
               <OptimizationModule 
                 method={optMethod} 
                 onMethodChange={setOptMethod} 
                 isOptimizing={isOptimizing} 
                 onOptimize={runHyperparamSearch} 
                 lossHistory={[]} 
                 themeColor="amber"
                 availableMethods={['gd']}
               />
               <p className="text-[10px] text-white/80 text-center font-mono">Bouton pour scanner et trouver le meilleur Split.</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-white/20 rounded-3xl p-6 text-[11px] text-amber-100/50 font-mono leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <strong className="text-white block mb-2 text-xs">Concepts Clés: Arbres de Décision</strong>
            <ul className="space-y-3">
              <li>
                <span className="text-white font-bold">Impureté Gini</span><br/>
                Mesure à quel point un groupe est mélangé. Un groupe homogène (100% même classe) a une impureté de 0.
              </li>
              <li>
                <span className="text-white font-bold">Recherche de Seuil (Split)</span><br/>
                L'algorithme teste chaque valeur de feature comme seuil de séparation et sélectionne celle qui minimise l'impureté moyenne pondérée des deux fils.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SVMView() {
  const [angle, setAngle] = useState(0.5); // rad
  const [b, setB] = useState(0); 
  const [wMag, setWMag] = useState(0.2); // margin = 1/wMag
  
  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const points = useMemo(() => {
     let seed = 7;
     const rng = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
     const gen = (n: number, cx: number, cy: number, cls: number) => Array.from({length:n}).map(() => ({
         x: cx + (rng() - 0.5) * 40,
         y: cy + (rng() - 0.5) * 40,
         cls
     }));
     return [...gen(15, 30, 70, -1), ...gen(15, 70, 30, 1)]; // Non perfectly separable maybe
  }, []);

  const getHingeLoss = (cAngle: number, cB: number, cW: number) => {
     const w1 = cW * Math.cos(cAngle);
     const w2 = cW * Math.sin(cAngle);
     
     let sum = 0;
     points.forEach(p => {
        // Map visual 0-100 to roughly -1 to 1 for math
        const nx = (p.x - 50)/50;
        const ny = (p.y - 50)/50;
        const val = p.cls * (w1 * nx + w2 * ny + cB);
        sum += Math.max(0, 1 - val);
     });
     
     const C = 1.0;
     return 0.5 * cW * cW + C * sum;
  };

  const currentCost = getHingeLoss(angle, b, wMag);

  const runHyperparamSearch = () => {
    setIsOptimizing(true);
    let cA = angle;
    let cB = b;
    let cW = wMag;
    let history = [...lossHistory, getHingeLoss(cA, cB, cW)];
    if (optRef.current) clearInterval(optRef.current);
    
    // Very naive gradient descent for SVM Primal formulation
    optRef.current = setInterval(() => {
       const e = 1e-4;
       const cost = getHingeLoss(cA, cB, cW);
       const gradA = (getHingeLoss(cA+e, cB, cW) - cost)/e;
       const gradB = (getHingeLoss(cA, cB+e, cW) - cost)/e;
       const gradW = (getHingeLoss(cA, cB, cW+e) - cost)/e;
       
       const lr = 0.05;
       cA -= gradA * lr;
       cB -= gradB * lr;
       cW -= gradW * lr;
       if (cW < 0.01) cW = 0.01;

       history = [...history, getHingeLoss(cA, cB, cW)];
       if (history.length > 50) history.shift();
       
       setAngle(cA); setB(cB); setWMag(cW);
       setLossHistory(history);
       
       if (Math.abs(gradA) < 0.01 && Math.abs(gradB) < 0.01 && Math.abs(gradW) < 0.01) {
          setIsOptimizing(false);
          if (optRef.current) clearInterval(optRef.current);
       }
    }, 40);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  const w1 = wMag * Math.cos(angle);
  const w2 = wMag * Math.sin(angle);
  
  // A point (nx, ny) lies on the line if w1*nx + w2*ny + b = 0
  // ny = (-w1*nx - b) / w2
  // ny is in -1..1, we map to SVG 0..100: SVG_y = 50 + ny*50 (wait, usually y goes down)
  // Let's use the transformation consistently
  const getLinePts = (offset: number) => {
     if (Math.abs(w2) < 0.001) return "";
     const pts = [];
     for(let x=0; x<=100; x+=10) {
        const nx = (x - 50)/50;
        const ny = (offset - w1*nx - b) / w2;
        const y = 50 + ny*50;
        pts.push(`${x},${y}`);
     }
     return `M ${pts.join(' L ')}`;
  };

  return (
    <div className="flex flex-col gap-12 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm tracking-widest uppercase text-white font-semibold mb-2">Séparateur à Vaste Marge (SVM)</h3>
             </div>
             
             <div className="relative w-full aspect-[4/3] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                   <g className="stroke-white/5" strokeWidth="0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`h${i}`} x1="0" y1={i*10} x2="100" y2={i*10} />)}
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="100" />)}
                   </g>

                   <path d={getLinePts(1)} className="stroke-white/50 fill-none" strokeWidth="0.5" strokeDasharray="2,2" />
                   <path d={getLinePts(-1)} className="stroke-white/50 fill-none" strokeWidth="0.5" strokeDasharray="2,2" />
                   <path d={getLinePts(0)} className="stroke-white fill-none" strokeWidth="1" />
                   
                   {points.map((p, i) => {
                      const nx = (p.x - 50)/50;
                      const ny = (p.y - 50)/50;
                      const val = p.cls * (w1 * nx + w2 * ny + b);
                      const isSupport = val <= 1;
                      return (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="2" className={p.cls==1 ? 'fill-white' : 'fill-slate-500'} />
                          {isSupport && <circle cx={p.x} cy={p.y} r="4" className="fill-none stroke-white/50" strokeWidth="0.5" />}
                        </g>
                      )
                   })}
                </svg>
             </div>
             
             <p className="text-[10px] text-white/80 font-mono text-center mt-4">
                 Faites coulisser l'angle et la magnitude pour voir les <span className="text-white">Vecteurs de Support</span> encerclés.
             </p>
          </div>
        </div>

        <div className="flex-[0.8] flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Hyperplan</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] text-white/80 mb-2">
                  <span>Angle (θ)</span><span className="font-mono text-white font-bold">{(angle*180/Math.PI).toFixed(0)}°</span>
                </div>
                <input type="range" min="-3.14" max="3.14" step="0.1" value={angle} onChange={e => setAngle(parseFloat(e.target.value))} className="w-full h-1.5 accent-white rounded-full bg-slate-800" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-white/80 mb-2">
                  <span>Magnitude ||w|| (Inverse de Marge)</span><span className="font-mono text-white font-bold">{wMag.toFixed(2)}</span>
                </div>
                <input type="range" min="0.1" max="5" step="0.1" value={wMag} onChange={e => setWMag(parseFloat(e.target.value))} className="w-full h-1.5 accent-white rounded-full bg-slate-800" />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-white/80 mb-2">
                  <span>Biais (b)</span><span className="font-mono text-white font-bold">{b.toFixed(2)}</span>
                </div>
                <input type="range" min="-2" max="2" step="0.1" value={b} onChange={e => setB(parseFloat(e.target.value))} className="w-full h-1.5 accent-white rounded-full bg-slate-800" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
               <h4 className="flex justify-between text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
                 <span>Coût SVM (Hinge + Reg)</span>
                 <span className="text-white font-mono text-base">{currentCost.toFixed(2)}</span>
               </h4>
               
               <OptimizationModule 
                 method={optMethod} 
                 onMethodChange={setOptMethod} 
                 isOptimizing={isOptimizing} 
                 onOptimize={runHyperparamSearch} 
                 lossHistory={lossHistory} 
                 themeColor="pink"
                 availableMethods={['gd']}
               />
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-white/20 rounded-3xl p-6 text-[11px] text-pink-100/50 font-mono leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <strong className="text-white block mb-2 text-xs">Concepts Clés: SVM</strong>
            <ul className="space-y-3">
              <li>
                <span className="text-white font-bold">Vecteurs de Support</span><br/>
                La frontière de décision est uniquement définie par les points situés à l'intérieur ou sur la limite de la marge de sécurité (cerclés en blanc).
              </li>
              <li>
                <span className="text-white font-bold">Hinge Loss</span><br/>
                On pénalise seulement les points qui violent la marge. Ceux du "bon côté" n'influencent plus le modèle (cout = 0).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION KERNEL TRICK */}
      <div className="mt-16 mb-8 flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-xl font-bold font-sans text-white mb-6 text-center">Le "Kernel Trick" (Cas Concret)</h3>
          <p className="text-sm font-light text-white/80 leading-relaxed mb-6 text-center max-w-lg">
            Comment faire quand les données sont impossibles à séparer avec une simple ligne droite en 1D ? On projette les points dans une dimension supérieure !
          </p>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 w-full flex flex-col items-center gap-8 relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="w-full flex justify-between px-4 sm:px-12 items-center">
              <div className="text-center">
                <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-bold mb-4 font-sans">1. Difficile en 1D</h4>
                <svg viewBox="0 0 100 20" className="w-32 md:w-48 overflow-visible">
                  <line x1="0" y1="10" x2="100" y2="10" stroke="#334155" strokeWidth="1" />
                  {/* Points rouges aux extrêmes, bleu au milieu */}
                  <circle cx="10" cy="10" r="3" className="fill-white" />
                  <circle cx="25" cy="10" r="3" className="fill-white" />
                  <circle cx="45" cy="10" r="3" className="fill-white" />
                  <circle cx="55" cy="10" r="3" className="fill-white" />
                  <circle cx="75" cy="10" r="3" className="fill-white" />
                  <circle cx="90" cy="10" r="3" className="fill-white" />
                  {/* Tentative de coupe (fail) */}
                  <line x1="35" y1="-2" x2="35" y2="22" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1" />
                  <line x1="65" y1="-2" x2="65" y2="22" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1" />
                </svg>
                <p className="text-[9px] text-white/80 mt-4 font-mono leading-tight">Aucune ligne unique<br/>ne peut isoler les bleus.</p>
              </div>

              <div className="text-white/50 hidden md:flex items-center justify-center -translate-y-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>

              <div className="text-center">
                <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-bold mb-4 font-sans">2. Facile en 2D avec f(x) = x²</h4>
                <svg viewBox="0 0 100 60" className="w-32 md:w-48 overflow-visible">
                  {/* Axes */}
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="60" stroke="#334155" strokeWidth="0.5" />
                  
                  {/* Parabola line just for viz */}
                  <path d="M 0 0 Q 50 100 100 0" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="1,2" />
                  
                  {/* x= -4, y=16 */}
                  <circle cx="10" cy="10" r="2.5" className="fill-white" />
                  {/* x= -2.5, y=6.25 */}
                  <circle cx="25" cy="30" r="2.5" className="fill-white" />
                  {/* x= -0.5, y=0.25 */}
                  <circle cx="45" cy="48" r="2.5" className="fill-white" />
                  {/* x= 0.5, y=0.25 */}
                  <circle cx="55" cy="48" r="2.5" className="fill-white" />
                  {/* x= 2.5, y=6.25 */}
                  <circle cx="75" cy="30" r="2.5" className="fill-white" />
                  {/* x= 4, y=16 */}
                  <circle cx="90" cy="10" r="2.5" className="fill-white" />
                  
                  {/* Ligne séparatrice en 2D */}
                  <line x1="-10" y1="38" x2="110" y2="38" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
                  <polygon points="5,38 10,34 10,42" fill="#22c55e"/>
                  <polygon points="95,38 90,34 90,42" fill="#22c55e"/>
                </svg>
                <p className="text-[9px] text-white/80 mt-4 font-mono leading-tight">Une ligne horizontale<br/>sépare tout !</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h4 className="text-sm tracking-widest uppercase font-sans font-bold text-white/80 mb-4 inline-flex items-center gap-2"><span className="text-white/50">✨</span> L'Astuce (Le "Trick")</h4>
          <div className="space-y-4 text-[13px] md:text-sm text-white/80 leading-relaxed font-sans">
            <p className="font-light">
              Ajouter des dimensions comme <span className="font-mono bg-slate-800 text-white/80 px-1 py-0.5 rounded text-xs">x²</span> ou <span className="font-mono bg-slate-800 text-white/80 px-1 py-0.5 rounded text-xs">x*y</span> permet au SVM de "<span className="text-white italic">plier l'espace</span>" pour isoler n'importe quelles données. 
            </p>
            <p className="font-light">
              Mais en réalité, calculer des centaines de nouvelles dimensions mathématiques pour des millions de points demanderait une puissance de calcul colossale.
            </p>
            <div className="p-5 bg-white/10 border border-white/20 rounded-2xl md:mt-2 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-white/10 rounded-l-2xl"></div>
              <strong className="text-white block mb-2 font-sans text-sm tracking-tight">Le Secret Mathématique :</strong>
              <p className="text-xs md:text-[13px] leading-relaxed text-pink-100/80">
                Le SVM n'a <b className="text-white">jamais besoin de calculer les coordonnées</b> réelles dans la dimension supérieure. 
                Il a juste besoin de connaitre la <em>distance</em> (le produit scalaire) entre les points une fois projetés.
              </p>
              <p className="text-xs md:text-[13px] leading-relaxed mt-3 text-pink-100/80">
                L'Astuce, c'est d'utiliser une formule magique (un <b className="text-white">Noyau / Kernel</b> fonction) 
                qui calcule cette distance complexe en utilisant <strong>seulement</strong> les petites données 1D du départ ! 
                C'est un raccourci mathématique inouï appelé le <strong className="text-white underline decoration-pink-300/30 underline-offset-2">Kernel Trick</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
