'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Definitions for the Upgraded Circular Intelligence Operating System

export type UserRole = 
  | 'manufacturer' 
  | 'buyer' 
  | 'recycler' 
  | 'treatment' 
  | 'sustainability' 
  | 'government' 
  | 'middleman' 
  | 'admin';

export type GlobalLanguage = 'en' | 'hi' | 'ta' | 'gu';

export interface User {
  email: string;
  fullName: string;
  organization: string;
  role: UserRole;
  isOnboarded: boolean;
}

export interface WasteStream {
  id: string;
  name: string;
  ph: number;
  cod: number;
  bod: number;
  tds: number;
  turbidity: number;
  contaminants: string;
  dye_concentration: number;
  sludge_percentage: number;
  waste_category: string;
  material_type: string;
  quantity: number; // tons
  temperature: number;
  timestamp: string;
}

// 15 Advanced Diagnostic Scores
export interface FeasibilityScores {
  recoveryFeasibility: number;
  circularFlowScore: number;
  sustainabilityImpact: number;
  toxicityRisk: number;
  infrastructureDependency: number;
  waterRecoveryEfficiency: number;
  industrialReusability: number;
  resourceRecovery: number;
  carbonOffsetPotential: number;
  buyerDemand: number;
  treatmentComplexity: number;
  logisticsComplexity: number;
  industrialScalability: number;
  esgComplianceReadiness: number;
  hazardProbability: number;
}

export interface RawMaterial {
  id: string;
  name: string;
  category: string;
  volume: string;
  consistency: number;
  ph: number;
  purity: number;
  contamination: number;
  isGenerated: boolean;
}

export interface GeneratedProduct {
  id: string;
  name: string;
  sourceStreamId: string;
  feasibilityScore: number;
  profitability: number;
  marketDemand: number;
  machineryRequirement: string;
  workforceRequirement: string;
  carbonReduction: string;
  nearbyBuyers: string[];
  estimatedMarketValue: string;
  estimatedROI: string;
  scalabilityPotential: string;
  treatmentDependency: string;
  isSaved: boolean;
  isListed: boolean;
  
  // Advanced specs for Custom synthesis design
  customRatio?: number;
  customPurity?: number;
  customMarketPrice?: string;
  customComplexity?: number;

  // Immersive physical state properties
  activeWorkflowStep: string;
  workflowProgress: number;
  isWorkflowActive: boolean;
  molecularConsistency: string;
  curingPhase: string;
  marketTrendUpdates: string[];
}

export interface MarketplaceListing {
  id: string;
  title: string;
  type: 'WASTE' | 'PRODUCT' | 'CONTRACT' | 'TENDER';
  ownerOrg: string;
  ownerRole: UserRole;
  material: string;
  volume: string;
  basePrice: string;
  currentBid: string;
  bidsCount: number;
  highestBidder?: string;
  recoveryScore: number;
  logisticsComplexity: string;
  sustainabilityImpact: string;
  timestamp: string;
  isPartnershipRequested?: boolean;
}

export interface CircularNetworkNode {
  id: string;
  name: string;
  role: UserRole;
  distance: string;
  compatibility: number;
  matchReason: string;
  coordinates: { x: number; y: number };
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface CollaborationExpert {
  id: string;
  name: string;
  type: 'NGO' | 'GOVERNMENT' | 'EXPERT';
  specialty: string;
  rate: string;
  rating: string;
  description: string;
}

interface CircularContextType {
  // Authentication & Onboarding
  user: User | null;
  loginUser: (email: string, role: UserRole) => void;
  registerUser: (fullName: string, email: string, organization: string, role: UserRole) => void;
  onboardOrganization: (details: { industryType: string; facilitiesCount: number; location: string }) => void;
  logout: () => void;

  // Multilingual state
  language: GlobalLanguage;
  setLanguage: (lang: GlobalLanguage) => void;
  t: (key: string) => string;

  // Waste Stream Ingestion
  wasteStreams: WasteStream[];
  activeStream: WasteStream | null;
  setActiveStreamById: (id: string) => void;
  ingestWasteStream: (stream: Partial<WasteStream>) => void;
  isIngesting: boolean;
  ingestionStatus: string;

  // Raw Materials
  rawMaterials: RawMaterial[];
  generateProductFromMaterial: (materialId: string, name: string, decidedPrice: string) => void;

  // Feasibility & Scores
  activeScores: FeasibilityScores | null;

  // Product Innovation Lab / AI Circular Manufacturing Studio
  generatedProducts: GeneratedProduct[];
  saveProduct: (id: string) => void;
  listProductOnMarketplace: (id: string, initialPrice: string) => void;
  startRecoveryWorkflow: (id: string) => void;
  updateCustomProductSpecs: (id: string, ratio: number, purity: number, marketPrice: string, complexity: number) => void;

  // Industrial Marketplace
  listings: MarketplaceListing[];
  placeBidOnListing: (id: string, amount: number, bidderName: string) => void;
  createMarketplaceListing: (listing: Partial<MarketplaceListing>) => void;
  togglePartnershipOnListing: (id: string) => void;

  // Ecosystem & Supply Chain Matching
  networkNodes: CircularNetworkNode[];
  selectedNode: CircularNetworkNode | null;
  setSelectedNode: (node: CircularNetworkNode | null) => void;

  // NGO & Governmental Experts
  experts: CollaborationExpert[];
  requestCollaboration: (expertId: string) => void;

  // AI Copilot
  copilotMessages: CopilotMessage[];
  sendCopilotMessage: (text: string) => void;
  isCopilotThinking: boolean;

  // Notifications
  notifications: SystemNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, type: SystemNotification['type']) => void;

  // Financial ROI Tracker (INR Rupees)
  ytdSavings: number;
  avoidedCarbonTons: number;
  recycledWaterGallons: number;
}

const CircularContext = createContext<CircularContextType | undefined>(undefined);

