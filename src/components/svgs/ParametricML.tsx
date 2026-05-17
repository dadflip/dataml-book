import { motion } from 'motion/react';

export const LinearRegressionSVG = ({ className }: { className?: string }) => {
  const points = [
    [50, 220], [80, 200], [120, 190], [150, 160],
    [200, 170], [230, 130], [280, 110], [320, 80], [350, 60]
  ];

  return (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" strokeWidth="2">
        {/* Axes */}
        <path d="M40 260 L360 260 M40 260 L40 40" className="stroke-slate-600" />
        
        {/* Error lines from points to regression line */}
        {points.map((p, i) => {
          // approx line y = -0.6x + 250
          const lineY = -0.6 * p[0] + 260;
          return (
            <motion.line key={`err-${i}`} x1={p[0]} y1={p[1]} x2={p[0]} y2={lineY} className="stroke-pink-500/40" strokeDasharray="2 2" 
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.1 }} />
          );
        })}

        {/* Data Points */}
        {points.map((p, i) => (
          <motion.circle key={i} cx={p[0]} cy={p[1]} r="4" className="fill-blue-400 stroke-none" 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} />
        ))}

        {/* Regression Line */}
        <motion.path d="M40 236 L360 44" className="stroke-amber-400" strokeWidth="3" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }} />
      </g>
    </svg>
  );
};

export const BayesianSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      <path d="M40 260 L360 260" className="stroke-slate-600" />

      {/* Prior Distribution */}
      <motion.path d="M50 260 C 100 260, 100 120, 150 120 C 200 120, 200 260, 250 260" 
        className="stroke-blue-500 fill-blue-500/10" 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      <text x="150" y="100" textAnchor="middle" className="text-xs fill-blue-400 stroke-none">Prior</text>

      {/* Likelihood Distribution */}
      <motion.path d="M150 260 C 200 260, 220 80, 250 80 C 280 80, 300 260, 350 260" 
        className="stroke-pink-500 fill-pink-500/10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
      <text x="250" y="60" textAnchor="middle" className="text-xs fill-pink-400 stroke-none">Likelihood</text>

      {/* Posterior Distribution (Combined) */}
      <motion.path d="M100 260 C 150 260, 180 40, 210 40 C 240 40, 270 260, 320 260" 
        className="stroke-amber-400 fill-amber-400/20" strokeWidth="3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }} />
      <text x="210" y="25" textAnchor="middle" className="text-sm font-bold fill-amber-400 stroke-none">Posterior</text>
    </g>
  </svg>
);

export const DimensionReductionSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* 3D Cube to represent high dim */}
      <motion.g className="stroke-slate-500" animate={{ rotateY: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '100px 150px' }}>
        <path d="M70 100 L130 100 L130 160 L70 160 Z" />
        <path d="M90 80 L150 80 L150 140 L90 140 Z" />
        <path d="M70 100 L90 80 M130 100 L150 80 M130 160 L150 140 M70 160 L90 140" />
      </motion.g>

      {/* Arrow */}
      <motion.path d="M180 150 L250 150" className="stroke-amber-500" strokeWidth="3"
        initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }} />
      <path d="M240 140 L250 150 L240 160" className="stroke-amber-500" strokeWidth="3" />
      <text x="215" y="135" textAnchor="middle" className="text-xs fill-amber-400 stroke-none">PCA / UMAP</text>

      {/* 2D Plane representing low dim */}
      <motion.rect x="280" y="100" width="80" height="80" rx="4" className="stroke-purple-500 fill-purple-500/10" />
      <motion.circle cx="300" cy="120" r="3" className="fill-blue-400 stroke-none" />
      <motion.circle cx="320" cy="150" r="3" className="fill-pink-400 stroke-none" />
      <motion.circle cx="340" cy="130" r="3" className="fill-amber-400 stroke-none" />
      <motion.circle cx="290" cy="160" r="3" className="fill-emerald-400 stroke-none" />
      <motion.circle cx="330" cy="170" r="3" className="fill-blue-400 stroke-none" />
    </g>
  </svg>
);

export const AutoregressionSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      <path d="M40 260 L360 260" className="stroke-slate-600" />
      
      {/* Time Series Data */}
      <motion.path 
        d="M40 200 Q 60 150, 80 180 T 120 160 T 160 140 T 200 170 T 240 100 T 280 120" 
        className="stroke-amber-500" strokeWidth="3"
        initial={{ pathLength: 0 }} 
        animate={{ pathLength: 1 }} 
        transition={{ duration: 2, ease: "linear" }} 
      />
      
      {/* Prediction Interval */}
      <motion.path 
        d="M280 120 L320 80 L360 40" 
        className="stroke-pink-500" strokeWidth="3" strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }} 
        animate={{ pathLength: 1, opacity: 1 }} 
        transition={{ duration: 1, delay: 2 }} 
      />
      <motion.path 
        d="M280 120 L320 60 L360 20" 
        className="stroke-pink-500/30" strokeWidth="2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      />
      <motion.path 
        d="M280 120 L320 100 L360 60" 
        className="stroke-pink-500/30" strokeWidth="2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
      />
      
      {/* AR relation loop */}
      <motion.path d="M220 130 Q250 80 280 120" className="stroke-blue-400" strokeDasharray="4 4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
      <text x="250" y="80" textAnchor="middle" className="text-xs fill-blue-300 font-mono stroke-none">t-1 -&gt; t</text>
    </g>
  </svg>
);
