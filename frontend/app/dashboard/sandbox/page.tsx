'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function SmartRecoverySandbox() {
  const { addNotification, t } = useCircular();

  // Slider controls
  const [feedVolume, setFeedVolume] = useState(120); // Tons
  const [manpower, setManpower] = useState(4); // operators
  const [energyInput, setEnergyInput] = useState(45); // MWh
  const [treatmentChemicals, setTreatmentChemicals] = useState(15); // Liters

  // Realtime recalculations
  const computedProcessingCost = (feedVolume * 1500) + (manpower * 8000) + (energyInput * 1200) + (treatmentChemicals * 250);
  const rawQuarryingCost = feedVolume * 28000;
  const netSavings = rawQuarryingCost - computedProcessingCost;
  const roi = ((netSavings / (computedProcessingCost || 1)) * 100).toFixed(0);
  const carbonOffset = (feedVolume * 1.25) - (energyInput * 0.12);
  const productionOutput = (feedVolume * 0.88).toFixed(1);

  const handleApplySimPreset = () => {
    addNotification(
      'Sandbox Parameters Locked',
      `Simulation active: Calibrating ${feedVolume} Tons feedstock requiring ${manpower} technicians at ${energyInput} MWh.`,
      'success'
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Sandbox Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('Recovery Simulation Sandbox')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            {t('Simulate operational variables, labor loads, and thermal kiln temperatures to recalculate net margins and carbon yield.')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Hand Sliders Control Board (Spans 5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-outline-variant/20 space-y-6">
          <div className="border-b border-outline-variant/15 pb-3">
            <h3 className="font-headline-md text-base text-primary font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary fill-1">tune</span>
              {t('Variables Control Panel')}
            </h3>
            <p className="text-[10px] text-on-surface-variant">{t('Calibrate real-time processing streams.')}</p>
          </div>

          <div className="space-y-5 font-semibold text-xs text-on-surface">
            {/* Feedstock Volume */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-on-surface-variant">{t('Feedstock Input Volume')}</span>
                <span className="text-primary font-bold">{feedVolume} Metric Tons</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                value={feedVolume}
                onChange={(e) => setFeedVolume(Number(e.target.value))}
                className="w-full accent-primary bg-surface-variant rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Manpower */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-on-surface-variant">{t('Assigned Technicians')}</span>
                <span className="text-on-background font-bold">{manpower} Operators</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="25" 
                value={manpower}
                onChange={(e) => setManpower(Number(e.target.value))}
                className="w-full accent-primary bg-surface-variant rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Energy Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-on-surface-variant">{t('Thermal Kiln Heat Energy')}</span>
                <span className="text-secondary font-bold">{energyInput} MWh Rating</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="150" 
                value={energyInput}
                onChange={(e) => setEnergyInput(Number(e.target.value))}
                className="w-full accent-secondary bg-surface-variant rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* Reagents / Chemicals */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-on-surface-variant">{t('Chemical Reagents / Neutralizers')}</span>
                <span className="text-tertiary font-bold">{treatmentChemicals} Liters/Ton</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={treatmentChemicals}
                onChange={(e) => setTreatmentChemicals(Number(e.target.value))}
                className="w-full accent-tertiary bg-surface-variant rounded-lg cursor-pointer h-1.5"
              />
            </div>
          </div>

          <button 
            onClick={handleApplySimPreset}
            className="w-full py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all shadow-md mt-4"
          >
            {t('Run Active Simulation Loop')}
          </button>
        </div>

        {/* Right Hand Futuristic Simulation Chamber & Recalculation Output (Spans 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-primary-container relative overflow-hidden min-h-[460px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="border-b border-primary-container/30 pb-4 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-headline-md text-base text-on-background font-extrabold">{t('Futuristic Simulation Chamber')}</h3>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider animate-pulse">{t('Computing real-time molecular delta...')}</span>
              </div>
              <span className="material-symbols-outlined text-primary text-xl animate-spin-slow">cycle</span>
            </div>

            {/* Virtual physical visual flows */}
            <div className="h-44 w-full bg-surface-container-low/20 border border-outline-variant/15 rounded-xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-transparent pointer-events-none" />
              {/* Virtual Compaction Loom flow drawing */}
              <div className="flex items-center gap-6 relative z-10 font-bold text-[10px] text-on-surface-variant">
                <div className="flex flex-col items-center p-3 bg-surface border border-outline-variant/30 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-base mb-1">water_drop</span>
                  <span>{feedVolume}T {t('Raw Inflow')}</span>
                </div>
                <div className="w-8 h-0.5 border-t border-dashed border-primary-fixed" />
                <div className="flex flex-col items-center p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary shadow-[0_0_15px_rgba(76,242,194,0.15)] animate-pulse">
                  <span className="material-symbols-outlined text-base mb-1">science</span>
                  <span>{t('Curing Loom')}</span>
                </div>
                <div className="w-8 h-0.5 border-t border-dashed border-secondary-fixed" />
                <div className="flex flex-col items-center p-3 bg-surface border border-outline-variant/30 rounded-xl">
                  <span className="material-symbols-outlined text-secondary text-base mb-1">architecture</span>
                  <span>{productionOutput}T {t('Bio-Blocks')}</span>
                </div>
              </div>
            </div>

            {/* Recalculated parameters telemetry display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-surface/50 border border-outline-variant/20 flex flex-col justify-between">
                <span className="text-[9px] text-on-surface-variant font-bold uppercase">{t('Estimated CapEx Cost')}</span>
                <span className="font-display-hero text-base font-extrabold text-on-background mt-1">₹{computedProcessingCost.toLocaleString()}</span>
              </div>
              <div className="p-4 rounded-xl bg-surface/50 border border-outline-variant/20 flex flex-col justify-between">
                <span className="text-[9px] text-on-surface-variant font-bold uppercase">{t('Avoided Raw Cost')}</span>
                <span className="font-display-hero text-base font-extrabold text-on-background mt-1">₹{rawQuarryingCost.toLocaleString()}</span>
              </div>
              <div className="p-4 rounded-xl bg-primary-container/15 border border-primary/20 flex flex-col justify-between shadow-sm">
                <span className="text-[9px] text-primary font-bold uppercase">{t('Net Sourcing ROI')}</span>
                <span className="font-display-hero text-lg font-black text-primary mt-1">{roi}% ROI</span>
              </div>
              <div className="p-4 rounded-xl bg-secondary-container/15 border border-secondary/20 flex flex-col justify-between shadow-sm">
                <span className="text-[9px] text-secondary font-bold uppercase">{t('Carbon Avoided')}</span>
                <span className="font-display-hero text-base font-extrabold text-secondary mt-1">{carbonOffset.toFixed(1)}T CO2e</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
