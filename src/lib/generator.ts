export type Track = {
  id: string;
  label: string;
  emoji: string;
  tagline: string;
};

export const TRACKS: Track[] = [
  { id: 'ai', label: 'AI / ML', emoji: '🤖', tagline: 'Smart models that actually help people' },
  { id: 'web3', label: 'Web3', emoji: '⛓️', tagline: 'Decentralized, transparent, trustless' },
  { id: 'climate', label: 'Climate', emoji: '🌱', tagline: 'Sustainability with real impact' },
  { id: 'health', label: 'Health', emoji: '🩺', tagline: 'Better care, better outcomes' },
  { id: 'education', label: 'Education', emoji: '📚', tagline: 'Learning that sticks' },
  { id: 'fintech', label: 'Fintech', emoji: '💳', tagline: 'Money tools for everyone' },
  { id: 'devtools', label: 'Developer Tools', emoji: '🛠️', tagline: 'Build faster, ship happier' },
  { id: 'social', label: 'Social Good', emoji: '🤝', tagline: 'Community first, always' },
];

type Component = { subject: string; action: string; detail: string };

const COMPONENTS: Record<string, Component[]> = {
  ai: [
    { subject: 'A voice-first assistant', action: 'summarizes', detail: 'medical papers for busy clinicians' },
    { subject: 'An on-device classifier', action: 'detects', detail: 'crop disease from a single photo' },
    { subject: 'A fine-tuned LLM', action: 'generates', detail: 'personalized study plans from syllabi' },
    { subject: 'A vision model', action: 'identifies', detail: 'recyclable materials on a conveyor belt' },
    { subject: 'A sentiment engine', action: 'flags', detail: 'early signs of burnout in chat logs' },
    { subject: 'A retrieval pipeline', action: 'answers', detail: 'legal questions from case law' },
  ],
  web3: [
    { subject: 'A DAO toolkit', action: 'coordinates', detail: 'community grants with on-chain voting' },
    { subject: 'A zk-proof circuit', action: 'verifies', detail: 'credential claims without revealing data' },
    { subject: 'A token-gated app', action: 'unlocks', detail: 'premium courses for verified learners' },
    { subject: 'A decentralized marketplace', action: 'connects', detail: 'freelancers with escrow payments' },
    { subject: 'A DAO dashboard', action: 'tracks', detail: 'treasury health in real time' },
  ],
  climate: [
    { subject: 'A carbon ledger', action: 'tracks', detail: 'supply-chain emissions per product' },
    { subject: 'A smart thermostat AI', action: 'reduces', detail: 'household energy by 20%' },
    { subject: 'A community platform', action: 'matches', detail: 'volunteers with local reforestation' },
    { subject: 'A satellite analyzer', action: 'detects', detail: 'illegal logging within 24 hours' },
    { subject: 'A gamified app', action: 'rewards', detail: 'low-carbon commute choices' },
  ],
  health: [
    { subject: 'A wearable sync app', action: 'predicts', detail: 'migraine onset 30 minutes early' },
    { subject: 'A telehealth bot', action: 'triages', detail: 'symptoms before a clinic visit' },
    { subject: 'A medication reminder', action: 'improves', detail: 'adherence with smart nudges' },
    { subject: 'A mental health companion', action: 'guides', detail: 'CBT exercises during panic attacks' },
    { subject: 'A nutrition scanner', action: 'scores', detail: 'groceries for your dietary needs' },
  ],
  education: [
    { subject: 'An adaptive quiz engine', action: 'adjusts', detail: 'difficulty to each student in real time' },
    { subject: 'A peer-tutor matcher', action: 'pairs', detail: 'students by topic and timezone' },
    { subject: 'A lecture summarizer', action: 'turns', detail: 'two-hour lectures into ten-minute reviews' },
    { subject: 'A coding playground', action: 'grades', detail: 'student code with instant feedback' },
    { subject: 'A language partner', action: 'converses', detail: 'with learners at their CEFR level' },
  ],
  fintech: [
    { subject: 'A budgeting AI', action: 'categorizes', detail: 'spending from bank transactions' },
    { subject: 'A micro-investing app', action: 'rounds', detail: 'spare change into index funds' },
    { subject: 'A fraud detector', action: 'flags', detail: 'suspicious transactions in under 100ms' },
    { subject: 'A savings pod', action: 'pools', detail: 'money for shared group goals' },
    { subject: 'A tax assistant', action: 'finds', detail: 'deductions freelancers miss' },
  ],
  devtools: [
    { subject: 'A CI optimizer', action: 'caches', detail: 'build steps across pull requests' },
    { subject: 'A log explorer', action: 'correlates', detail: 'errors across microservices' },
    { subject: 'A code reviewer', action: 'suggests', detail: 'security fixes before merge' },
    { subject: 'A doc generator', action: 'writes', detail: 'API references from OpenAPI specs' },
    { subject: 'A feature-flag dashboard', action: 'rolls', detail: 'changes to 1% of users safely' },
  ],
  social: [
    { subject: 'A mutual-aid map', action: 'connects', detail: 'neighbors with surplus food' },
    { subject: 'A civic tracker', action: 'follows', detail: 'city council votes that matter to you' },
    { subject: 'A volunteer portal', action: 'matches', detail: 'skills to local nonprofit needs' },
    { subject: 'A crisis router', action: 'directs', detail: 'people to the nearest shelter' },
    { subject: 'A community wiki', action: 'documents', detail: 'local history from elder interviews' },
  ],
};

