'use client';

import React, { useState, useEffect } from 'react';

interface TelemetryLog {
  id: string;
  time: string;
  node: string;
  metric: string;
  value: string;
  status: 'nominal' | 'alert' | 'critical';
}

export default function LiveMonitoringHub() {
  const [logs, setLogs] = useState<TelemetryLog[]>([
    { id: '1', time: '23:01:42', node: 'Facility Alpha', metric: 'Wash pH value', value: '7.2', status: 'nominal' },
    { id: '2', time: '23:01:20', node: 'Facility Beta', metric: 'Heavy Metals (ppm)', value: '14.5', status: 'alert' },
    { id: '3', time: '23:00:55', node: 'DyeFlow Inc.', metric: 'Turbidity (NTU)', value: '122.0', status: 'critical' },
    { id: '4', time: '22:58:12', node: 'Vance Mills', metric: 'Operational Load', value: 'Nominal', status: 'nominal' }
  ]);

  // Simulating live ticking websocket updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const nodes = ['Facility Alpha', 'Facility Beta', 'EcoBrick Smelting', 'ChemSeparation Partners', 'Apex Cements'];
      const metrics = ['pH level', 'Chemical COD', 'Freshwater conservation', 'BOD coefficient', 'Turbidity NTU'];
      const statuses: ('nominal' | 'alert' | 'critical')[] = ['nominal', 'nominal', 'alert'];
      
      const newLog: TelemetryLog = {
        id: Date.now().toString(),
        time: timeStr,
        node: nodes[Math.floor(Math.random() * nodes.length)],
        metric: metrics[Math.floor(Math.random() * metrics.length)],
        value: (Math.random() * 100).toFixed(1),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
      setLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Telemetry Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            Live Monitoring Hub
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Real-time websocket industrial logging, active node status updates, and critical threshold breach triggers.
          </p>
        </div>
      </div>

      {/* Main Monitoring Panel */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex justify-between items-center border-b border-outline-variant/15 pb-4 mb-4">
          <h2 className="text-base font-bold text-primary">Live WebSocket Stream</h2>
          <span className="font-metadata text-xs text-primary font-bold animate-pulse">● Live Stream Hook Active</span>
        </div>

        {/* Table layout of streaming logs */}
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant px-4">
            <div className="col-span-2">Time</div>
            <div className="col-span-3">Node Source</div>
            <div className="col-span-3">Metric Name</div>
            <div className="col-span-2">Telemetry Value</div>
            <div className="col-span-2 text-right">Status</div>
          </div>

          <div className="flex flex-col gap-2.5">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className="grid grid-cols-12 gap-4 items-center p-4 rounded-xl bg-surface/30 border border-outline-variant/15 hover:scale-[1.005] transition-transform font-mono text-xs font-semibold"
              >
                <div className="col-span-2 text-on-surface-variant">{log.time}</div>
                <div className="col-span-3 text-on-background">{log.node}</div>
                <div className="col-span-3 text-on-surface">{log.metric}</div>
                <div className="col-span-2 font-bold">{log.value}</div>
                <div className="col-span-2 text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    log.status === 'nominal' ? 'bg-primary-container/20 text-primary border border-primary/25' : log.status === 'alert' ? 'bg-secondary-container/25 text-secondary border border-secondary/20' : 'bg-red-100 text-red-600 border border-red-200'
                  }`}>
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
