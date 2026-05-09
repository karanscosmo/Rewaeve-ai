'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCircular, GlobalLanguage } from '@/lib/CircularContext';

export default function SideNavBar() {
  const pathname = usePathname();
  const { user, logout, language, setLanguage, t } = useCircular();

  const primaryLinks = [
    { name: 'flows', href: '/dashboard', icon: 'loop' },
    { name: 'waterTwin', href: '/dashboard/water-twin', icon: 'psychology' },
    { name: 'recoveryCenter', href: '/dashboard/recovery-center', icon: 'model_training' },
    { name: 'manufacturing', href: '/dashboard/innovation-lab', icon: 'auto_awesome' },
    { name: 'marketplace', href: '/dashboard/exchange', icon: 'shopping_basket' },
    { name: 'contracts', href: '/dashboard/tenders', icon: 'gavel' },
  ];

  const intelligenceLinks = [
    { name: 'network', href: '/dashboard/network', icon: 'hub' },
    { name: 'monitoring', href: '/dashboard/monitoring', icon: 'monitoring' },
    { name: 'sandbox', href: '/dashboard/sandbox', icon: 'tune' },
    { name: 'copilot', href: '/dashboard/copilot', icon: 'smart_toy' },
    { name: 'expertNetworkLink', href: '/dashboard/expert-network', icon: 'groups_3' },
  ];

  const sustainabilityLinks = [
    { name: 'esg', href: '/dashboard/sustainability', icon: 'assignment_turned_in' },
    { name: 'supplyChain', href: '/dashboard/supply-chain', icon: 'local_shipping' },
    { name: 'carbon', href: '/dashboard/carbon', icon: 'co2' },
  ];

  const systemLinks = [
    { name: 'notifications', href: '/dashboard/notifications', icon: 'notifications' },
    { name: 'settings', href: '/dashboard/settings', icon: 'settings' },
  ];

  // Dynamic colors based on active login role
  const roleColorMap = {
    manufacturer: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' },
    buyer: { border: 'border-yellow-600/20', text: 'text-yellow-600', textBg: 'bg-yellow-600/10' },
    middleman: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' },
    sustainability: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' },
    government: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' },
    recycler: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' },
    treatment: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' },
    admin: { border: 'border-zinc-900/20', text: 'text-zinc-900', textBg: 'bg-zinc-900/10' }
  };

  const activeTheme = roleColorMap[user?.role || 'manufacturer'] || roleColorMap.manufacturer;

  return (
    <>
      {/* Desktop Persistent Sidebar Drawer */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 flex-col bg-surface/40 backdrop-blur-glass border-r border-outline-variant/10 shadow-xl w-20 hover:w-80 transition-all duration-500 overflow-hidden group">
        
        {/* Header Branding */}
        <div className="p-5 flex items-center justify-between border-b border-outline-variant/10 whitespace-nowrap shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center border ${activeTheme.border} animate-pulse shrink-0`}>
              <span className={`material-symbols-outlined ${activeTheme.text} font-bold`}>all_inclusive</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="font-display-hero text-lg text-on-background font-extrabold tracking-tighter">ReWeave OS</div>
              <div className="font-metadata text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Active Intelligence</div>
            </div>
          </div>
        </div>

        {/* Dynamic Global Multilingual Switcher inside sidebar */}
        <div className="px-5 py-3 border-b border-outline-variant/10 whitespace-nowrap shrink-0 group-hover:block hidden">
          <span className="font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest block mb-2">{t('platformLanguage')}</span>
          <div className="grid grid-cols-4 gap-1.5">
            {([
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'HI' },
              { code: 'ta', label: 'TA' },
              { code: 'gu', label: 'GU' }
            ] as const).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-[9.5px] py-1 rounded font-bold transition-all border ${
                  language === lang.code 
                    ? 'bg-primary text-white border-primary shadow-sm' 
                    : 'bg-surface-container-lowest border-outline-variant/20 hover:bg-surface-dim text-on-surface-variant'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Links container */}
        <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5 hide-scrollbar">
          
          {/* Section: Operations */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">{t('coreOperations')}</span>
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold animate-pulse' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">{t(link.name)}</span>
                </Link>
              );
            })}
          </div>

          {/* Section: Intel */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">{t('intelligence')}</span>
            {intelligenceLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold animate-pulse' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">{t(link.name)}</span>
                </Link>
              );
            })}
          </div>

          {/* Section: Sustainability */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">{t('esgAuditing')}</span>
            {sustainabilityLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">{t(link.name)}</span>
                </Link>
              );
            })}
          </div>

          {/* Section: Platform */}
          <div className="space-y-1">
            <span className="hidden group-hover:block px-3 font-label-caps text-[9px] text-on-surface-variant/60 font-bold uppercase tracking-widest mb-1.5">{t('systemControl')}</span>
            {systemLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all whitespace-nowrap ${isActive ? 'bg-primary text-white font-bold' : 'text-on-surface-variant hover:bg-primary-container/15'}`}
                >
                  <span className={`material-symbols-outlined text-xl shrink-0 ${isActive ? 'fill-1' : ''}`}>{link.icon}</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold">{t(link.name)}</span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Footer User Avatar Profile */}
        <div className="p-4 border-t border-outline-variant/10 whitespace-nowrap shrink-0 bg-surface-container-low/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 relative shrink-0">
                <Image 
                  alt="Avatar" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB464UF0oP9M6VCaumXyK_rgUHsUDpOCjeAgoguI-Rlt5CKYeTZ0F6eHOtMcQ0JuaR1HMyGCIr9scJgUhNZdBaB1Exzp4ptYdcCiPw1noM3xoIPm9ZlP-cln9agLwz0FXIyEeqUf4xclz30uv4pA9TFgw_UEG3XN2TMkhz0gpI6qrsGTjEodiDjDT8cyTN_mBlFrCsjxenN6eE1brrzk6mnan4lvs6_280DpEVCYMwCDlQtNY6SRLwrDzrmASPOSqL04s7hQ0p7dA"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs font-bold text-on-background max-w-[130px] truncate">{user?.fullName || 'Guest Operator'}</div>
                <div className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${activeTheme.text} ${activeTheme.textBg} border ${activeTheme.border} w-max`}>
                  {user?.role || 'manufacturer'}
                </div>
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
          <span className="text-[9px] font-bold mt-0.5">{t('flows')}</span>
        </Link>
        <Link href="/dashboard/water-twin" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg font-bold">psychology</span>
          <span className="text-[9px] font-bold mt-0.5">{t('waterTwin')}</span>
        </Link>
        <Link href="/dashboard/copilot" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg">smart_toy</span>
          <span className="text-[9px] font-bold mt-0.5">{t('copilot')}</span>
        </Link>
        <Link href="/dashboard/exchange" className="flex flex-col items-center justify-center p-2 text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined text-lg">shopping_basket</span>
          <span className="text-[9px] font-bold mt-0.5">{t('marketplace')}</span>
        </Link>
      </nav>
    </>
  );
}
