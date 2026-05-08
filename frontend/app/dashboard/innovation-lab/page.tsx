'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function ProductInnovationLab() {
  const { 
    generatedProducts, 
    rawMaterials, 
    generateProductFromMaterial, 
    saveProduct, 
    listProductOnMarketplace, 
    startRecoveryWorkflow,
    addNotification
  } = useCircular();

  const [listingPrices, setListingPrices] = useState<{[key: string]: string}>({});
  
  // States for dynamic custom synthesis
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [customProdName, setCustomProdName] = useState('');
  const [customProdPrice, setCustomProdPrice] = useState('');

  // Track active clicked/selected product for holographic detail view
  const [selectedProductId, setSelectedProductId] = useState<string | null>('gp-1');

  const handlePriceChange = (id: string, price: string) => {
    setListingPrices(prev => ({ ...prev, [id]: price }));
  };

  const handleListingSubmit = (id: string) => {
    const price = listingPrices[id] || '₹12,000';
    listProductOnMarketplace(id, price);
  };

  const openSynthesisForm = (materialId: string) => {
    const raw = rawMaterials.find(m => m.id === materialId);
    if (raw) {
      setSelectedMaterialId(materialId);
      // Pre-fill smart suggestions based on raw material category
      if (raw.category.includes('Metallurgical')) {
        setCustomProdName('High-Performance Slag Bio-Concrete Block');
        setCustomProdPrice('₹14,500');
      } else if (raw.category.includes('Chemical')) {
        setCustomProdName('Refined Indigo Acid Compound Binder');
        setCustomProdPrice('₹8,200');
      } else if (raw.category.includes('Organic')) {
        setCustomProdName('Lightweight Acoustic Cellulose Board');
        setCustomProdPrice('₹3,600');
      } else {
        setCustomProdName('Sintered Fly-Ash Lightweight Aggregate');
        setCustomProdPrice('₹6,400');
      }
    }
  };

  const submitSynthesis = () => {
    if (selectedMaterialId && customProdName && customProdPrice) {
      generateProductFromMaterial(selectedMaterialId, customProdName, customProdPrice);
      addNotification(
        'Circular Blueprint Formulated',
        `Dynamic processing blueprint and thermal sequence generated for "${customProdName}".`,
        'success'
      );
      setSelectedMaterialId(null);
    }
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

      {/* SECTION 1: Segregated Raw Materials & Interactive Formulation Form */}
      <section className="glass-panel rounded-2xl p-6 border border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/15 pb-4">
          <span className="material-symbols-outlined text-primary fill-1">layers</span>
          <div>
            <h2 className="font-headline-md text-lg text-on-background font-extrabold">Segregated Raw Materials</h2>
            <p className="text-[11px] text-on-surface-variant">Awaiting custom circular blueprint synthesis formulation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Materials List Table */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-3">
            {rawMaterials.map((material) => (
              <div 
                key={material.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between font-semibold text-xs ${
                  material.isGenerated 
                    ? 'bg-surface/50 border-outline-variant/20 opacity-75' 
                    : 'bg-surface border-primary-container/20 hover:border-primary/50 hover:bg-surface-dim'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary border border-primary/10 font-bold">
                    <span className="material-symbols-outlined text-base">science</span>
                  </div>
                  <div>
                    <h4 className="text-sm text-on-background font-bold">{material.name}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium">Category: {material.category} • pH: {material.ph}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[11px] text-on-background font-bold">{material.volume}</p>
                    <p className="text-[9px] text-primary font-bold">{material.consistency}% Sieve Alignment</p>
                  </div>
                  
                  <button
                    onClick={() => openSynthesisForm(material.id)}
                    disabled={material.isGenerated}
                    className={`px-4 py-2 rounded-lg font-label-caps text-[9px] font-bold uppercase tracking-wider transition-colors ${
                      material.isGenerated 
                        ? 'bg-surface-variant/40 text-on-surface-variant/50 border border-outline-variant/20' 
                        : 'bg-primary text-white hover:bg-secondary'
                    }`}
                  >
                    {material.isGenerated ? 'Formulated ✓' : 'Synthesize Product'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Formulation Form */}
          <div className="col-span-1 lg:col-span-5">
            {selectedMaterialId ? (
              <div className="glass-panel rounded-xl p-5 border border-primary-container bg-primary-container/5 space-y-4 animate-fade-in relative">
                <h3 className="text-sm font-bold text-on-background flex items-center gap-1.5 border-b border-primary-container/30 pb-2">
                  <span className="material-symbols-outlined text-primary text-base">architecture</span>
                  Formulate Blueprint
                </h3>

                <div className="space-y-3 font-semibold text-xs text-on-surface">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">Suggested Product Name</label>
                    <input 
                      type="text" 
                      value={customProdName}
                      onChange={(e) => setCustomProdName(e.target.value)}
                      className="bg-white border border-outline-variant/30 rounded-lg px-3 py-2 text-on-background focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">Decide Pricing (₹)</label>
                    <input 
                      type="text" 
                      value={customProdPrice}
                      onChange={(e) => setCustomProdPrice(e.target.value)}
                      className="bg-white border border-outline-variant/30 rounded-lg px-3 py-2 text-on-background focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setSelectedMaterialId(null)}
                    className="flex-1 py-2 rounded-lg border border-outline-variant/30 hover:bg-surface-dim font-label-caps text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitSynthesis}
                    className="flex-1 py-2 bg-primary text-white hover:bg-secondary rounded-lg font-label-caps text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Formulate Blueprint
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-outline-variant/30 text-center flex flex-col items-center justify-center h-full min-h-[220px]">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/50 mb-2">auto_awesome</span>
                <p className="text-xs font-semibold text-on-background">AI Engine Ready</p>
                <p className="text-[10px] text-on-surface-variant mt-1 max-w-[200px]">
                  Select any raw segregated material to synthesize a customized circular blueprint and decide commercial pricing.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 2: Active Rotating Capsule Pods & FEATURE 4: AI Recovery Blueprint Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Pods Grid (7 cols) */}
        <section className="col-span-1 lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-outline-variant/15 pb-3">
            <span className="material-symbols-outlined text-primary fill-1">database</span>
            <h3 className="font-headline-md text-lg text-on-background font-extrabold">Active 3D Capsule Pods</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedProducts.map((prod) => {
              const isSelected = selectedProductId === prod.id;
              return (
                <div 
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`glass-panel rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isSelected 
                      ? 'border-primary shadow-[0_0_20px_rgba(76,242,194,0.15)] bg-primary-container/[0.02]' 
                      : 'border-outline-variant/25 hover:border-primary-container/80 hover-lift'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-4 font-semibold text-xs text-on-surface">
                    <div className="flex justify-between items-start border-b border-outline-variant/15 pb-2">
                      <div>
                        <span className="font-metadata text-[9px] text-primary font-bold uppercase tracking-widest">Capsule {prod.id.startsWith('gp-') ? prod.id.slice(3, 7) : 'Active'}</span>
                        <h4 className="text-sm text-on-background font-bold mt-0.5">{prod.name}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-container/15 flex items-center justify-center text-primary border border-primary/20">
                        <span className="material-symbols-outlined text-sm animate-spin-slow">cycle</span>
                      </div>
                    </div>

                    {/* Standard quick metrics */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant font-medium">Match Score</span>
                        <span className="text-primary font-bold">{prod.feasibilityScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant font-medium">Target Pricing</span>
                        <span className="text-on-background font-bold">{prod.estimatedMarketValue}</span>
                      </div>
                    </div>

                    {/* Dynamic Active Workflow progress bar if triggered */}
                    {prod.isWorkflowActive && (
                      <div className="pt-2 border-t border-outline-variant/10 space-y-1.5 animate-pulse">
                        <div className="flex justify-between text-[9px] font-bold text-secondary">
                          <span>{prod.activeWorkflowStep}</span>
                          <span>{prod.workflowProgress}%</span>
                        </div>
                        <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                          <div className="bg-secondary-fixed h-full rounded-full transition-all duration-500" style={{ width: `${prod.workflowProgress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Micro triggers */}
                  <div className="mt-5 pt-3 border-t border-outline-variant/15 flex flex-col gap-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          saveProduct(prod.id);
                        }}
                        disabled={prod.isSaved}
                        className={`flex-1 py-2 rounded-lg border font-label-caps text-[9px] font-bold uppercase tracking-wider transition-colors ${
                          prod.isSaved 
                            ? 'bg-surface border-outline-variant/20 text-on-surface-variant/50' 
                            : 'border-primary text-primary hover:bg-primary hover:text-on-primary'
                        }`}
                      >
                        {prod.isSaved ? 'Saved ✓' : 'Save'}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          startRecoveryWorkflow(prod.id);
                        }}
                        className="flex-1 py-2 bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-on-primary rounded-lg font-label-caps text-[9px] font-bold uppercase tracking-wider transition-colors"
                      >
                        Start Workflow
                      </button>
                    </div>

                    <div className="flex items-center gap-2 bg-surface-container-low/40 p-1.5 rounded-lg border border-outline-variant/20">
                      <input 
                        type="text" 
                        value={listingPrices[prod.id] || ''}
                        onChange={(e) => handlePriceChange(prod.id, e.target.value)}
                        placeholder="Price (₹)" 
                        disabled={prod.isListed}
                        className="bg-white border border-outline-variant/30 rounded-md px-2 py-1 text-[11px] text-on-background flex-grow focus:outline-none focus:border-primary disabled:opacity-50"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleListingSubmit(prod.id);
                        }}
                        disabled={prod.isListed}
                        className={`px-2.5 py-1 font-label-caps text-[8px] font-bold uppercase tracking-wider rounded-md transition-colors shrink-0 ${
                          prod.isListed 
                            ? 'bg-surface-variant/40 text-on-surface-variant/50' 
                            : 'bg-primary text-white hover:bg-secondary'
                        }`}
                      >
                        {prod.isListed ? 'Listed' : 'List'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FEATURE 4: AI Recovery Blueprint Generator Panel (5 cols) */}
        <section className="col-span-1 lg:col-span-5 glass-panel rounded-2xl p-6 border border-primary-container relative min-h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container/[0.03] to-transparent pointer-events-none rounded-2xl" />
          
          {selectedProductId ? (() => {
            const prod = generatedProducts.find(p => p.id === selectedProductId);
            if (!prod) return null;
            return (
              <div className="space-y-6 relative z-10 font-semibold text-xs text-on-surface">
                
                <div className="border-b border-primary-container/30 pb-4">
                  <span className="font-metadata text-[9px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-2.5 py-1 rounded">
                    AI Engineering Blueprint
                  </span>
                  <h3 className="font-display-hero text-lg text-on-background font-extrabold mt-3 tracking-tight">
                    {prod.name} Specifications
                  </h3>
                  <p className="font-metadata text-[10px] text-on-surface-variant mt-1">
                    Curing Node Blueprint Status: Active
                  </p>
                </div>

                {/* Layered engineering blueprint schema layout */}
                <div className="p-4 bg-surface-container-low/40 border border-outline-variant/20 rounded-xl space-y-4 text-xs font-semibold">
                  <h4 className="text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                    1. Processing sequence
                  </h4>
                  <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
                    <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                      <span>Machinery sequence</span>
                      <span className="text-on-background font-bold">{prod.machineryRequirement}</span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                      <span>Operational Timeline</span>
                      <span className="text-on-background font-bold">18.5 mins per batch</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Workforce Allocated</span>
                      <span className="text-on-background font-bold">{prod.workforceRequirement}</span>
                    </div>
                  </div>
                </div>

                {/* Sourcing Cost & Energy Breakdowns */}
                <div className="p-4 bg-surface-container-low/40 border border-outline-variant/20 rounded-xl space-y-4 text-xs font-semibold">
                  <h4 className="text-[10px] text-secondary uppercase font-bold tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
                    2. Energy & Cost Analysis
                  </h4>
                  <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
                    <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                      <span>Thermal consumption</span>
                      <span className="text-on-background font-bold">42 MWh per batch</span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                      <span>Est. Carbon Reduction</span>
                      <span className="text-secondary font-bold">{prod.carbonReduction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Safety Certification</span>
                      <span className="text-primary font-bold">Certified Standard 10B</span>
                    </div>
                  </div>
                </div>

                {/* Scalability recommendations */}
                <div className="p-4 bg-secondary-container/5 border border-secondary/20 rounded-xl space-y-2">
                  <h4 className="text-[10px] text-secondary uppercase font-bold tracking-wider">3. AI Scalability Analysis</h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {prod.scalabilityPotential}. Sourced raw cost averages ₹1,200/unit with a final commercial resale valuation of {prod.estimatedMarketValue}.
                  </p>
                </div>

              </div>
            );
          })() : (
            <div className="text-center p-12 flex flex-col items-center justify-center min-h-[300px]">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 animate-pulse mb-2">fingerprint</span>
              <p className="text-sm text-on-background font-bold">Waiting for selection</p>
              <p className="text-xs text-on-surface-variant mt-1">
                Click any 3D Capsule Pod card to load dynamic holographic specifications and live market trends.
              </p>
            </div>
          )}
        </section>

      </div>

    </div>
  );
}
