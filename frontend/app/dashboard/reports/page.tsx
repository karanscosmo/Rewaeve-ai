'use client';

import React from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function ReportsCenter() {
  const { user, addNotification } = useCircular();

  const getRoleTheme = () => {
    switch (user?.role) {
      case 'buyer': return { text: 'text-yellow-600', bg: 'bg-yellow-600', bgAlpha: 'bg-yellow-600/10', border: 'border-yellow-600', containerText: 'text-yellow-600' };
      default: return { text: 'text-zinc-900', bg: 'bg-zinc-900', bgAlpha: 'bg-zinc-900/10', border: 'border-zinc-900', containerText: 'text-zinc-900' };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className={`font-label-caps text-[10px] ${theme.text} font-bold uppercase tracking-widest ${theme.bgAlpha} px-3.5 py-1.5 rounded-full border ${theme.border}/20`}>
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
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift border border-outline-variant/15 hover:border-outline-variant/30 transition-all">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">SEC Climate Alignment Report</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: PDF • Size: 2.4MB • Updated 2 hours ago</span>
          </div>
          <button 
            onClick={() => addNotification('Report Downloaded', 'SEC Climate Alignment Report downloaded securely.', 'success')}
            className={`p-3 ${theme.bgAlpha} ${theme.containerText} rounded-xl hover:${theme.bg} hover:text-white transition-colors border ${theme.border}/10`}
          >
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

        {/* Report 2 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift border border-outline-variant/15 hover:border-outline-variant/30 transition-all">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Circular Materials Ledger</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: XLSX • Size: 1.1MB • Updated Yesterday</span>
          </div>
          <button 
            onClick={() => addNotification('Report Downloaded', 'Circular Materials Ledger downloaded securely.', 'success')}
            className={`p-3 ${theme.bgAlpha} ${theme.containerText} rounded-xl hover:${theme.bg} hover:text-white transition-colors border ${theme.border}/10`}
          >
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

        {/* Report 3 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift border border-outline-variant/15 hover:border-outline-variant/30 transition-all">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Water Twin Diagnostic Blueprint</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: PDF • Size: 4.8MB • Updated 4 hours ago</span>
          </div>
          <button 
            onClick={() => addNotification('Report Downloaded', 'Water Twin Diagnostic Blueprint downloaded securely.', 'success')}
            className={`p-3 ${theme.bgAlpha} ${theme.containerText} rounded-xl hover:${theme.bg} hover:text-white transition-colors border ${theme.border}/10`}
          >
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

        {/* Report 4 */}
        <div className="glass-panel p-5 rounded-2xl flex justify-between items-center hover-lift border border-outline-variant/15 hover:border-outline-variant/30 transition-all">
          <div>
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Scope 1, 2, 3 Emissions offset certificate</h3>
            <span className="font-metadata text-[10px] text-on-surface-variant block mt-0.5">Format: PNG Certificate • Size: 512KB • Updated 3 days ago</span>
          </div>
          <button 
            onClick={() => addNotification('Report Downloaded', 'Scope Emissions offset certificate downloaded securely.', 'success')}
            className={`p-3 ${theme.bgAlpha} ${theme.containerText} rounded-xl hover:${theme.bg} hover:text-white transition-colors border ${theme.border}/10`}
          >
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>

      </div>

    </div>
  );
}
