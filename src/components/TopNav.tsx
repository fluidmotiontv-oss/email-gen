import React from 'react';
import { Sparkles, Code2, Send, Download } from 'lucide-react';

interface TopNavProps {
  onOpenExport: () => void;
  onOpenAiGenerator: () => void;
  onOpenCompatibility: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenExport,
  onOpenAiGenerator,
  onOpenCompatibility,
  activeSection,
  onSelectSection,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap hover:text-emerald-400 transition-colors"
        >
          Fluidmotion TV × Dragon 9
        </a>
      </div>

      {/* Zone 2: 4-5 Clean single-line text links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onSelectSection('presets')}
          className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeSection === 'presets' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Templates
        </button>
        <button
          onClick={() => onSelectSection('protocol')}
          className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeSection === 'protocol' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Dragon 9 Core
        </button>
        <button
          onClick={() => onSelectSection('motion')}
          className={`hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 text-left ${
            activeSection === 'motion' ? 'text-emerald-400 font-semibold' : ''
          }`}
        >
          Kinetic Styling
        </button>
        <button
          onClick={onOpenAiGenerator}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-left flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI Campaigner</span>
        </button>
        <button
          onClick={onOpenCompatibility}
          className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          Client Matrix
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenExport}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 text-slate-950" />
          <span>Export HTML Payload</span>
        </button>
      </div>
    </header>
  );
};
