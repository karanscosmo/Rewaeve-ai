'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function CooperativeExpertNetwork() {
  const { user, experts, requestCollaboration, t } = useCircular();
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>('exp-1');

  const selectedExpert = experts.find(e => e.id === selectedExpertId);

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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
            Cooperative Network
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('expertNetwork')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
            Acquire specialized consulting services, book regulatory compliance training, and align with state-level circular grants.
          </p>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* NGO/Government interactive listings (Col Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="font-headline-md text-lg text-primary font-bold">Registered Partners & Experts</h2>

          <div className="grid grid-cols-1 gap-4">
            {experts.map((exp) => {
              const isSelected = selectedExpertId === exp.id;
              return (
                <div 
                  key={exp.id}
                  onClick={() => setSelectedExpertId(exp.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer text-xs font-semibold flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                    isSelected 
                      ? 'bg-primary-container/10 border-primary shadow-[0_0_15px_rgba(76,242,194,0.1)]' 
                      : 'bg-surface/40 border-outline-variant/15 hover:border-primary/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                        exp.type === 'NGO' ? 'bg-secondary/15 text-secondary border border-secondary/20' : 
                        exp.type === 'GOVERNMENT' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20' : 
                        'bg-primary/15 text-primary border border-primary/20'
                      }`}>
                        {exp.type}
                      </span>
                      <h3 className="text-sm font-bold text-on-background mt-2">{exp.name}</h3>
                      <p className="text-[10px] text-on-surface-variant font-bold mt-0.5">{exp.specialty}</p>
                    </div>
                    <span className="text-xs font-extrabold text-primary font-mono">{exp.rate}</span>
                  </div>

                  <p className="text-[10.5px] text-on-surface-variant leading-relaxed max-w-md mt-2">
                    {exp.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected expert portal action panel (Col Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {selectedExpert && (
            <div className="glass-panel p-6 rounded-2xl border border-primary-container bg-primary-container/[0.01] flex flex-col justify-between min-h-[380px] relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-primary-container/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="border-b border-outline-variant/15 pb-4">
                  <span className="font-label-caps text-[9px] text-primary bg-primary-container/20 border border-primary/25 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold">Active Matching Portal</span>
                  <h3 className="text-lg font-bold text-on-background mt-3">{selectedExpert.name}</h3>
                  <p className="text-xs text-on-surface-variant font-bold mt-0.5">{selectedExpert.specialty}</p>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/15 text-[11px] font-bold">
                    <span className="text-on-surface-variant text-[9px] block uppercase tracking-wider">Consultation Fee Schedule</span>
                    <p className="text-sm text-primary font-mono mt-1">{selectedExpert.rate}</p>
                  </div>

                  <div className="p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/15 text-[11px] font-bold">
                    <span className="text-on-surface-variant text-[9px] block uppercase tracking-wider">Expert Rating Score</span>
                    <p className="text-sm text-secondary font-mono mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm font-bold">star</span>
                      {selectedExpert.rating} / 5.0 Rating
                    </p>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Engaging with {selectedExpert.name} establishes a secure, audited circular consultation workflow. This supports MOEFCC environmental regulatory validations.
                </p>
              </div>

              <button 
                onClick={() => requestCollaboration(selectedExpert.id)}
                className={`w-full mt-8 py-3 ${theme.bg} text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl shadow-md relative z-10 ${theme.hover} transition-all`}
              >
                Request Support & Schedule Audit
              </button>
            </div>
          )}

          {/* Government Initiatives Subsidies Board */}
          <div className="glass-panel p-6 rounded-2xl border border-outline-variant/20 flex flex-col gap-4">
            <h3 className="font-headline-md text-base text-secondary font-extrabold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary">gavel</span>
              Circular Subsidies & Grants Feed
            </h3>

            <div className="space-y-3 font-semibold text-xs text-on-surface">
              <div className="p-3 bg-surface-container-lowest/55 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] text-amber-500 font-bold block uppercase">Subsidy Match #24</span>
                <p className="text-sm font-bold text-on-background mt-1">₹45 Lakh Water Twin Grant</p>
                <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">MoEFCC reimburses state-level manufacturing twins installing dense sieve recycling filters.</p>
              </div>

              <div className="p-3 bg-surface-container-lowest/55 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] text-primary font-bold block uppercase">Tax Exemption #11</span>
                <p className="text-sm font-bold text-on-background mt-1">Zero GST on Refined Fly-Ash Tile Cures</p>
                <p className="text-[10px] text-on-surface-variant leading-relaxed mt-1">Inter-state transactions of certified circular aggregates receive full GST exemptions.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
