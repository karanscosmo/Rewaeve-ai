'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCircular } from '@/lib/CircularContext';

export default function SideNavBar() {
  const pathname = usePathname();
  const { user, logout } = useCircular();

  const primaryLinks = [
    { name: 'Circular Flows', href: '/dashboard', icon: 'loop' },
    { name: 'Water Twin Diagnostics', href: '/dashboard/water-twin', icon: 'psychology' },
    { name: 'AI Recovery Center', href: '/dashboard/recovery-center', icon: 'model_training' },
    { name: 'Product Innovation Lab', href: '/dashboard/innovation-lab', icon: 'auto_awesome' },
    { name: 'Industrial Marketplace', href: '/dashboard/exchange', icon: 'shopping_basket' },
    { name: 'Tenders & Contracts', href: '/dashboard/tenders', icon: 'gavel' },
  ];

  const intelligenceLinks = [
    { name: 'Ecosystem Network', href: '/dashboard/network', icon: 'hub' },
    { name: 'Live Monitoring', href: '/dashboard/monitoring', icon: 'monitoring' },
    { name: 'AI Copilot Chat', href: '/dashboard/copilot', icon: 'smart_toy' },
    { name: 'Cost Savings Hub', href: '/dashboard/cost-savings', icon: 'monetization_on' },
  ];

  const sustainabilityLinks = [
    { name: 'ESG & Compliance', href: '/dashboard/sustainability', icon: 'assignment_turned_in' },
    { name: 'Supply Chain Intel', href: '/dashboard/supply-chain', icon: 'local_shipping' },
    { name: 'Carbon Analytics', href: '/dashboard/carbon', icon: 'co2' },
  ];

  const systemLinks = [
    { name: 'Alert Notification Log', href: '/dashboard/notifications', icon: 'notifications' },
    { name: 'Platform Billing', href: '/dashboard/billing', icon: 'credit_card' },
    { name: 'Ingestion Reports', href: '/dashboard/reports', icon: 'description' },
    { name: 'Organization Settings', href: '/dashboard/settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Desktop Persistent Sidebar Drawer */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col bg-surface/40 backdrop-blur-glass border-r border-outline-variant/10 shadow-xl w-20 hover:w-80 transition-all duration-500 overflow-hidden group">
        
        {/* Header Branding */}
        <div className="p-5 flex items-center gap-4 border-b border-outline-variant/10 whitespace-nowrap shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center border border-primary/25 animate-pulse shrink-0">
            <span className="material-symbols-outlined text-primary font-bold">all_inclusive</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="font-display-hero text-lg text-primary font-extrabold tracking-tighter">ReWeave OS</div>
            <div className="font-metadata text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Active Intelligence</div>
          </div>
        </div>

        {/* Scrollable Links container */}
        <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5 hide-scrollbar">
          
          {/* Section: Operations */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">Core Operations</span>
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Section: Intel */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">Intelligence</span>
            {intelligenceLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Section: Sustainability */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">ESG Auditing</span>
            {sustainabilityLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Section: Platform */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">System Portal</span>
            {systemLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">{link.name}</span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Footer User Avatar Profile */}
        <div className="p-4 border-t border-outline-variant/10 whitespace-nowrap shrink-0 bg-surface-container-low/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 relative">
                <Image 
                  alt="Avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB464UF0oP9M6VCaumXyK_rgUHsUDpOCjeAgoguI-Rlt5CKYeTZ0F6eHOtMcQ0JuaR1HMyGCIr9scJgUhNZdBaB1Exzp4ptYdcCiPw1noM3xoIPm9ZlP-cln9agLwz0FXIyEeqUf4xclz30uv4pA9TFgw_UEG3XN2TMkhz0gpI6qrsGTjEodiDjDT8cyTN_mBlFrCsjxenN6eE1brrzk6mnan4lvs6_280DpEVCYMwCDlQtNY6SRLwrDzrmASPOSqL04s7hQ0p7dA"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs font-bold text-on-background max-w-[130px] truncate">{user?.fullName || 'Guest Operator'}</div>
                <div className="text-[10px] text-primary font-bold uppercase tracking-wider">{user?.role || 'manufacturer'}</div>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-all p-1.5 hover:bg-error-container/20 rounded-lg shrink-0"
              title="Logout Node"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Navigation (Bottom layout) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-2 py-1.5 bg-surface/30 backdrop-blur-glass border-t border-primary/20 shadow-xl">
        <Link href="/dashboard" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg">loop</span>
          <span className="text-[9px] font-bold mt-0.5">Flows</span>
        </Link>
        <Link href="/dashboard/water-twin" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg font-bold">psychology</span>
          <span className="text-[9px] font-bold mt-0.5">Twin</span>
        </Link>
        <Link href="/dashboard/copilot" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          <span className="text-[9px] font-bold mt-0.5">Copilot</span>
        </Link>
        <Link href="/dashboard/exchange" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg">shopping_basket</span>
          <span className="text-[9px] font-bold mt-0.5">Exchange</span>
        </Link>
      </nav>
    </>
  );
}
