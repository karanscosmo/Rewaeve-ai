'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCircular, UserRole } from '@/lib/CircularContext';

export default function AuthPortal() {
  const router = useRouter();
  const { loginUser, registerUser, onboardOrganization } = useCircular();

  // Wizard Steps: 'login' | 'register' | 'forgot' | 'role_select' | 'org_setup'
  const [step, setStep] = useState<'login' | 'register' | 'forgot' | 'role_select' | 'org_setup'>('login');

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('manufacturer');
  const [industryType, setIndustryType] = useState('Textiles & Apparel');
  const [facilitiesCount, setFacilitiesCount] = useState(1);
  const [facilityLocation, setFacilityLocation] = useState('Gujarat GIDC Industrial Cluster');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginUser(email || 'operator@facility.com', selectedRole);
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

  // Predefined list of 8 complete login roles
  const loginRoles: { value: UserRole; label: string; desc: string; icon: string }[] = [
    { value: 'manufacturer', label: 'Manufacturer / Seller', desc: 'Ingest byproducts, run feasibility audits, list waste flows.', icon: 'precision_manufacturing' },
    { value: 'buyer', label: 'Buyer Industry', desc: 'Browse sustainable secondary products, procure quality materials.', icon: 'shopping_bag' },
    { value: 'recycler', label: 'Recycler Node', desc: 'Source bulk feedstock, cast aggregate compounds, view listings.', icon: 'recycling' },
    { value: 'treatment', label: 'Treatment Provider', desc: 'Provide chemical separation services, bid on effluent tenders.', icon: 'science' },
    { value: 'sustainability', label: 'NGO / Expert', desc: 'Provide training support, workforce audits, zero-carbon consultancy.', icon: 'psychology' },
    { value: 'government', label: 'Government Partner', desc: 'Sponsor green subsidies, grants, framework regulatory rules.', icon: 'gavel' },
    { value: 'middleman', label: 'Supply Chain Coordinator', desc: 'Negotiate bilateral circular contracts, coordinate transport logistics.', icon: 'local_shipping' },
    { value: 'admin', label: 'Sysop Admin', desc: 'Manage facility ledger, network nodes, and global analytics parameters.', icon: 'shield_person' }
  ];

  return (
    <div className="bg-background text-on-background min-h-screen relative overflow-hidden flex items-center justify-center font-body-main px-4 py-12">
      
      {/* Background Cinematic Theme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-bright to-surface-container-low">
        <div className="absolute inset-0 bg-holographic-gradient opacity-80 mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23bccac2\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-primary-container/10 to-secondary-container/10 blur-3xl mix-blend-multiply opacity-50 pointer-events-none" />
      </div>

      <main className="relative z-10 w-full max-w-[1250px] flex flex-col lg:flex-row gap-12 items-center justify-center">
        
        {/* Cinematic Brand Pitch */}
        <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <span className="font-label-caps text-[10px] text-primary bg-primary-container/20 border border-primary/20 rounded-full px-4 py-1.5 font-bold uppercase tracking-widest shadow-sm">
            Ecosystem Security
          </span>
          <h1 className="font-display-hero text-5xl lg:text-6xl font-extrabold text-primary tracking-tighter leading-none text-glow">
            ReWeave AI
          </h1>
          <p className="font-headline-md text-base text-on-surface-variant max-w-sm leading-relaxed font-semibold">
            The next-generation circular operating system linking 8 distinct industrial sectors into an unified sustainable economy.
          </p>
          <div className="inline-flex items-center gap-2 bg-surface/40 backdrop-blur-md border border-outline-variant/20 rounded-full px-4 py-2 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#4cf2c2]"></span>
            <span className="font-metadata text-xs text-on-surface-variant font-medium">Ledger Authentication Tunnel Active</span>
          </div>
        </div>

        {/* Dynamic Login Box Container (Glassmorphic Pane) */}
        <div className="w-full lg:w-8/12 bg-surface/60 backdrop-blur-[24px] border border-[#7A928A]/20 rounded-2xl p-6 lg:p-10 shadow-sm relative overflow-hidden transition-all duration-500">
          
          {/* STEP 1: LOGIN WITH 8 COMPLETE INTERACTIVE ROLE OPTIONS */}
          {step === 'login' && (
            <div className="space-y-6">
              <div className="flex gap-6 border-b border-outline-variant/15 pb-4">
                <button className="font-headline-md text-base text-primary font-bold border-b-2 border-primary pb-1 -mb-[18px]">
                  Secure Gateway
                </button>
                <button onClick={() => setStep('register')} className="font-headline-md text-base text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Establish Credentials
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Facility Key (Email)</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@facility.com"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pass Signature</label>
                      <button type="button" onClick={() => setStep('forgot')} className="text-[10px] text-primary hover:underline font-bold">Forgot?</button>
                    </div>
                    <input 
                      type="password" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* 8 Complete Role Grid Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Select Platform Gateway Role</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {loginRoles.map((role) => {
                      const isSelected = selectedRole === role.value;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setSelectedRole(role.value)}
                          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between h-[120px] ${
                            isSelected 
                              ? 'bg-primary-container/20 border-primary shadow-[0_0_15px_rgba(76,242,194,0.1)] scale-[1.02]' 
                              : 'bg-surface-container-lowest/40 border-outline-variant/15 hover:border-primary/40 hover:scale-[1.01]'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>{role.icon}</span>
                          <div>
                            <span className="text-[10.5px] font-bold text-on-background block leading-tight">{role.label}</span>
                            <span className="text-[8.5px] text-on-surface-variant font-medium block mt-0.5 max-h-[30px] overflow-hidden leading-tight">{role.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all shadow-md"
                >
                  {loading ? 'Aligning Neural Gateways...' : 'Decrypt Security Signature'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: ACCOUNT REGISTRATION */}
          {step === 'register' && (
            <div className="space-y-6">
              <div className="flex gap-6 border-b border-outline-variant/15 pb-4">
                <button onClick={() => setStep('login')} className="font-headline-md text-base text-on-surface-variant hover:text-primary font-medium transition-colors">
                  Secure Gateway
                </button>
                <button className="font-headline-md text-base text-primary font-bold border-b-2 border-primary pb-1 -mb-[18px]">
                  Establish Credentials
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Operator Name</label>
                    <input 
                      type="text" 
                      required 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Helen Vance"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Organization Title</label>
                    <input 
                      type="text" 
                      required 
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      placeholder="Vance Textile Mills"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Ecosystem Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@facility.com"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Platform Operational Role</label>
                  <select 
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-bold"
                  >
                    <option value="manufacturer">Manufacturer Node (Waste Seller)</option>
                    <option value="buyer">Buyer Node (Circular Product Buyer)</option>
                    <option value="recycler">Recycling Node (Material Refinement)</option>
                    <option value="treatment">Treatment Facility (Acid/Sludge Treatment)</option>
                    <option value="sustainability">NGO / Environmental Consultant Expert</option>
                    <option value="government">Government Circular Partner</option>
                    <option value="middleman">Supply Chain Middleman Coordinator</option>
                    <option value="admin">Sysop Administrator Terminal</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
                >
                  {loading ? 'Generating Node Signature...' : 'Register Corporate Terminal'}
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: FORGOT PASSWORD */}
          {step === 'forgot' && (
            <div className="space-y-6">
              <h2 className="font-headline-lg text-xl text-primary font-extrabold">Biometric Recovery</h2>
              <p className="text-xs text-on-surface-variant font-medium">Enter your facility terminal address to broadcast a secure identity verification vector.</p>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input 
                  type="email" 
                  required 
                  placeholder="operator@facility.com"
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                />

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
                >
                  {loading ? 'Broadcasting Recovery Seal...' : 'Send Recovery Vector'}
                </button>

                {message && (
                  <p className="text-xs text-center text-primary bg-primary-container/20 border border-primary/20 py-2 px-4 rounded-lg font-bold">
                    {message}
                  </p>
                )}

                <button type="button" onClick={() => setStep('login')} className="w-full text-center text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">
                  Return to Login
                </button>
              </form>
            </div>
          )}

          {/* STEP 4: REGISTRATION ROLE PROTOCOL SELECT */}
          {step === 'role_select' && (
            <div className="space-y-6">
              <h2 className="font-headline-lg text-xl text-primary font-extrabold">Establish Corporate Protocol</h2>
              <p className="text-xs text-on-surface-variant font-medium">Verify your primary functional role in the circular supply network.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loginRoles.slice(0, 4).map((role) => (
                  <button 
                    key={role.value}
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedRole === role.value ? 'bg-primary-container/20 border-primary shadow-md' : 'bg-surface/30 border-outline-variant/30 hover:border-primary'}`}
                  >
                    <span className="material-symbols-outlined text-xl text-primary">{role.icon}</span>
                    <h3 className="font-body-large text-xs font-bold text-on-background mt-1.5">{role.label}</h3>
                    <p className="text-[10px] text-on-surface-variant/80 mt-1 leading-normal">{role.desc}</p>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleRoleConfirm}
                className="w-full py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
              >
                Confirm System Protocol
              </button>
            </div>
          )}

          {/* STEP 5: ONBOARDING TELEMETRY DETAILS */}
          {step === 'org_setup' && (
            <div className="space-y-6">
              <h2 className="font-headline-lg text-xl text-primary font-extrabold">Node Synchronization</h2>
              <p className="text-xs text-on-surface-variant font-medium">Input your primary facility configuration parameters to establish network telemetry.</p>

              <form onSubmit={handleOrgSetup} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Primary Industry Category</label>
                  <select 
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-bold"
                  >
                    <option value="Textiles & Apparel">Textiles & Apparel Recovery</option>
                    <option value="Smelting & Metal Alloys">Metal Smelting & Heavy Alloys</option>
                    <option value="Chemical Synthetics">Synthetics & Advanced Polymers</option>
                    <option value="Pharmaceuticals">Pharmaceutical Compounds</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Facilities Enrolled</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="50" 
                      required 
                      value={facilitiesCount}
                      onChange={(e) => setFacilitiesCount(parseInt(e.target.value))}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Primary Geolocation</label>
                    <input 
                      type="text" 
                      required 
                      value={facilityLocation}
                      onChange={(e) => setFacilityLocation(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-3 px-4 text-xs text-on-background focus:outline-none focus:border-primary transition-all font-semibold"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
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
