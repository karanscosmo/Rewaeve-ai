'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function CarbonReductionAnalytics() {
  const { user, avoidedCarbonTons, recycledWaterGallons, addNotification } = useCircular();

  // Expanded carbon credit estimations (Rupees)
  const carbonPricePerTon = 1450; // ₹1,450 per credit ton (standard offset price)
  const creditValuation = avoidedCarbonTons * carbonPricePerTon;

  const [selectedOffsetYear, setSelectedOffsetYear] = useState<'2025' | '2026'>('2026');

  const getRoleTheme = () => {
    switch (user?.role) {
      case 'buyer': return { text: 'text-yellow-600', bg: 'bg-yellow-600', bgAlpha: 'bg-yellow-600/10', border: 'border-yellow-600', hover: 'hover:bg-yellow-700' };
      default: return { text: 'text-zinc-900', bg: 'bg-zinc-900', bgAlpha: 'bg-zinc-900/10', border: 'border-zinc-900', hover: 'hover:bg-zinc-800' };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
            ESG Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Carbon Recovery Intelligence
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Calculate, audit, and monetize avoided emissions via the Clean Development Mechanism and regional circular carbon offsets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Globe & Heatmap panels (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Animated Environmental Globe & Carbon Pulse Rings Card */}
          <div className="glass-panel p-6 rounded-2xl border border-primary-container/30 relative overflow-hidden flex flex-col items-center justify-between min-h-[440px]">
            <div className="absolute inset-0 bg-radial-gradient from-[rgba(127,255,212,0.12)] via-transparent to-transparent pointer-events-none" />
            
            <div className="w-full border-b border-outline-variant/15 pb-3 mb-4 flex justify-between items-center">
              <h3 className={`font-headline-md text-base ${theme.text} font-bold flex items-center gap-1.5`}>
                <span className={`material-symbols-outlined ${theme.text} fill-1`}>language</span>
                Circularity Impact Sphere
              </h3>
              <span className="font-metadata text-[10px] text-on-surface-variant bg-surface-container-low border border-outline-variant/25 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">Node Global active</span>
            </div>

            {/* Glowing High-Tech SVG Globe with carbon pulse rings */}
            <div className="relative w-56 h-56 flex items-center justify-center my-auto">
              {/* Outer pulsing rings */}
              <div className={`absolute inset-0 rounded-full border ${theme.border}/20 animate-ping opacity-75`} />
              <div className={`absolute w-[90%] h-[90%] rounded-full border-2 border-dashed ${theme.border}/40 animate-spin-slow`} />
              
              <svg className={`w-40 h-40 relative ${theme.text} animate-[pulse_4s_ease-in-out_infinite]`} viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="opacity-40" />
                {/* Horizontal latitude curves */}
                <path d="M5 50 H95 M10 30 H90 M10 70 H90" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
                {/* Longitude ellipses */}
                <ellipse cx="50" cy="50" rx="30" ry="45" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
                <ellipse cx="50" cy="50" rx="15" ry="45" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
                {/* Glowing coordinates */}
                <circle cx="28" cy="35" r="3" fill="currentColor" className="animate-ping" />
                <circle cx="72" cy="65" r="3.5" fill="currentColor" className="animate-pulse" />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
              </svg>
            </div>

            <div className="w-full text-center relative z-10 mt-4">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider block">Global Sourcing Net-Zero Alignment</span>
              <span className="font-display-hero text-3xl font-extrabold text-on-background mt-1.5 block">Scope 1, 2, & 3 Audit Perfect</span>
            </div>
          </div>

          {/* Holographic ESG panels & Heatmap ledger */}
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className={`font-headline-md text-base ${theme.text} font-bold`}>SDG Alliance Index</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-on-surface">
              <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full ${theme.bgAlpha} flex items-center justify-center ${theme.text} font-bold mb-2`}>6</div>
                <h4 className="font-bold text-on-background text-[11px] uppercase tracking-wide">Clean Water</h4>
                <p className="text-[9px] text-on-surface-variant mt-1">{(recycledWaterGallons/1000).toFixed(0)}k Liters Saved</p>
              </div>

              <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full ${theme.bgAlpha} flex items-center justify-center ${theme.text} font-bold mb-2`}>12</div>
                <h4 className="font-bold text-on-background text-[11px] uppercase tracking-wide">Responsible Prod.</h4>
                <p className="text-[9px] text-on-surface-variant mt-1">94% Materials Circulated</p>
              </div>

              <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full ${theme.bgAlpha} flex items-center justify-center ${theme.text} font-bold mb-2`}>13</div>
                <h4 className="font-bold text-on-background text-[11px] uppercase tracking-wide">Climate Action</h4>
                <p className="text-[9px] text-on-surface-variant mt-1">{avoidedCarbonTons.toLocaleString()}T CO2 Avoided</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Carbon Credits Monetization Panel (Col Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className={`glass-panel p-6 rounded-2xl border ${theme.border}/30 relative flex flex-col justify-between min-h-[500px]`}>
            <div className="space-y-6">
              <div className="border-b border-outline-variant/15 pb-4">
                <span className={`font-metadata text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-2.5 py-1 rounded-full border ${theme.border}/20`}>Valuation Suite</span>
                <h3 className="font-display-hero text-xl text-on-background font-extrabold mt-3">Monetize Sourcing Offsets</h3>
                <p className="text-[11px] text-on-surface-variant mt-1">Verify circular avoidance matrices to sell certified Carbon Credits on regional exchanges.</p>
              </div>

              {/* Toggles for Years */}
              <div className="flex gap-2 p-1 bg-surface rounded-xl border border-outline-variant/20">
                {(['2025', '2026'] as const).map((year) => (
                  <button 
                    key={year}
                    onClick={() => setSelectedOffsetYear(year)}
                    className={`flex-1 py-1.5 rounded-lg font-label-caps text-[10px] font-bold uppercase transition-all ${selectedOffsetYear === year ? `${theme.bg} text-white` : 'hover:bg-surface-dim text-on-surface-variant'}`}
                  >
                    Fiscal {year}
                  </button>
                ))}
              </div>

              <div className="space-y-4 text-xs font-semibold text-on-surface">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Yearly Avoided Emissions</span>
                  <span className="text-on-background font-bold">
                    {selectedOffsetYear === '2026' ? `${avoidedCarbonTons.toLocaleString()} Tons CO2` : '9,450 Tons CO2'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">ESG Global Ranking</span>
                  <span className={`${theme.text} font-bold`}>Top 4% (Tier-A Core)</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface-variant">Water Recovery Multiplier</span>
                  <span className="text-on-background">1.84x Factor</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-on-surface-variant">SBTi Target Compliance</span>
                  <span className={`${theme.text} font-bold`}>100% Fully Compliant</span>
                </div>
              </div>

              {/* Giant credit valuation callout */}
              <div className={`p-4 ${theme.bgAlpha} border ${theme.border}/20 rounded-xl text-center shadow-sm`}>
                <span className={`font-metadata text-[10px] ${theme.text} font-bold uppercase tracking-wider block`}>Estimated Carbon Credit Valuation</span>
                <span className={`font-display-hero text-3xl font-extrabold ${theme.text} mt-1.5 block`}>
                  ₹{selectedOffsetYear === '2026' ? creditValuation.toLocaleString() : '1,37,02,500'}
                </span>
                <span className="text-[10px] text-on-surface-variant/70 mt-1 block font-medium">Derived directly from Clean Development registers.</span>
              </div>
            </div>

            <button 
              onClick={() => addNotification('Credits Listed on Exchange', 'Your carbon offsets have been successfully pushed to the regional CDM exchange.', 'success')}
              className={`w-full py-3.5 ${theme.bg} text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl ${theme.hover} transition-all shadow-md mt-6`}
            >
              Sell Certified Credits
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
