# System Architecture

Telosa Insight MVP is a frontend-first enterprise SaaS application that demonstrates an AI-powered Conversation Intelligence Platform.

The application simulates the full intelligence pipeline—from raw customer conversations to executive decision support—using realistic mock JSON data instead of backend services, databases, authentication, or live AI model integrations.

The architecture prioritizes a production-ready user experience, modular component design, and a clear separation of concerns so that real infrastructure can be introduced later without major restructuring.

---

# Technology Stack

The MVP is built with a modern frontend stack optimized for speed of development, visual quality, and future extensibility.

- **Next.js 15 (App Router)** — Provides a structured routing model, server and client component boundaries, and a clear foundation for future API routes and server-side integrations.
- **React 19** — Enables a component-driven UI with modern React patterns suitable for interactive dashboards and detail views.
- **TypeScript** — Enforces strong typing across mock data models, component props, and shared utilities, reducing ambiguity as the application grows.
- **Tailwind CSS** — Supports rapid, consistent styling for a clean enterprise SaaS interface without heavy custom CSS overhead.
- **shadcn/ui** — Supplies accessible, composable UI primitives that can be customized to match the product’s design language.
- **Lucide React** — Provides a lightweight icon set for navigation, status indicators, and dashboard actions.
- **Framer Motion** — Adds intentional motion for hierarchy and presence without relying on flashy or distracting animations.
- **Recharts** — Renders dashboard charts and KPI visualizations with a React-friendly charting API.
- **Vercel Deployment** — Enables simple, reliable hosting aligned with the Next.js App Router workflow.

---

# Application Architecture

The application is organized around the three core modules defined in the MVP scope.

## 1. Executive Intelligence Dashboard

The primary entry point for CX leaders.

Displays conversation volume, critical issues, response performance, customer satisfaction, priority queues, AI insights, and recommended actions.

Users begin here to understand what deserves attention across clinics and channels.

## 2. Conversation Intelligence Engine

Transforms a selected conversation into structured insights.

Surfaces intent detection, sentiment analysis, entity recognition, AI summary, duplicate and spam signals, and suggested replies.

Users navigate here from the dashboard when they need to understand what a conversation is about.

## 3. Business Impact Intelligence Engine

Evaluates business priority for a conversation.

Calculates urgency, revenue impact, high-risk assessment, reputation sensitivity, and escalation prediction.

Outputs a Business Impact Score, priority level, recommended team, and response SLA.

Users move here after conversation intelligence to understand why an issue matters and how it should be handled.

### User Flow

1. User lands on the Executive Intelligence Dashboard.
2. User selects a conversation from the Priority Queue or related views.
3. User reviews Conversation Intelligence insights.
4. User evaluates Business Impact Intelligence outputs.
5. User returns to the Dashboard with a clearer understanding of priority and next actions.

---

# Routing Structure

The application uses a small, intentional route set focused on the MVP journey.

| Route | Purpose |
| --- | --- |
| `/` | Executive Intelligence Dashboard |
| `/conversation/[id]` | Conversation Intelligence for a specific conversation |
| `/business-impact/[id]` | Business Impact Intelligence for a specific conversation |

Dynamic `[id]` segments resolve against mock conversation data and allow detail pages to feel production-like without a backend.

---

# Folder Structure

The project follows a scalable Next.js App Router layout.

```text
app/
components/
lib/
types/
mock/
public/
```

- **`app/`** — Application routes, layouts, and page-level composition using the App Router.
- **`components/`** — Reusable UI and feature components shared across dashboard and intelligence views.
- **`lib/`** — Shared utilities, helpers, formatting logic, and data-access wrappers around mock sources.
- **`types/`** — Shared TypeScript interfaces and type definitions for conversations, insights, scores, and KPIs.
- **`mock/`** — Realistic JSON datasets representing conversations, AI insights, business impact results, and dashboard metrics.
- **`public/`** — Static assets such as icons, images, and branding files.

This structure keeps routing, presentation, data contracts, and mock sources clearly separated.

---

# Component Architecture

Components should be modular, reusable, and focused on a single responsibility.

Core reusable components include:

- **KPI Cards** — Display high-level metrics such as total conversations, critical volume, and SLA performance.
- **Priority Queue** — Lists conversations ordered by business urgency and impact.
- **Conversation Card** — Summarizes channel, customer context, status, and priority for a single conversation.
- **AI Insight Card** — Presents structured AI outputs such as intent, sentiment, summary, and suggested reply.
- **Business Impact Score** — Visualizes score, priority, recommended team, and response SLA.
- **Timeline** — Shows conversation progression and key intelligence events.
- **Navigation** — Supports movement between dashboard and intelligence views.
- **Sidebar** — Provides persistent product navigation for an enterprise SaaS feel.
- **Header** — Displays page context, branding, and top-level actions.

Feature pages should compose these components rather than embedding large amounts of one-off UI logic.

---

# Data Flow

Data moves through the application in a linear intelligence pipeline.

Conversation

↓

Conversation Intelligence

↓

Business Impact Intelligence

↓

Dashboard

Mock JSON is the sole data source for the MVP.

Typical flow:

1. Mock conversation records provide the raw input.
2. Conversation Intelligence views consume precomputed insight fields from mock data.
3. Business Impact Intelligence views consume precomputed scoring and routing fields.
4. The Dashboard aggregates mock KPIs, priority queue items, and recommended actions.

Data-access helpers in `lib/` should abstract mock reads so pages and components do not depend directly on file paths or JSON structure. This keeps the UI ready for future API replacement.

---

# State Management

State should remain lightweight.

Recommended approach:

- **React State** for local UI state such as filters, selected tabs, and interactive controls.
- **Context API** only when shared state is clearly required across multiple views.

Avoid Redux or other heavy state libraries for the MVP.

Because the application is static and mock-driven, most data can be read at the page or feature level without a global store.

---

# Scalability

The architecture is intentionally modular so future production capabilities can be introduced without major restructuring.

Later integrations may include:

- **Backend APIs** — Replace mock data helpers in `lib/` with real service clients while preserving component contracts.
- **Authentication** — Add auth boundaries at the layout or route level without redesigning core modules.
- **Database** — Persist conversations, insights, and scoring results behind the same domain types defined in `types/`.
- **AI Services** — Swap mock insight and scoring payloads for live LLM or model responses.
- **Real-time Updates** — Stream dashboard and queue changes into existing components without changing the intelligence pipeline model.

Because routes, components, and types already mirror the product domains, infrastructure can grow around the current structure rather than forcing a rewrite.

---

# Engineering Principles

Development should follow these principles:

- Reusable components
- Clean architecture
- Strong TypeScript typing
- Separation of concerns
- Single responsibility principle
- Responsive design
- Performance optimization

The MVP should look and feel like a production enterprise SaaS product while remaining fully frontend-driven and mock-powered.
