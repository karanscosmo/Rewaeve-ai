'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function SupplyChainIntelligence() {
  const { networkNodes, addNotification } = useCircular();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('n-2');

  const handleRecalculateRoute = (id: string) => {
    setSelectedRouteId(id);
    addNotification(
      'Haulage Path Optimized',
      'Autonomous logistics router recalculates physical bypass routes to maximize transport fuel offsets.',
      'success'
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm w-full">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Logistics Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Global Circular Intelligence Map
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Real-time supply chain mapping, routing optimizations, transport carbon accounting, and decentralized material procurement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Feature 10: Logistics Visual Grid Canvas Mapping (Col Span 8) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-secondary-container/10 via-transparent to-transparent z-0 pointer-events-none" />
          {/* Futuristic blueprint matrix lines background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#006c52_1px,transparent_1px),linear-gradient(to_bottom,#006c52_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="font-headline-md text-base text-primary font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary fill-1">map</span>
              Active Spatial Heatmap Grid
            </h2>
            <span className="font-metadata text-[10px] text-on-surface-variant border border-outline-variant/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Active routes synced</span>
          </div>

          {/* Interactive grid container */}
          <div className="relative z-10 flex-grow min-h-[350px] w-full bg-surface-container-low/20 border border-outline-variant/15 rounded-xl overflow-hidden">
            
            {/* Draw Simulated Glowing Heatmap Rings & Connecting Vectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {networkNodes.map((node, idx) => {
                const isSelected = selectedRouteId === node.id;
                return (
                  <g key={`heatmap-circle-${idx}`}>
                    {/* Concentric glowing pulse circles representing waste sources heat density */}
                    <circle 
                      cx={`${node.coordinates.x}%`} 
                      cy={`${node.coordinates.y}%`} 
                      r={isSelected ? '24' : '12'} 
                      fill="rgba(0,108,82,0.08)" 
                      className="animate-pulse" 
                    />
                    <circle 
                      cx={`${node.coordinates.x}%`} 
                      cy={`${node.coordinates.y}%`} 
                      r={isSelected ? '12' : '6'} 
                      fill="rgba(127,255,212,0.15)" 
                    />
                    {/* Connecting routing lines */}
                    {idx > 0 && (
                      <line 
                        x1={`${networkNodes[idx - 1].coordinates.x}%`} 
                        y1={`${networkNodes[idx - 1].coordinates.y}%`} 
                        x2={`${node.coordinates.x}%`} 
                        y2={`${node.coordinates.y}%`} 
                        stroke={isSelected ? '#4cf2c2' : 'rgba(0,108,82,0.1)'} 
                        strokeWidth="1.5" 
                        strokeDasharray="5,5" 
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Glowing nodes mapping overlay */}
            {networkNodes.map((node) => {
              const isSelected = selectedRouteId === node.id;
              return (
                <button 
                  key={`heatnode-${node.id}`}
                  onClick={() => handleRecalculateRoute(node.id)}
                  style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isSelected 
                      ? 'bg-secondary border-white text-white scale-110 shadow-[0_0_15px_#7bffd9]' 
                      : 'bg-white border-primary/40 text-primary hover:scale-105'
                  }`}>
                    <span className="material-symbols-outlined text-[14px] font-bold">
                      {node.role === 'manufacturer' ? 'factory' : node.role === 'recycler' ? 'recycling' : 'local_shipping'}
                    </span>
                  </div>
                  <span className="font-metadata text-[8px] bg-white/95 border border-outline-variant/30 px-1.5 py-0.5 rounded shadow mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {node.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Section: Route variables metrics (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-base text-secondary font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                Optimized Freight Specs
              </h3>

              <div className="space-y-4 font-semibold text-xs text-on-surface">
                <div className="p-4 bg-surface-container-low/40 rounded-xl border border-outline-variant/25">
                  <h4 className="text-sm font-bold text-on-background">Short-Range Secondary Logistics</h4>
                  <span className="font-metadata text-[10px] text-primary font-bold uppercase tracking-wider block mt-0.5">Average dispatch distance: 18.5 km</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Minimization offset</span>
                    <span className="text-primary font-bold">1,850 km saved</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Carbon avoided</span>
                    <span className="text-secondary font-bold">324 Metric Tons</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-on-surface-variant">Carrier Efficiency</span>
                    <span className="text-on-background font-bold">94.8% rating</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3.5 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all shadow-md">
              Lock Freight Carrier Dispatch
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
