'use client';

import React from 'react';

export default function ReportsCenter() {
  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            System Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Reports Center
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Export SEC compliance alignment logs, ESG offsets and circular molecular blueprints.
          </p>
        </div>
      </div>

      {/* Grid listing export files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Report 1 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">SEC Climate Alignment Report</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: PDF • Size: 2.4MB • Updated 2 hours ago</span>
          </div>
          <button className="p-3 bg-primary-container/25 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

        {/* Report 2 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Circular Materials Ledger</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: XLSX • Size: 1.1MB • Updated Yesterday</span>
          </div>
          <button className="p-3 bg-secondary-container/25 text-secondary rounded-xl hover:bg-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

        {/* Report 3 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Water Twin Diagnostic Blueprint</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: PDF • Size: 4.8MB • Updated 4 hours ago</span>
          </div>
          <button className="p-3 bg-tertiary-container/25 text-tertiary rounded-xl hover:bg-tertiary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

        {/* Report 4 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Scope 1, 2, 3 Emissions offset certificate</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: PNG Certificate • Size: 512KB • Updated 3 days ago</span>
          </div>
          <button className="p-3 bg-primary-container/25 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

      </div>

    </div>
  );
}
