'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCircular, RawMaterial, GeneratedProduct } from '@/lib/CircularContext';

// List of 10 highly realistic and experimental circular product possibilities
const PRODUCT_POSSIBILITIES = [
  { name: 'Acoustic Eco Foam', desc: 'Highly absorbent thermal barrier panel', feasibility: 92, demand: 88, complexity: 30, carbon: '120kg/unit', roi: '+140%', buyers: 3, machine: 'Extrusion Fiber Loom v2', workforce: '1 operator', price: '₹4,200', scale: 'High', export: 'Medium', recoveryTime: '12 days', safety: 98 },
  { name: 'Carbon-Lock Construction Tiles', desc: 'Heavy-duty interlocking pavement tile', feasibility: 95, demand: 91, complexity: 45, carbon: '340kg/unit', roi: '+185%', buyers: 5, machine: 'Hydraulic Compaction Press', workforce: '2 operators', price: '₹12,400', scale: 'Maximum', export: 'High', recoveryTime: '6 days', safety: 95 },
  { name: 'Algae-Reactive Insulation', desc: 'Live biosensing soundproofing panel', feasibility: 74, demand: 80, complexity: 80, carbon: '520kg/unit', roi: '+220%', buyers: 2, machine: 'Bioreactor Laminating Tank', workforce: '2 scientists', price: '₹28,000', scale: 'Medium', export: 'High', recoveryTime: '24 days', safety: 91 },
  { name: 'Thermal Smart Panels', desc: 'Phase-changing building envelope matrix', feasibility: 86, demand: 85, complexity: 55, carbon: '210kg/unit', roi: '+160%', buyers: 4, machine: 'Vacuum Sintering Furnace', workforce: '1 specialist', price: '₹18,500', scale: 'High', export: 'Medium', recoveryTime: '14 days', safety: 96 },
  { name: 'Recycled Textile Composites', desc: 'Impact-resistant lightweight casing', feasibility: 89, demand: 82, complexity: 40, carbon: '150kg/unit', roi: '+115%', buyers: 4, machine: 'Fibre Blenders, Pellet Press', workforce: '1 worker', price: '₹3,200', scale: 'High', export: 'Low', recoveryTime: '8 days', safety: 99 },
  { name: 'Industrial Bio-Fiber Walls', desc: 'Compressed agricultural stalk partitions', feasibility: 91, demand: 84, complexity: 35, carbon: '280kg/unit', roi: '+135%', buyers: 3, machine: 'High-Temperature Steam Casts', workforce: '2 operators', price: '₹6,800', scale: 'High', export: 'Medium', recoveryTime: '9 days', safety: 97 },
  { name: 'Water-Absorbing Eco Concrete', desc: 'Permeable storm-water drainage slabs', feasibility: 94, demand: 89, complexity: 50, carbon: '410kg/unit', roi: '+150%', buyers: 6, machine: 'Coarse Slag Mixers, Curing Beds', workforce: '3 workers', price: '₹8,400', scale: 'Maximum', export: 'High', recoveryTime: '5 days', safety: 94 },
  { name: 'Modular Flood-Resistant Blocks', desc: 'Floating aggregate seawall structures', feasibility: 81, demand: 93, complexity: 70, carbon: '620kg/unit', roi: '+260%', buyers: 3, machine: 'Rotary Kilns, Casting Sleds', workforce: '3 specialists', price: '₹42,000', scale: 'High', export: 'Maximum', recoveryTime: '30 days', safety: 90 },
  { name: 'Eco Soundproof Structures', desc: 'Sintered fume concentrate panels', feasibility: 83, demand: 78, complexity: 65, carbon: '180kg/unit', roi: '+95%', buyers: 2, machine: 'Needlepunch Fiber Presses', workforce: '2 technicians', price: '₹5,500', scale: 'Medium', export: 'Low', recoveryTime: '15 days', safety: 95 },
  { name: 'Compressed Fiber Composites', desc: 'High-density secondary pulp sheets', feasibility: 88, demand: 81, complexity: 42, carbon: '130kg/unit', roi: '+110%', buyers: 5, machine: 'Hot Multi-Dehydrator Rolls', workforce: '1 operator', price: '₹2,900', scale: 'High', export: 'Medium', recoveryTime: '7 days', safety: 98 }
];

