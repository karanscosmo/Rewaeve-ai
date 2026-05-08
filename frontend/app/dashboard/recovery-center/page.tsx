'use client';

import React from 'react';
import Link from 'next/link';
import { useCircular } from '@/lib/CircularContext';

export default function AIRecoveryCenter() {
  const { activeStream, activeScores } = useCircular();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Analytics Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            AI Recovery Center
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Feasibility diagnostics, payback estimates, and operational machinery blueprints.
          </p>
        </div>
      </div>

      {activeStream && activeScores ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Scores Bento Grid (Col Span 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Feasibility score */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Recovery Feasibility</span>
                <span className="text-xl font-extrabold text-primary">{activeScores.recoveryFeasibility}%</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-primary h-full rounded-full" style={{ width: `${activeScores.recoveryFeasibility}%` }} />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Determined by molecular consistency and chemical contamination scores. High feasibility suggests immediate direct separation potential.
              </p>
            </div>

            {/* Profitability score */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Resale Potential / Profit</span>
                <span className="text-xl font-extrabold text-secondary">{activeScores.resalePotential}%</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-secondary h-full rounded-full" style={{ width: `${activeScores.resalePotential}%` }} />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Reflects local buyer procurement indices. Curing byproducts are highly sought after by building developers.
              </p>
            </div>

            {/* Operational Complexity */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Operational Complexity</span>
                <span className="text-xl font-extrabold text-error">{activeScores.operationalComplexity}%</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-error h-full rounded-full" style={{ width: `${activeScores.operationalComplexity}%` }} />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Estimated filtration and neutralization stages needed before material can be repurposed.
              </p>
            </div>

            {/* Workforce requirements */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Workforce Requirement</span>
                <span className="text-xl font-extrabold text-on-surface">{activeScores.workforceRequirement}%</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-outline h-full rounded-full" style={{ width: `${activeScores.workforceRequirement}%` }} />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Specifies human handling index. A lower score signifies low specialization, highly automated flows.
              </p>
            </div>

            {/* Machinery Compatibility */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Machinery Compatibility</span>
                <span className="text-xl font-extrabold text-tertiary">{activeScores.machineryCompatibility}%</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-tertiary h-full rounded-full" style={{ width: `${activeScores.machineryCompatibility}%` }} />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Matches current operational facility machinery directly with separation protocols needed.
              </p>
            </div>

            {/* Treatment dependency */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover-lift">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Chemical Treatment Dependency</span>
                <span className="text-xl font-extrabold text-primary">{activeScores.treatmentDependency}%</span>
              </div>
              <div className="w-full bg-outline-variant/20 h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-primary h-full rounded-full" style={{ width: `${activeScores.treatmentDependency}%` }} />
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Reflects requirement of physical and chemical chemical separation reagents before final mold.
              </p>
            </div>
          </div>

          {/* Ledger analysis and financial explanations (Col Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Feasibility Summary Ledger Card */}
            <div className="glass-panel p-6 rounded-2xl border border-primary/20 shadow-lg">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">assessment</span>
                Recovery Verdict
              </h3>
              
              <div className="space-y-4 text-xs font-medium text-on-surface">
                <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                  <span className="text-on-surface-variant">Recommended Process</span>
                  <span className="font-bold text-primary">Prepress & Curing</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                  <span className="text-on-surface-variant">Estimated Payback Period</span>
                  <span className="font-bold">7.5 Months</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                  <span className="text-on-surface-variant">Estimated CapEx</span>
                  <span className="font-bold">₹32,50,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/15 pb-2">
                  <span className="text-on-surface-variant">Sustainability Impact</span>
                  <span className="text-secondary font-bold">Excellent (+350 Eco Pt)</span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/dashboard/innovation-lab">
                  <button className="w-full py-3 bg-primary text-white font-label-caps text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all">
                    Generate Circular Blueprint
                  </button>
                </Link>
              </div>
            </div>

            {/* Logistics Explanation */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-on-background mb-2">Operational Justification</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Separating byproducts yields significant environmental and economic benefits. Standard physical quarrying fees of silica materials average ₹28,000 per ton. Repurposing chemical and smelter residues offsets quarrying costs, avoiding local environmental disposal penalties.
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="glass-panel p-8 text-center text-on-surface-variant">
          No active material streams parsed yet. Select an active file in the flows tab to generate feasibility score breakdowns.
        </div>
      )}

    </div>
  );
}
