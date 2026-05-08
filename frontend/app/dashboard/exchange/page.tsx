'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCircular } from '@/lib/CircularContext';

export default function IndustrialExchange() {
  const { listings, placeBidOnListing, togglePartnershipOnListing, addNotification } = useCircular();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'WASTE' | 'PRODUCT' | 'CONTRACT' | 'TENDER'>('ALL');
  
  // Local state for Highlight Chamber partnership
  const [isChamberPartnershipRequested, setIsChamberPartnershipRequested] = useState(false);

  // Commodity indexes default simulation
  const commodityIndexes = [
    { name: 'Textile Sludge Index', value: '₹4,800/T', trend: 'up', percentage: '14%', color: 'text-primary' },
    { name: 'Pigment Recovery Demand', value: '₹12,400/T', trend: 'up', percentage: '21%', color: 'text-primary' },
    { name: 'Smelter Slag Index', value: '₹9,500/T', trend: 'down', percentage: '2%', color: 'text-error' },
    { name: 'Fly Ash Aggregate', value: '₹3,100/T', trend: 'up', percentage: '8%', color: 'text-primary' },
    { name: 'Chemical wash residues', value: '₹140/L', trend: 'up', percentage: '11%', color: 'text-primary' }
  ];

  const handlePlaceBidSubmit = (id: string, currentBid: string) => {
    const numericVal = parseFloat(currentBid.replace(/[^0-9.]/g, '')) || 5000;
    const nextBid = numericVal + 25000; // Increment bids in ₹
    placeBidOnListing(id, nextBid, 'Your Facility Terminal');
  };

  const handleChamberPartnershipToggle = () => {
    const nextVal = !isChamberPartnershipRequested;
    setIsChamberPartnershipRequested(nextVal);
    if (nextVal) {
      addNotification(
        'Partnership Initiated',
        'Circular metallurgical sludge curing partnership contract request broadcasted to EcoBrick Smelting.',
        'success'
      );
    } else {
      addNotification(
        'Partnership Recalled',
        'Bilateral partnership request with EcoBrick Smelting withdrawn.',
        'warning'
      );
    }
  };

  const filteredListings = listings.filter(item => {
    if (activeFilter === 'ALL') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Exchange Module
          </span>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter mt-3">
            Circular Commodity Exchange
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
            Trade industrial byproducts as high-yield financial commodities. Monitor real-time indexes, forecasts, and pricing fluctuations.
          </p>
        </div>
        <div className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-3 border border-primary-container shadow-[0_0_20px_rgba(76,242,194,0.15)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary-fixed" />
          <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">Stock Feed Live</span>
        </div>
      </div>

      {/* FEATURE 6: Live stock ticker panel */}
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
          {/* Duplicate to create a perfect seamless carousel */}
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

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Highlight Chamber Card (Spans 8 cols) */}
        <section className="col-span-1 md:col-span-8 glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-primary transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface/20 to-surface-variant/10 z-0 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline-md text-xl text-on-background font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary fill-1">view_in_ar</span>
                Innovation Chamber
              </h2>
              <span className="font-label-caps text-[10px] text-on-surface-variant border border-outline-variant/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Live Preview</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Highlight image frame */}
              <div className="relative h-64 w-full rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 shadow-lg border border-outline-variant/20">
                <Image 
                  alt="Eco Brick Transformation" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiyZwIT3lyJM1N84_gWDILWWO_3qqfXDzcVFPBsFSY8wd3y0GWiqSAN9szWJzVXe_MKTOS-AEHMGOpIMPW3EU12oCT7zvm2NxrKWhNaqXFLKPmPKUWXDaCMzaRINnziC8aYizCAK5hhI6eu-ciw4qB5qNfoBkEsEDBQxwNIkxdoDp4_VqfJ5xhRRocwee-9_kCiyrGNBnLr75OsycKYPZDDDDxSv6mzfIfrhncipg67mMSHHd-E6mdJ8swgIlTh88q_yEkMhlwMQ"
                  fill
                  className="object-cover opacity-95 mix-blend-overlay scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
                {/* Overlay text */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <p className="font-metadata text-[10px] text-primary font-bold uppercase tracking-wider">Material Phase</p>
                    <p className="font-headline-md text-lg text-on-background font-extrabold">Bio-Brick Cured</p>
                  </div>
                  <div className="glass-panel rounded-full p-2 holographic-glow flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">sync</span>
                  </div>
                </div>
              </div>

              {/* Highlight description details */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-on-background mb-1">Industrial Sludge Conversion</h3>
                  <p className="font-body-main text-xs text-on-surface-variant leading-relaxed">
                    Transforming high-density chemical waste streams into high-strength architectural bio-materials. Real-time molecular monitoring active.
                  </p>
                </div>
                
                <div className="space-y-3.5 text-xs font-semibold">
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                    <span className="text-on-surface-variant font-medium">Recovery Score</span>
                    <span className="text-primary font-bold text-sm">98.4%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                    <span className="text-on-surface-variant font-medium">Demand Level</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-primary-container rounded-sm"></span>
                      <span className="w-1.5 h-4 bg-primary-container rounded-sm"></span>
                      <span className="w-1.5 h-4 bg-primary-container rounded-sm"></span>
                      <span className="w-1.5 h-4 bg-surface-variant rounded-sm"></span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-on-surface-variant font-medium">Est. Sustainability Value</span>
                    <span className="text-on-background font-bold">+420 Eco-Credits</span>
                  </div>
                </div>

                <button 
                  onClick={handleChamberPartnershipToggle}
                  className={`w-full py-3 rounded-xl border font-label-caps text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                    isChamberPartnershipRequested 
                      ? 'bg-primary text-white border-primary holographic-glow shadow-[0_0_15px_#7fffd4]' 
                      : 'border-primary-container text-on-background hover:bg-primary-container/20 hover:holographic-glow-active'
                  }`}
                >
                  {isChamberPartnershipRequested ? '✓ Partnership Initiated' : 'Initiate Partnership'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Insights & Commodity Leaderboard (Spans 4 cols) */}
        <section className="col-span-1 md:col-span-4 flex flex-col gap-6">
          {/* Dynamic Leaderboard for commodity performance */}
          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover-lift flex-grow border border-outline-variant/20">
            <div className="border-b border-outline-variant/15 pb-3 mb-3">
              <h3 className="font-headline-md text-base font-bold text-on-background flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">trending_up</span>
                Top Recovery Assets
              </h3>
            </div>
            <div className="space-y-3.5 text-xs font-semibold text-on-surface">
              <div className="flex justify-between">
                <span>1. Cured Slag concrete</span>
                <span className="text-primary font-bold">+28% Vol</span>
              </div>
              <div className="flex justify-between">
                <span>2. Neutralized dye wash</span>
                <span className="text-primary font-bold">+18% Vol</span>
              </div>
              <div className="flex justify-between">
                <span>3. Pulped lignin fibers</span>
                <span className="text-on-surface-variant font-medium">Stable</span>
              </div>
            </div>
          </div>

          {/* Bidding Location Map */}
          <div className="glass-panel rounded-2xl p-4 flex flex-col hover-lift relative overflow-hidden min-h-[140px] border border-outline-variant/20">
            <div className="flex justify-between items-center mb-3 z-10">
              <span className="font-label-caps text-[10px] text-on-surface-variant font-bold tracking-wider uppercase">Regional Demand Hubs</span>
              <span className="material-symbols-outlined text-primary text-base">my_location</span>
            </div>
            <div className="relative w-full flex-grow rounded-xl overflow-hidden min-h-[100px] bg-surface-variant/30 border border-outline-variant/10">
              {/* Fake mapping markers */}
              <div className="absolute top-1/4 left-1/3 w-3.5 h-3.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(127,255,212,0.8)] border-2 border-white animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-secondary-container" />
              <div className="absolute top-1/2 right-1/3 w-5 h-5 rounded-full border border-primary-container flex items-center justify-center pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Industrial Exchange Feed (Spans 12 cols) */}
        <section className="col-span-1 md:col-span-12 glass-panel rounded-2xl p-6">
          <div className="flex flex-wrap justify-between items-center mb-6 border-b border-outline-variant/20 pb-4 gap-4">
            <h2 className="font-headline-md text-xl text-on-background font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">dynamic_feed</span>
              Live Industrial Exchange
            </h2>
            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
              {['ALL', 'WASTE', 'PRODUCT', 'CONTRACT', 'TENDER'].map(t => (
                <button 
                  key={t}
                  onClick={() => setActiveFilter(t as any)}
                  className={`px-4 py-2 rounded-full border transition-all ${activeFilter === t ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:bg-surface-dim'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Table headers (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-3 bg-surface-container-low/40 border border-outline-variant/15 rounded-xl text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-4">
            <span className="col-span-3">Material Listing</span>
            <span className="col-span-2">Owner Facility</span>
            <span className="col-span-1 text-center">Circularity</span>
            <span className="col-span-2 text-right">Base / High Bid</span>
            <span className="col-span-2 text-center">Haulage complexity</span>
            <span className="col-span-2 text-center">Bilateral Actions</span>
          </div>

          {/* Listings iteration */}
          <div className="space-y-4">
            {filteredListings.map((item) => (
              <div 
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center p-4 bg-surface/40 hover:bg-surface/80 border border-outline-variant/15 hover:border-primary-container transition-all duration-300 rounded-xl shadow-sm"
              >
                
                {/* 1. Name & category */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary/25 flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-lg">
                      {item.type === 'WASTE' ? 'water_drop' : item.type === 'PRODUCT' ? 'architecture' : 'gavel'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-background leading-tight">{item.title}</h4>
                    <span className="font-metadata text-[10px] text-on-surface-variant uppercase font-bold tracking-wider block mt-1">
                      {item.material} • <span className="text-primary">{item.volume}</span>
                    </span>
                  </div>
                </div>

                {/* 2. Facility */}
                <div className="col-span-2 text-xs font-semibold text-on-surface-variant">
                  <span className="block truncate">{item.ownerOrg}</span>
                  <span className="font-metadata text-[9px] uppercase font-bold tracking-wide mt-0.5 text-on-surface-variant/75">{item.ownerRole}</span>
                </div>

                {/* 3. Circularity score */}
                <div className="col-span-1 text-center">
                  <span className="font-display-hero text-sm font-black text-primary">{item.recoveryScore}%</span>
                  <span className="block font-metadata text-[8px] text-on-surface-variant font-bold uppercase mt-0.5">Rating</span>
                </div>

                {/* 4. Pricing / bids */}
                <div className="col-span-2 text-right text-xs font-bold space-y-1">
                  <div className="text-on-surface-variant font-medium">Base: <span className="font-mono text-on-background">{item.basePrice}</span></div>
                  <div className="text-secondary font-extrabold text-sm">Bid: <span className="font-mono">{item.currentBid}</span></div>
                  <span className="font-metadata text-[9px] bg-secondary-container/15 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full inline-block font-bold mt-1">
                    {item.bidsCount} active bids
                  </span>
                </div>

                {/* 5. Haulage difficulty */}
                <div className="col-span-2 text-center text-xs font-semibold text-on-surface-variant">
                  <span className="material-symbols-outlined text-base block text-on-surface-variant/60 mb-0.5">local_shipping</span>
                  <span className="font-metadata text-[10px]">{item.logisticsComplexity}</span>
                </div>

                {/* 6. Action triggers */}
                <div className="col-span-2 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2">
                  <button 
                    onClick={() => handlePlaceBidSubmit(item.id, item.currentBid)}
                    className="flex-1 py-2 px-3 bg-secondary text-white hover:bg-primary font-label-caps text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all text-center shadow-sm"
                  >
                    Place Bid
                  </button>

                  <button 
                    onClick={() => togglePartnershipOnListing(item.id)}
                    className={`flex-1 py-2 px-3 border font-label-caps text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all text-center ${
                      item.isPartnershipRequested 
                        ? 'bg-primary text-white border-primary holographic-glow shadow-[0_0_12px_#7fffd4]' 
                        : 'border-outline-variant hover:bg-surface-dim text-on-background'
                    }`}
                  >
                    {item.isPartnershipRequested ? '✓ Linked' : 'Partner'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
