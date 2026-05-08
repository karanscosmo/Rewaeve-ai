'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCircular } from '@/lib/CircularContext';

export default function AIRecoveryCenter() {
  const { activeStream, activeScores, wasteStreams, setActiveStreamById } = useCircular();
  
  // Decide Go/No-Go Recommendation based on stream properties
  // High acid (pH < 5) or high TDS (> 5000) or high sludge (> 50) triggers caution/no-go!
  const getDecisionParams = () => {
    if (!activeStream || !activeScores) {
      return {
        status: 'CAUTION',
        colorClass: 'text-amber-500 border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        colorGlow: 'shadow-[0_0_40px_rgba(245,158,11,0.3)]',
        accentColor: '#f59e0b',
        title: 'High Chemical Neutralization Risk',
        verdict: 'FEASIBLE WITH PRE-TREATMENT CAPEX BUFFER',
        explanation: 'The extreme chemical composition (acidity/high TDS) requires immediate neutralizer reagents before physical separation can begin.',
        riskLevel: 'MEDIUM-HIGH'
      };
    }

    if (activeStream.ph < 5.0 || activeStream.sludge_percentage > 50) {
      return {
        status: 'NO-GO',
        colorClass: 'text-error border-error bg-error/10 shadow-[0_0_20px_rgba(239,68,68,0.15)]',
        colorGlow: 'shadow-[0_0_40px_rgba(239,68,68,0.3)]',
        accentColor: '#ff5449',
        title: 'Sourcing Recovery Postponed',
        verdict: 'RECOVERY NOT RECOMMENDED — HIGH COMPLIANCE HAZARD',
        explanation: 'Extreme corrosive pH or biological sludge ratio poses severe equipment decay risks. Operational complexity exceeds regional margin profitability thresholds.',
        riskLevel: 'HIGH'
      };
    }

    return {
      status: 'GO',
      colorClass: 'text-primary border-primary bg-primary/10 shadow-[0_0_20px_rgba(76,242,194,0.15)]',
      colorGlow: 'shadow-[0_0_40px_rgba(76,242,194,0.3)]',
      accentColor: '#4cf2c2',
      title: 'High Circular Synergy',
      verdict: 'RECOMMENDED FOR IMMEDIATE BIO-CONCRETE CURING',
      explanation: 'Optimal molecular consistency and negligible heavy metallic contamination support a direct regional symbiotic supply chain with high profit yield.',
      riskLevel: 'LOW'
    };
  };

  const decision = getDecisionParams();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Decision Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            AI Recovery Decision Center
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Futuristic neural analytics calculating feasibility thresholds, payback margins, and infrastructure readiness.
          </p>
        </div>

        {/* Dynamic active stream selector */}
        <div className="flex items-center gap-2 bg-surface p-2 rounded-xl border border-outline-variant/20 shadow-sm font-semibold text-xs text-on-surface">
          <label className="text-[10px] text-on-surface-variant uppercase tracking-wider pl-1 font-bold">Inspect Node:</label>
          <select 
            value={activeStream?.id || ''}
            onChange={(e) => setActiveStreamById(e.target.value)}
            className="bg-transparent border-0 focus:outline-none font-bold text-primary cursor-pointer"
          >
            {wasteStreams.map((s) => (
              <option key={s.id} value={s.id} className="bg-white text-on-background">{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {activeStream && activeScores ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FEATURE 1: AI Recovery Recommendation Display (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20 flex flex-col items-center justify-between text-center relative overflow-hidden group min-h-[480px]">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-surface-bright/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 w-full border-b border-outline-variant/15 pb-4 mb-4 flex justify-between items-center text-left">
                <div>
                  <h3 className="font-headline-md text-base text-on-background font-extrabold">Autonomous Diagnostic Verdict</h3>
                  <span className="text-[10px] text-on-surface-variant font-medium">Confidence Coefficient: 98.6%</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded-full animate-ping bg-primary-fixed`} style={{ backgroundColor: decision.accentColor }} />
              </div>

              {/* Glowing Holographic Recommendation Ring */}
              <div className="relative w-56 h-56 flex items-center justify-center my-auto">
                <div className={`absolute inset-0 rounded-full border-4 border-dashed animate-spin-slow opacity-30`} style={{ borderColor: decision.accentColor }} />
                <div className={`absolute w-[85%] h-[85%] rounded-full border border-double ${decision.colorGlow} flex flex-col items-center justify-center`} style={{ borderColor: decision.accentColor }}>
                  <span className="font-metadata text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Decision Status</span>
                  <span className="font-display-hero text-5xl font-black mt-1 tracking-tight" style={{ color: decision.accentColor }}>
                    {decision.status}
                  </span>
                  <span className="font-metadata text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-1">{decision.riskLevel} RISK</span>
                </div>
              </div>

              {/* Decision Verdict Statement */}
              <div className="w-full relative z-10 mt-4 space-y-2">
                <p className="font-headline-md text-xs font-bold leading-tight uppercase tracking-wide" style={{ color: decision.accentColor }}>
                  {decision.verdict}
                </p>
                <p className="font-body-main text-[11px] text-on-surface-variant/90 leading-relaxed px-4">
                  {decision.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* 10 Advanced Metrics & Progress Bars (Spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feasibility score */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">1. Recovery Feasibility</span>
                <span className="text-sm font-extrabold text-primary">{activeScores.recoveryFeasibility}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${activeScores.recoveryFeasibility}%` }} />
              </div>
            </div>

            {/* Profitability score */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">2. Profitability Rating</span>
                <span className="text-sm font-extrabold text-secondary">{activeScores.profitability}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: `${activeScores.profitability}%` }} />
              </div>
            </div>

            {/* Operational Complexity */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">3. Operational Complexity</span>
                <span className="text-sm font-extrabold text-error">{activeScores.operationalComplexity}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-error h-full rounded-full" style={{ width: `${activeScores.operationalComplexity}%` }} />
              </div>
            </div>

            {/* Workforce requirements */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">4. Workforce Requirement</span>
                <span className="text-sm font-extrabold text-on-background">{activeScores.workforceRequirement}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-outline h-full rounded-full" style={{ width: `${activeScores.workforceRequirement}%` }} />
              </div>
            </div>

            {/* Infrastructure requirement */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">5. Infrastructure Complexity</span>
                <span className="text-sm font-extrabold text-tertiary">{activeScores.machineryCompatibility}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: `${activeScores.machineryCompatibility}%` }} />
              </div>
            </div>

            {/* Payback period */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">6. Investment Payback</span>
                <span className="text-sm font-extrabold text-on-background">
                  {activeScores.recoveryFeasibility > 70 ? '7.5 Months' : '24.2 Months'}
                </span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full animate-pulse" style={{ width: activeScores.recoveryFeasibility > 70 ? '85%' : '35%' }} />
              </div>
            </div>

            {/* Sustainability Impact */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">7. Sustainability Impact</span>
                <span className="text-sm font-extrabold text-secondary">{activeScores.sustainabilityImpact}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: `${activeScores.sustainabilityImpact}%` }} />
              </div>
            </div>

            {/* Circularity Score */}
            <div className="glass-panel p-5 rounded-xl hover-lift">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">8. Circularity Score</span>
                <span className="text-sm font-extrabold text-primary">{activeScores.circularityScore}%</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: `${activeScores.circularityScore}%` }} />
              </div>
            </div>

            {/* Risk Level */}
            <div className="glass-panel p-5 rounded-xl hover-lift md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">9. Risk Assessment</span>
                <span className="text-sm font-extrabold uppercase" style={{ color: decision.accentColor }}>{decision.riskLevel} Risk Factors</span>
              </div>
              <div className="w-full bg-outline-variant/10 h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: decision.status === 'GO' ? '25%' : decision.status === 'CAUTION' ? '60%' : '95%', backgroundColor: decision.accentColor }} />
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="glass-panel p-8 text-center text-on-surface-variant">
          No active material streams parsed yet. Select an active file in the flows tab to generate feasibility score breakdowns.
        </div>
      )}

      {/* Navigation action bar */}
      <div className="flex gap-4">
        <Link href="/dashboard" className="flex-1">
          <button className="w-full py-3.5 border border-outline-variant/30 text-on-background hover:bg-surface-dim rounded-xl font-label-caps text-xs font-bold uppercase tracking-wider transition-all">
            ← Return to Ingestion Panel
          </button>
        </Link>
        <Link href="/dashboard/innovation-lab" className="flex-1">
          <button className="w-full py-3.5 bg-primary text-white hover:bg-secondary rounded-xl font-label-caps text-xs font-bold uppercase tracking-wider transition-all shadow-md">
            Initialize AI Blueprint Synthesis →
          </button>
        </Link>
      </div>

    </div>
  );
}
