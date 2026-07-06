# Figma File Organization

Complete specification for structuring the CredZo Figma file. Enforce this structure on every MCP session.

## Page Structure

The Figma file must have exactly these 9 pages in this order:

```
01 Foundations
02 Tokens
03 Styles
04 Atoms
05 Molecules
06 Organisms
07 Templates
08 Screens
09 Prototypes
```

Never rename, reorder, or remove pages. Add sub-pages only inside page groups if the tool supports it.

---

## Page 01 — Foundations

Purpose: Visual reference for all raw design decisions.

Sections to create as frames on this page:

```
Foundation/ColorPalette
  → All primitive color swatches organized by family
  → Brand, Neutral, Success, Warning, Error, Gold
  → Each swatch: 80×80px square, token name below, HEX value below name

Foundation/Typography
  → Every type style rendered as a live text sample
  → Ordered: Heading XL → Caption → Overline → Amount
  → Show font name, weight, size, line-height beside each sample

Foundation/Spacing
  → Visual ruler showing spacing.1 through spacing.32
  → Use colored bars of exact pixel height with label

Foundation/Radius
  → Six boxes showing each radius.* value
  → Label each with token name and pixel value

Foundation/Elevation
  → Five cards showing elevation.1 through elevation.5
  → On white background to make shadows visible

Foundation/Grid
  → 390px mobile frame with grid overlay
  → Show margin (20px), columns (4), gutter (16px)
  → Annotate safe areas (44px top, 34px bottom)

Foundation/IconLibrary
  → All icons used in the CredZo system at 24px
  → Organized by category: Navigation, Actions, Status, Finance, AI
```

---

## Page 02 — Tokens

Purpose: Document the variable architecture. All Figma Variables live here.

Variable Collections to create via Figma Variables panel:

```
Collection 1: Primitives
  Groups: Color, Spacing, Typography, Radius, Elevation, Opacity, Border

Collection 2: Semantic
  Groups: color.*, spacing.*, typography.*, radius.*, elevation.*

Collection 3: Component
  Groups: button.*, input.*, card.*, nav.*
```

Also create a documentation frame on this page:

```
Token/Architecture-Map
  → Visual diagram showing Primitive → Semantic → Component hierarchy
  → Annotate with examples: brand-500 → color.brand.primary → button.background.default

Token/ColorMap
  → Table: Token name | Primitive ref | Light value | Dark value (future)

Token/SpacingMap
  → Table: Token name | px value | Use case

Token/TypographyMap
  → Table: Token name | Font | Weight | Size | Line-height
```

---

## Page 03 — Styles

Purpose: All Figma Styles (text, color, effects, grids) registered and visible.

Frames to create:

```
Styles/TextStyles
  → Every text style applied to a sample sentence
  → Organized as: Heading → Body → Label → Caption → Overline → Amount

Styles/ColorStyles
  → Swatches for every color style
  → Grouped: Surface | Text | Brand | Border | State | Icon

Styles/EffectStyles
  → Cards showing each Elevation style applied
  → Cards showing Blur styles

Styles/GridStyles
  → Frame showing Grid/Mobile/Default layout grid
  → Frame showing Grid/Mobile/Full-Bleed
```

---

## Page 04 — Atoms

Purpose: Base-level reusable components. All components here are source-of-truth.

Component frames to organize:

```
Atoms/Buttons
  → All Button/* variants in a single frame
  → Show Default, Hover, Pressed, Disabled, Loading states side-by-side

Atoms/Inputs
  → All Input/* variants
  → Show all states: Empty, Focused, Filled, Error, Disabled

Atoms/Icons
  → Icon grid: all icon atoms at 16px, 20px, 24px

Atoms/Badges
  → Badge/Status/* all variants
  → Badge/Notification/*

Atoms/Avatars
  → Avatar/* all size and type variants

Atoms/Chips
  → Chip/Filter/* variants

Atoms/Misc
  → Dividers, progress bars, toggles, checkboxes, radio buttons
```

Layout on page: Each group in a titled frame, 40px padding, 24px gap between components.

---

## Page 05 — Molecules

Purpose: Composed components with single purpose.

```
Molecules/Cards
  → Card/CreditSummary/*
  → Card/Transaction/*
  → Card/Repayment/*
  → Card/Insight/*
  → Card/KYC-Status/*
  → Card/Notification/*

Molecules/Navigation
  → Nav/Tab/* all variants
  → Nav/TopBar/* all variants

Molecules/Forms
  → Input/OTP/* (6-digit molecule)
  → Input/Phone/* with country selector
  → Input/Amount/* with currency prefix

Molecules/AI
  → ai_assistant_card
  → ai_chat_bubble_agent
  → ai_chat_bubble_user
  → ai_insight_chip

Molecules/Repayment
  → Repayment due module
  → EMI schedule item
```

