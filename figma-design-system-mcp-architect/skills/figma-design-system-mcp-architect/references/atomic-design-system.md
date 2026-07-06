# Atomic Design System — CredZo

Full specification for building the CredZo component library using Atomic Design methodology.

## Structure Overview

```
Atoms      → Smallest indivisible UI elements
Molecules  → Combinations of atoms with a single purpose
Organisms  → Complex UI sections composed of molecules
Templates  → Page-level layout shells (content-agnostic)
Pages      → Fully populated production screens
```

Each level lives on the corresponding Figma page (04 Atoms, 05 Molecules, 06 Organisms, 07 Templates, 08 Screens).

---

## ATOMS (Page 04)

### Button Atom

Component: `Button/Primary/Default`
Properties:
- `label` (text) — default: "Continue"
- `icon-left` (boolean) — default: false
- `icon-right` (boolean) — default: true → chevron-right
- `state` (variant) — Default | Hover | Pressed | Disabled | Loading

Auto layout:
- Direction: Horizontal
- Padding: 16px top/bottom, 24px left/right
- Gap: 8px between icon and label
- Width: Fill container
- Height: Fixed 52px

Token usage:
- Background: `color.brand.primary` (default), `color.brand.pressed` (pressed)
- Label color: `color.text.on-brand`
- Radius: `radius.button` (full)
- Elevation: `elevation.button`

---

### Button Secondary Atom

Component: `Button/Secondary/Default`
- Background: transparent
- Border: 1.5px `color.border.brand`
- Label: `color.text.brand`
- Radius: `radius.button`

---

### Input Atom

Component: `Input/Default/Empty`
Properties:
- `label` (text) — floating label
- `placeholder` (text)
- `helper-text` (text)
- `error-message` (text)
- `icon-right` (boolean) — reveal/hide toggle for passwords
- `state` (variant) — Empty | Focused | Filled | Error | Disabled

Auto layout:
- Direction: Vertical
- Gap: 4px between label and field
- Field padding: 12px vertical, 16px horizontal
- Width: Fill
- Height: Hug

Token usage:
- Background: `color.background.input`
- Border (empty): `color.border.default`
- Border (focused): `color.border.focus`
- Border (error): `color.border.error`
- Label color: `color.text.secondary`
- Input text: `color.text.primary`
- Radius: `radius.input`

---

### OTP Input Atom

Component: `Input/OTP/Empty`
Properties:
- `digit` (text) — single character
- `state` (variant) — Empty | Focused | Filled | Error

Single cell: 52px × 56px
Border-radius: `radius.md`
6 cells composed in a molecule (see OTP Field Molecule)

---

### Icon Atom

Component: `Icon/24/arrow-right`
- Strictly 24×24px frame (also 16px and 20px variants)
- Use as instance swap target in all components
- All icons use `color.icon.default` (overrideable)

---

### Badge / Status Dot Atom

Component: `Badge/Status/Success`
Properties:
- `label` (text)
- `type` (variant) — Success | Warning | Error | Info | Neutral

Auto layout: Horizontal, 4px/8px padding, Hug size
Token: background from `color.surface.*`, text from `color.text.*`, same semantic family

---

### Avatar Atom

Component: `Avatar/User/Medium`
Sizes: Small (32px), Medium (40px), Large (56px)
Properties:
- `type` (variant) — Image | Initials
- `size` (variant) — Small | Medium | Large
- `initials` (text) — shown when type=Initials

Radius: `radius.full`

---

## MOLECULES (Page 05)

### Credit Summary Card Molecule

Component: `Card/CreditSummary/Default`
Structure (vertical auto layout, 20px padding, 12px gap):
```
card_credit_summary
├── layout_header (horizontal, space-between)
│   ├── text_label ("Credit Limit")
│   └── chip_status (Badge/Status/Active)
├── text_amount_large ("₹50,000")
├── layout_progress
│   ├── progress_bar_used
│   └── progress_bar_available
└── layout_footer (horizontal, 16px gap)
    ├── layout_stat_used
    │   ├── text_caption ("Used")
    │   └── text_amount_medium ("₹12,000")
    └── layout_stat_available
        ├── text_caption ("Available")
        └── text_amount_medium ("₹38,000")
```

Properties:
- `limit` (text), `used` (text), `available` (text)
- `status` (variant) — Active | Pending | Suspended

Token: background `color.surface.primary`, elevation `elevation.card`, radius `radius.card`

---

### Transaction Item Molecule

Component: `Card/Transaction/Credit`
Structure (horizontal auto layout, 16px padding, 12px gap):
```
card_transaction_item
├── container_icon (40×40, circular, brand-subtle bg)
│   └── icon_category (Icon/24/*)
├── layout_details (vertical, fill, 2px gap)
│   ├── text_merchant (Label/Medium)
│   └── text_date (Caption/Default, text.tertiary)
└── layout_amount (vertical, end-aligned, 2px gap)
    ├── text_amount (Label/Large, state.success for credit)
    └── text_type (Caption/Default)
```

Variant: Credit (green amount) | Debit (red amount)
Height: 72px fixed, Width: Fill

---

### OTP Field Molecule

Component: `Input/OTP/Empty` (6-digit)
6 × `Input/OTP/Empty` atoms
Horizontal auto layout, 8px gap, centered

---

### Navigation Item Molecule

