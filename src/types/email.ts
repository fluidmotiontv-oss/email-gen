export type OperationalChamber =
  | 'Command & Control'
  | 'The Central Chamber'
  | 'Action & Propulsion'
  | 'Resource Processing'
  | 'Defense & Environment';

export type MotionStyle =
  | 'quantum-shimmer'
  | 'dragon-pulse'
  | 'fluid-wave'
  | 'harmonic-432'
  | 'static-bulletproof';

export type ColorThemeId =
  | 'fluid-emerald'
  | 'dragon-gold'
  | 'ultraviolet'
  | 'arctic-cobalt'
  | 'tactical-stealth';

export interface ColorTheme {
  id: ColorThemeId;
  name: string;
  primary: string; // e.g. #00F5A0
  secondary: string; // e.g. #00D9F5
  accent: string; // e.g. #10B981
  bgDark: string; // e.g. #060B11
  cardBg: string; // e.g. #0C1524
  border: string; // e.g. #1A2E44
  textLight: string; // #F1F5F9
  textMuted: string; // #94A3B8
}

export interface SpecItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
}

export interface BulletPoint {
  id: string;
  text: string;
}

export interface EmailCampaignData {
  id: string;
  templateName: string;
  
  // Dragon 9 Configuration Matrix
  dragonCodename: string;
  chamber: OperationalChamber;
  mission: string;
  harmonicFrequency: string; // e.g. '432 Hz'
  staticPolarityAlpha: number; // 0-100
  dynamicPolarityBeta: number; // 0-100
  
  // Visual & Motion
  colorThemeId: ColorThemeId;
  motionStyle: MotionStyle;
  heroImage: string;
  logoBadgeText: string;
  
  // Content & Copy
  subjectLine: string;
  preheaderText: string;
  kicker: string;
  headline: string;
  subheadline: string;
  urgencyBarText: string;
  countdownMinutes: number; // simulated minutes remaining
  
  bodyParagraph1: string;
  bodyParagraph2: string;
  bulletPoints: BulletPoint[];
  
  specs: SpecItem[];
  
  // Promotional Offer Card
  showOfferCard: boolean;
  offerTitle: string;
  offerBadge: string;
  offerOriginalPrice: string;
  offerPrice: string;
  offerPeriod: string;
  offerFeatures: string[];
  
  // CTAs
  ctaPrimaryText: string;
  ctaPrimaryUrl: string;
  ctaSecondaryText: string;
  ctaSecondaryUrl: string;
  
  // Footer & Compliance
  consensusFingerprint: string;
  senderAddress: string;
  unsubscribeUrl: string;
  viewInBrowserUrl: string;
  websiteUrl: string;
}
