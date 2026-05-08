'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function TendersContractsExchange() {
  const { listings, createMarketplaceListing, placeBidOnListing } = useCircular();
  
  // Creation States
  const [title, setTitle] = useState('');
  const [material, setMaterial] = useState('');
  const [volume, setVolume] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [type, setType] = useState<'CONTRACT' | 'TENDER'>('TENDER');

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedPrice = basePrice.startsWith('₹') ? basePrice : `₹${basePrice}`;
    createMarketplaceListing({
      title,
      type,
      material,
      volume,
      basePrice: formattedPrice,
      recoveryScore: 88,
      logisticsComplexity: 'Standard chemical transport frames',
      sustainabilityImpact: '+240 freshwater units'
    });
    // Reset
    setTitle('');
    setMaterial('');
    setVolume('');
    setBasePrice('');
  };

  const handlePlaceBid = (id: string, currentBid: string) => {
    const rawVal = parseFloat(currentBid.replace(/[^0-9.]/g, '')) || 50000;
    const bidValue = rawVal + 15000;
    placeBidOnListing(id, bidValue, 'Your Facility Terminal');
  };

  const tenderListings = listings.filter(item => item.type === 'TENDER' || item.type === 'CONTRACT');

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Exchange Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Tenders & Contracts Exchange
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Browse and bid on heavy-duty chemical separation contracts and regional recycling tenders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Create New Tender / Contract (Col Span 4) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl">
          <h3 className="font-headline-md text-lg text-primary font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">gavel</span>
            Post Tender Or Contract
          </h3>

          <form onSubmit={handleCreateListing} className="space-y-4 text-xs font-semibold text-on-surface-variant">
            <div className="space-y-1.5">
              <label>Exchange Posting Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value as 'CONTRACT' | 'TENDER')}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-on-background focus:outline-none focus:border-primary transition-all"
              >
                <option value="TENDER">Industrial Tender Opportunity</option>
                <option value="CONTRACT">Bilateral Treatment Contract</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label>Tender Posting Title</label>
              <input 
                type="text" 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Acid Neutralization Batch #4"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-on-background input-glow transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label>Target Material Spec</label>
              <input 
                type="text" 
                required 
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Heavy metallurgical sludge concentrates"
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-on-background input-glow transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label>Expected Volume</label>
                <input 
                  type="text" 
                  required 
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="e.g. 50 Tons"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-on-background input-glow transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label>Base Price Allocation</label>
                <input 
                  type="text" 
                  required 
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="e.g. ₹9,50,000"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-on-background input-glow transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-4 py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
            >
              Publish Opportunity
            </button>
          </form>
        </div>

        {/* Right Section: Active Listings Feed (Col Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="font-headline-md text-lg text-secondary font-bold mb-2">Active Exchange Tenders</h2>
          
          {tenderListings.length === 0 ? (
            <p className="text-sm text-on-surface-variant bg-surface/30 border border-outline-variant/20 p-6 rounded-xl text-center">No active contracts listed. Post a tender using the form.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {tenderListings.map((item) => (
                <div key={item.id} className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover-lift">
                  <div>
                    <span className="font-metadata text-[10px] text-primary font-bold uppercase bg-primary-container/25 border border-primary/20 px-2.5 py-1 rounded-full">{item.type}</span>
                    <h3 className="font-body-large text-base font-bold text-on-background mt-2">{item.title}</h3>
                    <p className="font-metadata text-xs text-on-surface-variant mt-1">Material: {item.material} • Volume: {item.volume} • Org: {item.ownerOrg}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="font-metadata text-[10px] text-on-surface-variant block uppercase font-bold">Highest Bid</span>
                      <span className="font-display-hero text-lg font-extrabold text-on-background">{item.currentBid}</span>
                    </div>
                    <button 
                      onClick={() => handlePlaceBid(item.id, item.currentBid)}
                      className="px-4 py-2.5 border border-primary text-primary hover:bg-primary hover:text-on-primary font-label-caps text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Bid Tender
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
