import React, { useState, useMemo, ReactNode, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const LIN_POINTS = [
  {x: 1, y: 2.1}, {x: 2, y: 3.5}, {x: 3, y: 3.2}, {x: 4, y: 4.8},
  {x: 5, y: 4.5}, {x: 6, y: 6.5}, {x: 7, y: 6.1}, {x: 8, y: 7.8}, {x: 9, y: 7.1}
];

const POLY_POINTS = [
  {x: 1, y: 2.5}, {x: 2, y: 1.8}, {x: 3, y: 1.5}, {x: 4, y: 2.2},
  {x: 5, y: 4.0}, {x: 6, y: 6.5}, {x: 7, y: 7.2}, {x: 8, y: 6.5}, {x: 9, y: 4.0}
];

export default function LinearModelsDetail() {
  const [activeTab, setActiveTab] = useState<'linreg' | 'logreg' | 'polyreg' | 'reg' | 'arima'>('linreg');

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 max-w-2xl">
         <h2 className="text-3xl font-bold tracking-tight text-white font-sans">Modèles Linéaires</h2>
         <p className="text-white/80 text-lg font-light leading-relaxed">
           La fondation du Machine Learning : explorez la mécanique de l'ajustement aux données, de la droite la plus simple aux courbes complexes sous contraintes, et même aux séries temporelles (ARIMA).
         </p>
      </div>

      <div className="flex flex-wrap gap-2 pb-4">
        <TabButton active={activeTab === 'linreg'} onClick={() => setActiveTab('linreg')} color="amber">Régression Linéaire</TabButton>
        <TabButton active={activeTab === 'logreg'} onClick={() => setActiveTab('logreg')} color="blue">Régression Logistique</TabButton>
        <TabButton active={activeTab === 'polyreg'} onClick={() => setActiveTab('polyreg')} color="purple">Régression Polynomiale</TabButton>
        <TabButton active={activeTab === 'reg'} onClick={() => setActiveTab('reg')} color="pink">Régularisation</TabButton>
        <TabButton active={activeTab === 'arima'} onClick={() => setActiveTab('arima')} color="emerald">ARIMA (Séries Temp.)</TabButton>
      </div>

      <div className="min-h-[500px]">
         {activeTab === 'linreg' && <LinRegView />}
         {activeTab === 'logreg' && <LogRegView />}
         {activeTab === 'polyreg' && <PolyRegView />}
         {activeTab === 'reg' && <RegView />}
         {activeTab === 'arima' && <ARIMAView />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, color, children }: { active: boolean, onClick: () => void, color: 'amber'|'blue'|'pink'|'purple'|'emerald', children: ReactNode }) {
  const colors = {
    amber: 'text-white bg-white/20',
    blue: 'text-white bg-white/20',
    pink: 'text-white bg-white/20',
    purple: 'text-white bg-white/20',
    emerald: 'text-white bg-white/20'
  };
  
  return (
    <button 
      onClick={onClick}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 
        ${active ? colors[color] : 'text-white/80 hover:text-slate-200 hover:bg-white/5'}`}
    >
      {children}
    </button>
  );
}

function LinRegView() {
  const [w, setW] = useState(0.8);
  const [b, setB] = useState(1);
  const [tx, setTx] = useState(5.5);

  const [optMethod, setOptMethod] = useState<'gd'|'normal'|'svd'>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const mse = LIN_POINTS.reduce((acc, p) => acc + Math.pow(p.y - (w * p.x + b), 2), 0) / LIN_POINTS.length;

  const runOptimization = () => {
    // True optimal for LIN_POINTS is roughly w=0.6, b=1.4 ... let's compute analytically for Normal Equation
    const sx = LIN_POINTS.reduce((acc, p) => acc + p.x, 0);
    const sy = LIN_POINTS.reduce((acc, p) => acc + p.y, 0);
    const sxx = LIN_POINTS.reduce((acc, p) => acc + p.x*p.x, 0);
    const sxy = LIN_POINTS.reduce((acc, p) => acc + p.x*p.y, 0);
    const n = LIN_POINTS.length;
    
    const targetW = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    const targetB = (sy - targetW * sx) / n;
    
    if (optMethod !== 'gd') {
       setW(targetW);
       setB(targetB);
       setLossHistory([mse, 0.15]); // rough final MSE
       return;
    }

    setIsOptimizing(true);
    let cw = w;
    let cb = b;
    let history = [mse];
    setLossHistory(history);

    if (optRef.current) clearInterval(optRef.current);
    
    optRef.current = setInterval(() => {
      let isDone = true;
      const dw = targetW - cw;
      const db = targetB - cb;
      
      if (Math.abs(dw) > 0.001 || Math.abs(db) > 0.001) isDone = false;
      
      cw += dw * 0.1;
      cb += db * 0.1;
      setW(cw);
      setB(cb);
      
      const _mse = LIN_POINTS.reduce((acc, p) => acc + Math.pow(p.y - (cw * p.x + cb), 2), 0) / n;
      history = [...history, _mse];
      if (history.length > 50) history.shift();
      setLossHistory(history);
      
      if (isDone) {
        setW(targetW);
        setB(targetB);
        setIsOptimizing(false);
        if (optRef.current) clearInterval(optRef.current);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (optRef.current) clearInterval(optRef.current);
    };
  }, []);

  const mapX = (x: number) => x * 30; // 0 to 10
  const mapY = (y: number) => 300 - y * 30; // 0 to 10

  const msePoints = [];
  let minMse = Infinity;
  let minW = 0;
  for(let _w = -0.2; _w <= 2.2; _w += 0.05) {
    const _err = LIN_POINTS.reduce((acc, p) => acc + Math.pow(p.y - (_w * p.x + b), 2), 0) / LIN_POINTS.length;
    if (_err < minMse) { minMse = _err; minW = _w; }
    msePoints.push({ w: _w, ms: _err });
  }

  const maxMse = Math.max(...msePoints.map(p => p.ms));
  const mapW = (wVal: number) => ((wVal + 0.2) / 2.4) * 300; 
  const mapMse = (m: number) => 200 - (m / maxMse) * 160;

  const costD = `M ${msePoints.map(p => `${mapW(p.w)},${mapMse(p.ms)}`).join(' L ')}`;

  const tyHat = w * tx + b;

  return (
    <div className="flex flex-col gap-12 mt-6">
      <TheoryAppBlock 
        containerClass="bg-white/10 border-white/20"
        titleClass="text-white"
        illustration={
          <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="90" x2="90" y2="10" />
            <circle cx="20" cy="70" r="3" className="fill-white" />
            <circle cx="40" cy="65" r="3" className="fill-white" />
            <circle cx="50" cy="40" r="3" className="fill-white" />
            <circle cx="70" cy="45" r="3" className="fill-white" />
            <circle cx="85" cy="25" r="3" className="fill-white" />
            <path d="M40 50 L40 65" strokeDasharray="2,2" strokeWidth="1" className="stroke-slate-400" />
            <path d="M70 30 L70 45" strokeDasharray="2,2" strokeWidth="1" className="stroke-slate-400" />
          </svg>
        }
        theory={
          <>
            La <strong>Régression Linéaire</strong> cherche à établir une relation linéaire entre une variable à prédire (y) et une ou plusieurs variables explicatives (x). 
            Mathématiquement, le modèle trace la droite ou l'hyperplan optimal qui minimise la somme des carrés des erreurs (MSE) entre ses prédictions et les vraies données. C'est l'essence même de l'ajustement aux données.
          </>
        }
        app={
          <>
            Parfaite pour modéliser des données continues. Par exemple : <strong>Estimer le prix d'un bien immobilier</strong> en croisant sa surface et son emplacement, ou <strong>prédire le volume des ventes</strong> futures en fonction des dépenses publicitaires.
          </>
        }
      />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Data Space */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center">
           <h3 className="text-sm font-semibold text-white mb-6 w-full text-center">Espace de Données (x, y)</h3>
           <svg viewBox="-10 -10 320 320" className="w-[300px] h-[300px] bg-slate-900 rounded-xl overflow-visible border border-slate-700">
             <g className="stroke-slate-700/50 stroke-[0.5]">
               {[...Array(11)].map((_, i) => <line key={`gx-${i}`} x1={mapX(i)} y1="0" x2={mapX(i)} y2="300" />)}
               {[...Array(11)].map((_, i) => <line key={`gy-${i}`} x1="0" y1={mapY(i)} x2="300" y2={mapY(i)} />)}
             </g>

             {LIN_POINTS.map((p, i) => {
               const yHat = w * p.x + b;
               return (
                 <line key={`e-${i}`} x1={mapX(p.x)} y1={mapY(p.y)} x2={mapX(p.x)} y2={mapY(yHat)} className="stroke-white/50 stroke-[2] stroke-dasharray-[4,4]" />
               );
             })}
             
             <line x1={mapX(0)} y1={mapY(b)} x2={mapX(10)} y2={mapY(w * 10 + b)} className="stroke-white stroke-[3]" />
             
             {LIN_POINTS.map((p, i) => (
               <circle key={`p-${i}`} cx={mapX(p.x)} cy={mapY(p.y)} r="4" className="fill-white stroke-slate-900 stroke-[1.5]" />
             ))}

             <circle cx={mapX(tx)} cy={mapY(tyHat)} r="6" className="fill-white stroke-white stroke-[3]" />
             <circle cx={mapX(tx)} cy={mapY(tyHat)} r="12" className="fill-white/20 animate-pulse" />
             <line x1={mapX(tx)} y1={300} x2={mapX(tx)} y2={mapY(tyHat)} className="stroke-white/50 stroke-[1.5] stroke-dasharray-[2,2]" />
             <line x1={0} y1={mapY(tyHat)} x2={mapX(tx)} y2={mapY(tyHat)} className="stroke-white/50 stroke-[1.5] stroke-dasharray-[2,2]" />
             
             <text x={mapX(tx) + 10} y={mapY(tyHat) - 10} className="fill-white text-[10px] font-mono">Test pt</text>
           </svg>
        </div>

        {/* Cost Space */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center">
           <h3 className="text-sm font-semibold text-white mb-6 w-full text-center">Surface de Coût : MSE(w)</h3>
           <svg viewBox="-10 -10 320 220" className="w-[300px] h-[200px] bg-slate-900 rounded-xl overflow-visible border border-slate-700">
             <g className="stroke-slate-700/50 stroke-[0.5]">
               {[...Array(9)].map((_, i) => {
                 const wv = -0.2 + i * 0.3;
                 return <line key={`cw-${i}`} x1={mapW(wv)} y1="0" x2={mapW(wv)} y2="200" />;
               })}
             </g>
             
             <path d={costD} className="stroke-white stroke-[3] fill-none" />
             
             <circle cx={mapW(minW)} cy={mapMse(minMse)} r="3" className="fill-slate-500" />
             
             <line x1={mapW(w)} y1="200" x2={mapW(w)} y2={mapMse(mse)} className="stroke-slate-400/50 stroke-[1.5] stroke-dasharray-[3,3]" />
             <line x1={0} y1={mapMse(mse)} x2={mapW(w)} y2={mapMse(mse)} className="stroke-slate-400/50 stroke-[1.5] stroke-dasharray-[3,3]" />
             <circle cx={mapW(w)} cy={mapMse(mse)} r="5" className="fill-white stroke-white stroke-[2]" />
             
             <rect x={mapW(w)+8} y={mapMse(mse)-15} width="65" height="20" rx="4" fill="rgba(245, 158, 11, 0.2)" />
             <text x={mapW(w)+12} y={mapMse(mse)-2} className="fill-white text-[10px] font-mono font-bold">
               MSE={mse.toFixed(2)}
             </text>
             
             <text x="150" y="215" textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">Poids w</text>
           </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 bg-white/[0.015] border border-white/[0.04] p-6 rounded-3xl">
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">1</span>
               Data
             </h4>
             <div className="space-y-4 pt-1">
               <div>
                 <div className="flex justify-between text-xs mb-2">
                   <span className="text-white/80">Test x</span>
                   <span className="font-mono text-white">{tx.toFixed(2)}</span>
                 </div>
                 <input type="range" min="0" max="10" step="0.1" value={tx} onChange={e => setTx(parseFloat(e.target.value))} className="w-full accent-slate-400" />
               </div>
             </div>
         </div>

         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">2</span>
               Model
             </h4>
             <div className="space-y-3">
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-white/80">Pente w</span>
                   <span className="font-mono text-white">{w.toFixed(2)}</span>
                 </div>
                 <input type="range" min="0" max="2" step="0.05" value={w} onChange={e => setW(parseFloat(e.target.value))} className="w-full h-1 accent-white" />
               </div>
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-white/80">Biais b</span>
                   <span className="font-mono text-white">{b.toFixed(2)}</span>
                 </div>
                 <input type="range" min="-2" max="5" step="0.1" value={b} onChange={e => setB(parseFloat(e.target.value))} className="w-full h-1 accent-white" />
               </div>
               <div className="font-mono text-xs text-white/80 bg-white/10 border border-white/20 p-2 rounded mt-2">
                 ŷ = w·x + b<br/>
                 <span className="text-white font-bold">ŷ = {tyHat.toFixed(2)}</span>
               </div>
             </div>
         </div>

         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">3</span>
               Cost
             </h4>
             <div className="font-mono text-[11px] text-white/80 space-y-2 leading-relaxed">
               <p>Erreur Quadratique (MSE)</p>
               <div className="text-white/80 bg-slate-900/50 p-2 rounded">MSE = 1/n Σ(y - ŷ)²</div>
               <p className="text-white/80">Distance au carré entre points et prédictions.</p>
             </div>
         </div>

         <div className="space-y-4 border-t border-white/5 md:border-t-0 md:pl-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">4</span>
               Minimize Cost
             </h4>
             <OptimizationModule 
               method={optMethod} 
               onMethodChange={setOptMethod} 
               isOptimizing={isOptimizing} 
               onOptimize={runOptimization} 
               lossHistory={lossHistory} 
               themeColor="amber"
               availableMethods={['gd', 'normal', 'svd']}
             />
         </div>
      </div>
    </div>
  );
}

const LOGREG_2D_POINTS = [
  {x1: -1.5, x2: -0.5, c: 0}, {x1: -2.0, x2: -1.2, c: 0}, {x1: -0.8, x2: -2.5, c: 0}, {x1: -2.5, x2: 0.5, c: 0},
  {x1: -1.1, x2: 1.0, c: 0}, {x1: -3.0, x2: -1.0, c: 0}, {x1: -0.5, x2: -1.5, c: 0}, {x1: -1.8, x2: 0.0, c: 0},
  {x1: 0.2, x2: -2.0, c: 0}, {x1: -0.5, x2: 0.5, c: 0}, {x1: -2.2, x2: -2.0, c: 0}, {x1: -1.5, x2: 1.5, c: 0},
  {x1: 1.5, x2: 0.5, c: 1}, {x1: 2.0, x2: 1.2, c: 1}, {x1: 0.8, x2: 2.5, c: 1}, {x1: 2.5, x2: -0.5, c: 1},
  {x1: 1.1, x2: -1.0, c: 1}, {x1: 3.0, x2: 1.0, c: 1}, {x1: 0.5, x2: 1.5, c: 1}, {x1: 1.8, x2: 0.0, c: 1},
  {x1: -0.2, x2: 2.0, c: 1}, {x1: 0.5, x2: -0.5, c: 1}, {x1: 2.2, x2: 2.0, c: 1}, {x1: 1.5, x2: -1.5, c: 1},
];

function LogRegView() {
  const [w1, setW1] = useState(1.5);
  const [w2, setW2] = useState(1.0);
  const [b, setB] = useState(-0.5);
  const [tx, setTx] = useState(0.7);
  const [ty, setTy] = useState(-0.2);

  const [optMethod, setOptMethod] = useState<'gd'|'normal'|'svd'|'newton'>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  
  const bce = -LOGREG_2D_POINTS.reduce((acc, p) => {
    const _z = w1 * p.x1 + w2 * p.x2 + b;
    const yHat = sigmoid(_z);
    const eps = 1e-15;
    return acc + (p.c * Math.log(yHat + eps) + (1 - p.c) * Math.log(1 - yHat + eps));
  }, 0) / LOGREG_2D_POINTS.length;

  const runOptimization = () => {
    // For logistic regression, we just do a gradient descent step simulation
    setIsOptimizing(true);
    let cw1 = w1;
    let cw2 = w2;
    let cb = b;
    let history = [bce];
    setLossHistory(history);

    if (optRef.current) clearInterval(optRef.current);
    
    // We'll run a fixed number of steps (100) or until converged
    let step = 0;
    optRef.current = setInterval(() => {
      let dw1 = 0; let dw2 = 0; let db = 0;
      
      LOGREG_2D_POINTS.forEach(p => {
         const yHat = sigmoid(cw1 * p.x1 + cw2 * p.x2 + cb);
         const err = yHat - p.c;
         dw1 += err * p.x1;
         dw2 += err * p.x2;
         db += err;
      });
      
      const n = LOGREG_2D_POINTS.length;
      const lr = optMethod === 'newton' ? 0.5 : 0.1; // Simulated higher LR for Newton
      
      cw1 -= lr * (dw1 / n);
      cw2 -= lr * (dw2 / n);
      cb -= lr * (db / n);
      
      setW1(cw1);
      setW2(cw2);
      setB(cb);
      
      const _bce = -LOGREG_2D_POINTS.reduce((acc, p) => {
        const _z = cw1 * p.x1 + cw2 * p.x2 + cb;
        const _yHat = sigmoid(_z);
        return acc + (p.c * Math.log(_yHat + 1e-15) + (1 - p.c) * Math.log(1 - _yHat + 1e-15));
      }, 0) / n;
      
      history = [...history, _bce];
      if (history.length > 50) history.shift();
      setLossHistory(history);
      
      step++;
      const isConverged = Math.abs(dw1/n) < 0.005 && Math.abs(dw2/n) < 0.005 && Math.abs(db/n) < 0.005;
      
      if (step >= 100 || isConverged) {
        setIsOptimizing(false);
        if (optRef.current) clearInterval(optRef.current);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (optRef.current) clearInterval(optRef.current);
    };
  }, []);

  const z = w1 * tx + w2 * ty + b;
  const p1 = sigmoid(z);
  const p0 = 1 - p1;

  const mapX2D = (x: number) => (x + 4) * (300/8);
  const mapY2D = (y: number) => (4 - y) * (300/8);

  const mapZ = (z: number) => (z + 6) * (300/12);
  const mapSig = (s: number) => 180 - s * 140;

  // Polygon intersection logic for shading class 1
  let intersections = [];
  if (w2 !== 0) {
    let y1 = (-w1 * (-4) - b) / w2;
    if (y1 >= -4 && y1 <= 4) intersections.push({x: -4, y: y1});
    let y2 = (-w1 * 4 - b) / w2;
    if (y2 >= -4 && y2 <= 4) intersections.push({x: 4, y: y2});
  }
  if (w1 !== 0) {
    let x1 = (-w2 * (-4) - b) / w1;
    if (x1 > -4 && x1 < 4) intersections.push({x: x1, y: -4});
    let x2 = (-w2 * 4 - b) / w1;
    if (x2 > -4 && x2 < 4) intersections.push({x: x2, y: 4});
  }

  const corners = [ {x:-4, y:-4}, {x:4, y:-4}, {x:4, y:4}, {x:-4, y:4} ];
  const posCorners = corners.filter(c => (w1*c.x + w2*c.y + b) > 0);
  const polyPts = [...posCorners, ...intersections];
  const cx = polyPts.reduce((sum, p) => sum + p.x, 0) / (polyPts.length || 1);
  const cy = polyPts.reduce((sum, p) => sum + p.y, 0) / (polyPts.length || 1);
  polyPts.sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
  const polyString = polyPts.map(p => `${mapX2D(p.x)},${mapY2D(p.y)}`).join(' ');

  const sigPoints = [];
  for(let _z=-6; _z<=6; _z+=0.2) {
     sigPoints.push(`${mapZ(_z)},${mapSig(sigmoid(_z))}`);
  }
  const sigD = `M ${sigPoints.join(' L ')}`;

  return (
    <div className="flex flex-col gap-12 mt-6">
      <TheoryAppBlock 
        containerClass="bg-white/10 border-white/20"
        titleClass="text-white"
        illustration={
          <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 90 Q 50 90 50 50 T 90 10" />
            <circle cx="25" cy="90" r="3" className="fill-white" />
            <circle cx="40" cy="90" r="3" className="fill-white" />
            <circle cx="60" cy="10" r="3" className="fill-white" />
            <circle cx="80" cy="10" r="3" className="fill-white" />
          </svg>
        }
        theory={
          <>
            Malgré son nom, la <strong>Régression Logistique</strong> est un modèle de <em>classification</em>. Elle transforme un score linéaire via une fonction logistique (sigmoïde) pour s'assurer que la sortie est une probabilité stricte comprise entre 0 et 1. L'optimisation minimise alors l'entropie croisée (Log-Loss).
          </>
        }
        app={
          <>
            Souvent utilisée pour des <strong>décisions binaires (oui/non)</strong> : marquer un e-mail comme <em>spam ou non-spam</em>, diagnostiquer la présence d'une pathologie avec une probabilité donnée, ou prédire si un client risque de se désabonner (Churn).
          </>
        }
      />

      <div className="flex flex-col gap-8 items-start">
        {/* Left: 2D Scatter Space */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center">
           <h3 className="text-sm font-semibold text-white mb-6 w-full text-center">Espace de Données (x₁, x₂)</h3>
           <svg viewBox="0 0 300 300" className="w-[300px] h-[300px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
             <rect x="0" y="0" width="300" height="300" fill="rgba(59, 130, 246, 0.15)" />
             {polyString && <polygon points={polyString} fill="rgba(239, 68, 68, 0.15)" />}
             
             {/* Grid and Axes */}
             <g className="stroke-slate-700/50 stroke-[0.5]">
               {[...Array(9)].map((_, i) => <line key={`gx-${i}`} x1={mapX2D(i-4)} y1="0" x2={mapX2D(i-4)} y2="300" />)}
               {[...Array(9)].map((_, i) => <line key={`gy-${i}`} x1="0" y1={mapY2D(i-4)} x2="300" y2={mapY2D(i-4)} />)}
             </g>
             <line x1="150" y1="0" x2="150" y2="300" className="stroke-slate-600 stroke-[1.5]" />
             <line x1="0" y1="150" x2="300" y2="150" className="stroke-slate-600 stroke-[1.5]" />

             {/* Decision Boundary Line */}
             {intersections.length === 2 && (
               <line 
                  x1={mapX2D(intersections[0].x)} y1={mapY2D(intersections[0].y)}
                  x2={mapX2D(intersections[1].x)} y2={mapY2D(intersections[1].y)}
                  className="stroke-white stroke-[2] stroke-dasharray-[4,4]"
               />
             )}

             {/* Dataset Points */}
             {LOGREG_2D_POINTS.map((p, i) => (
               <circle key={i} cx={mapX2D(p.x1)} cy={mapY2D(p.x2)} r="4" 
                 className={`stroke-slate-900 stroke-[1.5] ${p.c === 1 ? 'fill-white' : 'fill-slate-500'}`} />
             ))}

             {/* Test Point */}
             <circle cx={mapX2D(tx)} cy={mapY2D(ty)} r="6" className="fill-white stroke-white stroke-[3]" />
             <circle cx={mapX2D(tx)} cy={mapY2D(ty)} r="12" className="fill-white/20 animate-pulse" />
             <text x={mapX2D(tx) + 10} y={mapY2D(ty) - 10} className="fill-white text-[10px] font-mono">Test pt</text>
           </svg>
        </div>

        {/* Right: Sigmoid function */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center">
           <h3 className="text-sm font-semibold text-white mb-6 w-full text-center">Fonction Sigmoïde σ(z)</h3>
           <svg viewBox="0 0 300 200" className="w-[300px] h-[200px] bg-slate-900 rounded-xl overflow-visible border border-slate-700">
             {/* Grid */}
             <g className="stroke-slate-700/50 stroke-[0.5]">
               {[...Array(13)].map((_, i) => <line key={`szx-${i}`} x1={mapZ(i-6)} y1="0" x2={mapZ(i-6)} y2="200" />)}
               {[0, 0.5, 1].map((s) => <line key={`ssy-${s}`} x1="0" y1={mapSig(s)} x2="300" y2={mapSig(s)} />)}
             </g>
             <line x1={mapZ(0)} y1="0" x2={mapZ(0)} y2="200" className="stroke-slate-600 stroke-[1.5]" />
             
             {/* Y-axis labels */}
             <text x="10" y={mapSig(0)-5} className="fill-slate-500 text-[10px] font-mono">0.0</text>
             <text x="10" y={mapSig(0.5)-5} className="fill-slate-500 text-[10px] font-mono">0.5</text>
             <text x="10" y={mapSig(1)+10} className="fill-slate-500 text-[10px] font-mono">1.0</text>

             {/* Curve */}
             <path d={sigD} className="stroke-white stroke-[3] fill-none" />

             {/* Projected Test Point */}
             <line x1={mapZ(z)} y1={mapSig(0)} x2={mapZ(z)} y2={mapSig(p1)} className="stroke-slate-400/50 stroke-[1.5] stroke-dasharray-[3,3]" />
             <line x1={mapZ(0)} y1={mapSig(p1)} x2={mapZ(z)} y2={mapSig(p1)} className="stroke-slate-400/50 stroke-[1.5] stroke-dasharray-[3,3]" />
             <circle cx={mapZ(z)} cy={mapSig(p1)} r="5" className="fill-white stroke-white stroke-[2]" />
             
             {/* Annotations */}
             <rect x={mapZ(z)+8} y={mapSig(p1)-15} width="65" height="20" rx="4" fill="rgba(168, 85, 247, 0.2)" />
             <text x={mapZ(z)+12} y={mapSig(p1)-2} className="fill-white text-[10px] font-mono font-bold">
               σ(x) = {p1.toFixed(2)}
             </text>
           </svg>
        </div>
      </div>

      {/* Controls & Math block */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 bg-white/[0.015] border border-white/[0.04] p-6 rounded-3xl">
         {/* 1. DATA */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">1</span>
               Data
            </h4>
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/80">Test x₁</span>
                  <span className="font-mono text-white">{tx.toFixed(2)}</span>
                </div>
                <input type="range" min="-4" max="4" step="0.1" value={tx} onChange={e => setTx(parseFloat(e.target.value))} className="w-full h-1 accent-slate-400" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/80">Test x₂</span>
                  <span className="font-mono text-white">{ty.toFixed(2)}</span>
                </div>
                <input type="range" min="-4" max="4" step="0.1" value={ty} onChange={e => setTy(parseFloat(e.target.value))} className="w-full h-1 accent-slate-400" />
              </div>
            </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4 flex flex-col">
            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">2</span>
               Model
            </h4>
            <div className="space-y-3 flex-1">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/80">w₁</span>
                  <span className="font-mono text-white">{w1.toFixed(2)}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.1" value={w1} onChange={e => setW1(parseFloat(e.target.value))} className="w-full h-1 accent-white" />
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/80">w₂</span>
                  <span className="font-mono text-white">{w2.toFixed(2)}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.1" value={w2} onChange={e => setW2(parseFloat(e.target.value))} className="w-full h-1 accent-white" />
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-white/80">b</span>
                  <span className="font-mono text-white">{b.toFixed(2)}</span>
                </div>
                <input type="range" min="-3" max="3" step="0.1" value={b} onChange={e => setB(parseFloat(e.target.value))} className="w-full h-1 accent-white" />
              </div>
            </div>
            
            <div className="font-mono text-[10px] text-white/80 space-y-1 mt-2 bg-slate-900/50 p-2 rounded">
              <div className="text-white">z = {z.toFixed(2)}</div>
              <div>P(1) = 1/(1+e⁻ᶻ) = <span className="text-white font-bold">{p1.toFixed(2)}</span></div>
            </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">3</span>
               Cost
             </h4>
             <div className="font-mono text-[11px] text-white/80 space-y-2 leading-relaxed">
               <p>Log-Loss (Entropie Croisée)</p>
               <div className="text-white/80 bg-slate-900/50 p-2 rounded break-all whitespace-pre-wrap leading-tight text-[9px]">
                  L = -1/N Σ [ y·log(p) + (1-y)·log(1-p) ]
               </div>
               <div className="mt-2 text-[11px]">
                 Erreur Actuelle:<br/>
                 <span className={`text-xl font-bold ${bce < 0.2 ? 'text-white' : bce < 0.5 ? 'text-white' : 'text-white/80'}`}>
                   {bce.toFixed(3)}
                 </span>
               </div>
             </div>
         </div>

         {/* 4. OPTIMIZE */}
         <div className="space-y-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">4</span>
               Minimize Cost
             </h4>
             <OptimizationModule 
               method={optMethod} 
               onMethodChange={setOptMethod} 
               isOptimizing={isOptimizing} 
               onOptimize={runOptimization} 
               lossHistory={lossHistory} 
               themeColor="blue"
               availableMethods={['gd', 'newton']}
             />
         </div>
      </div>
    </div>
  );
}

function PolyRegView() {
  const [degree, setDegree] = useState(2);
  const [tx, setTx] = useState(5.0);
  const [optMethod, setOptMethod] = useState<'gd'|'normal'|'svd'>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);

  const presets = {
    1: [1.2, 0.5, 0, 0, 0],
    2: [1.0, 0.1, 0.05, 0, 0],
    3: [9.0, -3.65, 0.8, -0.05, 0],
    4: [15.0, -10.0, 2.5, -0.22, 0.007],
  };

  const optimalTargets = {
    1: [1.039, 0.597, 0, 0, 0],
    2: [-0.100, 1.218, -0.062, 0, 0],
    3: [6.828, -5.416, 1.512, -0.105, 0],
    4: [4.778, -2.609, 0.395, 0.062, -0.0084],
  };

  const [w, setW] = useState<number[]>(presets[2]);
  
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const handleDegreeChange = (d: number) => {
    setDegree(d);
    setW(presets[d as 1|2|3|4] || presets[1]);
    if (optRef.current) clearInterval(optRef.current);
    setIsOptimizing(false);
  };

  const handleWeightChange = (index: number, val: number) => {
    const newW = [...w];
    newW[index] = val;
    setW(newW);
    if (optRef.current) clearInterval(optRef.current);
    setIsOptimizing(false);
  };

  const runOptimization = () => {
    const target = optimalTargets[degree as 1|2|3|4];
    
    if (optMethod !== 'gd') {
       // Direct jump for Normal Equation or SVD
       setW([...target]);
       setLossHistory([mse, mse * 0.1]); // Dummy history for jump
       return;
    }

    // Pseudo-gradient descent animation
    setIsOptimizing(true);
    let currentW = [...w];
    let currentHistory = [mse];
    setLossHistory(currentHistory);

    if (optRef.current) clearInterval(optRef.current);
    
    optRef.current = setInterval(() => {
      let isDone = true;
      const nextW = currentW.map((cw, i) => {
        const diff = target[i] - cw;
        if (Math.abs(diff) > 0.001) isDone = false;
        // Move 10% towards target to simulate descent steps
        return cw + diff * 0.1;
      });
      
      setW(nextW);
      currentW = nextW;
      
      // Calculate current mse
      const _mse = POLY_POINTS.reduce((acc, p) => {
         let _y = nextW[0];
         if (degree >= 1) _y += nextW[1] * p.x;
         if (degree >= 2) _y += nextW[2] * Math.pow(p.x, 2);
         if (degree >= 3) _y += nextW[3] * Math.pow(p.x, 3);
         if (degree >= 4) _y += nextW[4] * Math.pow(p.x, 4);
         return acc + Math.pow(p.y - _y, 2);
      }, 0) / POLY_POINTS.length;

      currentHistory = [...currentHistory, _mse];
      // Keep last 50 points
      if (currentHistory.length > 50) currentHistory.shift();
      setLossHistory(currentHistory);
      
      if (isDone) {
        setW([...target]);
        setIsOptimizing(false);
        if (optRef.current) clearInterval(optRef.current);
      }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (optRef.current) clearInterval(optRef.current);
    };
  }, []);

  function evalPoly(x: number) {
     let y = w[0];
     if (degree >= 1) y += w[1] * x;
     if (degree >= 2) y += w[2] * Math.pow(x, 2);
     if (degree >= 3) y += w[3] * Math.pow(x, 3);
     if (degree >= 4) y += w[4] * Math.pow(x, 4);
     return y;
  }

  const mapX = (x: number) => x * 40 + 20;
  const mapY = (y: number) => 300 - y * 30;

  const curvePoints = [];
  for(let x=0; x<=10; x+=0.05) {
      curvePoints.push(`${mapX(x)},${mapY(evalPoly(x))}`);
  }
  const curveD = `M ${curvePoints.join(' L ')}`;

  const tyHat = evalPoly(tx);
  const mse = POLY_POINTS.reduce((acc, p) => acc + Math.pow(p.y - evalPoly(p.x), 2), 0) / POLY_POINTS.length;

  const degreeLabels = {
    1: 'Sous-apprentissage (Underfit)',
    2: 'Quadratique (Insuffisant)',
    3: 'Cubique (Bon Ajustement)',
    4: 'Sur-apprentissage (Overfit)'
  };
  
  const displayDegree = degree >= 4 ? 4 : degree;

  return (
    <div className="flex flex-col gap-12 mt-6">
      <TheoryAppBlock 
        containerClass="bg-white/10 border-white/20"
        titleClass="text-white"
        illustration={
          <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 80 Q 50 10 90 80" />
            <circle cx="30" cy="55" r="3" className="fill-white" />
            <circle cx="50" cy="30" r="3" className="fill-white" />
            <circle cx="70" cy="55" r="3" className="fill-white" />
          </svg>
        }
        theory={
          <>
            D'apparence non-linéaire, la <strong>Régression Polynomiale</strong> reste un modèle linéaire vis-à-vis de ses paramètres (w). On effectue un <i>Feature Mapping</i> en élevant la variable explicative d'origine (x) à des puissances supérieures (x², x³, etc.) avant de faire une régression classique, ce qui permet à la courbe de s'incurver.
          </>
        }
        app={
          <>
            Excellente pour modéliser des phénomènes qui accélèrent ou décélèrent, comme la <strong>croissance exponentielle initiale d'une valeur</strong> ou la propagation de phénomènes sans invoquer un modèle lourd. Attention, le modèle oscille ("overfit") énormément si le degré est trop élevé.
          </>
        }
      />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Data Space */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center w-full">
           <h3 className="text-sm font-semibold text-white mb-6 w-full text-center">Espace de Données (x, y)</h3>
           <svg viewBox="0 0 420 350" className="w-full h-auto max-w-[500px] bg-slate-900 rounded-xl overflow-visible border border-slate-700">
             <g className="stroke-slate-700/50 stroke-[0.5]">
                {[...Array(11)].map((_, i) => <line key={`gx-${i}`} x1={mapX(i)} y1="30" x2={mapX(i)} y2="300" />)}
                {[...Array(10)].map((_, i) => <line key={`gy-${i}`} x1="20" y1={mapY(i)} x2="420" y2={mapY(i)} />)}
             </g>

             <path d="M20 300 L420 300 M20 300 L20 30" className="stroke-slate-700 stroke-2" />
             
             <path d={curveD} className={`stroke-[3] fill-none transition-all duration-300 ${displayDegree === 4 ? 'stroke-red-400' : 'stroke-white'}`} />
             
             {POLY_POINTS.map((p, i) => (
               <circle key={`p-${i}`} cx={mapX(p.x)} cy={mapY(p.y)} r="5" className="fill-slate-200 stroke-slate-900 stroke-[2]" />
             ))}

             <circle cx={mapX(tx)} cy={mapY(tyHat)} r="6" className="fill-white stroke-white stroke-[3]" />
             <circle cx={mapX(tx)} cy={mapY(tyHat)} r="12" className="fill-white/20 animate-pulse" />
             <line x1={mapX(tx)} y1={300} x2={mapX(tx)} y2={mapY(tyHat)} className="stroke-white/50 stroke-[1.5] stroke-dasharray-[2,2]" />
             <line x1={20} y1={mapY(tyHat)} x2={mapX(tx)} y2={mapY(tyHat)} className="stroke-white/50 stroke-[1.5] stroke-dasharray-[2,2]" />
             
             <text x={mapX(tx) + 10} y={mapY(tyHat) - 10} className="fill-white text-[10px] font-mono">Test pt</text>
           </svg>
        </div>

        {/* Feature Space */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col items-center w-full min-h-[440px]">
           <h3 className="text-sm font-semibold text-white w-full text-center mb-2">Feature Mapping (Transformation)</h3>
           <p className="text-xs text-white/80 text-center mb-6 max-w-sm">
             Le scalaire <span className="font-mono text-white">x</span> est étendu en un vecteur de <span className="font-mono text-white">d</span> dimensions : <span className="font-mono text-white">[x, x², x³...]</span>
           </p>

           <div className="w-full flex-1 flex flex-col justify-center items-stretch gap-4 px-2 sm:px-8 font-mono text-xs">
              
              <div className="flex justify-between items-center text-white/80">
                 <span>Input x:</span>
                 <span className="text-white bg-slate-800 px-3 py-1 rounded font-bold text-sm">{tx.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-center text-white/50">↓</div>

              <div className="bg-white/10 border border-white/20 rounded-xl p-4 sm:p-6 space-y-4">
                 <div className="text-center text-white mb-2 font-sans font-semibold text-[10px] uppercase tracking-widest">
                   Vecteur de Features
                 </div>
                 
                 <div className="space-y-3">
                   <div className="flex items-center gap-3">
                     <span className="w-6 text-right text-white font-bold">x¹</span>
                     <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-white/10 transition-all duration-300" style={{width: `${Math.min(100, (tx/10)*100)}%`}}></div>
                     </div>
                     <span className="w-12 text-right">{Math.pow(tx, 1).toFixed(1)}</span>
                   </div>
                   
                   {displayDegree >= 2 && (
                   <div className="flex items-center gap-3 opacity-90 delay-75">
                     <span className="w-6 text-right text-white font-bold">x²</span>
                     <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-white/10 transition-all duration-300" style={{width: `${Math.min(100, (Math.pow(tx, 2)/100)*100)}%`}}></div>
                     </div>
                     <span className="w-12 text-right text-white/90">{Math.pow(tx, 2).toFixed(1)}</span>
                   </div>
                   )}

                   {displayDegree >= 3 && (
                   <div className="flex items-center gap-3 opacity-80 delay-150">
                     <span className="w-6 text-right text-white font-bold">x³</span>
                     <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-white/10 transition-all duration-300" style={{width: `${Math.min(100, (Math.pow(tx, 3)/1000)*100)}%`}}></div>
                     </div>
                     <span className="w-12 text-right text-white/80">{Math.pow(tx, 3).toFixed(1)}</span>
                   </div>
                   )}

                   {displayDegree >= 4 && (
                   <div className="flex items-center gap-3 opacity-70 delay-200">
                     <span className="w-6 text-right text-white font-bold">x⁴</span>
                     <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-white/50 transition-all duration-300" style={{width: `${Math.min(100, (Math.pow(tx, 4)/10000)*100)}%`}}></div>
                     </div>
                     <span className="w-12 text-right text-white/70">{Math.pow(tx, 4).toFixed(0)}</span>
                   </div>
                   )}
                 </div>
              </div>

              <div className="flex justify-center text-white/50">↓</div>
              
              <div className="flex justify-between items-center text-white/80">
                 <span>Régression Linéaire :</span>
                 <span className="text-white font-bold bg-white/10 border border-white/20 px-3 py-1 rounded text-sm">ŷ = {tyHat.toFixed(2)}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 bg-white/[0.015] border border-white/[0.04] p-6 rounded-3xl">
         {/* 1. DATA */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">1</span>
               Data
             </h4>
             <div className="space-y-4 pt-1">
               <div>
                 <div className="flex justify-between text-xs mb-2">
                   <span className="text-white/80">Test x</span>
                   <span className="font-mono text-white">{tx.toFixed(2)}</span>
                 </div>
                 <input type="range" min="0" max="10" step="0.1" value={tx} onChange={e => setTx(parseFloat(e.target.value))} className="w-full accent-slate-400" />
               </div>
               <p className="text-[11px] text-white/80 leading-relaxed pt-2">
                 Les données réelles ne sont pas toujours en ligne droite.
               </p>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4 flex flex-col items-stretch">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2 shrink-0">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">2</span>
               Model (Paramètres)
             </h4>
             <div className="space-y-3 shrink-0">
               <div>
                 <div className="flex justify-between text-xs mb-1">
                   <span className="text-white font-bold">Degré (Polynôme)</span>
                   <span className="font-mono text-white bg-white/10 px-2 rounded">{displayDegree}</span>
                 </div>
                 <input type="range" min="1" max="4" step="1" value={degree} onChange={e => handleDegreeChange(parseInt(e.target.value))} className="w-full h-1 accent-white" />
               </div>
             </div>
             
             <div className="flex-1 space-y-2 mt-4 pt-4 border-t border-white/5">
               <div className="space-y-1">
                 <div className="flex justify-between text-[10px] items-center">
                   <span className="font-mono text-white/80">w₀ (Biais)</span>
                   <span className="font-mono text-white/80 bg-slate-800 px-1 rounded">{w[0].toFixed(2)}</span>
                 </div>
                 <input type="range" min="-20" max="20" step="0.1" value={w[0]} onChange={e => handleWeightChange(0, parseFloat(e.target.value))} className="w-full h-1 accent-slate-400" />
               </div>

               {degree >= 1 && (
                 <div className="space-y-1 mt-2">
                   <div className="flex justify-between text-[10px] items-center">
                     <span className="font-mono text-white">w₁ (x)</span>
                     <span className="font-mono text-white bg-white/10 px-1 rounded">{w[1].toFixed(2)}</span>
                   </div>
                   <input type="range" min="-15" max="15" step="0.1" value={w[1]} onChange={e => handleWeightChange(1, parseFloat(e.target.value))} className="w-full h-1 accent-white" />
                 </div>
               )}

               {degree >= 2 && (
                 <div className="space-y-1 mt-2">
                   <div className="flex justify-between text-[10px] items-center">
                     <span className="font-mono text-white">w₂ (x²)</span>
                     <span className="font-mono text-white bg-white/10 px-1 rounded">{w[2].toFixed(2)}</span>
                   </div>
                   <input type="range" min="-5" max="5" step="0.01" value={w[2]} onChange={e => handleWeightChange(2, parseFloat(e.target.value))} className="w-full h-1 accent-white" />
                 </div>
               )}

               {degree >= 3 && (
                 <div className="space-y-1 mt-2">
                   <div className="flex justify-between text-[10px] items-center">
                     <span className="font-mono text-white">w₃ (x³)</span>
                     <span className="font-mono text-white bg-white/10 px-1 rounded">{w[3].toFixed(3)}</span>
                   </div>
                   <input type="range" min="-1" max="1" step="0.005" value={w[3]} onChange={e => handleWeightChange(3, parseFloat(e.target.value))} className="w-full h-1 accent-white" />
                 </div>
               )}

               {degree >= 4 && (
                 <div className="space-y-1 mt-2">
                   <div className="flex justify-between text-[10px] items-center">
                     <span className="font-mono text-white">w₄ (x⁴)</span>
                     <span className="font-mono text-white bg-white/10 px-1 rounded">{w[4].toFixed(4)}</span>
                   </div>
                   <input type="range" min="-0.1" max="0.1" step="0.0005" value={w[4]} onChange={e => handleWeightChange(4, parseFloat(e.target.value))} className="w-full h-1 accent-white" />
                 </div>
               )}
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4 flex flex-col justify-center">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">3</span>
               Cost (Erreur)
             </h4>
             <div className="font-mono text-[11px] text-white/80 space-y-2 leading-relaxed flex-1 flex flex-col justify-center">
               <div className="text-white/80 bg-slate-900/50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 shadow-inner">
                 <span className="text-[10px] tracking-widest uppercase opacity-70">MSE = 1/n Σ(y - ŷ)²</span>
                 <span className="text-3xl font-bold text-white tracking-tighter">{mse.toFixed(2)}</span>
               </div>
               <p className={displayDegree === 4 ? "text-red-400 pt-2" : "text-white/80 pt-2"}>
                 {displayDegree === 4 ? "Jouez sur les poids ! La courbe peut rapidement sortir de l'écran." : "Ajustez manuellement les poids (w) pour minimiser cette erreur."}
               </p>
             </div>
         </div>

         {/* 4. OPTIMIZE */}
         <div className="space-y-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">4</span>
               Minimize Cost
             </h4>
             <OptimizationModule 
               method={optMethod} 
               onMethodChange={setOptMethod} 
               isOptimizing={isOptimizing} 
               onOptimize={runOptimization} 
               lossHistory={lossHistory} 
               themeColor="purple"
               availableMethods={['gd', 'normal', 'svd']}
             />
         </div>
      </div>
    </div>
  );
}

function RegView() {
  const [lambda, setLambda] = useState(50); // 0 to 100
  
  const [optMethod, setOptMethod] = useState<'gd'|'normal'|'svd'>('gd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const runOptimization = () => {
    setIsOptimizing(true);
    let history = [(100 + lambda) / 100];
    setLossHistory(history);
    if (optRef.current) clearInterval(optRef.current);
    
    let step = 0;
    optRef.current = setInterval(() => {
       const shrinkLoss = (100 - step) / 100 + (lambda / 100) * ((100 - step)/100);
       history = [...history, Math.max(shrinkLoss, 0.2 + lambda/200)];
       if (history.length > 50) history.shift();
       setLossHistory(history);
       step += 5;
       if (step >= 100) {
         setIsOptimizing(false);
         if (optRef.current) clearInterval(optRef.current);
       }
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (optRef.current) clearInterval(optRef.current);
    };
  }, []);

  const scale = 1 - (lambda / 110);
  const l1Radius = 80 * scale;
  const l2Radius = 70 * scale;

  return (
    <div className="flex flex-col gap-12">
      <TheoryAppBlock 
        containerClass="bg-white/10 border-white/20"
        titleClass="text-white"
        illustration={
          <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="50" cy="50" rx="35" ry="15" transform="rotate(-30 50 50)" />
            <polygon points="50,15 85,50 50,85 15,50" className="stroke-white opacity-50" />
            <circle cx="68" cy="40" r="4" className="fill-white" />
          </svg>
        }
        theory={
          <>
            La <strong>Régularisation (Lasso, Ridge)</strong> modifie la fonction de coût pour y ajouter une pénalité liée au poids des paramètres. <br/><br/>
            - <strong>L1 (Lasso)</strong> force diamétralement certains poids (variables) à zéro (générant de la <em>sparsity</em>).<br/>
            - <strong>L2 (Ridge)</strong> réduit la taille de tous les poids. L'objectif est d'empêcher les modèles de sur-apprendre le bruit (Overfitting).
          </>
        }
        app={
          <>
            Idéal lorsque vous avez <strong>plus de variables que de données</strong> (ex: génomique, text mining), ou lorsque de nombreuses features sont corrélées (multicolinéarité). Cela permet d'obtenir un modèle extraordinairement robuste.
          </>
        }
      />

       <div className="flex flex-col gap-8 items-center bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
         <div className="flex-1 space-y-6">
           <h3 className="text-sm tracking-widest uppercase text-white font-semibold mb-2">Contrainte / Régularisation</h3>
           <p className="text-white/80 leading-relaxed text-sm">
             La régularisation contraint l'espace des paramètres admissibles pour limiter la complexité et réduire le sur-apprentissage (overfitting), particulièrement dans les modèles trop flexibles.
           </p>
           
           <div className="mt-8">
              <div className="flex justify-between text-sm mb-3">
                <label className="font-medium text-white/80">Force de la pénalité <span className="font-mono text-white">λ</span></label>
                <span className="font-mono text-white/80">{lambda}%</span>
              </div>
              <input type="range" min="0" max="95" step="1" value={lambda} onChange={e => setLambda(parseInt(e.target.value))} className="w-full accent-white" />
              <p className="text-xs text-white/80 mt-2 leading-relaxed">Plus λ grandit, plus la zone géométrique des poids permis se réduit autour de zéro.</p>
           </div>
           
           <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 mt-4">
             <h4 className="text-[10px] tracking-widest uppercase text-white/80 font-semibold mb-2">ElasticNet</h4>
             <div className="text-xs font-light text-white/80 leading-relaxed">
               Parfois on utilise une combinaison (hybride) L1 + L2, recommandée quand de nombreuses features sont corrélées.
             </div>
           </div>
         </div>

         <div className="flex-1 flex flex-col gap-6 justify-center w-full min-h-[300px]">
           {/* L1 Lasso */}
           <div className="flex-1 max-w-[280px] w-full flex flex-col">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center justify-between">
                 L1 (Lasso)
                 <span className="bg-white/10 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold">Sparsity</span>
              </h4>
              <div className="relative h-48 border border-white/[0.04] bg-slate-900 rounded-xl overflow-hidden mb-4 w-full">
                 <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                   <ellipse cx="140" cy="60" rx="20" ry="12" className="fill-none stroke-slate-500/40 stroke-[0.5]" transform="rotate(-30 140 60)" />
                   <ellipse cx="130" cy="70" rx="45" ry="25" className="fill-none stroke-slate-500/30 stroke-[0.5]" transform="rotate(-30 130 70)" />
                   <ellipse cx="120" cy="80" rx="75" ry="40" className="fill-none stroke-slate-500/20 stroke-[0.5]" transform="rotate(-30 120 80)" />
                   <ellipse cx="110" cy="90" rx="110" ry="60" className="fill-none stroke-slate-500/10 stroke-[0.5]" transform="rotate(-30 110 90)" />
                   
                   <line x1="0" y1="100" x2="200" y2="100" className="stroke-slate-700 stroke-[1]" />
                   <line x1="100" y1="0" x2="100" y2="200" className="stroke-slate-700 stroke-[1]" />
                   
                   {/* Diamond */}
                   <motion.polygon 
                     animate={{ points: `100,${100-l1Radius} ${100+l1Radius},100 100,${100+l1Radius} ${100-l1Radius},100` }}
                     transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                     className="fill-white/20 stroke-white stroke-[2]" 
                   />
                   
                   <motion.circle 
                     animate={{ cy: 100 - l1Radius }}
                     transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                     cx="100" r="4" className="fill-white shadow-[0_0_10px_white]" 
                   />
                 </svg>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">
                Sa forme en losange force certains poids (sur l'axe ici) exactement à <strong>zéro</strong>. Très utile pour éliminer les variables inutiles.
              </p>
           </div>

           {/* L2 Ridge */}
           <div className="flex-1 max-w-[280px] w-full flex flex-col">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center justify-between">
                 L2 (Ridge)
                 <span className="bg-white/10 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-semibold">Shrinkage</span>
              </h4>
              
              <div className="relative h-48 border border-white/[0.04] bg-slate-900 rounded-xl overflow-hidden mb-4 w-full">
                 <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                   <ellipse cx="140" cy="60" rx="20" ry="12" className="fill-none stroke-slate-500/40 stroke-[0.5]" transform="rotate(-30 140 60)" />
                   <ellipse cx="130" cy="70" rx="45" ry="25" className="fill-none stroke-slate-500/30 stroke-[0.5]" transform="rotate(-30 130 70)" />
                   <ellipse cx="120" cy="80" rx="75" ry="40" className="fill-none stroke-slate-500/20 stroke-[0.5]" transform="rotate(-30 120 80)" />
                   <ellipse cx="110" cy="90" rx="110" ry="60" className="fill-none stroke-slate-500/10 stroke-[0.5]" transform="rotate(-30 110 90)" />

                   <line x1="0" y1="100" x2="200" y2="100" className="stroke-slate-700 stroke-[1]" />
                   <line x1="100" y1="0" x2="100" y2="200" className="stroke-slate-700 stroke-[1]" />
                   
                   {/* Circle */}
                   <motion.circle 
                     animate={{ r: l2Radius }}
                     transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                     cx="100" cy="100" className="fill-white/20 stroke-white stroke-[2]" 
                   />
                   
                   <motion.circle 
                     animate={{ 
                       cx: 100 + l2Radius * Math.cos(-Math.PI/4.5), 
                       cy: 100 + l2Radius * Math.sin(-Math.PI/4.5) 
                     }}
                     transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                     r="4" className="fill-white shadow-[0_0_10px_white]" 
                   />
                 </svg>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed font-light">
                Sa forme lisse réduit proportionnellement la taille de tous les poids, sans forcément les annuler complètement. Modèle plus robuste.
              </p>
           </div>
         </div>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 bg-white/[0.015] border border-white/[0.04] p-6 rounded-3xl">
         {/* 1. DATA */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">1</span>
               Data
             </h4>
             <div className="font-mono text-[11px] text-white/80 space-y-2 leading-relaxed">
               <p>Données bruitées</p>
               <div className="text-white/80">Plus il y a de features (x₁, ... x₁₀₀) plus le modèle peut "apprendre par cœur" le bruit.</div>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">2</span>
               Model
             </h4>
             <div className="font-mono text-[11px] text-white/80 space-y-2 leading-relaxed">
               <p>Poids gigantesques !</p>
               <div className="text-white/80">Pour s'ajuster parfaitement au bruit, le modèle va utiliser des <span className="font-bold text-white">wᵢ très grands</span> (+2000, -1998...).</div>
               <p className="text-white/80">Il est trop confiant.</p>
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">3</span>
               Cost (Avec Pénalité)
             </h4>
             <div className="font-mono text-[11px] text-white/80 space-y-2 leading-relaxed">
               <p>MSE + Pénalité sur w</p>
               <div className="text-white/80 bg-slate-900/50 p-2 rounded leading-tight">
                 (Cost standard)<br/>+ λ Σ|wᵢ| <span className="text-[9px] text-white/80 ml-1">(Lasso)</span><br/>+ λ Σ(wᵢ)² <span className="text-[9px] text-white/80 ml-1">(Ridge)</span>
               </div>
               <p className="text-white/80">Avoir des poids éloignés de zéro coûte désormais très cher !</p>
             </div>
         </div>

         {/* 4. OPTIMIZE */}
         <div className="space-y-4 border-t border-white/5 md:border-t-0 md:pl-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/80 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-white/80">4</span>
               Minimize Cost
             </h4>
             <OptimizationModule 
               method={optMethod} 
               onMethodChange={setOptMethod} 
               isOptimizing={isOptimizing} 
               onOptimize={runOptimization} 
               lossHistory={lossHistory} 
               themeColor="pink"
               availableMethods={['gd']}
             />
         </div>
      </div>
    </div>
  );
}

function ARIMAView() {
  const [phi1, setPhi1] = useState(0.8);
  
  // AR(1) process synthesis
  const timeSeries = useMemo(() => {
    const series = [];
    const n = 100;
    
    let seed = 42;
    const randomNorm = () => {
      seed = (seed * 16807) % 2147483647;
      const u1 = (seed - 1) / 2147483646;
      seed = (seed * 16807) % 2147483647;
      const u2 = (seed - 1) / 2147483646;
      return Math.sqrt(-2.0 * Math.log(u1 || 1e-10)) * Math.cos(2.0 * Math.PI * u2);
    };

    const targetPhi = 0.6; // true value used to generate
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        series.push(randomNorm());
      } else {
        let val = targetPhi * series[i-1] + randomNorm();
        if (val > 10) val = 10;
        if (val < -10) val = -10;
        series.push(val);
      }
    }
    return series;
  }, []);

  const predictions = useMemo(() => {
    const preds = [];
    for (let i = 0; i < timeSeries.length; i++) {
        let pred = 0;
        if (i >= 1) pred += phi1 * timeSeries[i-1];
        preds.push(pred);
    }
    return preds;
  }, [timeSeries, phi1]);

  const mse = useMemo(() => {
    let sum = 0;
    for (let i = 1; i < timeSeries.length; i++) {
      const err = timeSeries[i] - predictions[i];
      sum += err * err;
    }
    return sum / (timeSeries.length - 1);
  }, [timeSeries, predictions]);

  const pathData = useMemo(() => {
    const pts = timeSeries.map((val, i) => `${(i / (timeSeries.length - 1)) * 100},${50 - val * 7}`);
    return `M ${pts.join(' L ')}`;
  }, [timeSeries]);
  
  const pathPred = useMemo(() => {
    const pts = predictions.map((val, i) => `${(i / (timeSeries.length - 1)) * 100},${50 - val * 7}`);
    return `M ${pts.slice(1).join(' L ')}`;
  }, [predictions, timeSeries.length]);

  return (
    <div className="flex flex-col gap-12 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <TheoryAppBlock 
        containerClass="bg-white/10 border-white/20 z-10 relative"
        titleClass="text-white"
        illustration={
           <svg viewBox="0 0 100 100" className="w-24 h-24 opacity-60 stroke-white fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M10 70 L25 45 L40 60 L55 30 L70 50 L90 20" />
             <line x1="80" y1="10" x2="80" y2="90" strokeWidth="1.5" strokeDasharray="3,3" />
             <path d="M70 50 L80 35" className="stroke-white/50" strokeDasharray="2,2"/>
           </svg>
        }
        theory={
          <>
            <strong>ARIMA</strong> (AutoRegressive Integrated Moving Average) est un modèle robuste pour analyser des séries temporelles. Il combine la prévision par la mémoire <em>Auto-Régressive</em> (exploitant les motifs récents), et la <em>Moyenne Mobile</em> de ses erreurs passées. L'intégration rend toute la série stationnaire avant ce calcul.
          </>
        }
        app={
          <>
            Parfait pour la <strong>prévision dans le temps sur des données saisonnières ou structurées</strong> : prédire le cours d'un indice boursier à haut volume, une charge sur le réseau énergétique ou les ventes prévisionnelles d'une chaîne de commerces.
          </>
        }
      />

      <div className="flex flex-col gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="text-sm tracking-widest uppercase text-white font-semibold mb-2">Série Originelle vs. Prédiction AR(1)</h3>
             </div>
             
             <div className="relative w-full aspect-[4/3] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                   <g className="stroke-white/5" strokeWidth="0.5">
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`h${i}`} x1="0" y1={i*10} x2="100" y2={i*10} />)}
                      {[1,2,3,4,5,6,7,8,9].map(i => <line key={`v${i}`} x1={i*10} y1="0" x2={i*10} y2="100" />)}
                   </g>
                   <line x1="0" y1="50" x2="100" y2="50" className="stroke-white/20" strokeWidth="1" strokeDasharray="2,2" />
                   
                   <path d={pathData} className="stroke-white/30 fill-none" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                   <path d={pathPred} className="stroke-white fill-none" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeDasharray="2,1" />
                </svg>
             </div>
             
             <p className="text-[10px] text-white/80 font-mono text-center mt-4">
                 <span className="text-white/40">Gris: Observation (y_t)</span> | <span className="text-white">Vert: Modèle (ŷ_t)</span>
             </p>
          </div>
        </div>

        <div className="flex-[0.8] flex flex-col gap-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Paramètre Autorégressif <span className="font-mono text-white">φ₁</span></h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] text-white/80 mb-2">
                  <span>Influence de y<sub className="text-[9px]">t-1</sub> sur y<sub className="text-[9px]">t</sub></span>
                  <span className="font-mono text-white">{phi1.toFixed(2)}</span>
                </div>
                <input type="range" min="-1.1" max="1.1" step="0.05" value={phi1} onChange={e => setPhi1(parseFloat(e.target.value))} className="w-full h-1.5 accent-white rounded-full bg-slate-800" />
              </div>

              {((phi1) >= 1 || (phi1) <= -1) && (
                  <div className="text-[10px] uppercase font-bold text-red-500 tracking-widest bg-red-500/10 px-3 py-2 rounded">
                    Risque de Non-Stationnarité (|φ| ≥ 1)
                  </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <h4 className="text-xs text-white/80 uppercase tracking-widest font-semibold flex justify-between items-center">
                Coût (MSE)
                <span className="text-white font-mono text-lg">{mse.toFixed(2)}</span>
              </h4>
              <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-3 overflow-hidden">
                <motion.div animate={{ width: `${Math.min(100, Math.max(0, (mse / 4) * 100))}%` }} className="h-full bg-white/10" transition={{ type: 'spring', bounce: 0 }} />
              </div>
              <p className="text-[10px] text-white/80 font-mono">Dès que vous vous éloignez de φ=0.6, l'erreur augmente.</p>
            </div>
          </div>
          
          <div className="bg-slate-900/50 border border-white/20 rounded-3xl p-6 text-[11px] text-white/50 font-mono leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <strong className="text-white block mb-2 text-xs">Concepts Clés: ARIMA</strong>
            <ul className="space-y-3">
              <li>
                <span className="text-white font-bold">AR(p): Auto-Régression</span><br/>
                La série s'explique par ses propres <i>p</i> valeurs passées. Un cas de régression linéaire où les features sont les retards temporels.
              </li>
              <li>
                <span className="text-white font-bold">MA(q): Moyennes Mobiles</span><br/>
                Modélise le choc (erreur) actuel comme une combinaison des <i>q</i> chocs passés temporels.
              </li>
              <li>
                <span className="text-white font-bold">I(d): Intégration</span><br/>
                On différencie la série <i>d</i> fois jusqu'à la rendre stationnaire (moyenne/variance stable).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TheoryAppBlock({ 
  theory, 
  app, 
  containerClass, 
  titleClass,
  illustration
}: { 
  theory: React.ReactNode; 
  app: React.ReactNode; 
  containerClass: string; 
  titleClass: string;
  illustration: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-6 ${containerClass} p-6 border rounded-3xl mb-8 shadow-sm`}>
      <div className="flex-[0.5] hidden lg:flex items-center justify-center">
        {illustration}
      </div>
      <div className={`flex-[1.5] space-y-3`}>
        <h4 className={`text-sm tracking-widest uppercase ${titleClass} font-semibold flex items-center gap-2`}>
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
           </svg>
           Concept Théorique
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {theory}
        </p>
      </div>
      <div className={`flex-[1.5] space-y-3`}>
        <h4 className={`text-sm tracking-widest uppercase ${titleClass} font-semibold flex items-center gap-2`}>
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
           </svg>
           Application Concrète
        </h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {app}
        </p>
      </div>
    </div>
  );
}

