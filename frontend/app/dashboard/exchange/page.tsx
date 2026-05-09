'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCircular } from '@/lib/CircularContext';

export default function IndustrialExchange() {
  const { user, listings, placeBidOnListing, togglePartnershipOnListing, addNotification } = useCircular();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'WASTE' | 'PRODUCT' | 'CONTRACT' | 'TENDER'>('ALL');
  
  // High Chamber states
  const [isChamberPartnershipRequested, setIsChamberPartnershipRequested] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>('Gujarat GIDC');

  // Interactive Holographic Chart State
  const [chartTimeline, setChartTimeline] = useState<'1D' | '1W' | '1M' | 'YTD'>('1W');
  const [hoveredChartPoint, setHoveredChartPoint] = useState<{ x: number; y: number; label: string; price: string } | null>(null);

  // Live Commodity Indices
  const commodityIndexes = [
    { name: 'Gujarat Textile Recovery Index', value: '₹14,800/T', trend: 'up', percentage: '12%', color: 'text-primary' },
    { name: 'Circular Material Demand Index', value: '₹18,400/T', trend: 'up', percentage: '18%', color: 'text-primary' },
    { name: 'Eco Construction Material Index', value: '₹8,500/T', trend: 'down', percentage: '3%', color: 'text-error' },
    { name: 'Industrial Pigment Demand Trends', value: '₹22,100/T', trend: 'up', percentage: '24%', color: 'text-primary' }
  ];

  // Region-wise demand intelligence data (Sustainability Commodity Heatmap)
  const regionalHeatmap = [
    { zone: 'Gujarat GIDC', demandStrength: 94, category: 'Textile Fiber Scraps', color: 'bg-primary/90', volatility: 'Low', status: 'Sufficient Supply' },
    { zone: 'Tiruppur Textile Belt', demandStrength: 89, category: 'Organic Wash Liquids', color: 'bg-primary/70', volatility: 'Medium', status: 'High Demand' },
    { zone: 'Maharashtra Thane SEZ', demandStrength: 78, category: 'Smelter Fly-Ash', color: 'bg-cyan-500/80', volatility: 'Low', status: 'Moderate Supply' },
    { zone: 'Mumbai Sewri Port Hub', demandStrength: 92, category: 'Metallurgical Residue', color: 'bg-primary/85', volatility: 'High', status: 'Tight Volume' },
    { zone: 'Rajasthan Ganganagar', demandStrength: 65, category: 'Agri-Stalk Fiber', color: 'bg-cyan-600/60', volatility: 'Medium', status: 'Surplus Available' }
  ];

  // SVG Chart points coordinate generator based on timeframe
  const getChartPoints = () => {
    switch (chartTimeline) {
      case '1D':
        return [
          { x: 30, y: 150, label: '09:00 AM', price: '₹14,200/T' },
          { x: 120, y: 110, label: '11:00 AM', price: '₹14,400/T' },
          { x: 210, y: 130, label: '01:00 PM', price: '₹14,350/T' },
          { x: 300, y: 70, label: '03:00 PM', price: '₹14,750/T' },
          { x: 390, y: 40, label: '05:00 PM', price: '₹14,800/T' }
        ];
      case '1M':
        return [
          { x: 30, y: 160, label: 'Week 1', price: '₹13,200/T' },
          { x: 120, y: 130, label: 'Week 2', price: '₹13,800/T' },
          { x: 210, y: 90, label: 'Week 3', price: '₹14,400/T' },
          { x: 300, y: 100, label: 'Week 4', price: '₹14,200/T' },
          { x: 390, y: 40, label: 'Week 5', price: '₹14,800/T' }
        ];
      case 'YTD':
        return [
          { x: 30, y: 180, label: 'Jan', price: '₹11,500/T' },
          { x: 120, y: 140, label: 'Mar', price: '₹12,200/T' },
          { x: 210, y: 110, label: 'Jun', price: '₹13,400/T' },
          { x: 300, y: 80, label: 'Sep', price: '₹14,100/T' },
          { x: 390, y: 40, label: 'YTD', price: '₹14,800/T' }
        ];
      default: // 1W
        return [
          { x: 30, y: 140, label: 'Mon', price: '₹14,100/T' },
          { x: 120, y: 150, label: 'Wed', price: '₹14,050/T' },
          { x: 210, y: 100, label: 'Thu', price: '₹14,400/T' },
          { x: 300, y: 80, label: 'Fri', price: '₹14,600/T' },
          { x: 390, y: 40, label: 'Sat', price: '₹14,800/T' }
        ];
    }
  };

  const chartPoints = getChartPoints();

  const handlePlaceBidSubmit = (id: string, currentBid: string) => {
    const numericVal = parseFloat(currentBid.replace(/[^0-9.]/g, '')) || 50000;
    const nextBid = numericVal + 15000; // Increment bids in ₹
    placeBidOnListing(id, nextBid, 'Vance Terminal Node-01');
  };

  const handleChamberPartnershipToggle = () => {
    const nextVal = !isChamberPartnershipRequested;
    setIsChamberPartnershipRequested(nextVal);
    if (nextVal) {
      addNotification(
        'Partnership Initiated',
        'Bilateral textile aggregate recovery partnership request broadcasted to EcoBrick Smelting.',
        'success'
      );
    } else {
      addNotification(
        'Partnership Recalled',
        'Bilateral partnership request withdrawn.',
        'warning'
      );
    }
  };

  const getRoleTheme = () => {
    switch (user?.role) {
      case 'buyer': return { text: 'text-yellow-600', bg: 'bg-yellow-600', bgAlpha: 'bg-yellow-600/10', border: 'border-yellow-600', title: 'Circular Commodity Procurement', icon: 'shopping_basket', ring: 'shadow-[0_0_20px_rgba(202,138,4,0.15)]' };
      default: return { text: 'text-zinc-900', bg: 'bg-zinc-900', bgAlpha: 'bg-zinc-900/10', border: 'border-zinc-900', title: 'Industrial Ecosystem Exchange', icon: 'hub', ring: 'shadow-[0_0_20px_rgba(24,24,27,0.15)]' };
    }
  };

  const theme = getRoleTheme();

  const filteredListings = listings.filter(item => {
    if (activeFilter === 'ALL') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header section with explicit Indian Legality Compliance notice */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
        <div className="space-y-2">
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
            Exchange Module
          </span>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter mt-1 flex items-center gap-3">
            <span className={`material-symbols-outlined ${theme.text} text-4xl md:text-5xl`}>{theme.icon}</span>
            {theme.title}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            Ecosystem value intelligence dashboard for industrial byproduct secondary aggregates. Track demand indices, region-wise availability, and trade secondary materials.
          </p>
          
          {/* Indian Legal Compliance Badge */}
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/70 font-semibold bg-surface/40 px-3 py-1.5 rounded-lg border border-outline-variant/25 max-w-max">
            <span className="material-symbols-outlined text-[12px] text-amber-500 font-bold">gavel</span>
            <span>MOEFCC Waste Management Rules compliant. Strictly positioned as a Circular Material Value Exchange / Marketplace Intelligence platform, not a financial securities trading engine.</span>
          </div>
        </div>

        <div className={`glass-panel px-5 py-2.5 rounded-full flex items-center gap-3 border border-outline-variant/20 ${theme.ring} animate-pulse shrink-0`}>
          <span className={`w-2 h-2 rounded-full ${theme.bg}`} />
          <span className={`font-label-caps text-xs ${theme.text} font-bold uppercase tracking-wider`}>Spot Analytics Live</span>
        </div>
      </header>

      {/* Scrolling Ticker Panel */}
      <div className="w-full bg-surface-container-low/40 border border-outline-variant/20 rounded-xl p-3 overflow-hidden relative shadow-inner">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs font-bold text-on-surface">
          {commodityIndexes.map((idx, index) => (
            <div key={`ticker-${index}`} className="flex items-center gap-2 border-r border-outline-variant/30 pr-8">
              <span className="text-on-surface-variant font-medium">{idx.name}:</span>
              <span className="font-mono text-on-background">{idx.value}</span>
              <span className={`flex items-center font-bold ${idx.color}`}>
                {idx.trend === 'up' ? '▲' : '▼'} {idx.percentage}
              </span>
            </div>
          ))}
          {commodityIndexes.map((idx, index) => (
            <div key={`ticker-dup-${index}`} className="flex items-center gap-2 border-r border-outline-variant/30 pr-8">
              <span className="text-on-surface-variant font-medium">{idx.name}:</span>
              <span className="font-mono text-on-background">{idx.value}</span>
              <span className={`flex items-center font-bold ${idx.color}`}>
                {idx.trend === 'up' ? '▲' : '▼'} {idx.percentage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Holographic Chart and Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Holographic Sieve price trend Area Chart (Col Span 8) */}
        <section className="lg:col-span-8 glass-panel rounded-2xl p-6 flex flex-col justify-between border border-outline-variant/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/15 pb-4 mb-4">
            <div>
              <h2 className="font-headline-md text-base font-bold text-on-background flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">show_chart</span>
                Holographic Index Trends — Gujarat Textile Recovery Index
              </h2>
              <p className="text-[10px] text-on-surface-variant font-medium">Real-time secondary textile aggregate pricing index across Vance mills and buyers.</p>
            </div>

            {/* Chart timeline controls */}
            <div className="flex gap-1 bg-surface-container-low border border-outline-variant/20 p-1 rounded-lg text-[9px] font-bold">
              {(['1D', '1W', '1M', 'YTD'] as const).map((tl) => (
                <button
                  key={tl}
                  onClick={() => setChartTimeline(tl)}
                  className={`px-2.5 py-1 rounded transition-all ${chartTimeline === tl ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {tl}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Pulsing Area Chart */}
          <div className="relative w-full h-64 bg-surface-container-lowest/30 rounded-xl border border-outline-variant/10 overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-5 [grid-template-rows:repeat(4,1fr)] opacity-10 pointer-events-none">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={`row-${i}`} className="border-b border-on-surface" />
              ))}
            </div>
            
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 450 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4cf2c2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4cf2c2" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Pulsing Area block under the curve */}
              <path 
                d={`M 30,200 L ${chartPoints.map(p => `${p.x},${p.y}`).join(' L ')} L 390,200 Z`}
                fill="url(#chartGlow)"
                className="transition-all duration-500"
              />

              {/* Line Curve */}
              <path
                d={chartPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#4cf2c2"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* Interactive Point dots */}
              {chartPoints.map((p, idx) => (
                <g 
                  key={idx} 
                  className="cursor-pointer group/point"
                  onMouseEnter={() => setHoveredChartPoint(p)}
                  onMouseLeave={() => setHoveredChartPoint(null)}
                >
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="5" 
                    fill="#fff" 
                    stroke="#06b6d4" 
                    strokeWidth="2.5"
                    className="transition-all duration-300 hover:scale-[1.5]"
                  />
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="10" 
                    fill="rgba(76,242,194,0.15)" 
                    className="animate-ping pointer-events-none"
                  />
                </g>
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredChartPoint && (
              <div 
                className="absolute bg-surface-bright/95 backdrop-blur-md rounded-lg p-2 border border-primary shadow-lg text-[10px] font-bold font-mono text-on-surface flex flex-col pointer-events-none transition-all duration-200"
                style={{ 
                  left: `${(hoveredChartPoint.x / 450) * 100}%`, 
                  top: `${(hoveredChartPoint.y / 200) * 100 - 15}%`,
                  transform: 'translate(-50%, -100%)' 
                }}
              >
                <span className="text-on-surface-variant font-medium">{hoveredChartPoint.label}</span>
                <span className="text-primary font-bold">{hoveredChartPoint.price}</span>
              </div>
            )}

            {/* Legend indicators */}
            <div className="absolute bottom-2 left-4 text-[8px] text-on-surface-variant font-bold font-mono">
              Y-axis: ₹ Price Index / Ton • X-axis: Time scale
            </div>
          </div>
        </section>

        {/* Region-wise Sustainability Commodity Heatmap (Col Span 4) */}
        <section className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col justify-between border border-outline-variant/20">
          <div>
            <div className="border-b border-outline-variant/15 pb-4 mb-4">
              <h3 className="font-headline-md text-base text-secondary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">explore</span>
                Regional Demand Intelligence
              </h3>
              <p className="font-metadata text-[10px] text-on-surface-variant mt-0.5">Interactive sustainability commodity heatmap matching GIDCs and special zones.</p>
            </div>

            <div className="space-y-3 font-semibold text-xs text-on-surface">
              {regionalHeatmap.map((item, idx) => {
                const isSelected = selectedRegion === item.zone;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedRegion(item.zone)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                      isSelected 
                        ? 'bg-primary-container/10 border-primary shadow-[0_0_10px_rgba(76,242,194,0.15)]' 
                        : 'bg-surface/30 border-outline-variant/10 hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <span className="text-on-background font-bold block text-xs">{item.zone}</span>
                      <span className="text-[9px] text-on-surface-variant block mt-0.5">{item.category}</span>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className={`w-2.5 h-2.5 rounded ${item.color} shadow-sm inline-block`} />
                        <span className="font-mono font-bold text-xs">{item.demandStrength}%</span>
                      </div>
                      <span className="text-[8.5px] text-on-surface-variant block mt-0.5">{item.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] text-on-surface-variant/80 border-t border-outline-variant/10 pt-3 mt-4 leading-relaxed font-semibold">
            {selectedRegion ? (
              <p>📍 <strong className="text-on-background">{selectedRegion} Intel:</strong> Sourcing index shows robust organic recovery flow ratios. Multi-layer contracts are stable.</p>
            ) : (
              <p>Select a region above to read localized flow intelligence.</p>
            )}
          </div>
        </section>

      </div>

      {/* Bento Grid layout: Chamber & AI Market Intelligence Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Highlight Chamber Card (Spans 7 cols) */}
        <section className="col-span-1 md:col-span-7 glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-primary transition-all duration-500 flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface/20 to-surface-variant/10 z-0 pointer-events-none" />
          
          <div>
            <div className="relative z-10 flex justify-between items-center mb-5 border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-md text-xl text-on-background font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary fill-1">view_in_ar</span>
                Innovation Chamber — Micro-Sieve Material Phase
              </h2>
              <span className="font-label-caps text-[10px] text-on-surface-variant border border-outline-variant/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Spot Caster</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="relative h-56 w-full rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 shadow-lg border border-outline-variant/20">
                <Image 
                  alt="Eco Brick Transformation" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiyZwIT3lyJM1N84_gWDILWWO_3qqfXDzcVFPBsFSY8wd3y0GWiqSAN9szWJzVXe_MKTOS-AEHMGOpIMPW3EU12oCT7zvm2NxrKWhNaqXFLKPmPKUWXDaCMzaRINnziC8aYizCAK5hhI6eu-ciw4qB5qNfoBkEsEDBQxwNIkxdoDp4_VqfJ5xhRRocwee-9_kCiyrGNBnLr75OsycKYPZDDDDxSv6mzfIfrhncipg67mMSHHd-E6mdJ8swgIlTh88q_yEkMhlwMQ"
                  fill
                  className="object-cover opacity-95 mix-blend-overlay scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <p className="font-metadata text-[10px] text-primary font-bold uppercase tracking-wider">Casting Spec</p>
                    <p className="font-headline-md text-base text-on-background font-extrabold">Secondary Bio-Brick Cures</p>
                  </div>
                  <div className="glass-panel rounded-full p-2 holographic-glow flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm animate-spin-slow">sync</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-on-background mb-1">Industrial Sludge Consolidation</h3>
                  <p className="font-body-main text-xs text-on-surface-variant leading-relaxed font-semibold">
                    Compacting coarse GIDC metallurgical sludge into structural aggregates. Eliminates kiln toxicity risks using cold alkaline binders.
                  </p>
                </div>
                
                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-1.5">
                    <span className="text-on-surface-variant font-medium">Circularity Purity</span>
                    <span className="text-primary font-bold text-sm">98.4%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-1.5">
                    <span className="text-on-surface-variant font-medium">Pricing Compency</span>
                    <span className="text-primary font-bold text-sm">₹12,400 per Ton</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant font-medium">Active Partners</span>
                    <span className="text-secondary font-bold text-sm">4 Facilities Linked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleChamberPartnershipToggle}
            className="w-full mt-6 py-3 bg-primary hover:bg-secondary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md relative z-10"
          >
            {isChamberPartnershipRequested ? 'Bilateral Partnership Requested ✓' : 'Initiate Bilateral Partnership'}
          </button>
        </section>

        {/* AI Market Intelligence Predictions Panel (Spans 5 cols) */}
        <section className="col-span-1 md:col-span-5 glass-panel rounded-2xl p-6 border border-primary-container bg-primary-container/[0.01] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-outline-variant/15 pb-3">
              <span className="font-label-caps text-[9px] text-primary border border-primary/20 bg-primary-container/10 px-2 py-0.5 rounded uppercase font-bold">Predictive AI Engine</span>
              <h3 className="text-base font-extrabold text-on-background mt-2">AI Secondary Commodity Forecasts</h3>
              <p className="text-[10px] text-on-surface-variant">XGBoost prediction logs evaluating next quarter supply constraints.</p>
            </div>

            <div className="space-y-3 text-xs font-semibold text-on-surface-variant">
              <div className="p-2.5 bg-surface-container-low/40 border border-outline-variant/15 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="text-on-background font-bold">Future Demand Outlook</span>
                  <span className="text-primary font-bold">Robust (+15.2%)</span>
                </div>
                <p className="text-[9.5px] leading-tight text-on-surface-variant/80">Textile fiber aggregates are predicting increased demand in Mumbai and Surat construction zones due to standard cement scarcity.</p>
              </div>

              <div className="p-2.5 bg-surface-container-low/40 border border-outline-variant/15 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="text-on-background font-bold">Pricing Volatility Index</span>
                  <span className="text-secondary font-bold">Low Volatility (12%)</span>
                </div>
                <p className="text-[9.5px] leading-tight text-on-surface-variant/80">Slight spot-price fluctuations expected in acid wash chemicals because of newly opened regional recycler nodes in Tiruppur.</p>
              </div>

              <div className="p-2.5 bg-surface-container-low/40 border border-outline-variant/15 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="text-on-background font-bold">Buyer Sourcing Probability</span>
                  <span className="text-primary font-bold">94% Matching Score</span>
                </div>
                <p className="text-[9.5px] leading-tight text-on-surface-variant/80">Vance textile mills currently has a 94% compatibility match with nearby construction aggregates for aggregate sludge cures.</p>
              </div>
            </div>
          </div>

          <div className="p-2 border border-primary/10 rounded-xl bg-primary-container/5 text-center mt-4">
            <span className="font-metadata text-[8px] text-primary font-bold uppercase tracking-wider block">AI Forecast Confidence: 91.4% (R-Squared)</span>
          </div>
        </section>

      </div>

      {/* Interactive Secondary Bidding Board */}
      <section className="glass-panel rounded-2xl p-6 border border-outline-variant/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-outline-variant/15 pb-4">
          <div>
            <h2 className="font-headline-md text-lg text-on-background font-bold">Secondary Bidding Board</h2>
            <p className="text-[11px] text-on-surface-variant font-medium">Bilateral spot bids and supply chain procurement tenders.</p>
          </div>

          <div className="flex gap-1 bg-surface-container-low border border-outline-variant/20 p-1 rounded-xl text-[10.5px] font-bold">
            {(['ALL', 'WASTE', 'PRODUCT', 'CONTRACT', 'TENDER'] as const).map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === filter ? `${theme.bg} text-black font-bold shadow-sm` : 'text-on-surface-variant hover:text-white'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-surface/40 border border-outline-variant/15 flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-label-caps text-[8px] ${theme.bgAlpha} ${theme.text} border ${theme.border}/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold`}>{item.type}</span>
                  <span className="font-metadata text-[10px] text-on-surface-variant font-mono">{item.timestamp}</span>
                </div>
                <h4 className="text-sm font-bold text-on-background mt-3">{item.title}</h4>
                <p className="text-[10.5px] text-on-surface-variant mt-1 font-semibold">Material: {item.material} • Volume: {item.volume}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-outline-variant/10 space-y-3 font-semibold text-xs text-on-surface">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant font-medium">Current active bid</span>
                  <span className="text-sm font-extrabold text-primary font-mono">{item.currentBid}</span>
                </div>
                {item.highestBidder && (
                  <div className="flex justify-between text-[10px]">
                    <span className="text-on-surface-variant font-medium">Highest bidder</span>
                    <span className="text-secondary font-bold">{item.highestBidder}</span>
                  </div>
                )}
                
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handlePlaceBidSubmit(item.id, item.currentBid)}
                    className="flex-1 py-2 bg-primary hover:bg-secondary text-white font-label-caps text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm"
                  >
                    Bid +₹15,000
                  </button>
                  <button 
                    onClick={() => togglePartnershipOnListing(item.id)}
                    className={`flex-1 py-2 border font-label-caps text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all ${
                      item.isPartnershipRequested 
                        ? 'bg-secondary border-secondary text-white' 
                        : 'border-outline-variant/30 text-on-surface-variant hover:border-primary'
                    }`}
                  >
                    {item.isPartnershipRequested ? 'Requested ✓' : 'Partnership'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
