'use client';

import React from 'react';
import { useCircular } from '@/lib/CircularContext';
import TopNavBar from '@/components/TopNavBar';
import SideNavBar from '@/components/SideNavBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useCircular();

  // Role-based gradient backgrounds
  // Manufacturer / Seller: keep existing mint + aqua environmental palette
  // Buyer Dashboard: use lighter blue-green + white futuristic palette
  // Middleman Dashboard: use graphite + holographic cyan palette
  // NGO / Government Dashboard: use soft environmental green + ivory white
  const getThemeBackground = () => {
    switch (user?.role) {
      case 'buyer':
        return {
          bg: 'bg-gradient-to-br from-[#FFFEFA] to-[#FDF9EA]',
          mesh: 'from-[rgba(250,204,21,0.15)] via-[rgba(253,224,71,0.08)] to-transparent',
          textClass: 'text-[#1A180F]'
        };
      default: // middleman, manufacturer, sustainability, government, etc
        return {
          bg: 'bg-gradient-to-br from-[#F8F9FA] to-[#F4F4F5]',
          mesh: 'from-[rgba(9,9,11,0.1)] via-[rgba(39,39,42,0.05)] to-transparent',
          textClass: 'text-[#09090B]'
        };
    }
  };

  const theme = getThemeBackground();

  return (
    <div className={`relative min-h-screen pb-24 md:pb-0 transition-colors duration-500 ${theme.textClass}`}>
      {/* Shared Dashboard Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500">
        <div className={`absolute inset-0 ${theme.bg}`} />
        <div className={`absolute top-[20%] right-[5%] w-[800px] h-[800px] rounded-full bg-radial-gradient ${theme.mesh} blur-3xl opacity-80`} />
      </div>

      {/* Navigation Layer */}
      <TopNavBar />
      <SideNavBar />

      {/* Main Workspace Frame */}
      <main className="relative z-10 pt-10 md:pt-28 md:pl-28 md:pr-8 px-4 max-w-[1600px] mx-auto min-h-screen">
        {children}
      </main>
      {/* Floating Copilot Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          className={`w-14 h-14 rounded-full ${theme.textClass.includes('yellow') ? 'bg-yellow-600 text-white' : 'bg-zinc-900 text-white'} shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group`}
        >
          <span className="material-symbols-outlined text-2xl animate-pulse">smart_toy</span>
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-surface rounded-full"></span>
          
          {/* Tooltip */}
          <span className="absolute left-16 bg-surface-container border border-outline-variant/20 text-on-surface px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
            ReWeave AI Copilot
          </span>
        </button>
      </div>
    </div>
  );
}