export type OptMethod = 'gd' | 'normal' | 'svd' | 'newton';

interface OptimizationModuleProps {
  method: OptMethod;
  onMethodChange: (m: OptMethod) => void;
  isOptimizing: boolean;
  onOptimize: () => void;
  lossHistory: number[];
  availableMethods?: OptMethod[];
  themeColor?: 'amber' | 'blue' | 'purple' | 'pink' | 'emerald' | 'sky';
}

export function OptimizationModule({ 
  method, 
  onMethodChange, 
  isOptimizing, 
  onOptimize, 
  lossHistory, 
  availableMethods = ['gd', 'normal', 'svd'],
  themeColor = 'purple'
}: OptimizationModuleProps) {

  const themeClasses: Record<string, any> = {
    amber: { bg: 'bg-white/10', hover: 'hover:bg-white/10', text: 'text-white', border: 'border-white/20', focus: 'focus:border-white/20' },
    blue: { bg: 'bg-white/10', hover: 'hover:bg-white/10', text: 'text-white', border: 'border-white/20', focus: 'focus:border-white/20' },
    purple: { bg: 'bg-white/10', hover: 'hover:bg-white/10', text: 'text-white', border: 'border-white/20', focus: 'focus:border-white/20' },
    pink: { bg: 'bg-white/10', hover: 'hover:bg-white/10', text: 'text-white', border: 'border-white/20', focus: 'focus:border-white/20' },
    emerald: { bg: 'bg-white/10', hover: 'hover:bg-white/10', text: 'text-white', border: 'border-white/20', focus: 'focus:border-white/20' },
    sky: { bg: 'bg-sky-500', hover: 'hover:bg-sky-600', text: 'text-sky-400', border: 'border-sky-500', focus: 'focus:border-sky-500' },
  }[themeColor];

  let chartD = "";
  if (lossHistory.length > 0) {
    const maxLoss = Math.max(...lossHistory, 0.1);
    const minLoss = 0; 
    const range = (maxLoss - minLoss) || 1;
    
    const pts = lossHistory.map((l, i) => {
      const x = lossHistory.length > 1 ? (i / (lossHistory.length - 1)) * 100 : 50;
      const y = 40 - ((l - minLoss) / range) * 35; 
      return `${x},${y}`;
    });
    chartD = `M ${pts.join(' L ')}`;
  }

  const labels: Record<string, string> = {
    gd: "Descente de Gradient",
    normal: "Équation Normale",
    svd: "Méthode SVD (Stable)",
    newton: "Méthode de Newton"
  };

  const descriptions: Record<string, { eq: string, desc: string }> = {
    gd: { eq: "w := w - α·∂(Loss)/∂w", desc: "Itératif. Ajustement en direction du minimum." },
    normal: { eq: "w = (XᵀX)⁻¹ Xᵀy", desc: "Analytique (1 étape). Inversion de matrice XᵀX." },
    svd: { eq: "w = V Σ⁺ Uᵀ y", desc: "Décomposition SVD. Plus robuste numériquement." },
    newton: { eq: "w := w - H⁻¹ ∇L", desc: "Ordre 2. Converge très vite." }
  };

  return (
    <div className="space-y-3 w-full mt-2">
      <div className="flex flex-col gap-2">
        <select 
          value={method} 
          onChange={(e) => onMethodChange(e.target.value as OptMethod)}
          className={`w-full bg-slate-900 border border-slate-700 text-xs text-white/80 rounded p-1.5 focus:outline-none ${themeClasses.focus}`}
        >
          {availableMethods.map(m => (
            <option key={m} value={m}>{labels[m]}</option>
          ))}
        </select>
        
        <button 
          onClick={onOptimize}
          disabled={isOptimizing}
          className={`w-full ${themeClasses.bg} ${themeClasses.hover} disabled:opacity-50 disabled:cursor-not-allowed text-white text-[11px] font-bold py-1.5 px-3 rounded transition-colors flex items-center justify-center gap-2`}
        >
          {isOptimizing ? (
            <>
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Optimisation...
            </>
          ) : (
            'Optimiser (Solve)'
          )}
        </button>
      </div>

      <div className="border border-white/5 rounded bg-slate-900/40 relative h-[50px] w-full flex flex-col justify-end overflow-hidden">
        {lossHistory.length > 0 ? (
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
             <path d={chartD} className={`stroke-[1.5] fill-none ${themeClasses.text}`} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
             <path d={`${chartD} L 100,40 L 0,40 Z`} className={`fill-current opacity-10 ${themeClasses.text}`} fill="currentColor" />
          </svg>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[9px] text-slate-600 text-center px-2">Aucun historique</div>
        )}
      </div>

      <div className="font-mono text-[9.5px] text-white/80 bg-slate-900/50 p-2.5 rounded leading-relaxed border border-white/5 h-[80px] overflow-hidden">
        <div className="flex flex-col h-full justify-center">
          <span className={`${themeClasses.text} font-bold mb-1`}>{descriptions[method].eq}</span>
          <span>{descriptions[method].desc}</span>
        </div>
      </div>
    </div>
  );
}
