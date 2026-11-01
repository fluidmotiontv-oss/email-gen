import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Zap,
  Sliders,
  Type,
  Tag,
  Palette,
  Eye,
  CheckCircle2,
  Cpu,
  Radio,
  Clock,
  RefreshCw,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  EmailCampaignData,
  OperationalChamber,
  MotionStyle,
  ColorThemeId,
} from '../types/email';
import { COLOR_THEMES, TEMPLATE_PRESETS } from '../utils/presets';

interface ConfigurationPanelProps {
  campaign: EmailCampaignData;
  onChange: (updated: EmailCampaignData) => void;
  onOpenAiModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CHAMBERS: OperationalChamber[] = [
  'Command & Control',
  'The Central Chamber',
  'Action & Propulsion',
  'Resource Processing',
  'Defense & Environment',
];

const MOTION_OPTIONS: { id: MotionStyle; label: string; desc: string }[] = [
  {
    id: 'quantum-shimmer',
    label: 'Quantum Shimmer',
    desc: 'Metallic iridescent light-sweep across hero & CTA button',
  },
  {
    id: 'dragon-pulse',
    label: 'Dragon Core Pulse',
    desc: 'Soft ambient neon breathing glow around core badges',
  },
  {
    id: 'fluid-wave',
    label: 'Fluid Waves',
    desc: 'Sinusoidal color flow matching Fluidmotion TV stream waves',
  },
  {
    id: 'harmonic-432',
    label: '432Hz Soundwave',
    desc: 'Acoustic equalizer frequency bars animation',
  },
  {
    id: 'static-bulletproof',
    label: 'Static Bulletproof',
    desc: 'No CSS animations for legacy rigid email client fallbacks',
  },
];

const ASSET_PRESETS = [
  {
    name: 'Dragon 9 Cyber Crest',
    url: '/src/assets/images/dragon9_emblem_1793546040543.jpg',
  },
  {
    name: 'Fluidmotion 8K Display',
    url: '/src/assets/images/fluidmotion_mesh_display_1793546042756.jpg',
  },
  {
    name: 'Dragon Hardware Terminal',
    url: '/src/assets/images/dragon_node_hardware_1793546042013.jpg',
  },
];

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  campaign,
  onChange,
  onOpenAiModal,
  activeTab,
  setActiveTab,
}) => {
  const updateField = <K extends keyof EmailCampaignData>(
    field: K,
    value: EmailCampaignData[K]
  ) => {
    onChange({
      ...campaign,
      [field]: value,
    });
  };

  const handleApplyPreset = (preset: EmailCampaignData) => {
    onChange({ ...preset });
  };

  const handleBulletChange = (index: number, newText: string) => {
    const updated = [...campaign.bulletPoints];
    updated[index] = { ...updated[index], text: newText };
    updateField('bulletPoints', updated);
  };

  const handleSpecChange = (
    index: number,
    key: 'label' | 'value' | 'subtext',
    val: string
  ) => {
    const updated = [...campaign.specs];
    updated[index] = { ...updated[index], [key]: val };
    updateField('specs', updated);
  };

  const handleOfferFeatureChange = (index: number, val: string) => {
    const updated = [...campaign.offerFeatures];
    updated[index] = val;
    updateField('offerFeatures', updated);
  };

  const addOfferFeature = () => {
    updateField('offerFeatures', [...campaign.offerFeatures, 'New Sovereign Perk']);
  };

  const removeOfferFeature = (index: number) => {
    updateField(
      'offerFeatures',
      campaign.offerFeatures.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden border-r border-slate-800">
      
      {/* Tab Navigation Strip */}
      <div className="flex items-center gap-1 px-3 py-2.5 bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'presets'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Presets</span>
        </button>
        <button
          onClick={() => setActiveTab('protocol')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'protocol'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Dragon 9 Core</span>
        </button>
        <button
          onClick={() => setActiveTab('motion')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'motion'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Style & Motion</span>
        </button>
        <button
          onClick={() => setActiveTab('copy')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'copy'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Copy & Content</span>
        </button>
        <button
          onClick={() => setActiveTab('offer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'offer'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Tag className="w-3.5 h-3.5" />
          <span>Specs & Offer</span>
        </button>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* PRESETS TAB */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Campaign Blueprints
                </h3>
                <p className="text-xs text-slate-400">
                  Pre-configured high-converting promotional email structures
                </p>
              </div>
              <button
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded-lg text-xs font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Generator</span>
              </button>
            </div>

            <div className="space-y-3">
              {TEMPLATE_PRESETS.map((preset) => {
                const isSelected = campaign.id === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-950/40'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                          {preset.chamber}
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          {preset.templateName}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {preset.subheadline}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                      <span>Node: {preset.dragonCodename}</span>
                      <span>•</span>
                      <span>Freq: {preset.harmonicFrequency}</span>
                      <span>•</span>
                      <span>Motion: {preset.motionStyle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DRAGON 9 PROTOCOL TAB */}
        {activeTab === 'protocol' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Dragon 9 Sovereign Protocol Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Configure node telemetry and Two-Pin Polarity homeostasis
              </p>
            </div>

            {/* Dragon Designation / Codename */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                1. Dragon Designation / Codename
              </label>
              <input
                type="text"
                value={campaign.dragonCodename}
                onChange={(e) => updateField('dragonCodename', e.target.value)}
                placeholder="e.g. Aether-Viper-9"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Operational Chamber */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                2. Operational Chamber / Triad
              </label>
              <select
                value={campaign.chamber}
                onChange={(e) =>
                  updateField('chamber', e.target.value as OperationalChamber)
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                {CHAMBERS.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>

            {/* Primary Mission */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                3. Primary Mission / Core Subsystem
              </label>
              <input
                type="text"
                value={campaign.mission}
                onChange={(e) => updateField('mission', e.target.value)}
                placeholder="e.g. FFmpeg 4K Stream Ingestion, WireGuard Mesh"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Harmonic Base Frequency */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                4. Harmonic Base Frequency (Acoustic Resonance)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['432 Hz', '528 Hz', '963 Hz'].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => updateField('harmonicFrequency', freq)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-colors ${
                      campaign.harmonicFrequency === freq
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-Pin Polarity Core */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  5. Two-Pin Polarity Homeostasis Core
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  BALANCED
                </span>
              </div>

              {/* Static Alpha */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">
                    Static Reference (Alpha - Grounding & Stability):
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {campaign.staticPolarityAlpha}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={campaign.staticPolarityAlpha}
                  onChange={(e) =>
                    updateField('staticPolarityAlpha', Number(e.target.value))
                  }
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Dynamic Beta */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">
                    Dynamic Reactor (Beta - Mutation & Adaptability):
                  </span>
                  <span className="font-mono font-bold text-cyan-400">
                    {campaign.dynamicPolarityBeta}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={campaign.dynamicPolarityBeta}
                  onChange={(e) =>
                    updateField('dynamicPolarityBeta', Number(e.target.value))
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Consensus Fingerprint */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Consensus Fingerprint & Epoch
              </label>
              <input
                type="text"
                value={campaign.consensusFingerprint}
                onChange={(e) => updateField('consensusFingerprint', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* STYLE & MOTION TAB */}
        {activeTab === 'motion' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Kinetic Styling & Motion Engine
              </h3>
              <p className="text-xs text-slate-400">
                Configure CSS animations, color spectrums, and visual assets
              </p>
            </div>

            {/* Color Spectrum Theme */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Color Spectrum Theme
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(COLOR_THEMES).map((th) => {
                  const isSelected = campaign.colorThemeId === th.id;
                  return (
                    <div
                      key={th.id}
                      onClick={() => updateField('colorThemeId', th.id as ColorThemeId)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span
                            className="w-4 h-4 rounded-full border border-black/40"
                            style={{ backgroundColor: th.primary }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/40"
                            style={{ backgroundColor: th.secondary }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-white">
                          {th.name}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kinetic Motion Style */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Interactive Animation Style
              </label>
              <div className="space-y-2">
                {MOTION_OPTIONS.map((m) => {
                  const isSelected = campaign.motionStyle === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => updateField('motionStyle', m.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          {m.label}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{m.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Visual Asset */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Hero Visual Asset
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ASSET_PRESETS.map((asset) => {
                  const isSelected = campaign.heroImage === asset.url;
                  return (
                    <div
                      key={asset.url}
                      onClick={() => updateField('heroImage', asset.url)}
                      className={`rounded-lg border overflow-hidden cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 ring-2 ring-emerald-500/50'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-16 object-cover"
                      />
                      <div className="p-1.5 bg-slate-900 text-[10px] font-medium text-slate-300 truncate text-center">
                        {asset.name}
                      </div>
                    </div>
                  );
                })}
              </div>
              <input
                type="text"
                value={campaign.heroImage}
                onChange={(e) => updateField('heroImage', e.target.value)}
                placeholder="Or custom Image URL (https://...)"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Logo Badge Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Header Badge Brand Text
              </label>
              <input
                type="text"
                value={campaign.logoBadgeText}
                onChange={(e) => updateField('logoBadgeText', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* COPY & CONTENT TAB */}
        {activeTab === 'copy' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Copywriting & Narrative
                </h3>
                <p className="text-xs text-slate-400">
                  Subject lines, headlines, and promotional hooks
                </p>
              </div>
              <button
                onClick={onOpenAiModal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 rounded-lg text-xs font-medium transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Rewrite</span>
              </button>
            </div>

            {/* Subject Line */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Subject Line
              </label>
              <input
                type="text"
                value={campaign.subjectLine}
                onChange={(e) => updateField('subjectLine', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            {/* Preheader */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Inbox Preheader Snippet
              </label>
              <input
                type="text"
                value={campaign.preheaderText}
                onChange={(e) => updateField('preheaderText', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Urgency Bar */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Kinetic Urgency Ticker Text
              </label>
              <input
                type="text"
                value={campaign.urgencyBarText}
                onChange={(e) => updateField('urgencyBarText', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* Kicker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Section Kicker
              </label>
              <input
                type="text"
                value={campaign.kicker}
                onChange={(e) => updateField('kicker', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Hero Headline
              </label>
              <input
                type="text"
                value={campaign.headline}
                onChange={(e) => updateField('headline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Subheadline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Subheadline
              </label>
              <textarea
                rows={2}
                value={campaign.subheadline}
                onChange={(e) => updateField('subheadline', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Body Paragraph 1 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Narrative Paragraph 1 (Problem / Paradigm Shift)
              </label>
              <textarea
                rows={3}
                value={campaign.bodyParagraph1}
                onChange={(e) => updateField('bodyParagraph1', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* Body Paragraph 2 */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Narrative Paragraph 2 (Dragon 9 Solution & Physics)
              </label>
              <textarea
                rows={3}
                value={campaign.bodyParagraph2}
                onChange={(e) => updateField('bodyParagraph2', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* Bullet Checkpoints */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Core Feature Bullet Points
              </label>
              {campaign.bulletPoints.map((bullet, idx) => (
                <div key={bullet.id} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    0{idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={bullet.text}
                    onChange={(e) => handleBulletChange(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SPECS & OFFER TAB */}
        {activeTab === 'offer' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Offer Structure & Call-to-Actions
              </h3>
              <p className="text-xs text-slate-400">
                Configure promotional cards, pricing tiers, and CTAs
              </p>
            </div>

            {/* Bento Specs Grid (4 metrics) */}
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <span className="text-xs font-bold text-white">
                Technical Spec Metric Badges
              </span>
              <div className="grid grid-cols-2 gap-2">
                {campaign.specs.map((sp, idx) => (
                  <div
                    key={sp.id}
                    className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1 text-xs"
                  >
                    <input
                      type="text"
                      value={sp.label}
                      onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                      placeholder="LABEL"
                      className="w-full px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-slate-400 uppercase"
                    />
                    <input
                      type="text"
                      value={sp.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      placeholder="VALUE"
                      className="w-full px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-xs font-bold text-emerald-400"
                    />
                    <input
                      type="text"
                      value={sp.subtext}
                      onChange={(e) =>
                        handleSpecChange(idx, 'subtext', e.target.value)
                      }
                      placeholder="SUBTEXT"
                      className="w-full px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] text-slate-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Offer Card Toggle */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">
                  Promotional Deal Card
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={campaign.showOfferCard}
                    onChange={(e) => updateField('showOfferCard', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {campaign.showOfferCard && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Offer Title</label>
                      <input
                        type="text"
                        value={campaign.offerTitle}
                        onChange={(e) => updateField('offerTitle', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Badge</label>
                      <input
                        type="text"
                        value={campaign.offerBadge}
                        onChange={(e) => updateField('offerBadge', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-emerald-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Orig. Price</label>
                      <input
                        type="text"
                        value={campaign.offerOriginalPrice}
                        onChange={(e) =>
                          updateField('offerOriginalPrice', e.target.value)
                        }
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Deal Price</label>
                      <input
                        type="text"
                        value={campaign.offerPrice}
                        onChange={(e) => updateField('offerPrice', e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-emerald-400 font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Period/Term</label>
                      <input
                        type="text"
                        value={campaign.offerPeriod}
                        onChange={(e) => updateField('offerPeriod', e.target.value)}
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300"
                      />
                    </div>
                  </div>

                  {/* Included features */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-slate-400">
                        Included Perks (Checklist)
                      </label>
                      <button
                        onClick={addOfferFeature}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Perk</span>
                      </button>
                    </div>
                    {campaign.offerFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) =>
                            handleOfferFeatureChange(fIdx, e.target.value)
                          }
                          className="flex-1 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200"
                        />
                        <button
                          onClick={() => removeOfferFeature(fIdx)}
                          className="p-1 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Primary Action Button (Shimmer CTA)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={campaign.ctaPrimaryText}
                    onChange={(e) => updateField('ctaPrimaryText', e.target.value)}
                    placeholder="BUTTON TEXT"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-emerald-300 font-bold"
                  />
                  <input
                    type="text"
                    value={campaign.ctaPrimaryUrl}
                    onChange={(e) => updateField('ctaPrimaryUrl', e.target.value)}
                    placeholder="DESTINATION URL"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Secondary Action Link (Ghost CTA)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={campaign.ctaSecondaryText}
                    onChange={(e) => updateField('ctaSecondaryText', e.target.value)}
                    placeholder="LINK TEXT"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-cyan-300"
                  />
                  <input
                    type="text"
                    value={campaign.ctaSecondaryUrl}
                    onChange={(e) => updateField('ctaSecondaryUrl', e.target.value)}
                    placeholder="DESTINATION URL"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
