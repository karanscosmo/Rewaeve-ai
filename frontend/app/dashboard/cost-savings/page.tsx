'use client';

import React from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function CostSavingsDashboard() {
  const { ytdSavings } = useCircular();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Financial Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Cost Savings Hub
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Financial ledger analysis, payback period tracking, and sustainability-driven ROI forecasting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Savings summary bento cards (Col Span 8) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Total Savings YTD</h3>
            <span className="font-display-hero text-4xl font-extrabold text-primary text-glow">₹{(ytdSavings/10000000).toFixed(2)} Crore</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Consolidated net savings achieved across raw material sourcing and transport offsets in Rupees.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Procurement Optimization</h3>
            <span className="font-display-hero text-4xl font-extrabold text-secondary">+18.4%</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Increased margins from matching close-proximity secondary materials instead of pristine extraction.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Estimated CapEx Saved</h3>
            <span className="font-display-hero text-4xl font-extrabold text-tertiary">₹1.12 Crore</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Avoided facility modification penalties by utilising compatible regional separation.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Average Investment Payback</h3>
            <span className="font-display-hero text-4xl font-extrabold text-on-background">7.5 Mo</span>
            <p className="text-[11px] text-on-surface-variant/80 mt-3 leading-relaxed">
              Outstanding short payback cycles on secondary curing equipment.
            </p>
          </div>
        </div>

        {/* Financial Chart and calculations (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-headline-md text-base text-primary font-bold mb-4">Savings ledger breakdowns</h3>
            
            <div className="space-y-4 text-xs font-semibold text-on-surface">
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">Disposal Fines Avoided</span>
                <span className="text-primary font-bold">₹65,00,000</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                <span className="text-on-surface-variant">Tax / Carbon Incentives</span>
                <span className="text-secondary font-bold">₹95,00,000</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-on-surface-variant">Water reuse ledger</span>
                <span className="text-tertiary font-bold">₹12,50,000</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
