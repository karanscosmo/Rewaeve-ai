'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function TendersContractsExchange() {
  const { listings, createMarketplaceListing, placeBidOnListing, addNotification } = useCircular();
  
  // Creation States
  const [title, setTitle] = useState('');
  const [material, setMaterial] = useState('');
  const [volume, setVolume] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [type, setType] = useState<'CONTRACT' | 'TENDER'>('TENDER');

  // AI Generator States
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>('m-2');
  const [isContractGenerating, setIsContractGenerating] = useState(false);
  const [contractWorkflowStep, setContractWorkflowStep] = useState<'IDLE' | 'COVENANT' | 'AUDIT' | 'COMPLETE'>('IDLE');
  const [contractText, setContractText] = useState('');

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
    addNotification(
      'Opportunity Published',
      `"${title}" posting uploaded and synchronized with local circular bidding routers.`,
      'success'
    );
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

  // FEATURE 9: Trigger contract generation sequence
  const triggerContractGeneration = (id: string) => {
    const item = listings.find(l => l.id === id);
    if (!item) return;

    setSelectedTenderId(id);
    setIsContractGenerating(true);
    setContractWorkflowStep('COVENANT');
    setContractText('');

    setTimeout(() => {
      setContractWorkflowStep('AUDIT');
      
      setTimeout(() => {
        setContractWorkflowStep('COMPLETE');
        setIsContractGenerating(false);
        setContractText(`CIRCULAR SUPPLY AGREEMENT & ENVIRONMENTAL COMPLIANCE COVENANT

BETWEEN: Sourcing Facility (the "Owner Node")
AND: Treatment Partner (the "Procurement Node")

1. PROTOCOL MATERIAL SPECIFICATION:
The Owner Node agrees to source, segregate, and deliver ${item.volume} of raw ${item.material}.

2. TARGET IN INR PRICING COVENANT:
The baseline unit commercial fee is established at ${item.basePrice}. All bidding iterations must increment by ₹15,000 via local ledger nodes.

3. RECOVERY EFFICIENCY GUARANTEE:
The processing facility guarantees a Sieve Recovery Score of ${item.recoveryScore}% or greater. Failure to maintain circularity thresholds triggers penalty mitigation offsets.

4. SAFETY & JURISDICTION:
Governed by Ministry of Environment and Climate Change guidelines. All transport matrices must lock logistics optimization schemas.`);
        
        addNotification(
          'AI Contract Formulated',
          `Autonomous regulatory and pricing covenants generated for "${item.title}".`,
          'success'
        );
      }, 1500);
    }, 1500);
  };

  const tenderListings = listings.filter(item => item.type === 'TENDER' || item.type === 'CONTRACT');

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Exchange Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Autonomous Circular Contract Engine
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Browse active regional tenders and instantly compile fully-audited circular legal contracts and bilateral covenants.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Create New Tender / Contract (Col Span 4) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-outline-variant/20">
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

        {/* Right Section: Active Listings Feed & AI Document Preview (Col Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20">
            <h2 className="font-headline-md text-lg text-secondary font-bold mb-4">Active Tenders & Legal Synthesizer</h2>
            
            {tenderListings.length === 0 ? (
              <p className="text-sm text-on-surface-variant bg-surface/30 border border-outline-variant/20 p-6 rounded-xl text-center">No active contracts listed. Post a tender using the form.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {tenderListings.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-surface/50 border border-outline-variant/15 hover:border-primary rounded-xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold"
                  >
                    <div>
                      <span className="font-metadata text-[8px] bg-primary-container/20 border border-primary/25 text-primary font-bold px-2 py-0.5 rounded uppercase tracking-wider">{item.type}</span>
                      <h4 className="text-sm font-bold text-on-background mt-1">{item.title}</h4>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">Sourcing volume: {item.volume} • Minimum Recovery Rating: {item.recoveryScore}%</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-secondary font-mono">{item.currentBid}</p>
                        <p className="text-[9px] text-on-surface-variant">current high bid</p>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => handlePlaceBid(item.id, item.currentBid)}
                          className="py-2 px-3 bg-secondary text-white rounded-lg font-label-caps text-[9px] font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-sm"
                        >
                          Bid
                        </button>
                        <button 
                          onClick={() => triggerContractGeneration(item.id)}
                          className="py-2 px-3 bg-primary text-white rounded-lg font-label-caps text-[9px] font-bold uppercase tracking-wider hover:bg-secondary transition-all shadow-sm flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[10px] font-bold">auto_awesome</span>
                          AI Draft
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FEATURE 9: Floating Contract Workspace document preview */}
          {selectedTenderId && (
            <div className="glass-panel p-6 rounded-2xl border border-primary-container bg-primary-container/[0.01] flex flex-col justify-between min-h-[300px]">
              <div className="border-b border-primary-container/30 pb-3 mb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-headline-md text-base text-on-background font-extrabold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Holographic Document Preview
                  </h3>
                  <span className="text-[10px] text-on-surface-variant font-medium">Bilateral legal compliance mapping</span>
                </div>

                {/* Animated approval stepper */}
                {isContractGenerating ? (
                  <div className="text-right animate-pulse">
                    <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block">Generating Covenants</span>
                    <span className="text-[8px] text-on-surface-variant">Step: {contractWorkflowStep}</span>
                  </div>
                ) : contractText ? (
                  <span className="text-[9px] text-primary border border-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold shadow-[0_0_10px_rgba(76,242,194,0.15)] animate-pulse">
                    ✓ Contract Ready
                  </span>
                ) : (
                  <span className="text-[9px] text-on-surface-variant font-medium uppercase tracking-wider">Awaiting generation</span>
                )}
              </div>

              {isContractGenerating ? (
                <div className="flex flex-col items-center justify-center p-12 text-center flex-grow space-y-3">
                  <span className="material-symbols-outlined text-3xl text-primary animate-spin-slow">cycle</span>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wide">AI writing covenants & auditing logistics vectors...</p>
                </div>
              ) : contractText ? (
                <pre className="font-mono text-[10.5px] text-on-surface-variant bg-surface-container-low/40 p-4 border border-outline-variant/15 rounded-xl leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[350px] shadow-inner">
                  {contractText}
                </pre>
              ) : (
                <div className="text-center p-12 flex flex-col items-center justify-center min-h-[150px] border border-dashed border-outline-variant/30 rounded-xl">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-2">auto_awesome</span>
                  <p className="text-xs text-on-surface-variant">Click &quot;AI Draft&quot; on any active listing above to generate audited industrial covenants.</p>
                </div>
              )}

              {contractText && (
                <button className="w-full mt-6 py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all shadow-md">
                  Digitally Sign & Lock on Ledger
                </button>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
