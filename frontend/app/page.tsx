'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Ambient Radial Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-radial-gradient from-[rgba(123,255,217,0.15)] to-transparent opacity-70 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-radial-gradient from-[rgba(0,108,82,0.06)] to-transparent opacity-50 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2 0-3 1-4 2H10c-1-1-2-2-4-2H0v2h4c1 1 2 2 4 2h44c2 0 3-1 4-2h4v-2h-6z\' fill=\'%23006c52\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')]" />
      </div>

      {/* Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 h-16 max-w-7xl mx-auto rounded-full mt-4 bg-surface/30 backdrop-blur-[24px] border border-outline-variant/20 shadow-[0_0_20px_rgba(76,242,194,0.15)]">
        <div className="flex items-center">
          <span className="font-display-hero text-headline-md tracking-tighter text-primary font-bold">
            ReWeave AI
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="font-headline-md text-[15px] text-primary font-bold border-b-2 border-primary pb-1 transition-all">
            Ecosystem
          </Link>
          <Link href="/dashboard" className="font-headline-md text-[15px] text-on-surface-variant font-medium hover:text-primary hover:scale-105 transition-all pb-1">
            Flows
          </Link>
          <Link href="/dashboard/water-twin" className="font-headline-md text-[15px] text-on-surface-variant font-medium hover:text-primary hover:scale-105 transition-all pb-1">
            Water Twin
          </Link>
          <Link href="/dashboard/exchange" className="font-headline-md text-[15px] text-on-surface-variant font-medium hover:text-primary hover:scale-105 transition-all pb-1">
            Exchange
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-primary hover:scale-105 hover:text-secondary transition-all flex items-center justify-center p-2 rounded-full hover:bg-primary-container/20">
            <span className="material-symbols-outlined">account_tree</span>
          </Link>
          <Link href="/login" className="flex items-center justify-center relative p-2 rounded-full hover:bg-primary-container/20 text-primary">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary-container rounded-full animate-pulse"></span>
          </Link>
          <Link href="/login">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/50 relative cursor-pointer hover:scale-105 transition-transform">
              <Image 
                alt="AI Operator Avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy3AwXyrZRQjjgCBZu0nEzQ5WcclcXlsKM1k_f8-nd-XdSDE_mSIEPsTpcsAo0z6k78KpVp2W7uAIHjhldjNGTesQK1S5jhscG_cSd4uPr_ufwkyTsw6ygRofTT8g1uFCSq0VSesINsSTEk_zIJKWuFzdW1JBhw-vP2PekDG3C6Pcj6mmlZf3tK2TQJeecupWPJWyWhOO-vUG3GucU8Sf2qOXEaHXlwkQkC1uXRCiIx1cghHv2jiadjb9KXveKGZkieacZfnuxCg"
                fill
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen relative z-10">
        
        {/* Hero Section */}
        <div className="w-full max-w-5xl flex flex-col items-center text-center space-y-8 relative z-20">
          
          {/* Circular Holographic Orb Component */}
          <div className="w-64 h-64 md:w-96 md:h-96 relative mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary-container/25 rounded-full blur-[70px] animate-pulse" />
            <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_60px_rgba(123,255,217,0.35)] border border-outline-variant/30 bg-surface-container-low/50 backdrop-blur-md relative z-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow pointer-events-none" />
              <div className="relative w-[90%] h-[90%] rounded-full overflow-hidden">
                <Image 
                  alt="Environmental Intelligence Sphere" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdddOx3sJfhKT51mx2K0OU1gHJevnxIxMHPO0IGmg9r8YQVOZUP7h3WRcOkcY3Mq2knnyuvqILSV1uKShSie8XExzLQXBtJx084ELjoGb7O5EVeJvBo6JxIb9JU1-16SIVnfAhnG3HgY4yAh4pR135xq9ObXRQRmP-ii3vfiGqsPCea848XjYk0Ro1OfqaTJQIopXifvw9B2ldwdCilvXaRJPpEMgZUDgczMcpvHAmNopnZoLyZK0DIub66MWwsNaZAoLHuPeyDA"
                  fill
                  className="object-cover mix-blend-luminosity opacity-80 scale-105"
                  priority
                />
              </div>
            </div>
          </div>

          <h1 className="font-display-hero text-display-hero text-primary max-w-4xl tracking-tight leading-tight font-extrabold text-5xl md:text-7xl">
            Transform Industrial Waste Into <br /> 
            <span className="text-tertiary font-light">Intelligent Economic Assets</span>
          </h1>
          
          <p className="font-body-large text-body-large text-on-surface-variant max-w-2xl leading-relaxed text-lg md:text-xl">
            AI-powered industrial recovery infrastructure for waste intelligence, recovery optimization, circular supply chains, and sustainability automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <Link href="/dashboard">
              <button className="group relative px-8 py-4 bg-surface/50 backdrop-blur-glass border border-tertiary-container rounded-full overflow-hidden shadow-[0_0_20px_rgba(123,255,217,0.1)] hover:shadow-[0_0_35px_rgba(123,255,217,0.35)] hover:border-primary transition-all duration-300 transform hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-tertiary-container/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-body-large text-body-large text-on-background font-semibold relative z-10 flex items-center gap-2">
                  Enter Circular Intelligence Workspace
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-4 bg-transparent border border-outline-variant hover:border-primary rounded-full text-on-surface-variant hover:text-primary font-body-large text-body-large font-medium hover:bg-surface-container-low transition-all duration-300 transform hover:scale-[1.01]">
                Launch AI Recovery Simulation
              </button>
            </Link>
          </div>
        </div>

        {/* Circular Intelligence Network Section */}
        <div className="w-full max-w-7xl mt-44 relative">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-secondary mb-3 font-semibold">
              Circular Intelligence Network
            </h2>
            <p className="font-body-main text-on-surface-variant text-base md:text-lg">
              Real-time autonomous flows from facility to marketplace.
            </p>
          </div>

          {/* Spatial Bento Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 relative min-h-[400px]">
            {/* Background connection path */}
            <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-primary-container/30 to-transparent -translate-y-1/2 z-0 hidden lg:block" />

            {/* Node 1: Factories */}
            <div className="relative z-10 bg-surface/60 backdrop-blur-[24px] border border-outline-variant/30 p-8 rounded-2xl shadow-xl w-80 transform lg:-translate-y-8 hover:scale-[1.03] transition-all duration-300 hover:border-primary">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mb-4 border border-outline-variant/20 shadow-inner">
                <span className="material-symbols-outlined text-primary text-2xl">factory</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-background mb-2 font-semibold">Factories</h3>
              <p className="font-metadata text-sm text-on-surface-variant leading-relaxed">
                Emission & byproduct telemetry gathering with instant data stream.
              </p>
            </div>

            {/* Node 2: Circular AI Core */}
            <div className="relative z-10 bg-surface/70 backdrop-blur-[24px] border border-primary-container/60 p-8 rounded-3xl shadow-2xl w-80 lg:scale-105 border-2 hover:scale-[1.08] transition-all duration-300 shadow-[0_0_40px_rgba(76,242,194,0.15)]">
              <div className="w-14 h-14 bg-primary-container/20 rounded-full flex items-center justify-center mb-5 border border-primary-container/40 shadow-md">
                <span className="material-symbols-outlined text-primary text-3xl animate-pulse">spa</span>
              </div>
              <h3 className="font-headline-md text-2xl text-primary mb-2 font-bold flex items-center gap-2">
                ReWeave OS
              </h3>
              <p className="font-metadata text-sm text-on-surface-variant leading-relaxed">
                Generates product concepts, controls digital twins, and matches market needs automatically.
              </p>
            </div>

            {/* Node 3: Waste Stream */}
            <div className="relative z-10 bg-surface/60 backdrop-blur-[24px] border border-outline-variant/30 p-8 rounded-2xl shadow-xl w-80 transform lg:translate-y-8 hover:scale-[1.03] transition-all duration-300 hover:border-secondary">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mb-4 border border-outline-variant/20 shadow-inner">
                <span className="material-symbols-outlined text-secondary text-2xl">recycling</span>
              </div>
              <h3 className="font-headline-md text-xl text-on-background mb-2 font-semibold">Ecosystem</h3>
              <p className="font-metadata text-sm text-on-surface-variant leading-relaxed">
                Volume matching and automated marketplace routing of raw material feedstocks.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info banner */}
        <div className="w-full max-w-5xl mt-36 border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-on-surface-variant/70 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
            <span>Enterprise Network State: Nominal</span>
          </div>
          <div>
            <span>© 2026 ReWeave AI Corporation. All Rights Reserved.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
