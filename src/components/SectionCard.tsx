import { Section } from '../types';
import { ArrowUpRight } from 'lucide-react';

export default function SectionCard({ section, index, onOpenDetail }: { key?: string | number, section: Section, index: number, onOpenDetail: (id: string | null) => void }) {
  return (
    <section
      className={`rounded-[2rem] p-1 ${section.colSpan === 2 ? 'lg:col-span-2' : ''} relative overflow-hidden group/card bg-white/[0.015] border border-white/[0.04]`}
    >
      {/* Subtle glowing orb in background */}
      <div className={`absolute -top-40 -right-40 w-80 h-80 opacity-10 blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 ${section.glowColor}`} />

      <div className="p-6 md:p-8 relative z-10 w-full h-full flex flex-col">
        <h2 className={`text-2xl font-semibold mb-8 tracking-tight font-sans flex items-center gap-3 text-white`}>
          <span className={`w-2.5 h-2.5 rounded-full ${section.glowColor}`} />
          {section.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {section.subsections.map((sub) => (
            <div 
              key={sub.id} 
              onClick={() => sub.detailId && onOpenDetail(sub.detailId)}
              className={`flex flex-col rounded-[1.5rem] bg-[#0a0a0a]/60 backdrop-blur-md border border-white/[0.03] overflow-hidden ${sub.detailId ? 'cursor-pointer shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] shadow-black/50' : ''}`}
            >
              <div className="h-44 bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center p-6 relative overflow-hidden">
                  <sub.illustration className={`w-full h-full text-slate-600`} />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-start">
                 <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="text-base font-semibold text-slate-200 leading-tight">{sub.title}</h3>
                    {sub.detailId && (
                      <div className="shrink-0 p-1.5 rounded-full bg-white/5 text-slate-400">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    )}
                 </div>
                 <p className="text-sm text-slate-500 leading-relaxed font-light line-clamp-3">
                   {sub.description}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