const STACKS: Record<string, string[]> = {
  ai: ['Python', 'PyTorch', 'FastAPI', 'Hugging Face', 'React'],
  web3: ['Solidity', 'Foundry', 'Ethers.js', 'Next.js', 'IPFS'],
  climate: ['Python', 'Pandas', 'Mapbox', 'React', 'PostGIS'],
  health: ['React Native', 'HealthKit', 'Firebase', 'TensorFlow Lite'],
  education: ['Next.js', 'Prisma', 'PostgreSQL', 'OpenAI', 'Tailwind'],
  fintech: ['Node.js', 'Plaid', 'Stripe', 'React', 'TimescaleDB'],
  devtools: ['Go', 'Docker', 'React', 'WebSockets', 'PostgreSQL'],
  social: ['React', 'Supabase', 'Mapbox', 'Twilio', 'Vercel'],
};

const NAMES: Record<string, string[]> = {
  ai: ['NeuraList', 'ModelMind', 'CogniCare', 'VisionAid', 'InsightAI', 'PulseML'],
  web3: ['TrustDAO', 'zkVault', 'ChainVote', 'OpenLedger', 'TokenGate', 'DAOboard'],
  climate: ['CarbonClip', 'EcoSense', 'GreenLedger', 'ForestWatch', 'CommuteGreen', 'ThermoSave'],
  health: ['MigraineGuard', 'TriageBot', 'MedNudge', 'CalmCompanion', 'NutriScan', 'VitalSync'],
  education: ['AdaptQuiz', 'TutorMatch', 'LectureClip', 'CodeGrade', 'LingoPartner', 'StudyLoop'],
  fintech: ['BudgetAI', 'SpareChange', 'FraudFlag', 'SavingsPod', 'DeductFinder', 'FinScope'],
  devtools: ['BuildCache', 'LogLink', 'MergeGuard', 'DocForge', 'FlagRoll', 'DevLens'],
  social: ['MutualMap', 'CivicTrack', 'SkillBridge', 'ShelterRoute', 'ElderWiki', 'CommUnity'],
};

const TAGLINES = [
  'Ship something judges will remember.',
  'Built in a weekend. Useful on Monday.',
  'Small team, big swing.',
  'Demo-ready, not demo-only.',
  'Where curiosity meets a deadline.',
  'Your unfair advantage at the kickoff.',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export type GeneratedIdea = {
  title: string;
  description: string;
  track: string;
  trackId: string;
  stack: string[];
  tagline: string;
};

export function generateIdea(trackId: string): GeneratedIdea {
  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];
  const components = COMPONENTS[trackId] ?? COMPONENTS.ai;
  const c = pick(components);
  const description = `${c.subject} that ${c.action} ${c.detail}.`;
  const title = pick(NAMES[trackId] ?? NAMES.ai);
  const stack = STACKS[trackId] ?? STACKS.ai;
  const tagline = pick(TAGLINES);

  return { title, description, track: track.label, trackId, stack, tagline };
}

export function generateRandomIdea(): GeneratedIdea {
  return generateIdea(pick(TRACKS).id);
}
