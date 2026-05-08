'use client';

import React from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function NotificationsCenter() {
  const { notifications, markNotificationAsRead } = useCircular();

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            System Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            System Alerts & Notifications
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            Real-time industrial system alerts, contract confirmations, and dispatch notifications.
          </p>
        </div>
      </div>

      {/* List Layout */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-bold text-primary border-b border-outline-variant/15 pb-4 mb-2">Logs Hub</h2>
        
        {notifications.length === 0 ? (
          <p className="text-sm text-on-surface-variant text-center p-6">No current active alerts in this facility terminal.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`text-left p-4 rounded-xl border flex items-start gap-4 transition-all ${
                  notif.read ? 'bg-surface/20 border-outline-variant/15 opacity-60' : 'bg-surface-bright border-primary-container shadow-sm hover:scale-[1.002]'
                }`}
              >
                <div className={`p-2 rounded-full shrink-0 ${
                  notif.type === 'success' ? 'bg-primary-container/25 text-primary' : notif.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-secondary-container/20 text-secondary'
                }`}>
                  <span className="material-symbols-outlined text-sm font-bold">
                    {notif.type === 'success' ? 'check_circle' : notif.type === 'error' ? 'error' : 'info'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs font-bold text-on-background">{notif.title}</h3>
                    <span className="font-mono text-[9px] text-on-surface-variant">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant">{notif.message}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