export default function CircularManufacturingStudio() {
  const { 
    generatedProducts, 
    rawMaterials, 
    saveProduct, 
    listProductOnMarketplace, 
    updateCustomProductSpecs,
    addNotification,
    t
  } = useCircular();

  // Active steps in the manufacturing studio
  const [activeMaterialId, setActiveMaterialId] = useState<string>('raw-1');
  const [selectedProductPossibility, setSelectedProductPossibility] = useState(PRODUCT_POSSIBILITIES[0]);

  // Design controls (Step 3)
  const [customRatio, setCustomRatio] = useState(65);
  const [customPurity, setCustomPurity] = useState(85);
  const [customPrice, setCustomPrice] = useState('₹12,400');
  const [customComplexity, setCustomComplexity] = useState(45);

  // Synthesis Animation States (Step 4)
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStage, setSynthesisStage] = useState(0);
  const [synthesisLogs, setSynthesisLogs] = useState<string[]>([]);
  const [revealFinalProduct, setRevealFinalProduct] = useState(false);

  // WebGL Canvas particles reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedMaterial = rawMaterials.find(m => m.id === activeMaterialId) || rawMaterials[0];

  // Particle Synthesis Animation Loop
  useEffect(() => {
    if (!isSynthesizing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];

    // Initialize random particle vectors
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        color: i % 2 === 0 ? '#4cf2c2' : '#7bffd9',
        size: Math.random() * 3 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Pulse circle representing high-energy magnetic synthesis
      ctx.strokeStyle = 'rgba(76, 242, 194, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.sin(Date.now() / 200) * 20 + 80, 0, Math.PI * 2);
      ctx.stroke();

      // Particle update & collision synthesis pull towards central orbit
      particles.forEach((p) => {
        const dx = width / 2 - p.x;
        const dy = height / 2 - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (synthesisStage >= 3 && dist > 5) {
          // Attract towards the core
          p.vx += (dx / dist) * 0.15;
          p.vy += (dy / dist) * 0.15;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isSynthesizing, synthesisStage]);

  // Handle the cinematic generation sequence
  const triggerCinematicSynthesis = () => {
    setIsSynthesizing(true);
    setRevealFinalProduct(false);
    setSynthesisStage(1);
    setSynthesisLogs(['Initiating AI Circular Manufacturing Protocol...']);

    const steps = [
      { delay: 1000, msg: '1. Floating feedstock materials in holographic vacuum chamber...' },
      { delay: 2000, msg: '2. Separating materials into molecular composite streams...' },
      { delay: 3000, msg: '3. Locking high-temperature AI Energy Pulse...' },
      { delay: 4000, msg: '4. Compacting raw aggregate lattice bonds dynamically...' },
      { delay: 5000, msg: '5. Mapping optimized robotic curing pathways...' },
      { delay: 6000, msg: '6. Sintering porous thermal cell structures...' },
      { delay: 7000, msg: '7. Casting surface texture layers for high density load support...' },
      { delay: 8000, msg: '8. Synthesis complete! Materializing premium blueprint specs...' },
      { delay: 9000, msg: '9. Syncing carbon credits and ROI ledgers...' },
      { delay: 10000, msg: '10. Circular physical twin registered successfully!' }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSynthesisStage(idx + 1);
        setSynthesisLogs((prev) => [...prev, step.msg]);

        if (idx === steps.length - 1) {
          setTimeout(() => {
            setIsSynthesizing(false);
            setRevealFinalProduct(true);
            addNotification(
              'Material Synthesized Successfully',
              `"${selectedProductPossibility.name}" has completed full physical composition casting.`,
              'success'
            );
          }, 800);
        }
      }, step.delay);
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* Header Panel */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Advanced Design Studio
          </span>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('innovationLabTitle')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl">
            Sift, separate, and synthesize secondary industrial byproducts into premium architectural building blocks.
          </p>
        </div>
      </header>

      {/* STEP 1: RAW MATERIAL VISUALIZATION */}
      <section className="glass-panel rounded-2xl p-6 border border-outline-variant/20 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/15 pb-4">
          <span className="material-symbols-outlined text-primary">layers</span>
          <div>
            <h2 className="font-headline-md text-base font-bold text-on-background">Step 1 — Raw Material Visualization</h2>
            <p className="text-[10px] text-on-surface-variant">Analyze segregated molecular fractions and purity scales.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Feedstock material capsules */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {rawMaterials.map((mat) => {
              const isActive = activeMaterialId === mat.id;
              return (
                <div 
                  key={mat.id}
                  onClick={() => setActiveMaterialId(mat.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                    isActive 
                      ? 'bg-primary-container/10 border-primary shadow-[0_0_15px_rgba(76,242,194,0.1)]' 
                      : 'bg-surface/40 border-outline-variant/15 hover:border-primary/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-metadata text-[8px] bg-primary/10 text-primary font-extrabold px-1.5 py-0.5 rounded uppercase">Sieve Ingested</span>
                      <h4 className="text-sm font-extrabold text-on-background mt-2">{mat.name}</h4>
                    </div>
                    <span className="material-symbols-outlined text-primary text-lg animate-pulse">grain</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-semibold text-on-surface-variant border-t border-outline-variant/10 pt-3">
                    <div>
                      <span>Purity</span>
                      <p className="text-primary font-bold">{mat.purity}%</p>
                    </div>
                    <div>
                      <span>Contamination</span>
                      <p className="text-secondary font-bold">{mat.contamination}%</p>
                    </div>
                    <div>
                      <span>Ph Ratio</span>
                      <p className="text-on-background font-bold">{mat.ph}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sieve visualization card */}
          <div className="lg:col-span-4 bg-surface-container-low/40 border border-outline-variant/15 p-5 rounded-2xl flex flex-col justify-between h-[300px] relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div>
              <span className="font-label-caps text-[8px] text-primary border border-primary/20 px-2 py-0.5 rounded uppercase font-bold">Molecular Layers</span>
              <h3 className="text-sm font-bold text-on-background mt-2">Active Feedstock: {selectedMaterial.name}</h3>
              
              <div className="mt-4 space-y-2 text-xs font-semibold text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Chemical Category</span>
                  <span className="text-on-background">{selectedMaterial.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available Volume</span>
                  <span className="text-on-background">{selectedMaterial.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span>Market Commodity Value</span>
                  <span className="text-primary font-bold">₹18,400 per Ton</span>
                </div>
              </div>
            </div>

            {/* Glowing capsule visualization container */}
            <div className="w-full h-24 bg-surface-container-lowest border border-outline-variant/20 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="w-8 h-12 rounded-full border-2 border-primary/40 relative flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(76,242,194,0.2)]">
                <div className="absolute w-6 h-6 rounded-full bg-primary/20 animate-pulse" />
              </div>
              <span className="font-metadata text-[8px] text-on-surface-variant absolute bottom-2 font-bold uppercase tracking-widest">Feedstock capsule stable</span>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2 & 3: SUGGESTION ENGINE & DESIGN CONTROL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Step 2 — 10 AI Product suggestions (Col Span 7) */}
        <section className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-outline-variant/20 flex flex-col gap-4">
          <div className="border-b border-outline-variant/15 pb-3">
            <h2 className="font-headline-md text-base font-bold text-on-background">Step 2 — AI Product Suggestion Engine</h2>
            <p className="text-[10px] text-on-surface-variant">Evaluating 10 experimental circular material possibilities.</p>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-1">
            {PRODUCT_POSSIBILITIES.map((poss) => {
              const isSelected = selectedProductPossibility.name === poss.name;
              return (
                <button
                  key={poss.name}
                  onClick={() => {
                    setSelectedProductPossibility(poss);
                    setCustomPrice(poss.price);
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                    isSelected 
                      ? 'bg-secondary-container/10 border-secondary shadow-sm scale-[1.01]' 
                      : 'bg-surface/30 border-outline-variant/15 hover:border-secondary'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-on-background">{poss.name}</h4>
                    <p className="text-[9.5px] text-on-surface-variant mt-0.5">{poss.desc}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-xs font-extrabold text-primary">{poss.roi} ROI</span>
                    <p className="text-[9px] text-on-surface-variant">Est. value: {poss.price}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 — Industry product design control (Col Span 5) */}
        <section className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#7A928A]/20 flex flex-col justify-between">
          <div>
            <div className="border-b border-outline-variant/15 pb-3 mb-5">
              <h2 className="font-headline-md text-base font-bold text-on-background">Step 3 — Industrial Design Controls</h2>
              <p className="text-[10px] text-on-surface-variant">Tune composition ratios and price matrices.</p>
            </div>

            <div className="space-y-4 font-semibold text-xs text-on-surface">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Feedstock Composite Ratio</span>
                  <span className="text-primary font-mono">{customRatio}%</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="95" 
                  value={customRatio}
                  onChange={(e) => setCustomRatio(parseInt(e.target.value))}
                  className="w-full accent-primary bg-outline-variant/20 h-1.5 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span>Structural Sieve Purity Target</span>
                  <span className="text-secondary font-mono">{customPurity}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="99" 
                  value={customPurity}
                  onChange={(e) => setCustomPurity(parseInt(e.target.value))}
                  className="w-full accent-secondary bg-outline-variant/20 h-1.5 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-on-surface-variant">Estimated Resale Price (₹)</label>
                <input 
                  type="text" 
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-2.5 px-3 font-semibold text-on-background focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={triggerCinematicSynthesis}
            className="w-full mt-6 py-3.5 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all shadow-md"
          >
            Start AI Sieve Synthesis Chamber
          </button>
        </section>

      </div>

      {/* STEP 4: CINEMATIC RECONSTRUCTION & METRIC VISUALIZER */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-2xl bg-surface border border-primary-container p-6 rounded-3xl shadow-[0_0_60px_rgba(76,242,194,0.25)] relative overflow-hidden flex flex-col md:flex-row gap-6 min-h-[400px]">
            
            {/* Holographic synthesis particle viewport */}
            <div className="flex-1 min-h-[250px] bg-surface-container-low border border-outline-variant/15 rounded-2xl relative overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 px-3 py-1.5 rounded-full border border-outline-variant/20 text-[9px] font-bold text-primary animate-pulse">
                HOLOGRAPHIC VIEWPORT ACTIVE
              </div>
            </div>

            {/* Stepper process list log */}
            <div className="w-full md:w-5/12 flex flex-col justify-between text-xs font-semibold">
              <div className="space-y-2">
                <span className="font-label-caps text-[9px] text-primary border border-primary/20 bg-primary-container/10 px-2 py-0.5 rounded uppercase">Synthesis log</span>
                <h3 className="text-sm font-extrabold text-on-background mt-1">Curing Matrix</h3>
                
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto text-[9.5px] font-mono text-on-surface-variant leading-relaxed">
                  {synthesisLogs.map((log, idx) => (
                    <p key={`log-${idx}`} className="border-b border-outline-variant/5 pb-1">
                      {log}
                    </p>
                  ))}
                </div>
              </div>

              {/* Progress bar and numeric step indicator */}
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[10px] font-bold text-primary">
                  <span>Composite Bonding</span>
                  <span>{synthesisStage * 10}%</span>
                </div>
                <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: `${synthesisStage * 10}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FINAL PRODUCT REVEAL AND SPECIFICATIONS DATA */}
      {revealFinalProduct && (
        <section className="glass-panel p-6 rounded-3xl border border-primary-container bg-primary-container/[0.01] animate-slide-up space-y-6">
          <div className="border-b border-primary-container/30 pb-4 mb-4 flex justify-between items-center">
            <div>
              <span className="font-label-caps text-[9px] text-primary bg-primary/10 border border-primary px-2.5 py-1 rounded-full uppercase font-extrabold">Final Synthesis Manifested</span>
              <h3 className="font-display-hero text-2xl text-on-background font-extrabold mt-3">{selectedProductPossibility.name}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Physical Aggregate Blueprint and Material Compliance specs formulated successfully.</p>
            </div>

            <button 
              onClick={() => {
                addNotification('Circular Asset Saved', 'Sieve asset loaded successfully to the catalogue.', 'success');
                setRevealFinalProduct(false);
              }}
              className="py-2.5 px-5 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
            >
              Add to Catalog
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20">
              <span className="text-[9px] text-on-surface-variant uppercase font-bold block">Feasibility Rating</span>
              <p className="text-base font-extrabold text-primary mt-1">{selectedProductPossibility.feasibility}%</p>
            </div>
            <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20">
              <span className="text-[9px] text-on-surface-variant uppercase font-bold block">Estimated Return (ROI)</span>
              <p className="text-base font-extrabold text-secondary mt-1">{selectedProductPossibility.roi}</p>
            </div>
            <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20">
              <span className="text-[9px] text-on-surface-variant uppercase font-bold block">Target Market Valuation</span>
              <p className="text-base font-extrabold text-on-background mt-1">{customPrice}</p>
            </div>
            <div className="p-4 rounded-xl bg-surface/40 border border-outline-variant/20">
              <span className="text-[9px] text-on-surface-variant uppercase font-bold block">Export Capability Index</span>
              <p className="text-base font-extrabold text-primary mt-1">{selectedProductPossibility.export} Potential</p>
            </div>
          </div>

          {/* Blueprint detail breakdown table */}
          <div className="p-5 bg-surface-container-low/40 border border-outline-variant/15 rounded-2xl">
            <h4 className="font-display-hero text-sm font-bold text-on-background mb-4">Engineering Blueprint Overlays</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] font-semibold text-on-surface-variant font-mono leading-relaxed">
              <div className="space-y-2">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Carbon Avoidance offset</span>
                  <span className="text-secondary font-bold">{selectedProductPossibility.carbon} / batch</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Workforce allocated</span>
                  <span className="text-on-background font-bold">{selectedProductPossibility.workforce}</span>
                </div>
                <div className="flex justify-between">
                  <span>Required machinery sequence</span>
                  <span className="text-on-background font-bold">{selectedProductPossibility.machine}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Curing chamber timeline</span>
                  <span className="text-on-background font-bold">{selectedProductPossibility.recoveryTime}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                  <span>Toxicity compliance score</span>
                  <span className="text-primary font-bold">Standard Certified (95% clean)</span>
                </div>
                <div className="flex justify-between">
                  <span>Active buyer pipelines matched</span>
                  <span className="text-secondary font-bold">{selectedProductPossibility.buyers} procurement nodes</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
