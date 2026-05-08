'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function ProductInnovationLab() {
  const { generatedProducts, saveProduct, listProductOnMarketplace, startRecoveryWorkflow } = useCircular();
  const [listingPrices, setListingPrices] = useState<{[key: string]: string}>({});

  const handlePriceChange = (id: string, price: string) => {
    setListingPrices(prev => ({ ...prev, [id]: price }));
  };

  const handleListingSubmit = (id: string) => {
    const price = listingPrices[id] || '$12,000';
    listProductOnMarketplace(id, price);
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Innovation Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            AI Product Innovation Lab
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Transform parsed waste streams into highly profitable, realistic industrial assets and architectural panels.
          </p>
        </div>
      </div>

      {/* Rotating 3D Blueprint Capsule Pods Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {generatedProducts.map((prod) => (
          <div 
            key={prod.id}
            className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover-lift border border-outline-variant/25 hover:border-primary-container/80 shadow-[0_0_30px_rgba(76,242,194,0.05)] transition-all duration-300 relative overflow-hidden group"
          >
            {/* Immersive radial glows */}
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary-container/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            
            <div className="relative z-10 space-y-5">
              <div className="flex justify-between items-start border-b border-outline-variant/15 pb-3">
                <div>
                  <span className="font-metadata text-[10px] text-primary font-bold uppercase tracking-widest">3D Capsule Pod v2</span>
                  <h3 className="font-headline-md text-lg text-on-background font-extrabold mt-1">{prod.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-container/25 flex items-center justify-center border border-primary/30 text-primary">
                  <span className="material-symbols-outlined text-sm animate-spin-slow">cycle</span>
                </div>
              </div>

              {/* Holographic Specification table */}
              <div className="space-y-3.5 text-xs font-medium text-on-surface">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Match Confidence</span>
                  <span className="text-primary font-bold">{prod.feasibilityScore}%</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Required Equipment</span>
                  <span className="font-semibold text-right max-w-[200px] truncate" title={prod.machineryRequirement}>{prod.machineryRequirement}</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Workforce Scope</span>
                  <span className="text-on-surface">{prod.workforceRequirement}</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Carbon Offset</span>
                  <span className="text-secondary font-bold">{prod.carbonReduction}</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-on-surface-variant">Estimated Market Value</span>
                  <span className="font-extrabold text-on-background">{prod.estimatedMarketValue}</span>
                </div>
              </div>
            </div>

            {/* Micro Interaction Triggers */}
            <div className="mt-8 pt-4 border-t border-outline-variant/15 flex flex-col gap-4 relative z-10">
              <div className="flex gap-4">
                <button 
                  onClick={() => saveProduct(prod.id)}
                  disabled={prod.isSaved}
                  className={`flex-1 py-2.5 rounded-lg border font-label-caps text-[10px] font-bold uppercase tracking-wider transition-colors ${prod.isSaved ? 'bg-surface border-outline-variant/20 text-on-surface-variant/50' : 'border-primary text-primary hover:bg-primary hover:text-on-primary'}`}
                >
                  {prod.isSaved ? 'Blueprint Saved' : 'Save Blueprint'}
                </button>
                <button 
                  onClick={() => startRecoveryWorkflow(prod.id)}
                  className="flex-1 py-2.5 bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-on-primary rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  Start Workflow
                </button>
              </div>

              {/* Quick List Marketplace trigger form */}
              <div className="flex items-center gap-3 bg-surface-container-low/40 p-2.5 rounded-xl border border-outline-variant/25">
                <input 
                  type="text" 
                  value={listingPrices[prod.id] || ''}
                  onChange={(e) => handlePriceChange(prod.id, e.target.value)}
                  placeholder="Listing Price ($)" 
                  disabled={prod.isListed}
                  className="bg-white border border-outline-variant/30 rounded-lg px-3 py-1.5 font-body-main text-xs text-on-background flex-grow focus:outline-none focus:border-primary disabled:opacity-50"
                />
                <button 
                  onClick={() => handleListingSubmit(prod.id)}
                  disabled={prod.isListed}
                  className={`px-4 py-2 font-label-caps text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors shrink-0 ${prod.isListed ? 'bg-surface-variant/40 text-on-surface-variant/50' : 'bg-primary text-white hover:bg-secondary'}`}
                >
                  {prod.isListed ? 'Listed on Marketplace' : 'List on Exchange'}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
