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
    t
  } = useCircular();

  // Selected file for CSV parsing simulation
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState('');

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

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Workspace Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Node Synchronized
          </span>
          <h1 className="font-display-hero text-3xl md:text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('dashboardTitle')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl">
            {t('facility')}: <span className="font-bold text-primary">{user?.organization || 'Active Plant'}</span> • {t('operator')}: <span className="font-medium">{user?.fullName || 'Active Operator'}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col">
            <span className="font-metadata text-[10px] text-on-surface-variant/70 uppercase font-bold tracking-wider">{t('nodeProtocol')}</span>
            <span className="text-sm font-bold text-primary uppercase mt-0.5">{user?.role || 'manufacturer'}</span>
          </div>
        </div>
      </div>

      {/* FEATURE 8: Circular Flow Intelligence Engine Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-surface/40 border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-radial-gradient from-[rgba(127,255,212,0.1)] to-transparent pointer-events-none" />
        
        {/* Left Side Score Information */}
        <div className="lg:col-span-8 space-y-4">
          <span className="font-label-caps text-[9px] text-primary border border-primary/20 bg-primary-container/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold">Active Flow Analytics</span>
          <h2 className="font-display-hero text-xl font-bold text-on-background">{t('decisionModule')}</h2>
          <p className="text-xs text-on-surface-variant leading-relaxed max-w-2xl">
            Evaluating how seamlessly secondary industrial flows circulate. Calculated dynamically using feedstock recyclability, logistics complexity, regional buyer matching indexes, and chemical extraction coefficients.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Ecosystem Efficiency</span>
              <p className="text-sm font-extrabold text-primary mt-1">92% Optimal</p>
            </div>
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Reuse Optimization</span>
              <p className="text-sm font-extrabold text-secondary mt-1">84% Sourced</p>
            </div>
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Logistics Friction</span>
              <p className="text-sm font-bold text-on-background mt-1">Low Overhead</p>
            </div>
            <div className="p-3 bg-surface/50 border border-outline-variant/15 rounded-xl">
              <span className="text-on-surface-variant text-[10px]">Market Value Potential</span>
              <p className="text-sm font-extrabold text-primary mt-1">₹18,500/Ton max</p>
            </div>
          </div>
        </div>

        {/* Right Side Rotating Circular Ecosystem SVG */}
        <div className="lg:col-span-4 flex items-center justify-center relative min-h-[160px]">
          <div className="w-32 h-32 relative flex items-center justify-center">
            {/* Pulsing circular flow pathways */}
            <div className="absolute inset-0 rounded-full border border-primary-container/30 animate-spin-slow" />
            <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-secondary/20 animate-[spin_12s_linear_infinite]" />
            <svg className="w-24 h-24 text-primary animate-pulse" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" fill="none" className="opacity-60" />
              <path d="M50 10 A40 40 0 0 1 90 50" stroke="#7bffd9" strokeWidth="4" fill="none" />
              <text x="50" y="55" textAnchor="middle" fill="currentColor" className="font-display-hero text-2xl font-black">84%</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Global Telemetry Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 hover-lift flex items-center justify-between">
          <div>
            <span className="font-metadata text-xs text-on-surface-variant font-medium">YTD Savings Ledger</span>
            <h3 className="font-display-hero text-3xl font-extrabold text-primary text-glow mt-1">₹{(ytdSavings/10000000).toFixed(2)} Crore</h3>
          </div>
          <span className="material-symbols-outlined text-3xl text-primary bg-primary-container/20 p-3 rounded-full">monetization_on</span>
        </div>

        <div className="glass-panel rounded-2xl p-6 hover-lift flex items-center justify-between">
          <div>
            <span className="font-metadata text-xs text-on-surface-variant font-medium">Carbon Avoidance Ledger</span>
            <h3 className="font-display-hero text-3xl font-extrabold text-secondary mt-1">{(avoidedCarbonTons/1000).toFixed(1)}k Tons</h3>
          </div>
          <span className="material-symbols-outlined text-3xl text-secondary bg-secondary-container/20 p-3 rounded-full">co2</span>
        </div>

        <div className="glass-panel rounded-2xl p-6 hover-lift flex items-center justify-between">
          <div>
            <span className="font-metadata text-xs text-on-surface-variant font-medium">Water Conservation</span>
            <h3 className="font-display-hero text-3xl font-extrabold text-tertiary mt-1">{(recycledWaterGallons/1000000).toFixed(1)}M Gal</h3>
          </div>
          <span className="material-symbols-outlined text-3xl text-tertiary bg-tertiary-container/20 p-3 rounded-full">water_drop</span>
        </div>
      </div>

      {/* Primary Workspace Modules based on Node Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Primary Section (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">

          {/* ROLE: MANUFACTURER SPECIFIC CONTROLS */}
          {user?.role === 'manufacturer' && (
            <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6">
              <div className="flex justify-between items-start border-b border-outline-variant/15 pb-4">
                <div>
                  <h2 className="font-headline-md text-xl text-primary font-bold">Industrial Data Ingestion</h2>
                  <p className="font-metadata text-xs text-on-surface-variant">Calibrate local material reports and stream telemetry indexes straight to the database.</p>
                </div>
                <span className="material-symbols-outlined text-primary bg-primary-container/30 p-2.5 rounded-xl text-base animate-pulse">cloud_upload</span>
              </div>

              {/* Magical Upload Field */}
              <div className="border border-dashed border-outline-variant/60 hover:border-primary/50 transition-all rounded-xl p-8 text-center flex flex-col items-center justify-center bg-surface-container-low/20 relative overflow-hidden group">
                <input 
                  type="file" 
                  onChange={handleCSVSelect}
                  accept=".csv,.xlsx,.pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="material-symbols-outlined text-5xl text-primary/40 group-hover:scale-110 transition-transform mb-3">analytics</span>
                <span className="font-body-large text-sm font-semibold text-on-background">{t('dragDropText')}</span>
                <span className="font-metadata text-xs text-on-surface-variant mt-1">Accepts CSV telemetry, digital report indexes, or material manifests.</span>
              </div>

              {uploadProgress && (
                <div className="p-3 bg-primary-container/20 border border-primary/25 rounded-xl flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{uploadProgress}</span>
                  <button 
                    onClick={handleCSVIngest}
                    className="px-4 py-2 bg-primary text-white font-label-caps text-[10px] font-bold uppercase rounded-lg hover:bg-secondary transition-all"
                  >
                    Start Neural Parser
                  </button>
                </div>
              )}

              {isIngesting && (
                <div className="p-4 bg-surface-container-low border border-primary/20 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs text-primary font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                      {ingestionStatus}
                    </span>
                    <span className="animate-pulse">Active Stream Calibration</span>
                  </div>
                  <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACTIVE INGESTED STREAM PANEL */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-headline-md text-xl text-primary font-bold mb-4">{t('activeStreamTitle')}</h2>
            
            {activeStream ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3.5 bg-surface-container-low border border-outline-variant/25 rounded-xl">
                  <div>
                    <h3 className="text-sm font-bold text-on-background">{activeStream.name}</h3>
                    <p className="font-metadata text-[10px] text-on-surface-variant mt-0.5">Category: {activeStream.waste_category} • {activeStream.quantity} Metric Tons</p>
                  </div>
                  <span className="font-label-caps text-[10px] bg-primary-container/20 border border-primary/25 text-primary font-bold px-2.5 py-1 rounded-full uppercase">
                    Analyzing Twin
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20">
                    <span className="text-on-surface-variant font-medium">Acidity (pH)</span>
                    <p className="font-bold text-sm mt-1">{activeStream.ph}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20">
                    <span className="text-on-surface-variant font-medium">TDS (ppm)</span>
                    <p className="font-bold text-sm mt-1">{activeStream.tds}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20">
                    <span className="text-on-surface-variant font-medium">Turbidity</span>
                    <p className="font-bold text-sm mt-1">{activeStream.turbidity} NTU</p>
                  </div>
                  <div className="p-3 rounded-lg bg-surface/30 border border-outline-variant/20">
                    <span className="text-on-surface-variant font-medium">Sludge %</span>
                    <p className="font-bold text-sm mt-1">{activeStream.sludge_percentage}%</p>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Link href="/dashboard/water-twin" className="flex-1">
                    <button className="w-full py-2.5 border border-primary text-primary hover:bg-primary hover:text-on-primary rounded-lg font-label-caps text-xs font-bold uppercase transition-all">
                      View Digital Twin
                    </button>
                  </Link>
                  <Link href="/dashboard/recovery-center" className="flex-1">
                    <button className="w-full py-2.5 bg-primary text-white hover:bg-secondary rounded-lg font-label-caps text-xs font-bold uppercase transition-all">
                      View Feasibility Scores
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-xs text-on-surface-variant">No active streams ingested. Drag a telemetry CSV manifest above to initiate.</p>
            )}
          </div>
        </div>

        {/* Right Side Info Columns (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Active Copilot Orb Widget */}
          <div className="glass-panel rounded-2xl p-6 hover-lift flex flex-col justify-between min-h-[220px]">
            <div>
              <h3 className="font-headline-md text-base text-primary font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">smart_toy</span>
                Copilot Lens
              </h3>
              <p className="font-body-main text-xs text-on-surface-variant leading-relaxed font-semibold">
                {activeStream 
                  ? `"${activeStream.name}" has completed neural calibration. Chemical index BOD of ${activeStream.bod} mg/L is highly suitable for Soundproofing Panel conversion with +95% est. ROI.` 
                  : "Operational matrix nominal. Select or drop your facility files, and I will instantly formulate premium resale models."
                }
              </p>
            </div>

            <Link href="/dashboard/copilot" className="mt-4">
              <button className="w-full py-2.5 bg-primary-container/20 border border-primary-container text-on-background hover:bg-primary-container/40 font-label-caps text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all">
                Access Copilot Console
              </button>
            </Link>
          </div>

          {/* Ingestion Stream Catalog Selector */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col">
            <h3 className="font-headline-md text-base text-secondary font-bold mb-4">Facility Streams Catalog</h3>
            
            <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-1">
              {wasteStreams.map((stream) => {
                const isActive = activeStream?.id === stream.id;
                return (
                  <button 
                    key={stream.id}
                    onClick={() => setActiveStreamById(stream.id)}
                    className={`text-left p-3 rounded-xl border transition-all ${isActive ? 'bg-secondary-container/20 border-secondary' : 'bg-surface/30 border-outline-variant/20 hover:border-secondary'}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-on-background max-w-[150px] truncate">{stream.name}</span>
                      <span className="font-metadata text-[9px] text-on-surface-variant font-bold">{stream.quantity} Tons</span>
                    </div>
                    <span className="font-metadata text-[9px] text-on-surface-variant">{stream.waste_category}</span>
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
