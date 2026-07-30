# Feature Specification

This document defines every feature included in the Telosa Insight MVP.

It describes product behavior, user interactions, business logic, inputs, outputs, and acceptance criteria before implementation begins.

The MVP consists of three primary capabilities:

1. Executive Intelligence Dashboard
2. Conversation Intelligence Engine
3. Business Impact Intelligence Engine

Each feature specification includes:

- Purpose
- User
- Inputs
- Processing
- Outputs
- User Interaction
- Acceptance Criteria

All MVP behavior is driven by realistic mock JSON data. No backend APIs, databases, authentication, or live AI models are required.

---

# Feature 1 — Executive Intelligence Dashboard

## Purpose

Provide CX leaders with a centralized view of customer conversations, business priorities, AI insights, and recommended actions.

The dashboard answers the primary executive question: **what deserves attention right now?**

## Primary Users

- CX Head
- Regional Manager

Secondary users may include Clinic Managers reviewing clinic-level conversation load, but the dashboard is designed primarily for executive decision-making.

## Inputs

Dashboard metrics and conversation lists generated from mock conversation data.

Input sources include:

- Mock conversation records
- Precomputed Business Impact Scores
- Precomputed priority labels
- Channel metadata
- KPI aggregates
- AI insight summaries
- Recommended action records

Supported channels:

- Google Reviews
- WhatsApp Business
- Email
- Website Chat

## Processing

The dashboard does not perform live AI processing.

It aggregates and presents mock-derived values according to these rules:

1. Load all available mock conversation and metric records.
2. Compute or read KPI values for display.
3. Apply active channel filters and search queries to conversation lists.
4. Sort the Priority Queue by Business Impact Score in descending order.
5. Ensure Critical conversations remain visually and positionally dominant.
6. Surface AI Insights and Recommended Actions associated with the current filtered dataset where available.
7. Update visible lists and emphasis states when the user changes filters or search input.

## Outputs

- KPI Cards
- Filtered and sorted Priority Queue
- Recent Conversations list
- AI Insights panel
- Recommended Actions panel
- Visible priority badges and status colors
- Navigation entry points into Conversation Intelligence

## Components

- KPI Cards
- Channel Filter
- Search Bar
- Priority Queue
- Recent Conversations
- AI Insights
- Recommended Actions

## User Interaction

Users can:

- View KPIs
- Filter conversations by channel
- Search conversations
- Click a conversation
- Navigate to Conversation Intelligence
- Review AI Insights and Recommended Actions without leaving the dashboard

### Expected Behaviour

- Dashboard updates based on selected filters.
- Critical conversations always appear at the top of the Priority Queue.
- Priority colors update automatically according to priority labels.
- Selecting a conversation navigates to `/conversation/[id]`.
- Empty filter or search results show an appropriate empty state rather than broken UI.
- The page remains scannable and executive-focused, with KPIs above operational lists.

## Acceptance Criteria

- Dashboard loads successfully on `/`.
- KPIs display correctly from mock data.
- Priority Queue is sorted by Business Impact Score.
- Critical conversations appear above lower-priority conversations.
- Channel filters correctly narrow visible conversations.
- Search returns matching conversations or an empty-results state.
- Clicking a conversation opens the Conversation Intelligence page.
- AI Insights and Recommended Actions are visible and readable.
- Priority badges use the correct semantic colors.

---

# Feature 2 — Conversation Intelligence Engine

## Purpose

Transform an unstructured customer conversation into structured AI insights.

This feature helps operational users understand what the customer wants, how they feel, and what the conversation contains before deciding how to act.

## Primary Users

- Clinic Manager
- Regional Manager

CX Heads may also use this screen when reviewing a critical conversation from the dashboard.

## Inputs

Conversation text and related metadata for a selected conversation.

Typical input fields include:

- Conversation ID
- Customer message content
- Channel
- Clinic or location context
- Timestamp
- Precomputed AI insight fields from mock data

## Processing

The Conversation Intelligence Engine simulates AI analysis using mock insight payloads.

Processing rules:

1. Resolve the selected conversation by ID from mock data.
2. Display the raw conversation as the source of truth.
3. Present precomputed structured insights for intent, sentiment, entities, and summary.
4. Show duplicate and spam detection results when available.
5. Display a suggested reply draft for review.
6. Surface an AI Confidence Score associated with the analysis.
7. Provide a clear path to Business Impact analysis for the same conversation.

No live LLM inference occurs in the MVP.

## Outputs

AI outputs displayed on the page:

- Intent
- Sentiment
- Entities
- Summary
- Duplicate Detection
- Spam Detection
- Suggested Reply
- AI Confidence Score

Supporting outputs:

- Conversation metadata
- Primary CTA to analyze business impact

## User Interaction

Users can:

- Review AI analysis
- Read the conversation summary
- View extracted entities
- Inspect duplicate and spam signals
- Review the suggested reply
- Observe the AI Confidence Score
- Click **Analyze Business Impact**

### Expected Behaviour

- The raw conversation remains visible so users can validate AI interpretation.
- Insights are presented in a structured, scannable layout.
- AI-generated content is visually distinguishable using the AI/Purple accent system.
- The primary CTA navigates to `/business-impact/[id]` for the same conversation.
- Missing optional fields degrade gracefully into empty or unavailable states.

