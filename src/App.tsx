import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { EmailPreview } from './components/EmailPreview';
import { ExportModal } from './components/ExportModal';
import { AiCampaignModal } from './components/AiCampaignModal';
import { CompatibilityModal } from './components/CompatibilityModal';
import { TEMPLATE_PRESETS } from './utils/presets';
import { EmailCampaignData } from './types/email';
import { SlidersHorizontal, Eye } from 'lucide-react';

export default function App() {
  const [campaign, setCampaign] = useState<EmailCampaignData>(TEMPLATE_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<string>('presets');
  
  // Modals
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [isCompatibilityOpen, setIsCompatibilityOpen] = useState(false);

  // Mobile view toggle (Editor vs Preview)
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('preview');

  const handleSelectSection = (section: string) => {
    setActiveTab(section);
    setMobileView('editor');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* 1. Header adhering strictly to Top Bar Contract */}
      <TopNav
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAiGenerator={() => setIsAiGeneratorOpen(true)}
        onOpenCompatibility={() => setIsCompatibilityOpen(true)}
        activeSection={activeTab}
        onSelectSection={handleSelectSection}
      />

      {/* Mobile Tab Switcher (Only visible on small screens) */}
      <div className="md:hidden flex items-center justify-center p-2 bg-slate-900 border-b border-slate-800 text-xs gap-2">
        <button
          onClick={() => setMobileView('editor')}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-lg font-medium transition-colors ${
            mobileView === 'editor'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Editor & Controls</span>
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex items-center gap-1 px-4 py-1.5 rounded-lg font-medium transition-colors ${
            mobileView === 'preview'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* 2. Main Studio Split Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane: Configuration Studio */}
        <aside
          className={`w-full md:w-[460px] lg:w-[490px] shrink-0 h-full overflow-hidden ${
            mobileView === 'preview' ? 'hidden md:flex flex-col' : 'flex flex-col'
          }`}
        >
          <ConfigurationPanel
            campaign={campaign}
            onChange={setCampaign}
            onOpenAiModal={() => setIsAiGeneratorOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>

        {/* Right Pane: Live Interactive Email Preview */}
        <section
          className={`flex-1 h-full overflow-hidden ${
            mobileView === 'editor' ? 'hidden md:flex flex-col' : 'flex flex-col'
          }`}
        >
          <EmailPreview
            campaign={campaign}
            onOpenExport={() => setIsExportOpen(true)}
          />
        </section>
      </main>

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        campaign={campaign}
      />

      <AiCampaignModal
        isOpen={isAiGeneratorOpen}
        onClose={() => setIsAiGeneratorOpen(false)}
        campaign={campaign}
        onApplyGenerated={setCampaign}
      />

      <CompatibilityModal
        isOpen={isCompatibilityOpen}
        onClose={() => setIsCompatibilityOpen(false)}
      />
    </div>
  );
}
