# UI/UX Specification

Telosa Insight MVP visual and interaction design specification.

This document defines how the product should look, feel, and behave for CX Heads, Regional Managers, and Operations Managers. The interface must read as a premium enterprise SaaS product: clear, decision-focused, and trustworthy.

No implementation code is included. This specification is intended to guide design and frontend development before build begins.

---

# Design Philosophy

The product design should embody:

- Enterprise SaaS
- Executive Dashboard
- AI-first
- Minimal
- Modern
- Clean
- High information density
- Easy to scan
- Decision-focused

Clarity takes priority over decoration.

The interface should help leaders answer one question quickly: **what deserves my attention right now?**

Visual noise, ornamental gradients, excessive cards, and flashy motion should be avoided. Every element should support scanning, prioritization, or action.

The product should feel closer to Linear, Notion, Stripe Dashboard, Vercel Dashboard, or Retool than to a marketing site or consumer app.

---

# Color System

Colors are semantic. They encode meaning, not just brand identity.

## Semantic Colors

| Token | Role | Usage |
| --- | --- | --- |
| Primary Blue | Navigation and primary actions | Sidebar active states, primary buttons, links, focus rings |
| Purple | AI-generated insights | AI insight cards, confidence indicators, AI badges, suggested replies |
| Green | Positive outcomes | Successful metrics, resolved states, SLA met, positive sentiment |
| Orange | Medium priority | Medium-priority badges, warning signals, elevated but non-critical issues |
| Red | Critical conversations | Critical badges, high-risk signals, escalation alerts, negative sentiment |
| Gray | Neutral information | Secondary text, borders, muted labels, disabled states |
| White | Content surfaces | Cards, panels, content containers, modal backgrounds |

## Backgrounds

- **App background** — Soft cool gray or very light blue-gray. Provides contrast for white cards without feeling stark.
- **Sidebar background** — Slightly darker or more muted than the main canvas to establish hierarchy.
- **Panel background** — White or near-white for the right insight panel and content sections.
- **Subtle tint backgrounds** — Very light blue, purple, green, orange, or red fills for status chips and insight callouts. Tints should remain low-contrast and readable.

## Borders

- Use thin, low-contrast borders (`1px`) for cards, tables, and dividers.
- Default border color should be a light neutral gray.
- Stronger borders may appear on focused inputs, selected rows, or active filters.
- Avoid heavy outlines or multi-layer card frames.

## Hover States

- Interactive rows and cards should gently darken or lighten the background.
- Primary buttons should deepen slightly in blue on hover.
- Links and icon buttons should increase contrast without changing layout.
- Hover should never cause large layout shifts or aggressive scaling.

## Shadows

- Prefer soft, shallow elevation for cards and dropdowns.
- Shadows should be barely perceptible and used to separate surfaces, not create drama.
- Do not stack multiple deep shadows.
- Selected or focused items may use a slightly stronger shadow or a colored focus ring instead of heavy elevation.

---

# Typography

Typography should feel modern, precise, and executive. Prefer a clean sans-serif system suitable for dense operational data. Avoid decorative display fonts.

## Hierarchy

| Level | Purpose | Weight | Notes |
| --- | --- | --- | --- |
| Application Title | Product name in sidebar or header | Semi-bold to Bold | Compact; should not overpower page content |
| Page Title | Current screen name | Semi-bold | Clear landmark for orientation |
| Section Heading | Groups of content within a page | Medium to Semi-bold | Tight spacing above related content |
| Card Title | Title within a card or panel | Medium | Concise; one line preferred |
| Body Text | Descriptions, conversation text, explanations | Regular | Comfortable reading size for dense content |
| Caption | Metadata, timestamps, helper text | Regular | Lower contrast gray; never critical alone |
| Metric Values | KPI numbers and scores | Semi-bold to Bold | Highest visual priority within KPI cards |

## Spacing Recommendations

- Maintain clear vertical rhythm between title, supporting text, and content blocks.
- Page titles should have generous space below before the first content row.
- Card titles should sit close to their content, with tighter internal spacing than page-level sections.
- Metric values should dominate their cards; labels and captions remain secondary.
- Avoid cramped stacking. Prefer consistent spacing tokens across the application.

## Readability Rules