---

## Page 06 — Organisms

Purpose: Complex UI sections composed of molecules.

```
Organisms/Onboarding
  → Onboarding/Hero
  → Onboarding/StepIndicator

Organisms/Dashboard
  → Dashboard/Header
  → Dashboard/CreditSummarySection
  → Dashboard/TransactionListSection
  → Dashboard/AIInsightSection

Organisms/Navigation
  → Nav/BottomBar/Default (with all 5 tab states)
  → Nav/BottomBar/WithNotification

Organisms/Repayment
  → Repayment/Panel
  → Repayment/ScheduleList

Organisms/AI
  → AIAssistant/InteractionBlock
  → AIAssistant/InsightFeed

Organisms/KYC
  → KYC/DocumentUploader
  → KYC/StatusBanner
```

---

## Page 07 — Templates

Purpose: Layout shells without real content (slots only).

```
Template/Onboarding
Template/Dashboard
Template/Detail
Template/Modal
Template/BottomSheet
Template/Confirmation
Template/Empty-State
```

All templates: 390px wide. Content areas shown as placeholder fills with annotation labels.

---

## Page 08 — Screens

Purpose: All production-ready CredZo screens.

Organize screens into groups using Figma frames-as-sections:

```
Screens/Onboarding Flow
  Onboarding/Splash
  Onboarding/Welcome
  Onboarding/PhoneEntry
  Onboarding/OTPVerification
  Onboarding/KYC-Start
  Onboarding/KYC-DocumentUpload
  Onboarding/KYC-Selfie
  Onboarding/KYC-Review
  Onboarding/Success

Screens/Dashboard
  Dashboard/Main
  Dashboard/CreditSummary
  Dashboard/TransactionHistory
  Dashboard/Notifications

Screens/Credit Line
  CreditLine/Eligibility
  CreditLine/Limit-Reveal
  CreditLine/Activation
  CreditLine/Activated

Screens/Repayment
  Repayment/Schedule
  Repayment/SelectAmount
  Repayment/PaymentMethod
  Repayment/Confirmation
  Repayment/Success

Screens/AI Assistant
  AIAssistant/Chat
  AIAssistant/Insights
  AIAssistant/Recommendations

Screens/Profile
  Profile/Main
  Profile/EditDetails
  Profile/Settings
  Profile/Security

Screens/Transactions
  Transactions/List
  Transactions/Detail
```

Screen frame specs:
- Width: 390px
- Height: 844px (iPhone 14 standard) or 812px (iPhone 13)
- Overflow: scroll enabled for content-heavy screens
- Grid: Grid/Mobile/Default applied

---

## Page 09 — Prototypes

Purpose: Connected flows for stakeholder presentation and developer reference.

Prototype flows to create:

```
Flow/Onboarding
  → Splash → Welcome → PhoneEntry → OTPVerification → KYC → Success → Dashboard

Flow/CreditLine
  → Dashboard → CreditLine/Eligibility → Limit-Reveal → Activation → Activated

Flow/Repayment
  → Dashboard → Repayment/Schedule → SelectAmount → PaymentMethod → Confirmation → Success

Flow/AIAssistant
  → Dashboard → AIAssistant/Chat → Insights → Recommendations

Flow/Profile
  → Dashboard → Profile/Main → EditDetails
```

Prototype settings:
- Device: iPhone 14 Pro
- Background: neutral-950
- Starting frame: Onboarding/Splash
- Transition: Smart Animate, 300ms, ease-in-out for screen transitions
- Transition: Slide Up, 250ms for bottom sheets and modals

---

## MCP Execution Order for New File Setup

When setting up a new Figma file from scratch, execute in this sequence:

1. Create all 9 pages with correct names
2. Set up Variable Collections (Primitives → Semantic → Component)
3. Register all Figma Styles (text, color, effects, grids)
4. Build Page 01 Foundations documentation
5. Build Page 02 Tokens documentation frames
6. Build Page 03 Styles documentation
7. Build Atoms (Page 04) — start with Button and Input
8. Build Molecules (Page 05) — start with CreditSummaryCard
9. Build Organisms (Page 06) — start with BottomNav and DashboardHeader
10. Build Templates (Page 07)
11. Build Screens (Page 08) — start with Dashboard/Main and Onboarding/Welcome
12. Wire Prototypes (Page 09)

---

## Layer Panel Hygiene Rules

Apply at all times:

- Group related layers into named frames, never loose groups
- Use auto layout on every container — never position layers manually
- Every frame/component must be in a named section on the correct page
- No orphaned components outside of their designated section
- Components on Pages 04–07 must be Figma Components (not frames)
- Screens on Page 08 must be frames (not components)
- Delete all construction artifacts (helper frames, temp layers) before session ends
