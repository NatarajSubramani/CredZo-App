# Naming Conventions

All Figma layer, frame, component, and style names must follow these rules. Enforce on every MCP operation.

## Core Naming Principles

1. **Semantic** — name describes purpose, not appearance
2. **Scalable** — name supports expansion without breaking
3. **Developer-friendly** — matches token and CSS naming patterns
4. **Slash-delimited hierarchy** — parent/child relationships use `/`
5. **Snake_case for atoms** — `btn_primary`, `input_email`
6. **PascalCase for pages/screens** — `Dashboard/Main`, `Onboarding/Welcome`

## Frame Naming (Screens)

Pattern: `Section/ScreenName`

```
Onboarding/Splash
Onboarding/Welcome
Onboarding/PhoneEntry
Onboarding/OTPVerification
Onboarding/KYC-Start
Onboarding/KYC-DocumentUpload
Onboarding/KYC-Selfie
Onboarding/KYC-Review
Onboarding/Success

CreditLine/Eligibility
CreditLine/Limit-Reveal
CreditLine/Activation
CreditLine/Activated

Dashboard/Main
Dashboard/CreditSummary
Dashboard/TransactionHistory
Dashboard/Notifications

Repayment/Schedule
Repayment/SelectAmount
Repayment/PaymentMethod
Repayment/Confirmation
Repayment/Success

AIAssistant/Chat
AIAssistant/Insights
AIAssistant/Recommendations

Profile/Main
Profile/EditDetails
Profile/Settings
Profile/Security

Transactions/List
Transactions/Detail
```

## Component Naming

Pattern: `ComponentType/Variant/State`

### Buttons
```
Button/Primary/Default
Button/Primary/Hover
Button/Primary/Pressed
Button/Primary/Disabled
Button/Primary/Loading
Button/Secondary/Default
Button/Secondary/Hover
Button/Secondary/Pressed
Button/Secondary/Disabled
Button/Ghost/Default
Button/Ghost/Hover
Button/Destructive/Default
Button/Destructive/Pressed
Button/Icon/Default
Button/Icon/Pressed
```

### Inputs
```
Input/Default/Empty
Input/Default/Focused
Input/Default/Filled
Input/Default/Error
Input/Default/Disabled
Input/Default/ReadOnly
Input/Phone/Empty
Input/Phone/Filled
Input/OTP/Empty
Input/OTP/Focused
Input/OTP/Filled
Input/OTP/Error
Input/Search/Empty
Input/Search/Active
```

### Cards
```
Card/CreditSummary/Default
Card/CreditSummary/Expanded
Card/Transaction/Credit
Card/Transaction/Debit
Card/Repayment/Upcoming
Card/Repayment/Overdue
Card/Repayment/Paid
Card/Insight/Default
Card/Notification/Unread
Card/Notification/Read
Card/KYC-Status/Pending
Card/KYC-Status/Approved
Card/KYC-Status/Rejected
```

### Navigation
```
Nav/BottomBar/Default
Nav/Tab/Home/Active
Nav/Tab/Home/Inactive
Nav/Tab/Credit/Active
Nav/Tab/Credit/Inactive
Nav/Tab/Repay/Active
Nav/Tab/Repay/Inactive
Nav/Tab/Assistant/Active
Nav/Tab/Assistant/Inactive
Nav/Tab/Profile/Active
Nav/Tab/Profile/Inactive
Nav/TopBar/Default
Nav/TopBar/WithBack
Nav/TopBar/WithClose
```

### Chips & Badges
```
Chip/Filter/Default
Chip/Filter/Selected
Chip/Status/Active
Chip/Status/Pending
Chip/Status/Error
Badge/Notification/Default
Badge/Status/Success
Badge/Status/Warning
Badge/Status/Error
Badge/Amount/Credit
Badge/Amount/Debit
```

### Avatars & Icons
```
Avatar/User/Small
Avatar/User/Medium
Avatar/User/Large
Avatar/Initials/Small
Avatar/Initials/Medium
Icon/16/arrow-right
Icon/20/checkmark
Icon/24/credit-card
```

## Layer Naming (Inside Components/Screens)

Use snake_case. Describe function, not visual.

### Interactive Elements
```
btn_primary
btn_secondary
btn_ghost
btn_icon_back
btn_icon_close
btn_cta_apply
btn_cta_repay
```

### Inputs
```
input_phone_number
input_otp_field
input_email
input_pin
input_search
input_amount
```

### Cards / Containers
```
card_credit_summary
card_transaction_item
card_repayment_upcoming
card_ai_insight
card_kyc_status
container_hero
container_section
container_list
container_modal
```

### Navigation
```
nav_bottom_tab
nav_top_bar
nav_tab_home
nav_tab_credit
nav_tab_repay
nav_back_button
nav_close_button
```

### Content Layers
```
text_heading
text_subheading
text_body
text_caption
text_label
text_amount_large
text_amount_currency
text_status
text_error_message
text_helper_text
```

### AI / Special
```
ai_assistant_card
ai_chat_bubble_user
ai_chat_bubble_agent
ai_insight_chip
ai_recommendation_item
```

### Layout / Structural
```
layout_page
layout_content
layout_header
layout_footer
layout_safe_area_top
layout_safe_area_bottom
layout_scroll_container
layout_section_gap
```

### Images / Media
```
img_hero
img_illustration
img_avatar
img_document_preview
img_icon_brand
icon_chevron_right
icon_check_circle
icon_alert_triangle
```

## Style Naming (Figma Styles)

### Text Styles
```
Heading/XL
Heading/Large
Heading/Medium
Heading/Small
Body/Large
Body/Medium
Body/Small
Label/Large
Label/Medium
Label/Small
Caption/Default
Overline/Default
Amount/Large
Amount/Medium
```

### Color Styles
```
Surface/Primary
Surface/Secondary
Surface/Brand
Surface/Success
Surface/Warning
Surface/Error
Text/Primary
Text/Secondary
Text/Tertiary
Text/Disabled
Text/Brand
Text/Inverse
Border/Default
Border/Brand
Border/Error
Brand/Primary
Brand/Subtle
State/Success
State/Warning
State/Error
```

### Effect Styles
```
Elevation/1
Elevation/2
Elevation/3
Elevation/4
Elevation/5
Blur/Light
Blur/Heavy
```

### Grid Styles
```
Grid/Mobile/Default
Grid/Mobile/Full-Bleed
```

## Forbidden Names

Never use these — immediately rename if found:

```
Frame 1, Frame 2, Frame N
Rectangle, Rectangle 1, Rectangle N
Ellipse, Ellipse N
Group, Group 1, Group N
Vector, Vector N
Path, Path N
Layer, Layer N
Component 1
Auto Layout N
```