- High contrast for primary text.
- Secondary text may use muted gray but must remain readable.
- Do not rely on all-caps for long labels.
- Keep line lengths comfortable in conversation and insight panels.

---

# Layout

Desktop-first responsive layout.

## Structure

```text
┌──────────┬──────────────────────────────────────────────┐
│          │ Header                                       │
│ Sidebar  ├───────────────────────────────┬──────────────┤
│          │ Main Content                  │ Right Insight│
│          │                               │ Panel        │
│          │                               │ (optional)   │
└──────────┴───────────────────────────────┴──────────────┘
```

### Sidebar

Persistent left navigation for core product areas.

### Header

Page context, breadcrumbs, search, and key actions.

### Main Content

Primary working area for KPIs, queues, conversation details, and impact analysis.

### Right Insight Panel

Used where appropriate—especially on Conversation Intelligence and Business Impact screens—to surface AI summaries, scores, and recommended next steps without interrupting the main reading flow.

## Spacing Principles

- Maintain generous whitespace between major regions.
- Use consistent gutters between cards and columns.
- Dense data is welcome; clutter is not.
- Align columns and card edges for a calm, structured canvas.

---

# Navigation

## Sidebar Navigation

- Fixed vertical navigation on desktop.
- Include product identity, primary destinations, and optional secondary links.
- Destinations should map to product modules such as Dashboard and related intelligence views.
- Icons plus short labels preferred.
- Collapsed icon-only mode may be used on narrower desktop widths.

## Header

- Displays current page title or context.
- May include quick search, channel filters, and primary actions.
- Keep header height compact and stable across screens.

## Breadcrumbs

- Use breadcrumbs on detail screens such as Conversation Intelligence and Business Impact.
- Example pattern: `Dashboard / Conversation / Business Impact`
- Breadcrumbs should be clickable and help users reverse through the decision flow.

## Active States

- Active sidebar item uses Primary Blue with clear text and icon contrast.
- Active page context should be obvious without relying on color alone.

## Hover States

- Sidebar items and header actions respond with subtle background change.
- Interactive affordances should feel immediate but restrained.

## Selected Conversation States

- Selected queue or table rows use a light blue tint, stronger border, or left accent bar.
- Selection must remain visible while the user reviews related insight panels.
- Only one primary selected conversation should be emphasized at a time.

---

# Dashboard Screen

The Executive Intelligence Dashboard is the product’s home screen and primary decision surface.

## Purpose

Help CX leaders scan volume, identify critical conversations, and choose the next action quickly.

## Layout Overview

Top to bottom, left to right:

1. Header with search and filters
2. Top KPI Cards
3. Main working area: Priority Queue and Recent Conversations
4. Supporting panels: AI Insights and Recommended Actions

A right insight panel may summarize the currently selected conversation when a row is active.

## Top KPI Cards

Position: Top of main content, full-width row.

Purpose: Immediate operational health snapshot.

Typical metrics:

- Total Conversations
- Critical Conversations
- Average Response Time
- Customer Satisfaction

Each KPI card should show a metric value, short label, and optional trend or status cue.

## Priority Queue

Position: Primary left/main column below KPIs.

Purpose: Surface conversations that deserve immediate attention, ordered by business priority.

Should emphasize:

- Priority badge
- Channel
- Clinic or location context
- Short summary
- Business Impact Score
- SLA or urgency cue

This is the most important interactive region on the dashboard.

## Recent Conversations

Position: Adjacent to or below the Priority Queue.

Purpose: Provide broader visibility into newly arrived conversations that may not yet be critical.

Useful for scanning volume and channel mix without leaving the dashboard.

## AI Insights

Position: Secondary column or panel.

Purpose: Present AI-generated patterns such as rising complaint themes, sentiment shifts, or recurring issues.

Use Purple accents to signal AI authorship.

## Recommended Actions

Position: Below or beside AI Insights.

Purpose: Translate intelligence into next steps, such as escalate, assign, or review a critical conversation.

Each recommendation should be concise and actionable.

## Channel Filter

Position: Header or directly above queue/table controls.

Purpose: Filter conversations by Google Reviews, WhatsApp Business, Email, or Website Chat.

Filters should update visible queues and related metrics without page reload friction.

## Quick Search

Position: Header.

Purpose: Find conversations by customer name, keyword, clinic, or conversation ID.

