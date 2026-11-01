import { EmailCampaignData } from '../types/email';
import { COLOR_THEMES } from './presets';

export function compileHtmlEmail(
  campaign: EmailCampaignData,
  mode: 'modern' | 'gmail' | 'outlook' = 'modern'
): string {
  const theme = COLOR_THEMES[campaign.colorThemeId] || COLOR_THEMES['fluid-emerald'];
  const isAnimated = mode === 'modern' && campaign.motionStyle !== 'static-bulletproof';

  // Keyframes for modern animated clients (Apple Mail, iOS Mail, Superhuman, Webkit)
  const kineticStyles = isAnimated
    ? `
    @keyframes kineticShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes kineticGlow {
      0%, 100% { box-shadow: 0 0 15px ${theme.primary}40, inset 0 0 15px ${theme.primary}20; }
      50% { box-shadow: 0 0 30px ${theme.primary}90, inset 0 0 20px ${theme.primary}50; }
    }
    @keyframes kineticWave {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes barPulse {
      0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
      50% { transform: scaleY(1); opacity: 1; }
    }
    .kinetic-button {
      background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 50%, ${theme.primary} 100%) !important;
      background-size: 200% auto !important;
      animation: kineticShimmer 4s linear infinite !important;
      box-shadow: 0 4px 20px ${theme.primary}60 !important;
    }
    .kinetic-button:hover {
      box-shadow: 0 6px 30px ${theme.primary}95 !important;
      transform: translateY(-1px) !important;
    }
    .kinetic-card-glow {
      animation: kineticGlow 3s ease-in-out infinite !important;
    }
    .kinetic-wave-header {
      background: linear-gradient(270deg, ${theme.bgDark}, ${theme.cardBg}, ${theme.border}, ${theme.bgDark}) !important;
      background-size: 400% 400% !important;
      animation: kineticWave 10s ease infinite !important;
    }
    .urgency-pulse {
      animation: kineticShimmer 2.5s ease infinite !important;
      background: linear-gradient(90deg, ${theme.primary}22, ${theme.primary}55, ${theme.primary}22) !important;
      background-size: 200% 100% !important;
    }
    .soundbar-1 { animation: barPulse 1.2s ease-in-out infinite 0.1s !important; }
    .soundbar-2 { animation: barPulse 1.2s ease-in-out infinite 0.3s !important; }
    .soundbar-3 { animation: barPulse 1.2s ease-in-out infinite 0.5s !important; }
    .soundbar-4 { animation: barPulse 1.2s ease-in-out infinite 0.2s !important; }
  `
    : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no, address=no, email=no, date=no, url=no" />
  <title>${campaign.subjectLine}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* Global Resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; min-width: 100%; background-color: ${theme.bgDark}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${theme.textLight}; }
    a { color: ${theme.primary}; text-decoration: none; }

    /* Responsive Mobile Breakpoint */
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .mobile-stack { display: block !important; width: 100% !important; max-width: 100% !important; }
      .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
      .mobile-headline { font-size: 26px !important; line-height: 32px !important; }
      .spec-cell { width: 50% !important; display: inline-block !important; }
    }

    ${kineticStyles}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${theme.bgDark}; color: ${theme.textLight}; -webkit-font-smoothing: antialiased;">

  <!-- Hidden Preheader Text Hack for Inbox Preview -->
  <div style="display: none; font-size: 1px; color: ${theme.bgDark}; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${campaign.preheaderText} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- Main Background Wrapper -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${theme.bgDark}; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 24px 8px 40px 8px;">

        <!--[if mso]>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center">
        <tr>
        <td>
        <![endif]-->

        <!-- Email Container (600px Max Desktop) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; margin: 0 auto; background-color: ${theme.cardBg}; border: 1px solid ${theme.border}; border-radius: 12px; overflow: hidden; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);">

          <!-- Top Brand Bar -->
          <tr>
            <td class="kinetic-wave-header" style="background-color: ${theme.bgDark}; padding: 18px 24px; border-bottom: 1px solid ${theme.border};">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" valign="middle">
                    <span style="display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 2px; color: ${theme.primary}; text-transform: uppercase;">
                      ${campaign.logoBadgeText}
                    </span>
                  </td>
                  <td align="right" valign="middle">
                    <!-- 432Hz Soundwave Equalizer Bars -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="display: inline-block;">
                      <tr>
                        <td class="soundbar-1" style="width: 3px; height: 14px; background-color: ${theme.primary}; margin: 0 1px; display: inline-block; border-radius: 2px;"></td>
                        <td class="soundbar-2" style="width: 3px; height: 18px; background-color: ${theme.secondary}; margin: 0 1px; display: inline-block; border-radius: 2px;"></td>
                        <td class="soundbar-3" style="width: 3px; height: 22px; background-color: ${theme.primary}; margin: 0 1px; display: inline-block; border-radius: 2px;"></td>
                        <td class="soundbar-4" style="width: 3px; height: 12px; background-color: ${theme.secondary}; margin: 0 1px; display: inline-block; border-radius: 2px;"></td>
                      </tr>
                    </table>
                    <span style="font-size: 10px; font-family: monospace; color: ${theme.textMuted}; margin-left: 6px;">${campaign.harmonicFrequency}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Kinetic Urgency Bar -->
          <tr>
            <td class="urgency-pulse" style="background-color: ${theme.border}; padding: 10px 24px; text-align: center; border-bottom: 1px solid ${theme.primary}44;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: ${theme.primary}; text-transform: uppercase;">
                ${campaign.urgencyBarText}
              </span>
            </td>
          </tr>

          <!-- Hero Image Section -->
          ${
            campaign.heroImage
              ? `
          <tr>
            <td align="center" style="padding: 0; background-color: #000000; position: relative;">
              <img src="${campaign.heroImage}" alt="${campaign.headline}" width="600" style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 2px solid ${theme.border};" />
            </td>
          </tr>`
              : ''
          }

          <!-- Hero Header Content -->
          <tr>
            <td class="mobile-padding" style="padding: 36px 32px 20px 32px; text-align: center;">
              
              <!-- Kicker -->
              <div style="font-size: 11px; font-family: monospace; font-weight: 700; color: ${theme.secondary}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
                ${campaign.kicker}
              </div>

              <!-- Main Headline -->
              <h1 class="mobile-headline" style="margin: 0 0 16px 0; font-size: 32px; line-height: 38px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF; text-transform: uppercase;">
                ${campaign.headline}
              </h1>

              <!-- Subheadline -->
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: ${theme.textMuted}; max-width: 500px; margin-left: auto; margin-right: auto;">
                ${campaign.subheadline}
              </p>

              <!-- Primary CTA Button (Top) -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 20px auto 10px auto;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: ${theme.primary};">
                    <a href="${campaign.ctaPrimaryUrl}" target="_blank" class="kinetic-button" style="display: inline-block; padding: 15px 36px; font-size: 14px; font-weight: 800; letter-spacing: 1.5px; color: #050B14; text-decoration: none; border-radius: 6px; text-transform: uppercase; transition: all 0.3s ease;">
                      ${campaign.ctaPrimaryText} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Technical Specs Bento Strip -->
          <tr>
            <td style="padding: 10px 24px 24px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${theme.bgDark}; border: 1px solid ${theme.border}; border-radius: 8px;">
                <tr>
                  ${campaign.specs
                    .map(
                      (spec, idx) => `
                    <td class="spec-cell" align="center" style="padding: 14px 10px; ${idx < campaign.specs.length - 1 ? `border-right: 1px solid ${theme.border};` : ''}">
                      <div style="font-size: 9px; font-family: monospace; letter-spacing: 1px; color: ${theme.textMuted}; text-transform: uppercase;">${spec.label}</div>
                      <div style="font-size: 18px; font-weight: 800; color: ${theme.primary}; margin: 4px 0 2px 0;">${spec.value}</div>
                      <div style="font-size: 10px; color: ${theme.textMuted};">${spec.subtext}</div>
                    </td>
                  `
                    )
                    .join('')}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Narrative -->
          <tr>
            <td class="mobile-padding" style="padding: 12px 32px 28px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: ${theme.textLight};">
                ${campaign.bodyParagraph1}
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: ${theme.textLight};">
                ${campaign.bodyParagraph2}
              </p>

              <!-- Feature Checkpoints -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 18px;">
                ${campaign.bulletPoints
                  .map(
                    (bullet) => `
                  <tr>
                    <td valign="top" style="padding: 8px 12px 8px 0; width: 24px;">
                      <div style="width: 18px; height: 18px; line-height: 18px; text-align: center; background-color: ${theme.primary}22; border: 1px solid ${theme.primary}; border-radius: 4px; color: ${theme.primary}; font-size: 11px; font-weight: bold;">
                        ✓
                      </div>
                    </td>
                    <td valign="middle" style="padding: 8px 0; font-size: 14px; line-height: 20px; color: ${theme.textLight};">
                      ${bullet.text}
                    </td>
                  </tr>
                `
                  )
                  .join('')}
              </table>

            </td>
          </tr>

          <!-- Promotional Offer Box -->
          ${
            campaign.showOfferCard
              ? `
          <tr>
            <td style="padding: 0 24px 28px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="kinetic-card-glow" style="background-color: ${theme.bgDark}; border: 1px solid ${theme.primary}66; border-radius: 10px; padding: 24px; text-align: center;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; padding: 4px 14px; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; color: #050B14; background-color: ${theme.primary}; border-radius: 4px; text-transform: uppercase; margin-bottom: 12px;">
                      ${campaign.offerBadge}
                    </span>
                    <h3 style="margin: 8px 0 6px 0; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.5px;">
                      ${campaign.offerTitle}
                    </h3>
                    <div style="margin: 12px 0 4px 0;">
                      <span style="font-size: 15px; color: ${theme.textMuted}; text-decoration: line-through; margin-right: 8px;">
                        ${campaign.offerOriginalPrice}
                      </span>
                      <span style="font-size: 36px; font-weight: 900; color: ${theme.primary};">
                        ${campaign.offerPrice}
                      </span>
                    </div>
                    <div style="font-size: 11px; font-family: monospace; color: ${theme.secondary}; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 18px;">
                      ${campaign.offerPeriod}
                    </div>

                    <!-- Included Perks List -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 20px auto; text-align: left; max-width: 440px;">
                      ${campaign.offerFeatures
                        .map(
                          (feat) => `
                        <tr>
                          <td style="padding: 4px 8px 4px 0; color: ${theme.primary}; font-weight: bold;">•</td>
                          <td style="padding: 4px 0; font-size: 13px; color: ${theme.textLight};">${feat}</td>
                        </tr>
                      `
                        )
                        .join('')}
                    </table>

                    <!-- Offer CTA -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td align="center" style="border-radius: 6px; background-color: ${theme.primary};">
                          <a href="${campaign.ctaPrimaryUrl}" target="_blank" class="kinetic-button" style="display: inline-block; padding: 16px 42px; font-size: 14px; font-weight: 800; letter-spacing: 1.5px; color: #050B14; text-decoration: none; border-radius: 6px; text-transform: uppercase;">
                            ${campaign.ctaPrimaryText}
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>`
              : ''
          }

          <!-- Secondary Action / Whitepaper Link -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="${campaign.ctaSecondaryUrl}" target="_blank" style="font-size: 13px; font-weight: 600; color: ${theme.secondary}; text-decoration: underline; letter-spacing: 0.5px;">
                ${campaign.ctaSecondaryText} &rarr;
              </a>
            </td>
          </tr>

          <!-- Two-Pin Polarity Diagnostic Metric -->
          <tr>
            <td style="padding: 16px 24px; background-color: ${theme.bgDark}; border-top: 1px solid ${theme.border}; border-bottom: 1px solid ${theme.border};">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" style="font-size: 10px; font-family: monospace; color: ${theme.textMuted};">
                    PIN A (ALPHA GROUND): <strong style="color: ${theme.primary};">${campaign.staticPolarityAlpha}%</strong>
                  </td>
                  <td align="center" style="font-size: 10px; font-family: monospace; color: ${theme.textMuted};">
                    NODE: <strong style="color: #FFFFFF;">${campaign.dragonCodename}</strong>
                  </td>
                  <td align="right" style="font-size: 10px; font-family: monospace; color: ${theme.textMuted};">
                    PIN B (BETA REACTOR): <strong style="color: ${theme.secondary};">${campaign.dynamicPolarityBeta}%</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer & Sovereign Consensus Block -->
          <tr>
            <td style="padding: 28px 24px; background-color: ${theme.bgDark}; text-align: center;">
              <div style="font-size: 10px; font-family: monospace; color: ${theme.textMuted}; letter-spacing: 1px; margin-bottom: 8px;">
                CONSENSUS FINGERPRINT: ${campaign.consensusFingerprint}
              </div>
              <div style="font-size: 11px; color: ${theme.textMuted}; line-height: 18px; margin-bottom: 12px;">
                ${campaign.senderAddress}
              </div>
              <div style="font-size: 11px; color: ${theme.textMuted};">
                <a href="${campaign.websiteUrl}" target="_blank" style="color: ${theme.primary}; text-decoration: none; margin: 0 8px;">Fluidmotion TV Mesh</a>
                <span>·</span>
                <a href="${campaign.viewInBrowserUrl}" target="_blank" style="color: ${theme.textMuted}; text-decoration: underline; margin: 0 8px;">View in Browser</a>
                <span>·</span>
                <a href="${campaign.unsubscribeUrl}" target="_blank" style="color: ${theme.textMuted}; text-decoration: underline; margin: 0 8px;">Unsubscribe</a>
              </div>
            </td>
          </tr>

        </table>
        <!-- End Email Container -->

        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export function compilePlainText(campaign: EmailCampaignData): string {
  return `========================================================
${campaign.logoBadgeText}
HARMONIC FREQUENCY: ${campaign.harmonicFrequency} | NODE: ${campaign.dragonCodename}
========================================================

${campaign.headline}
${campaign.subheadline}

${campaign.urgencyBarText}

--------------------------------------------------------
SYSTEM OVERVIEW
--------------------------------------------------------
${campaign.bodyParagraph1}

${campaign.bodyParagraph2}

KEY CAPABILITIES:
${campaign.bulletPoints.map((b) => `* ${b.text}`).join('\n')}

TECHNICAL SPECIFICATIONS:
${campaign.specs.map((s) => `${s.label}: ${s.value} (${s.subtext})`).join('\n')}

${
  campaign.showOfferCard
    ? `--------------------------------------------------------
OFFER: ${campaign.offerTitle}
PRICE: ${campaign.offerPrice} (Regular: ${campaign.offerOriginalPrice}) - ${campaign.offerBadge}
${campaign.offerFeatures.map((f) => `+ ${f}`).join('\n')}
`
    : ''
}

CLAIM YOUR ACCESS:
${campaign.ctaPrimaryText}: ${campaign.ctaPrimaryUrl}
${campaign.ctaSecondaryText}: ${campaign.ctaSecondaryUrl}

========================================================
CONSENSUS: ${campaign.consensusFingerprint}
${campaign.senderAddress}
To unsubscribe: ${campaign.unsubscribeUrl}
========================================================`;
}

