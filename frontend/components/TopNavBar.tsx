'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCircular, UserRole } from '@/lib/CircularContext';

export default function TopNavBar() {
  const { user, loginUser, notifications, markNotificationAsRead, t } = useCircular();
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRoleSwitcherOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const rolesList: { role: UserRole; label: string; name: string; icon: string; color: string; desc: string }[] = [
    {
      role: 'manufacturer',
      label: 'Industrial Manufacturer',
      name: 'Vance Mills Facility',
      icon: 'factory',
      color: 'text-zinc-900 bg-zinc-900/10 border-zinc-900/20',
      desc: 'Map byproducts, view physical product 3D synthesis, and analyze plant.'
    },
    {
      role: 'buyer',
      label: 'Circular Buyer',
      name: 'Clara Oswald',
      icon: 'shopping_basket',
      color: 'text-yellow-600 bg-yellow-600/10 border-yellow-600/20',
      desc: 'Sourse recycled feedstocks and analyze ROI benefits.'
    },
    {
      role: 'middleman',
      label: 'Logistics Facilitator',
      name: 'Jayesh Patel',
      icon: 'hub',
      color: 'text-zinc-900 bg-zinc-900/10 border-zinc-900/20',
      desc: 'Map regional transport corridors and matching scorecards.'
    },
    {
      role: 'government',
      label: 'State Regulator',
      name: 'MOEFCC Officer',
      icon: 'gavel',
      color: 'text-zinc-900 bg-zinc-900/10 border-zinc-900/20',
      desc: 'Monitor subsidies, grant distribution, and factory compliance.'
    }
  ];

  const handleRoleSwitch = (targetRole: UserRole) => {
    loginUser('operator@facility.com', targetRole);
    setIsRoleSwitcherOpen(false);
  };

  const activeRoleConfig = rolesList.find(r => r.role === user?.role) || rolesList[0];

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 h-16 max-w-7xl mx-auto rounded-full mt-4 bg-surface/30 backdrop-blur-glass border border-outline-variant/20 shadow-[0_0_20px_rgba(76,242,194,0.15)]">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-display-hero text-headline-md text-xl tracking-tighter text-primary font-bold">
          ReWeave AI
        </Link>
      </div>
      
      <nav className="flex items-center gap-8">
        <Link href="/" className="text-on-surface-variant font-medium hover:text-primary transition-all text-sm">
          Ecosystem
        </Link>
        <Link href="/dashboard" className="text-primary font-bold border-b-2 border-primary pb-1 transition-all text-sm">
          Flows
        </Link>
        <Link href="/dashboard/water-twin" className="text-on-surface-variant font-medium hover:text-primary transition-all text-sm">
          Optimization
        </Link>
        <Link href="/pricing-intelligence" className="text-on-surface-variant font-medium hover:text-primary transition-all text-sm">
          Pricing
        </Link>
      </nav>

      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <div className="flex items-center gap-2">
          <Link href="/login"
            className="text-primary hover:scale-105 active:scale-95 transition-all p-2 rounded-full hover:bg-primary-container/20 flex items-center justify-center gap-2 border border-primary/20 bg-surface/40 shadow-sm relative group"
            title="Secure Logout"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="text-[10px] font-bold uppercase tracking-wider pr-1 hidden lg:inline-block">End Session</span>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-surface-container border border-outline-variant/20 text-on-surface px-2.5 py-1 rounded text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              Logout
            </span>
          </Link>
        </div>
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="text-primary hover:scale-105 transition-all p-1.5 rounded-full hover:bg-primary-container/20 flex items-center justify-center relative"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary rounded-full animate-pulse border-2 border-surface" />
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-12 w-80 bg-surface/95 backdrop-blur-xl border border-outline-variant/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-3 animate-fade-in z-50">
              <div className="flex justify-between items-center border-b border-outline-variant/10 pb-2">
                <h3 className="text-xs font-black text-on-surface uppercase tracking-wider">Live System Alerts</h3>
                <span className="text-[10px] text-primary font-bold">{notifications.filter(n => !n.read).length} New</span>
              </div>
              
              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                {notifications.length === 0 ? (
                  <p className="text-xs text-on-surface-variant text-center py-4">No recent alerts</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                      }}
                      className={`p-3 rounded-xl border flex flex-col gap-1 cursor-pointer transition-all ${
                        notif.read ? 'bg-surface border-outline-variant/10 opacity-70' : 'bg-primary/5 border-primary/20 shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          notif.type === 'success' ? 'text-secondary' : notif.type === 'error' ? 'text-red-500' : 'text-primary'
                        }`}>
                          {notif.title}
                        </span>
                        <span className="text-[8px] text-on-surface-variant font-medium whitespace-nowrap">{notif.timestamp}</span>
                      </div>
                      <p className="text-[9px] text-on-surface-variant/90 leading-snug">{notif.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 relative">
            <Image 
              alt="AI Operator Avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB464UF0oP9M6VCaumXyK_rgUHsUDpOCjeAgoguI-Rlt5CKYeTZ0F6eHOtMcQ0JuaR1HMyGCIr9scJgUhNZdBaB1Exzp4ptYdcCiPw1noM3xoIPm9ZlP-cln9agLwz0FXIyEeqUf4xclz30uv4pA9TFgw_UEG3XN2TMkhz0gpI6qrsGTjEodiDjDT8cyTN_mBlFrCsjxenN6eE1brrzk6mnan4lvs6_280DpEVCYMwCDlQtNY6SRLwrDzrmASPOSqL04s7hQ0p7dA"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden xl:flex flex-col items-start leading-none">
            <span className="text-[10px] font-bold text-on-surface">{user?.fullName || 'Dr. Helen Vance'}</span>
            <span className="text-[8px] text-primary/80 font-bold uppercase tracking-wider mt-0.5">{user?.role || 'manufacturer'}</span>
          </div>
        </div>


    </div>
    </header>
  );
}
