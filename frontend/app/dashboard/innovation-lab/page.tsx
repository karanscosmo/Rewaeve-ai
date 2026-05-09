'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useCircular, RawMaterial, GeneratedProduct } from '@/lib/CircularContext';

// List of 10 highly realistic and experimental circular product possibilities with all 13 metrics
const PRODUCT_POSSIBILITIES = [
  { 
    name: 'Acoustic Eco Foam', 
    desc: 'Highly absorbent acoustic and thermal barrier panel synthesized from cellulose textile pulp fibers.', 
    feasibility: 92, 
    demand: 88, 
    complexity: 30, 
    carbon: '120kg/unit', 
    roi: '+140%', 
    buyers: 3, 
    machine: 'Extrusion Fiber Loom v2', 
    workforce: '1 operator', 
    price: '₹4,200', 
    scale: 'High', 
    export: 'Medium', 
    recoveryTime: '12 days', 
    safety: 98,
    purityTarget: 88,
    dimensions: '120cm x 60cm x 5cm',
    circularityScore: 94,
    components: ['Cellulose pulp: 75%', 'Silicate binder: 20%', 'Organic dye: 5%']
  },
  { 
    name: 'Carbon-Lock Construction Tiles', 
    desc: 'Heavy-duty interlocking pavement tiles with embedded fly-ash aggregates that bind atmospheric carbon.', 
    feasibility: 95, 
    demand: 91, 
    complexity: 45, 
    carbon: '340kg/unit', 
    roi: '+185%', 
    buyers: 5, 
    machine: 'Hydraulic Compaction Press', 
    workforce: '2 operators', 
    price: '₹12,400', 
    scale: 'Maximum', 
    export: 'High', 
    recoveryTime: '6 days', 
    safety: 95,
    purityTarget: 92,
    dimensions: '40cm x 40cm x 8cm',
    circularityScore: 97,
    components: ['Fly-ash slag: 60%', 'Sintered aggregate: 35%', 'Polymer curing agent: 5%']
  },
  { 
    name: 'Algae-Reactive Insulation Slabs', 
    desc: 'Live bio-sensing soundproofing slab that active-absorbs VOCs and stabilizes humidity levels.', 
    feasibility: 74, 
    demand: 80, 
    complexity: 80, 
    carbon: '520kg/unit', 
    roi: '+220%', 
    buyers: 2, 
    machine: 'Bioreactor Laminating Tank', 
    workforce: '2 scientists', 
    price: '₹28,000', 
    scale: 'Medium', 
    export: 'High', 
    recoveryTime: '24 days', 
    safety: 91,
    purityTarget: 78,
    dimensions: '100cm x 50cm x 6cm',
    circularityScore: 88,
    components: ['Bio-fiber matrix: 50%', 'Micro-algae culture: 30%', 'Hydrated silica gel: 20%']
  },
  { 
    name: 'Thermal Phase-Change Panels', 
    desc: 'Phase-changing building envelope insulation that locks solar heat during peak daylight hours.', 
    feasibility: 86, 
    demand: 85, 
    complexity: 55, 
    carbon: '210kg/unit', 
    roi: '+160%', 
    buyers: 4, 
    machine: 'Vacuum Sintering Furnace', 
    workforce: '1 specialist', 
    price: '₹18,500', 
    scale: 'High', 
    export: 'Medium', 
    recoveryTime: '14 days', 
    safety: 96,
    purityTarget: 85,
    dimensions: '150cm x 80cm x 4cm',
    circularityScore: 91,
    components: ['Paraffin hydrate: 45%', 'Fly-ash shell: 50%', 'Stabilizer: 5%']
  },
  { 
    name: 'Recycled Textile Composites', 
    desc: 'Ultra impact-resistant casing slabs for electrical and server housing architectures.', 
    feasibility: 89, 
    demand: 82, 
    complexity: 40, 
    carbon: '150kg/unit', 
    roi: '+115%', 
    buyers: 4, 
    machine: 'Fibre Blenders, Pellet Press', 
    workforce: '1 worker', 
    price: '₹3,200', 
    scale: 'High', 
    export: 'Low', 
    recoveryTime: '8 days', 
    safety: 99,
    purityTarget: 90,
    dimensions: '80cm x 60cm x 3cm',
    circularityScore: 93,
    components: ['Textile scrap: 80%', 'Neutralized binder: 18%', 'Protective coating: 2%']
  },
  { 
    name: 'Industrial Bio-Fiber Partition Wall', 
    desc: 'Compressed agricultural stalk partition board for modern clean-room setups.', 
    feasibility: 91, 
    demand: 84, 
    complexity: 35, 
    carbon: '280kg/unit', 
    roi: '+135%', 
    buyers: 3, 
    machine: 'High-Temperature Steam Casts', 
    workforce: '2 operators', 
    price: '₹6,800', 
    scale: 'High', 
    export: 'Medium', 
    recoveryTime: '9 days', 
    safety: 97,
    purityTarget: 89,
    dimensions: '240cm x 120cm x 10cm',
    circularityScore: 95,
    components: ['Agri-waste stalk: 85%', 'Soy binder: 12%', 'Fungi barrier: 3%']
  },
  { 
    name: 'Water-Absorbing Eco Slabs', 
    desc: 'Coarse-grain permeable storm drainage aggregates preventing localized industrial flooding.', 
    feasibility: 94, 
    demand: 89, 
    complexity: 50, 
    carbon: '410kg/unit', 
    roi: '+150%', 
    buyers: 6, 
    machine: 'Coarse Slag Mixers, Curing Beds', 
    workforce: '3 workers', 
    price: '₹8,400', 
    scale: 'Maximum', 
    export: 'High', 
    recoveryTime: '5 days', 
    safety: 94,
    purityTarget: 91,
    dimensions: '100cm x 100cm x 15cm',
    circularityScore: 96,
    components: ['Coarse slag: 70%', 'Fly-ash matrix: 25%', 'Porous cement: 5%']
  },
  { 
    name: 'Modular Flood seawall Blocks', 
    desc: 'Heavy-weight interlocking sintered aggregate block optimized for ocean wall defense structures.', 
    feasibility: 81, 
    demand: 93, 
    complexity: 70, 
    carbon: '620kg/unit', 
    roi: '+260%', 
    buyers: 3, 
    machine: 'Rotary Kilns, Casting Sleds', 
    workforce: '3 specialists', 
    price: '₹42,000', 
    scale: 'High', 
    export: 'Maximum', 
    recoveryTime: '30 days', 
    safety: 90,
    purityTarget: 82,
    dimensions: '200cm x 100cm x 100cm',
    circularityScore: 89,
    components: ['Sintered aggregate: 75%', 'Smelter residue: 20%', 'Reinforcement grid: 5%']
  },
  { 
    name: 'Eco Soundproof Structures', 
    desc: 'Compressed mineral fume panel specializing in heavy industrial machinery sound absorption.', 
    feasibility: 83, 
    demand: 78, 
    complexity: 65, 
    carbon: '180kg/unit', 
    roi: '+95%', 
    buyers: 2, 
    machine: 'Needlepunch Fiber Presses', 
    workforce: '2 technicians', 
    price: '₹5,500', 
    scale: 'Medium', 
    export: 'Low', 
    recoveryTime: '15 days', 
    safety: 95,
    purityTarget: 86,
    dimensions: '100cm x 100cm x 8cm',
    circularityScore: 90,
    components: ['Mineral fumes: 50%', 'Polypropylene binder: 40%', 'Flame retardant: 10%']
  },
  { 
    name: 'Compressed Secondary Pulp Sheets', 
    desc: 'Multi-ply compressed fiber composite optimized for heavy packaging structures.', 
    feasibility: 88, 
    demand: 81, 
    complexity: 42, 
    carbon: '130kg/unit', 
    roi: '+110%', 
    buyers: 5, 
    machine: 'Hot Multi-Dehydrator Rolls', 
    workforce: '1 operator', 
    price: '₹2,900', 
    scale: 'High', 
    export: 'Medium', 
    recoveryTime: '7 days', 
    safety: 98,
    purityTarget: 90,
    dimensions: '200cm x 100cm x 2cm',
    circularityScore: 92,
    components: ['Secondary pulp: 90%', 'Wax sizing: 8%', 'Alum binder: 2%']
  }
];

