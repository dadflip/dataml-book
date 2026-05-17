import React, { useState, useMemo, ReactNode, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { OptimizationModule, type OptMethod } from './LinearModelsDetail';

function ARModelView() {
  const [p, setP] = useState(1); // AR parameter count
  const [phi1, setPhi1] = useState(0.0);
  const [phi2, setPhi2] = useState(0.0);

  // The true hidden parameters used to generate our learning data
  const truePhi1 = 0.8;
  const truePhi2 = -0.3;

  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const timeSeries = useMemo(() => {
    // Generate an AR(p) process with TRUE parameters
    const series = [];
    const n = 100;
    
    // Seeded random for stable noise
    let s = 999;
    const randomNorm = () => {
      s = (s * 9301 + 49297) % 233280;
      const u = s / 233280;
      s = (s * 9301 + 49297) % 233280;
      const v = s / 233280;
      return Math.sqrt(-2.0 * Math.log(u || 1e-10)) * Math.cos(2.0 * Math.PI * v) * 0.5;
    };

    // Initialize with 0s
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        series.push(randomNorm());
      } else if (i === 1) {
        let val = p >= 1 ? truePhi1 * series[i-1] : 0;
        val += randomNorm();
        series.push(val);
      } else {
        let val = 0;
        if (p >= 1) val += truePhi1 * series[i-1];
        if (p === 2) val += truePhi2 * series[i-2];
        val += randomNorm();
        if (val > 10) val = 10;
        if (val < -10) val = -10;
        series.push(val);
      }
    }
    return series;
  }, [p]);

  const predictions = useMemo(() => {
    const preds = [];
    for (let i = 0; i < timeSeries.length; i++) {
        let pred = 0;
        if (p >= 1 && i >= 1) pred += phi1 * timeSeries[i-1];
        if (p >= 2 && i >= 2) pred += phi2 * timeSeries[i-2];
        preds.push(pred);
    }
    return preds;
  }, [timeSeries, phi1, phi2, p]);

  const getMSE = (cPhi1: number, cPhi2: number) => {
      let mse = 0;
      for (let i = p; i < timeSeries.length; i++) {
          let pred = 0;
          if (p >= 1) pred += cPhi1 * timeSeries[i-1];
          if (p >= 2) pred += cPhi2 * timeSeries[i-2];
          const err = timeSeries[i] - pred;
          mse += err * err;
      }
      return mse / (timeSeries.length - p);
  };

  const currentCost = getMSE(phi1, phi2);

  const runOptimization = () => {
    setIsOptimizing(true);
    let currentPhi1 = phi1;
    let currentPhi2 = phi2;
    let history = [...lossHistory, getMSE(currentPhi1, currentPhi2)];
    setLossHistory(history);
    if (optRef.current) clearInterval(optRef.current);

    let exactPhi1 = 0, exactPhi2 = 0;
    if (p === 1) {
       let sumY1Y1 = 0, sumY1Y = 0;
       for(let i=1; i<timeSeries.length; i++) {
          sumY1Y1 += timeSeries[i-1]*timeSeries[i-1];
          sumY1Y += timeSeries[i-1]*timeSeries[i];
       }
       exactPhi1 = sumY1Y / sumY1Y1;
    } else if (p === 2) {
       let S11 = 0, S22 = 0, S12 = 0, S1Y = 0, S2Y = 0;
       for (let i=2; i<timeSeries.length; i++) {
          const y1 = timeSeries[i-1], y2 = timeSeries[i-2], y = timeSeries[i];
          S11 += y1*y1; S22 += y2*y2; S12 += y1*y2; S1Y += y1*y; S2Y += y2*y;
       }
       const det = S11*S22 - S12*S12;
       exactPhi1 = (S22*S1Y - S12*S2Y)/det;
       exactPhi2 = (S11*S2Y - S12*S1Y)/det;
    }

    optRef.current = setInterval(() => {
       if (optMethod === 'gd') {
           let grad1 = 0, grad2 = 0;
           for(let i=p; i<timeSeries.length; i++) {
              let pred = 0;
              if (p >= 1) pred += currentPhi1 * timeSeries[i-1];
              if (p >= 2) pred += currentPhi2 * timeSeries[i-2];
              const err = timeSeries[i] - pred;
              if (p >= 1) grad1 += -2 * err * timeSeries[i-1];
              if (p >= 2) grad2 += -2 * err * timeSeries[i-2];
           }
           grad1 /= (timeSeries.length - p);
           grad2 /= (timeSeries.length - p);

           const lr = 0.05;
           currentPhi1 -= grad1 * lr;
           currentPhi2 -= grad2 * lr;
       } else {
           currentPhi1 += (exactPhi1 - currentPhi1) * 0.15;
           currentPhi2 += (exactPhi2 - currentPhi2) * 0.15;
       }

       history = [...history, getMSE(currentPhi1, currentPhi2)];
       if (history.length > 50) history.shift();
       
       setPhi1(currentPhi1);
       setPhi2(currentPhi2);
       setLossHistory(history);

       const dist = Math.abs(currentPhi1 - exactPhi1) + Math.abs(currentPhi2 - exactPhi2);
       if ((optMethod === 'gd' && history[history.length-2] - history[history.length-1] < 1e-4) || 
           (optMethod !== 'gd' && dist < 0.005)) {
          setPhi1(exactPhi1);
          setPhi2(exactPhi2);
          setIsOptimizing(false);
          if (optRef.current) clearInterval(optRef.current);
       }
    }, 40);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  // Points for SVG path
  const pathData = useMemo(() => {
    const pts = timeSeries.map((val, i) => `${(i / (timeSeries.length - 1)) * 100},${50 - val * 10}`);
    return `M ${pts.join(' L ')}`;
  }, [timeSeries]);
  
  const pathPred = useMemo(() => {
    const pts = predictions.map((val, i) => `${(i / (timeSeries.length - 1)) * 100},${50 - val * 10}`);
    return `M ${pts.slice(p).join(' L ')}`;
  }, [predictions, p, timeSeries.length]);

  return (
    <div className="flex flex-col gap-12 mt-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 h-full flex flex-col justify-center">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm tracking-widest uppercase text-emerald-500 font-semibold mb-2">Original vs Prediction</h3>
             </div>
             
             <div className="relative w-full aspect-[4/3] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                   <g className="stroke-white/5" strokeWidth="0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`h${i}`} x1="0" y1={i*10} x2="100" y2={i*10} />)}
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="100" />)}
                   </g>
                   <line x1="0" y1="50" x2="100" y2="50" className="stroke-white/20" strokeWidth="1" strokeDasharray="2,2" />
                   
                   <path d={pathData} className="stroke-white/20 fill-none" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                   <path d={pathPred} className="stroke-emerald-400 fill-none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeDasharray="2,1" />
                </svg>
             </div>
             
             <p className="text-[10px] text-slate-500 font-mono text-center mt-4">
                 <span className="text-white/40">Gris: Data (y_t)</span> | <span className="text-emerald-400">Vert: Prediction (ŷ_t)</span>
             </p>
          </div>
        </div>

        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-emerald-500 mb-6 w-full text-center">Erreur Résiduelle (Cost)</h3>
          
          <div className="flex-1 w-full flex flex-col items-center justify-center space-y-6">
              <div className="w-48 h-48 rounded-full border-4 border-slate-800 flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                 <motion.div 
                    animate={{ scale: Math.min(1.5, Math.max(0.2, currentCost / 5)) }} 
                    className="absolute bg-emerald-500/20 rounded-full" 
                    style={{ width: '100%', height: '100%' }}
                    transition={{ type: 'spring', bounce: 0 }}
                 />
                 <div className="text-center z-10">
                     <div className="text-3xl font-bold font-mono text-emerald-400">{currentCost.toFixed(2)}</div>
                     <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">MSE</div>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center max-w-[200px]">Somme des carrés des écarts entre prédiction et réalité.</p>
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
               <p>Série Temporelle (100 pas)</p>
               <div className="text-slate-300">Générée par un processus AR caché.</div>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">2</span>
               Model (AR)
             </h4>
             <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] text-emerald-400 mb-1">
                     <span>Ordre (p)</span>
                     <div className="flex gap-1">
                       <button onClick={() => setP(1)} className={`px-2 py-[2px] rounded ${p===1 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>AR(1)</button>
                       <button onClick={() => setP(2)} className={`px-2 py-[2px] rounded ${p===2 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>AR(2)</button>
                     </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                     <span>φ₁</span>
                     <span className="font-mono text-emerald-300">{phi1.toFixed(2)}</span>
                   </div>
                   <input type="range" min="-1" max="1" step="0.05" value={phi1} onChange={e => setPhi1(parseFloat(e.target.value))} className="w-full h-1 accent-emerald-500" />
                 </div>

                 {p === 2 && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                     <div className="flex justify-between text-[10px] text-slate-400 mb-1 mt-2">
                       <span>φ₂</span>
                       <span className="font-mono text-emerald-300">{phi2.toFixed(2)}</span>
                     </div>
                     <input type="range" min="-1" max="1" step="0.05" value={phi2} onChange={e => setPhi2(parseFloat(e.target.value))} className="w-full h-1 accent-emerald-500" />
                   </motion.div>
                 )}
                 {(Math.abs(phi1) >= 1 || (p === 2 && Math.abs(phi2) >= 1) || (p === 2 && phi1 + phi2 >= 1)) && (
                    <div className="text-[9px] text-red-400 pt-1">Instable (Non-stationnaire)</div>
                 )}
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">3</span>
               Cost (MSE)
             </h4>
             <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed flex flex-col h-full">
               <div className="text-emerald-300/80 bg-slate-900/50 p-2 rounded leading-tight break-all text-[9px]">
                 J(φ) = 1/N Σ (y_t - ŷ_t)²
               </div>
               <p className="text-[9px] text-slate-500 mt-2">Mesure l'écart entre la vraie série et la prédiction du modèle AR.</p>
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
               themeColor="emerald"
               availableMethods={['svd', 'gd']}
             />
         </div>
      </div>
    </div>
  );
}