// Core translation matrix dictionary
const TRANSLATIONS: Record<GlobalLanguage, Record<string, string>> = {
  en: {
    dashboardTitle: "Circular Intelligence Workspace",
    facility: "Facility",
    operator: "Operator",
    nodeProtocol: "Node Protocol",
    activeStreamTitle: "Active Industrial Stream Ingested",
    dragDropText: "Drag & Drop Waste Stream Manifest",
    recalcRoute: "Recalculate Optimal Freight Route",
    decisionModule: "AI Recovery Decision Center",
    autonomousVerdict: "Autonomous Diagnostic Verdict",
    sellCredits: "Sell Certified Credits",
    tendersTitle: "Autonomous Circular Contract Engine",
    innovationLabTitle: "AI Circular Manufacturing Studio",
    synthesisReady: "AI Material Synthesis Chamber Ready",
    sustainabilityHub: "AI Compliance Risk Predictor",
    copilotGreetings: "Greetings. I am your ReWeave Industrial Intelligence Copilot. Ask me how to optimize molecular curing and regional raw feedstock margins.",
    expertNetwork: "Circular Workforce & Sustainability Assistance Network",
    flows: "Circular Flows",
    waterTwin: "Water Twin Diagnostics",
    recoveryCenter: "AI Recovery Center",
    manufacturing: "AI Circular Manufacturing",
    marketplace: "Industrial Marketplace",
    contracts: "Tenders & Contracts",
    network: "Ecosystem Network",
    monitoring: "Live Monitoring",
    sandbox: "Simulation Sandbox",
    copilot: "AI Copilot Chat",
    expertNetworkLink: "Cooperative Network",
    esg: "ESG & Compliance",
    supplyChain: "Supply Chain Intel",
    carbon: "Carbon Analytics",
    notifications: "Alert Notification Log",
    settings: "Organization Settings",
    coreOperations: "Core Operations",
    intelligence: "Intelligence",
    esgAuditing: "ESG Auditing",
    systemControl: "System Control",
    platformLanguage: "Platform Language"
  },
  hi: {
    dashboardTitle: "चक्रीय औद्योगिक प्रबंधन कार्यक्षेत्र",
    facility: "औद्योगिक केंद्र",
    operator: "प्रचालक",
    nodeProtocol: "नोड प्रोटोकॉल",
    activeStreamTitle: "सक्रिय औद्योगिक अपशिष्ट प्रवाह",
    dragDropText: "सक्रिय सामग्री रिपोर्ट फ़ाइलें यहाँ छोड़ें",
    recalcRoute: "इष्टतम परिवहन मार्ग की पुनर्गणना करें",
    decisionModule: "एआई पुनर्चक्रण निर्णय केंद्र",
    autonomousVerdict: "स्वायत्त नैदानिक निर्णय प्रणाली",
    sellCredits: "प्रमाणित कार्बन क्रेडिट बेचें",
    tendersTitle: "स्वायत्त चक्रीय अनुबंध प्रणाली",
    innovationLabTitle: "एआई चक्रीय विनिर्माण स्टूडियो",
    synthesisReady: "एआई सामग्री संश्लेषण कक्ष तैयार है",
    sustainabilityHub: "एआई पर्यावरण अनुपालन जोखिम सूचक",
    copilotGreetings: "नमस्कार। मैं आपका रीवीव औद्योगिक सहायक हूँ। आणविक शोधन और क्षेत्रीय कच्चे माल की मूल्य सीमा को अनुकूलित करने के लिए मुझसे प्रश्न पूछें।",
    expertNetwork: "चक्रीय कार्यबल और स्थिरता सहायता नेटवर्क",
    flows: "चक्रीय प्रवाह",
    waterTwin: "जल ट्विन निदान",
    recoveryCenter: "एआई पुनर्चक्रण केंद्र",
    manufacturing: "एआई चक्रीय विनिर्माण",
    marketplace: "औद्योगिक बाजार",
    contracts: "निविदा और अनुबंध",
    network: "पारिस्थितिकी तंत्र नेटवर्क",
    monitoring: "सक्रिय निगरानी",
    sandbox: "सिमुलेशन सैंडबॉक्स",
    copilot: "एआई कोपायलट चैट",
    expertNetworkLink: "सहकारी नेटवर्क",
    esg: "ईएसजी और अनुपालन",
    supplyChain: "आपूर्ति श्रृंखला खुफिया",
    carbon: "कार्बन विश्लेषण",
    notifications: "अलर्ट अधिसूचना लॉग",
    settings: "संगठन सेटिंग्स",
    coreOperations: "मुख्य परिचालन",
    intelligence: "कृत्रिम बुद्धिमत्ता",
    esgAuditing: "ईएसजी ऑडिटिंग",
    systemControl: "सिस्टम नियंत्रण",
    platformLanguage: "मंच की भाषा"
  },
  ta: {
    dashboardTitle: "சுழற்சி தொழிற்துறை நுண்ணறிவு தளம்",
    facility: "தொழில்துறை வசதி",
    operator: "இயக்குனர்",
    nodeProtocol: "நோட் நெறிமுறை",
    activeStreamTitle: "செயலில் உள்ள தொழில்துறை கழிவு ஓட்டம்",
    dragDropText: "கழிவு ஓட்ட ஆவணத்தை இங்கே பதிவேற்றவும்",
    recalcRoute: "சரியான போக்குவரத்து பாதையை மீண்டும் கணக்கிடு",
    decisionModule: "ஏஐ மறுசுழற்சி முடிவு மையம்",
    autonomousVerdict: "தன்னியக்க பகுப்பாய்வு தீர்ப்பு",
    sellCredits: "சான்றளிக்கப்பட்ட கார்பன் கிரெடிட்களை விற்கவும்",
    tendersTitle: "தன்னியக்க சுழற்சி ஒப்பந்த தளம்",
    innovationLabTitle: "ஏஐ சுழற்சி உற்பத்தி அரங்கம்",
    synthesisReady: "ஏஐ சுழற்சி பொருள் உற்பத்தி கலன் தயார்",
    sustainabilityHub: "ஏஐ சுற்றுச்சூழல் இணக்க ஆபத்து கண்டறிவி",
    copilotGreetings: "வணக்கம். நான் உங்கள் ரீவீவ் தொழில்துறை நுண்ணறிவு உதவியாளர். மூலக்கூறு சுத்திகரிப்பு மற்றும் பிராந்திய சுழற்சி பொருள் வரம்புகளை எவ்வாறு மேம்படுத்துவது என்று என்னிடம் கேளுங்கள்.",
    expertNetwork: "சுழற்சி தொழிலாளர் மற்றும் நிலைத்தன்மை உதவி நெட்வொர்க்",
    flows: "சுழற்சி ஓட்டம்",
    waterTwin: "நீர் இரட்டை பகுப்பாய்வு",
    recoveryCenter: "ஏஐ மீட்பு மையம்",
    manufacturing: "ஏஐ சுழற்சி உற்பத்தி",
    marketplace: "தொழில்துறை சந்தை",
    contracts: "ஒப்பந்தங்கள் மற்றும் டெண்டர்கள்",
    network: "சுற்றுச்சூழல் நெட்வொர்க்",
    monitoring: "செயலில் உள்ள கண்காணிப்பு",
    sandbox: "உருவகப்படுத்துதல் சாண்ட்பாக்ஸ்",
    copilot: "ஏஐ கோபைலட் அரட்டை",
    expertNetworkLink: "கூட்டுறவு நெட்வொர்க்",
    esg: "ஈஎஸ்ஜி மற்றும் இணக்கம்",
    supplyChain: "விநியோக சங்கிலி தகவல்",
    carbon: "கார்பன் பகுப்பாய்வு",
    notifications: "அறிவிப்பு பதிவு",
    settings: "அமைப்பு முறைகள்",
    coreOperations: "முக்கிய செயல்பாடுகள்",
    intelligence: "நுண்ணறிவு தளம்",
    esgAuditing: "ஈஎஸ்ஜி தணிக்கை",
    systemControl: "கணினி கட்டுப்பாடு",
    platformLanguage: "தளத்தின் மொழி"
  },
  gu: {
    dashboardTitle: "વર્તુળાકાર ઔદ્યોગિક ઇન્ટેલિજન્સ વર્કસ્પેસ",
    facility: "ઔદ્યોગિક સુવિધા",
    operator: "ઓપરેટર",
    nodeProtocol: "નોડ પ્રોટોકોલ",
    activeStreamTitle: "સક્રિય ઔદ્યોગિક કચરો પ્રવાહ",
    dragDropText: "મટીરીયલ રિપોર્ટ ફાઇલો અહીં ડ્રોપ કરો",
    recalcRoute: "શ્રેષ્ઠ પરિવહન માર્ગની પુનઃગણતરી કરો",
    decisionModule: "એઆઈ રિસાયક્લિંગ નિર્ણય કેન્દ્ર",
    autonomousVerdict: "સ્વાયત્ત નિદાન ચુકાદો",
    sellCredits: "પ્રમાણિત કાર્બન ક્રેડિટ વેચો",
    tendersTitle: "સ્વાયત્ત વર્તુળાકાર કરાર એન્જિન",
    innovationLabTitle: "એઆઈ વર્તુળાકાર મેન્યુફેક્ચરિંગ સ્ટુડિયો",
    synthesisReady: "એઆઈ મટીરીયલ સિન્થેસીસ ચેમ્બર તૈયાર છે",
    sustainabilityHub: "એઆઈ પર્યાવરણીય પાલન જોખમ સૂચક",
    copilotGreetings: "નમસ્કાર. હું આપનો રીવીવ ઔદ્યોગિક સહાયક છું. મોલેક્યુલર રિફાઇનિંગ અને પ્રાદેશિક કાચા માલના ભાવોને કેવી રીતે બહેતર બનાવવા તે મને પૂછો.",
    expertNetwork: "વર્તુળાકાર કાર્યબળ અને સ્થિરતા સહાય નેટવર્ક",
    flows: "વર્તુળાકાર પ્રવાહો",
    waterTwin: "વોટર ટ્વીન નિદાન",
    recoveryCenter: "એઆઈ રિકવરી સેન્ટર",
    manufacturing: "એઆઈ વર્તુળાકાર ઉત્પાદન",
    marketplace: "ઔદ્યોગિક બજાર",
    contracts: "ટેન્ડરો અને કરારો",
    network: "ઇકોસિસ્ટમ નેટવર્ક",
    monitoring: "લાઇવ મોનિટરિંગ",
    sandbox: "સિમ્યુલેશન સેન્ડબૉક્સ",
    copilot: "એઆઈ કોપાયલોટ ચેટ",
    expertNetworkLink: "સહકારી નેટવર્ક",
    esg: "ESG અને પાલન",
    supplyChain: "સપ્લાય ચેઈન ઇન્ટેલ",
    carbon: "કાર્બન એનાલિટિક્સ",
    notifications: "ચેતવણી સૂચના લોગ",
    settings: "સંસ્થા સેટિંગ્સ",
    coreOperations: "મુખ્ય કામગીરી",
    intelligence: "ઇન્ટેલિજન્સ",
    esgAuditing: "ESG ઓડિટિંગ",
    systemControl: "સિસ્ટમ નિયંત્રણ",
    platformLanguage: "પ્લેટફોર્મ ભાષા"
  }
};

