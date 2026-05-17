import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PythonCodeProps {
  code: string;
}

export default function PythonCode({ code }: PythonCodeProps) {
  return (
    <div className="relative mt-4 bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/10 w-full text-left">
      <div className="flex items-center px-4 py-2 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        <span className="ml-4 text-[10px] font-mono text-white/40 font-medium">Python</span>
      </div>
      <div className="p-0 text-[10px] md:text-xs">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: 'inherit',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'right',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
