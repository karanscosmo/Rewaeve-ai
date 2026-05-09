'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCircular } from '@/lib/CircularContext';

export default function CircularIntelligenceWorkspace() {
  const { 
    user, 
    wasteStreams, 
    activeStream, 
    setActiveStreamById,
    ingestWasteStream, 
    isIngesting, 
    ingestionStatus,
    activeScores,
    ytdSavings,
    avoidedCarbonTons,
    recycledWaterGallons,
    listings,
    addNotification,
    t
  } = useCircular();

  // Selected file for CSV parsing simulation
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState('');

  // Active middleman state variables
  const [selectedRoute, setSelectedRoute] = useState<'A' | 'B'>('A');
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>('audit-1');

  // Buyer Specific States
  const [roiTons, setRoiTons] = useState(15);

  // Simulating CSV inputs
  const handleCSVSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadProgress(`Stream: ${file.name} - ready for calibration.`);
    }
  };

  const handleCSVIngest = () => {
    if (!selectedFile) return;

    const name = selectedFile.name;
    const isDyeTextile = name.toLowerCase().includes('textile') || name.toLowerCase().includes('dye') || name.toLowerCase().includes('rinse');
    
    const partialStream = {
      name: name,
      ph: isDyeTextile ? 4.5 : 8.9,
      cod: isDyeTextile ? 1450 : 250,
      bod: isDyeTextile ? 820 : 60,
      tds: isDyeTextile ? 3200 : 7800,
      turbidity: isDyeTextile ? 45.0 : 88.0,
      contaminants: isDyeTextile ? 'Azo dye, sodium salts' : 'Iron oxides, copper slag, silicates',
      dye_concentration: isDyeTextile ? 15.0 : 0,
      sludge_percentage: isDyeTextile ? 12.0 : 65.0,
      waste_category: isDyeTextile ? 'Chemical Effluent' : 'Solid Metallurgical Residue',
      material_type: isDyeTextile ? 'Wash Rinse Stream' : 'Fume Concentrates',
      quantity: isDyeTextile ? 120 : 350,
      temperature: isDyeTextile ? 30 : 95
    };

    ingestWasteStream(partialStream);
    setSelectedFile(null);
    setUploadProgress('');
  };

  const getRoleTheme = () => {
    switch (user?.role) {
      case 'buyer': return { text: 'text-yellow-600', bg: 'bg-yellow-600', bgAlpha: 'bg-yellow-600/10', border: 'border-yellow-600', hover: 'hover:bg-yellow-700' };
      default: return { text: 'text-zinc-900', bg: 'bg-zinc-900', bgAlpha: 'bg-zinc-900/10', border: 'border-zinc-900', hover: 'hover:bg-zinc-800' };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Workspace Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
        <div>
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
            Node Synchronized
          </span>
          <h1 className="font-display-hero text-3xl md:text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('dashboardTitle')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl">
            {t('facility')}: <span className={`font-bold ${theme.text}`}>{user?.organization || 'Active Plant'}</span> • {t('operator')}: <span className="font-medium">{user?.fullName || 'Active Operator'}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
            <span className="font-metadata text-[10px] text-on-surface-variant/70 uppercase font-bold tracking-wider">{t('nodeProtocol')}</span>
            <span className={`text-sm font-bold ${theme.text} uppercase mt-0.5`}>{user?.role || 'manufacturer'}</span>
          </div>
        </div>
      </header>

      {/* FEATURE 8: Circular Flow Intelligence Engine Panel */}
      {(user?.role === 'manufacturer' || !user?.role) && (
        <>
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-surface/40 border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className={`absolute inset-0 bg-radial-gradient ${user?.role === 'buyer' ? 'from-[rgba(202,138,4,0.05)]' : 'from-[rgba(24,24,27,0.05)]'} to-transparent pointer-events-none`} />
        
        {/* Left Side Score Information */}
        <div className="lg:col-span-8 space-y-4 relative z-10">
          <span className={`font-label-caps text-[9px] ${theme.text} border ${theme.border}/20 ${theme.bgAlpha} px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold`}>Active Flow Analytics</span>
          <h2 className="font-display-hero text-xl font-bold text-on-background">{t('decisionModule')}</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl font-semibold">
            Evaluating how seamlessly secondary industrial flows circulate. Calculated dynamically using feedstock recyclability, logistics complexity, regional buyer matching indexes, and chemical extraction coefficients.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Ecosystem Efficiency</span>
              <p className={`text-sm font-extrabold ${theme.text} mt-1`}>92% Optimal</p>
            </div>
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Reuse Optimization</span>
              <p className={`text-sm font-extrabold ${theme.text} mt-1`}>84% Sourced</p>
            </div>
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Logistics Friction</span>
              <p className="text-sm font-bold text-on-background mt-1">Low Overhead</p>
            </div>
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Market Value Potential</span>
              <p className={`text-sm font-extrabold ${theme.text} mt-1`}>₹18,500/Ton max</p>
            </div>
          </div>
        </div>

        {/* Right Side Rotating Circular Ecosystem SVG */}
        <div className="lg:col-span-4 flex items-center justify-center relative min-h-[160px] z-10">
          <div className="w-32 h-32 relative flex items-center justify-center">
            {/* Pulsing circular flow pathways */}
            <div className={`absolute inset-0 rounded-full border ${theme.border}/30 animate-spin-slow`} />
            <div className={`absolute w-[85%] h-[85%] rounded-full border border-dashed ${theme.border}/20 animate-[spin_12s_linear_infinite]`} />
            <svg className={`w-24 h-24 ${theme.text} animate-pulse`} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" fill="none" className="opacity-60" />
              <path d="M50 10 A40 40 0 0 1 90 50" stroke={user?.role === 'buyer' ? '#ca8a04' : '#18181b'} strokeWidth="4" fill="none" />
              <text x="50" y="55" textAnchor="middle" fill="currentColor" className="font-display-hero text-2xl font-black">84%</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Global Telemetry Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-semibold text-xs text-on-surface-variant">
        <div className="glass-panel rounded-2xl p-6 hover-lift flex items-center justify-between border hover:border-outline-variant/30 transition-all">
          <div>
            <span className="font-metadata text-xs font-medium">{t('YTD Savings Ledger')}</span>
            <h3 className={`font-display-hero text-3xl font-extrabold ${theme.text} mt-1`}>₹{(ytdSavings/10000000).toFixed(2)} Crore</h3>
          </div>
          <span className={`material-symbols-outlined text-3xl ${theme.text} ${theme.bgAlpha} p-3 rounded-full`}>monetization_on</span>
        </div>

        <div className="glass-panel rounded-2xl p-6 hover-lift flex items-center justify-between border hover:border-outline-variant/30 transition-all">
          <div>
            <span className="font-metadata text-xs font-medium">{t('Carbon Avoidance Ledger')}</span>
            <h3 className={`font-display-hero text-3xl font-extrabold ${theme.text} mt-1`}>{(avoidedCarbonTons/1000).toFixed(1)}k Tons</h3>
          </div>
          <span className={`material-symbols-outlined text-3xl ${theme.text} ${theme.bgAlpha} p-3 rounded-full`}>co2</span>
        </div>

        <div className="glass-panel rounded-2xl p-6 hover-lift flex items-center justify-between border hover:border-outline-variant/30 transition-all">
          <div>
            <span className="font-metadata text-xs font-medium">{t('Water Conservation')}</span>
            <h3 className={`font-display-hero text-3xl font-extrabold ${theme.text} mt-1`}>{(recycledWaterGallons/1000000).toFixed(1)}M Gal</h3>
          </div>
          <span className={`material-symbols-outlined text-3xl ${theme.text} ${theme.bgAlpha} p-3 rounded-full`}>water_drop</span>
        </div>
      </div>
      </>
      )}

      {/* Primary Workspace Modules based on Node Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Section (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* ======================================================================= */}
          {/* ROLE: MANUFACTURER SPECIFIC CONTROLS */}
          {/* ======================================================================= */}
          {(user?.role === 'manufacturer' || !user?.role) && (
            <div className={`glass-panel rounded-2xl p-6 flex flex-col gap-6 border ${theme.border}/20`}>
              <div className="flex justify-between items-start border-b border-outline-variant/15 pb-4">
                <div>
                  <h2 className={`font-headline-md text-xl ${theme.text} font-bold`}>Industrial Data Ingestion</h2>
                  <p className="font-metadata text-xs text-on-surface-variant font-semibold">Calibrate local material reports and stream telemetry indexes straight to the database.</p>
                </div>
                <span className={`material-symbols-outlined ${theme.text} ${theme.bgAlpha} p-2.5 rounded-xl text-base animate-pulse`}>cloud_upload</span>
              </div>

              {/* Magical Upload Field */}
              <div className={`border border-dashed border-outline-variant/60 hover:${theme.border}/50 transition-all rounded-xl p-8 text-center flex flex-col items-center justify-center bg-surface-container-low/20 relative overflow-hidden group`}>
                <input 
                  type="file" 
                  onChange={handleCSVSelect}
                  accept=".csv,.xlsx,.pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className={`material-symbols-outlined text-5xl ${theme.text}/40 group-hover:scale-110 transition-transform mb-3`}>analytics</span>
                <span className="font-body-large text-sm font-semibold text-on-background">{t('dragDropText')}</span>
                <span className="font-metadata text-xs text-on-surface-variant mt-1 font-semibold">Accepts CSV telemetry, digital report indexes, or material manifests.</span>
              </div>

              {uploadProgress && (
                <div className={`p-3 ${theme.bgAlpha} border ${theme.border}/25 rounded-xl flex items-center justify-between text-xs font-semibold ${theme.text}`}>
                  <span>{uploadProgress}</span>
                  <button 
                    onClick={handleCSVIngest}
                    className={`px-4 py-2 ${theme.bg} text-white font-label-caps text-[10px] font-bold uppercase rounded-lg ${theme.hover} transition-all`}
                  >
                    Start Neural Parser
                  </button>
                </div>
              )}

              {isIngesting && (
                <div className={`p-4 bg-surface-container-low border ${theme.border}/20 rounded-xl space-y-3 font-semibold text-xs`}>
                  <div className={`flex items-center justify-between ${theme.text} font-bold`}>
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${theme.bg} animate-ping`} />
                      {ingestionStatus}
                    </span>
                    <span className="animate-pulse">Active Stream Calibration</span>
                  </div>
                  <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${theme.bg} rounded-full animate-pulse`} style={{ width: '70%' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* ======================================================================= */}
          {/* ROLE: BUYER SPECIFIC CONTROLS */}
          {/* ======================================================================= */}
          {user?.role === 'buyer' && (
            <div className={`glass-panel rounded-2xl p-6 flex flex-col gap-6 border ${theme.border}/20`}>
              <div className="flex justify-between items-start border-b border-outline-variant/15 pb-4">
                <div>
                  <h2 className={`font-headline-md text-xl ${theme.text} font-bold`}>Procurement Hub — Quality & ROI Ledger</h2>
                  <p className="font-metadata text-xs text-on-surface-variant font-semibold">Browse recycled byproduct catalogs, compare supplier consistency indexes, and analyze carbon offsets.</p>
                </div>
                <span className={`material-symbols-outlined ${theme.text} ${theme.bgAlpha} p-2.5 rounded-xl text-base`}>shopping_cart</span>
              </div>

              {/* Browse Catalog */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface/30 border border-outline-variant/15 space-y-2">
                  <span className={`text-[10px] font-bold ${theme.text} ${theme.bgAlpha} px-2 py-0.5 rounded uppercase`}>Eco Products</span>
                  <h4 className="text-sm font-extrabold text-on-background">Acoustic Bio-Fiber Panels</h4>
                  <p className="text-[11px] text-on-surface-variant font-semibold">92% molecular alignment • Vance Mills</p>
                  <div className="flex justify-between text-[11px] pt-2 border-t border-outline-variant/10">
                    <span className={`${theme.text} font-bold`}>₹3,800/panel</span>
                    <span className={`${theme.text} font-bold`}>Saving: 120kg CO2</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface/30 border border-outline-variant/15 space-y-2">
                  <span className={`text-[10px] font-bold ${theme.text} ${theme.bgAlpha} px-2 py-0.5 rounded uppercase`}>Structural</span>
                  <h4 className="text-sm font-extrabold text-on-background">Carbon-Lock Construction Tiles</h4>
                  <p className="text-[11px] text-on-surface-variant font-semibold">95% fly-ash compaction • EcoBrick Inc.</p>
                  <div className="flex justify-between text-[11px] pt-2 border-t border-outline-variant/10">
                    <span className={`${theme.text} font-bold`}>₹12,400/T</span>
                    <span className={`${theme.text} font-bold`}>Saving: 340kg CO2</span>
                  </div>
                </div>
              </div>

              {/* Live Shipping & Procurement tracker */}
              <div className="p-4 bg-surface-container-low border border-outline-variant/15 rounded-xl space-y-3 font-semibold text-xs text-on-surface-variant">
                <h4 className="text-xs font-bold text-on-background">Active Procurement Order: OP-2901</h4>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className={`p-2 rounded ${theme.bgAlpha} border ${theme.border} ${theme.text} font-bold`}>Ordered (100%)</div>
                  <div className={`p-2 rounded ${theme.bgAlpha} border ${theme.border} ${theme.text} font-bold`}>Dispatched (100%)</div>
                  <div className={`p-2 rounded ${theme.bgAlpha} border ${theme.border} ${theme.text} font-bold`}>In Transit (85%)</div>
                  <div className="p-2 rounded bg-outline-variant/20 text-on-surface-variant/40">Delivered (0%)</div>
                </div>
              </div>

              {/* ROI Sourcing Benefits Calculator */}
              <div className={`p-4 ${theme.bgAlpha} border ${theme.border}/20 rounded-xl space-y-4`}>
                <h4 className="text-xs font-bold text-on-background">Circular Purchase Benefit Calculator</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-[9px] uppercase font-bold text-on-surface-variant block">Purchase Volume (Tons)</label>
                    <input 
                      type="range" 
                      min="5" 
                      max="100" 
                      value={roiTons} 
                      onChange={(e) => setRoiTons(parseInt(e.target.value))}
                      className="w-full accent-yellow-600 bg-outline-variant/20 h-1 rounded" 
                    />
                  </div>
                  <div className="p-3 bg-surface border border-outline-variant/15 rounded-xl text-center min-w-[120px]">
                    <span className="text-[9px] text-on-surface-variant uppercase font-bold block">SAVINGS LEDGER</span>
                    <span className={`text-xs font-extrabold ${theme.text} font-mono`}>₹{(roiTons * 4200).toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-surface border border-outline-variant/15 rounded-xl text-center min-w-[120px]">
                    <span className="text-[9px] text-on-surface-variant uppercase font-bold block">CO2 REDUCED</span>
                    <span className={`text-xs font-extrabold ${theme.text} font-mono`}>{roiTons * 180} kg</span>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ======================================================================= */}
          {/* ROLE: MIDDLEMAN SPECIFIC CONTROLS */}
          {/* ======================================================================= */}
          {user?.role === 'middleman' && (
            <div className={`glass-panel rounded-2xl p-6 flex flex-col gap-6 border ${theme.border}/20 bg-surface/30`}>
              <div className="flex justify-between items-start border-b border-outline-variant/15 pb-4">
                <div>
                  <h2 className={`font-headline-md text-xl ${theme.text} font-bold`}>Ecosystem Coordination Hub</h2>
                  <p className="font-metadata text-xs text-on-surface-variant font-semibold">Track bilateral relationship scorecards, match logistics channels, and manage broker contracts.</p>
                </div>
                <span className={`material-symbols-outlined ${theme.text} ${theme.bgAlpha} p-2.5 rounded-xl text-base`}>hub</span>
              </div>

              {/* Interactive SVG Relationship Node Network Map */}
              <div className="h-44 bg-surface-container-lowest/30 border border-outline-variant/15 rounded-xl relative overflow-hidden flex items-center justify-center">
                <div className={`absolute inset-0 bg-[radial-gradient(${theme.border}_1px,transparent_1px)] [background-size:12px_12px] opacity-10`} />
                <svg className="w-full h-full max-w-sm" viewBox="0 0 200 100">
                  {/* Nodes links */}
                  <line x1="40" y1="50" x2="100" y2="25" stroke="#27272a" strokeWidth="1.5" strokeDasharray="3,2" />
                  <line x1="40" y1="50" x2="100" y2="75" stroke="#18181b" strokeWidth="1.5" />
                  <line x1="100" y1="25" x2="160" y2="50" stroke="#3f3f46" strokeWidth="1" />
                  <line x1="100" y1="75" x2="160" y2="50" stroke="#18181b" strokeWidth="1.5" />
                  
                  {/* Node 1: Vance Mills */}
                  <circle cx="40" cy="50" r="10" fill="#18181b" />
                  <text x="40" y="54" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">Vance</text>
                  
                  {/* Node 2: EcoBrick Smelter */}
                  <circle cx="100" cy="25" r="10" fill="#27272a" />
                  <text x="100" y="29" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">Eco</text>
                  
                  {/* Node 3: ChemSeparation */}
                  <circle cx="100" cy="75" r="10" fill="#27272a" />
                  <text x="100" y="79" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">Chem</text>
                  
                  {/* Node 4: SoundSeal Buyer */}
                  <circle cx="160" cy="50" r="10" fill="#3f3f46" />
                  <text x="160" y="54" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold">Sound</text>
                </svg>
                <div className={`absolute top-2 left-2 text-[8px] font-bold ${theme.text} font-mono uppercase bg-surface/80 px-2 py-0.5 border ${theme.border}/30 rounded-full`}>
                  Live Sourcing Node Map
                </div>
              </div>

              {/* Logistics Router Optimizations */}
              <div className="space-y-3 font-semibold text-xs text-on-surface-variant">
                <h4 className="text-xs font-bold text-on-background">Logistics Route Optimizer</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setSelectedRoute('A')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedRoute === 'A' ? `${theme.bgAlpha} border-zinc-900` : `bg-surface/30 border-outline-variant/15 hover:${theme.border}/30`
                    }`}
                  >
                    <div className="flex justify-between font-bold text-[10px] mb-1">
                      <span className="text-on-background">Route A (Direct Freight)</span>
                      <span className={`${theme.text} font-mono`}>₹45,000</span>
                    </div>
                    <p className="text-[9.5px] leading-tight text-on-surface-variant">12km distance • Low diesel volatility • Carbon offset: -120kg</p>
                  </div>

                  <div 
                    onClick={() => setSelectedRoute('B')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedRoute === 'B' ? `${theme.bgAlpha} border-zinc-900` : `bg-surface/30 border-outline-variant/15 hover:${theme.border}/30`
                    }`}
                  >
                    <div className="flex justify-between font-bold text-[10px] mb-1">
                      <span className="text-on-background">Route B (Multi-Modal Rail)</span>
                      <span className={`${theme.text} font-mono`}>₹32,000</span>
                    </div>
                    <p className="text-[9.5px] leading-tight text-on-surface-variant">45km distance • Medium logistics delay • Carbon offset: -350kg</p>
                  </div>
                </div>
              </div>

              {/* Partnership scorecards */}
              <div className="p-3 bg-surface-container-low border border-outline-variant/15 rounded-xl flex justify-between items-center text-xs font-semibold">
                <div>
                  <span className="text-on-background font-bold block text-[11px]">Bilateral Logistics Scorecard</span>
                  <span className="text-[10px] text-on-surface-variant block mt-0.5">Vance Mills ➔ EcoBrick treated mud flow</span>
                </div>
                <div className="text-right">
                  <span className={`${theme.text} font-bold text-sm block`}>96% compatibility</span>
                  <span className="text-[9px] text-on-surface-variant block mt-0.5">Vol: Low • Transport: tanker compliant</span>
                </div>
              </div>
            </div>
          )}


          {/* ======================================================================= */}
          {/* ROLE: NGO & GOVERNMENT SPECIFIC CONTROLS */}
          {/* ======================================================================= */}
          {user?.role === 'government' && (
            <div className={`glass-panel rounded-2xl p-6 flex flex-col gap-6 border ${theme.border}/20`}>
              <div className="flex justify-between items-start border-b border-outline-variant/15 pb-4">
                <div>
                  <h2 className={`font-headline-md text-xl ${theme.text} font-bold`}>Policy & Grant Administration</h2>
                  <p className="font-metadata text-xs text-on-surface-variant font-semibold">Manage regulatory water twin audits, distribute state green grants, and sponsor certified workforce programs.</p>
                </div>
                <span className={`material-symbols-outlined ${theme.text} ${theme.bgAlpha} p-2.5 rounded-xl text-base`}>gavel</span>
              </div>

              {/* Audit Requests Inbox */}
              <div className="space-y-2.5 font-semibold text-xs text-on-surface-variant">
                <h4 className="text-xs font-bold text-on-background">Environmental Audit Requests Queue</h4>
                
                <div className="space-y-2">
                  <div 
                    onClick={() => setSelectedAuditId('audit-1')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedAuditId === 'audit-1' ? `${theme.bgAlpha} ${theme.border}` : 'bg-surface/30 border-outline-variant/15'
                    }`}
                  >
                    <div>
                      <span className="text-on-background font-bold text-[11px] block">Vance Mills Wash-Line Inquest</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5 block">Audit scope: heavy metals leakage validation</span>
                    </div>
                    <span className={`text-[10px] font-bold ${theme.text} ${theme.bgAlpha} border ${theme.border}/25 px-2.5 py-0.5 rounded uppercase`}>Needs Audit</span>
                  </div>

                  <div 
                    onClick={() => setSelectedAuditId('audit-2')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedAuditId === 'audit-2' ? `${theme.bgAlpha} ${theme.border}` : 'bg-surface/30 border-outline-variant/15'
                    }`}
                  >
                    <div>
                      <span className="text-on-background font-bold text-[11px] block">EcoBrick Smelting Residue Audit</span>
                      <span className="text-[10px] text-on-surface-variant mt-0.5 block">Audit scope: Sieve slag validation</span>
                    </div>
                    <span className={`text-[10px] font-bold ${theme.text} ${theme.bgAlpha} border ${theme.border}/25 px-2.5 py-0.5 rounded uppercase`}>Pending Approval</span>
                  </div>
                </div>

                {selectedAuditId && (
                  <button 
                    onClick={() => {
                      addNotification('Audit Scheduled', 'MOEFCC standard inspector scheduled to visit facility next Wednesday.', 'success');
                      setSelectedAuditId(null);
                    }}
                    className={`w-full py-2 ${theme.bg} ${theme.hover} text-white font-label-caps text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm`}
                  >
                    Approve and Dispatch Certified Auditor
                  </button>
                )}
              </div>

              {/* Certified Training program sponsorships */}
              <div className="p-4 bg-surface-container-low border border-outline-variant/15 rounded-xl flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-on-background">Certified Sustainable Material Operator Course</h4>
                  <p className="text-[10px] leading-relaxed max-w-md">Fund specialized local textile worker training in Tiruppur. Standardizes hazardous wash flow handling.</p>
                </div>
                <button 
                  onClick={() => addNotification('Course Sponsored', 'Funded 5 operator seats using MoEFCC training subsidies.', 'success')}
                  className={`py-2 px-4 ${theme.bg} text-white font-label-caps text-[10px] font-bold uppercase rounded-lg hover:holographic-glow transition-all shrink-0`}
                >
                  Sponsor 5 Workers (₹45,000)
                </button>
              </div>

              {/* State green grants portal console */}
              <div className={`p-4 ${theme.bgAlpha} border ${theme.border} rounded-xl flex flex-col md:flex-row justify-between gap-4`}>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-on-background">Water Sieve Curing setups reimbursement</h4>
                  <p className="text-[10px] leading-relaxed max-w-md">MoEFCC reimburses 15% of facility expenses for recycling water twin infrastructures.</p>
                </div>
                <button 
                  onClick={() => addNotification('Grant Applied', 'Water twin set application uploaded for government processing.', 'success')}
                  className={`py-2 px-4 border ${theme.border} ${theme.text} font-label-caps text-[10px] font-bold uppercase rounded-lg hover:bg-zinc-900/10 transition-all shrink-0`}
                >
                  Apply Grant Ledger
                </button>
              </div>
            </div>
          )}


          {/* ACTIVE INGESTED STREAM PANEL (Shown for manufacturers or if a stream is loaded) */}
          {activeStream && (
            <div className={`glass-panel rounded-2xl p-6 border ${theme.border}/20`}>
              <h2 className={`font-headline-md text-xl ${theme.text} font-bold mb-4`}>{t('activeStreamTitle')}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3.5 bg-surface-container-low border border-outline-variant/25 rounded-xl">
                  <div>
                    <h3 className="text-sm font-bold text-on-background">{activeStream.name}</h3>
                    <p className="font-metadata text-[10px] text-on-surface-variant mt-0.5">Category: {activeStream.waste_category} • {activeStream.quantity} Metric Tons</p>
                  </div>
                  <span className={`font-label-caps text-[10px] ${theme.bgAlpha} border ${theme.border}/25 ${theme.text} font-bold px-2.5 py-1 rounded-full uppercase`}>
                    Analyzing Twin
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20 font-semibold text-xs text-on-surface-variant">
                    <span className="font-medium">Acidity (pH)</span>
                    <p className="font-bold text-sm mt-1 text-on-background">{activeStream.ph}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20 font-semibold text-xs text-on-surface-variant">
                    <span className="font-medium">TDS (ppm)</span>
                    <p className="font-bold text-sm mt-1 text-on-background">{activeStream.tds}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20 font-semibold text-xs text-on-surface-variant">
                    <span className="font-medium">Turbidity</span>
                    <p className="font-bold text-sm mt-1 text-on-background">{activeStream.turbidity} NTU</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20 font-semibold text-xs text-on-surface-variant">
                    <span className="font-medium">Sludge %</span>
                    <p className="font-bold text-sm mt-1 text-on-background">{activeStream.sludge_percentage}%</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Link href="/dashboard/water-twin" className="flex-1">
                    <button className={`w-full py-2.5 border ${theme.border} ${theme.text} ${theme.hover} hover:text-white rounded-lg font-label-caps text-xs font-bold uppercase transition-all`}>
                      {t('View Digital Twin')}
                    </button>
                  </Link>
                  <Link href="/dashboard/recovery-center" className="flex-1">
                    <button className={`w-full py-2.5 ${theme.bg} text-white ${theme.hover} rounded-lg font-label-caps text-xs font-bold uppercase transition-all`}>
                      {t('View Feasibility Scores')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side Info Columns (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Active Copilot Orb Widget */}
          <div className="glass-panel rounded-2xl p-6 hover-lift flex flex-col justify-between min-h-[220px]">
            <div>
              <h3 className={`font-headline-md text-base ${theme.text} font-bold mb-3 flex items-center gap-2`}>
                <span className="material-symbols-outlined text-lg">smart_toy</span>
                {t('Copilot Lens')}
              </h3>
              <p className="font-body-main text-xs text-on-surface-variant leading-relaxed font-semibold">
                {activeStream 
                  ? `"${activeStream.name}" has completed neural calibration. Chemical index BOD of ${activeStream.bod} mg/L is highly suitable for Soundproofing Panel conversion with +95% est. ROI.` 
                  : "Operational matrix nominal. Select or drop your facility files, and I will instantly formulate premium resale models."
                }
              </p>
            </div>

            <Link href="/dashboard/copilot" className="mt-4">
              <button className={`w-full py-2.5 ${theme.bgAlpha} border ${theme.border} text-on-background hover:${theme.bgAlpha} font-label-caps text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all`}>
                Access Copilot Console
              </button>
            </Link>
          </div>

          {/* Ingestion Stream Catalog Selector */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col">
            <h3 className={`font-headline-md text-base ${theme.text} font-bold mb-4`}>{t('Facility Streams Catalog')}</h3>
            
            <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-1">
              {wasteStreams.map((stream) => {
                const isActive = activeStream?.id === stream.id;
                return (
                  <button 
                    key={stream.id}
                    onClick={() => setActiveStreamById(stream.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${isActive ? `${theme.bgAlpha} ${theme.border}` : `bg-surface/30 border-outline-variant/20 hover:${theme.border}`}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-on-background max-w-[150px] truncate">{stream.name}</span>
                      <span className="font-metadata text-[9px] text-on-surface-variant font-bold">{stream.quantity} Tons</span>
                    </div>
                    <span className="font-metadata text-[9px] text-on-surface-variant font-bold">{stream.waste_category}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
