# Telosa Insight – MVP Problem Statement

## Project Overview

Telosa Insight is an AI-powered Conversation Intelligence Platform designed for multi-location brands that receive customer conversations across multiple digital channels.

This MVP is based on the business scenario of Apollo Dental, a healthcare organization operating more than 250 clinics.

The goal is to demonstrate how AI can reduce manual conversation triage by automatically understanding customer conversations, identifying business-critical issues, and presenting actionable insights to CX leaders.

The MVP should simulate a realistic enterprise SaaS product rather than a prototype or proof of concept.

---

# Business Context

Apollo Dental receives customer conversations from multiple channels including:

- Google Reviews
- WhatsApp Business
- Email
- Website Chat

Every day, hundreds of conversations are received.

Examples include:

- Appointment requests
- Treatment enquiries
- Billing questions
- Refund requests
- Follow-up issues
- Complaints
- Positive feedback

Currently, these conversations are manually reviewed by clinic managers and customer experience teams.

The biggest challenge is not responding to conversations.

The challenge is identifying which conversations require immediate business attention.

As the CX Head states:

> "I don't need another inbox. I need to know what deserves my attention."

---

# Problem Statement

Customer conversations arrive through multiple disconnected channels.

Teams manually review every message to determine:

- What the customer wants
- Whether the issue is important
- Who should handle it
- How quickly they should respond

As conversation volume increases, this process becomes slow, inconsistent, and difficult to scale.

Critical conversations are often buried among routine requests, resulting in:

- Delayed escalations
- Missed revenue opportunities
- Poor customer experience
- Reputation risk
- Increased manual effort

The current workflow lacks an AI-driven decision layer that understands conversations and prioritizes them based on business impact.

---

# Proposed Solution

Build an AI-powered Decision Intelligence Platform that:

1. Understands every customer conversation.
2. Converts unstructured conversations into structured insights.
3. Determines business priority using AI.
4. Routes conversations to the appropriate team.
5. Presents actionable insights through an executive dashboard.

The platform should help CX teams focus on conversations that matter most instead of treating every conversation equally.

---

# Target Users

## Patient

- Books appointments
- Asks treatment questions
- Raises complaints
- Shares feedback

---

## Clinic Manager

- Reviews conversations
- Assigns issues
- Resolves customer complaints
- Monitors daily operations

---

## Regional Manager

- Oversees multiple clinics
- Handles escalations
- Tracks clinic performance

---

## CX Head

- Monitors customer experience across all clinics
- Identifies operational issues
- Tracks SLA compliance
- Makes business decisions

---

# MVP Goal

Validate the following hypothesis:

> AI-driven conversation understanding and prioritization will reduce manual triage effort and improve response times for business-critical customer conversations.

The MVP should focus only on validating this hypothesis.

---

# MVP Scope

The MVP will include only three core capabilities.

## 1. Conversation Intelligence Engine

Transforms raw conversations into structured insights.

Capabilities:

- Intent Detection
- Sentiment Analysis
- Entity Recognition
- AI Summary
- Duplicate Detection
- Spam Detection
- Suggested Reply

---

## 2. Business Impact Intelligence Engine

Calculates business priority using AI.

Business signals include:

- Urgency
- Revenue Impact
- High-Risk Assessment
- Reputation Sensitivity
- Escalation Prediction

Outputs:

- Business Impact Score
- Priority
- Recommended Team
- Response SLA

---

## 3. Executive Intelligence Dashboard

Displays:

- Total Conversations
- Critical Conversations
- Average Response Time
- Customer Satisfaction
- Priority Queue
- AI Insights
- Recommended Actions

---

# Supported Channels (MVP)

Only these channels will be supported.

- Google Reviews
- WhatsApp Business
- Email
- Website Chat

Additional channels will be considered future enhancements.

---

# Non-Goals

To keep the MVP focused and achievable within a 6-week timeline, the following capabilities are intentionally excluded from this release:

- User Authentication & Authorization
- Role-Based Access Control (RBAC)
- Backend APIs
- Database Integration
- Real AI Model Integration (LLMs)
- Real-time WebSocket Updates
- Notification System
- AI Chatbot
- Workflow Automation
- Advanced Analytics & Reporting
- Multi-language Support
- Mobile Application

The MVP should instead rely on realistic mock data to simulate conversations, AI-generated insights, business impact scoring, routing recommendations, and dashboard metrics.

---

# Demo Flow

The MVP should demonstrate one complete customer journey.

Example conversation:

"I've been waiting three days after my implant surgery and nobody has contacted me."

Flow:

1. Conversation received.
2. AI understands the conversation.
3. AI generates structured insights.
4. AI calculates Business Impact Score.
5. Conversation becomes Critical.
6. Dashboard updates automatically.

This single workflow should showcase the entire value proposition.

---

# Success Metrics

The MVP should demonstrate:

- ≥90% Conversation Classification Accuracy
- ≥50% Reduction in Manual Triage
- ≥30% Faster Response to Critical Conversations
- ≥20% Improvement in SLA Compliance

---

# Design Principles

The product should feel like an enterprise SaaS platform.

Design characteristics:

- Clean
- Minimal
- Executive-focused
- AI-first
- Modern
- High readability
- Responsive

Primary colors:

- Blue
- Purple
- Green
- White

Avoid unnecessary animations or flashy UI.

Focus on usability and decision-making.

---

# Technical Constraints

This MVP is intended to demonstrate product functionality rather than production infrastructure.

Implementation constraints:

- Frontend-only application
- No backend server
- No database
- No authentication or user management
- No real AI model or LLM integration
- No external APIs
- No payment integration
- No notifications
- No real-time communication

The application should use realistic mock JSON data to simulate:

- Customer conversations
- AI-generated conversation insights
- Business Impact Scores
- Dashboard KPIs
- Routing recommendations
- Suggested replies

The UI should appear production-ready while remaining fully static.

The architecture should be modular so that real APIs, authentication, databases, and AI services can be integrated in the future without major restructuring.

---

# Product Philosophy

Telosa Insight is not another omnichannel inbox.

It is an AI Decision Intelligence Platform.

The product follows a simple intelligence pipeline:

Raw Conversations

↓

Conversation Intelligence

↓

Business Impact Intelligence

↓

Executive Intelligence Dashboard

↓

Business Decisions

Every conversation deserves a response.

Not every conversation deserves the same priority.