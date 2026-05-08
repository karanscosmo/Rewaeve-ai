'use client';

import React from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function EcosystemNetworkMap() {
  const { networkNodes, selectedNode, setSelectedNode } = useCircular();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Network Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Ecosystem Network
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Visual Supply Chain routing, proximity diagnostics, and facility compatibility matches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Interactive Geolocation Vector Canvas (Col Span 8) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary-container/10 via-transparent to-transparent z-0" />
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2 0-3 1-4 2H10c-1-1-2-2-4-2H0v2h4c1 1 2 2 4 2h44c2 0 3-1 4-2h4v-2h-6z\' fill=\'%23006c52\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')]" />
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="font-headline-md text-base text-primary font-bold">Supply Chain Vector Space</h2>
            <span className="font-metadata text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Active nodes: {networkNodes.length}</span>
          </div>

          {/* Interactive Node Vector Mapping Canvas */}
          <div className="relative z-10 flex-1 min-h-[350px] w-full bg-surface-container-low/20 border border-outline-variant/15 rounded-xl">
            
            {/* Draw mapping markers */}
            {networkNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isSelf = node.role === 'manufacturer' && node.distance === '0 km';
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-md transition-all ${
                    isSelf 
                      ? 'bg-primary border-white text-white scale-110' 
                      : isSelected 
                      ? 'bg-tertiary border-white text-white scale-115 shadow-[0_0_15px_#7bffd9]' 
                      : 'bg-white border-primary text-primary hover:scale-105'
                  }`}>
                    <span className="material-symbols-outlined text-sm font-bold">
                      {node.role === 'manufacturer' ? 'factory' : node.role === 'recycler' ? 'recycling' : node.role === 'buyer' ? 'shopping_cart' : 'science'}
                    </span>
                  </div>
                  <span className="font-metadata text-[8px] bg-white/90 border border-outline-variant/20 px-1.5 py-0.5 rounded shadow mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {node.name}
                  </span>
                </button>
              );
            })}

            {/* Simulated Route optimization vectors */}
            {selectedNode && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path 
                  d={`M 350 200 L ${selectedNode.coordinates.x * 6} ${selectedNode.coordinates.y * 3}`} 
                  fill="none" 
                  stroke="rgba(0,108,82,0.5)" 
                  strokeDasharray="5,5" 
                  strokeWidth="2" 
                  className="animate-pulse"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Right Section: Node Compatibility Detail Panels (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-base text-secondary font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">my_location</span>
                Target Node Specs
              </h3>

              {selectedNode ? (
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-low/40 rounded-xl border border-outline-variant/25">
                    <h4 className="text-sm font-bold text-on-background">{selectedNode.name}</h4>
                    <span className="font-metadata text-[10px] text-primary font-bold uppercase tracking-wider block mt-0.5">{selectedNode.role} • {selectedNode.distance} away</span>
                  </div>

                  <div className="space-y-3.5 text-xs font-semibold text-on-surface">
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                      <span className="text-on-surface-variant">Compatibility Match</span>
                      <span className="text-secondary font-extrabold">{selectedNode.compatibility}%</span>
                    </div>
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                      <span className="text-on-surface-variant">Match Reason</span>
                      <span className="text-on-background text-right max-w-[180px] truncate" title={selectedNode.matchReason}>{selectedNode.matchReason}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-on-surface-variant">Logistics Cost Metric</span>
                      <span className="font-bold text-primary">Standard Routing</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant">Click on any network node mapping dot to calculate transport matrices and direct proximity match parameters.</p>
              )}
            </div>

            {selectedNode && (
              <button className="w-full mt-6 py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all">
                Establish Direct Interlink
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
