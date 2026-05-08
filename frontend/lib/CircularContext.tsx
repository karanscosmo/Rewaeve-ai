'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Definitions for the Industrial Circular Intelligence Ecosystem

export type UserRole = 'manufacturer' | 'recycler' | 'buyer' | 'treatment' | 'sustainability' | 'admin';

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

export interface FeasibilityScores {
  recoveryFeasibility: number;
  profitability: number;
  operationalComplexity: number;
  workforceRequirement: number;
  machineryCompatibility: number;
  treatmentDependency: number;
  logisticsComplexity: number;
  circularityScore: number;
  sustainabilityImpact: number;
  resalePotential: number;
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

interface CircularContextType {
  // Authentication & Onboarding
  user: User | null;
  loginUser: (email: string, role: UserRole) => void;
  registerUser: (fullName: string, email: string, organization: string, role: UserRole) => void;
  onboardOrganization: (details: { industryType: string; facilitiesCount: number; location: string }) => void;
  logout: () => void;

  // Waste Stream Ingestion
  wasteStreams: WasteStream[];
  activeStream: WasteStream | null;
  setActiveStreamById: (id: string) => void;
  ingestWasteStream: (stream: Partial<WasteStream>) => void;
  isIngesting: boolean;
  ingestionStatus: string;

  // Feasibility & Scores
  activeScores: FeasibilityScores | null;

  // Product Innovation Lab
  generatedProducts: GeneratedProduct[];
  saveProduct: (id: string) => void;
  listProductOnMarketplace: (id: string, initialPrice: string) => void;
  startRecoveryWorkflow: (id: string) => void;

  // Industrial Marketplace
  listings: MarketplaceListing[];
  placeBidOnListing: (id: string, amount: number, bidderName: string) => void;
  createMarketplaceListing: (listing: Partial<MarketplaceListing>) => void;

  // Ecosystem & Supply Chain Matching
  networkNodes: CircularNetworkNode[];
  selectedNode: CircularNetworkNode | null;
  setSelectedNode: (node: CircularNetworkNode | null) => void;

  // AI Copilot
  copilotMessages: CopilotMessage[];
  sendCopilotMessage: (text: string) => void;
  isCopilotThinking: boolean;

  // Notifications
  notifications: SystemNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, type: SystemNotification['type']) => void;

  // Financial ROI Tracker
  ytdSavings: number;
  avoidedCarbonTons: number;
  recycledWaterGallons: number;
}

const CircularContext = createContext<CircularContextType | undefined>(undefined);

