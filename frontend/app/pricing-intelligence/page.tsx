'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingIntelligence() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NET'>('UPI');

  const handleSubscribe = (plan: any) => {
    setSelectedPlan(plan);
    setPaymentStatus('idle');
  };

  const processPayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2500);
  };

  const closePaymentModal = () => {
    setSelectedPlan(null);
    setPaymentStatus('idle');
  };

  const plans = [
    {
      id: 'starter',
      name: 'Manufacturer Starter',
      target: 'Small textile factories',
      price: '₹1,499',
      features: [
        'CSV uploads', 'Digital Water Twin', 'AI scoring', '5 AI product generations/month', 
        'Circular Flow Score', 'Basic marketplace access', 'Basic ESG reports', 'Hindi/Tamil/Gujarati support'
      ],
      limitations: ['Single factory', 'Limited analytics', 'Limited AI generations'],
      theme: 'border-primary/30 bg-surface/40',
      buttonTheme: 'bg-primary text-white hover:bg-secondary',
      glow: 'shadow-[0_0_30px_rgba(76,242,194,0.15)]'
    },
    {
      id: 'pro',
      name: 'Industrial Pro',
      target: 'Mid-size industries',
      price: '₹3,999',
      features: [
        'Unlimited uploads', 'AI Recovery Decision Engine', '50 AI product generations/month', 
        'Advanced ESG analytics', 'Buyer/recycler matchmaking', 'Circular Commodity Exchange access',
        'NGO assistance access', 'Recovery simulation sandbox', 'Multilingual AI Copilot'
      ],
      limitations: [],
      theme: 'border-primary bg-primary/5',
      buttonTheme: 'bg-primary text-white hover:bg-secondary holographic-glow',
      glow: 'shadow-[0_0_40px_rgba(76,242,194,0.3)]',
      badge: 'MOST POPULAR'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Circular OS',
      target: 'Large enterprises',
      price: '₹9,999',
      features: [
        'Unlimited everything', 'Multi-factory intelligence', 'AI Blueprint Generator', 
        'Advanced commodity intelligence', 'Custom AI workflows', 'Live marketplace analytics',
        'AI stock exchange intelligence', 'Government/NGO integrations', 'Dedicated AI sustainability consultant',
        'Private APIs', 'Enterprise SLA'
      ],
      limitations: [],
      theme: 'border-amber-400/50 bg-gradient-to-b from-zinc-900 to-zinc-950 text-white',
      buttonTheme: 'bg-amber-400 text-zinc-900 hover:bg-amber-300 font-extrabold',
      glow: 'shadow-[0_0_50px_rgba(251,191,36,0.2)]'
    },
    {
      id: 'buyer',
      name: 'Buyer Network Access',
      target: 'Construction companies / buyers',
      price: '₹2,999',
      features: [
        'Access recycled products', 'Procurement analytics', 'Sustainability metrics', 
        'Supplier comparison', 'Industrial bidding', 'ESG procurement reports'
      ],
      limitations: [],
      theme: 'border-[#0284c7]/40 bg-[#0284c7]/5',
      buttonTheme: 'bg-[#0284c7] text-white hover:bg-[#0369a1]',
      glow: 'shadow-[0_0_30px_rgba(2,132,199,0.15)]'
    },
    {
      id: 'ngo',
      name: 'NGO / Government Access',
      target: 'Regulators & Sustainability NGOs',
      price: 'FREE',
      subtitle: 'Subsidized Access',
      features: [
        'Sustainability monitoring', 'Workforce collaboration', 'Implementation guidance', 
        'Industry partnership management'
      ],
      limitations: [],
      theme: 'border-secondary/40 bg-secondary/5',
      buttonTheme: 'border border-secondary text-secondary hover:bg-secondary hover:text-white',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]'
    }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-x-hidden font-body-main selection:bg-primary/30 selection:text-primary">
      
      {/* Ecosystem Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-bright to-background opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(#4cf2c2_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
        
        {/* Floating holographic orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[150px] mix-blend-screen animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/5 blur-[100px] mix-blend-screen" />
      </div>

      {/* Top Nav (Minimal) */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-6">
        <Link href="/" className="font-display-hero text-2xl tracking-tighter text-primary font-bold">
          ReWeave AI
        </Link>
        <Link href="/login" className="px-5 py-2 rounded-full border border-outline-variant/30 text-xs font-bold uppercase tracking-widest text-on-surface hover:bg-surface-dim transition-all">
          Secure Login
        </Link>
      </nav>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-24">
        
        {/* SECTION 1 - HERO */}
        <section className="text-center flex flex-col items-center justify-center pt-8 pb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl flex justify-between pointer-events-none opacity-20">
            <span className="material-symbols-outlined text-9xl text-primary animate-[spin_20s_linear_infinite]">autorenew</span>
            <span className="material-symbols-outlined text-9xl text-secondary animate-[spin_15s_linear_infinite_reverse]">eco</span>
          </div>

          <span className="font-label-caps text-[10px] text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-sm mb-6 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Enterprise Circular Intelligence Subscription System
          </span>
          <h1 className="font-display-hero text-5xl md:text-7xl font-extrabold text-on-background tracking-tighter max-w-4xl leading-tight">
            Flexible Circular Intelligence Pricing For <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Every Industrial Scale</span>
          </h1>
          <p className="font-headline-md text-base md:text-lg text-on-surface-variant max-w-3xl mt-6 leading-relaxed">
            From textile factories to enterprise industrial ecosystems — unlock AI-powered recovery intelligence, circular marketplaces, ESG analytics, and sustainable manufacturing workflows.
          </p>

          <div className="flex gap-4 mt-10">
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-2xl font-black text-primary">₹18.5Cr+</span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mt-1">Value Recovered</span>
            </div>
            <div className="w-px h-12 bg-outline-variant/30 mx-4" />
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-2xl font-black text-secondary">324k</span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mt-1">Tons CO2 Avoided</span>
            </div>
            <div className="w-px h-12 bg-outline-variant/30 mx-4" />
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-2xl font-black text-cyan-500">9.4M</span>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mt-1">Water Gallons Recycled</span>
            </div>
          </div>
        </section>

        {/* SECTION 2 - ROLE-BASED PRICING */}
        <section className="relative">
          <div className="text-center mb-12">
            <h2 className="font-display-hero text-3xl font-extrabold">Role-Based Intelligence Plans</h2>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">Select the protocol optimized for your position in the circular supply chain.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {plans.slice(0, 3).map((plan) => (
              <div key={plan.id} className={`rounded-3xl p-8 border backdrop-blur-glass flex flex-col relative transition-transform hover:-translate-y-2 duration-300 ${plan.theme} ${plan.glow}`}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-background font-black text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                )}
                
                <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${plan.id === 'enterprise' ? 'text-amber-400' : 'text-primary'}`}>{plan.target}</span>
                <h3 className={`font-display-hero text-2xl font-extrabold ${plan.id === 'enterprise' ? 'text-white' : 'text-on-background'}`}>{plan.name}</h3>
                
                <div className="mt-6 mb-8">
                  <span className={`font-display-hero text-5xl font-black ${plan.id === 'enterprise' ? 'text-amber-400' : 'text-on-background'}`}>{plan.price}</span>
                  <span className={`text-sm font-medium ${plan.id === 'enterprise' ? 'text-zinc-400' : 'text-on-surface-variant'}`}> /month</span>
                </div>

                <button 
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all mb-8 ${plan.buttonTheme}`}
                >
                  Activate {plan.name}
                </button>

                <div className="flex-1 flex flex-col gap-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider border-b pb-2 ${plan.id === 'enterprise' ? 'border-zinc-800 text-zinc-400' : 'border-outline-variant/20 text-on-surface-variant'}`}>Platform Features</span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className={`material-symbols-outlined text-[14px] font-bold mt-0.5 ${plan.id === 'enterprise' ? 'text-amber-400' : 'text-primary'}`}>check_circle</span>
                      <span className={`text-xs font-medium leading-relaxed ${plan.id === 'enterprise' ? 'text-zinc-200' : 'text-on-surface'}`}>{feat}</span>
                    </div>
                  ))}

                  {plan.limitations.length > 0 && (
                    <>
                      <span className={`text-[10px] font-bold uppercase tracking-wider border-b pb-2 mt-4 ${plan.id === 'enterprise' ? 'border-zinc-800 text-zinc-400' : 'border-outline-variant/20 text-on-surface-variant'}`}>Limitations</span>
                      {plan.limitations.map((lim, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 opacity-70">
                          <span className="material-symbols-outlined text-[14px] font-bold mt-0.5 text-red-400">remove</span>
                          <span className={`text-xs font-medium leading-relaxed ${plan.id === 'enterprise' ? 'text-zinc-200' : 'text-on-surface'}`}>{lim}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {plans.slice(3, 5).map((plan) => (
              <div key={plan.id} className={`rounded-3xl p-8 border backdrop-blur-glass flex flex-col md:flex-row gap-8 items-center transition-transform hover:-translate-y-1 duration-300 ${plan.theme} ${plan.glow}`}>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1 text-on-surface-variant block">{plan.target}</span>
                  <h3 className="font-display-hero text-2xl font-extrabold text-on-background">{plan.name}</h3>
                  <div className="mt-3 mb-6">
                    <span className="font-display-hero text-4xl font-black text-on-background">{plan.price}</span>
                    <span className="text-sm font-medium text-on-surface-variant">{plan.subtitle ? ` (${plan.subtitle})` : ' /month'}</span>
                  </div>
                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${plan.buttonTheme}`}
                  >
                    Select Plan
                  </button>
                </div>
                <div className="flex-1 w-full border-t md:border-t-0 md:border-l border-outline-variant/20 pt-6 md:pt-0 md:pl-6 flex flex-col gap-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider mb-1 text-on-surface-variant">Included Access</span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className={`material-symbols-outlined text-[14px] font-bold mt-0.5 ${plan.id === 'buyer' ? 'text-[#0284c7]' : 'text-secondary'}`}>check_circle</span>
                      <span className="text-xs font-medium text-on-surface leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 - MARKETPLACE COMMISSION LOGIC */}
        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-outline-variant/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          
          <div className="flex-1 relative z-10">
            <span className="font-label-caps text-[10px] text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest mb-4 inline-block">Sustainable Revenue</span>
            <h2 className="font-display-hero text-3xl font-extrabold text-on-background mb-4">Transparent Marketplace Commission</h2>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed max-w-lg mb-6">
              ReWeave AI's business model is built to align with industrial success. We earn primarily through successful circular matchmaking and premium intelligence, making it realistic and startup-ready for the Indian market.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/20 flex items-center justify-center font-bold text-primary">2%</div>
                <div>
                  <h4 className="text-sm font-bold text-on-background">Industrial Matchmaking Fee</h4>
                  <p className="text-[10px] text-on-surface-variant font-medium">On successful industrial byproduct recovery deals.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface border border-outline-variant/20 flex items-center justify-center font-bold text-secondary">1%</div>
                <div>
                  <h4 className="text-sm font-bold text-on-background">Subsidized NGO Contracts</h4>
                  <p className="text-[10px] text-on-surface-variant font-medium">Reduced rate for NGO-supported sustainability contracts.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex-1 w-full max-w-sm relative z-10">
            <div className="bg-surface/80 backdrop-blur-md border border-outline-variant/20 p-6 rounded-2xl shadow-lg relative">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4 border-b border-outline-variant/10 pb-2">Deal Execution Simulation</h4>
              <div className="space-y-3 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-on-surface">150T Cellulose Fiber Value</span>
                  <span className="font-bold text-on-background">₹22,50,000</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Carbon Offset Subsidy Applied</span>
                  <span className="font-bold">- ₹1,20,000</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span className="text-on-surface">Net Transaction Value</span>
                  <span className="font-bold text-on-background">₹21,30,000</span>
                </div>
                <div className="flex justify-between text-primary font-bold text-xs pt-1">
                  <span>ReWeave Commission (2%)</span>
                  <span>₹42,600</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 & 6 - AI USAGE & COMMODITY EXCHANGE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AI Usage Meter */}
          <div className="glass-panel p-8 rounded-3xl border border-outline-variant/20 flex flex-col justify-between hover-lift">
            <div>
              <h2 className="font-display-hero text-2xl font-extrabold text-on-background">AI Circular Intelligence Usage</h2>
              <p className="text-xs text-on-surface-variant mt-2 font-medium mb-8">Track your neural generation credits and analytics bandwidth.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-background">Product Generation Matrix</span>
                    <span className="text-primary">42 / 50 Credits</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden border border-outline-variant/10">
                    <div className="h-full bg-primary rounded-full relative overflow-hidden" style={{ width: '84%' }}>
                      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-background">ESG Compliance Reports</span>
                    <span className="text-secondary">8 / Unlimited</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden border border-outline-variant/10">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-on-background">Marketplace Analytics Bandwidth</span>
                    <span className="text-[#0284c7]">1.2GB / 5GB</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden border border-outline-variant/10">
                    <div className="h-full bg-[#0284c7] rounded-full" style={{ width: '24%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commodity Intelligence Access */}
          <div className="glass-panel p-8 rounded-3xl border border-outline-variant/20 relative overflow-hidden hover-lift">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4cf2c2_1px,transparent_1px),linear-gradient(to_bottom,#4cf2c2_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="font-label-caps text-[9px] bg-surface border border-outline-variant/20 px-2.5 py-1 rounded-md font-bold uppercase tracking-widest mb-3 inline-block shadow-sm">Included in Pro & Enterprise</span>
                <h2 className="font-display-hero text-2xl font-extrabold text-on-background">Industrial Recovery Intelligence Marketplace</h2>
                <p className="text-xs text-on-surface-variant mt-2 font-medium mb-6">
                  Live circular commodity pricing, regional material demand analytics, and sustainability value indexing. Not a stock market—a true recovery intelligence grid.
                </p>
              </div>

              {/* Ticker simulation */}
              <div className="bg-surface/60 border border-outline-variant/20 rounded-xl p-4 overflow-hidden relative">
                <div className="flex gap-6 animate-[scroll_15s_linear_infinite] whitespace-nowrap">
                  <div className="inline-flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Textile Slag</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-on-background">₹14,500/T</span>
                      <span className="text-[10px] text-primary flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 2.4%</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-outline-variant/30" />
                  <div className="inline-flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Fly Ash Agg</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-on-background">₹3,200/T</span>
                      <span className="text-[10px] text-primary flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_upward</span> 8.1%</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-outline-variant/30" />
                  <div className="inline-flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">PET Flakes</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-on-background">₹42,000/T</span>
                      <span className="text-[10px] text-red-400 flex items-center"><span className="material-symbols-outlined text-[12px]">arrow_downward</span> 1.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 - FEATURE COMPARISON MATRIX */}
        <section>
          <div className="text-center mb-10">
            <h2 className="font-display-hero text-3xl font-extrabold text-on-background">Ecosystem Capability Matrix</h2>
            <p className="text-sm text-on-surface-variant mt-2 font-medium">Compare the precise operational limits of each intelligence node.</p>
          </div>

          <div className="w-full overflow-x-auto glass-panel rounded-2xl border border-outline-variant/20 shadow-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface/50">
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant w-1/3">Core Infrastructure Features</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-center border-l border-outline-variant/10 text-on-background">Starter</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-center border-l border-outline-variant/10 text-primary">Pro</th>
                  <th className="p-4 font-bold text-xs uppercase tracking-wider text-center border-l border-outline-variant/10 text-amber-500 bg-amber-500/5">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[
                  { name: 'AI Product Innovation', s: '5/mo', p: '50/mo', e: 'Unlimited' },
                  { name: 'Circular Marketplace', s: 'Basic', p: 'Premium Match', e: 'Live Analytics API' },
                  { name: 'ESG Reports (SBTi)', s: 'Standard PDF', p: 'Dynamic Ledger', e: 'Custom Live Dashboards' },
                  { name: 'NGO Collaboration', s: '-', p: 'Standard Access', e: 'Dedicated Manager' },
                  { name: 'Recovery Simulation', s: 'Basic 2D', p: 'Full 3D Sandbox', e: 'Multi-Factory Physics' },
                  { name: 'Commodity Exchange', s: '-', p: 'Live Prices', e: 'Predictive Analytics' },
                  { name: 'AI Blueprint Generation', s: 'Templates', p: 'Customizable', e: 'Proprietary IP Generation' },
                  { name: 'AI Copilot Chatbot', s: '-', p: 'Multilingual Support', e: 'Custom Trained Model' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-dim transition-colors group">
                    <td className="p-4 text-on-background font-bold text-xs">{row.name}</td>
                    <td className="p-4 text-center border-l border-outline-variant/10 text-on-surface-variant text-xs">{row.s === '-' ? <span className="text-outline-variant">—</span> : row.s}</td>
                    <td className="p-4 text-center border-l border-outline-variant/10 font-bold text-primary/90 text-xs">{row.p}</td>
                    <td className="p-4 text-center border-l border-outline-variant/10 font-bold text-amber-500 bg-amber-500/[0.02] text-xs">{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 7 - NGO/GOV SUPPORT BLOCK */}
        <section className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-3xl p-10 border border-secondary/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute right-[-10%] top-[-20%] w-96 h-96 bg-secondary/20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="flex-1 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface rounded-full border border-secondary/30 shadow-sm">
              <span className="material-symbols-outlined text-sm text-secondary">handshake</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Public Sector Partnerships</span>
            </div>
            <h2 className="font-display-hero text-3xl font-extrabold text-on-background">State Subsidies & NGO Networks</h2>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed max-w-lg">
              ReWeave provides heavily subsidized and free access to regulatory bodies and environmental NGOs to foster a unified circular workforce ecosystem, streamline green manufacturing assistance, and audit sustainability compliance.
            </p>
            <button className="px-6 py-3 bg-surface border border-outline-variant/30 text-on-background font-bold text-xs uppercase tracking-wider rounded-xl hover:border-secondary transition-colors shadow-sm">
              Contact Public Relations
            </button>
          </div>

          <div className="flex-1 relative z-10 w-full max-w-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-secondary/20 text-center">
                <span className="material-symbols-outlined text-3xl text-secondary mb-2">groups</span>
                <span className="block text-[10px] font-bold uppercase text-on-background">Workforce Programs</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-secondary/20 text-center">
                <span className="material-symbols-outlined text-3xl text-primary mb-2">assured_workload</span>
                <span className="block text-[10px] font-bold uppercase text-on-background">Subsidy Guidance</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-secondary/20 text-center">
                <span className="material-symbols-outlined text-3xl text-cyan-500 mb-2">analytics</span>
                <span className="block text-[10px] font-bold uppercase text-on-background">Compliance Audits</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-secondary/20 text-center">
                <span className="material-symbols-outlined text-3xl text-[#0284c7] mb-2">share</span>
                <span className="block text-[10px] font-bold uppercase text-on-background">Network Maps</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* SECTION 8 - PAYMENT MODAL PREVIEW */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={closePaymentModal} />
          
          <div className={`relative z-10 w-full max-w-xl bg-surface border rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col ${selectedPlan.id === 'enterprise' ? 'border-amber-500/50' : 'border-primary/30'}`}>
            
            {/* Modal Header */}
            <div className={`p-6 border-b flex justify-between items-center ${selectedPlan.id === 'enterprise' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-surface-container-low border-outline-variant/15'}`}>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedPlan.id === 'enterprise' ? 'text-amber-400' : 'text-primary'}`}>Checkout Verification</span>
                <h3 className={`font-display-hero text-xl font-bold mt-1 ${selectedPlan.id === 'enterprise' ? 'text-white' : 'text-on-background'}`}>{selectedPlan.name}</h3>
              </div>
              <button onClick={closePaymentModal} className="text-on-surface-variant hover:text-on-surface p-2">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6">
              
              {paymentStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-5xl text-primary animate-[pulse_1s_ease-out]">check_circle</span>
                  </div>
                  <h3 className="font-display-hero text-3xl font-extrabold text-on-background">Circular Intelligence Activated</h3>
                  <p className="text-sm text-on-surface-variant font-medium max-w-sm">
                    Your {selectedPlan.name} node has been successfully provisioned. Welcome to the sustainable industrial economy.
                  </p>
                  <Link href="/dashboard">
                    <button className="mt-4 px-8 py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-secondary transition-all">
                      Enter Neural Dashboard
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  {/* Order Summary */}
                  <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-on-surface">
                      <span>{selectedPlan.name} Subscription (Monthly)</span>
                      <span className="font-bold">{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>GST (18%)</span>
                      <span>+ {(parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) * 0.18).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace('.00', '')}</span>
                    </div>
                    <div className="w-full h-px bg-outline-variant/20 my-2" />
                    <div className="flex justify-between items-center font-bold text-sm text-on-background">
                      <span>Total Billed Today</span>
                      <span>{(parseInt(selectedPlan.price.replace(/[^0-9]/g, '')) * 1.18).toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace('.00', '')}</span>
                    </div>
                    <div className="text-[9px] text-on-surface-variant/70 text-right mt-1 font-sans">
                      Next billing cycle: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold uppercase text-on-surface-variant tracking-wider">Select Payment Gateway</span>
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => setPaymentMethod('UPI')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'UPI' ? 'bg-primary/10 border-primary shadow-sm text-primary' : 'bg-surface border-outline-variant/20 hover:border-outline-variant/40 text-on-surface-variant'}`}
                      >
                        <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                        <span className="text-[10px] font-bold uppercase">UPI</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('CARD')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'CARD' ? 'bg-primary/10 border-primary shadow-sm text-primary' : 'bg-surface border-outline-variant/20 hover:border-outline-variant/40 text-on-surface-variant'}`}
                      >
                        <span className="material-symbols-outlined text-2xl">credit_card</span>
                        <span className="text-[10px] font-bold uppercase">Card</span>
                      </button>
                      <button 
                        onClick={() => setPaymentMethod('NET')}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${paymentMethod === 'NET' ? 'bg-primary/10 border-primary shadow-sm text-primary' : 'bg-surface border-outline-variant/20 hover:border-outline-variant/40 text-on-surface-variant'}`}
                      >
                        <span className="material-symbols-outlined text-2xl">account_balance</span>
                        <span className="text-[10px] font-bold uppercase">Net Banking</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Action */}
                  <div className="pt-4 border-t border-outline-variant/15">
                    <button 
                      onClick={processPayment}
                      disabled={paymentStatus === 'processing'}
                      className={`w-full py-4 flex justify-center items-center gap-3 font-label-caps text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md ${
                        selectedPlan.id === 'enterprise' ? 'bg-amber-400 text-zinc-900 hover:bg-amber-300' : 'bg-primary text-white hover:bg-secondary hover:holographic-glow'
                      } ${paymentStatus === 'processing' ? 'opacity-70 cursor-wait' : ''}`}
                    >
                      {paymentStatus === 'processing' ? (
                        <>
                          <span className="material-symbols-outlined animate-spin">refresh</span>
                          Establishing Secure Tunnel...
                        </>
                      ) : (
                        `Pay Securely`
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-3 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">
                      <span className="material-symbols-outlined text-[12px]">lock</span>
                      256-bit AES Bank-Grade Encryption
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
