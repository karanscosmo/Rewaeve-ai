'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function OrganizationSettings() {
  const { user } = useCircular();

  const [org, setOrg] = useState(user?.organization || 'Vance Textile Mills');
  const [operator, setOperator] = useState(user?.fullName || 'Dr. Helen Vance');
  const [geo, setGeo] = useState('Sector 4, Industrial Development Zone');
  const [apiKey, setApiKey] = useState('reweave_live_pk_8a1b9f2c3d7e5a6f8b9c0d1e2f3a4b');

  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Configuring system buffers...');
    setTimeout(() => {
      setSaveStatus('Facility settings synchronized successfully.');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            System Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Organization Settings
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Configure industrial API tokens, enrollment facilities geolocations, and telemetry frequencies.
          </p>
        </div>
      </div>

      {/* Main Settings Form */}
      <div className="glass-panel p-6 rounded-2xl max-w-3xl">
        <h2 className="text-base font-bold text-primary border-b border-outline-variant/15 pb-4 mb-6">Facility Configuration Manifest</h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold text-on-surface-variant">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label>Organization Name</label>
              <input 
                type="text" 
                required 
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3.5 px-4 text-on-background input-glow transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label>Authorized Operator</label>
              <input 
                type="text" 
                required 
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3.5 px-4 text-on-background input-glow transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label>Primary Geolocation Koordinaten</label>
            <input 
              type="text" 
              required 
              value={geo}
              onChange={(e) => setGeo(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3.5 px-4 text-on-background input-glow transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label>API Interlink Token</label>
            <input 
              type="text" 
              required 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3.5 px-4 text-on-background font-mono input-glow transition-all"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button 
              type="submit"
              className="py-3 px-6 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
            >
              Synchronize Configuration
            </button>

            {saveStatus && (
              <span className="text-xs text-primary font-bold animate-pulse">{saveStatus}</span>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}