Search should feel lightweight and executive-friendly, not like a complex query builder.

---

# Conversation Intelligence Screen

This screen explains what a conversation means.

## Purpose

Convert unstructured customer language into structured, scannable AI insights.

## Layout

- Left/main column: Raw Conversation and structured insight sections
- Right insight panel: Summary, confidence, and primary CTA
- Header: Breadcrumbs and conversation metadata

## Sections

### Raw Conversation

Displays the original customer message and relevant channel metadata.

This anchors trust: users must see the source before trusting AI interpretation.

### Intent

States what the customer wants, such as complaint, appointment request, billing question, or follow-up.

### Sentiment

Shows emotional tone with a clear label and restrained color cue.

### Entities

Highlights extracted entities such as clinic, treatment type, date, amount, or staff references.

### Summary

Short AI-written summary of the conversation.

Should be scannable in one or two sentences.

### Duplicate Detection

Indicates whether the conversation appears related to an existing thread or repeated issue.

### Spam Detection

Flags low-value or irrelevant messages when applicable.

### Suggested Reply

Provides a draft response the team can review.

Visually associated with AI using Purple accents.

### AI Confidence Score

Communicates how confident the system is in its interpretation.

Should be visible but secondary to the insights themselves.

## Primary CTA

**Analyze Business Impact**

This action advances the user into the Business Impact Intelligence screen for the same conversation.

The CTA should be prominent, Primary Blue, and positioned where the decision to continue feels natural—typically in the right panel or sticky action area.

---

# Business Impact Screen

This screen explains why a conversation matters and what should happen next.

## Purpose

Translate conversation understanding into business priority, ownership, and response expectations.

## Layout

- Main column: Business signals and supporting rationale
- Prominent score panel: Business Impact Score and priority
- Action area: Assigned team, SLA, recommended action, and return path

## Sections

### Business Signals

Grouped indicators that explain the score composition.

### Urgency

How quickly the issue needs attention.

### Revenue Impact

Whether the conversation affects bookings, treatment value, retention, or refund exposure.

### Reputation Risk

Sensitivity related to public channels, complaints, or clinic reputation.

### Escalation Prediction

Likelihood that the issue will escalate if untreated.

### Business Impact Score

Central numeric or visual score summarizing overall priority.

Should be the strongest visual element on the page.

### Priority Badge

Clear label such as Critical, High, Medium, or Low using Red, Orange, and neutral cues as appropriate.

### Assigned Team

Recommended routing destination, such as Clinic Manager, Regional Manager, or CX Head.

### Response SLA

Expected response window based on priority.

### Recommended Action

Concrete next step, such as escalate immediately, contact patient, or monitor.

### Return to Dashboard

Secondary navigation action allowing the user to return to the executive overview after reviewing the decision.

---

# Cards

Cards are the primary content containers. They should feel quiet, structured, and reusable.

## Shared Card Rules

- White background
- Thin neutral border
- Soft optional shadow
- Consistent internal padding
- Clear title-to-content hierarchy
- No unnecessary nested cards

Padding should be comfortable enough for executive scanning, typically more generous than dense admin tables but tighter than marketing layouts.

## KPI Card

- Large metric value
- Short label
- Optional trend or status caption
- Equal visual weight across the KPI row

## Conversation Card

- Channel icon
- Customer or clinic context
- Short preview text
- Priority badge
- Timestamp
- Optional impact score

Used in queues, lists, and recent conversation regions.

## Insight Card

- Purple AI accent
- Insight title
- Short explanation
- Optional confidence or category label

Used for AI summaries, themes, and detection results.

## Recommendation Card

- Action-oriented title
- Brief rationale
- Clear next-step affordance

Should feel actionable, not decorative.

## Business Score Card

- Dominant score presentation
- Priority badge
- Supporting signals in compact form
- Assigned team and SLA as secondary details

This card should communicate urgency at a glance.

---

# Tables

Tables support efficient scanning of conversations and operational lists.

## Styling

- Clean header row with muted labels
- Consistent column alignment
- Adequate row height for clickability
- Subtle horizontal dividers or row separators
- Minimal vertical lines

## Hover Effects

- Light background change on row hover
- Cursor indicates interactivity for clickable rows

## Status Badges

