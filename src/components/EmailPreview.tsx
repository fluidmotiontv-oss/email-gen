import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Smartphone,
  Copy,
  Check,
  Download,
  ExternalLink,
  Flame,
  FileText,
  Mail,
  RefreshCw,
  Eye,
} from 'lucide-react';
import { EmailCampaignData } from '../types/email';
import { compileHtmlEmail, compilePlainText } from '../utils/emailCompiler';

interface EmailPreviewProps {
  campaign: EmailCampaignData;
  onOpenExport: () => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ campaign, onOpenExport }) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [clientMode, setClientMode] = useState<'modern' | 'gmail' | 'outlook' | 'text'>('modern');
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedRich, setCopiedRich] = useState(false);
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const compiledHtml = compileHtmlEmail(
    campaign,
    clientMode === 'text' ? 'modern' : clientMode
  );
  const plainText = compilePlainText(campaign);

  // Update iframe contents whenever html or clientMode changes
  useEffect(() => {
    if (iframeRef.current && clientMode !== 'text') {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(compiledHtml);
        doc.close();
      }
    }
  }, [compiledHtml, clientMode]);

  const handleCopyRaw = async () => {
    try {
      await navigator.clipboard.writeText(compiledHtml);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2200);
    } catch (err) {
      console.error('Failed to copy html:', err);
    }
  };

  const handleCopyRichText = async () => {
    try {
      // Create rich html clipboard item
      const blobHtml = new Blob([compiledHtml], { type: 'text/html' });
      const blobText = new Blob([plainText], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText,
      });
      await navigator.clipboard.write([item]);
      setCopiedRich(true);
      setTimeout(() => setCopiedRich(false), 2200);
    } catch (err) {
      console.error('Rich copy failed, fallback to text:', err);
      await navigator.clipboard.writeText(compiledHtml);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2200);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([compiledHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dragon9-${campaign.dragonCodename.toLowerCase()}-promo.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800">
      {/* Top Viewport Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs text-slate-300">
        
        {/* Device Switcher (Desktop 600px vs Mobile 375px) */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
              device === 'desktop'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (600px)</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
              device === 'mobile'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (375px)</span>
          </button>
        </div>

        {/* Client Simulation Mode */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setClientMode('modern')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
              clientMode === 'modern'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Kinetic CSS animations (Apple Mail, iOS, Modern Webkit)"
          >
            <Flame className="w-3 h-3 text-emerald-400" />
            <span>Kinetic Animated</span>
          </button>
          <button
            onClick={() => setClientMode('gmail')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
              clientMode === 'gmail'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Standard Gmail Web simulation"
          >
            <Mail className="w-3 h-3" />
            <span>Gmail Web</span>
          </button>
          <button
            onClick={() => setClientMode('outlook')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
              clientMode === 'outlook'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tabular Outlook Desktop simulation"
          >
            <Eye className="w-3 h-3" />
            <span>Outlook</span>
          </button>
          <button
            onClick={() => setClientMode('text')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
              clientMode === 'text'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span>Plain Text</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyRichText}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 rounded-md transition-colors font-medium text-xs cursor-pointer"
            title="Copy as formatted rich email ready to paste directly into Gmail or Apple Mail compose window!"
          >
            {copiedRich ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRich ? 'Copied Rich Email!' : 'Pasteable Rich Email'}</span>
          </button>

          <button
            onClick={handleCopyRaw}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors font-medium text-xs cursor-pointer"
            title="Copy raw HTML email source code"
          >
            {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedRaw ? 'HTML Copied' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors cursor-pointer"
            title="Download .html file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subject Line & Preheader Bar Preview */}
      <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Subject:</span>
          <span className="font-semibold text-slate-100 truncate">{campaign.subjectLine}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span className="font-semibold uppercase tracking-wider text-[10px]">Preheader:</span>
          <span className="text-slate-400 truncate">{campaign.preheaderText}</span>
        </div>
      </div>

      {/* Main Preview Canvas */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center bg-radial from-slate-900 to-slate-950">
        {clientMode === 'text' ? (
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-lg p-6 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed shadow-xl">
            {plainText}
          </div>
        ) : (
          <div
            className={`transition-all duration-300 ease-out bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 ${
              device === 'mobile'
                ? 'w-[375px] max-w-full ring-8 ring-slate-800/80 rounded-[32px] p-2'
                : 'w-[640px] max-w-full'
            }`}
            style={{
              minHeight: '700px',
            }}
          >
            {device === 'mobile' && (
              <div className="w-full flex justify-center py-2">
                <div className="w-24 h-1.5 bg-slate-700 rounded-full"></div>
              </div>
            )}

            <iframe
              ref={iframeRef}
              title="Email Kinetic Preview"
              className="w-full border-0 bg-transparent"
              style={{
                height: device === 'mobile' ? '740px' : '880px',
                borderRadius: device === 'mobile' ? '20px' : '8px',
              }}
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        )}
      </div>

      {/* Footer Status & Diagnostics Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-4">
          <span>NODE: <strong className="text-emerald-400">{campaign.dragonCodename}</strong></span>
          <span>CHAMBER: <strong className="text-cyan-400">{campaign.chamber}</strong></span>
          <span>CLOCK: <strong className="text-slate-300">{campaign.harmonicFrequency}</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <span>POLARITY: α:{campaign.staticPolarityAlpha}% / β:{campaign.dynamicPolarityBeta}%</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            COMPILER ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
};
