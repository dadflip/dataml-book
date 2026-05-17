import { motion } from 'motion/react';

export const TransformerSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Inputs */}
      <motion.path d="M100 280 L100 250" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} className="text-slate-500" />
      <motion.path d="M200 280 L200 250" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} className="text-slate-500" />
      <motion.path d="M300 280 L300 250" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }} className="text-slate-500" />
      
      {/* Multi-head attention Block */}
      <motion.rect x="50" y="180" width="300" height="70" rx="8" className="stroke-blue-500 fill-blue-500/10" 
        initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} />
      <text x="200" y="220" textAnchor="middle" className="text-sm fill-blue-400 stroke-none font-mono">Multi-Head Attention</text>
      
      {/* Self-attention links */}
      <motion.path d="M100 250 Q150 200 200 250" className="stroke-blue-400/50 stroke-1" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <motion.path d="M200 250 Q250 200 300 250" className="stroke-blue-400/50 stroke-1" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />

      {/* Add & Norm */}
      <motion.circle cx="200" cy="150" r="16" className="stroke-purple-500 fill-slate-900" />
      <path d="M194 150 L206 150 M200 144 L200 156" className="stroke-purple-500" />

      {/* FFN Block */}
      <motion.rect x="100" y="50" width="200" height="70" rx="8" className="stroke-emerald-500 fill-emerald-500/10" 
        initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }} />
      <text x="200" y="90" textAnchor="middle" className="text-sm fill-emerald-400 stroke-none font-mono">Feed Forward</text>

      {/* Connections vertically */}
      <path d="M200 180 L200 166 M200 134 L200 120" />
      
      {/* Residual Connection */}
      <motion.path d="M40 250 L40 150 L184 150" className="stroke-pink-500/50" strokeDasharray="4 4"
         initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity }} />
    </g>
  </svg>
);

export const MLPSVG = ({ className }: { className?: string }) => {
  const nodes = [
    [50, 80], [50, 150], [50, 220],
    [150, 60], [150, 120], [150, 180], [150, 240],
    [250, 100], [250, 200],
    [350, 150]
  ];

  return (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" strokeWidth="1.5">
        {/* Layer connections */}
        {[0,1,2].map(i => [3,4,5,6].map(j => 
          <motion.line key={`${i}-${j}`} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} className="stroke-blue-500/20" 
            initial={{ opacity: 0.1 }} animate={{ opacity: 0.5 }} transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatType: 'reverse' }}/>
        ))}
        {[3,4,5,6].map(i => [7,8].map(j => 
          <motion.line key={`${i}-${j}`} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} className="stroke-blue-500/30" 
            initial={{ opacity: 0.1 }} animate={{ opacity: 0.6 }} transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, repeatType: 'reverse' }}/>
        ))}
        {[7,8].map(i => [9].map(j => 
          <motion.line key={`${i}-${j}`} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} className="stroke-purple-500/50" 
            initial={{ opacity: 0.2 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}/>
        ))}

        {/* Nodes */}
        {nodes.map((pos, idx) => (
          <motion.circle key={idx} cx={pos[0]} cy={pos[1]} r="12" className={`fill-slate-900 ${idx === 9 ? 'stroke-pink-500' : 'stroke-blue-400'}`} 
            whileHover={{ scale: 1.5 }} />
        ))}
      </g>
    </svg>
  );
};

export const CNNSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Input Image */}
      <motion.rect x="30" y="100" width="80" height="80" className="stroke-blue-500 fill-blue-500/10" />
      <motion.rect x="40" y="110" width="20" height="20" className="stroke-blue-400/50 fill-blue-400/20" 
        animate={{ x: [0, 20, 40, 0], y: [0, 0, 20, 20] }} transition={{ duration: 4, repeat: Infinity }} />
      
      {/* Conv Map 1 */}
      <motion.path d="M150 120 L150 180 L190 160 L190 100 Z" className="stroke-purple-500 fill-purple-500/20" />
      <motion.path d="M160 115 L160 175 L200 155 L200 95 Z" className="stroke-purple-400 fill-purple-400/20" />
      
      {/* Connection 1 */}
      <motion.path d="M110 140 L150 140" className="stroke-slate-500" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 10 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} />

      {/* Conv Map 2 (Smaller, more deep) */}
      <motion.path d="M250 130 L250 170 L270 160 L270 120 Z" className="stroke-pink-500 fill-pink-500/20" />
      <motion.path d="M255 127 L255 167 L275 157 L275 117 Z" className="stroke-pink-400 fill-pink-400/20" />
      <motion.path d="M260 124 L260 164 L280 154 L280 114 Z" className="stroke-pink-300 fill-pink-300/20" />
      
      {/* Connection 2 */}
      <motion.path d="M200 135 L250 145" className="stroke-slate-500" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 10 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} />

      {/* Flatten / Dense */}
      <motion.rect x="330" y="80" width="20" height="140" rx="4" className="stroke-amber-400 fill-amber-400/20" />
      {/* Connection 3 */}
      <motion.path d="M280 135 L330 150" className="stroke-slate-500" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 10 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }} />
      
      <text x="340" y="240" textAnchor="middle" className="text-xs fill-amber-300 stroke-none">Dense</text>
    </g>
  </svg>
);