Component: `Nav/Tab/Home/Active`
Structure (vertical auto layout, 8px padding-y, centered):
```
nav_tab_home
├── icon_tab (Icon/24/*)
└── text_tab_label (Caption/Default)
```

States: Active (brand color, bold) | Inactive (icon.subtle, regular)
Width: Fill, Height: Fixed 56px

---

### AI Assistant Insight Card Molecule

Component: `Card/Insight/Default`
Structure (horizontal, 16px padding, 12px gap):
```
ai_insight_chip
├── container_ai_icon (40px, brand-subtle)
│   └── icon_ai_spark
└── layout_content (vertical)
    ├── text_insight_heading (Label/Medium)
    └── text_insight_body (Body/Small, text.secondary)
```

---

### Repayment Due Module Molecule

Component: `Card/Repayment/Upcoming`
```
card_repayment_upcoming
├── layout_row_top (horizontal, space-between)
│   ├── text_label ("Next Payment")
│   └── text_due_date (Label/Small, text.secondary)
├── text_amount (Amount/Medium)
└── btn_repay_now (Button/Primary/Default, "Pay Now")
```

---

## ORGANISMS (Page 06)

### Onboarding Hero Organism

Component: `Onboarding/Hero`
Full-width section:
```
container_hero (vertical, fill-width, 40px padding, 24px gap)
├── img_illustration (220×200px, centered)
├── text_heading (Heading/Large, centered)
├── text_subheading (Body/Large, text.secondary, centered)
└── layout_dots (page indicator)
```

---

### Dashboard Header Organism

Component: `Dashboard/Header`
```
layout_header (horizontal, 20px padding, space-between, 56px height)
├── layout_user_info (horizontal, 12px gap)
│   ├── avatar_user (Avatar/User/Small)
│   └── layout_greeting (vertical)
│       ├── text_greeting ("Good morning,")
│       └── text_user_name (Label/Large)
└── btn_icon_notification (Icon/24/bell + Badge)
```

---

### Bottom Navigation Bar Organism

Component: `Nav/BottomBar/Default`
```
nav_bottom_tab (horizontal, fill-width, 0 gap, 64px height, space-evenly)
├── Nav/Tab/Home/*
├── Nav/Tab/Credit/*
├── Nav/Tab/Repay/*
├── Nav/Tab/Assistant/*
└── Nav/Tab/Profile/*
```

Background: `color.surface.primary`, top border `color.border.default`, elevation `elevation.nav`
Safe area bottom inset: 34px

---

### Repayment Panel Organism

Component: `Repayment/Panel`
```
container_repayment_panel (vertical, 20px padding, 16px gap)
├── text_section_label ("Repayment Schedule", Overline/Default)
├── Card/Repayment/Upcoming
├── Card/Repayment/Upcoming (next EMI)
└── btn_view_all (Button/Ghost/Default, "View All")
```

---

### AI Interaction Block Organism

Component: `AIAssistant/InteractionBlock`
```
container_ai_block (vertical, 16px padding, 12px gap)
├── layout_ai_header (horizontal)
│   ├── icon_ai_logo
│   └── text_ai_name ("CredZo AI", Label/Medium)
├── container_chat_messages (vertical, 8px gap, scroll)
│   ├── ai_chat_bubble_agent (*)
│   └── ai_chat_bubble_user (*)
└── layout_input_area (horizontal, 12px gap)
    ├── input_chat (Input/Search/Empty, fill)
    └── btn_icon_send
```

---

## TEMPLATES (Page 07)

### Onboarding Template

Component: `Template/Onboarding`
```
layout_page (vertical, fill, safe areas)
├── layout_safe_area_top (44px)
├── nav_top_bar (optional back button)
├── layout_content (vertical, fill, 20px padding, scroll)
│   └── [slot: organism content]
├── layout_cta_area (vertical, 20px padding, 16px gap)
│   ├── [slot: primary CTA button]
│   └── [slot: secondary action]
└── layout_safe_area_bottom (34px)
```

### Dashboard Template

Component: `Template/Dashboard`
```
layout_page (vertical, fill)
├── layout_safe_area_top (44px)
├── Dashboard/Header (organism)
├── layout_scroll_content (vertical, fill, 20px padding, 16px gap, scroll)
│   └── [slots: cards, sections, modules]
└── Nav/BottomBar/Default (organism, fixed bottom)
```

### Transaction / Detail Template

Component: `Template/Detail`
```
layout_page (vertical, fill)
├── layout_safe_area_top (44px)
├── Nav/TopBar/WithBack
├── layout_scroll_content (vertical, fill, scroll)
│   └── [slots]
├── layout_cta_sticky (20px padding, bottom)
│   └── [slot: CTA button]
└── layout_safe_area_bottom (34px)
```

---

## PAGES (Page 08 — Screens)

Populate templates with real content. Every screen must:
1. Use a Template as its base (detached if needed for custom layout)
2. Have all text replaced with actual content
3. Have all tokens bound (no raw values)
4. Follow frame naming convention: `Section/ScreenName`
5. Be 390px wide (iPhone 14 base)
6. Have a corresponding entry in Page 09 Prototypes for flows

Production screen checklist per screen:
- [ ] Frame name follows `Section/ScreenName` pattern
- [ ] Status bar layer present (44px, system UI)
- [ ] Home indicator present (34px) where applicable
- [ ] All interactive elements have proper variants ready for prototyping
- [ ] No detached components
- [ ] No hardcoded colors