export function compileBashDispatchScript(campaign: EmailCampaignData): string {
  return `#!/usr/bin/env bash
# ==============================================================================
# Fluidmotion TV / Dragon 9 Autonomous SMTP Mesh Dispatcher
# Target: antiX Linux / Termux / Ubuntu Server
# Node Codename: ${campaign.dragonCodename}
# Chamber: ${campaign.chamber}
# ==============================================================================

set -euo pipefail

NODE_ID="${campaign.dragonCodename}"
SUBJECT="${campaign.subjectLine.replace(/"/g, '\\"')}"
PREHEADER="${campaign.preheaderText.replace(/"/g, '\\"')}"
RECIPIENTS_FILE="./recipients.txt"
HTML_PAYLOAD="./dragon9_email_payload.html"

echo "[DRAGON-9] Initializing sovereign mail dispatch pipeline..."
echo "[DRAGON-9] Operational Chamber: ${campaign.chamber}"
echo "[DRAGON-9] Harmonic Lock: ${campaign.harmonicFrequency}"

if [ ! -f "$RECIPIENTS_FILE" ]; then
  echo "Generating sample recipients list in $RECIPIENTS_FILE..."
  cat << 'EOF' > "$RECIPIENTS_FILE"
vip-operator-1@fluidmotiontv.com
mesh-relay-alpha@dragon9.net
sovereign-streamer@proton.me
EOF
fi

echo "[DRAGON-9] Dispatching payload with curl / sendmail..."
echo "[DRAGON-9] Subject: $SUBJECT"

# Example sendmail / msmtp command loop
while IFS= read -r recipient; do
  [[ -z "$recipient" || "$recipient" =~ ^# ]] && continue
  echo "-> Transmitting to $recipient..."
  # msmtp --from=node@fluidmotiontv.com "$recipient" < "$HTML_PAYLOAD"
done < "$RECIPIENTS_FILE"

echo "[DRAGON-9] Dispatch transmission cycle complete."
`;
}

export function compilePm2Config(campaign: EmailCampaignData): string {
  return `// ecosystem.config.js
// Fluidmotion TV / Dragon 9 Autonomous Mailer Daemon
module.exports = {
  apps: [
    {
      name: "dragon9-email-dispatcher",
      script: "./server.ts",
      interpreter: "tsx",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "250M",
      env: {
        NODE_ENV: "production",
        DRAGON_NODE_ID: "${campaign.dragonCodename}",
        OPERATIONAL_CHAMBER: "${campaign.chamber}",
        HARMONIC_FREQ: "${campaign.harmonicFrequency}",
        PORT: 3000
      }
    }
  ]
};
`;
}
