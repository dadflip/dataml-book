import React, { useState, useMemo, ReactNode, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { OptimizationModule, type OptMethod } from './LinearModelsDetail';

function PCAView() {
  const [dim, setDim] = useState<2|3|4>(2);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm tracking-widest uppercase text-pink-500 font-semibold mb-2">Analyse en Composantes Principales (PCA)</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
          La PCA cherche une transformation <strong className="text-pink-400">linéaire</strong> qui projette les données sur un sous-espace 
          maximisant la <strong className="text-white">variance</strong>. Choisissez la dimensionnalité pour expérimenter intuitivement cette projection.
        </p>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-4">
        {[2, 3, 4].map((d) => (
          <button
            key={d}
            onClick={() => setDim(d as 2|3|4)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              dim === d 
                ? 'bg-pink-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {d}D → {d - 1}D
          </button>
        ))}
      </div>

      <div className="mt-4">
        {dim === 2 && <PCA2D />}
        {dim === 3 && <PCA3D />}
        {dim === 4 && <PCA4D />}
      </div>
    </div>
  );
}

function PCA2D() {
  const [angle, setAngle] = useState(0); // 0 to 180 degrees
  const angleRad = (angle * Math.PI) / 180;
  
  const [optMethod, setOptMethod] = useState<OptMethod>('svd');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const optRef = useRef<NodeJS.Timeout | null>(null);

  const points = useMemo(() => {
    const pts = [];
    let s = 12345;
    const random = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < 50; i++) {
      let u = 0, v = 0;
      while (u === 0) u = random(); while (v === 0) v = random();
      const num1 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      let u2 = 0, v2 = 0;
      while (u2 === 0) u2 = random(); while (v2 === 0) v2 = random();
      const num2 = Math.sqrt(-2.0 * Math.log(u2)) * Math.cos(2.0 * Math.PI * v2);
      const x = num1 * 40; const y = num2 * 10; 
      const rot = 30 * Math.PI / 180;
      pts.push({ x: x * Math.cos(rot) - y * Math.sin(rot), y: x * Math.sin(rot) + y * Math.cos(rot) });
    }
    return pts;
  }, []);

  const dx = Math.cos(angleRad), dy = Math.sin(angleRad);
  let variance = 0;
  const projectedPoints = points.map(p => {
    const t = p.x * dx + p.y * dy;
    variance += t * t;
    return { px: t * dx, py: t * dy, t };
  });
  
  variance /= points.length;
  const varPercent = Math.min((variance / 1600) * 100, 100);

  const runOptimization = () => {
    setIsOptimizing(true);
    let currentAngle = angle;
    let history = [100 - varPercent];
    setLossHistory(history);
    if (optRef.current) clearInterval(optRef.current);
    
    // Optimal angle is roughly 30 degrees (since we generated with rot = 30)
    const targetAngle = 30;
    
    optRef.current = setInterval(() => {
      let diff = targetAngle - currentAngle;
      if (diff > 90) diff -= 180;
      if (diff < -90) diff += 180;
      
      currentAngle += diff * 0.1;
      
      // Calculate variance for currentAngle
      const cRad = (currentAngle * Math.PI) / 180;
      const cdx = Math.cos(cRad), cdy = Math.sin(cRad);
      let cvar = 0;
      points.forEach(p => { const t = p.x * cdx + p.y * cdy; cvar += t*t; });
      cvar /= points.length;
      
      const cVarPercent = Math.min((cvar / 1600) * 100, 100);
      history = [...history, 100 - cVarPercent];
      if (history.length > 50) history.shift();
      setLossHistory(history);
      setAngle((currentAngle + 180) % 180);
      
      if (Math.abs(diff) < 0.5) {
        setAngle(targetAngle);
        setIsOptimizing(false);
        if (optRef.current) clearInterval(optRef.current);
      }
    }, 50);
  };

  useEffect(() => {
    return () => { if (optRef.current) clearInterval(optRef.current); };
  }, []);

  return (
    <div className="flex flex-col gap-12 mt-6">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden aspect-square relative flex items-center justify-center">
          <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
            <line x1="-100" y1="0" x2="100" y2="0" className="stroke-white/10" strokeWidth="0.5" />
            <line x1="0" y1="-100" x2="0" y2="100" className="stroke-white/10" strokeWidth="0.5" />
            <line x1={dx * 150} y1={dy * 150} x2={-dx * 150} y2={-dy * 150} className="stroke-pink-500" strokeWidth="1.5" />
            {points.map((p, i) => (
              <g key={i}>
                <line x1={p.x} y1={p.y} x2={projectedPoints[i].px} y2={projectedPoints[i].py} className="stroke-white/20" strokeWidth="0.2" strokeDasharray="1,1" />
                <circle cx={p.x} cy={p.y} r="1.5" className="fill-slate-500" />
                <circle cx={projectedPoints[i].px} cy={projectedPoints[i].py} r="2" className="fill-pink-400" />
              </g>
            ))}
          </svg>
        </div>
        
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 relative flex flex-col justify-center">
          <h3 className="text-sm tracking-widest uppercase text-pink-500 font-semibold mb-6">Variance Maximisée (Cost)</h3>
          <div className="w-full flex justify-between items-end h-40">
             {/* A pseudo bar chart showing Variance vs Lost Information */}
             <div className="flex-1 px-4 flex flex-col justify-end items-center h-full gap-2">
                 <div className="w-full max-w-[60px] bg-slate-800 rounded-t-xl overflow-hidden h-full flex flex-col justify-end relative">
                     <motion.div animate={{ height: `${varPercent}%` }} className="w-full bg-pink-500 opacity-80" transition={{ type: 'spring', bounce: 0 }} />
                 </div>
                 <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase text-center">Variance (Signal)</span>
             </div>
             <div className="flex-1 px-4 flex flex-col justify-end items-center h-full gap-2">
                 <div className="w-full max-w-[60px] bg-slate-800 rounded-t-xl overflow-hidden h-full flex flex-col justify-end relative">
                     <motion.div animate={{ height: `${100 - varPercent}%` }} className="w-full bg-red-500 opacity-60" transition={{ type: 'spring', bounce: 0 }} />
                 </div>
                 <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase text-center">Erreur (Bruit)</span>
             </div>
          </div>
          <div className="mt-8 text-center text-slate-300 font-mono text-sm border-t border-white/10 pt-4 flex justify-between px-8">
             <div><span className="text-pink-400 font-bold">{varPercent.toFixed(1)}%</span> Préservée</div>
             <div><span className="text-red-400 font-bold">{(100 - varPercent).toFixed(1)}%</span> Perdue</div>
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
               <p>Points 2D</p>
               <div className="text-slate-300">Nuage de points de dimensions D=2 (x, y) fortement corrélés.</div>
             </div>
         </div>

         {/* 2. MODEL */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">2</span>
               Model
             </h4>
             <div>
               <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                 <span>Angle (1D subspace)</span>
                 <span className="font-mono text-pink-400">{angle.toFixed(0)}°</span>
               </div>
               <input type="range" min="0" max="180" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full h-1 accent-pink-500" />
               <p className="text-[10px] text-slate-500 mt-2 leading-tight">Projection z = w₁x + w₂y où ||w||=1</p>
             </div>
         </div>

         {/* 3. COST */}
         <div className="space-y-4 border-b border-white/5 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
             <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
               <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-300">3</span>
               Cost
             </h4>
             <div className="font-mono text-[11px] text-slate-400 space-y-2 leading-relaxed">
               <p>Erreur de Projection (-) ou Variance (+)</p>
               <div className="text-pink-300/80 bg-slate-900/50 p-2 rounded leading-tight">
                 Max: Var(wᵀX)<br/>(ou Min: E[||X - XXᵀw||²])
               </div>
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
               themeColor="pink"
               availableMethods={['svd', 'gd']}
             />
         </div>
      </div>
    </div>
  );
}

function PCA3D() {
  const [rotX, setRotX] = useState(30);
  const [rotY, setRotY] = useState(45);

  const points = useMemo(() => {
    const pts = [];
    let s = 42;
    const random = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < 150; i++) {
        let u=0, v=0; while(u===0) u=random(); while(v===0) v=random();
        const n1 = Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
        u=0; v=0; while(u===0) u=random(); while(v===0) v=random();
        const n2 = Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
        u=0; v=0; while(u===0) u=random(); while(v===0) v=random();
        const n3 = Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
        
        // Ellipsoid: mostly X, some Y, little Z
        const x = n1 * 40;
        const y = n2 * 20;
        const z = n3 * 5;

        // Apply a fixed hidden rotation to make it diagonal in 3D
        const rotA = 45 * Math.PI / 180;
        const rotB = 30 * Math.PI / 180;
        
        // Rot Y
        const x1 = x * Math.cos(rotA) - z * Math.sin(rotA);
        const z1 = x * Math.sin(rotA) + z * Math.cos(rotA);
        // Rot X
        const y2 = y * Math.cos(rotB) - z1 * Math.sin(rotB);
        const z2 = y * Math.sin(rotB) + z1 * Math.cos(rotB);

        pts.push({ x: x1, y: y2, z: z2 });
    }
    return pts;
  }, []);

  const rx = rotX * Math.PI / 180;
  const ry = rotY * Math.PI / 180;

  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const cosX = Math.cos(rx), sinX = Math.sin(rx);

  let varSum = 0;
  const projectedPoints = points.map(p => {
    const x1 = p.x * cosY - p.z * sinY;
    const z1 = p.x * sinY + p.z * cosY;
    const y2 = p.y * cosX - z1 * sinX;
    const z2 = p.y * sinX + z1 * cosX;
    
    // The screen is our 2D projection (X and Y)
    varSum += (x1 * x1 + y2 * y2);
    // Render back-to-front (primitive depth sorting)
    return { x: x1, y: y2, z: z2 };
  });

  const avgVar = varSum / points.length;
  const totalVar = 40*40 + 20*20 + 5*5; // approximate original variance sum
  const maxSubVar = 40*40 + 20*20; // optimal 2D plane removes the 5*5 dimension
  // map carefully to 0-100%
  const varPercent = Math.min((avgVar / maxSubVar) * 100, 100);

  projectedPoints.sort((a,b) => a.z - b.z);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="space-y-4 bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
          <label className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex justify-between">
            Rotation plan de projection Y (Lacet)
          </label>
          <input type="range" min="0" max="180" value={rotY} onChange={e => setRotY(Number(e.target.value))} className="w-full h-1 accent-pink-500" />
          
          <label className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex justify-between pt-2">
            Rotation plan de projection X (Tangage)
          </label>
          <input type="range" min="-90" max="90" value={rotX} onChange={e => setRotX(Number(e.target.value))} className="w-full h-1 accent-pink-500" />

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Variance préservée (2D)</span> <span className="font-mono text-white">{varPercent.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div animate={{ width: `${varPercent}%` }} className="h-full bg-pink-500" transition={{ type: 'spring', bounce: 0 }} />
            </div>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-500 bg-slate-900/50 p-4 rounded-xl leading-relaxed">
           Le nuage 3D est projeté sur votre écran (2D). Pivotez-le pour voir "le plat" du nuage de face. 
           C'est expérimentalement ce que fait la PCA: trouver l'angle de vue qui cache le moins d'informations.
        </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden aspect-square relative flex items-center justify-center">
        <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
          {projectedPoints.map((p, i) => {
            // Depth cues
            const normalizedZ = (p.z + 100) / 200; // 0 to 1 roughly
            const opacity = Math.max(0.1, Math.min(1, normalizedZ * 1.5));
            const r = 1.5 + normalizedZ * 1.5;
            
            return <circle key={i} cx={p.x} cy={p.y} r={r} fill={`rgba(244,114,182, ${opacity})`} />;
          })}
        </svg>
      </div>
    </div>
  );
}

