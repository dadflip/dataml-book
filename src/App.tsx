import InteractiveMap from './components/InteractiveMap';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans overflow-x-hidden relative">
      <div className="fixed inset-0 bg-[#050505] pointer-events-none" />
      
      <div className="relative z-10 w-full">
        <main className="w-full">
            <InteractiveMap />
        </main>
      </div>

    </div>
  );
}