- Compact pills or tags
- Semantic colors for Critical, Medium, Resolved, and similar states
- Text labels required; color alone is insufficient

## Priority Colors

- Critical — Red
- High / Medium — Orange
- Low / Normal — Gray or Blue-muted
- Positive / Resolved — Green

## Sorting Indicators

- Clear sort affordance in column headers
- Active sort column should show direction
- Sorting should feel predictable and lightweight

---

# Icons

Use Lucide React icons consistently. Icons should support recognition, not ornamentation.

## Recommended Usage

| Concept | Icon Direction |
| --- | --- |
| Priority | Alert, flame, or chevron-up style indicators for urgency |
| AI | Sparkles or brain-adjacent abstract marks for AI-generated content |
| Channels | Mail, message circle, globe, or star-like review marks mapped to Email, WhatsApp, Website Chat, and Google Reviews |
| Routing | Users, user-check, or arrow/share style icons for team assignment |
| Insights | Lightbulb, sparkles, or line-chart style marks for intelligence panels |
| Alerts | Triangle alert or bell-style marks for critical warnings |
| Success | Check circle or similar confirmation marks for positive outcomes |

## Icon Rules

- Keep icon size consistent within a region.
- Pair icons with labels in navigation and key actions.
- Use color semantically with icons, not as the only meaning carrier.
- Avoid decorative icon clusters that do not aid scanning.

---

# Animations

Animations should be subtle and purposeful.

## Allowed Motion

- **Fade in** — Soft entrance for page sections and panels
- **Card hover** — Slight elevation or background shift
- **Score count animation** — Brief numeric ease when Business Impact Score appears
- **Progress bar animation** — Controlled fill for confidence or signal strength
- **Page transitions** — Short, quiet fades between dashboard and detail screens

## Motion Rules

- Prefer short durations and ease-out curves.
- Avoid bounce, spin, parallax, and neon glow effects.
- Do not animate everything. Motion should guide attention to priority and progression.
- Respect reduced-motion preferences by minimizing or disabling non-essential animation.

---

# Responsive Behaviour

## Desktop

- Full sidebar, header, main content, and optional right insight panel
- KPI cards in a single horizontal row
- Priority Queue and supporting panels in a multi-column layout
- Highest information density and the primary design target

## Tablet

- Sidebar may collapse to icons or an overlay drawer
- KPI cards wrap into two rows if needed
- Right insight panel stacks below main content or becomes a collapsible section
- Tables may hide lower-priority columns

## Mobile

- Sidebar becomes a drawer or sheet
- Single-column layout
- KPI cards stack vertically
- Priority Queue becomes the primary scrollable focus
- Insight panels appear as stacked sections or expandable blocks
- Preserve readability of conversation text and scores above dense tables

Across all breakpoints, priority badges, scores, and primary CTAs must remain easy to find.

---

# Accessibility

## Color Contrast

- Body text and critical labels must meet strong contrast against backgrounds.
- Priority and status colors must remain readable on white and tinted surfaces.
- Do not convey meaning through color alone.

## Keyboard Navigation

- All interactive elements must be reachable by keyboard.
- Queue rows, filters, buttons, and navigation links should support logical tab order.
- Primary CTAs must be operable without a pointer.

## ARIA Labels

- Icon-only buttons require accessible names.
- Badges, scores, and status indicators should expose clear text alternatives.
- Landmark regions such as navigation, main content, and complementary insight panels should be identifiable.

## Focus States

- Visible focus rings using Primary Blue or a high-contrast equivalent.
- Focus styles must remain clear on both white and tinted backgrounds.
- Never remove focus outlines without a stronger replacement.

## Readable Typography

- Maintain scalable font sizes.
- Keep line height comfortable for conversation and insight text.
- Avoid ultra-light weights for primary content.

---

# Overall User Experience

Telosa Insight should feel like a premium enterprise operations product.

Reference quality bar:

- Notion
- Linear
- Stripe Dashboard
- Vercel Dashboard
- Retool

The experience should communicate:

- Trust
- Intelligence
- Professionalism

rather than visual complexity.

Users should move from overview to understanding to action with minimal friction:

Dashboard → Conversation Intelligence → Business Impact → Dashboard

Every screen should make the next decision obvious. Every visual choice should help a CX leader identify what matters, why it matters, and what to do next.