function PCA4D() {
  const [rotXW, setRotXW] = useState(0);
  const [rotYW, setRotYW] = useState(45);
  // Optional: Auto rotation to show 3D nature
  const [autoRotate, setAutoRotate] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (autoRotate) {
      interval = setInterval(() => setTimer(t => t + 1), 30);
    }
    return () => clearInterval(interval);
  }, [autoRotate]);

  const points = useMemo(() => {
    const pts = [];
    let s = 99;
    const random = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < 200; i++) {
        const randNorm = () => {
           let u=0, v=0; while(u===0) u=random(); while(v===0) v=random();
           return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
        };
        // 4D Ellipsoid
        const x = randNorm() * 50;  // High variance
        const y = randNorm() * 30;  // Medium
        const z = randNorm() * 15;  // Low
        const w = randNorm() * 5;   // Very low
        
        // Randomly mix them in 4D just slightly so it's not pre-aligned
        const mix = 45 * Math.PI / 180; // 45 deg mix of X and W
        const x1 = x * Math.cos(mix) - w * Math.sin(mix);
        const w1 = x * Math.sin(mix) + w * Math.cos(mix);

        pts.push({ x: x1, y, z, w: w1 });
    }
    return pts;
  }, []);

  const rxw = rotXW * Math.PI / 180;
  const ryw = rotYW * Math.PI / 180;

  const cosXW = Math.cos(rxw), sinXW = Math.sin(rxw);
  const cosYW = Math.cos(ryw), sinYW = Math.sin(ryw);

  let varSum = 0;

  // Render 3D rotation based on timer (isometric-ish spin)
  const spinY = timer * 0.02; 
  const cosSpin = Math.cos(spinY), sinSpin = Math.sin(spinY);

  const projectedPoints = points.map(p => {
    // 4D -> 3D projection (user controlled)
    // Rotate in X-W plane
    const x1 = p.x * cosXW - p.w * sinXW;
    const w1 = p.x * sinXW + p.w * cosXW;

    // Rotate in Y-W plane
    const y1 = p.y * cosYW - w1 * sinYW;
    const w2 = p.y * sinYW + w1 * cosYW;

    const z1 = p.z; // leaving Z alone for simplicity

    varSum += (x1*x1 + y1*y1 + z1*z1);

    // Now we have a 3D point (x1, y1, z1). We project it to 2D screen simply with auto-spin
    const x2 = x1 * cosSpin - z1 * sinSpin;
    const z2 = x1 * sinSpin + z1 * cosSpin;
    const y2 = y1;

    return { x: x2, y: y2, z: z2 };
  });

  const avgVar = varSum / points.length;
  const max3DVar = 50*50 + 30*30 + 15*15; 
  const varPercent = Math.min((avgVar / max3DVar) * 100, 100);

  projectedPoints.sort((a,b) => a.z - b.z);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div className="space-y-4 bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
          
          <label className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex justify-between">
            Mélange X-W (Projeter W sur X)
          </label>
          <input type="range" min="-90" max="90" value={rotXW} onChange={e => setRotXW(Number(e.target.value))} className="w-full h-1 accent-pink-500" />
          
          <label className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex justify-between pt-2">
            Mélange Y-W (Projeter W sur Y)
          </label>
          <input type="range" min="-90" max="90" value={rotYW} onChange={e => setRotYW(Number(e.target.value))} className="w-full h-1 accent-pink-500" />

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" checked={autoRotate} onChange={e => setAutoRotate(e.target.checked)} className="accent-pink-500" />
            <span className="text-xs text-slate-400">Rotation 3D automatique (pour visualisation)</span>
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Variance préservée (3D)</span> <span className="font-mono text-white">{varPercent.toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div animate={{ width: `${varPercent}%` }} className="h-full bg-pink-500" transition={{ type: 'spring', bounce: 0 }} />
            </div>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-500 bg-slate-900/50 p-4 rounded-xl leading-relaxed">
           L'hyper-nuage 4D existe au delà de notre perception mathématique. En modifiant l'angle de projection 4D, 
           nous sélectionnons quelle "tranche" (les principales composantes) atterrit dans notre espace 3D visible. 
           Si la jauge est maximale, la 4ème dimension perdue n'était que du "bruit" (variance faible).
        </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden aspect-square relative flex items-center justify-center">
        <svg viewBox="-100 -100 200 200" className="w-full h-full overflow-visible">
          {projectedPoints.map((p, i) => {
            const normalizedZ = (p.z + 100) / 200; 
            const opacity = Math.max(0.1, Math.min(1, normalizedZ * 1.5));
            const r = 1.0 + normalizedZ * 1.5;
            // 4D projection gets a slightly more mystical color mapping depending on depth
            return <circle key={i} cx={p.x} cy={p.y} r={r} fill={`hsla(330, 80%, ${50 + normalizedZ * 30}%, ${opacity})`} />;
          })}
        </svg>
      </div>
    </div>
  );
}