export default function CircularManufacturingStudio() {
  const { 
    generatedProducts, 
    rawMaterials, 
    saveProduct, 
    listProductOnMarketplace, 
    addNotification,
    t
  } = useCircular();

  // Active steps in the manufacturing studio
  const [activeMaterialId, setActiveMaterialId] = useState<string>('raw-1');
  const [selectedProductPossibility, setSelectedProductPossibility] = useState(PRODUCT_POSSIBILITIES[0]);

  // Design controls (Step 3) - Customizing parameters
  const [customRatio, setCustomRatio] = useState(65);
  const [customPurity, setCustomPurity] = useState(85);
  const [customPrice, setCustomPrice] = useState('₹4,200');
  const [customComplexity, setCustomComplexity] = useState(45);
  const [customWidth, setCustomWidth] = useState(120);
  const [customLength, setCustomLength] = useState(60);
  const [customThickness, setCustomThickness] = useState(5);
  const [sustainabilityGoal, setSustainabilityGoal] = useState<'CARBON_MIN' | 'WATER_REUSE' | 'ZEROWASTE' | 'HIGH_DURABILITY'>('CARBON_MIN');

  // Synthesis Animation States (Step 4)
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStage, setSynthesisStage] = useState(0);
  const [synthesisLogs, setSynthesisLogs] = useState<string[]>([]);
  const [revealFinalProduct, setRevealFinalProduct] = useState(false);

  // Canvas references for independent workspaces
  const synthesisCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const detailCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedMaterial = rawMaterials.find(m => m.id === activeMaterialId) || rawMaterials[0];

  // Update default specs when suggestion changes
  useEffect(() => {
    setCustomPrice(selectedProductPossibility.price);
    setCustomComplexity(selectedProductPossibility.complexity);
    setCustomPurity(selectedProductPossibility.purityTarget);
    
    // Parse dimensions: e.g. "120cm x 60cm x 5cm"
    const matches = selectedProductPossibility.dimensions.match(/\d+/g);
    if (matches && matches.length >= 3) {
      setCustomWidth(parseInt(matches[0]));
      setCustomLength(parseInt(matches[1]));
      setCustomThickness(parseInt(matches[2]));
    }
  }, [selectedProductPossibility]);

  // Unified, High-Fidelity Bespoke 3D Product Drawing Engine
  const drawComplexBespoke3DProduct = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    productName: string,
    rotationAngle: number,
    ratio: number,
    width3D: number,
    length3D: number,
    thickness3D: number,
    stage: number, // 0 for detail card view, 1..10 for synthesis stage
    pulseVal: number
  ) => {
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    // Projection angles
    const angleY = rotationAngle;
    const angleX = 0.45 + Math.sin(rotationAngle * 0.5) * 0.15;

    const project = (x: number, y: number, z: number) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const d = 300;
      const scale = d / (d + z2);
      // Let's scale slightly larger if we are in the detail view card vs synthesis view
      const sizeMultiplier = stage === 0 ? 1.35 : 1.05;
      return {
        x: cx + x1 * scale * sizeMultiplier,
        y: cy + y2 * scale * sizeMultiplier,
        depth: z2
      };
    };

    // Helper to draw a 3D line
    const draw3DLine = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, color: string, lineWidth = 1) => {
      const p1 = project(x1, y1, z1);
      const p2 = project(x2, y2, z2);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    // Helper to draw 3D cube
    const draw3DBox = (w: number, h: number, d: number, strokeColor: string, fillColor: string, lineDash: number[] = []) => {
      const halfW = w / 2;
      const halfH = h / 2;
      const halfD = d / 2;

      const vertices = [
        { x: -halfW, y: -halfH, z: -halfD },
        { x: halfW, y: -halfH, z: -halfD },
        { x: halfW, y: halfH, z: -halfD },
        { x: -halfW, y: halfH, z: -halfD },
        { x: -halfW, y: -halfH, z: halfD },
        { x: halfW, y: -halfH, z: halfD },
        { x: halfW, y: halfH, z: halfD },
        { x: -halfW, y: halfH, z: halfD }
      ];

      const projected = vertices.map(v => project(v.x, v.y, v.z));

      // Draw faces in depth order
      const faces = [
        { indices: [0, 1, 2, 3], depth: 0 }, // Back
        { indices: [4, 5, 6, 7], depth: 0 }, // Front
        { indices: [0, 1, 5, 4], depth: 0 }, // Top
        { indices: [2, 3, 7, 6], depth: 0 }, // Bottom
        { indices: [0, 3, 7, 4], depth: 0 }, // Left
        { indices: [1, 2, 6, 5], depth: 0 }  // Right
      ];

      // Calculate average Z for sorting
      faces.forEach(f => {
        f.depth = f.indices.reduce((sum, idx) => sum + projected[idx].depth, 0) / 4;
      });

      // Sort back-to-front
      faces.sort((a, b) => b.depth - a.depth);

      faces.forEach(f => {
        ctx.beginPath();
        f.indices.forEach((idx, i) => {
          if (i === 0) ctx.moveTo(projected[idx].x, projected[idx].y);
          else ctx.lineTo(projected[idx].x, projected[idx].y);
        });
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        if (lineDash.length > 0) ctx.setLineDash(lineDash);
        ctx.stroke();
        ctx.setLineDash([]);
      });
    };

    // Helper to draw hexagonal prism slab
    const drawHexagonalSlab = (r: number, thickness: number, strokeColor: string, fillColor: string) => {
      const halfThick = thickness / 2;
      const topHex: {x: number, y: number, z: number}[] = [];
      const botHex: {x: number, y: number, z: number}[] = [];

      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        topHex.push({x: Math.cos(ang) * r, y: -halfThick, z: Math.sin(ang) * r});
        botHex.push({x: Math.cos(ang) * r, y: halfThick, z: Math.sin(ang) * r});
      }

      const pTop = topHex.map(v => project(v.x, v.y, v.z));
      const pBot = botHex.map(v => project(v.x, v.y, v.z));

      // Bottom face
      ctx.beginPath();
      pBot.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.stroke();

      // Side faces
      for (let i = 0; i < 6; i++) {
        const next = (i + 1) % 6;
        ctx.beginPath();
        ctx.moveTo(pTop[i].x, pTop[i].y);
        ctx.lineTo(pTop[next].x, pTop[next].y);
        ctx.lineTo(pBot[next].x, pBot[next].y);
        ctx.lineTo(pBot[i].x, pBot[i].y);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
      }

      // Top face
      ctx.beginPath();
      pTop.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = 'rgba(76, 242, 194, 0.15)';
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.stroke();
    };

    // Clean canvas configuration
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Scale dimensions based on the slider values dynamically so sizes are highly interactive
    const w = Math.min(Math.max(width3D, 40), 200) * 0.7;
    const h = Math.min(Math.max(thickness3D, 2), 40) * 1.5;
    const d = Math.min(Math.max(length3D, 30), 160) * 0.7;

    const halfW = w / 2;
    const halfH = h / 2;
    const halfD = d / 2;

    const name = productName;

    // Draw the 10 custom products!
    if (name === 'Acoustic Eco Foam') {
      // 1. Acoustic Eco Foam - Porous fibrous block
      const strokeCol = '#4cf2c2';
      const fillCol = 'rgba(76, 242, 194, 0.08)';
      
      draw3DBox(w, h, d, strokeCol, fillCol);

      // Weave internal cellulose fibers
      ctx.lineWidth = 1;
      for (let i = 0; i < 18; i++) {
        const seed = i * 2.3;
        const xStart = -halfW + (i * 7.5) % w;
        const yStart = -halfH + (i * 2.3) % h;
        const zStart = -halfD + (i * 11) % d;

        const xEnd = xStart + Math.sin(seed + rotationAngle) * 20;
        const yEnd = yStart + Math.cos(seed) * 5;
        const zEnd = zStart + Math.cos(seed + rotationAngle) * 20;

        draw3DLine(xStart, yStart, zStart, xEnd, yEnd, zEnd, 'rgba(76, 242, 194, 0.4)', 0.8);
      }

      // Draw growing/expanding bubble particles representing foam cells
      const bubbleCount = 35;
      ctx.fillStyle = 'rgba(76, 242, 194, 0.15)';
      ctx.strokeStyle = 'rgba(123, 255, 217, 0.35)';
      for (let i = 0; i < bubbleCount; i++) {
        const x = -halfW + 10 + (i * 23) % (w - 20);
        const y = -halfH + 2 + (i * 7) % (h - 4);
        const z = -halfD + 8 + (i * 17) % (d - 16);
        const p = project(x, y, z);
        
        const r = (1.5 + (i % 3) * 1.5) * (1 + Math.sin(rotationAngle * 3 + i) * 0.15);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
    } 
    else if (name === 'Carbon-Lock Construction Tiles') {
      // 2. Carbon-Lock Construction Tiles - Hexagonal pavement structure with carbon atom locks
      const strokeCol = '#06b6d4';
      const fillCol = 'rgba(6, 182, 212, 0.08)';

      const hexRadius = w * 0.45;
      const drawHexPrism = (offsetX: number, offsetZ: number, color: string, fillColor: string) => {
        const topVerts = [];
        const botVerts = [];
        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * Math.PI * 2;
          topVerts.push({ x: offsetX + Math.cos(ang) * hexRadius, y: -halfH, z: offsetZ + Math.sin(ang) * hexRadius });
          botVerts.push({ x: offsetX + Math.cos(ang) * hexRadius, y: halfH, z: offsetZ + Math.sin(ang) * hexRadius });
        }

        const pTop = topVerts.map(v => project(v.x, v.y, v.z));
        const pBot = botVerts.map(v => project(v.x, v.y, v.z));

        ctx.beginPath();
        pBot.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();

        for (let i = 0; i < 6; i++) {
          const next = (i + 1) % 6;
          ctx.beginPath();
          ctx.moveTo(pTop[i].x, pTop[i].y);
          ctx.lineTo(pTop[next].x, pTop[next].y);
          ctx.lineTo(pBot[next].x, pBot[next].y);
          ctx.lineTo(pBot[i].x, pBot[i].y);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.stroke();
        }

        ctx.beginPath();
        pTop.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.closePath();
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();

        // Speckled stone granite texture
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        for (let j = 0; j < 20; j++) {
          const rx = offsetX + (Math.sin(j * 4.5) * hexRadius * 0.7);
          const rz = offsetZ + (Math.cos(j * 2.3) * hexRadius * 0.7);
          const pt = project(rx, -halfH, rz);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1 + (j % 2), 0, Math.PI * 2);
          ctx.fill();
        }
      };

      drawHexPrism(-hexRadius * 0.52, -hexRadius * 0.3, strokeCol, fillCol);
      drawHexPrism(hexRadius * 0.52, hexRadius * 0.3, 'rgba(76, 242, 194, 0.8)', 'rgba(76, 242, 194, 0.05)');

      // Carbon lock molecules falling into tiles
      const moleculeCount = 4;
      for (let i = 0; i < moleculeCount; i++) {
        const speed = 1.2;
        const timeOffset = rotationAngle * speed + i * (Math.PI / 2);
        const yVal = -110 + (timeOffset * 15) % 110;
        
        const rx = Math.sin(timeOffset * 2) * (w * 0.3);
        const rz = Math.cos(timeOffset * 2) * (d * 0.3);
        
        if (yVal < -halfH) {
          const pt = project(rx, yVal, rz);
          
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 0.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(pt.x - 6, pt.y - 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#4cf2c2';
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(pt.x + 6, pt.y + 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#4cf2c2';
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(pt.x - 6, pt.y - 2);
          ctx.lineTo(pt.x, pt.y);
          ctx.lineTo(pt.x + 6, pt.y + 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(6, 182, 212, 0.9)';
          ctx.font = '7px monospace';
          ctx.fillText('CO2', pt.x - 6, pt.y - 8);
        }
      }
    } 
    else if (name === 'Algae-Reactive Insulation Slabs') {
      // 3. Algae-Reactive Insulation Slabs - Translucent green slab with algae branching capillaries
      const strokeCol = '#10b981';
      const fillCol = 'rgba(16, 185, 129, 0.05)';

      draw3DBox(w, h, d, strokeCol, fillCol);

      const drawAlgaeBranch = (startX: number, startY: number, startZ: number, len: number, angle: number, depth: number) => {
        if (depth > 4) return;
        const endX = startX + Math.sin(angle) * len;
        const endY = startY - len * 0.3;
        const endZ = startZ + Math.cos(angle) * len;

        draw3DLine(startX, startY, startZ, endX, endY, endZ, `rgba(16, 185, 129, ${0.9 - depth * 0.15})`, 2.5 - depth * 0.5);

        drawAlgaeBranch(endX, endY, endZ, len * 0.7, angle + 0.4 + Math.sin(rotationAngle) * 0.1, depth + 1);
        drawAlgaeBranch(endX, endY, endZ, len * 0.7, angle - 0.4 - Math.sin(rotationAngle) * 0.1, depth + 1);
      };

      drawAlgaeBranch(-w * 0.15, halfH - 2, -d * 0.1, h * 1.5, -0.2, 1);
      drawAlgaeBranch(w * 0.15, halfH - 2, d * 0.1, h * 1.5, 0.3, 1);

      const dotCount = 20;
      ctx.fillStyle = '#4cf2c2';
      for (let i = 0; i < dotCount; i++) {
        const seed = i * 4.7 + rotationAngle * 0.8;
        const dist = ((i * 3 + rotationAngle * 5) % (h * 2.5)) / (h * 2.5);
        const x = Math.sin(seed) * (w * 0.25) * dist;
        const y = halfH - dist * h * 0.95;
        const z = Math.cos(seed) * (d * 0.25) * dist;

        const p = project(x, y, z);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } 
    else if (name === 'Thermal Phase-Change Panels') {
      // 4. Thermal Phase-Change Panels - Dual-layer crystalline heat-storage cells
      const strokeCol = '#f97316';
      const fillCol = 'rgba(249, 115, 22, 0.05)';

      draw3DBox(w, h, d, strokeCol, fillCol);

      const cols = 5;
      const rows = 3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = -halfW + 15 + c * ((w - 30) / (cols - 1 || 1));
          const z = -halfD + 15 + r * ((d - 30) / (rows - 1 || 1));
          const y = -halfH + 2;

          const tempWave = Math.sin(rotationAngle * 2.5 - c * 0.6) * 0.5 + 0.5;
          const isLiquid = tempWave > 0.5;

          const p = project(x, y, z);

          ctx.beginPath();
          if (isLiquid) {
            ctx.arc(p.x, p.y, 3 + tempWave * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(249, 115, 22, ${0.4 + tempWave * 0.5})`;
            ctx.fill();
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          } else {
            const size = 3 + (1 - tempWave) * 2;
            ctx.moveTo(p.x, p.y - size);
            ctx.lineTo(p.x + size * 0.6, p.y - size * 0.2);
            ctx.lineTo(p.x + size, p.y);
            ctx.lineTo(p.x + size * 0.6, p.y + size * 0.2);
            ctx.lineTo(p.x, p.y + size);
            ctx.lineTo(p.x - size * 0.6, p.y + size * 0.2);
            ctx.lineTo(p.x - size, p.y);
            ctx.lineTo(p.x - size * 0.6, p.y - size * 0.2);
            ctx.closePath();
            ctx.fillStyle = `rgba(59, 130, 246, ${0.4 + (1 - tempWave) * 0.5})`;
            ctx.fill();
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (let r = 0; r < rows; r++) {
        const z = -halfD + 15 + r * ((d - 30) / (rows - 1 || 1));
        draw3DLine(-halfW, 0, z, halfW, 0, z, 'rgba(255, 255, 255, 0.15)', 0.5);
      }
    } 
    else if (name === 'Recycled Textile Composites') {
      // 5. Recycled Textile Composites - Sleek carbon composite shield with light sheen
      const strokeCol = '#0284c7';
      const fillCol = 'rgba(2, 132, 199, 0.08)';

      draw3DBox(w, h, d, strokeCol, fillCol);

      const gridCount = 10;
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i <= gridCount; i++) {
        const xVal = -halfW + (i / gridCount) * w;
        for (let j = 0; j < 30; j++) {
          const zVal = -halfD + (j / 30) * d;
          const yOffset = Math.sin((xVal * 0.15) + (zVal * 0.08) + rotationAngle * 2) * 2;
          const p1 = project(xVal, -halfH + yOffset, zVal);
          
          ctx.fillStyle = i % 2 === 0 ? 'rgba(76, 242, 194, 0.4)' : 'rgba(6, 182, 212, 0.4)';
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const sweepPos = Math.sin(rotationAngle * 1.5) * halfW;
      for (let k = -halfD; k < halfD; k += 4) {
        const p1 = project(sweepPos - 10, -halfH - 1, k);
        const p2 = project(sweepPos + 10, -halfH - 1, k);
        const glossGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        glossGrad.addColorStop(0, 'rgba(255,255,255,0)');
        glossGrad.addColorStop(0.5, 'rgba(255,255,255,0.25)');
        glossGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glossGrad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p2.x, p2.y + h);
        ctx.lineTo(p1.x, p1.y + h);
        ctx.closePath();
        ctx.fill();
      }
    } 
    else if (name === 'Industrial Bio-Fiber Partition Wall') {
      // 6. Industrial Bio-Fiber Partition Wall - Golden straw agricultural board with hydraulic compression
      const strokeCol = '#fbbf24';
      const fillCol = 'rgba(251, 191, 36, 0.05)';

      draw3DBox(w, h, d, strokeCol, fillCol);

      const stalkCount = 75;
      for (let i = 0; i < stalkCount; i++) {
        const seed = i * 3.7;
        const xStart = -halfW + 10 + (i * 2.3) % (w - 20);
        const zStart = -halfD + 10 + (i * 1.9) % (d - 20);
        const stalkH = (h * 0.8) * (stage > 0 && stage < 6 ? 1.5 : 1);
        const yStart = -stalkH / 2;
        const yEnd = stalkH / 2;

        draw3DLine(xStart, yStart, zStart, xStart + Math.sin(seed) * 2, yEnd, zStart + Math.cos(seed) * 2, 'rgba(251, 191, 36, 0.55)', 1.2);
      }

      if (stage > 0 && stage < 7) {
        const offsetComp = 20 * (1 - stage / 7);
        draw3DBox(w + 10, 4, d + 10, '#9ca3af', 'rgba(156, 163, 175, 0.4)');
        draw3DLine(-w * 0.3, -halfH - offsetComp - 20, 0, -w * 0.3, -halfH, 0, '#ef4444', 3);
        draw3DLine(w * 0.3, -halfH - offsetComp - 20, 0, w * 0.3, -halfH, 0, '#ef4444', 3);
      }
    } 
    else if (name === 'Water-Absorbing Eco Slabs') {
      // 7. Water-Absorbing Eco Slabs - Highly porous stone with flowing neon water filtering
      const strokeCol = '#0284c7';
      const fillCol = 'rgba(2, 132, 199, 0.08)';

      draw3DBox(w, h, d, strokeCol, fillCol);

      const pathwayCount = 10;
      for (let i = 0; i < pathwayCount; i++) {
        const zVal = -halfD + (i / pathwayCount) * d;
        ctx.beginPath();
        for (let yVal = -halfH; yVal <= halfH; yVal += 2) {
          const xOffset = Math.sin(yVal * 0.3 + i * 2) * 8;
          const p = project(xOffset, yVal, zVal);
          if (yVal === -halfH) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(107, 114, 128, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const dropCount = 30;
      ctx.fillStyle = '#60a5fa';
      for (let i = 0; i < dropCount; i++) {
        const speed = 1.5;
        const progress = ((rotationAngle * speed * 25 + i * 15) % 150) / 150;
        const xStart = -halfW + 15 + (i * 37) % (w - 30);
        const zStart = -halfD + 10 + (i * 23) % (d - 20);
        
        const curY = -halfH - 25 + progress * (h + 50);
        const curX = xStart + Math.sin(curY * 0.12 + i) * 6;

        const pt = project(curX, curY, zStart);
        
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, curY < -halfH ? 2 : curY > halfH ? 1.5 : 1.2, 0, Math.PI * 2);
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    } 
    else if (name === 'Modular Flood seawall Blocks') {
      // 8. Modular Flood seawall Blocks - Massive brutalist blocks with turquoise splash curves
      const strokeCol = '#06b6d4';
      const fillCol = 'rgba(6, 182, 212, 0.12)';

      draw3DBox(w * 0.95, h * 1.5, d * 0.9, strokeCol, fillCol);

      ctx.lineWidth = 0.5;
      for (let x = -halfW + 10; x < halfW; x += 25) {
        draw3DLine(x, -halfH, 0, x, halfH, 0, 'rgba(255,255,255,0.25)', 0.8);
      }
      for (let y = -halfH + 5; y < halfH; y += 12) {
        draw3DLine(-halfW, y, 0, halfW, y, 0, 'rgba(255,255,255,0.25)', 0.8);
      }

      const waveCount = 3;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < waveCount; i++) {
        const offset = (rotationAngle * 3 + i * (Math.PI / 1.5)) % (Math.PI * 2);
        ctx.beginPath();
        for (let xVal = -halfW - 30; xVal <= halfW + 30; xVal += 4) {
          const waveHeight = Math.sin(xVal * 0.08 + offset) * 15 * Math.sin(offset);
          const p = project(xVal, halfH - 2 - Math.abs(waveHeight), halfD + 5);
          if (xVal === -halfW - 30) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.4 * Math.sin(offset)})`;
        ctx.stroke();
      }
    } 
    else if (name === 'Eco Soundproof Structures') {
      // 9. Eco Soundproof Structures - Dense acoustic wool block with sound waves damping
      const strokeCol = '#14b8a6';
      const fillCol = 'rgba(20, 184, 166, 0.06)';

      draw3DBox(w, h, d, strokeCol, fillCol);

      for (let i = 0; i < 40; i++) {
        const xs = -halfW + (i * 13.5) % w;
        const ys = -halfH + (i * 3.7) % h;
        const zs = -halfD + (i * 7.9) % d;
        draw3DLine(xs, ys, zs, xs + Math.sin(i) * 12, ys + Math.cos(i) * 3, zs + Math.cos(i) * 12, 'rgba(20, 184, 166, 0.25)', 0.6);
      }

      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let xVal = -halfW - 100; xVal <= halfW; xVal += 3) {
        const depthFactor = xVal < -halfW ? 1.0 : Math.max(0, 1 - (xVal + halfW) / 40);
        const amp = 15 * depthFactor * Math.sin(rotationAngle * 10 + xVal * 0.15);
        const p = project(xVal, amp, 0);
        if (xVal === -halfW - 100) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#ef4444';
      ctx.stroke();

      ctx.beginPath();
      for (let xVal = -halfW; xVal <= halfW + 100; xVal += 3) {
        const depthFactor = xVal < halfW ? 0.05 : 0.08;
        const amp = 15 * depthFactor * Math.sin(rotationAngle * 10 + xVal * 0.15);
        const p = project(xVal, amp, 0);
        if (xVal === -halfW) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#22c55e';
      ctx.stroke();
    } 
    else if (name === 'Compressed Secondary Pulp Sheets') {
      // 10. Compressed Secondary Pulp Sheets - Multi-ply corrugated sheet structure
      const strokeCol = '#d97706';
      const fillCol = 'rgba(217, 119, 6, 0.04)';

      const topY = -halfH;
      const botY = halfH;

      draw3DBox(w, 2, d, strokeCol, 'rgba(217, 119, 6, 0.15)');
      
      ctx.save();
      ctx.translate(0, h);
      draw3DBox(w, 2, d, strokeCol, 'rgba(217, 119, 6, 0.15)');
      ctx.restore();

      ctx.beginPath();
      for (let xVal = -halfW; xVal <= halfW; xVal += 3) {
        const wavyY = (topY + botY) / 2 + Math.sin(xVal * 0.15) * (h * 0.45);
        const p = project(xVal, wavyY, 0);
        if (xVal === -halfW) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      if (stage > 0 && stage < 7) {
        const rollRadius = 15;
        const rollAngle = rotationAngle * 4;
        
        const pRoll = project(-halfW - 20, 0, 0);
        ctx.beginPath();
        ctx.arc(pRoll.x, pRoll.y, rollRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(156, 163, 175, 0.4)';
        ctx.fill();
        ctx.strokeStyle = '#9ca3af';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pRoll.x, pRoll.y);
        ctx.lineTo(pRoll.x + Math.cos(rollAngle) * rollRadius, pRoll.y + Math.sin(rollAngle) * rollRadius);
        ctx.moveTo(pRoll.x, pRoll.y);
        ctx.lineTo(pRoll.x + Math.cos(rollAngle + Math.PI) * rollRadius, pRoll.y + Math.sin(rollAngle + Math.PI) * rollRadius);
        ctx.stroke();
      }
    } 
    else {
      draw3DBox(w, h, d, '#4cf2c2', 'rgba(76, 242, 194, 0.1)', [2, 2]);
    }
  };

  // Loop 1: Synthesis Cinematic Animation
  useEffect(() => {
    if (!isSynthesizing || !synthesisCanvasRef.current) return;

    const canvas = synthesisCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      angle: number;
      speed: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        color: i % 3 === 0 ? '#4cf2c2' : i % 3 === 1 ? '#7bffd9' : '#06b6d4',
        size: Math.random() * 2.5 + 1.2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.8 + 0.3
      });
    }

    let pulseRadius = 0;
    let rotationAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      rotationAngle += 0.015;

      if (canvas.offsetWidth !== width || canvas.offsetHeight !== height) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Stage 1-2: floating feedstock raw capsules
      if (synthesisStage <= 2) {
        particles.forEach((p, idx) => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          if (p.x < 0 || p.x > width) p.angle = Math.PI - p.angle;
          if (p.y < 0 || p.y > height) p.angle = -p.angle;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        for (let i = 0; i < 3; i++) {
          const capX = cx + Math.cos(rotationAngle + i * 2) * 80;
          const capY = cy + Math.sin(rotationAngle + i * 2) * 50;
          ctx.strokeStyle = 'rgba(76, 242, 194, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(capX, capY, 16, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(76, 242, 194, 0.08)';
          ctx.fill();
          
          ctx.fillStyle = '#fff';
          ctx.font = '7px monospace';
          ctx.fillText(`RAW-0${i+1}`, capX - 15, capY + 3);
        }
      }

      // Stage 3-5: molecular streams pulling towards center & energy pulse
      if (synthesisStage >= 3 && synthesisStage <= 5) {
        particles.forEach((p) => {
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 10) {
            p.x += (dx / dist) * 2.8;
            p.y += (dy / dist) * 2.8;
          }

          ctx.strokeStyle = p.color + '18';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(cx, cy);
          ctx.stroke();

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
        });

        if (synthesisStage === 4) {
          pulseRadius += 7;
          if (pulseRadius > width / 2) pulseRadius = 0;
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - pulseRadius / (width / 2)})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(76, 242, 194, 0.06)';
          ctx.beginPath();
          ctx.arc(cx, cy, pulseRadius / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Stage 5-7: blueprint pathway grids & laser scanning sweep
      if (synthesisStage >= 5 && synthesisStage <= 7) {
        ctx.strokeStyle = 'rgba(76, 242, 194, 0.14)';
        ctx.lineWidth = 1;
        const pts = [
          { x: cx - 110, y: cy - 70 }, { x: cx + 110, y: cy - 70 },
          { x: cx + 130, y: cy + 50 }, { x: cx - 130, y: cy + 50 },
          { x: cx, y: cy - 110 }, { x: cx, y: cy + 90 }
        ];

        ctx.beginPath();
        pts.forEach((pt, i) => {
          pts.forEach(p2 => {
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(p2.x, p2.y);
          });
        });
        ctx.stroke();

        pts.forEach((pt, i) => {
          ctx.fillStyle = i % 2 === 0 ? '#4cf2c2' : '#06b6d4';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.stroke();
        });

        const sweepY = cy + Math.sin(Date.now() / 140) * 70;
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx - 160, sweepY);
        ctx.lineTo(cx + 160, sweepY);
        ctx.stroke();

        const laserGlow = ctx.createLinearGradient(cx, sweepY - 18, cx, sweepY + 18);
        laserGlow.addColorStop(0, 'rgba(34, 197, 94, 0)');
        laserGlow.addColorStop(0.5, 'rgba(34, 197, 94, 0.18)');
        laserGlow.addColorStop(1, 'rgba(34, 197, 94, 0)');
        ctx.fillStyle = laserGlow;
        ctx.fillRect(cx - 160, sweepY - 18, 320, 36);

        // Render early wireframe outline fading in
        const fadeOpacity = (synthesisStage - 4.5) * 0.35;
        ctx.save();
        ctx.globalAlpha = Math.min(Math.max(fadeOpacity, 0.1), 0.9);
        drawComplexBespoke3DProduct(
          canvas,
          ctx,
          selectedProductPossibility.name,
          rotationAngle,
          customRatio,
          customWidth,
          customLength,
          customThickness,
          synthesisStage,
          0
        );
        ctx.restore();
      }

      // Stage 8-10: Solid final product spinning
      if (synthesisStage >= 8) {
        drawComplexBespoke3DProduct(
          canvas,
          ctx,
          selectedProductPossibility.name,
          rotationAngle,
          customRatio,
          customWidth,
          customLength,
          customThickness,
          synthesisStage,
          0
        );

        ctx.strokeStyle = 'rgba(76, 242, 194, 0.7)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx - 100, cy); ctx.lineTo(cx - 140, cy);
        ctx.moveTo(cx + 100, cy); ctx.lineTo(cx + 140, cy);
        ctx.stroke();

        ctx.fillStyle = '#4cf2c2';
        ctx.font = 'bold 8px monospace';
        ctx.fillText(`STRENGTH: NOMINAL`, cx - 195, cy - 5);
        ctx.fillText(`CIRCULARITY: ${selectedProductPossibility.circularityScore}%`, cx + 145, cy - 5);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isSynthesizing, synthesisStage, selectedProductPossibility, customRatio, customWidth, customLength, customThickness]);

  // Loop 2: Detail Product Interactive Viewer
  useEffect(() => {
    if (!revealFinalProduct || !detailCanvasRef.current) return;

    const canvas = detailCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let rotationAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      rotationAngle += 0.009;

      if (canvas.offsetWidth !== width || canvas.offsetHeight !== height) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }

      const cx = width / 2;
      const cy = height / 2;

      // Draw the rotating fully-textured 3D custom model
      drawComplexBespoke3DProduct(
        canvas,
        ctx,
        selectedProductPossibility.name,
        rotationAngle,
        customRatio,
        customWidth,
        customLength,
        customThickness,
        0,
        0
      );

      // Rotating interactive blueprint rings
      ctx.strokeStyle = 'rgba(76, 242, 194, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, 125, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(76, 242, 194, 0.3)';
      ctx.font = '6px monospace';
      ctx.fillText(`YAW: ${rotationAngle.toFixed(2)} RAD`, 15, height - 15);
      ctx.fillText(`PITCH: 0.45 RAD`, width - 85, height - 15);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [revealFinalProduct, selectedProductPossibility, customRatio, customWidth, customLength, customThickness]);

  // Handle the cinematic generation sequence
  const triggerCinematicSynthesis = () => {
    setIsSynthesizing(true);
    setRevealFinalProduct(false);
    setSynthesisStage(1);
    setSynthesisLogs(['Initiating AI Circular Manufacturing Protocol...']);

    const steps = [
      { delay: 400, msg: '1. Floating raw feedstock aggregate into holographic vacuum chamber...' },
      { delay: 800, msg: '2. Separating materials into physical molecular composite streams...' },
      { delay: 1200, msg: '3. Activating sub-particle XGBoost sorting matrix v4.1...' },
      { delay: 1600, msg: '4. Initiating high-temperature AI Energy Pulse...' },
      { delay: 2000, msg: '5. Binding raw aggregate lattices under 2400kN compression...' },
      { delay: 2400, msg: '6. Laying down optimal non-toxic robotic curing pathway map...' },
      { delay: 2800, msg: '7. Progressive structure formation - Porous cell mesh complete...' },
      { delay: 3200, msg: '8. Sintering surface texture layers for maximal load distribution...' },
      { delay: 3600, msg: '9. Directing carbon-avoidance credit indexing protocols...' },
      { delay: 4000, msg: '10. Physical twin registered. Finalizing blueprint specs...' }
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
              'Synthesis Matrix Sintered',
              `"${selectedProductPossibility.name}" successfully cast at ${customPrice}. Blueprint added to Active catalog.`,
              'success'
            );
          }, 400);
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
            {t('Advanced Design Studio')}
          </span>
          <h1 className="font-display-hero text-4xl md:text-5xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('innovationLabTitle')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1.5 max-w-2xl">
            {t('Sift, separate, and synthesize secondary industrial byproducts into premium architectural building blocks with high-impact animations.')}
          </p>
        </div>
        <div className="glass-panel px-5 py-2.5 rounded-full flex items-center gap-3 border border-outline-variant/30">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="font-metadata text-xs text-on-surface font-semibold">{t('Curing Chamber Stable')}</span>
        </div>
      </header>

      {/* STEP 1: RAW MATERIAL VISUALIZATION */}
      <section className="glass-panel rounded-2xl p-6 border border-outline-variant/20 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/15 pb-4">
          <span className="material-symbols-outlined text-primary">layers</span>
          <div>
            <h2 className="font-headline-md text-base font-bold text-on-background">Step 1 — Raw Material Ingestion Inquest</h2>
            <p className="text-[10px] text-on-surface-variant">Verify chemical fractions, purity scales, and contamination constraints before synthesis.</p>
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
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between min-h-[150px] relative overflow-hidden ${
                    isActive 
                      ? 'bg-primary-container/10 border-primary shadow-[0_0_15px_rgba(76,242,194,0.1)]' 
                      : 'bg-surface/40 border-outline-variant/15 hover:border-primary/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-metadata text-[8px] bg-primary/10 text-primary font-extrabold px-1.5 py-0.5 rounded uppercase">Sieve Ingested</span>
                      <h4 className="text-sm font-extrabold text-on-background mt-2">{mat.name}</h4>
                      <p className="text-[9px] text-on-surface-variant font-bold mt-0.5">{mat.category}</p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-xl animate-pulse">grain</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mt-4 text-[9.5px] font-semibold text-on-surface-variant border-t border-outline-variant/10 pt-3">
                    <div>
                      <span>Quantity</span>
                      <p className="text-on-background font-bold">{mat.volume}</p>
                    </div>
                    <div>
                      <span>Purity</span>
                      <p className="text-primary font-bold">{mat.purity}%</p>
                    </div>
                    <div>
                      <span>Contamination</span>
                      <p className="text-secondary font-bold">{mat.contamination}%</p>
                    </div>
                    <div>
                      <span>Ph Index</span>
                      <p className="text-on-background font-bold">{mat.ph}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Raw Capsule / Contamination Map */}
          <div className="lg:col-span-4 bg-surface-container-low/40 border border-outline-variant/15 p-5 rounded-2xl flex flex-col justify-between h-[320px] relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent pointer-events-none" />
            <div>
              <span className="font-label-caps text-[8px] text-primary border border-primary/20 bg-primary-container/10 px-2 py-0.5 rounded uppercase font-bold">Micro-Molecular Scan</span>
              <h3 className="text-sm font-bold text-on-background mt-2">{selectedMaterial.name}</h3>
              
              <div className="mt-4 space-y-2 text-xs font-semibold text-on-surface-variant">
                <div className="flex justify-between">
                  <span>Structural Integrity</span>
                  <span className="text-primary font-bold">{selectedMaterial.consistency}% Consistency</span>
                </div>
                <div className="flex justify-between">
                  <span>Contamination Map</span>
                  <span className="text-secondary font-bold">{selectedMaterial.contamination}% Silica/Dye mix</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Market Base Value</span>
                  <span className="text-primary font-bold">₹14,800/T</span>
                </div>
              </div>
            </div>

            {/* Simulated Animated Contamination Canvas Map */}
            <div className="w-full h-28 bg-surface-container-lowest border border-outline-variant/20 rounded-xl flex items-center justify-around relative overflow-hidden p-2">
              <div className="absolute inset-0 bg-[radial-gradient(#4cf2c2_1px,transparent_1px)] [background-size:8px_8px] opacity-15" />
              <div className="w-1/3 h-full flex flex-col justify-around items-center relative">
                <div className="w-8 h-8 rounded-full border border-primary/40 relative flex items-center justify-center animate-pulse">
                  <span className="text-[8px] text-primary font-bold font-mono">PUR</span>
                </div>
                <span className="text-[7.5px] font-bold text-primary">Purity: {selectedMaterial.purity}%</span>
              </div>
              <div className="w-1/3 h-full flex flex-col justify-around items-center relative">
                <div className="w-8 h-8 rounded-full border border-secondary/40 relative flex items-center justify-center animate-bounce">
                  <span className="text-[8px] text-secondary font-bold font-mono">CON</span>
                </div>
                <span className="text-[7.5px] font-bold text-secondary">Contam: {selectedMaterial.contamination}%</span>
              </div>
              <div className="w-1/3 h-full flex flex-col justify-around items-center relative">
                <div className="w-8 h-8 rounded-full border border-outline-variant/40 relative flex items-center justify-center">
                  <span className="text-[8px] text-on-surface font-bold font-mono">pH</span>
                </div>
                <span className="text-[7.5px] font-bold text-on-surface">pH: {selectedMaterial.ph}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2 & 3: SUGGESTION ENGINE & DESIGN CONTROL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Step 2 — 10 AI Product suggestions (Col Span 6) */}
        <section className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-outline-variant/20 flex flex-col gap-4">
          <div className="border-b border-outline-variant/15 pb-3">
            <h2 className="font-headline-md text-base font-bold text-on-background">Step 2 — AI Circular Sintering Suggestion Engine</h2>
            <p className="text-[10px] text-on-surface-variant">Review 10 pre-simulated futuristic physical byproduct aggregates.</p>
          </div>

          <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin">
            {PRODUCT_POSSIBILITIES.map((poss) => {
              const isSelected = selectedProductPossibility.name === poss.name;
              return (
                <button
                  key={poss.name}
                  onClick={() => setSelectedProductPossibility(poss)}
                  className={`text-left p-3 rounded-xl border transition-all flex justify-between items-center ${
                    isSelected 
                      ? 'bg-secondary-container/10 border-secondary shadow-md scale-[1.01]' 
                      : 'bg-surface/30 border-outline-variant/15 hover:border-secondary'
                  }`}
                >
                  <div className="max-w-[70%]">
                    <h4 className="text-xs font-extrabold text-on-background flex items-center gap-1.5">
                      {poss.name}
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />}
                    </h4>
                    <p className="text-[9.5px] text-on-surface-variant mt-0.5 truncate">{poss.desc}</p>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    <span className="text-xs font-extrabold text-primary">{poss.roi} ROI</span>
                    <p className="text-[9px] text-on-surface-variant font-bold mt-0.5">Value: {poss.price}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3 — Industry product design control (Col Span 6) */}
        <section className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-[#7A928A]/20 flex flex-col justify-between">
          <div>
            <div className="border-b border-outline-variant/15 pb-3 mb-5">
              <h2 className="font-headline-md text-base font-bold text-on-background">Step 3 — Tactical Design Controls</h2>
              <p className="text-[10px] text-on-surface-variant">Adjust raw material ratio, size metrics, and configure circular targets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-semibold text-xs text-on-surface">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>Sieve Aggregate Ratio</span>
                    <span className="text-primary font-mono">{customRatio}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="95" 
                    value={customRatio}
                    onChange={(e) => setCustomRatio(parseInt(e.target.value))}
                    className="w-full accent-primary bg-outline-variant/20 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span>Lattice Purity Target</span>
                    <span className="text-secondary font-mono">{customPurity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="99" 
                    value={customPurity}
                    onChange={(e) => setCustomPurity(parseInt(e.target.value))}
                    className="w-full accent-secondary bg-outline-variant/20 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant">Curing Complexity Factor</label>
                  <div className="flex justify-between items-center p-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 font-mono text-[10px]">
                    <span>Stage Sequences</span>
                    <span className="text-on-background font-bold">{customComplexity} steps</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant">Custom Physical Dimensions</label>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                    <div className="space-y-1">
                      <span className="text-on-surface-variant text-[8px]">Width (cm)</span>
                      <input 
                        type="number" 
                        value={customWidth} 
                        onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-on-surface-variant text-[8px]">Length (cm)</span>
                      <input 
                        type="number" 
                        value={customLength} 
                        onChange={(e) => setCustomLength(parseInt(e.target.value) || 0)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-on-surface-variant text-[8px]">Thick (cm)</span>
                      <input 
                        type="number" 
                        value={customThickness} 
                        onChange={(e) => setCustomThickness(parseInt(e.target.value) || 0)}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant">Target Market Value (₹)</label>
                  <input 
                    type="text" 
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-2 px-3 font-semibold text-on-background focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-on-surface-variant">Sustainability Optimization Target</label>
                  <select 
                    value={sustainabilityGoal} 
                    onChange={(e) => setSustainabilityGoal(e.target.value as any)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-2 px-2.5 font-semibold text-on-background focus:outline-none text-[10px]"
                  >
                    <option value="CARBON_MIN">Minimum Embedded Carbon (-80%)</option>
                    <option value="WATER_REUSE">Zero Wastewater Leakage</option>
                    <option value="ZEROWASTE">100% Recyclable Lifecycle</option>
                    <option value="HIGH_DURABILITY">High Load Compressive Strength</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={triggerCinematicSynthesis}
            className="w-full mt-6 py-3.5 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm animate-spin-slow">auto_awesome</span>
            Start AI Sieve Synthesis Chamber
          </button>
        </section>

      </div>

      {/* STEP 4: CINEMATIC RECONSTRUCTION VIEWPORT PORTAL */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-3xl bg-surface border border-primary-container p-6 rounded-3xl shadow-[0_0_60px_rgba(76,242,194,0.25)] relative overflow-hidden flex flex-col md:flex-row gap-6 min-h-[420px]">
            
            {/* Holographic synthesis particle viewport */}
            <div className="flex-1 min-h-[300px] bg-surface-container-low border border-outline-variant/15 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center">
              <canvas ref={synthesisCanvasRef} className="w-full h-full absolute inset-0" />
              <div className="absolute top-4 left-4 bg-surface-container-lowest/90 px-3 py-1.5 rounded-full border border-outline-variant/20 text-[9px] font-bold text-primary animate-pulse">
                HOLOGRAPHIC ASSEMBLY VIEWPORT
              </div>
              <div className="absolute bottom-4 right-4 bg-surface-container-lowest/90 px-3 py-1 text-[8px] font-bold text-on-surface-variant font-mono">
                STAGE_INDEX: {synthesisStage}/10
              </div>
            </div>

            {/* Stepper process list log */}
            <div className="w-full md:w-5/12 flex flex-col justify-between text-xs font-semibold">
              <div className="space-y-4">
                <span className="font-label-caps text-[9px] text-primary border border-primary/20 bg-primary-container/10 px-2.5 py-1 rounded-full uppercase font-bold">Curing Matrix Output</span>
                <h3 className="text-sm font-extrabold text-on-background mt-1">Sintering Aggregate...</h3>
                
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto text-[9px] font-mono text-on-surface-variant leading-relaxed">
                  {synthesisLogs.map((log, idx) => {
                    const isLast = idx === synthesisLogs.length - 1;
                    return (
                      <p key={`log-${idx}`} className={`border-b border-outline-variant/5 pb-1 ${isLast ? 'text-primary font-bold animate-pulse' : ''}`}>
                        {log}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Progress bar and numeric step indicator */}
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-[10px] font-bold text-primary">
                  <span>Molecular Bonding Alignment</span>
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
        <section className="glass-panel p-6 rounded-3xl border border-primary-container bg-primary-container/[0.01] animate-slide-up space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#4cf2c2_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
          
          <div className="border-b border-primary-container/30 pb-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <span className="font-label-caps text-[9px] text-primary bg-primary/10 border border-primary px-3 py-1 rounded-full uppercase font-extrabold">Final Synthesis Manifested</span>
              <h3 className="font-display-hero text-2xl text-on-background font-extrabold mt-3">{selectedProductPossibility.name}</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Physical Aggregate Blueprint and Compressive Compliance specs formulated successfully.</p>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => {
                  addNotification('Concept Manifest Saved', `Blueprint for "${selectedProductPossibility.name}" stored in Vance catalogs.`, 'success');
                  setRevealFinalProduct(false);
                }}
                className="py-2.5 px-5 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary transition-all"
              >
                Add to Catalog
              </button>
              <button 
                onClick={() => {
                  addNotification('Bilateral Listing Setup', `Listing for ${selectedProductPossibility.name} configured on secondary market.`, 'success');
                  setRevealFinalProduct(false);
                }}
                className="py-2.5 px-5 border border-primary text-primary font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/10 transition-all"
              >
                List on Marketplace
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold relative z-10">
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

          {/* Hologram product spinning box next to blueprint specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
            <div className="lg:col-span-4 bg-surface-container-low border border-outline-variant/15 p-5 rounded-2xl flex flex-col items-center justify-center min-h-[250px] relative">
              <canvas ref={detailCanvasRef} className="w-full h-full absolute inset-0" />
              <span className="font-metadata text-[8px] text-primary/80 absolute bottom-3 font-bold uppercase tracking-widest bg-surface/90 px-3 py-1 rounded-full border border-primary/20">3D Blueprint Rotating Viewer</span>
            </div>

            <div className="lg:col-span-8 p-5 bg-surface-container-low/40 border border-outline-variant/15 rounded-2xl flex flex-col justify-between">
              <div>
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
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                      <span>Required machinery sequence</span>
                      <span className="text-on-background font-bold">{selectedProductPossibility.machine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Dimensions</span>
                      <span className="text-primary font-bold">{customWidth}cm x {customLength}cm x {customThickness}cm</span>
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
                    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
                      <span>Active buyer pipelines matched</span>
                      <span className="text-secondary font-bold">{selectedProductPossibility.buyers} procurement nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>embedded circularity rating</span>
                      <span className="text-secondary font-bold font-mono">{selectedProductPossibility.circularityScore}% score</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Composition ingredients breakdown bar */}
              <div className="border-t border-outline-variant/15 pt-4 mt-4">
                <span className="text-[9px] uppercase font-bold text-on-surface-variant block mb-2">Molecular Material Composition Breakdown</span>
                <div className="flex h-5 rounded-lg overflow-hidden border border-outline-variant/20 text-[9px] font-mono text-white text-center font-bold">
                  <div className="bg-primary flex items-center justify-center transition-all" style={{ width: `${customRatio}%` }}>
                    Feedstock ({customRatio}%)
                  </div>
                  <div className="bg-secondary flex items-center justify-center transition-all" style={{ width: `${100 - customRatio - 10}%` }}>
                    Binder ({100 - customRatio - 10}%)
                  </div>
                  <div className="bg-cyan-500 flex items-center justify-center transition-all" style={{ width: '10%' }}>
                    Additive (10%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
