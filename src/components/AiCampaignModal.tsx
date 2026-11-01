import React, { useState } from 'react';
import { Sparkles, X, Loader2, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { EmailCampaignData } from '../types/email';

interface AiCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: EmailCampaignData;
  onApplyGenerated: (updated: EmailCampaignData) => void;
}

export const AiCampaignModal: React.FC<AiCampaignModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onApplyGenerated,
}) => {
  const [goal, setGoal] = useState('High-conversion sovereign node drop & hardware reservation');
  const [audience, setAudience] = useState('VIP node operators, high-bandwidth 4K streamers, and sovereign mesh advocates');
  const [tone, setTone] = useState('Cyber-biological systems engineering, high urgency & kinetic speed');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dragonCodename: campaign.dragonCodename,
          chamber: campaign.chamber,
          mission: campaign.mission,
          harmonicFrequency: campaign.harmonicFrequency,
          staticPolarityAlpha: campaign.staticPolarityAlpha,
          dynamicPolarityBeta: campaign.dynamicPolarityBeta,
          campaignGoal: goal,
          audience,
          tone,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate campaign payload');
      }

      const generated = result.data;

      // Merge into current campaign
      const updatedCampaign: EmailCampaignData = {
        ...campaign,
        subjectLine: generated.subjectLine || campaign.subjectLine,
        preheaderText: generated.preheaderText || campaign.preheaderText,
        headline: generated.headline || campaign.headline,
        subheadline: generated.subheadline || campaign.subheadline,
        kicker: generated.kicker || campaign.kicker,
        bodyParagraph1: generated.bodyParagraph1 || campaign.bodyParagraph1,
        bodyParagraph2: generated.bodyParagraph2 || campaign.bodyParagraph2,
        bulletPoints: Array.isArray(generated.bulletPoints)
          ? generated.bulletPoints.map((text: string, i: number) => ({
              id: String(i + 1),
              text,
            }))
          : campaign.bulletPoints,
        offerTitle: generated.offerTitle || campaign.offerTitle,
        offerBadge: generated.offerBadge || campaign.offerBadge,
        offerPrice: generated.offerPrice || campaign.offerPrice,
        offerOriginalPrice: generated.offerOriginalPrice || campaign.offerOriginalPrice,
        ctaPrimaryText: generated.ctaPrimaryText || campaign.ctaPrimaryText,
        ctaPrimaryUrl: generated.ctaPrimaryUrl || campaign.ctaPrimaryUrl,
        ctaSecondaryText: generated.ctaSecondaryText || campaign.ctaSecondaryText,
        ctaSecondaryUrl: generated.ctaSecondaryUrl || campaign.ctaSecondaryUrl,
        urgencyBarText: generated.urgencyBarText || campaign.urgencyBarText,
      };

      onApplyGenerated(updatedCampaign);
      onClose();
    } catch (err: any) {
      console.error('AI Generation failed:', err);
      setError(err?.message || 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Dragon 9 Sovereign AI Campaigner
              </h3>
              <p className="text-xs text-slate-400">
                Powered by Gemini 3.8 Flash systems copy engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 text-xs text-slate-200">
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800/80 rounded-lg text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Goal Selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">
              Campaign Goal & Offer Focus
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="High-conversion sovereign node drop & hardware reservation">
                Genesis Sovereign Node Drop & Hardware Reservation
              </option>
              <option value="Fluidmotion TV 4K 60FPS Streaming Flash Pass (Zero Buffering)">
                Fluidmotion TV 4K 60FPS Streaming Flash Pass (Zero Buffering)
              </option>
              <option value="Dragon 9 Temporal Mesh Hardware Terminal Founders Drop">
                Dragon 9 Temporal Mesh Hardware Terminal Founders Drop
              </option>
              <option value="VIP Sovereign Ingestion Operator & B2B Cluster Relay Pitch">
                VIP Sovereign Ingestion Operator & B2B Cluster Relay Pitch
              </option>
              <option value="Weekend 48-Hour Flash Surge Promo with 50% Voucher">
                Weekend 48-Hour Flash Surge Promo with 50% Voucher
              </option>
            </select>
          </div>

          {/* Audience */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">
              Target Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Tone */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">
              Tone & Voice
            </label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Active Context Preview */}
          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg space-y-1 font-mono text-[11px] text-slate-400">
            <div className="text-slate-300 font-semibold mb-1">
              Dragon 9 Target Matrix:
            </div>
            <div>• Node: {campaign.dragonCodename}</div>
            <div>• Chamber: {campaign.chamber}</div>
            <div>• Polarity: α:{campaign.staticPolarityAlpha}% / β:{campaign.dynamicPolarityBeta}%</div>
            <div>• Clock: {campaign.harmonicFrequency}</div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Sovereign Copy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesize Campaign</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