function NonLinearView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 (3D Swiss Roll) to 1 (2D Unrolled)
  const animRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      if (animRef.current) clearInterval(animRef.current);
      animRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 1) {
            setIsPlaying(false);
            if (animRef.current) clearInterval(animRef.current);
            return 1;
          }
          return p + 0.01;
        });
      }, 30);
    } else {
      if (animRef.current) clearInterval(animRef.current);
    }
    return () => {
      if (animRef.current) clearInterval(animRef.current);
    };
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePlay = () => {
    if (progress >= 1) {
        setProgress(0);
    }
    setIsPlaying(true);
  }

  // Generate Swiss Roll Points
  // A spiral in X-Z plane, extended along Y axis
  const rollPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 400; i++) {
        const t = 1.5 * Math.PI * (1 + 2 * Math.random()); // angle / radius
        const y = 20 * Math.random() - 10; // width
        const x = t * Math.cos(t);
        const z = t * Math.sin(t);
        
        // Color mapping based on distance along the spiral (t)
        const colorFactor = (t - 1.5*Math.PI) / (3*Math.PI); 
        // We'll calculate 2D unrolled position as well
        // unrolled X is roughly based on arc length. Arc length of spiral: proportional to t^2 roughly.
        const unrolledX = t * 3 - 35; 
        const unrolledY = y * 1.5;

        pts.push({ t, x, y, z, unrolledX, unrolledY, c: colorFactor });
    }
    // Sort by z for simple painter's algorithm rendering in 3D
    pts.sort((a,b) => b.z - a.z);
    return pts;
  }, []);

  // Isometric projection function
  const isoProject = (x: number, y: number, z: number) => {
     // simple faux 3D 
     const px = (x - z) * Math.cos(Math.PI / 6);
     const py = y + (x + z) * Math.sin(Math.PI / 6);
     return { px, py };
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-sm tracking-widest uppercase text-cyan-500 font-semibold mb-2">Méthodes Non-Linéaires (t-SNE / UMAP)</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            La PCA ne saisit que les relations linéaires. Si les données présentent une structure topologique complexe (ex: enroulées),
            elles s'écrasent. Les méthodes comme <strong>t-SNE</strong> et <strong>UMAP</strong> 
            se concentrent sur la <strong className="text-cyan-400">préservation des voisinages locaux</strong> pour "déplier" proprement les données.
          </p>
        </div>

        <div className="space-y-4 bg-cyan-900/10 border border-cyan-500/20 p-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold block">Swiss Roll (Simulé)</span>
            <div className="flex gap-2">
               <button onClick={handleReset} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded font-semibold uppercase tracking-wider transition-colors">
                  Reset
               </button>
               <button onClick={handlePlay} disabled={isPlaying && progress < 1} className="px-3 py-1 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-[10px] text-slate-900 rounded font-semibold uppercase tracking-wider transition-colors">
                  {isPlaying ? 'Dépliage en cours...' : (progress >= 1 ? 'Rejouer' : 'Déplier (UMAP)')}
               </button>
            </div>
          </div>
          
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-cyan-500 transition-all duration-75" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-500 bg-slate-900/50 p-4 rounded-xl leading-relaxed flex flex-col gap-2">
          <div className="flex gap-4">
             <div className="flex-1">
                <strong className="text-slate-300">PCA</strong><br/>
                Global.<br/>Préserve distances éloignées.<br/>Projette linéairement.
             </div>
             <div className="flex-1">
                <strong className="text-cyan-400">t-SNE / UMAP</strong><br/>
                Local.<br/>Préserve plus proches voisins.<br/>"Déplie" la géométrie.
             </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#0a0a0c] border border-white/[0.05] rounded-3xl overflow-hidden aspect-square relative flex items-center justify-center">
         {/* Background glow indicating dimensionality state */}
         <div className={`absolute -inset-20 blur-[100px] opacity-10 transition-colors duration-1000 ${progress > 0.5 ? 'bg-cyan-500' : 'bg-slate-500'}`} />
         
         <svg viewBox="-50 -50 100 100" className="w-full h-full overflow-visible relative z-10">
            {/* Draw roll points */}
            {rollPoints.map((p, i) => {
               // 3D pos
               const { px: x3d, py: y3d } = isoProject(p.x, p.y, p.z);
               // 2D unrolled pos
               const x2d = p.unrolledX;
               const y2d = p.unrolledY;

               // Interpolate based on progress
               // With a slight easing and delay based on position to make it look cool "unrolling"
               let tEase = progress;
               // Stagger effect based on p.t (position in spiral from center outwards)
               // Center unfolds first or last? Let's make outer unfold first. 
               const pNorm = (p.t - 1.5*Math.PI) / (3*Math.PI); // 0 to 1
               let localProgress = progress * 2 - (1 - pNorm); 
               localProgress = Math.max(0, Math.min(1, localProgress));
               
               // smoothstep
               localProgress = localProgress * localProgress * (3 - 2 * localProgress);

               const currentX = x3d * (1 - localProgress) + x2d * localProgress;
               // offset 2D y so it fits nicely
               const currentY = y3d * (1 - localProgress) + (y2d + 10) * localProgress;
               
               // Color from red to purple to blue
               let h = 240 + p.c * 120; // 240(blue) to 360(red)
               if(h>360) h-=360;

               return (
                  <circle 
                     key={i} 
                     cx={currentX} 
                     cy={currentY} 
                     r={progress > 0.8 ? 1.5 : 2} 
                     fill={`hsl(${h}, 70%, 60%)`} 
                     opacity={0.8}
                  />
               )
            })}
         </svg>

         <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur border border-white/5 rounded-lg px-3 py-1 tracking-widest text-[10px] text-slate-400 uppercase font-semibold">
           Espace : <span className={progress === 1 ? 'text-cyan-400' : 'text-slate-200'}>{progress === 1 ? '2D Déplié' : (progress === 0 ? '3D Enroulé' : 'Transition...')}</span>
         </div>
      </div>
    </div>
  );
}

type TabId = 'pca' | 'nonlinear';

interface Tab {
  id: TabId;
  label: string;
  component: ReactNode;
  icon?: string;
}

export default function DimensionReductionDetail() {
  const [activeTab, setActiveTab] = useState<TabId>('pca');

  const tabs: Tab[] = [
    { id: 'pca', label: "PCA (Composantes Principales)", component: <PCAView /> },
    { id: 'nonlinear', label: "t-SNE / UMAP (Maniifolds)", component: <NonLinearView /> },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">Réduction de Dimension</h2>
        <p className="text-slate-400 leading-relaxed max-w-3xl">
          Les techniques de réduction de dimension permettent de simplifier des données complexes en projetant 
          un espace à haute dimension (nombreuses de variables) vers un espace de plus basse dimension (généralement 2D ou 3D), 
          tout en préservant le maximum d'informations pertinentes ou la structure topologique.
        </p>
      </header>

      <div className="flex gap-2 p-1 bg-white/[0.02] border border-white/[0.05] rounded-xl flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-pink-500/10 text-pink-400 shadow-[0_0_15px_-3px_rgba(244,114,182,0.2)]' 
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
