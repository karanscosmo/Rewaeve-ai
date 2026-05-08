'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function EcosystemNetworkMap() {
  const { networkNodes, selectedNode, setSelectedNode, addNotification } = useCircular();
  
  // Local active simulation path state
  const [activeRouteStep, setActiveRouteStep] = useState<string | null>(null);

  // Expanded symbiosis metrics calculation
  const getSymbiosisMetrics = (nodeId: string) => {
    switch (nodeId) {
      case 'n-2': // EcoBrick Inc.
        return {
          buyerCompatibility: '94%',
          routeOptimization: 'Optimized (12km via NH-48 Express)',
          partnershipStrength: '98% Historical Consistency',
          estTransactionValue: '₹4,80,000 / month recurring',
          sourcingType: 'Smelter slag residues transformation to clay alternative',
          haulageCost: '₹8,500 base rate',
          carbonSaved: '32.4 tons per batch'
        };
      case 'n-3': // SoundSeal Architectural
        return {
          buyerCompatibility: '88%',
          routeOptimization: 'Medium Range Transit (28km Southern Hub)',
          partnershipStrength: '82% Contract Alignment',
          estTransactionValue: '₹3,20,000 / unit bulk',
          sourcingType: 'Organic cellulose fibers for modular acoustics',
          haulageCost: '₹14,000 standard rate',
          carbonSaved: '18.5 tons per batch'
        };
      case 'n-4': // ChemSeparation Partners
        return {
          buyerCompatibility: '91%',
          routeOptimization: 'Standard Logistics (45km Northern bypass)',
          partnershipStrength: '95% Compliance Guarantee',
          estTransactionValue: '₹6,40,000 treatment base',
          sourcingType: 'Acid neutralization wash compound refinement',
          haulageCost: '₹22,000 Hazmat spec',
          carbonSaved: '42.0 tons per batch'
        };
      case 'n-5': // Apex Cements
        return {
          buyerCompatibility: '96%',
          routeOptimization: 'Highly Efficient (18km Ring Road express)',
          partnershipStrength: '99% Demand Lock-In',
          estTransactionValue: '₹12,40,000 recurring monthly contract',
          sourcingType: 'Fly ash and lime residues replacement of raw minerals',
          haulageCost: '₹11,200 heavy load rate',
          carbonSaved: '84.0 tons per batch'
        };
      default:
        return {
          buyerCompatibility: '100%',
          routeOptimization: 'Self facility location coordinates',
          partnershipStrength: 'Absolute priority',
          estTransactionValue: 'Self Processing ROI',
          sourcingType: 'Sourcing stream generation',
          haulageCost: '₹0.00',
          carbonSaved: '0.00 tons'
        };
    }
  };

  const handleEstablishLink = () => {
    if (selectedNode) {
      addNotification(
        'Bilateral Symbiosis Confirmed',
        `Mutual processing interlink with ${selectedNode.name} established. Transacting routes lock parameters in real-time.`,
        'success'
      );
      setActiveRouteStep(selectedNode.id);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Network Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Industrial Symbiosis Network
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Real-time supply chain mapping where one factory&apos;s waste streams directly lock-in as another regional plant&apos;s raw material feedstock.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Interactive Geolocation Vector Canvas (Col Span 8) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary-container/10 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2 0-3 1-4 2H10c-1-1-2-2-4-2H0v2h4c1 1 2 2 4 2h44c2 0 3-1 4-2h4v-2h-6z\' fill=\'%23006c52\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')]" />
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="font-headline-md text-base text-primary font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary fill-1">hub</span>
              Symbiosis Spatial Vector Space
            </h2>
            <span className="font-metadata text-[10px] text-on-surface-variant border border-outline-variant/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Active ecosystem nodes: {networkNodes.length}</span>
          </div>

          {/* Interactive Node Vector Mapping Canvas */}
          <div className="relative z-10 flex-1 min-h-[350px] w-full bg-surface-container-low/20 border border-outline-variant/15 rounded-xl overflow-hidden">
            
            {/* Draw Simulated SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {networkNodes.map((node) => {
                if (node.id === 'n-1') return null; // Connect everything back to self (n-1)
                const isSelected = selectedNode?.id === node.id;
                const isLinked = activeRouteStep === node.id;
                return (
                  <g key={`line-${node.id}`}>
                    <line 
                      x1="50%" 
                      y1="50%" 
                      x2={`${node.coordinates.x}%`} 
                      y2={`${node.coordinates.y}%`} 
                      stroke={isSelected ? '#4cf2c2' : isLinked ? '#7bffd9' : 'rgba(0,108,82,0.15)'}
                      strokeWidth={isSelected ? '3' : isLinked ? '2' : '1.5'}
                      strokeDasharray={isLinked ? 'none' : '5,5'}
                      className={isSelected ? 'animate-pulse' : ''}
                    />
                    {isLinked && (
                      <circle r="4" fill="#7bffd9" className="animate-bounce">
                        <animateMotion 
                          dur="4s" 
                          repeatCount="indefinite"
                          path={`M 350 175 L ${node.coordinates.x * 7} ${node.coordinates.y * 3.5}`} 
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes Mapping buttons */}
            {networkNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isSelf = node.id === 'n-1';
              const isLinked = activeRouteStep === node.id;
              
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none z-10"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-all ${
                    isSelf 
                      ? 'bg-primary border-white text-white scale-110 shadow-[0_0_15px_#4cf2c2]' 
                      : isSelected 
                      ? 'bg-secondary border-white text-white scale-115 shadow-[0_0_20px_#7bffd9]' 
                      : isLinked
                      ? 'bg-surface-bright border-secondary text-secondary scale-105'
                      : 'bg-white border-primary text-primary hover:scale-105'
                  }`}>
                    <span className="material-symbols-outlined text-base font-bold">
                      {node.role === 'manufacturer' ? 'factory' : node.role === 'recycler' ? 'recycling' : node.role === 'buyer' ? 'shopping_cart' : 'science'}
                    </span>
                  </div>
                  <span className="font-metadata text-[9px] bg-white/95 border border-outline-variant/30 px-2 py-0.5 rounded shadow mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">
                    {node.name} ({node.distance})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section: Node Compatibility Detail Panels (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col justify-between min-h-[500px]">
            <div>
              <h3 className="font-headline-md text-base text-secondary font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">my_location</span>
                Target Symbiosis Index
              </h3>

              {selectedNode ? (() => {
                const metrics = getSymbiosisMetrics(selectedNode.id);
                return (
                  <div className="space-y-4 font-semibold text-xs text-on-surface">
                    <div className="p-4 bg-surface-container-low/40 rounded-xl border border-outline-variant/25">
                      <h4 className="text-sm font-bold text-on-background">{selectedNode.name}</h4>
                      <span className="font-metadata text-[10px] text-primary font-bold uppercase tracking-wider block mt-0.5">{selectedNode.role} • {selectedNode.distance} away</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-on-surface-variant font-medium">Circularity Match</span>
                        <span className="text-primary font-extrabold text-sm">{metrics.buyerCompatibility}</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-on-surface-variant font-medium">Route Optimization</span>
                        <span className="text-on-background font-bold text-right max-w-[170px] truncate" title={metrics.routeOptimization}>{metrics.routeOptimization}</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-on-surface-variant font-medium">Partnership Strength</span>
                        <span className="text-secondary font-bold text-right">{metrics.partnershipStrength}</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-on-surface-variant font-medium">Haulage Overhead</span>
                        <span className="text-on-background font-semibold">{metrics.haulageCost}</span>
                      </div>
                      <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                        <span className="text-on-surface-variant font-medium">Est. Carbon Reduction</span>
                        <span className="text-secondary font-extrabold">{metrics.carbonSaved}</span>
                      </div>
                      <div className="flex justify-between pb-1">
                        <span className="text-on-surface-variant font-medium">Monthly Contract Value</span>
                        <span className="text-primary font-extrabold text-sm">{metrics.estTransactionValue}</span>
                      </div>
                    </div>
                  </div>
                );
              })() : (
                <div className="text-center p-8 flex flex-col items-center justify-center min-h-[250px] border border-dashed border-outline-variant/30 rounded-xl">
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-2">radar</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Click on any geographical node in the vector space map to calculate transport matrices, partnership strengths, and monthly contractual values.
                  </p>
                </div>
              )}
            </div>

            {selectedNode && !selectedNode.matchReason.includes('Self') && (
              <button 
                onClick={handleEstablishLink}
                className="w-full mt-6 py-3.5 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all"
              >
                {activeRouteStep === selectedNode.id ? '✓ Symbiosis Link Established' : 'Lock Bilateral Interlink'}
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
