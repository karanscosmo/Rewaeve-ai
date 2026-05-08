'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchWaterTelemetry, generateProductConcepts } from '@/lib/api';

interface Concept {
  id: string;
  name: string;
  recovery_yield: string;
  energy_savings: string;
  carbon_avoided: string;
}

export default function DigitalWaterTwin() {
  // Telemetry Inputs
  const [ph, setPh] = useState(7.2);
  const [turbidity, setTurbidity] = useState(12.5);
  const [metals, setMetals] = useState(4.2);
  const [flowRate, setFlowRate] = useState(240);

  // Computed results
  const [feasibility, setFeasibility] = useState(82);
  const [profitability, setProfitability] = useState(64);
  const [complexity, setComplexity] = useState(45);
  const [concepts, setConcepts] = useState<Concept[]>([
    { id: '1', name: 'Premium Bio-Brick Cure', recovery_yield: '98.4%', energy_savings: '75%', carbon_avoided: '14.2t CO2' },
    { id: '2', name: 'Alloy Extract Base Feedstock', recovery_yield: '82.5%', energy_savings: '50%', carbon_avoided: '8.4t CO2' }
  ]);
  const [loading, setLoading] = useState(false);

  // Fetch initial telemetry coefficients from the backend
  useEffect(() => {
    async function loadWaterTwinTelemetry() {
      try {
        const data = await fetchWaterTelemetry();
        if (data) {
          if (data.telemetry) {
            setPh(data.telemetry.ph || 7.2);
            setTurbidity(data.telemetry.turbidity || 12.5);
            setMetals(data.telemetry.metals || 4.2);
            setFlowRate(data.telemetry.flow_rate || 240);
          }
          if (data.coefficients) {
            setFeasibility(data.coefficients.feasibility || 82);
            setProfitability(data.coefficients.profitability || 64);
            setComplexity(data.coefficients.complexity || 45);
          }
        }
      } catch (err) {
        console.warn('Backend water-twin route not ready, using custom high-fidelity default tokens.', err);
      }
    }
    loadWaterTwinTelemetry();
  }, []);

  const handleRecalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Post to generate concepts
      const res = await generateProductConcepts({
        material_type: `Water Twin Matrix (pH: ${ph}, metals: ${metals}ppm)`,
        volume_tons: flowRate
      });

      // Update coefficients based on simulation logic
      const calculatedFeasibility = Math.min(99, Math.max(10, Math.round(100 - (metals * 8) - Math.abs(7.0 - ph) * 10)));
      const calculatedProfitability = Math.min(99, Math.max(10, Math.round(85 - (turbidity * 1.5))));
      const calculatedComplexity = Math.min(99, Math.max(10, Math.round((metals * 5) + (turbidity * 2))));

      setFeasibility(calculatedFeasibility);
      setProfitability(calculatedProfitability);
      setComplexity(calculatedComplexity);

      if (res && res.concepts) {
        setConcepts(res.concepts);
      } else {
        // Mock updated list
        setConcepts([
          { 
            id: 'c1', 
            name: 'Industrial Salt-cake Curing', 
            recovery_yield: `${calculatedFeasibility}%`, 
            energy_savings: '65%', 
            carbon_avoided: `${(flowRate * 0.05).toFixed(1)}t CO2` 
          },
          { 
            id: 'c2', 
            name: 'Refined Secondary Slag Feedstock', 
            recovery_yield: `${Math.round(calculatedFeasibility * 0.8)}%`, 
            energy_savings: '48%', 
            carbon_avoided: `${(flowRate * 0.03).toFixed(1)}t CO2` 
          }
        ]);
      }
    } catch (err) {
      console.error(err);
      // Local calculation on failure
      const calculatedFeasibility = Math.min(99, Math.max(10, Math.round(100 - (metals * 8) - Math.abs(7.0 - ph) * 10)));
      const calculatedProfitability = Math.min(99, Math.max(10, Math.round(85 - (turbidity * 1.5))));
      const calculatedComplexity = Math.min(99, Math.max(10, Math.round((metals * 5) + (turbidity * 2))));

      setFeasibility(calculatedFeasibility);
      setProfitability(calculatedProfitability);
      setComplexity(calculatedComplexity);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-module-gap pb-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter">
            Digital Water Twin
          </h1>
          <p className="font-body-large text-base md:text-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
            Real-time material diagnosis, recovery modeling, and chemical simulation workspace.
          </p>
        </div>
        <div className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-3 border border-outline-variant/30">
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(0,108,82,0.6)] animate-pulse" />
          <span className="font-metadata text-xs text-on-surface font-semibold">Diagnosis Active</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel: Telemetry Controls (Col Span 4) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col gap-6">
          <div>
            <h2 className="font-headline-md text-lg text-primary font-bold">Simulator Controls</h2>
            <p className="font-metadata text-xs text-on-surface-variant mt-1">Adjust active chemical streams to model recovery outcomes in the Digital Twin.</p>
          </div>

          <form onSubmit={handleRecalculate} className="space-y-4">
            {/* pH value */}
            <div>
              <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-medium">
                <span>Acidity Level (pH)</span>
                <span className="text-primary font-bold">{ph}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="14" 
                step="0.1" 
                value={ph} 
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full accent-primary h-1 bg-surface-variant rounded-lg cursor-pointer"
              />
            </div>

            {/* Turbidity value */}
            <div>
              <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-medium">
                <span>Turbidity (NTU)</span>
                <span className="text-primary font-bold">{turbidity} NTU</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="0.5" 
                value={turbidity} 
                onChange={(e) => setTurbidity(parseFloat(e.target.value))}
                className="w-full accent-primary h-1 bg-surface-variant rounded-lg cursor-pointer"
              />
            </div>

            {/* Heavy metals value */}
            <div>
              <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-medium">
                <span>Heavy Metals Concentration (ppm)</span>
                <span className="text-primary font-bold">{metals} ppm</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="0.1" 
                value={metals} 
                onChange={(e) => setMetals(parseFloat(e.target.value))}
                className="w-full accent-primary h-1 bg-surface-variant rounded-lg cursor-pointer"
              />
            </div>

            {/* Flow rate value */}
            <div>
              <div className="flex justify-between text-xs text-on-surface-variant mb-1 font-medium">
                <span>Flow Rate (m³/h)</span>
                <span className="text-primary font-bold">{flowRate} m³/h</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="1000" 
                step="10" 
                value={flowRate} 
                onChange={(e) => setFlowRate(parseInt(e.target.value))}
                className="w-full accent-primary h-1 bg-surface-variant rounded-lg cursor-pointer"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 py-3 border border-primary/40 rounded-xl font-body-main font-semibold text-primary hover-holographic-glow flex justify-center items-center gap-2 relative overflow-hidden group"
            >
              <span className="material-symbols-outlined text-base">psychology</span>
              {loading ? 'Modeling Molecular Twin...' : 'Compute Digital Twin Telemetry'}
            </button>
          </form>
        </div>

        {/* Center Panel: Spherical Twin Visualization (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[400px]">
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 border border-primary-container/30 rounded-full animate-spin-slow scale-[1.05] pointer-events-none" />
          <div className="absolute inset-0 border border-secondary-fixed/20 rounded-full animate-pulse scale-[1.12] pointer-events-none" />
          
          {/* Main Spherical Hologram Frame */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_0_50px_rgba(127,255,212,0.35)] bg-surface-container border-2 border-outline-variant/30 p-1 flex items-center justify-center">
            <div className="relative w-[96%] h-[96%] rounded-full overflow-hidden">
              <Image 
                alt="Digital Water Twin Hologram" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASQuQYsLjAxhpzE3l91wmGYQpM1sk6HKGDXAHFb86Lx9u9hJcRvB50AkjvoiIhnav5S8QEg2ig8tAAaJMg8aZ-Da_64nQCNNFQcc7hFBiwXxpOHQaetIDLTGRTbAcGEOs6LTQ543nr-k3dVJM3Ilv6_GVZi7hiXTbuTsQLBBDqsxcNO8nCSxgC43HyYY9-zX-d6MkMHBjBtVdpuQVqkb4KLPMuYKrP1vfHdIdTJcjMmIl3PooSIX7JxkPqJ06MwvhqZZxdywKA8g"
                fill
                className="object-cover rounded-full mix-blend-luminosity opacity-90 scale-105"
              />
            </div>
            {/* Overlay Gradient overlays */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 via-transparent to-secondary-container/15 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_35px_rgba(255,255,255,0.7)] pointer-events-none" />
          </div>

          {/* Floating Data Point tags */}
          <div className="absolute top-[15%] left-[2%] bg-surface-bright/90 backdrop-blur-md rounded-full px-4 py-1.5 border border-outline-variant/35 shadow-sm text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            <span className="text-on-surface">Heavy Metals Detect</span>
          </div>
          <div className="absolute bottom-[25%] right-[2%] bg-surface-bright/90 backdrop-blur-md rounded-full px-4 py-1.5 border border-outline-variant/35 shadow-sm text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse" />
            <span className="text-on-surface">Optimal Recovery Zone</span>
          </div>
        </div>

        {/* Right Panel: Concept Outputs and Gauges (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Circular Gauges */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-headline-md text-base text-primary font-bold mb-5">Telemetry Coefficients</h3>
            <div className="grid grid-cols-3 gap-4">
              
              {/* Feasibility Gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-outline-variant/30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${feasibility}, 100`} strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <span className="absolute font-label-caps text-xs text-on-surface font-bold">{feasibility}%</span>
                </div>
                <span className="font-metadata text-[10px] text-center text-on-surface-variant font-medium leading-tight">Recovery<br />Feasibility</span>
              </div>

              {/* Profitability Gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-outline-variant/30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${profitability}, 100`} strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <span className="absolute font-label-caps text-xs text-on-surface font-bold">{profitability}%</span>
                </div>
                <span className="font-metadata text-[10px] text-center text-on-surface-variant font-medium leading-tight">Profitability<br />Score</span>
              </div>

              {/* Complexity Gauge */}
              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-outline-variant/30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-error/80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${complexity}, 100`} strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <span className="absolute font-label-caps text-xs text-on-surface font-bold">{complexity}%</span>
                </div>
                <span className="font-metadata text-[10px] text-center text-on-surface-variant font-medium leading-tight">Op.<br />Complexity</span>
              </div>

            </div>
          </div>

          {/* Derived Circular Concepts list */}
          <div className="glass-panel rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary font-bold">auto_awesome</span>
              <h3 className="font-headline-md text-base text-primary font-bold">Generated Circular Concepts</h3>
            </div>
            
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[300px] pr-1">
              {concepts.map((concept) => (
                <div key={concept.id} className="p-4 rounded-xl bg-surface/40 border border-outline-variant/30 hover:border-primary/40 transition-colors">
                  <h4 className="text-sm font-semibold text-on-background">{concept.name}</h4>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-[10px] text-on-surface-variant/90 uppercase font-bold tracking-wider">
                    <div>
                      <span className="block font-medium text-[9px] text-on-surface-variant/60 lowercase">yield</span>
                      <span className="text-primary font-bold text-xs">{concept.recovery_yield}</span>
                    </div>
                    <div>
                      <span className="block font-medium text-[9px] text-on-surface-variant/60 lowercase">energy sav.</span>
                      <span className="text-secondary font-bold text-xs">{concept.energy_savings}</span>
                    </div>
                    <div>
                      <span className="block font-medium text-[9px] text-on-surface-variant/60 lowercase">avoided</span>
                      <span className="text-on-surface font-bold text-xs">{concept.carbon_avoided}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
