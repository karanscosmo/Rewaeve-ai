'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCircular } from '@/lib/CircularContext';

export default function DigitalWaterTwin() {
  const { activeStream, activeScores, t } = useCircular();

  // Telemetry simulation inputs
  const [ph, setPh] = useState(7.2);
  const [turbidity, setTurbidity] = useState(12.5);
  const [heavyMetals, setHeavyMetals] = useState(4.2);
  const [flowRate, setFlowRate] = useState(240);

  const [loading, setLoading] = useState(false);

  // Computed local advanced scores when sliding inputs
  const [localScores, setLocalScores] = useState({
    recoveryFeasibility: 85,
    circularFlowScore: 78,
    sustainabilityImpact: 82,
    toxicityRisk: 24,
    infrastructureDependency: 45,
    waterRecoveryEfficiency: 88,
    industrialReusability: 80,
    resourceRecovery: 76,
    carbonOffsetPotential: 70,
    buyerDemand: 84,
    treatmentComplexity: 40,
    logisticsComplexity: 35,
    industrialScalability: 89,
    esgComplianceReadiness: 91,
    hazardProbability: 12
  });

  const handleSliderChange = () => {
    // Dynamically calculate local scores using sliding telemetry variables
    const calculatedFeasibility = Math.min(99, Math.max(10, Math.round(100 - (heavyMetals * 8) - Math.abs(7.0 - ph) * 10)));
    const calculatedFlow = Math.min(99, Math.max(10, Math.round(92 - (turbidity / 3))));
    const calculatedToxicity = Math.min(99, Math.max(5, Math.round((ph < 5 ? 80 : 15) + (heavyMetals * 4))));
    const calculatedESG = Math.min(99, Math.max(10, Math.round(100 - calculatedToxicity)));

    setLocalScores({
      recoveryFeasibility: calculatedFeasibility,
      circularFlowScore: calculatedFlow,
      sustainabilityImpact: Math.min(99, Math.round(calculatedFeasibility * 0.95)),
      toxicityRisk: calculatedToxicity,
      infrastructureDependency: Math.min(95, Math.round(calculatedToxicity * 1.2)),
      waterRecoveryEfficiency: Math.min(98, Math.round(95 - (turbidity / 4))),
      industrialReusability: Math.min(96, Math.round(calculatedFeasibility * 0.92)),
      resourceRecovery: Math.min(97, Math.round(82 + (heavyMetals / 2))),
      carbonOffsetPotential: Math.min(99, Math.round(70 + (flowRate / 15))),
      buyerDemand: Math.min(95, Math.round(calculatedFlow * 1.02)),
      treatmentComplexity: Math.min(99, Math.round((heavyMetals * 6) + (turbidity * 1.5))),
      logisticsComplexity: Math.min(95, Math.round(30 + (heavyMetals * 2))),
      industrialScalability: Math.min(98, Math.round(calculatedFeasibility * 1.04)),
      esgComplianceReadiness: calculatedESG,
      hazardProbability: Math.min(99, Math.round(calculatedToxicity * 0.85))
    });
  };

  useEffect(() => {
    handleSliderChange();
  }, [ph, turbidity, heavyMetals, flowRate]);

  // Synergize with context activeStream scores if available
  const scores = activeScores || localScores;

  // Ordered list of 15 Diagnostic metrics
  const diagnosticsList = [
    { label: 'Recovery Feasibility', val: scores.recoveryFeasibility, desc: 'Composite percentage of viable chemical extraction.', color: 'text-primary' },
    { label: 'Circular Flow Score', val: scores.circularFlowScore, desc: 'Frictionless recycling index rating.', color: 'text-primary' },
    { label: 'Sustainability Impact', val: scores.sustainabilityImpact, desc: 'YTD net-zero environmental offset scale.', color: 'text-secondary' },
    { label: 'Toxicity Risk Score', val: scores.toxicityRisk, desc: 'Density of heavy metals and chemical acids.', color: 'text-red-500' },
    { label: 'Infrastructure Dependency', val: scores.infrastructureDependency, desc: 'Regional machinery and kiln overhead.', color: 'text-on-background' },
    { label: 'Water Recovery Efficiency', val: scores.waterRecoveryEfficiency, desc: 'Purity level of freshwater recycled back.', color: 'text-primary' },
    { label: 'Industrial Reusability', val: scores.industrialReusability, desc: 'Capability of integration with architectural casts.', color: 'text-primary' },
    { label: 'Resource Recovery', val: scores.resourceRecovery, desc: 'Silt extraction and byproduct retention ratio.', color: 'text-secondary' },
    { label: 'Carbon Offset Potential', val: scores.carbonOffsetPotential, desc: 'Est. metric tons of CO2 offset per year.', color: 'text-secondary' },
    { label: 'Buyer Demand Score', val: scores.buyerDemand, desc: 'Procurement frequency index across network.', color: 'text-primary' },
    { label: 'Treatment Complexity', val: scores.treatmentComplexity, desc: 'Number of chemical neutralization sequence layers.', color: 'text-red-400' },
    { label: 'Logistics Complexity', val: scores.logisticsComplexity, desc: 'Specialized tanker requirements and route difficulty.', color: 'text-on-background' },
    { label: 'Industrial Scalability', val: scores.industrialScalability, desc: 'Standard industrialization fit score.', color: 'text-primary' },
    { label: 'ESG Compliance Readiness', val: scores.esgComplianceReadiness, desc: 'Regulatory safety alignment with SEC frameworks.', color: 'text-secondary' },
    { label: 'Hazard Probability Score', val: scores.hazardProbability, desc: 'Risk profile index for toxic leak occurrences.', color: 'text-red-500' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Info */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Digital Water Twin
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Digital Water Twin Diagnostics
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
            Unveiling 15 advanced mathematical diagnostic scores simulating XGBoost decision trees for deep byproduct audit tracking.
          </p>
        </div>
        <div className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-3 border border-outline-variant/30">
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_#4cf2c2] animate-pulse" />
          <span className="font-metadata text-xs text-on-surface font-semibold">Diagnosis Active</span>
        </div>
      </header>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Panel: Telemetry Controls (Col Span 4) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col gap-6">
          <div>
            <h2 className="font-headline-md text-base font-bold text-primary">Simulator Controls</h2>
            <p className="font-metadata text-xs text-on-surface-variant mt-1">Adjust active chemical streams to model recovery outcomes in the Digital Twin.</p>
          </div>

          <div className="space-y-5 font-semibold text-xs text-on-surface-variant">
            {/* pH value */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Acidity Level (pH)</span>
                <span className="text-primary font-bold">{ph}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="14" 
                step="0.1" 
                value={ph} 
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-outline-variant/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Turbidity value */}
            <div className="space-y-1">
              <div className="flex justify-between">
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
                className="w-full accent-primary h-1.5 bg-outline-variant/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Heavy metals value */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Heavy Metals Concentration (ppm)</span>
                <span className="text-primary font-bold">{heavyMetals} ppm</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="0.1" 
                value={heavyMetals} 
                onChange={(e) => setHeavyMetals(parseFloat(e.target.value))}
                className="w-full accent-primary h-1.5 bg-outline-variant/20 rounded-lg cursor-pointer"
              />
            </div>

            {/* Flow rate value */}
            <div className="space-y-1">
              <div className="flex justify-between">
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
                className="w-full accent-primary h-1.5 bg-outline-variant/20 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Center Panel: Holographic Twin Lens Viewport (Col Span 4) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative min-h-[400px]">
          {/* Animated Glow Rings */}
          <div className="absolute inset-0 border border-primary-container/30 rounded-full animate-spin-slow scale-[1.05] pointer-events-none" />
          <div className="absolute inset-0 border border-secondary-fixed/20 rounded-full animate-pulse scale-[1.12] pointer-events-none" />
          
          {/* Main Spherical Hologram Frame */}
          <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-[0_0_50px_rgba(76,242,194,0.25)] bg-surface-container border-2 border-outline-variant/30 p-1 flex items-center justify-center">
            <div className="relative w-[96%] h-[96%] rounded-full overflow-hidden">
              <Image 
                alt="Digital Water Twin Hologram" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASQuQYsLjAxhpzE3l91wmGYQpM1sk6HKGDXAHFb86Lx9u9hJcRvB50AkjvoiIhnav5S8QEg2ig8tAAaJMg8aZ-Da_64nQCNNFQcc7hFBiwXxpOHQaetIDLTGRTbAcGEOs6LTQ543nr-k3dVJM3Ilv6_GVZi7hiXTbuTsQLBBDqsxcNO8nCSxgC43HyYY9-zX-d6MkMHBjBtVdpuQVqkb4KLPMuYKrP1vfHdIdTJcjMmIl3PooSIX7JxkPqJ06MwvhqZZxdywKA8g"
                fill
                className="object-cover rounded-full mix-blend-luminosity opacity-90 scale-105"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-radial-gradient from-primary/10 via-transparent to-secondary-container/15 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="absolute bottom-[20%] bg-surface-bright/95 backdrop-blur-md rounded-full px-4 py-1.5 border border-outline-variant/35 shadow-sm text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-on-surface">Optimal Secondary Flow Ingested</span>
          </div>
        </div>

        {/* Right Panel: The 15 AI Diagnostics Metrics Grid (Col Span 4) */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col gap-4">
          <div className="border-b border-outline-variant/15 pb-3">
            <h3 className="font-headline-md text-base text-primary font-bold">15 Diagnostic Telemetries</h3>
            <p className="text-[10px] text-on-surface-variant font-medium">Real-time XGBoost forest prediction vectors.</p>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto max-h-[420px] pr-1">
            {diagnosticsList.map((diag, index) => (
              <div key={index} className="space-y-1.5 text-xs font-semibold text-on-surface-variant leading-none">
                <div className="flex justify-between items-center">
                  <span>{diag.label}</span>
                  <span className={`${diag.color} font-extrabold font-mono text-xs`}>{diag.val}%</span>
                </div>
                <div className="w-full bg-outline-variant/15 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${diag.val > 65 ? 'bg-primary' : diag.val > 35 ? 'bg-secondary' : 'bg-red-500'}`} style={{ width: `${diag.val}%` }} />
                </div>
                <p className="text-[8.5px] text-on-surface-variant/75 font-medium leading-tight">{diag.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