export function CircularProvider({ children }: { children: React.ReactNode }) {
  // Simulated initial logged-in state (Manufacturer defaults)
  const [user, setUser] = useState<User | null>({
    email: 'operator@facility.com',
    fullName: 'Dr. Helen Vance',
    organization: 'Vance Textile Mills',
    role: 'manufacturer',
    isOnboarded: true,
  });

  // Notifications state
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: '1',
      title: 'Operating System Restored',
      message: 'ReWeave Industrial AI OS core is online and connected to regional material networks.',
      type: 'success',
      timestamp: 'Just Now',
      read: false,
    },
    {
      id: '2',
      title: 'Ecosystem Match Found',
      message: 'Eco-Brick Inc. added a high-priority procurement bid on Sludge Waste batches.',
      type: 'info',
      timestamp: '2 hours ago',
      read: false,
    }
  ]);

  // Financial ROI state trackers
  const [ytdSavings, setYtdSavings] = useState(1240000); // $1.24M
  const [avoidedCarbonTons, setAvoidedCarbonTons] = useState(14200); // 14.2k Tons
  const [recycledWaterGallons, setRecycledWaterGallons] = useState(2800000); // 2.8M Gal

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
      estimatedMarketValue: '$240 per ton',
      estimatedROI: '+142%',
      scalabilityPotential: 'Global standard certification achievable',
      treatmentDependency: 'Low chemical neutralization required',
      isSaved: false,
      isListed: false
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
      estimatedMarketValue: '$45 per panel',
      estimatedROI: '+95%',
      scalabilityPotential: 'High commercial fit for architectural specifications',
      treatmentDependency: 'Medium dye extraction required',
      isSaved: false,
      isListed: false
    }
  ]);

  // Marketplace listings state
  const [listings, setListings] = useState<MarketplaceListing[]>([
    {
      id: 'm-1',
      title: 'High-Density Steel Slag Concentrates',
      type: 'WASTE',
      ownerOrg: 'Facility Alpha Smelting',
      ownerRole: 'manufacturer',
      material: 'Smelter Slag Scraps',
      volume: '120 Tons',
      basePrice: '$12,000',
      currentBid: '$18,500',
      bidsCount: 4,
      highestBidder: 'EcoBrick Manufacturing',
      recoveryScore: 85,
      logisticsComplexity: 'Medium transport frames',
      sustainabilityImpact: '+120 avoidance score',
      timestamp: '4 hours ago'
    },
    {
      id: 'm-2',
      title: 'Alkaline Wash Stream Recovery Contract',
      type: 'CONTRACT',
      ownerOrg: 'DyeFlow Textiles',
      ownerRole: 'manufacturer',
      material: 'Chemical Wash Liquid',
      volume: '24,000 Liters',
      basePrice: '$4,200',
      currentBid: '$4,210',
      bidsCount: 1,
      highestBidder: 'ChemSeparation Corp',
      recoveryScore: 92,
      logisticsComplexity: 'Specialized tankers needed',
      sustainabilityImpact: '+320 freshwater units',
      timestamp: 'Yesterday'
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
      text: 'Greetings. I am your ReWeave Industrial Intelligence Copilot. Stream telemetry arrays or upload industrial waste manifests, and I will instantly map your chemical profiles, generate carbon-avoidance logs, formulate premium reuse models, and match high-bidding circular buyers.',
      timestamp: 'Just Now'
    }
  ]);
  const [isCopilotThinking, setIsCopilotThinking] = useState(false);

  // Load the first stream automatically as the active stream
  useEffect(() => {
    if (wasteStreams.length > 0 && !activeStream) {
      setActiveStreamById(wasteStreams[0].id);
    }
  }, [wasteStreams]);

  const setActiveStreamById = (id: string) => {
    const stream = wasteStreams.find(s => s.id === id);
    if (stream) {
      setActiveStream(stream);
      // Calculate dynamic scores based on parameters
      const calculatedScores = calculateMetricsForStream(stream);
      setActiveScores(calculatedScores);
    }
  };

  // Helper score calculator
  const calculateMetricsForStream = (stream: WasteStream): FeasibilityScores => {
    // Generate scores utilizing physical values in the stream
    const penalty = (stream.ph < 5 || stream.ph > 9) ? 15 : 0;
    const contaminationPenalty = stream.contaminants.length > 20 ? 10 : 0;
    
    const recoveryFeasibility = Math.min(98, Math.max(40, Math.round(95 - (stream.tds / 1000) - penalty)));
    const profitability = Math.min(95, Math.max(30, Math.round(88 - (stream.turbidity / 3) - (stream.cod / 400))));
    const operationalComplexity = Math.min(99, Math.max(10, Math.round((stream.sludge_percentage * 0.8) + (stream.dye_concentration * 2) + penalty)));
    const workforceRequirement = Math.min(95, Math.max(20, Math.round(45 + (stream.quantity / 10))));
    const machineryCompatibility = Math.min(99, Math.max(30, Math.round(100 - operationalComplexity)));
    const treatmentDependency = Math.min(99, Math.max(10, Math.round(operationalComplexity * 1.1)));
    const logisticsComplexity = Math.min(95, Math.max(20, Math.round(30 + (stream.sludge_percentage / 2))));
    const circularityScore = Math.min(99, Math.max(40, Math.round((recoveryFeasibility + profitability) / 2)));
    const sustainabilityImpact = Math.min(98, Math.max(35, Math.round(circularityScore * 1.05)));
    const resalePotential = Math.min(96, Math.max(25, Math.round(profitability * 1.1)));

    return {
      recoveryFeasibility,
      profitability,
      operationalComplexity,
      workforceRequirement,
      machineryCompatibility,
      treatmentDependency,
      logisticsComplexity,
      circularityScore,
      sustainabilityImpact,
      resalePotential
    };
  };

  // CSV/Report Ingestion Pipeline
  const ingestWasteStream = (streamData: Partial<WasteStream>) => {
    setIsIngesting(true);
    setIngestionStatus('Calibrating neural parsing matrices...');

    setTimeout(() => {
      setIngestionStatus('Analyzing molecular chemical contamination layers...');
      
      setTimeout(() => {
        setIngestionStatus('Initiating Digital Water Twin blueprint mapping...');
        
        setTimeout(() => {
          // Construct fully formed stream object
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

          // Update general environmental counts
          setYtdSavings(prev => prev + 45000);
          setAvoidedCarbonTons(prev => prev + 180);
          setRecycledWaterGallons(prev => prev + 120000);

          // Dynamically generate corresponding circular product
          const isChemical = newStream.waste_category.toLowerCase().includes('chemical') || newStream.ph < 6;
          const newProduct: GeneratedProduct = {
            id: 'gp-' + Date.now(),
            name: isChemical ? 'Refined Dye-Extract Structural Compound' : 'Dense Eco-Concrete Structural Block',
            sourceStreamId: newStream.id,
            feasibilityScore: scores.recoveryFeasibility,
            profitability: scores.profitability,
            marketDemand: Math.round(scores.profitability * 1.05),
            machineryRequirement: isChemical ? 'Molecular Acid Filters, pH Balancing Buffers' : 'Solid Agglomeration Presses, Dense Kilns',
            workforceRequirement: '2 Specialized Chemical Engineers',
            carbonReduction: `${Math.round(newStream.quantity * 0.8)} Metric Tons`,
            nearbyBuyers: isChemical ? ['ChemSeparation Partners'] : ['GeoBuild Infrastructure Ltd', 'Apex Cements'],
            estimatedMarketValue: isChemical ? '$480 / Metric Ton' : '$85 / Block',
            estimatedROI: `+${Math.round(scores.profitability * 1.6)}%`,
            scalabilityPotential: 'High industrial compatibility with modern architectural foundations',
            treatmentDependency: scores.treatmentDependency > 60 ? 'Critical high-neutralization treatment required' : 'Low secondary buffering required',
            isSaved: false,
            isListed: false
          };

          setGeneratedProducts(prev => [newProduct, ...prev]);

          // Notify user
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

  // Notifications helper
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

  // Product Lab interactions
  const saveProduct = (id: string) => {
    setGeneratedProducts(prev => prev.map(p => p.id === id ? { ...p, isSaved: true } : p));
    addNotification('Concept Saved', 'Circular product blueprint saved to facility catalog.', 'success');
  };

  const listProductOnMarketplace = (id: string, initialPrice: string) => {
    setGeneratedProducts(prev => prev.map(p => p.id === id ? { ...p, isListed: true } : p));
    const prod = generatedProducts.find(p => p.id === id);
    if (prod) {
      const newListing: MarketplaceListing = {
        id: 'm-' + Date.now(),
        title: `Recovered ${prod.name}`,
        type: 'PRODUCT',
        ownerOrg: user?.organization || 'Active Operator',
        ownerRole: user?.role || 'manufacturer',
        material: prod.name,
        volume: '100 Batches',
        basePrice: initialPrice,
        currentBid: initialPrice,
        bidsCount: 0,
        recoveryScore: prod.feasibilityScore,
        logisticsComplexity: 'Standard palettes',
        sustainabilityImpact: prod.carbonReduction,
        timestamp: 'Just Now'
      };
      setListings(prev => [newListing, ...prev]);
      addNotification('Marketplace Listing Created', `Product "${prod.name}" is now bidding active!`, 'success');
    }
  };

  const startRecoveryWorkflow = (id: string) => {
    addNotification('Workflow Started', 'Physical plant controllers alerted. Segmenting active raw material batches...', 'info');
  };

  // Marketplace interaction
  const placeBidOnListing = (id: string, amount: number, bidderName: string) => {
    setListings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          currentBid: `$${amount.toLocaleString()}`,
          bidsCount: item.bidsCount + 1,
          highestBidder: bidderName
        };
      }
      return item;
    }));
    addNotification('Bid Processed Successfully', `Bidding lock secured for $${amount.toLocaleString()}`, 'success');
  };

  const createMarketplaceListing = (listingData: Partial<MarketplaceListing>) => {
    const newList: MarketplaceListing = {
      id: 'm-' + Date.now(),
      title: listingData.title || 'Material Tender',
      type: listingData.type || 'WASTE',
      ownerOrg: user?.organization || 'Active Facility',
      ownerRole: user?.role || 'manufacturer',
      material: listingData.material || 'Mixed Streams',
      volume: listingData.volume || '50 Tons',
      basePrice: listingData.basePrice || '$5,000',
      currentBid: listingData.basePrice || '$5,000',
      bidsCount: 0,
      recoveryScore: listingData.recoveryScore || 80,
      logisticsComplexity: listingData.logisticsComplexity || 'Standard freight container',
      sustainabilityImpact: listingData.sustainabilityImpact || '+100 Eco Score',
      timestamp: 'Just Now'
    };
    setListings(prev => [newList, ...prev]);
    addNotification('Tender / Contract Listed', `Opportunity "${newList.title}" posted to the Industrial network.`, 'success');
  };

  // Authentication & Onboarding
  const loginUser = (email: string, role: UserRole) => {
    const nameMap: {[key in UserRole]: string} = {
      manufacturer: 'Dr. Helen Vance',
      recycler: 'Chief Engineer Marcus Flint',
      buyer: 'Clara Oswald',
      treatment: 'Dr. Evelyn Brand',
      sustainability: 'Director Samira Carter',
      admin: 'Sysop Antigravity'
    };
    const orgMap: {[key in UserRole]: string} = {
      manufacturer: 'Vance Textile Mills',
      recycler: 'EcoBrick Smelting',
      buyer: 'SoundSeal Architectural',
      treatment: 'ChemSeparation Partners',
      sustainability: 'ZeroCarbon Alliance',
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
      isOnboarded: false // Needs onboarding details setup next
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

  // Intelligent context-aware copilot query response logic
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

      if (query.includes('waste') || query.includes('contaminant') || query.includes('stream') || query.includes('material')) {
        if (activeStream) {
          botResponse = `Understood. Analyzing "${activeStream.name}" of ${activeStream.quantity} tons. Based on chemical indices, COD is at ${activeStream.cod} mg/L and TDS at ${activeStream.tds} mg/L. The turbidity rating of ${activeStream.turbidity} indicates specialized agglomeration separation pathways should be deployed. Active matching generates high demand for high-strength bio bricks.`;
        } else {
          botResponse = `I see. Please select or upload a waste stream manifest. Once ingested, I can provide precise molecular analysis, segregations, and treatment metrics.`;
        }
      } else if (query.includes('roi') || query.includes('money') || query.includes('profit') || query.includes('cost')) {
        if (activeScores) {
          botResponse = `Financial telemetry suggests an active Resale Potential Score of ${activeScores.resalePotential}% and Profitability index of ${activeScores.profitability}%. Processing the current batch will result in estimated payback periods of under 8 months. YTD savings for your organization are currently tracking at $${(ytdSavings/1000000).toFixed(2)}M.`;
        } else {
          botResponse = `Our financial recovery engine models ROI utilizing logistics complexity, machinery capital expenses, and regional procurement indices. Ingest a CSV, and I will output an interactive balance ledger.`;
        }
      } else if (query.includes('carbon') || query.includes('esg') || query.includes('compliance') || query.includes('sustainability')) {
        botResponse = `Active ESG metrics: Carbon Avoidance is currently at ${avoidedCarbonTons.toLocaleString()} Metric Tons. Aligned with SEC climate disclosure mandates, and tracking 85% Csrd european directive consistency. Recycled freshwater stands at ${recycledWaterGallons.toLocaleString()} Gallons.`;
      } else {
        botResponse = `Understood. System is monitoring the Industrial Supply chain matrix. We can initiate molecular separation modeling, generate circular products, browse active biddings on the exchange, or review carbon avoidance compliance certificates. What circular protocol should we initiate?`;
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
      wasteStreams,
      activeStream,
      setActiveStreamById,
      ingestWasteStream,
      isIngesting,
      ingestionStatus,
      activeScores,
      generatedProducts,
      saveProduct,
      listProductOnMarketplace,
      startRecoveryWorkflow,
      listings,
      placeBidOnListing,
      createMarketplaceListing,
      networkNodes,
      selectedNode,
      setSelectedNode,
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
