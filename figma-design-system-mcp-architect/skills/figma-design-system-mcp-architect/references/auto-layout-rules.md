# Auto Layout Rules

Every container in the CredZo Figma system must use auto layout. This reference defines how to configure it correctly for each scenario.

## Core Rules

1. Never use absolute/manual positioning inside a container that could use auto layout
2. Every frame that holds multiple children must have auto layout enabled
3. Spacing between elements must use `spacing.*` tokens, never manual gap values
4. Resizing behavior must be set intentionally (Fill, Fixed, Hug)
5. Constraints are set on the parent frame, not on individual children

---

## Resizing Behavior Reference

| Scenario | Width | Height |
|---|---|---|
| Full-width button | Fill container | Fixed 52px |
| Icon button | Fixed 48px | Fixed 48px |
| Page/screen frame | Fixed 390px | Fixed 844px |
| Card (in list) | Fill container | Hug contents |
| Card (standalone) | Fixed (per design) | Hug contents |
| Input field | Fill container | Hug contents |
| Modal / Bottom sheet | Fill container | Hug contents |
| Bottom nav bar | Fill container | Fixed 64px + 34px safe area |
| Top bar / header | Fill container | Fixed 56px |
| Text node (in button) | Hug contents | Hug contents |
| Text node (in card body) | Fill container | Hug contents |
| Section container | Fill container | Hug contents |
| Scroll content area | Fill container | Fill container |
| Hero image | Fixed | Fixed |
| Avatar | Fixed | Fixed |
| Icon | Fixed (16/20/24px) | Fixed |

---

## Direction & Alignment

### Vertical Stacks (most common for screens/cards)
```
Direction: Vertical
Primary axis: Start (top)
Counter axis: Stretch (fill width) for most children
Gap: Use spacing token
Padding: Use spacing token
```

### Horizontal Rows (nav bars, list item rows, button groups)
```
Direction: Horizontal
Primary axis: Start or Space-between
Counter axis: Center (vertical centering)
Gap: Use spacing token
```

### Centered Content (hero areas, empty states, modals)
```
Direction: Vertical
Primary axis: Center
Counter axis: Center
```

### Space-Between Rows (header rows with title + action)
```
Direction: Horizontal
Primary axis: Space-between
Counter axis: Center
```

---

## Padding Reference by Component

| Component | Top | Right | Bottom | Left |
|---|---|---|---|---|
| Page layout | 0 | 0 | 0 | 0 (children handle padding) |
| Section container | 24px | 20px | 24px | 20px |
| Card default | 16px | 16px | 16px | 16px |
| Card compact | 12px | 16px | 12px | 16px |
| Button primary | 14px | 24px | 14px | 24px |
| Button compact | 10px | 20px | 10px | 20px |
| Input field | 12px | 16px | 12px | 16px |
| Bottom nav tab | 8px | 0 | 8px | 0 |
| Top bar | 0 | 16px | 0 | 16px |
| Modal | 24px | 20px | 32px | 20px |
| Bottom sheet | 24px | 20px | 34px | 20px |
| Chip | 6px | 12px | 6px | 12px |
| Badge | 2px | 8px | 2px | 8px |
| Tooltip | 8px | 12px | 8px | 12px |

---

## Gap Reference by Context

| Context | Gap Token | px Value |
|---|---|---|
| Between sections on a screen | spacing.6 | 24px |
| Between cards in a list | spacing.3 | 12px |
| Between form fields | spacing.4 | 16px |
| Between label and input | spacing.1 | 4px |
| Between icon and text (inline) | spacing.2 | 8px |
| Between primary and secondary CTAs | spacing.3 | 12px |
| Inside a card between rows | spacing.3 | 12px |
| Inside a card between header and content | spacing.4 | 16px |
| Nav tab items | 0 (space-between on parent) | — |
| OTP cells | spacing.2 | 8px |
| Avatar + name in row | spacing.3 | 12px |
| Section title + content | spacing.3 | 12px |
| Heading + subheading | spacing.2 | 8px |
| Amount + label | spacing.1 | 4px |

---

## Nested Auto Layout Patterns

### Screen Layout (outermost → innermost)
```
layout_page [vertical, fill×fill, 0 padding, 0 gap]
├── layout_safe_area_top [fixed 44px height, fill width]
├── nav_top_bar [horizontal, fill×56px]
├── layout_scroll_content [vertical, fill×fill, 20px padding, 16px gap]
│   ├── [section containers — vertical, fill×hug]
│   │   └── [cards and modules — fill×hug]
│   └── ...
└── nav_bottom_tab [horizontal, fill×(64+34)px, fixed bottom]
```

### Card Layout
```
card_[name] [vertical, fill×hug, 16px padding, 12px gap]
├── layout_card_header [horizontal, fill×hug, space-between]
│   ├── text_label [hug×hug]
│   └── badge_status [hug×hug]
├── text_amount [fill×hug]
└── layout_card_footer [horizontal, fill×hug, 16px gap]
    ├── layout_stat [vertical, fill×hug, 2px gap]
    └── layout_stat [vertical, fill×hug, 2px gap]
```

### List Item Layout
```
card_list_item [horizontal, fill×72px, 16px padding, 12px gap, center aligned]
├── container_icon [fixed 40×40, circular]
├── layout_details [vertical, fill×hug, 2px gap]
│   ├── text_primary [fill×hug, Label/Medium]
│   └── text_secondary [fill×hug, Caption/Default]
└── layout_trailing [vertical, hug×hug, end-aligned, 2px gap]
    ├── text_amount [hug×hug, Label/Large]
    └── text_status [hug×hug, Caption/Default]
```

### Bottom Sheet Layout
```
container_bottom_sheet [vertical, fill×hug, bottom-aligned]
├── layout_handle_bar [horizontal, fill×20px, center]
│   └── handle_indicator [32×4px, neutral-300, radius.full]
├── layout_content [vertical, fill×hug, 20px padding, 16px gap]
│   └── [content slots]
└── layout_cta [vertical, fill×hug, 20px padding, 12px gap]
    └── [button slots]
```

---

## Common Mistakes to Avoid

| Wrong | Correct |
|---|---|
| Manually positioning a child layer with X/Y | Add to auto layout parent |
| Using fixed height on a card that might grow | Set to Hug contents |
| Using Fill on a component that should be fixed | Set to Fixed with the correct size |
| Using 0 gap with padding to fake spacing | Use proper gap token |
| Nesting groups inside auto layout | Replace groups with frames |
| Setting padding directly on a text node | Wrap text in a padded frame |
| Using absolute numbers for gap (e.g., 13px) | Use nearest spacing token |
| Mixing auto layout and manual layers in same frame | Convert all siblings to auto layout children |
