'use client';

import React from 'react';

export default function SupplyChainIntelligence() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Logistics Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Supply Chain Intelligence
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Route optimization, transport carbon accounting, and decentralized material procurement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Logistics stats (Col Span 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Freight distance minimized</h3>
            <span className="font-display-hero text-4xl font-extrabold text-primary">1,850 km</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Achieved by replacing international imports with localized secondary matches.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Transport carbon avoidance</h3>
            <span className="font-display-hero text-4xl font-extrabold text-secondary">324 Tons</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Consolidated carbon offset derived solely from short-range routing optimization.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Average Route Proximity</h3>
            <span className="font-display-hero text-4xl font-extrabold text-tertiary">18.5 km</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Highly compact regional circular networks limit logistical overheads.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Carrier Dispatch Efficiency</h3>
            <span className="font-display-hero text-4xl font-extrabold text-on-background">94.8%</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Automated smart contracts lock haulage parameters instantly on bid confirmation.
            </p>
          </div>
        </div>

        {/* Carrier list (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-headline-md text-base text-secondary font-bold mb-4">Certified circular carriers</h3>
            
            <div className="space-y-3.5 text-xs font-semibold text-on-surface">
              <div className="p-3 bg-surface/30 border border-outline-variant/15 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-on-background">EcoFreight Haulage</h4>
                  <span className="text-[10px] text-on-surface-variant">Distance: 8 km away</span>
                </div>
                <span className="text-primary font-bold">98% Match</span>
              </div>

              <div className="p-3 bg-surface/30 border border-outline-variant/15 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-on-background">GreenBox Tankers</h4>
                  <span className="text-[10px] text-on-surface-variant">Distance: 14 km away</span>
                </div>
                <span className="text-secondary font-bold">92% Match</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
