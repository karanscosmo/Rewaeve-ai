'use client';

import React from 'react';
import Image from 'next/image';

export default function ESGSustainabilityHub() {
  return (
    <div className="flex flex-col gap-module-gap pb-12">
      {/* Header section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
        <div>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-primary mb-2 tracking-tighter">
            ESG Intelligence
          </h1>
          <p className="font-body-large text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Automated sustainability telemetry and compliance alignment across industrial ecosystems.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-outline-variant/30 shadow-sm">
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,108,82,0.6)] animate-pulse" />
          <span className="font-metadata text-xs text-on-surface font-semibold">Live Pulse Field Active</span>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
        
        {/* Central Impact Sphere (Hero Visual - Spans 8 cols) */}
        <div className="col-span-1 lg:col-span-8 bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-between min-h-[500px] group transition-all duration-300 hover:scale-[1.01] hover:border-primary-container shadow-[inset_0_0_40px_rgba(255,255,255,0.5)]">
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-radial-gradient from-[rgba(127,255,212,0.3)] to-transparent" />
          
          <h2 className="font-headline-md text-xl font-bold text-primary self-start z-10">Global Circularity Index</h2>
          
          <div className="w-full max-w-md aspect-square relative my-auto z-10 flex items-center justify-center">
            {/* Circular network sphere wrapper */}
            <div className="w-3/4 h-3/4 rounded-full border border-primary-container/40 relative shadow-[0_0_60px_rgba(76,242,194,0.15)] flex items-center justify-center overflow-hidden bg-surface-bright/40">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/5 to-tertiary-container/20 animate-spin-slow pointer-events-none" />
              <Image 
                alt="Impact Sphere Visualization" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPIEJX021qnJPTAU2wgcRkVTrt0Q_rMXVe6WfLKVU6tFC-SyjH0HD7lwkBi9nZnNN_IC_z3tvOUAd3OcR3jPELImYp8EcAeynpype9scvk6q5CUdwaIT3_dojSgEMqFxLOat7Ef_sv5McycRGm-IzXACctlYV7v0L5-DrW4Z5b4FqofSZl815ilo3IwRFMYKyRzgxccZ4Fsrb3jxSAYOs7wOa2LYndkk0Hc0pcZWlmCcnZCu79KzFuVmwQyDLz8aefsAuVoSt2Nw"
                fill
                className="object-cover mix-blend-overlay opacity-40 scale-105"
              />
              <div className="text-center relative z-20">
                <span className="font-display-hero text-6xl md:text-7xl text-primary font-extrabold block leading-none">
                  84<span className="text-3xl font-bold">%</span>
                </span>
                <span className="font-label-caps text-[10px] text-on-surface-variant font-bold tracking-widest mt-2.5 block uppercase">System Optimal</span>
              </div>
            </div>
            
            {/* Floating Data Points tags overlay */}
            <div className="absolute top-10 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline-variant/30 text-[10px] font-bold text-secondary shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[12px] font-bold">arrow_upward</span> +2.4% MoM
            </div>
            <div className="absolute bottom-10 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline-variant/30 text-[10px] font-bold text-tertiary shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[12px] font-bold">check_circle</span> Node Alpha Active
            </div>
          </div>
        </div>

        {/* Key Telemetry & Compliance Stack (Col Span 4) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
          
          {/* Telemetry Card 1: Carbon Avoidance */}
          <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:border-primary-container shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-lg">cloud_off</span>
                <h3 className="text-sm font-semibold text-on-background">Carbon Avoidance</h3>
              </div>
              <div className="px-2 py-0.5 rounded-full bg-primary-container/30 border border-primary/20 text-on-primary-container font-metadata text-[9px] font-bold tracking-wider uppercase">Live</div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-on-background tracking-tight">14.2k</span>
              <span className="font-metadata text-xs text-on-surface-variant font-medium mb-1">Metric Tons</span>
            </div>
            <div className="mt-4 w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[75%] rounded-full relative" />
            </div>
          </div>

          {/* Telemetry Card 2: Freshwater Savings */}
          <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:border-secondary-container shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-lg">water_drop</span>
                <h3 className="text-sm font-semibold text-on-background">Freshwater Savings</h3>
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-on-background tracking-tight">2.8M</span>
              <span className="font-metadata text-xs text-on-surface-variant font-medium mb-1">Gallons</span>
            </div>
            <div className="mt-4 w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-[60%] rounded-full relative" />
            </div>
          </div>

          {/* Compliance Alignment Hub */}
          <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 flex-1 flex flex-col group transition-all duration-300 hover:border-outline shadow-sm relative">
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-base font-bold text-primary">ESG Alignment</h3>
              <button className="text-secondary hover:text-primary transition-colors flex items-center justify-center p-1 hover:bg-secondary-container/20 rounded">
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 relative z-10 flex-grow justify-center">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/30 transition-all">
                <span className="text-xs font-semibold text-on-surface">SEC Climate Mandate</span>
                <div className="flex items-center gap-1 text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Aligned
                </div>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-tertiary/30 transition-all">
                <span className="text-xs font-semibold text-on-surface">CSRD European Directive</span>
                <div className="flex items-center gap-1 text-tertiary text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">pending</span> 85% Match
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row Analytics: ROI Insights & Material Recovery Index */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">
        
        {/* ROI Insights */}
        <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:border-tertiary-container shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-tertiary-container/30 rounded-xl text-tertiary border border-tertiary/10">
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </div>
            <h3 className="font-headline-md text-lg text-on-background font-bold">Sustainability-Driven ROI</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-1 space-y-4">
              <div>
                <p className="font-metadata text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mb-1">Estimated Savings YTD</p>
                <p className="font-display-hero text-4xl text-primary font-extrabold leading-tight">$1.2M</p>
              </div>
              <p className="font-body-main text-xs text-on-surface-variant leading-relaxed">
                Derived from automated circular routing and material recovery optimization across 3 active primary facilities.
              </p>
            </div>
            
            {/* Dial chart representation */}
            <div className="w-28 h-28 relative flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[10px] border-surface-variant/40" />
              <div className="absolute inset-0 rounded-full border-[10px] border-primary border-r-transparent border-t-transparent -rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center font-headline-md text-lg text-primary font-bold">68%</div>
            </div>
          </div>
        </div>

        {/* Material Recovery Indices */}
        <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:border-secondary-container shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-secondary-container/30 rounded-xl text-secondary border border-secondary/10">
              <span className="material-symbols-outlined text-lg">recycling</span>
            </div>
            <h3 className="font-headline-md text-lg text-on-background font-bold">Material Recovery Index</h3>
          </div>

          <div className="space-y-4 text-xs font-semibold text-on-surface">
            {/* Polymer Index */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span>Polymers (High-Grade)</span>
                <span className="text-secondary">92%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-variant/50 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[92%] rounded-full" />
              </div>
            </div>

            {/* Base Metals */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span>Base Metals Extraction</span>
                <span className="text-primary">78%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-variant/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[78%] rounded-full" />
              </div>
            </div>

            {/* Rare Earths */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span>Rare Earth Elements Recovery</span>
                <span className="text-on-surface-variant">45%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-variant/50 rounded-full overflow-hidden">
                <div className="h-full bg-outline w-[45%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
