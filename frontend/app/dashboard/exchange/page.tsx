'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCircular } from '@/lib/CircularContext';

export default function IndustrialExchange() {
  const { listings, placeBidOnListing, togglePartnershipOnListing, addNotification } = useCircular();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'WASTE' | 'PRODUCT' | 'CONTRACT' | 'TENDER'>('ALL');
  
  // Local state for Highlight Chamber partnership
  const [isChamberPartnershipRequested, setIsChamberPartnershipRequested] = useState(false);

  // Commodity indexes requested specifically by user
  const commodityIndexes = [
    { name: 'Gujarat Textile Recovery Index', value: '₹14,800/T', trend: 'up', percentage: '12%', color: 'text-primary' },
    { name: 'Circular Material Demand Index', value: '₹18,400/T', trend: 'up', percentage: '18%', color: 'text-primary' },
    { name: 'Eco Construction Material Index', value: '₹8,500/T', trend: 'down', percentage: '3%', color: 'text-error' },
    { name: 'Industrial Pigment Demand Trends', value: '₹22,100/T', trend: 'up', percentage: '24%', color: 'text-primary' }
  ];

  const handlePlaceBidSubmit = (id: string, currentBid: string) => {
    const numericVal = parseFloat(currentBid.replace(/[^0-9.]/g, '')) || 50000;
    const nextBid = numericVal + 15000; // Increment bids in ₹
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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
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
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">Stock Feed Live</span>
        </div>
      </header>

      {/* Ticker Panel */}
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
              <div className="relative h-64 w-full rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 shadow-lg border border-outline-variant/20">
                <Image 
                  alt="Eco Brick Transformation" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiyZwIT3lyJM1N84_gWDILWWO_3qqfXDzcVFPBsFSY8wd3y0GWiqSAN9szWJzVXe_MKTOS-AEHMGOpIMPW3EU12oCT7zvm2NxrKWhNaqXFLKPmPKUWXDaCMzaRINnziC8aYizCAK5hhI6eu-ciw4qB5qNfoBkEsEDBQxwNIkxdoDp4_VqfJ5xhRRocwee-9_kCiyrGNBnLr75OsycKYPZDDDDxSv6mzfIfrhncipg67mMSHHd-E6mdJ8swgIlTh88q_yEkMhlwMQ"
                  fill
                  className="object-cover opacity-95 mix-blend-overlay scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />
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

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-on-background mb-1">Industrial Sludge Conversion</h3>
                  <p className="font-body-main text-xs text-on-surface-variant leading-relaxed font-semibold">
                    Transforming high-density chemical waste streams into high-strength architectural bio-materials. Real-time molecular monitoring active.
                  </p>
                </div>
                
                <div className="space-y-3.5 text-xs font-semibold">
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                    <span className="text-on-surface-variant font-medium">Recovery Score</span>
                    <span className="text-primary font-bold text-sm">98.4%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                    <span className="text-on-surface-variant font-medium">Market Demand Index</span>
                    <span className="text-primary font-bold text-sm">Strong (+14.5% MoM)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-on-surface-variant font-medium">Bilateral Partners</span>
                    <span className="text-secondary font-bold text-sm">3 Active Nodes</span>
                  </div>
                </div>

                <button 
                  onClick={handleChamberPartnershipToggle}
                  className="w-full py-3.5 bg-primary hover:bg-secondary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md relative z-10"
                >
                  {isChamberPartnershipRequested ? 'Bilateral Partnership Requested ✓' : 'Initiate Bilateral Partnership'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Live Index Performance Widgets (Spans 4 cols) */}
        <section className="col-span-1 md:col-span-4 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between">
            <div className="border-b border-outline-variant/15 pb-4">
              <h3 className="font-headline-md text-base text-secondary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary">trending_up</span>
                Live Regional Indexes
              </h3>
              <p className="font-metadata text-[10px] text-on-surface-variant mt-0.5">Real-time spot price indexes across GIDC and special economic zones.</p>
            </div>

            <div className="space-y-4 py-4 text-xs font-semibold text-on-surface-variant leading-none">
              {commodityIndexes.map((item, idx) => (
                <div key={`idx-panel-${idx}`} className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <div>
                    <span className="text-on-background font-bold block">{item.name}</span>
                    <span className="text-[10px] text-on-surface-variant/80 font-mono mt-0.5 inline-block">Index value</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-primary font-mono">{item.value}</span>
                    <span className={`block text-[10px] font-bold ${item.color} mt-0.5`}>
                      {item.trend === 'up' ? '▲' : '▼'} {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Interactive Listings Stream filter system */}
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
                className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === filter ? 'bg-primary text-white font-bold shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
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
                  <span className="font-label-caps text-[8px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold">{item.type}</span>
                  <span className="font-metadata text-[10px] text-on-surface-variant font-mono">{item.timestamp}</span>
                </div>
                <h4 className="text-sm font-bold text-on-background mt-3">{item.title}</h4>
                <p className="text-[10.5px] text-on-surface-variant mt-1">Material: {item.material} • Volume: {item.volume}</p>
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
