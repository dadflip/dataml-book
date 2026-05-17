import { motion } from 'motion/react';

export const DecisionTreeSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* Root */}
      <motion.rect x="160" y="40" width="80" height="40" rx="6" className="stroke-purple-500 fill-purple-500/20" 
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} />
      <text x="200" y="65" textAnchor="middle" className="text-xs fill-purple-300 stroke-none">x &gt; 5 ?</text>

      {/* Level 1 */}
      <motion.path d="M200 80 L120 140" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
      <motion.path d="M200 80 L280 140" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
      
      <motion.rect x="80" y="140" width="80" height="40" rx="6" className="stroke-blue-500 fill-blue-500/20" 
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} />
      <text x="120" y="165" textAnchor="middle" className="text-xs fill-blue-300 stroke-none">Class A</text>

      <motion.rect x="240" y="140" width="80" height="40" rx="6" className="stroke-amber-500 fill-amber-500/20" 
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} />
      <text x="280" y="165" textAnchor="middle" className="text-xs fill-amber-300 stroke-none">y &lt; 2 ?</text>

      {/* Level 2 */}
      <motion.path d="M280 180 L230 240" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5 }} />
      <motion.path d="M280 180 L330 240" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5 }} />

      <motion.rect x="190" y="240" width="80" height="40" rx="6" className="stroke-pink-500 fill-pink-500/20" 
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2 }} />
      <text x="230" y="265" textAnchor="middle" className="text-xs fill-pink-300 stroke-none">Class B</text>

      <motion.rect x="290" y="240" width="80" height="40" rx="6" className="stroke-emerald-500 fill-emerald-500/20" 
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2 }} />
      <text x="330" y="265" textAnchor="middle" className="text-xs fill-emerald-300 stroke-none">Class C</text>
    </g>
  </svg>
);

export const EnsembleSVG = ({ className }: { className?: string }) => {
  const Tree = ({x, y, color, delay}: {x: number, y: number, color: string, delay: number}) => (
    <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <rect x={x-20} y={y} width="40" height="20" rx="4" className={`stroke-${color}-500 fill-${color}-500/20`} />
      <path d={`M${x} ${y+20} L${x-15} ${y+40}`} className={`stroke-slate-500`} />
      <path d={`M${x} ${y+20} L${x+15} ${y+40}`} className={`stroke-slate-500`} />
      <circle cx={x-15} cy={y+45} r="5" className={`stroke-${color}-400 fill-${color}-400/50`} />
      <circle cx={x+15} cy={y+45} r="5" className={`stroke-pink-400 fill-pink-400/50`} />
    </motion.g>
  );

  return (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" strokeWidth="2">
        {/* Trees */}
        <Tree x={80} y={100} color="blue" delay={0} />
        <Tree x={200} y={100} color="purple" delay={0.2} />
        <Tree x={320} y={100} color="emerald" delay={0.4} />

        {/* Aggregation */}
        <motion.path d="M80 180 L200 240" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} />
        <motion.path d="M200 180 L200 240" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} />
        <motion.path d="M320 180 L200 240" className="stroke-slate-500" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1 }} />

        {/* Final output */}
        <motion.rect x="150" y="240" width="100" height="40" rx="6" className="stroke-amber-400 fill-amber-400/20" 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }} />
        <text x="200" y="265" textAnchor="middle" className="text-xs font-bold fill-amber-300 stroke-none">Prediction</text>
      </g>
    </svg>
  );
};

export const KNNSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none">
      {/* Background clusters */}
      {[...Array(15)].map((_, i) => (
        <circle key={`blue-${i}`} cx={60 + (i*17)%100} cy={60 + (i*23)%100} r="4" className="fill-blue-500/60" />
      ))}
      {[...Array(15)].map((_, i) => (
        <circle key={`pink-${i}`} cx={240 + (i*19)%120} cy={160 + (i*29)%120} r="4" className="fill-pink-500/60" />
      ))}

      {/* New Point */}
      <motion.circle cx="180" cy="150" r="8" className="stroke-white fill-slate-800" strokeWidth="2" 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} />
      <text x="180" y="130" textAnchor="middle" className="text-xs fill-white font-bold stroke-none">New Data</text>

      {/* K-Radius */}
      <motion.circle cx="180" cy="150" r="50" className="stroke-purple-400 fill-purple-400/10" strokeWidth="2" strokeDasharray="4 4"
        initial={{ r: 0 }} animate={{ r: 50 }} transition={{ delay: 1, duration: 1 }} />
      
      {/* Nearest Neighbors links */}
      <motion.g strokeWidth="1" className="stroke-purple-400">
        <motion.line x1="180" y1="150" x2="150" y2="130" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2 }} />
        <motion.line x1="180" y1="150" x2="160" y2="170" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.2 }} />
        <motion.line x1="180" y1="150" x2="210" y2="140" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.4 }} />
      </motion.g>
    </g>
  </svg>
);

export const SVMSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none">
      {/* Class 1 */}
      {[...Array(10)].map((_, i) => (
        <circle key={`class1-${i}`} cx={60 + (i*17)%100} cy={80 + (i*23)%100} r="5" className="fill-blue-500" />
      ))}
      {/* Class 2 */}
      {[...Array(10)].map((_, i) => (
        <circle key={`class2-${i}`} cx={240 + (i*19)%100} cy={160 + (i*29)%100} r="5" className="fill-amber-500" />
      ))}

      {/* Support Vectors */}
      <circle cx="160" cy="140" r="8" className="stroke-white fill-none" strokeWidth="2" />
      <circle cx="140" cy="170" r="8" className="stroke-white fill-none" strokeWidth="2" />
      <circle cx="230" cy="160" r="8" className="stroke-white fill-none" strokeWidth="2" />

      {/* Hyperplane */}
      <motion.line x1="100" y1="280" x2="300" y2="20" className="stroke-white" strokeWidth="3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }} />
      
      {/* Margins */}
      <motion.line x1="70" y1="280" x2="270" y2="20" className="stroke-blue-400" strokeWidth="2" strokeDasharray="6 6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
      <motion.line x1="130" y1="280" x2="330" y2="20" className="stroke-amber-400" strokeWidth="2" strokeDasharray="6 6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} />
      
    </g>
  </svg>
);