function MAVIEW() {
  const [q, setQ] = useState(1);
  const [theta1, setTheta1] = useState(0.0);
  const [theta2, setTheta2] = useState(0.0);

  const trueTheta1 = 0.8;
  const trueTheta2 = 0.4;

  const [optMethod, setOptMethod] = useState<OptMethod>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const timeSeries = useMemo(() => {
    // Generate an MA(q) process
    const series = [];
    const n = 100;
    
    // Seeded random for stable noise
    let s = 555;
    const randomNorm = () => {
      s = (s * 9301 + 49297) % 233280;
      const u = s / 233280;
      s = (s * 9301 + 49297) % 233280;
      const v = s / 233280;
      return Math.sqrt(-2.0 * Math.log(u || 1e-10)) * Math.cos(2.0 * Math.PI * v) * 0.5;
    };

    const errors = Array.from({length: n}, () => randomNorm());

    for (let i = 0; i < n; i++) {
        let val = errors[i];
        if (q >= 1 && i >= 1) val += trueTheta1 * errors[i-1];
        if (q === 2 && i >= 2) val += trueTheta2 * errors[i-2];
        series.push(val);
    }
    return series;
  }, [q]);

  const predictions = useMemo(() => {
    const preds = [];
    const errs = new Array(timeSeries.length).fill(0);
    for(let i=0; i<timeSeries.length; i++) {
        let pred = 0;
        if (q >= 1 && i >= 1) pred += theta1 * errs[i-1];
        if (q >= 2 && i >= 2) pred += theta2 * errs[i-2];
        preds.push(pred);
        errs[i] = timeSeries[i] - pred;
    }
    return preds;
  }, [timeSeries, theta1, theta2, q]);

  const getMSE = (cTheta1: number, cTheta2: number) => {
    let mse = 0;
    const errs = new Array(timeSeries.length).fill(0);
    for(let i=0; i<timeSeries.length; i++) {
        let pred = 0;
        if (q >= 1 && i >= 1) pred += cTheta1 * errs[i-1];
        if (q >= 2 && i >= 2) pred += cTheta2 * errs[i-2];
        const e = timeSeries[i] - pred;
        errs[i] = e;
        mse += e*e;
    }
    return mse / timeSeries.length;
  };

  const currentCost = getMSE(theta1, theta2);

  const runOptimization = () => {
     setIsOptimizing(true);
     let currentTheta1 = theta1;
     let currentTheta2 = theta2;
     let history = [...lossHistory, getMSE(currentTheta1, currentTheta2)];
     setLossHistory(history);
     if (optRef.current) clearInterval(optRef.current);
     
     optRef.current = setInterval(() => {
        const e = 1e-4;
        const loss = getMSE(currentTheta1, currentTheta2);
        const lossT1 = getMSE(currentTheta1 + e, currentTheta2);
        const lossT2 = getMSE(currentTheta1, currentTheta2 + e);
        const grad1 = (lossT1 - loss) / e;
        const grad2 = (lossT2 - loss) / e;

        const lr = 0.2; 
        currentTheta1 -= grad1 * lr;
        currentTheta2 -= grad2 * lr;
        
        history = [...history, getMSE(currentTheta1, currentTheta2)];
        if (history.length > 50) history.shift();
        
        setTheta1(currentTheta1);
        setTheta2(currentTheta2);
        setLossHistory(history);
        
        if (Math.abs(grad1) < 0.001 && (q === 1 || Math.abs(grad2) < 0.001)) {
           setIsOptimizing(false);
           if (optRef.current) clearInterval(optRef.current);
        }
     }, 40);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  const pathData = useMemo(() => {
    const pts = timeSeries.map((val, i) => `${(i / (timeSeries.length - 1)) * 100},${50 - val * 10}`);
    return `M ${pts.join(' L ')}`;
  }, [timeSeries]);

  const pathPred = useMemo(() => {
    const pts = predictions.map((val, i) => `${(i / (timeSeries.length - 1)) * 100},${50 - val * 10}`);
    return `M ${pts.join(' L ')}`;
  }, [predictions, timeSeries.length]);

  return (
    <div className="flex flex-col gap-12 mt-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 h-full flex flex-col justify-center">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm tracking-widest uppercase text-sky-500 font-semibold mb-2">Original vs Prediction</h3>
             </div>
             
             <div className="relative w-full aspect-[4/3] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                   <g className="stroke-white/5" strokeWidth="0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`h${i}`} x1="0" y1={i*10} x2="100" y2={i*10} />)}
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="100" />)}
                   </g>
                   <line x1="0" y1="50" x2="100" y2="50" className="stroke-white/20" strokeWidth="1" strokeDasharray="2,2" />
                   
                   <path d={pathData} className="stroke-white/20 fill-none" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                   <path d={pathPred} className="stroke-sky-400 fill-none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeDasharray="2,1" />
                </svg>
             </div>
             
             <p className="text-[10px] text-slate-500 font-mono text-center mt-4">
                 <span className="text-white/40">Gris: Data</span> | <span className="text-sky-400">Bleu: Prediction (MA)</span>
             </p>
          </div>
        </div>

        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-sky-500 mb-6 w-full text-center">Erreur Résiduelle (Cost)</h3>
          
          <div className="flex-1 w-full flex flex-col items-center justify-center space-y-6">
              <div className="w-48 h-48 rounded-full border-4 border-slate-800 flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                 <motion.div 
                    animate={{ scale: Math.min(1.5, Math.max(0.2, currentCost / 5)) }} 
                    className="absolute bg-sky-500/20 rounded-full" 
                    style={{ width: '100%', height: '100%' }}
                    transition={{ type: 'spring', bounce: 0 }}
                 />
                 <div className="text-center z-10">
                     <div className="text-3xl font-bold font-mono text-sky-400">{currentCost.toFixed(2)}</div>
                     <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">MSE</div>
                 </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center max-w-[200px]">Carré de l'écart moyen entre modèle et vraie série.</p>
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
               <p>Série Temporelle</p>
               <div className="text-slate-300">Générée par un modèle MA(q) caché.</div>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">2</span>
               Model (MA)
             </h4>
             <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] text-sky-400 mb-1">
                     <span>Ordre (q)</span>
                     <div className="flex gap-1">
                       <button onClick={() => setQ(1)} className={`px-2 py-[2px] rounded ${q===1 ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-500'}`}>MA(1)</button>
                       <button onClick={() => setQ(2)} className={`px-2 py-[2px] rounded ${q===2 ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-500'}`}>MA(2)</button>
                     </div>
                 </div>
                 
                 <div>
                   <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                     <span>θ₁</span>
                     <span className="font-mono text-sky-300">{theta1.toFixed(2)}</span>
                   </div>
                   <input type="range" min="-2" max="2" step="0.1" value={theta1} onChange={e => setTheta1(parseFloat(e.target.value))} className="w-full h-1 accent-sky-500" />
                 </div>

                 {q === 2 && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                     <div className="flex justify-between text-[10px] text-slate-400 mb-1 mt-2">
                       <span>θ₂</span>
                       <span className="font-mono text-sky-300">{theta2.toFixed(2)}</span>
                     </div>
                     <input type="range" min="-2" max="2" step="0.1" value={theta2} onChange={e => setTheta2(parseFloat(e.target.value))} className="w-full h-1 accent-sky-500" />
                   </motion.div>
                 )}
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">3</span>
               Cost (MSE)
             </h4>
             <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed flex flex-col h-full">
               <div className="text-sky-300/80 bg-slate-900/50 p-2 rounded leading-tight break-all text-[9px]">
                 J(θ) = 1/N Σ ε_t²
               </div>
               <p className="text-[9px] text-slate-500 mt-2">Mesure l'écart de l'erreur d'innovation.</p>
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
               themeColor="sky"
               availableMethods={['gd']}
             />
         </div>
      </div>
    </div>
  );
}

type TabId = 'ar' | 'ma';

interface Tab {
  id: TabId;
  label: string;
  component: ReactNode;
  icon?: string;
}

export default function AutoregressionDetail() {
  const [activeTab, setActiveTab] = useState<TabId>('ar');

  const tabs: Tab[] = [
    { id: 'ar', label: "Auto-Régressif (AR)", component: <ARModelView /> },
    { id: 'ma', label: "Moyenne Mobile (MA)", component: <MAVIEW /> },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">Séries Temporelles (AR MA)</h2>
        <p className="text-slate-400 leading-relaxed max-w-3xl">
          L'analyse des séries temporelles classique (Box-Jenkins) s'appuie sur la modélisation de la dynamique 
          d'une variable en fonction de son passé (AR) ou des chocs subis (MA). Combinés, ils forment les modèles 
          ARIMA(p,d,q).
        </p>
      </header>

      <div className="flex gap-2 p-1 bg-white/[0.02] border border-white/[0.05] rounded-xl flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]' 
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
