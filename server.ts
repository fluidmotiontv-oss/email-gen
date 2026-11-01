import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    engine: 'Dragon 9 Temporal Mesh / Fluidmotion TV',
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.post('/api/ai/generate-campaign', async (req: Request, res: Response) => {
  try {
    const {
      dragonCodename = 'Aether-Viper-9',
      chamber = 'The Central Chamber',
      mission = 'Sovereign 4K 60FPS Stream Ingestion & WireGuard Mesh Routing',
      harmonicFrequency = '432 Hz',
      staticPolarityAlpha = 70,
      dynamicPolarityBeta = 85,
      campaignGoal = 'High-conversion product launch & hardware node reservation',
      audience = 'VIP node operators, high-bandwidth streamers & IPTV enthusiasts',
      tone = 'Cyber-biological systems engineering & sovereign speed',
    } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Provide high-grade intelligent procedural copy fallback if key not configured
      return res.json({
        success: true,
        source: 'procedural-engine',
        data: {
          subjectLine: `⚡ [SOVEREIGN ACCESS] ${dragonCodename}: Zero-Buffer 4K Mesh Activated`,
          preheaderText: `Temporal sync locked at ${harmonicFrequency}. Secure your Chamber Node before block closure.`,
          headline: `THE NEXT EVOLUTION OF SOVEREIGN STREAMING IS LIVE`,
          subheadline: `Deploying Dragon 9 architecture with fluid 60FPS motion synthesis and ultra-low latency mesh routing.`,
          kicker: `CHAMBER: ${chamber.toUpperCase()} // POLARITY α:${staticPolarityAlpha}% β:${dynamicPolarityBeta}%`,
          bodyParagraph1: `The legacy streaming grid is choked with packet congestion, artificial throttling, and fragile centralized bottlenecks. Fluidmotion TV coupled with Dragon 9 temporal mesh architecture dissolves these limits. Through two-pin polarity stabilization, your stream packets traverse high-velocity peer relays with zero jitter.`,
          bodyParagraph2: `Synchronized at the ${harmonicFrequency} acoustic carrier foundation, our node cluster delivers cinema-grade 4K 60FPS video ingestion with native WireGuard mesh tunneling. This is not an ordinary broadcast—it is sovereign infrastructure built for uncompromised throughput.`,
          bulletPoints: [
            `Zero-Buffer 4K 60FPS Stream Ingestion with hardware-accelerated motion smoothing`,
            `Dragon 9 Temporal Clock synchronization ensuring microsecond packet parity`,
            `Dual-Pin Polarity Core balancing absolute grounding (Alpha ${staticPolarityAlpha}%) with adaptive dynamic routing (Beta ${dynamicPolarityBeta}%)`,
            `WireGuard encrypted sovereign peer-mesh with multi-path failover`,
          ],
          offerTitle: `VIP SOVEREIGN OPERATOR ALLOCATION`,
          offerPrice: `$149.00`,
          offerOriginalPrice: `$399.00`,
          offerBadge: `FLASH RESERVATION // 62% OFF`,
          ctaPrimaryText: `RESERVE SOVEREIGN NODE NOW`,
          ctaPrimaryUrl: `https://fluidmotiontv.com/dragon9-access`,
          ctaSecondaryText: `INSPECT TECHNICAL WHITEPAPER`,
          ctaSecondaryUrl: `https://fluidmotiontv.com/docs/dragon9-mesh`,
          urgencyBarText: `⚡ TEMPORAL ALLOCATION WINDOW: ONLY 18 NODES REMAINING FOR REGION 9`,
        },
      });
    }

    const systemPrompt = `You are the master technical copywriter for Fluidmotion TV and Dragon 9 (Cyber Dragon Genesis / FluidmotionTV Sovereign Mesh).
Your mission is to write high-converting, eye-catching, cyber-biological promotional and sales email copy that fuses high-end systems engineering, sovereign streaming lore, zero-buffering speed, and irresistible marketing psychology.

Keep sentences punchy, visceral, confident, and packed with sensory technical imagery.
Always return valid JSON adhering strictly to the required schema.`;

    const userPrompt = `Generate a promotional email campaign payload for:
Dragon Designation / Codename: ${dragonCodename}
Operational Chamber: ${chamber}
Primary Mission: ${mission}
Harmonic Base Frequency: ${harmonicFrequency}
Two-Pin Polarity: Static Alpha=${staticPolarityAlpha}%, Dynamic Beta=${dynamicPolarityBeta}%
Campaign Goal: ${campaignGoal}
Target Audience: ${audience}
Style / Tone: ${tone}

Return JSON with these exact fields:
- subjectLine: (Punchy, urgent, under 60 chars, emojis like ⚡ or 🐉 allowed)
- preheaderText: (Compelling preview snippet, 80-100 chars)
- headline: (All-caps bold hero headline, 5-8 words)
- subheadline: (Engaging summary sentence)
- kicker: (Short tech specification kicker)
- bodyParagraph1: (Persuasive opening problem/breakthrough paragraph)
- bodyParagraph2: (Technical deep dive into Dragon 9 & Fluidmotion TV benefits)
- bulletPoints: (Array of 4 crisp, feature-benefit bullet strings)
- offerTitle: (Promotional package title)
- offerPrice: (e.g. $149 or $49/mo)
- offerOriginalPrice: (e.g. $349 or $129/mo)
- offerBadge: (e.g. 58% TEMPORAL VOUCHER)
- ctaPrimaryText: (High-energy button text, 3-5 words)
- ctaPrimaryUrl: (Valid URL)
- ctaSecondaryText: (Secondary action)
- ctaSecondaryUrl: (Valid URL)
- urgencyBarText: (Scarcity / countdown teaser)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      data: parsed,
    });
  } catch (error: any) {
    console.error('Gemini generation error:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to generate campaign with AI',
    });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Fluidmotion TV Dragon 9] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
