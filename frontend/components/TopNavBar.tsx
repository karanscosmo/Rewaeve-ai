'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TopNavBar() {
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
      </nav>

      <div className="flex items-center gap-6">
        <button className="text-primary hover:scale-105 transition-all p-1.5 rounded-full hover:bg-primary-container/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-xl">account_tree</span>
        </button>
        <button className="text-primary hover:scale-105 transition-all p-1.5 rounded-full hover:bg-primary-container/20 flex items-center justify-center relative">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary-container rounded-full animate-pulse border-2 border-surface" />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/30 relative">
          <Image 
            alt="AI Operator Avatar" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB464UF0oP9M6VCaumXyK_rgUHsUDpOCjeAgoguI-Rlt5CKYeTZ0F6eHOtMcQ0JuaR1HMyGCIr9scJgUhNZdBaB1Exzp4ptYdcCiPw1noM3xoIPm9ZlP-cln9agLwz0FXIyEeqUf4xclz30uv4pA9TFgw_UEG3XN2TMkhz0gpI6qrsGTjEodiDjDT8cyTN_mBlFrCsjxenN6eE1brrzk6mnan4lvs6_280DpEVCYMwCDlQtNY6SRLwrDzrmASPOSqL04s7hQ0p7dA"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
