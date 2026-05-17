import { motion } from 'motion/react';

export const KMeansSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none">
      {/* Voronoi / Boundaries */}
      <path d="M200 20 L160 140 L20 180 M160 140 L280 280" className="stroke-slate-700" strokeDasharray="4 4" strokeWidth="2" />

      {/* Cluster 1 */}
      {[...Array(12)].map((_, i) => (
        <circle key={`1-${i}`} cx={80 + (i*13)%60} cy={60 + (i*17)%60} r="4" className="fill-blue-500/50" />
      ))}
      <motion.circle cx="110" cy="90" r="8" className="stroke-white fill-blue-500" strokeWidth="2" 
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <text x="110" y="115" textAnchor="middle" className="text-[10px] fill-blue-300 font-bold stroke-none">Centroïde 1</text>

      {/* Cluster 2 */}
      {[...Array(12)].map((_, i) => (
        <circle key={`2-${i}`} cx={260 + (i*13)%80} cy={80 + (i*17)%60} r="4" className="fill-pink-500/50" />
      ))}
      <motion.circle cx="300" cy="110" r="8" className="stroke-white fill-pink-500" strokeWidth="2" 
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      <text x="300" y="135" textAnchor="middle" className="text-[10px] fill-pink-300 font-bold stroke-none">Centroïde 2</text>

      {/* Cluster 3 */}
      {[...Array(12)].map((_, i) => (
        <circle key={`3-${i}`} cx={150 + (i*13)%80} cy={200 + (i*17)%60} r="4" className="fill-amber-500/50" />
      ))}
      <motion.circle cx="190" cy="230" r="8" className="stroke-white fill-amber-500" strokeWidth="2" 
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      <text x="190" y="255" textAnchor="middle" className="text-[10px] fill-amber-300 font-bold stroke-none">Centroïde 3</text>
    </g>
  </svg>
);

export const DensityClusteringSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none">
      {/* Dense crescent shape */}
      <motion.path d="M100 80 Q 200 20 300 80 Q 250 140 100 80" className="stroke-purple-500 fill-purple-500/20" strokeWidth="2" 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
      
      {/* Dense circle shape */}
      <motion.circle cx="200" cy="200" r="40" className="stroke-emerald-500 fill-emerald-500/20" strokeWidth="2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} />
      
      {/* Points */}
      {[...Array(20)].map((_, i) => <circle key={`c-${i}`} cx={120 + (i*13)%160} cy={70 + (i*7)%40} r="3" className="fill-purple-400" />)}
      {[...Array(20)].map((_, i) => <circle key={`e-${i}`} cx={170 + (i*11)%60} cy={170 + (i*17)%60} r="3" className="fill-emerald-400" />)}
      
      {/* Outliers */}
      <motion.circle cx="60" cy="220" r="3" className="fill-slate-500" 
        animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      <motion.circle cx="340" cy="250" r="3" className="fill-slate-500" 
        animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
      <motion.circle cx="350" cy="100" r="3" className="fill-slate-500" 
        animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
      
      <text x="60" y="240" textAnchor="middle" className="text-[10px] fill-slate-400 stroke-none">Bruit (Noise)</text>
    </g>
  </svg>
);

export const MetricsSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* Clusters */}
      <circle cx="120" cy="150" r="60" className="stroke-blue-500 fill-blue-500/10" strokeDasharray="4 4" />
      <circle cx="280" cy="150" r="60" className="stroke-pink-500 fill-pink-500/10" strokeDasharray="4 4" />
      
      {/* Points */}
      <circle cx="120" cy="150" r="4" className="fill-blue-400 stroke-none" />
      <circle cx="140" cy="130" r="4" className="fill-blue-400 stroke-none" />
      <circle cx="100" cy="170" r="4" className="fill-blue-400 stroke-none" />

      <circle cx="280" cy="150" r="4" className="fill-pink-400 stroke-none" />

      {/* Intra-cluster distance */}
      <motion.line x1="120" y1="150" x2="140" y2="130" className="stroke-white" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }} />
      <text x="100" y="120" className="text-[10px] fill-blue-300 stroke-none">a(i) : distance intra</text>

      {/* Inter-cluster distance */}
      <motion.line x1="140" y1="130" x2="280" y2="150" className="stroke-amber-400" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
      <text x="210" y="130" textAnchor="middle" className="text-[10px] fill-amber-300 stroke-none">b(i) : distance inter</text>

      {/* Formula Silhouette */}
      <text x="200" y="240" textAnchor="middle" className="text-sm font-bold fill-white stroke-none italic">
        Silhouette = (b - a) / max(a, b)
      </text>
    </g>
  </svg>
);
