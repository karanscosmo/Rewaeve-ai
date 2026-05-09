'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCircular } from '@/lib/CircularContext';

export default function ESGSustainabilityHub() {
  const { user, addNotification } = useCircular();
  const [treatmentUrgency, setTreatmentUrgency] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');

  const getRoleTheme = () => {
    switch (user?.role) {
      case 'buyer': return { text: 'text-yellow-600', bg: 'bg-yellow-600', bgAlpha: 'bg-yellow-600/10', border: 'border-yellow-600' };
      default: return { text: 'text-zinc-900', bg: 'bg-zinc-900', bgAlpha: 'bg-zinc-900/10', border: 'border-zinc-900' };
    }
  };

  const theme = getRoleTheme();

  // Interactive predictor parameters
  const riskStats = {
    LOW: { score: 18, probability: '2.5%', penalty: '₹0.00', status: 'COMPLIANT' },
    MEDIUM: { score: 45, probability: '12.4%', penalty: '₹2,40,000 potential', status: 'WARNING' },
    HIGH: { score: 88, probability: '74.8%', penalty: '₹14,50,000 potential', status: 'CRITICAL HAZARD' }
  };

  const activeRisk = riskStats[treatmentUrgency];

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
            ESG Module
          </span>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter mt-3">
            AI Compliance Risk Predictor
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
            Monitor potential pollution hazards, hazardous exposure liabilities, and estimate regulatory penalty indexes.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-surface-container/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-outline-variant/30 shadow-sm">
          <div className={`w-3 h-3 rounded-full ${theme.bg} animate-pulse`} />
          <span className="font-metadata text-xs text-on-surface font-semibold">Live Predictive Radar Active</span>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
        
        {/* Central Risk Radar Pulse Pane (Hero Visual - Spans 7 cols) */}
        <div className={`col-span-1 lg:col-span-7 bg-surface/60 backdrop-blur-[24px] border ${theme.border}/20 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-between min-h-[500px] group transition-all duration-500 shadow-sm`}>
          <div className={`absolute inset-0 opacity-20 pointer-events-none bg-radial-gradient ${theme.bgAlpha} to-transparent`} />
          
          <div className="w-full flex justify-between items-center z-10 border-b border-outline-variant/15 pb-4">
            <h2 className={`font-headline-md text-base font-bold ${theme.text}`}>Compliance Radar Scanning</h2>
            <div className="flex gap-2">
              {(['LOW', 'MEDIUM', 'HIGH'] as const).map((urg) => (
                <button 
                  key={urg}
                  onClick={() => {
                    setTreatmentUrgency(urg);
                    addNotification(`Recalculating predictive ESG model for ${urg} risk tolerance`, 'info');
                  }}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all border ${treatmentUrgency === urg ? `${theme.bg} text-white ${theme.border}` : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:bg-surface-dim'}`}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full max-w-md aspect-square relative my-auto z-10 flex items-center justify-center">
            {/* Animated risk radar pulse circles */}
            <div className="w-3/4 h-3/4 rounded-full border border-primary-container/40 relative shadow-[0_0_60px_rgba(76,242,194,0.15)] flex items-center justify-center overflow-hidden bg-surface-bright/40">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/5 to-transparent animate-spin-slow pointer-events-none" />
              <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-primary/30 animate-pulse" />
              <div className="absolute w-[50%] h-[50%] rounded-full border border-double border-primary/20" />
              
              <div className="text-center relative z-20">
                <span className="font-display-hero text-6xl md:text-7xl text-primary font-black block leading-none">
                  {activeRisk.score}<span className="text-3xl font-bold">%</span>
                </span>
                <span className="font-label-caps text-[10px] text-on-surface-variant font-bold tracking-widest mt-2.5 block uppercase">Risk Probability Index</span>
              </div>
            </div>
            
            {/* Floating Risk Alerts Overlay Tags */}
            <div className="absolute top-10 right-4 bg-surface-container-lowest/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline-variant/30 text-[10px] font-bold text-secondary shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[12px] font-bold">warning</span> {activeRisk.status}
            </div>
            <div className="absolute bottom-10 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline-variant/30 text-[10px] font-bold text-tertiary shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[12px] font-bold">radar</span> Radar Grid Active
            </div>
          </div>
        </div>

        {/* Predictive Risk Dashboard Outputs (Spans 5 cols) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
          
          {/* Hazard Score Cards */}
          <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:border-primary shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-lg">gavel</span>
                <h3 className="text-sm font-semibold text-on-background">Compliance Penalty Potential</h3>
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-2xl font-extrabold text-on-background tracking-tight">{activeRisk.penalty}</span>
              <span className="font-metadata text-xs text-on-surface-variant font-medium mb-1">INR Limit</span>
            </div>
            <div className="mt-4 w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${activeRisk.score}%` }} />
            </div>
          </div>

          <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 hover:border-secondary shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-lg">shield</span>
                <h3 className="text-sm font-semibold text-on-background">Future Violation Probability</h3>
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-on-background tracking-tight">{activeRisk.probability}</span>
              <span className="font-metadata text-xs text-on-surface-variant font-medium mb-1">Prediction Core</span>
            </div>
            <div className="mt-4 w-full h-1 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${activeRisk.score}%` }} />
            </div>
          </div>

          {/* Compliance warnings list */}
          <div className="bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 flex-1 flex flex-col group shadow-sm">
            <h3 className="text-base font-bold text-primary mb-4">Urgent Compliance Warnings</h3>
            <div className="space-y-3 font-semibold text-xs text-on-surface">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="text-on-surface">pH Acidity Out of Bounds</span>
                <span className="text-error font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span> Critical Warning
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                <span className="text-on-surface">TDS Level Compliance Penalty</span>
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Cautionary Limit
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
