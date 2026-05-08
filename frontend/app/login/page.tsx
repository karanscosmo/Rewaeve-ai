'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCircular, UserRole } from '@/lib/CircularContext';

export default function AuthPortal() {
  const router = useRouter();
  const { user, loginUser, registerUser, onboardOrganization } = useCircular();

  // Onboarding Wizard Steps
  // 'login' | 'register' | 'forgot' | 'role_select' | 'org_setup'
  const [step, setStep] = useState<'login' | 'register' | 'forgot' | 'role_select' | 'org_setup'>('login');

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('manufacturer');
  const [industryType, setIndustryType] = useState('Textiles & Apparel');
  const [facilitiesCount, setFacilitiesCount] = useState(1);
  const [facilityLocation, setFacilityLocation] = useState('Sector 4, Industrial Development Zone');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email, selectedRole);
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      registerUser(fullName, email, organizationName, selectedRole);
      setLoading(false);
      setStep('role_select');
    }, 1000);
  };

  const handleRoleConfirm = () => {
    setStep('org_setup');
  };

  const handleOrgSetup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onboardOrganization({
        industryType,
        facilitiesCount,
        location: facilityLocation
      });
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('A secure biometric reset vector has been sent to your terminal network.');
    }, 1000);
  };

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-hidden flex items-center justify-center font-body-main px-4 py-12">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-bright to-surface-container-low">
        <div className="absolute inset-0 bg-holographic-gradient opacity-80 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23bccac2\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        
        {/* Floating elements */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-primary-container/20 to-secondary-container/20 blur-3xl mix-blend-multiply opacity-60 pointer-events-none" />
      </div>

      <main className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row gap-12 items-center justify-center">
        {/* Cinematic Brand Pitch */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <span className="font-label-caps text-xs text-primary bg-primary-container/25 border border-primary/30 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest">
            Circular Operating System
          </span>
          <h1 className="font-display-hero text-6xl font-extrabold text-primary tracking-tighter leading-tight">
            ReWeave AI
          </h1>
          <p className="font-headline-md text-xl text-on-surface-variant max-w-md font-medium leading-relaxed">
            Unifying Manufacturers, Recyclers, Buyers, and Treatment Facilities in a single spatial circular network.
          </p>
          <div className="inline-flex items-center gap-2 bg-surface/40 backdrop-blur-glass border border-outline-variant/25 rounded-full px-4 py-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse"></span>
            <span className="font-metadata text-xs text-on-surface-variant font-medium">Core Authentication Decryption Active</span>
          </div>
        </div>

        {/* Dynamic Card Container */}
        <div className="w-full lg:w-7/12 bg-surface/50 backdrop-blur-glass border border-outline-variant/20 rounded-2xl p-8 lg:p-12 shadow-[0_0_50px_rgba(76,242,194,0.08)] relative overflow-hidden transition-all duration-500">
          
          {/* STEP 1: LOGIN */}
          {step === 'login' && (
            <div className="space-y-6">
              <div className="flex gap-6 border-b border-outline-variant/25 pb-4">
                <button className="font-headline-md text-xl text-primary font-bold border-b-2 border-primary pb-1 -mb-[18px]">
                  Secure Login
                </button>
                <button onClick={() => setStep('register')} className="font-headline-md text-xl text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Create Account
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Facility Access Key (Email)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">vpn_key</span>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@facility.com"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-on-background input-glow transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Access Signature</label>
                    <button type="button" onClick={() => setStep('forgot')} className="text-xs text-primary hover:underline font-semibold">Forgot Signature?</button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">fingerprint</span>
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 pl-12 pr-4 text-on-background input-glow transition-all"
                    />
                  </div>
                </div>

                {/* Role selection for quick testing */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Target Node Role</label>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background focus:border-primary focus:outline-none transition-all"
                  >
                    <option value="manufacturer">Manufacturer Node (Waste Upload / ROI / ESG)</option>
                    <option value="recycler">Recycler Node (Bid / Sourcing / Segregation)</option>
                    <option value="buyer">Buyer Node (Product Sourcing / Market Intel)</option>
                    <option value="treatment">Treatment Provider Node (Tenders / Contracts)</option>
                    <option value="sustainability">Sustainability Officer Node (Global Compliance)</option>
                    <option value="admin">Admin Node (System Settings)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all"
                >
                  {loading ? 'Securing Portal Tunnel...' : 'Decrypt Access Signature'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: REGISTER */}
          {step === 'register' && (
            <div className="space-y-6">
              <div className="flex gap-6 border-b border-outline-variant/25 pb-4">
                <button onClick={() => setStep('login')} className="font-headline-md text-xl text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Secure Login
                </button>
                <button className="font-headline-md text-xl text-primary font-bold border-b-2 border-primary pb-1 -mb-[18px]">
                  Create Account
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Operator Name</label>
                    <input 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Helen Vance"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background input-glow transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Organization Name</label>
                    <input 
                      type="text" 
                      required 
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Vance Textile Mills"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background input-glow transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Ecosystem Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@facility.com"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background input-glow transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Desired Platform Role</label>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background focus:outline-none transition-all"
                  >
                    <option value="manufacturer">Manufacturer Node (Waste Producer)</option>
                    <option value="recycler">Recycler Node (Waste Processor)</option>
                    <option value="buyer">Buyer Node (Circular Product Procurer)</option>
                    <option value="treatment">Treatment Node (Neutralization Facility)</option>
                    <option value="sustainability">Sustainability Officer Node (Compliance Audit)</option>
                    <option value="admin">Core System Admin (Full Protocol Access)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
                >
                  {loading ? 'Creating Node Signature...' : 'Register Corporate Terminal'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: FORGOT PASSWORD */}
          {step === 'forgot' && (
            <div className="space-y-6">
              <h2 className="font-headline-lg text-2xl text-primary font-bold">Biometric Recovery</h2>
              <p className="text-sm text-on-surface-variant">Enter your facility terminal address to broadcast a secure identity verification vector.</p>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input 
                  type="email" 
                  required 
                  placeholder="operator@facility.com"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background input-glow transition-all"
                />

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
                >
                  {loading ? 'Broadcasting Recovery Seal...' : 'Send Recovery Vector'}
                </button>

                {message && (
                  <p className="text-xs text-center text-primary bg-primary-container/20 border border-primary/20 py-2.5 px-4 rounded-lg font-medium">
                    {message}
                  </p>
                )}

                <button type="button" onClick={() => setStep('login')} className="w-full text-center text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
                  Return to Login
                </button>
              </form>
            </div>
          )}

          {/* STEP 4: ROLE ONBOARDING SELECTION */}
          {step === 'role_select' && (
            <div className="space-y-6">
              <h2 className="font-headline-lg text-2xl text-primary font-bold">Establish Corporate Protocol</h2>
              <p className="text-sm text-on-surface-variant">Select your primary functional role in the circular supply network.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Manufacturer */}
                <button 
                  onClick={() => setSelectedRole('manufacturer')}
                  className={`p-5 rounded-xl border text-left transition-all ${selectedRole === 'manufacturer' ? 'bg-primary-container/20 border-primary shadow-md' : 'bg-surface/30 border-outline-variant/30 hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined text-2xl text-primary">precision_manufacturing</span>
                  <h3 className="font-body-large text-sm font-bold text-on-background mt-2">Manufacturer</h3>
                  <p className="text-[11px] text-on-surface-variant/80 mt-1">Upload byproducts, estimate ROI indices, list waste streams.</p>
                </button>

                {/* Recycler */}
                <button 
                  onClick={() => setSelectedRole('recycler')}
                  className={`p-5 rounded-xl border text-left transition-all ${selectedRole === 'recycler' ? 'bg-primary-container/20 border-primary shadow-md' : 'bg-surface/30 border-outline-variant/30 hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined text-2xl text-secondary">recycling</span>
                  <h3 className="font-body-large text-sm font-bold text-on-background mt-2">Recycler / Processor</h3>
                  <p className="text-[11px] text-on-surface-variant/80 mt-1">Bid on raw waste materials, manage sorting complexities.</p>
                </button>

                {/* Buyer */}
                <button 
                  onClick={() => setSelectedRole('buyer')}
                  className={`p-5 rounded-xl border text-left transition-all ${selectedRole === 'buyer' ? 'bg-primary-container/20 border-primary shadow-md' : 'bg-surface/30 border-outline-variant/30 hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined text-2xl text-tertiary">shopping_cart</span>
                  <h3 className="font-body-large text-sm font-bold text-on-background mt-2">Product Buyer</h3>
                  <p className="text-[11px] text-on-surface-variant/80 mt-1">Procure high-yield circular architectural products.</p>
                </button>

                {/* Treatment Provider */}
                <button 
                  onClick={() => setSelectedRole('treatment')}
                  className={`p-5 rounded-xl border text-left transition-all ${selectedRole === 'treatment' ? 'bg-primary-container/20 border-primary shadow-md' : 'bg-surface/30 border-outline-variant/30 hover:border-primary'}`}
                >
                  <span className="material-symbols-outlined text-2xl text-primary">science</span>
                  <h3 className="font-body-large text-sm font-bold text-on-background mt-2">Treatment Facility</h3>
                  <p className="text-[11px] text-on-surface-variant/80 mt-1">Bid on chemical separation and effluent tenders.</p>
                </button>
              </div>

              <button 
                onClick={handleRoleConfirm}
                className="w-full py-4 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
              >
                Confirm System Protocol
              </button>
            </div>
          )}

          {/* STEP 5: ORGANIZATION ONBOARDING */}
          {step === 'org_setup' && (
            <div className="space-y-6">
              <h2 className="font-headline-lg text-2xl text-primary font-bold">Node Synchronization</h2>
              <p className="text-sm text-on-surface-variant">Input your primary facility configuration parameters to establish network telemetry.</p>

              <form onSubmit={handleOrgSetup} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Primary Industry Category</label>
                  <select 
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background focus:outline-none transition-all"
                  >
                    <option value="Textiles & Apparel">Textiles & Organic Apparel</option>
                    <option value="Smelting & Metal Alloys">Metal Smelting & Heavy Alloys</option>
                    <option value="Chemical Synthetics">Synthetics & Advanced Polymers</option>
                    <option value="Pharmaceuticals">Pharmaceutical Compounds</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Facilities Enrolled</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="50" 
                      required 
                      value={facilitiesCount}
                      onChange={(e) => setFacilitiesCount(parseInt(e.target.value))}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background input-glow transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Primary Geolocation</label>
                    <input 
                      type="text" 
                      required 
                      value={facilityLocation}
                      onChange={(e) => setFacilityLocation(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-4 px-4 text-on-background input-glow transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
                >
                  {loading ? 'Aligning Node Telemetry...' : 'Synchronize Circular Workspace'}
                </button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
