# Design Token Architecture

Complete token schema for the CredZo Figma design system. All tokens are created as Figma Variables in structured Variable Collections.

## Variable Collection Structure

Create three collections in this order:

```
1. Primitives     — raw values (HEX, px, rem numbers)
2. Semantic       — purpose-mapped aliases pointing to Primitives
3. Component      — component-specific overrides pointing to Semantic
```

## Color Tokens

### Primitive Color Values (CredZo Brand)

```
Brand
  brand-50:   #EEF2FF
  brand-100:  #E0E7FF
  brand-200:  #C7D2FE
  brand-300:  #A5B4FC
  brand-400:  #818CF8
  brand-500:  #6366F1   ← primary brand
  brand-600:  #4F46E5
  brand-700:  #4338CA
  brand-800:  #3730A3
  brand-900:  #312E81

Neutral
  neutral-0:   #FFFFFF
  neutral-50:  #F8FAFC
  neutral-100: #F1F5F9
  neutral-200: #E2E8F0
  neutral-300: #CBD5E1
  neutral-400: #94A3B8
  neutral-500: #64748B
  neutral-600: #475569
  neutral-700: #334155
  neutral-800: #1E293B
  neutral-900: #0F172A
  neutral-950: #020617

Success
  success-50:  #F0FDF4
  success-500: #22C55E
  success-700: #15803D

Warning
  warning-50:  #FFFBEB
  warning-500: #F59E0B
  warning-700: #B45309

Error
  error-50:    #FFF1F2
  error-500:   #EF4444
  error-700:   #B91C1C

Gold (Premium / Credit)
  gold-400:    #FBBF24
  gold-500:    #F59E0B
  gold-600:    #D97706
```

### Semantic Color Tokens

```
color.background.page           → neutral-50
color.background.card           → neutral-0
color.background.overlay        → neutral-900 @ 60% opacity
color.background.input          → neutral-0
color.background.input-disabled → neutral-100

color.surface.primary           → neutral-0
color.surface.secondary         → neutral-50
color.surface.brand             → brand-500
color.surface.brand-subtle      → brand-50
color.surface.success           → success-50
color.surface.warning           → warning-50
color.surface.error             → error-50

color.text.primary              → neutral-900
color.text.secondary            → neutral-500
color.text.tertiary             → neutral-400
color.text.disabled             → neutral-300
color.text.inverse              → neutral-0
color.text.brand                → brand-600
color.text.success              → success-700
color.text.warning              → warning-700
color.text.error                → error-700
color.text.on-brand             → neutral-0

color.brand.primary             → brand-500
color.brand.hover               → brand-600
color.brand.pressed             → brand-700
color.brand.subtle              → brand-50
color.brand.accent              → gold-500

color.border.default            → neutral-200
color.border.strong             → neutral-300
color.border.brand              → brand-500
color.border.error              → error-500
color.border.focus              → brand-400

color.state.success             → success-500
color.state.warning             → warning-500
color.state.error               → error-500
color.state.info                → brand-500

color.icon.default              → neutral-700
color.icon.subtle               → neutral-400
color.icon.brand                → brand-500
color.icon.inverse              → neutral-0
color.icon.success              → success-500
color.icon.error                → error-500
```

## Spacing Tokens

All spacing values follow the 8pt grid. 4pt increments allowed for micro-spacing only.

```
spacing.0:   0px
spacing.1:   4px
spacing.2:   8px
spacing.3:   12px
spacing.4:   16px
spacing.5:   20px
spacing.6:   24px
spacing.8:   32px
spacing.10:  40px
spacing.12:  48px
spacing.16:  64px
spacing.20:  80px
spacing.24:  96px
spacing.32:  128px
```

Semantic spacing aliases:
```
spacing.page-margin:        spacing.5   (20px mobile page margin)
spacing.card-padding:       spacing.4   (16px card inner padding)
spacing.section-gap:        spacing.6   (24px between sections)
spacing.input-padding-x:    spacing.4   (16px)
spacing.input-padding-y:    spacing.3   (12px)
spacing.button-padding-x:   spacing.6   (24px)
spacing.button-padding-y:   spacing.4   (16px)
spacing.nav-height:         spacing.16  (64px)
spacing.header-height:      spacing.14  (56px — use spacing.6 + spacing.8)
```