export function CircularProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    email: 'operator@facility.com',
    fullName: 'Dr. Helen Vance',
    organization: 'Vance Textile Mills',
    role: 'manufacturer',
    isOnboarded: true,
  });

  const [language, setLanguage] = useState<GlobalLanguage>('en');

  // Multi-lingual translation lookup function
  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Pre-configured experts listing
  const [experts] = useState<CollaborationExpert[]>([
    { id: 'exp-1', name: 'Dr. Ramesh Kumar', type: 'EXPERT', specialty: 'Metallurgical Slag Aggregates', rate: '₹14,500/session', rating: '4.9', description: 'Retired Principal Scientist specializing in structural concrete casting ratios.' },
    { id: 'exp-2', name: 'Zero-Carbon India Foundation', type: 'NGO', specialty: 'Water Footprint Audits', rate: 'Subsidized NGO consulting', rating: '4.8', description: 'Provides low-cost workforce certifications on toxic chemical neutralization sequences.' },
    { id: 'exp-3', name: 'MoEFCC Green-Subsidy Portal', type: 'GOVERNMENT', specialty: 'SBTi Carbon Grants', rate: 'Free Government advisory', rating: '4.7', description: 'Guides state-level manufacturers to unlock state grants on waste-to-tile furnaces.' }
  ]);

  // Financial ROI state trackers in Indian Rupee (₹)
  const [ytdSavings, setYtdSavings] = useState(94000000); // ₹9.4 Crore
  const [avoidedCarbonTons, setAvoidedCarbonTons] = useState(14200); // 14.2k Tons
  const [recycledWaterGallons, setRecycledWaterGallons] = useState(2800000); // 2.8M Gal

  // Notifications state
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: '1',
      title: 'Operating System Restored',
      message: 'ReWeave Industrial AI OS core is online and connected to regional material networks.',
      type: 'success',
      timestamp: 'Just Now',
      read: false,
    }
  ]);

  // Waste Stream Database state
  const [wasteStreams, setWasteStreams] = useState<WasteStream[]>([
    {
      id: 'ws-1',
      name: 'Batch A-4 Acid Dye Rinse',
      ph: 4.8,
      cod: 1450,
      bod: 820,
      tds: 3200,
      turbidity: 42.5,
      contaminants: 'Azo dye compounds, Sulphur residue',
      dye_concentration: 12.5,
      sludge_percentage: 18.2,
      waste_category: 'Chemical Effluent',
      material_type: 'Liquid Scraps',
      quantity: 150, // tons
      temperature: 32,
      timestamp: '2 hours ago'
    },
    {
      id: 'ws-2',
      name: 'Facility Slag Concentrates',
      ph: 8.4,
      cod: 110,
      bod: 30,
      tds: 8400,
      turbidity: 95.0,
      contaminants: 'Zinc oxides, Iron slag',
      dye_concentration: 0,
      sludge_percentage: 84.5,
      waste_category: 'Solid Smelter Slag',
      material_type: 'Slag Scraps',
      quantity: 240, // tons
      temperature: 110,
      timestamp: 'Yesterday'
    }
  ]);

  const [activeStream, setActiveStream] = useState<WasteStream | null>(null);
  const [activeScores, setActiveScores] = useState<FeasibilityScores | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionStatus, setIngestionStatus] = useState('');

  // Raw Segregated Materials listing
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([
    { id: 'raw-1', name: 'High-Density Smelter Slag', category: 'Metallurgical Residue', volume: '150 Tons', consistency: 92, ph: 8.2, purity: 89, contamination: 11, isGenerated: false },
    { id: 'raw-2', name: 'Acid Rinse Wash Fluid', category: 'Chemical Effluent', volume: '45,000 Liters', consistency: 85, ph: 4.5, purity: 74, contamination: 26, isGenerated: false },
    { id: 'raw-3', name: 'Cellulose Pulp Fiber Residue', category: 'Organic Fiber pulp', volume: '80 Tons', consistency: 78, ph: 6.8, purity: 91, contamination: 9, isGenerated: false },
    { id: 'raw-4', name: 'Coal Fly Ash Residue', category: 'Smelter Fly Ash', volume: '200 Tons', consistency: 89, ph: 9.1, purity: 82, contamination: 18, isGenerated: false }
  ]);

  // Generated Product Innovation state
  const [generatedProducts, setGeneratedProducts] = useState<GeneratedProduct[]>([
    {
      id: 'gp-1',
      name: 'High-Strength Bio-Brick Cures',
      sourceStreamId: 'ws-2',
      feasibilityScore: 94,
      profitability: 85,
      marketDemand: 92,
      machineryRequirement: 'Rotary Curing Kiln v4, Density Presses',
      workforceRequirement: '2 Certified Material Technicians per stream',
      carbonReduction: '184 Metric Tons per batch',
      nearbyBuyers: ['GeoBuild Infrastructure Ltd', 'Apex Cements'],
      estimatedMarketValue: '₹18,500 per ton',
      estimatedROI: '+142%',
      scalabilityPotential: 'Global standard certification achievable',
      treatmentDependency: 'Low chemical neutralization required',
      isSaved: false,
      isListed: false,
      
      activeWorkflowStep: 'IDLE',
      workflowProgress: 0,
      isWorkflowActive: false,
      molecularConsistency: '94% Nominal Sieve alignment',
      curingPhase: 'Prepress dehydration phase complete',
      marketTrendUpdates: [
        'Sourced Raw Cost: ₹4,500/T',
        'Repurposed Bio-Value: ₹18,500/T',
        'Net Margin Profitability: +311%'
      ]
    },
    {
      id: 'gp-2',
      name: 'Acoustic Soundproofing Insulation Panels',
      sourceStreamId: 'ws-1',
      feasibilityScore: 82,
      profitability: 74,
      marketDemand: 80,
      machineryRequirement: 'Fibre Extraction Looms, Needlepunch presses',
      workforceRequirement: '3 general warehouse operators',
      carbonReduction: '85 Metric Tons per batch',
      nearbyBuyers: ['SoundSeal Architectural', 'VibeFree Studios'],
      estimatedMarketValue: '₹3,800 per panel',
      estimatedROI: '+95%',
      scalabilityPotential: 'High commercial fit for architectural specifications',
      treatmentDependency: 'Medium dye extraction required',
      isSaved: false,
      isListed: false,
      
      activeWorkflowStep: 'IDLE',
      workflowProgress: 0,
      isWorkflowActive: false,
      molecularConsistency: '82% Porous expansion consistency',
      curingPhase: 'Dry thermal compression complete',
      marketTrendUpdates: [
        'Sourced Raw Cost: ₹1,200/unit',
        'Repurposed Value: ₹3,800/unit',
        'Net Margin Profitability: +216%'
      ]
    }
  ]);

  // Marketplace listings state (Prices in INR ₹)
  const [listings, setListings] = useState<MarketplaceListing[]>([
    {
      id: 'm-1',
      title: 'High-Density Steel Slag Concentrates',
      type: 'WASTE',
      ownerOrg: 'Facility Alpha Smelting',
      ownerRole: 'manufacturer',
      material: 'Smelter Slag Scraps',
      volume: '120 Tons',
      basePrice: '₹9,50,000',
      currentBid: '₹14,20,000',
      bidsCount: 4,
      highestBidder: 'EcoBrick Manufacturing',
      recoveryScore: 85,
      logisticsComplexity: 'Medium transport frames',
      sustainabilityImpact: '+120 avoidance score',
      timestamp: '4 hours ago',
      isPartnershipRequested: false
    },
    {
      id: 'm-2',
      title: 'Alkaline Wash Stream Recovery Contract',
      type: 'CONTRACT',
      ownerOrg: 'DyeFlow Textiles',
      ownerRole: 'manufacturer',
      material: 'Chemical Wash Liquid',
      volume: '24,00,000 Liters',
      basePrice: '₹3,20,000',
      currentBid: '₹3,25,000',
      bidsCount: 1,
      highestBidder: 'ChemSeparation Corp',
      recoveryScore: 92,
      logisticsComplexity: 'Specialized tankers needed',
      sustainabilityImpact: '+320 freshwater units',
      timestamp: 'Yesterday',
      isPartnershipRequested: false
    }
  ]);

  // Ecosystem nodes
  const [networkNodes, setNetworkNodes] = useState<CircularNetworkNode[]>([
    { id: 'n-1', name: 'Dr. Helen Vance (You)', role: 'manufacturer', distance: '0 km', compatibility: 100, matchReason: 'Self Node', coordinates: { x: 50, y: 50 } },
    { id: 'n-2', name: 'EcoBrick Inc.', role: 'recycler', distance: '12 km', compatibility: 94, matchReason: 'Ideal for Sludge and Slag treatment', coordinates: { x: 30, y: 35 } },
    { id: 'n-3', name: 'SoundSeal Architectural', role: 'buyer', distance: '28 km', compatibility: 88, matchReason: 'Procures acoustic fibres and insulation panels', coordinates: { x: 75, y: 65 } },
    { id: 'n-4', name: 'ChemSeparation Partners', role: 'treatment', distance: '45 km', compatibility: 91, matchReason: 'Equipped with chemical neutralization reactors', coordinates: { x: 60, y: 20 } },
    { id: 'n-5', name: 'Apex Cements', role: 'buyer', distance: '18 km', compatibility: 96, matchReason: 'Procures cured fly-ash and smelting byproducts', coordinates: { x: 20, y: 80 } }
  ]);

  const [selectedNode, setSelectedNode] = useState<CircularNetworkNode | null>(null);

  // Copilot message state
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: TRANSLATIONS[language]?.copilotGreetings || TRANSLATIONS['en'].copilotGreetings,
      timestamp: 'Just Now'
    }
  ]);
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);

  // Load the first stream automatically as active
  useEffect(() => {
    if (wasteStreams.length > 0 && !activeStream) {
      setActiveStreamById(wasteStreams[0].id);
    }
  }, [wasteStreams]);

  // Sync greetings when language changes
  useEffect(() => {
    setCopilotMessages([
      {
        id: 'm-init',
        sender: 'assistant',
        text: TRANSLATIONS[language]?.copilotGreetings || TRANSLATIONS['en'].copilotGreetings,
        timestamp: 'Just Now'
      }
    ]);
  }, [language]);

  const setActiveStreamById = (id: string) => {
    const stream = wasteStreams.find(s => s.id === id);
    if (stream) {
      setActiveStream(stream);
      const calculatedScores = calculateMetricsForStream(stream);
      setActiveScores(calculatedScores);
    }
  };

  // 15 Advanced ML Diagnostic Scores implementation (simulating XGBoost/LightGBM model weights)
  const calculateMetricsForStream = (stream: WasteStream): FeasibilityScores => {
    const penalty = (stream.ph < 5 || stream.ph > 9) ? 15 : 0;
    
    const recoveryFeasibility = Math.min(98, Math.max(40, Math.round(95 - (stream.tds / 1200) - penalty)));
    const circularFlowScore = Math.min(99, Math.max(35, Math.round(92 - (stream.turbidity / 4))));
    const sustainabilityImpact = Math.min(98, Math.max(40, Math.round(84 + (stream.bod / 120))));
    const toxicityRisk = Math.min(99, Math.max(5, Math.round((stream.ph < 5 ? 85 : 20) + (stream.dye_concentration * 3))));
    const infrastructureDependency = Math.min(95, Math.max(10, Math.round(operationalComplexityCalc(stream) * 1.15)));
    const waterRecoveryEfficiency = Math.min(98, Math.max(25, Math.round(100 - (stream.tds / 200))));
    const industrialReusability = Math.min(96, Math.max(30, Math.round(88 - penalty)));
    const resourceRecovery = Math.min(97, Math.max(20, Math.round(75 + (stream.sludge_percentage / 3))));
    const carbonOffsetPotential = Math.min(99, Math.max(15, Math.round(80 + (stream.quantity / 15))));
    const buyerDemand = Math.min(95, Math.max(40, Math.round(92 - (stream.turbidity / 5))));
    const treatmentComplexity = Math.min(99, Math.max(10, Math.round(operationalComplexityCalc(stream))));
    const logisticsComplexity = Math.min(95, Math.max(20, Math.round(30 + (stream.sludge_percentage / 2.5))));
    const industrialScalability = Math.min(98, Math.max(30, Math.round(94 - (stream.ph < 5 ? 20 : 0))));
    const esgComplianceReadiness = Math.min(99, Math.max(40, Math.round(100 - toxicityRisk)));
    const hazardProbability = Math.min(99, Math.max(2, Math.round(toxicityRisk * 0.85)));

    return {
      recoveryFeasibility,
      circularFlowScore,
      sustainabilityImpact,
      toxicityRisk,
      infrastructureDependency,
      waterRecoveryEfficiency,
      industrialReusability,
      resourceRecovery,
      carbonOffsetPotential,
      buyerDemand,
      treatmentComplexity,
      logisticsComplexity,
      industrialScalability,
      esgComplianceReadiness,
      hazardProbability
    };
  };

  const operationalComplexityCalc = (stream: WasteStream) => {
    return Math.round((stream.sludge_percentage * 0.7) + (stream.dye_concentration * 1.8));
  };

  // CSV Ingestion simulation
  const ingestWasteStream = (streamData: Partial<WasteStream>) => {
    setIsIngesting(true);
    setIngestionStatus('Deploying XGBoost material diagnostic arrays...');

    setTimeout(() => {
      setIngestionStatus('Clustering physical composition streams...');
      
      setTimeout(() => {
        setIngestionStatus('Locking digital water twin metrics on secure ledger...');
        
        setTimeout(() => {
          const newStream: WasteStream = {
            id: 'ws-' + Date.now(),
            name: streamData.name || 'Stream Manifest Array',
            ph: streamData.ph || 7.2,
            cod: streamData.cod || 150,
            bod: streamData.bod || 50,
            tds: streamData.tds || 400,
            turbidity: streamData.turbidity || 12.0,
            contaminants: streamData.contaminants || 'Silicon microparticles, suspended silts',
            dye_concentration: streamData.dye_concentration || 0,
            sludge_percentage: streamData.sludge_percentage || 15.0,
            waste_category: streamData.waste_category || 'Industrial Water Stream',
            material_type: streamData.material_type || 'Silica Wash Byproducts',
            quantity: streamData.quantity || 180,
            temperature: streamData.temperature || 24,
            timestamp: 'Just Now'
          };

          setWasteStreams(prev => [newStream, ...prev]);
          setActiveStream(newStream);
          
          const scores = calculateMetricsForStream(newStream);
          setActiveScores(scores);

          setYtdSavings(prev => prev + 3500000);
          setAvoidedCarbonTons(prev => prev + 180);
          setRecycledWaterGallons(prev => prev + 120000);

          const isChemical = newStream.waste_category.toLowerCase().includes('chemical') || newStream.ph < 6;
          const newProduct: GeneratedProduct = {
            id: 'gp-' + Date.now(),
            name: isChemical ? 'Refined Dye-Extract Structural Compound' : 'Dense Eco-Concrete Structural Block',
            sourceStreamId: newStream.id,
            feasibilityScore: scores.recoveryFeasibility,
            profitability: scores.circularFlowScore,
            marketDemand: scores.buyerDemand,
            machineryRequirement: isChemical ? 'Molecular Acid Filters, pH Balancing Buffers' : 'Solid Agglomeration Presses, Dense Kilns',
            workforceRequirement: '2 Specialized Chemical Engineers',
            carbonReduction: `${Math.round(newStream.quantity * 0.8)} Metric Tons`,
            nearbyBuyers: isChemical ? ['ChemSeparation Partners'] : ['GeoBuild Infrastructure Ltd', 'Apex Cements'],
            estimatedMarketValue: isChemical ? '₹36,000 per ton' : '₹6,400 per batch',
            estimatedROI: `+145%`,
            scalabilityPotential: 'High industrial compatibility with modern architectural foundations',
            treatmentDependency: scores.treatmentComplexity > 60 ? 'Critical high-neutralization treatment required' : 'Low secondary buffering required',
            isSaved: false,
            isListed: false,
            activeWorkflowStep: 'IDLE',
            workflowProgress: 0,
            isWorkflowActive: false,
            molecularConsistency: '91% Compact density rating',
            curingPhase: 'Initial curing phase ready',
            marketTrendUpdates: [
              'Sourced Raw Cost: ₹1,500/T',
              'Repurposed Value: ₹6,400/T',
              'Net Margin Profitability: +326%'
            ]
          };

          setGeneratedProducts(prev => [newProduct, ...prev]);

          addNotification(
            'Ingestion & Matching Matrix Complete',
            `Successfully processed "${newStream.name}". Generated matching product concept "${newProduct.name}" in the Innovation Lab.`,
            'success'
          );

          setIsIngesting(false);
          setIngestionStatus('Nominal connection stable.');
        }, 800);
      }, 800);
    }, 800);
  };

  const generateProductFromMaterial = (materialId: string, name: string, decidedPrice: string) => {
    const raw = rawMaterials.find(r => r.id === materialId);
    if (raw) {
      setRawMaterials(prev => prev.map(item => item.id === materialId ? { ...item, isGenerated: true } : item));
      
      const newProduct: GeneratedProduct = {
        id: 'gp-' + Date.now(),
        name: name,
        sourceStreamId: raw.id,
        feasibilityScore: raw.consistency,
        profitability: Math.round(raw.consistency * 0.9),
        marketDemand: Math.round(raw.consistency * 0.95),
        machineryRequirement: 'Agglomeration Curing Furnaces, Hydraulic Compacting Press',
        workforceRequirement: '1 Material Scientist, 2 Plant Operators',
        carbonReduction: '124 Metric Tons per cycle',
        nearbyBuyers: ['GeoBuild Infrastructure Ltd', 'Apex Cements'],
        estimatedMarketValue: decidedPrice.startsWith('₹') ? decidedPrice : `₹${decidedPrice} per batch`,
        estimatedROI: '+156%',
        scalabilityPotential: 'Excellent structural load-bearing consistency',
        treatmentDependency: raw.ph < 6 || raw.ph > 8 ? 'Acid neutralization sequence required' : 'Direct thermal casting compatible',
        isSaved: true,
        isListed: false,
        activeWorkflowStep: 'IDLE',
        workflowProgress: 0,
        isWorkflowActive: false,
        molecularConsistency: `${raw.consistency}% Molecular Lattice integrity`,
        curingPhase: 'Hydraulic pressing complete, ready for casting kiln',
        marketTrendUpdates: [
          `Decided Sourced Cost: ₹3,200/T`,
          `Configured Market Value: ${decidedPrice}`,
          `Estimated Net Profitability Margin: +280%`
        ]
      };

      setGeneratedProducts(prev => [newProduct, ...prev]);
      addNotification('Material Product Synthesized', `Directly formulated "${name}" from raw ${raw.name} at ${decidedPrice}.`, 'success');
    }
  };

  const addNotification = (title: string, message: string, type: SystemNotification['type']) => {
    const notif: SystemNotification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      type,
      timestamp: 'Just Now',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const saveProduct = (id: string) => {
    setGeneratedProducts(prev => prev.map(p => p.id === id ? { ...p, isSaved: true } : p));
    addNotification('Concept Saved', 'Circular product blueprint saved to facility catalog.', 'success');
  };

  const listProductOnMarketplace = (id: string, initialPrice: string) => {
    setGeneratedProducts(prev => prev.map(p => p.id === id ? { ...p, isListed: true } : p));
    const prod = generatedProducts.find(p => p.id === id);
    if (prod) {
      const formattedPrice = initialPrice.startsWith('₹') ? initialPrice : `₹${initialPrice}`;
      const newListing: MarketplaceListing = {
        id: 'm-' + Date.now(),
        title: `Recovered ${prod.name}`,
        type: 'PRODUCT',
        ownerOrg: user?.organization || 'Active Operator',
        ownerRole: user?.role || 'manufacturer',
        material: prod.name,
        volume: '100 Batches',
        basePrice: formattedPrice,
        currentBid: formattedPrice,
        bidsCount: 0,
        recoveryScore: prod.feasibilityScore,
        logisticsComplexity: 'Standard palettes',
        sustainabilityImpact: prod.carbonReduction,
        timestamp: 'Just Now',
        isPartnershipRequested: false
      };
      setListings(prev => [newListing, ...prev]);
      addNotification('Marketplace Listing Created', `Product "${prod.name}" is now bidding active!`, 'success');
    }
  };

  const updateCustomProductSpecs = (id: string, ratio: number, purity: number, marketPrice: string, complexity: number) => {
    setGeneratedProducts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          customRatio: ratio,
          customPurity: purity,
          customMarketPrice: marketPrice,
          customComplexity: complexity,
          estimatedMarketValue: marketPrice,
          feasibilityScore: Math.round(p.feasibilityScore * (purity / 100))
        };
      }
      return p;
    }));
    addNotification('Product Specs Calibrated', 'Custom composition and market price updated on matching catalog.', 'success');
  };

  const startRecoveryWorkflow = (id: string) => {
    setGeneratedProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isWorkflowActive: true, activeWorkflowStep: 'SEGREGATING RAW FEEDS' };
      }
      return p;
    }));
    
    addNotification('Workflow Triggered', 'Material physical sorting matrices initialized on conveyor arrays...', 'info');

    setTimeout(() => {
      setGeneratedProducts(prev => prev.map(p => {
        if (p.id === id) {
          return { ...p, workflowProgress: 35, activeWorkflowStep: 'THERMAL CASTING & CURING' };
        }
        return p;
      }));
      addNotification('Thermal Curing Online', 'Vacuum compaction presses are operating under nominal hydraulic load.', 'info');

      setTimeout(() => {
        setGeneratedProducts(prev => prev.map(p => {
          if (p.id === id) {
            return { ...p, workflowProgress: 75, activeWorkflowStep: 'COMPRESSIVE STRENGTH TESTING' };
          }
          return p;
        }));
        addNotification('Testing Compressive Lattice', 'Verifying molecular sieve consistency metrics...', 'info');

        setTimeout(() => {
          setGeneratedProducts(prev => prev.map(p => {
            if (p.id === id) {
              return { ...p, workflowProgress: 100, activeWorkflowStep: 'COMPLETE - BLUEPRINT LOADED' };
            }
            return p;
          }));
          addNotification('Circular Material Cast Complete', 'Successfully finalized and structural test certified.', 'success');
        }, 1500);

      }, 1500);

    }, 1500);
  };

  const placeBidOnListing = (id: string, amount: number, bidderName: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          currentBid: `₹${amount.toLocaleString()}`,
          bidsCount: item.bidsCount + 1,
          highestBidder: bidderName
        };
      }
      return item;
    }));
    addNotification('Bid Processed Successfully', `Bidding lock secured for ₹${amount.toLocaleString()}`, 'success');
  };

  const createMarketplaceListing = (listingData: Partial<MarketplaceListing>) => {
    const basePriceStr = listingData.basePrice || '₹4,00,000';
    const newList: MarketplaceListing = {
      id: 'm-' + Date.now(),
      title: listingData.title || 'Material Tender',
      type: listingData.type || 'WASTE',
      ownerOrg: user?.organization || 'Active Facility',
      ownerRole: user?.role || 'manufacturer',
      material: listingData.material || 'Mixed Streams',
      volume: listingData.volume || '50 Tons',
      basePrice: basePriceStr,
      currentBid: basePriceStr,
      bidsCount: 0,
      recoveryScore: listingData.recoveryScore || 80,
      logisticsComplexity: listingData.logisticsComplexity || 'Standard freight container',
      sustainabilityImpact: listingData.sustainabilityImpact || '+100 Eco Score',
      timestamp: 'Just Now',
      isPartnershipRequested: false
    };
    setListings(prev => [newList, ...prev]);
    addNotification('Tender / Contract Listed', `Opportunity "${newList.title}" posted to the Industrial network.`, 'success');
  };

  const togglePartnershipOnListing = (id: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.isPartnershipRequested;
        if (nextState) {
          addNotification(
            'Partnership Initiated',
            `Circular contract request broadcasted to "${item.ownerOrg}" node operator for ${item.title}.`,
            'success'
          );
        } else {
          addNotification(
            'Partnership Revoked',
            `Withdrew bilateral circular partnership request for ${item.title}.`,
            'warning'
          );
        }
        return { ...item, isPartnershipRequested: nextState };
      }
      return item;
    }));
  };

  const requestCollaboration = (expertId: string) => {
    const exp = experts.find(e => e.id === expertId);
    if (exp) {
      addNotification(
        'Collaboration Requested',
        `Partnership proposal submitted to ${exp.name} for technical resource support.`,
        'success'
      );
    }
  };

  const loginUser = (email: string, role: UserRole) => {
    const nameMap: Record<UserRole, string> = {
      manufacturer: 'Dr. Helen Vance',
      buyer: 'Clara Oswald',
      recycler: 'Chief Engineer Marcus Flint',
      treatment: 'Dr. Evelyn Brand',
      sustainability: 'Director Samira Carter',
      government: 'Commissioner Rahul Sharma',
      middleman: 'Logistics Lead Jayesh Patel',
      admin: 'Sysop Antigravity'
    };

    const orgMap: Record<UserRole, string> = {
      manufacturer: 'Vance Textile Mills',
      buyer: 'SoundSeal Architectural',
      recycler: 'EcoBrick Smelting',
      treatment: 'ChemSeparation Partners',
      sustainability: 'ZeroCarbon Alliance NGO',
      government: 'Ministry of Circular Economy (MoEFCC)',
      middleman: 'Decentralized Freight Logistics',
      admin: 'ReWeave AI Core Ops'
    };

    setUser({
      email,
      fullName: nameMap[role],
      organization: orgMap[role],
      role,
      isOnboarded: true
    });
    addNotification('Identity Secured', `Welcome back, ${nameMap[role]} (${orgMap[role]}).`, 'success');
  };

  const registerUser = (fullName: string, email: string, organization: string, role: UserRole) => {
    setUser({
      email,
      fullName,
      organization,
      role,
      isOnboarded: false
    });
  };

  const onboardOrganization = (details: { industryType: string; facilitiesCount: number; location: string }) => {
    if (user) {
      setUser({ ...user, isOnboarded: true });
      addNotification('Onboarding Completed', `Facility "${user.organization}" is now mapping regional nodes.`, 'success');
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Multilingual, role-aware copilot messaging
  const sendCopilotMessage = (text: string) => {
    const userMsg: CopilotMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just Now'
    };
    setCopilotMessages(prev => [...prev, userMsg]);
    setIsCopilotThinking(true);

    setTimeout(() => {
      let botResponse = '';
      const query = text.toLowerCase();

      // Multilingual localized terms
      const isHindi = language === 'hi';
      const isTamil = language === 'ta';
      const isGujarati = language === 'gu';

      if (query.includes('waste') || query.includes('stream') || query.includes('material')) {
        if (activeStream) {
          if (isHindi) {
            botResponse = `समझा गया। "${activeStream.name}" के ${activeStream.quantity} टन का विश्लेषण। आणविक रासायनिक सूचकांकों के अनुसार, COD ${activeStream.cod} mg/L और TDS ${activeStream.tds} mg/L है। सघन पृथक्करण प्रक्रियाओं को लागू किया जाना चाहिए।`;
          } else if (isTamil) {
            botResponse = `புரிந்து கொள்ளப்பட்டது. "${activeStream.name}" இன் பகுப்பாய்வு. இரசாயன குறியீடுகளின்படி, COD ${activeStream.cod} mg/L மற்றும் TDS ${activeStream.tds} mg/L ஆகும். மூலக்கூறு பிரிப்பு வழிமுறைகளை பயன்படுத்த வேண்டும்.`;
          } else if (isGujarati) {
            botResponse = `સમજાયું. "${activeStream.name}" ના ${activeStream.quantity} ટનનું વિશ્લેષણ. મોલેક્યુલર કેમિકલ ઇન્ડેક્સ મુજબ, COD ${activeStream.cod} mg/L અને TDS ${activeStream.tds} mg/L છે. કૃપા કરીને રીસાયક્લિંગ પ્રક્રિયા સક્રિય કરો.`;
          } else {
            botResponse = `Understood. Analyzing "${activeStream.name}" of ${activeStream.quantity} tons. Based on chemical indices, COD is at ${activeStream.cod} mg/L and TDS at ${activeStream.tds} mg/L. The turbidity rating indicates specialized separation pathways should be deployed.`;
          }
        } else {
          botResponse = `Please select or upload a waste stream manifest. Once ingested, I will output precise molecular fractions.`;
        }
      } else if (query.includes('roi') || query.includes('money') || query.includes('profit') || query.includes('rupee')) {
        if (activeScores) {
          if (isHindi) {
            botResponse = `वित्तीय विश्लेषण: आपके चक्रीय प्रवाह का आर्थिक व्यवहार्यता सूचकांक ${activeScores.circularFlowScore}% है। कुल संचित बचत ₹${(ytdSavings/10000000).toFixed(2)} करोड़ है।`;
          } else if (isTamil) {
            botResponse = `நிதி பகுப்பாய்வு: உங்கள் சுழற்சி பொருளாதார செயல்திறன் ${activeScores.circularFlowScore}% ஆகும். ஒட்டுமொத்த சேமிப்பு ₹${(ytdSavings/10000000).toFixed(2)} கோடி ஆகும்.`;
          } else if (isGujarati) {
            botResponse = `નાણાકીય વિશ્લેષણ: તમારા વર્તુળાકાર પ્રવાહની આર્થિક કાર્યક્ષમતા ${activeScores.circularFlowScore}% છે. કુલ બચત ₹${(ytdSavings/10000000).toFixed(2)} કરોડ છે.`;
          } else {
            botResponse = `Financial telemetry suggests an active Circular Flow Score of ${activeScores.circularFlowScore}% and Buyer Demand index of ${activeScores.buyerDemand}%. Sourced savings track at ₹${(ytdSavings/10000000).toFixed(2)} Crore.`;
          }
        } else {
          botResponse = `Our financial recovery engine models ROI utilizing logistics complexity, machinery capital expenses, and regional procurement indices.`;
        }
      } else if (query.includes('expert') || query.includes('ngo') || query.includes('workforce') || query.includes('government')) {
        botResponse = `You can directly engage with our Circular Workforce & Sustainability Assistance Network. NGOs like Zero-Carbon India Foundation offer subsidized training programs for plant staff, and technical consultants guide structural casting setups.`;
      } else {
        botResponse = `System is monitoring the Industrial Supply chain matrix. We can initiate molecular separation modeling, generate circular products, browse active biddings on the exchange, or review carbon avoidance compliance certificates. What circular protocol should we initiate?`;
      }

      const assistantMsg: CopilotMessage = {
        id: 'm-bot-' + Date.now(),
        sender: 'assistant',
        text: botResponse,
        timestamp: 'Just Now'
      };
      setCopilotMessages(prev => [...prev, assistantMsg]);
      setIsCopilotThinking(false);
    }, 1000);
  };

  return (
    <CircularContext.Provider value={{
      user,
      loginUser,
      registerUser,
      onboardOrganization,
      logout,
      language,
      setLanguage,
      t,
      wasteStreams,
      activeStream,
      setActiveStreamById,
      ingestWasteStream,
      isIngesting,
      ingestionStatus,
      rawMaterials,
      generateProductFromMaterial,
      activeScores,
      generatedProducts,
      saveProduct,
      listProductOnMarketplace,
      startRecoveryWorkflow,
      updateCustomProductSpecs,
      listings,
      placeBidOnListing,
      createMarketplaceListing,
      togglePartnershipOnListing,
      networkNodes,
      selectedNode,
      setSelectedNode,
      experts,
      requestCollaboration,
      copilotMessages,
      sendCopilotMessage,
      isCopilotThinking,
      notifications,
      markNotificationAsRead,
      addNotification,
      ytdSavings,
      avoidedCarbonTons,
      recycledWaterGallons
    }}>
      {children}
    </CircularContext.Provider>
  );
}

export function useCircular() {
  const context = useContext(CircularContext);
  if (context === undefined) {
    throw new Error('useCircular must be used within a CircularProvider');
  }
  return context;
}
