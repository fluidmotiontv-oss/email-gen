import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Terminal,
  FileCode,
  FileText,
  Send,
  Cpu,
  Layers,
} from 'lucide-react';
import { EmailCampaignData } from '../types/email';
import {
  compileHtmlEmail,
  compilePlainText,
  compileBashDispatchScript,
  compilePm2Config,
} from '../utils/emailCompiler';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: EmailCampaignData;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  const [tab, setTab] = useState<'html' | 'rich' | 'bash' | 'pm2' | 'text'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = compileHtmlEmail(campaign, 'modern');
  const plainTextContent = compilePlainText(campaign);
  const bashScript = compileBashDispatchScript(campaign);
  const pm2Config = compilePm2Config(campaign);

  const getCurrentText = () => {
    switch (tab) {
      case 'html':
        return htmlContent;
      case 'text':
        return plainTextContent;
      case 'bash':
        return bashScript;
      case 'pm2':
        return pm2Config;
      default:
        return htmlContent;
    }
  };

  const handleCopy = async () => {
    try {
      if (tab === 'rich') {
        const blobHtml = new Blob([htmlContent], { type: 'text/html' });
        const blobText = new Blob([plainTextContent], { type: 'text/plain' });
        const item = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(getCurrentText());
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.error('Copy failed:', err);
      await navigator.clipboard.writeText(getCurrentText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    let filename = `dragon9-${campaign.dragonCodename.toLowerCase()}`;
    let content = '';
    let mime = 'text/plain';

    if (tab === 'html' || tab === 'rich') {
      filename += '.html';
      content = htmlContent;
      mime = 'text/html';
    } else if (tab === 'bash') {
      filename += '-dispatch.sh';
      content = bashScript;
    } else if (tab === 'pm2') {
      filename = 'ecosystem.config.js';
      content = pm2Config;
      mime = 'application/javascript';
    } else {
      filename += '.txt';
      content = plainTextContent;
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Export & Dispatch Arsenal</span>
            </h3>
            <p className="text-xs text-slate-400">
              Ready-to-deploy HTML templates, rich email clipboard payloads, and shell scripts
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-6 py-2.5 bg-slate-950 border-b border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tab === 'html'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Responsive Animated HTML</span>
          </button>
          <button
            onClick={() => setTab('rich')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tab === 'rich'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Direct Rich Text Clipboard</span>
          </button>
          <button
            onClick={() => setTab('bash')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tab === 'bash'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>antiX / Termux Bash Dispatcher</span>
          </button>
          <button
            onClick={() => setTab('pm2')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tab === 'pm2'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>PM2 Daemon Config</span>
          </button>
          <button
            onClick={() => setTab('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
              tab === 'text'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Text</span>
          </button>
        </div>

        {/* Code / Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-slate-950 font-mono text-xs text-slate-300">
          {tab === 'rich' ? (
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-950 border border-emerald-700 rounded-xl text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    One-Click Formatted Rich Email Copy
                  </h4>
                  <p className="text-xs text-slate-400">
                    Copies formatted visual email HTML directly into your OS clipboard.
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Click <strong>"Copy to Clipboard"</strong> below, then switch over to <strong>Gmail</strong>, <strong>Apple Mail</strong>, or <strong>Thunderbird</strong>, and simply press <code className="px-1.5 py-0.5 bg-slate-800 rounded text-emerald-400 font-mono">Cmd+V</code> / <code className="px-1.5 py-0.5 bg-slate-800 rounded text-emerald-400 font-mono">Ctrl+V</code> inside your email compose body. All tables, colors, CTA buttons, and styling are rendered immediately!
              </p>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap break-all leading-relaxed bg-slate-900/80 p-4 rounded-xl border border-slate-800 select-all max-h-[420px] overflow-auto">
              {getCurrentText()}
            </pre>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <div className="text-xs text-slate-400 font-mono">
            {tab === 'html' && 'Full responsive HTML (CSS keyframe animations + VML fallbacks)'}
            {tab === 'rich' && 'Rich clipboard format ready for Gmail / Apple Mail compose'}
            {tab === 'bash' && 'Shell script with curl / msmtp automation for local node mesh'}
            {tab === 'pm2' && 'ecosystem.config.js for autonomous daemon processes'}
            {tab === 'text' && 'Clean plaintext ASCII version for multipart/alternative'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
