import { motion } from 'motion/react';

export const GANSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* Generator */}
      <motion.rect x="50" y="80" width="80" height="60" rx="8" className="stroke-pink-500 fill-pink-500/20" 
        animate={{ y: [80, 75, 80] }} transition={{ duration: 2, repeat: Infinity }} />
      <text x="90" y="115" textAnchor="middle" className="text-xs fill-pink-300 stroke-none">Generator</text>

      {/* Latent Noise */}
      <path d="M10 110 L40 110" className="stroke-slate-500 marker-end-arrow" />
      <text x="25" y="100" textAnchor="middle" className="text-[10px] fill-slate-400 stroke-none">Noise</text>

      {/* Fake Data */}
      <motion.path d="M140 110 L190 110" className="stroke-pink-400" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 10 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} />
      <rect x="200" y="90" width="40" height="40" rx="4" className="stroke-pink-400 fill-none" />
      <text x="220" y="115" textAnchor="middle" className="text-[10px] fill-pink-300 stroke-none">Fake</text>

      {/* Real Data */}
      <rect x="200" y="180" width="40" height="40" rx="4" className="stroke-emerald-400 fill-none" />
      <text x="220" y="205" textAnchor="middle" className="text-[10px] fill-emerald-300 stroke-none">Real</text>

      {/* Discriminator */}
      <motion.rect x="280" y="130" width="100" height="60" rx="8" className="stroke-blue-500 fill-blue-500/20" 
        animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      <text x="330" y="165" textAnchor="middle" className="text-xs fill-blue-300 stroke-none">Discriminator</text>

      {/* Inputs to Discriminator */}
      <path d="M250 110 Q265 110 270 140 L275 150" className="stroke-slate-500" />
      <path d="M250 200 Q265 200 270 180 L275 170" className="stroke-slate-500" />

      {/* Output / Loss */}
      <motion.path d="M390 160 Q420 160 400 50 Q100 50 90 70" className="stroke-amber-500" strokeDasharray="6 6" 
        initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
      <text x="200" y="45" textAnchor="middle" className="text-xs fill-amber-400 stroke-none font-bold">Adversarial Loss</text>
    </g>
  </svg>
);

export const GeneticSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* Population */}
      {[40, 80, 120].map((x, i) => (
        <circle key={`pop1-${i}`} cx={x} cy="60" r="12" className="stroke-blue-400 fill-blue-400/20" />
      ))}
      <text x="80" y="30" textAnchor="middle" className="text-xs fill-blue-300 stroke-none">Population (gen t)</text>

      {/* Selection */}
      <motion.path d="M80 80 L80 120" className="stroke-amber-400" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }} />
      <text x="110" y="105" textAnchor="start" className="text-[10px] fill-amber-300 stroke-none">Sélection (Fitness)</text>

      {/* Crossover */}
      <circle cx="60" cy="150" r="12" className="stroke-emerald-400 fill-emerald-400/20" />
      <circle cx="100" cy="150" r="12" className="stroke-emerald-400 fill-emerald-400/20" />
      <motion.path d="M75 150 L85 150" className="stroke-slate-500" />
      <text x="130" y="155" textAnchor="start" className="text-[10px] fill-emerald-300 stroke-none">Croisement</text>

      {/* Mutation */}
      <motion.circle cx="80" cy="200" r="12" className="stroke-pink-500 fill-pink-500/20" 
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }} />
      <path d="M80 170 L80 180" className="stroke-slate-500" />
      <text x="110" y="205" textAnchor="start" className="text-[10px] fill-pink-300 stroke-none">Mutation</text>

      {/* Next gen */}
      <motion.path d="M80 220 L80 240" className="stroke-slate-500" />
      {[40, 80, 120].map((x, i) => (
        <circle key={`pop2-${i}`} cx={x} cy="260" r="12" className="stroke-purple-400 fill-purple-400/20" />
      ))}
      <text x="80" y="290" textAnchor="middle" className="text-xs fill-purple-300 stroke-none">Population (gen t+1)</text>

      {/* DNA Helix representation */}
      <motion.g className="stroke-red-500 text-red-500" strokeWidth="1" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
         <path d="M260 80 Q280 100 260 120 Q240 140 260 160 Q280 180 260 200 Q240 220 260 240" className="stroke-red-400/50" />
         <path d="M280 80 Q260 100 280 120 Q300 140 280 160 Q260 180 280 200 Q300 220 280 240" className="stroke-pink-400/50" />
         {[90, 110, 130, 150, 170, 190, 210, 230].map((y, i) => (
            <line key={y} x1="265" y1={y} x2="275" y2={y} className="stroke-red-300/30" />
         ))}
      </motion.g>
    </g>
  </svg>
);
