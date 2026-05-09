'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function SupplyChainIntelligence() {
  const { user, networkNodes, addNotification } = useCircular();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('n-2');
  const [isLocked, setIsLocked] = useState(false);

  const handleLock = () => {
    addNotification('Freight Carrier Dispatch Locked', 'Smart contract initiated for secondary logistics.', 'success');
    setIsLocked(true);
  };

  const getRoleTheme = () => {
    switch (user?.role) {
      case 'buyer': return { text: 'text-yellow-600', bg: 'bg-yellow-600', bgAlpha: 'bg-yellow-600/10', border: 'border-yellow-600', hover: 'hover:bg-yellow-700' };
      default: return { text: 'text-zinc-900', bg: 'bg-zinc-900', bgAlpha: 'bg-zinc-900/10', border: 'border-zinc-900', hover: 'hover:bg-zinc-800' };
    }
  };

  const theme = getRoleTheme();

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
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
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
                      ? `${theme.bg} border-white text-white scale-110 shadow-lg` 
                      : `bg-surface ${theme.border}/40 ${theme.text} hover:scale-105`
                  }`}>
                    <span className="material-symbols-outlined text-[14px] font-bold">
                      {node.role === 'manufacturer' ? 'factory' : node.role === 'recycler' ? 'recycling' : 'local_shipping'}
                    </span>
                  </div>
                  <span className="font-metadata text-[8px] bg-surface-bright/95 border border-outline-variant/30 px-1.5 py-0.5 rounded shadow mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
              <h3 className={`font-headline-md text-base ${theme.text} font-bold mb-4 flex items-center gap-2`}>
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                Optimized Freight Specs
              </h3>

              <div className="space-y-4 font-semibold text-xs text-on-surface">
                <div className="p-4 bg-surface-container-low/40 rounded-xl border border-outline-variant/25">
                  <h4 className="text-sm font-bold text-on-background">Short-Range Secondary Logistics</h4>
                  <span className={`font-metadata text-[10px] ${theme.text} font-bold uppercase tracking-wider block mt-0.5`}>Average dispatch distance: 18.5 km</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Minimization offset</span>
                    <span className={`${theme.text} font-bold`}>1,850 km saved</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                    <span className="text-on-surface-variant">Carbon avoided</span>
                    <span className="text-on-background font-bold">324 Metric Tons</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-on-surface-variant">Carrier Efficiency</span>
                    <span className="text-on-background font-bold">94.8% rating</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleLock}
              disabled={isLocked}
              className={`w-full mt-6 py-3.5 ${isLocked ? 'bg-surface-container-low text-on-surface-variant cursor-not-allowed' : `${theme.bg} text-white ${theme.hover}`} font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all`}
            >
              {isLocked ? 'Freight Dispatch Locked' : 'Lock Freight Carrier Dispatch'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
