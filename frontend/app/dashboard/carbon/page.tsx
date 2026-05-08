'use client';

import React from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function CarbonReductionAnalytics() {
  const { avoidedCarbonTons } = useCircular();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            ESG Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Carbon Reduction Analytics
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Real-time carbon accounting ledgers, Scope 1, 2 & 3 emissions offset reporting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Carbon stats (Col Span 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Scope 3 Avoided Carbon</h3>
            <span className="font-display-hero text-4xl font-extrabold text-primary">{avoidedCarbonTons.toLocaleString()} Tons</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Calculated dynamically as offsets from recycling smelting and physical slurry byproducts.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Scope 2 Electricity Offsets</h3>
            <span className="font-display-hero text-4xl font-extrabold text-secondary">4,210 MWh</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Consolidated grid energy conservation derived from pre-cured physical byproducts.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Avoided landfill methane</h3>
            <span className="font-display-hero text-4xl font-extrabold text-tertiary">2,450 kg CO2e</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Methane equivalents avoided from organic fibers and solid smelter slag treatments.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl hover-lift flex flex-col justify-between">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Circularity Offset Multiplier</h3>
            <span className="font-display-hero text-4xl font-extrabold text-on-background">1.84x</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Net multiplier rating representing carbon efficacy per dollar invested.
            </p>
          </div>
        </div>

        {/* Audit lists (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-headline-md text-base text-primary font-bold mb-4">Emissions ledger logs</h3>
            
            <div className="space-y-4 text-xs font-semibold text-on-surface">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">SEC Climate Match</span>
                <span className="text-primary font-bold">100% Consistent</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">SBTi Target Progress</span>
                <span className="text-secondary font-bold">85% Match</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-on-surface-variant">Verification Hash</span>
                <span className="font-mono text-on-surface-variant">0x8a1b...3f7d</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