## Acceptance Criteria

- Conversation Intelligence page loads for a valid conversation ID.
- Raw conversation content is displayed.
- AI outputs are displayed in a structured layout.
- Intent, sentiment, entities, and summary are visible.
- Duplicate Detection and Spam Detection states are shown when present.
- Suggested Reply is visible.
- Confidence score is visible.
- CTA navigates to the Business Impact page for the same conversation ID.
- Invalid or missing conversation IDs produce a clear not-found or unavailable state.

---

# Feature 3 — Business Impact Intelligence Engine

## Purpose

Determine the business importance of a conversation using AI-generated business signals.

This feature explains why a conversation deserves priority and what should happen next.

## Primary Users

- CX Head
- Regional Manager
- Clinic Manager

## Inputs

Structured conversation insights produced by the Conversation Intelligence Engine, represented in mock data for the selected conversation.

Input concepts include:

- Conversation ID
- Intent
- Sentiment
- Entities
- Summary
- Channel and clinic context
- Precomputed business signal values

## Business Signals

- Urgency
- Revenue Impact
- Reputation Risk
- Escalation Prediction

These signals collectively inform prioritization. High-risk and reputation-sensitive conversations should tend toward higher priority in the mock dataset.

## Processing

The Business Impact Intelligence Engine simulates prioritization logic using mock score payloads.

Processing rules:

1. Resolve the selected conversation and its business impact record by ID.
2. Display individual business signals that explain the prioritization rationale.
3. Present the overall Business Impact Score as the primary decision metric.
4. Derive or display Priority from the score band.
5. Show Assigned Team based on mock routing recommendations.
6. Display Response SLA according to priority.
7. Present a Recommended Action that translates the score into an operational next step.
8. Provide a path back to the Dashboard.

No live scoring model is executed in the MVP. Score and routing values come from mock data designed to feel realistic and consistent with conversation severity.

## Outputs

- Business Impact Score
- Priority
- Assigned Team
- SLA
- Recommended Action

Supporting outputs:

- Visible business signal breakdown
- Priority badge
- Navigation back to Dashboard

## User Interaction

Users can:

- Review the business score
- Inspect each business signal
- Understand prioritization rationale
- Review Assigned Team and Response SLA
- Read the Recommended Action
- Return to Dashboard

### Expected Behaviour

- Business Impact Score is the dominant visual element.
- Priority badge reflects the conversation’s priority level using semantic colors.
- Critical conversations communicate urgency clearly through score, badge, and recommended action.
- Assigned Team and SLA are easy to locate.
- Returning to Dashboard restores the executive overview without breaking navigation continuity.

## Acceptance Criteria

- Business Impact page loads for a valid conversation ID.
- Business signals are displayed.
- Business score is displayed visually.
- Priority badge updates correctly according to the mock priority value.
- Assigned Team is shown.
- SLA is shown.
- Recommended Action is displayed.
- Users can return to the Dashboard.
- Score presentation remains readable on desktop and smaller breakpoints.

---

# Cross-Feature Behaviour

The application should support the following user journey:

Dashboard

↓

Conversation Intelligence

↓

Business Impact Intelligence

↓

Return to Dashboard

## Journey Rules

1. A user starts on the Executive Intelligence Dashboard.
2. Selecting a conversation opens Conversation Intelligence for that ID.
3. Choosing **Analyze Business Impact** opens Business Impact Intelligence for the same ID.
4. Returning to Dashboard restores the executive overview.
5. Breadcrumbs and navigation should make the path reversible and understandable.
6. Conversation identity must remain consistent across the journey.
7. Priority and impact values shown on detail pages should align with dashboard queue presentation for the same conversation.

The navigation should feel seamless.

---

# Error States

Although mock data is used, the UI must define and handle non-happy-path states consistently.

## Empty Conversations

Shown when no conversations are available in the mock dataset or the current view has nothing to display.

Requirements:

- Clear empty-state message
- No broken cards, tables, or skeleton leftovers
- Guidance that data will appear when conversations exist

## No Search Results

Shown when search or filter criteria match no conversations.

Requirements:

- Explicit “no results” message
- Retain the active search or filter context
- Allow the user to clear filters or revise search easily

## Loading State

Shown while mock data or page content is being prepared for render.

Requirements:

- Lightweight loading indicator or skeleton placeholders
- Avoid layout jump where practical
- Do not imply live backend processing beyond normal page readiness

## AI Analysis Unavailable

Shown when insight or scoring fields are missing for a conversation.

Requirements:

- Clear message that AI analysis is unavailable
- Preserve access to raw conversation content when possible
- Disable or hide dependent CTAs only when navigation would lead to an incomplete experience
- Avoid technical error jargon

---

# Future Enhancements

The following capabilities are intentionally excluded from the MVP and documented here for future planning.

- Live AI-generated replies with editable send workflows
- Automation workflows and rule builders
- Multi-language support
- Predictive analytics and forecasting
- Real-time notifications and WebSocket updates
- Authentication and authorization
- Role-Based Access Control (RBAC)
- Team management
- Workflow configuration
- Backend APIs and database persistence
- Real LLM or model integration
- Mobile-native applications
- Advanced reporting and export

These enhancements should be introduced later without changing the core product journey:

Dashboard → Conversation Intelligence → Business Impact Intelligence
