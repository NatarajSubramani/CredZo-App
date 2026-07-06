# Figma Design System MCP Architect

A Claude Code plugin for the CredZo fintech app that converts approved UI mockups into fully structured, production-ready Figma files using Figma MCP integration.

## What This Plugin Does

This plugin activates a Principal Product Designer / Design Systems Architect persona that:

- Pushes production-quality fintech UI directly into the connected Figma file via MCP
- Builds atomic design systems (Atoms → Molecules → Organisms → Templates → Pages)
- Creates and applies semantic design token systems (colors, spacing, typography, radius, elevation)
- Enforces professional naming conventions and scalable layer organization
- Structures Figma files across 9 professional pages (Foundations → Prototypes)
- Ensures all layouts use auto layout with responsive constraints
- Produces developer-friendly, engineer-aligned Figma output

## How to Use

Activate the skill by saying things like:

- "Push the dashboard screen to Figma"
- "Build the design system tokens in Figma"
- "Create the onboarding flow components"
- "Set up the Figma file with the 9-page structure"
- "Create the button component library"
- "Convert the credit line mockup to Figma"
- "Build the atomic component library"
- "Architect the CredZo design system"

## Skills

| Skill | Trigger | Purpose |
|---|---|---|
| `figma-design-system-mcp-architect` | "push to Figma", "build design system", "create components" | Full Figma MCP design system execution |

## Reference Files

The skill includes detailed reference documentation:

| File | Purpose |
|---|---|
| `design-token-architecture.md` | Complete token schema: colors, spacing, typography, radius, elevation, opacity |
| `naming-conventions.md` | Frame, layer, component, and style naming rules |
| `atomic-design-system.md` | Full atomic component specs: Atoms through Pages |
| `figma-file-organization.md` | 9-page Figma structure and MCP execution order |
| `auto-layout-rules.md` | Auto layout configuration for every component type |

## Design Standards

This plugin enforces:

- **Material Design 3** principles for interaction and elevation
- **8pt spacing grid** — all spacing multiples of 8 (4 for micro-spacing)
- **Token-only styling** — no raw HEX values on any layer
- **Atomic Design methodology** — atoms, molecules, organisms, templates, pages
- **WCAG 2.1 AA** accessibility (4.5:1 contrast minimum)
- **Mobile-first** — 390px base frame (iPhone 14)
- **CredZo brand** — brand-500 (#6366F1 Indigo) primary, Inter typeface

## Requirements

- Figma MCP server must be connected and authenticated
- Figma file must be open and accessible via MCP
- For full token setup: Figma Professional or Organization plan (for Variables)
