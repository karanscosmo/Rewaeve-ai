---
name: Living Environmental Intelligence
colors:
  surface: '#f4fbf6'
  surface-dim: '#d5dcd7'
  surface-bright: '#f4fbf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff5f0'
  surface-container: '#e9efea'
  surface-container-high: '#e3eae5'
  surface-container-highest: '#dde4df'
  on-surface: '#171d1a'
  on-surface-variant: '#3d4a44'
  inverse-surface: '#2b322f'
  inverse-on-surface: '#ecf2ed'
  outline: '#6d7a73'
  outline-variant: '#bccac2'
  surface-tint: '#006c52'
  primary: '#006c52'
  on-primary: '#ffffff'
  primary-container: '#7fffd4'
  on-primary-container: '#00765b'
  inverse-primary: '#5adcb3'
  secondary: '#006a64'
  on-secondary: '#ffffff'
  secondary-container: '#61f6ea'
  on-secondary-container: '#006f69'
  tertiary: '#006b56'
  on-tertiary: '#ffffff'
  tertiary-container: '#7bffd9'
  on-tertiary-container: '#00765f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#79f9ce'
  primary-fixed-dim: '#5adcb3'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513d'
  secondary-fixed: '#65f8ed'
  secondary-fixed-dim: '#40dcd1'
  on-secondary-fixed: '#00201e'
  on-secondary-fixed-variant: '#00504b'
  tertiary-fixed: '#67fbd3'
  tertiary-fixed-dim: '#44deb7'
  on-tertiary-fixed: '#002018'
  on-tertiary-fixed-variant: '#005140'
  background: '#f4fbf6'
  on-background: '#171d1a'
  surface-variant: '#dde4df'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '300'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.04em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.03em
  body-large:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-main:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
  metadata:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  safe-area: 4rem
  module-gap: 2rem
  internal-padding: 1.5rem
  glass-blur: 24px
---

## Brand & Style
This design system embodies the intersection of heavy industry and biological preservation. The brand personality is "Living Environmental Intelligence"—a sophisticated, cinematic aesthetic that prioritizes breathability and spatial awareness. The target audience includes industrial architects, sustainability officers, and AI operators who require deep focus without the fatigue of traditional enterprise dashboards.

The visual style leverages **Glassmorphism** and **Spatial UI** principles. Elements are treated as physical objects floating in a high-fidelity light-filled environment. The atmosphere is immersive and fluid, moving away from rigid, static structures toward a modular, organic interface that feels like an extension of the natural world.

## Colors
The palette is rooted in "Environmental White," providing a pristine, airy canvas that mimics diffused natural light. The primary interaction language is driven by **Neon Mint Green** and **Aqua Teal**, used specifically for actionable intelligence and data visualization. 

**Graphite Black** is reserved strictly for high-impact typography to maintain readability against translucent layers. **Soft Sage** acts as the utilitarian bridge, used for secondary metadata and inactive states. Holographic Cyan Green is applied sparingly as a glow effect to signify active AI processing or "living" data streams.

## Typography
The typographic system utilizes **Inter** with a specific focus on generous tracking (letter-spacing) to enhance the "breathable" quality of the UI. Headlines should feel architectural and light, often using lower weights at larger scales to maintain a premium feel. 

Hierarchy is established through weight variance and case styling. Labels and technical data points utilize uppercase styling with wide tracking to evoke an industrial, calibrated aesthetic. Body text prioritizes legibility with a comfortable line height to prevent visual density.

## Layout & Spacing
This design system rejects standard sidebars and rigid grids in favor of a **Spatial Module** approach. Layouts are constructed as floating clusters centered within the viewport. 

- **Safe Areas:** Large peripheral margins (minimum 64px) ensure the UI feels unconfined.
- **Floating Panels:** Content is grouped into modular glass panels that "orbit" the center of the screen.
- **Dynamic Padding:** Elements within panels use generous internal spacing to allow the background textures to influence the mood of the interface.
- **Z-Axis layering:** Importance is indicated by the scale and forward-positioning of a module rather than its placement on a vertical list.

## Elevation & Depth
Depth is the primary navigator in this design system. We use a **Layered Translucent Glass** system to define hierarchy:

1.  **The Environment (Level 0):** The base layer is a subtle gradient of #FCFFFC and #F7FFF9.
2.  **Floating Modules (Level 1):** Semi-transparent white glass surfaces with a 24px backdrop blur and a 1px "Silver-Green" (#7A928A at 20% opacity) outline.
3.  **Active Intelligence (Level 2):** Elements in focus gain a **Holographic Glow**. This is achieved through a soft, diffused outer shadow using #4CF2C2 at low opacity (15-20%).
4.  **Interaction Hover:** When a user interacts with a module, it subtly scales forward (1.02x) and the border brightness increases to Neon Mint (#7FFFD4).

## Shapes
The shape language is "Industrial Organic." All floating panels and interactive components use **Rounded** (0.5rem to 1.5rem) corners to soften the industrial data. 

- **Containers:** Large modular panels use `rounded-xl` (1.5rem) to feel like safe, self-contained units.
- **Interaction Nodes:** Buttons and input fields use `rounded-lg` (1rem) for a tactile, approachable feel.
- **Indicators:** Small status dots and data markers are fully circular (pill-shaped) to represent "circular intelligence."

## Components
- **Glass Cards:** The primary container. Must have a backdrop-filter blur, a semi-transparent background, and a thin silver-green outline. No heavy drop shadows; use "inner glow" or "rim lighting" to define edges.
- **Holographic Buttons:** Buttons do not have solid fills. They feature a mint-green border, high-impact black text, and a subtle holographic inner gradient that activates on hover.
- **Floating Navigation:** A bottom-centered or top-centered pill-shaped bar, decoupled from the screen edges, containing iconography with generous spacing.
- **Status Chips:** Small, translucent capsules with a glowing neon dot to indicate system health or "Living Intelligence" status.
- **Input Fields:** Minimalist lines or soft-glass wells. The cursor and focus state should trigger a mint-green "aura" around the field.
- **Modular Gauges:** Circular data visualizations that use Aqua Teal and Neon Mint gradients to represent flow, recycling rates, and AI confidence.