## Typography Tokens

```
typography.font-family.sans:    'Inter', system-ui, sans-serif
typography.font-family.mono:    'JetBrains Mono', monospace

typography.heading.xl:
  font: Inter
  weight: 700 (Bold)
  size: 32px
  line-height: 40px
  letter-spacing: -0.5px

typography.heading.large:
  font: Inter
  weight: 700 (Bold)
  size: 28px
  line-height: 36px
  letter-spacing: -0.3px

typography.heading.medium:
  font: Inter
  weight: 600 (SemiBold)
  size: 22px
  line-height: 28px
  letter-spacing: -0.2px

typography.heading.small:
  font: Inter
  weight: 600 (SemiBold)
  size: 18px
  line-height: 24px

typography.body.large:
  font: Inter
  weight: 400 (Regular)
  size: 16px
  line-height: 24px

typography.body.medium:
  font: Inter
  weight: 400 (Regular)
  size: 14px
  line-height: 20px

typography.body.small:
  font: Inter
  weight: 400 (Regular)
  size: 12px
  line-height: 16px

typography.label.large:
  font: Inter
  weight: 500 (Medium)
  size: 16px
  line-height: 20px

typography.label.medium:
  font: Inter
  weight: 500 (Medium)
  size: 14px
  line-height: 18px

typography.label.small:
  font: Inter
  weight: 500 (Medium)
  size: 12px
  line-height: 16px

typography.caption:
  font: Inter
  weight: 400 (Regular)
  size: 11px
  line-height: 14px
  letter-spacing: 0.2px

typography.overline:
  font: Inter
  weight: 600 (SemiBold)
  size: 10px
  line-height: 12px
  letter-spacing: 1.2px
  text-transform: uppercase

typography.amount.large:
  font: Inter
  weight: 700 (Bold)
  size: 40px
  line-height: 48px
  letter-spacing: -1px

typography.amount.medium:
  font: Inter
  weight: 600 (SemiBold)
  size: 24px
  line-height: 30px
  letter-spacing: -0.5px
```

## Radius Tokens

```
radius.none:   0px
radius.xs:     4px
radius.sm:     8px
radius.md:     12px
radius.lg:     16px
radius.xl:     20px
radius.2xl:    24px
radius.full:   9999px

Semantic:
radius.button:    radius.full   (pill buttons for CredZo)
radius.card:      radius.lg     (16px)
radius.input:     radius.md     (12px)
radius.modal:     radius.xl     (20px)
radius.chip:      radius.full
radius.avatar:    radius.full
radius.badge:     radius.full
```

## Elevation / Shadow Tokens

```
elevation.0:  none
elevation.1:  0px 1px 3px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06)
elevation.2:  0px 4px 6px rgba(0,0,0,0.07), 0px 2px 4px rgba(0,0,0,0.06)
elevation.3:  0px 10px 15px rgba(0,0,0,0.08), 0px 4px 6px rgba(0,0,0,0.05)
elevation.4:  0px 20px 25px rgba(0,0,0,0.09), 0px 10px 10px rgba(0,0,0,0.04)
elevation.5:  0px 25px 50px rgba(0,0,0,0.15)

Semantic:
elevation.card:    elevation.1
elevation.modal:   elevation.4
elevation.dropdown: elevation.3
elevation.nav:     elevation.2
elevation.button:  elevation.1 (on press: elevation.0)
```

## Opacity Tokens

```
opacity.disabled:  0.38
opacity.subtle:    0.54
opacity.medium:    0.72
opacity.high:      0.87
opacity.full:      1.0
opacity.overlay:   0.60
opacity.scrim:     0.32
```

## Border Tokens

```
border.width.thin:    1px
border.width.medium:  1.5px
border.width.thick:   2px

border.style.solid:   solid
border.style.dashed:  dashed
```