export const RNNSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* RNN Unrolled Cells */}
      {[100, 200, 300].map((x, i) => (
        <g key={i}>
          {/* Cell */}
          <motion.rect x={x - 30} y="120" width="60" height="60" rx="8" className="stroke-emerald-500 fill-emerald-500/10" 
            animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }} />
          <text x={x} y="155" textAnchor="middle" className="text-sm fill-emerald-300 stroke-none font-mono">h_{i}</text>
          
          {/* Input */}
          <path d={`M${x} 230 L${x} 180`} className="stroke-slate-400 marker-end-arrow" />
          <motion.circle cx={x} cy="230" r="10" className="fill-blue-500/20 stroke-blue-500" />
          
          {/* Output */}
          <path d={`M${x} 120 L${x} 70`} className="stroke-slate-400 marker-end-arrow" />
          <motion.circle cx={x} cy="70" r="10" className="fill-purple-500/20 stroke-purple-500" />
        </g>
      ))}

      {/* Hidden State transfers */}
      <motion.path d="M130 150 L170 150" className="stroke-pink-400" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <motion.path d="M230 150 L270 150" className="stroke-pink-400" strokeDasharray="4 4" 
        initial={{ strokeDashoffset: 20 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      
      {/* Recurrent Loop Arrow on first cell */}
      <motion.path d="M90 120 Q70 80 100 80 Q130 80 110 120" className="stroke-emerald-400/50" 
         animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
    </g>
  </svg>
);

export const AutoencoderSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeWidth="2">
      {/* Input */}
      <motion.circle cx="40" cy="150" r="20" className="stroke-blue-500 fill-blue-500/20" />
      
      {/* Encoder */}
      <path d="M80 50 L160 110 L160 190 L80 250 Z" className="stroke-purple-500 fill-purple-500/10" />
      <text x="110" y="155" textAnchor="middle" className="text-sm fill-purple-300 stroke-none">Encodeur</text>
      
      {/* Latent Space */}
      <motion.rect x="180" y="110" width="40" height="80" rx="4" className="stroke-pink-500 fill-pink-500/20" 
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <text x="200" y="90" textAnchor="middle" className="text-xs fill-pink-300 stroke-none w-[60px]">Latent</text>

      {/* Decoder */}
      <path d="M240 110 L320 50 L320 250 L240 190 Z" className="stroke-emerald-500 fill-emerald-500/10" />
      <text x="290" y="155" textAnchor="middle" className="text-sm fill-emerald-300 stroke-none">Décodeur</text>
      
      {/* Output */}
      <motion.circle cx="360" cy="150" r="20" className="stroke-blue-500 fill-blue-500/20" />

      {/* Data flow */}
      <motion.path d="M60 150 L80 150" className="stroke-slate-400" />
      <motion.path d="M160 150 L180 150" className="stroke-slate-400" />
      <motion.path d="M220 150 L240 150" className="stroke-slate-400" />
      <motion.path d="M320 150 L340 150" className="stroke-slate-400" />
    </g>
  </svg>
);

export const GNNSVG = ({ className }: { className?: string }) => {
  const nodes = [
    [100, 150], [180, 70], [200, 220], [280, 140]
  ];
  return (
    <svg viewBox="0 0 400 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" strokeWidth="2">
        {/* Edges */}
        <path d={`M${nodes[0][0]} ${nodes[0][1]} L${nodes[1][0]} ${nodes[1][1]}`} className="stroke-slate-600" />
        <path d={`M${nodes[0][0]} ${nodes[0][1]} L${nodes[2][0]} ${nodes[2][1]}`} className="stroke-slate-600" />
        <path d={`M${nodes[1][0]} ${nodes[1][1]} L${nodes[2][0]} ${nodes[2][1]}`} className="stroke-slate-600" />
        <path d={`M${nodes[1][0]} ${nodes[1][1]} L${nodes[3][0]} ${nodes[3][1]}`} className="stroke-slate-600" />
        <path d={`M${nodes[2][0]} ${nodes[2][1]} L${nodes[3][0]} ${nodes[3][1]}`} className="stroke-slate-600" />
        
        {/* Message Passing Animation */}
        <motion.circle cx={nodes[0][0]} cy={nodes[0][1]} r="4" className="fill-purple-500"
          animate={{ cx: [nodes[0][0], nodes[1][0]], cy: [nodes[0][1], nodes[1][1]], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        <motion.circle cx={nodes[0][0]} cy={nodes[0][1]} r="4" className="fill-purple-500"
          animate={{ cx: [nodes[0][0], nodes[2][0]], cy: [nodes[0][1], nodes[2][1]], opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        
        <motion.circle cx={nodes[1][0]} cy={nodes[1][1]} r="4" className="fill-purple-500"
          animate={{ cx: [nodes[1][0], nodes[3][0]], cy: [nodes[1][1], nodes[3][1]], opacity: [1, 0] }}
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }} />
          
        <motion.circle cx={nodes[2][0]} cy={nodes[2][1]} r="4" className="fill-purple-500"
          animate={{ cx: [nodes[2][0], nodes[3][0]], cy: [nodes[2][1], nodes[3][1]], opacity: [1, 0] }}
          transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "linear" }} />

        {/* Nodes */}
        {nodes.map((pos, idx) => (
          <g key={idx}>
            <motion.circle cx={pos[0]} cy={pos[1]} r="18" className="fill-slate-900 stroke-blue-500"
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }} />
            <text x={pos[0]} y={pos[1] + 4} textAnchor="middle" className="text-xs fill-blue-300 stroke-none font-mono">v{idx}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};

