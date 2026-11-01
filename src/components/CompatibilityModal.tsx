import React from 'react';
import { X, Check, AlertCircle, Info, ShieldCheck } from 'lucide-react';

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CLIENT_MATRIX = [
  {
    name: 'Apple Mail (iOS & macOS)',
    share: '58% of Mobile Opens',
    animations: 'Full Support (Keyframes, Shimmer, Glowing Aura)',
    responsive: 'Full Media Queries',
    status: 'optimal',
  },
  {
    name: 'Gmail (Web & Desktop)',
    share: '28% of All Opens',
    animations: 'Graceful Fallback (Static Neon Gradient & Glow)',
    responsive: 'Full Media Queries & Fluid Tables',
    status: 'optimal',
  },
  {
    name: 'Gmail App (Android / iOS)',
    share: 'High Mobile Volume',
    animations: 'Graceful Fallback to Solid Gradient',
    responsive: 'Fluid Mobile Scaling',
    status: 'optimal',
  },
  {
    name: 'Outlook 365 (Web)',
    share: 'Enterprise Standard',
    animations: 'Full CSS Gradients & Hover States',
    responsive: 'Responsive Fluid Containers',
    status: 'optimal',
  },
  {
    name: 'Outlook Desktop (2016 - 2021 Windows)',
    share: 'Legacy Corporate',
    animations: 'MSO VML Fallback (Clean Table Structure, 600px)',
    responsive: 'Centered 600px MSO Table',
    status: 'compatible',
  },
  {
    name: 'Thunderbird & Superhuman',
    share: 'Power Users & Developers',
    animations: 'Full Keyframe Animations & Dark Mode',
    responsive: 'Full Media Queries',
    status: 'optimal',
  },
];

export const CompatibilityModal: React.FC<CompatibilityModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-950 border border-emerald-800 rounded-lg text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Email Client Compatibility Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Progressive enhancement architecture for Dragon 9 & Fluidmotion TV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh] text-xs">
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
            <h4 className="font-bold text-slate-100 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>How Progressive Kinetic Enhancement Works</span>
            </h4>
            <p className="text-slate-300 leading-relaxed">
              In email clients that support modern CSS animations (like <strong>Apple Mail</strong>, <strong>iOS Mail</strong>, and <strong>Superhuman</strong>), the email renders with rich flowing gradients, shimmering metallic CTA buttons, and pulsing glowing auras.
            </p>
            <p className="text-slate-400 leading-relaxed">
              In clients that strip `@keyframes` (like <strong>Gmail</strong> and <strong>Outlook</strong>), our compiler gracefully degrades to eye-catching high-contrast gradient solids and rock-solid nested tables with Outlook VML conditionals. Zero broken layouts, zero text clipping.
            </p>
          </div>

          <div className="space-y-2.5">
            {CLIENT_MATRIX.map((client) => (
              <div
                key={client.name}
                className="p-3.5 bg-slate-950/50 border border-slate-800 rounded-xl flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">
                      {client.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {client.share}
                    </span>
                  </div>
                  <div className="text-slate-300 mt-1">
                    Movement: <span className="text-emerald-400">{client.animations}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Layout: {client.responsive}
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-3.5 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
