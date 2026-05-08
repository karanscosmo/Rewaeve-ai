'use client';

import React from 'react';

export default function PlatformBilling() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Billing Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Subscription & Platform Billing
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Manage enterprise licensing boundaries, circularity matching quotas, and operational carbon credits.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Tier status card */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="font-metadata text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 border border-primary/25 px-2.5 py-1 rounded-full">Current License</span>
            <h3 className="font-display-hero text-3xl font-extrabold text-on-background tracking-tight mt-4">Enterprise Circular Node</h3>
            <p className="text-xs text-on-surface-variant mt-2">Allows up to 25 enrolled facilities, unlimited neural CSV parsing, and direct matching vectors with certified recyclers.</p>
          </div>

          <div className="mt-8 pt-4 border-t border-outline-variant/15 flex justify-between items-center text-xs font-semibold">
            <span className="text-on-surface-variant">Annual Renewal Date</span>
            <span className="font-mono">Dec 15, 2026</span>
          </div>
        </div>

        {/* Quota Usage card */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <h3 className="font-headline-md text-base text-secondary font-bold mb-4">Ecosystem Quotas</h3>
          
          <div className="space-y-4 text-xs font-semibold text-on-surface">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span>Facility Data Streams Ingested</span>
                <span className="text-secondary">4,820 / 10,000 Tons</span>
              </div>
              <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[48%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span>Ecosystem Interlink Matches</span>
                <span className="text-primary">12 / 50 Nodes</span>
              </div>
              <div className="w-full h-1.5 bg-outline-variant/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[24%]" />
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all">
            Upgrade Quota Volume
          </button>
        </div>

      </div>

    </div>
  );
}
