# Mock Data Overview

All data used in the Telosa Insight MVP is static mock data designed to simulate realistic enterprise customer conversations for Apollo Dental.

The mock dataset replaces backend services, databases, and live AI models. It supports the complete end-to-end user journey:

Dashboard → Conversation Intelligence → Business Impact Intelligence → Return to Dashboard

Frontend development should treat this document as the source of truth for conversation records, AI insight payloads, business impact scores, dashboard KPIs, executive insights, and recommended actions.

Mock data must feel operationally realistic: mixed severity, multi-clinic volume, channel diversity, and consistent relationships between conversation content, AI interpretation, and business priority.

---

# Supported Channels

Conversations are distributed across the four MVP channels.

| Channel | Approximate Share | Count in Dataset |
| --- | --- | --- |
| Google Reviews | 25% | 5 |
| WhatsApp Business | 30% | 6 |
| Email | 25% | 5 |
| Website Chat | 20% | 4 |

**Total conversations:** 20

Channel distribution intentionally mixes public reputation risk (Google Reviews) with private operational channels (WhatsApp, Email, Website Chat).

---

# Customer Conversation Dataset

Generate and persist the following 20 conversations in mock JSON.

## Conversation Types Covered

- Complaints
- Appointment Requests
- Billing Questions
- Refund Requests
- Treatment Enquiries
- Positive Reviews
- Follow-up Issues
- Emergency Concerns

## Conversation Records

### CONV-001

| Field | Value |
| --- | --- |
| Unique ID | CONV-001 |
| Customer Name | Ananya Sharma |
| Channel | WhatsApp Business |
| Clinic | Apollo Dental Bandra, Mumbai |
| Date & Time | 2026-07-28 09:14 IST |
| Conversation Type | Emergency Concern |
| Conversation Text | I've been waiting three days after my implant surgery and nobody has contacted me. The pain is getting worse and I need someone to call me today. |

### CONV-002

| Field | Value |
| --- | --- |
| Unique ID | CONV-002 |
| Customer Name | Rohan Mehta |
| Channel | Google Reviews |
| Clinic | Apollo Dental Koramangala, Bengaluru |
| Date & Time | 2026-07-27 18:42 IST |
| Conversation Type | Complaint |
| Conversation Text | Extremely disappointed. I was charged extra for a cleaning that was supposed to be included in my package. Staff were rude when I asked for an explanation. Will not recommend. |

### CONV-003

| Field | Value |
| --- | --- |
| Unique ID | CONV-003 |
| Customer Name | Priya Nair |
| Channel | Email |
| Clinic | Apollo Dental Anna Nagar, Chennai |
| Date & Time | 2026-07-28 11:05 IST |
| Conversation Type | Appointment Request |
| Conversation Text | Hi, I would like to book a consultation for Invisalign / aligners next week. Preferably Tuesday or Thursday evening after 6 PM. Please confirm availability. |

### CONV-004

| Field | Value |
| --- | --- |
| Unique ID | CONV-004 |
| Customer Name | Vikram Singh |
| Channel | Website Chat |
| Clinic | Apollo Dental Connaught Place, Delhi |
| Date & Time | 2026-07-28 14:22 IST |
| Conversation Type | Billing Question |
| Conversation Text | My invoice shows two consultation fees for the same visit on 21 July. Can someone clarify whether this is a duplicate charge? |

### CONV-005

| Field | Value |
| --- | --- |
| Unique ID | CONV-005 |
| Customer Name | Sneha Kapoor |
| Channel | Email |
| Clinic | Apollo Dental Bandra, Mumbai |
| Date & Time | 2026-07-26 16:40 IST |
| Conversation Type | Refund Request |
| Conversation Text | I paid an advance for a root canal that was cancelled by the clinic due to doctor unavailability. Please process a full refund to my original payment method within this week. |

### CONV-006

| Field | Value |
| --- | --- |
| Unique ID | CONV-006 |
| Customer Name | Arjun Patel |
| Channel | WhatsApp Business |
| Clinic | Apollo Dental Satellite, Ahmedabad |
| Date & Time | 2026-07-28 10:03 IST |
| Conversation Type | Treatment Enquiry |
| Conversation Text | Do you offer ceramic braces for adults? What is the approximate treatment duration and starting cost at the Ahmedabad clinic? |

### CONV-007

| Field | Value |
| --- | --- |
| Unique ID | CONV-007 |
| Customer Name | Meera Iyer |
| Channel | Google Reviews |
| Clinic | Apollo Dental Jubilee Hills, Hyderabad |
| Date & Time | 2026-07-25 20:15 IST |
| Conversation Type | Positive Review |
| Conversation Text | Excellent experience with my whitening treatment. The hygienist explained every step and the clinic was spotless. Highly recommend Apollo Dental Jubilee Hills. |

### CONV-008

| Field | Value |
| --- | --- |
| Unique ID | CONV-008 |
| Customer Name | Kabir Khan |
| Channel | WhatsApp Business |
| Clinic | Apollo Dental Koramangala, Bengaluru |
| Date & Time | 2026-07-27 08:55 IST |
| Conversation Type | Follow-up Issue |
| Conversation Text | I had a filling done last Friday and the tooth still hurts when I drink cold water. Is this normal or should I come in for a check? |

### CONV-009

| Field | Value |
| --- | --- |
| Unique ID | CONV-009 |
| Customer Name | Divya Reddy |
| Channel | Website Chat |
| Clinic | Apollo Dental Banjara Hills, Hyderabad |
| Date & Time | 2026-07-28 12:48 IST |
| Conversation Type | Emergency Concern |
| Conversation Text | My child has severe tooth pain and facial swelling since morning. Do you take pediatric emergency walk-ins today? |

### CONV-010

| Field | Value |
| --- | --- |
| Unique ID | CONV-010 |
| Customer Name | Nikhil Joshi |
| Channel | Email |
| Clinic | Apollo Dental FC Road, Pune |
| Date & Time | 2026-07-24 13:10 IST |
| Conversation Type | Complaint |
| Conversation Text | My appointment was confirmed for 10 AM but I waited 55 minutes without any update. This is the second time this has happened at the Pune clinic. |

### CONV-011

| Field | Value |
| --- | --- |
| Unique ID | CONV-011 |
| Customer Name | Aisha Rahman |
| Channel | Google Reviews |
| Clinic | Apollo Dental Bandra, Mumbai |
| Date & Time | 2026-07-28 07:30 IST |
| Conversation Type | Complaint |
| Conversation Text | Post-implant follow-up has been terrible. Called three times, no callback. Pain after surgery should not be ignored. Extremely poor aftercare. |

### CONV-012

| Field | Value |
| --- | --- |
| Unique ID | CONV-012 |
| Customer Name | Harsh Verma |
| Channel | WhatsApp Business |
| Clinic | Apollo Dental Salt Lake, Kolkata |
| Date & Time | 2026-07-28 15:05 IST |
| Conversation Type | Appointment Request |
| Conversation Text | Can I reschedule my scaling appointment from Saturday 11 AM to Sunday morning? Something urgent came up at work. |

### CONV-013

| Field | Value |
| --- | --- |
| Unique ID | CONV-013 |
| Customer Name | Pooja Desai |
| Channel | Email |
| Clinic | Apollo Dental Navrangpura, Ahmedabad |
| Date & Time | 2026-07-27 17:28 IST |
| Conversation Type | Billing Question |
| Conversation Text | The insurance claim form for my crown procedure is missing the treatment code. Could you email the corrected invoice and claim documents? |

### CONV-014

| Field | Value |
| --- | --- |
| Unique ID | CONV-014 |
| Customer Name | Sameer Kulkarni |
| Channel | Website Chat |
| Clinic | Apollo Dental FC Road, Pune |
| Date & Time | 2026-07-28 09:40 IST |
| Conversation Type | Treatment Enquiry |
| Conversation Text | What is the difference between a dental implant and a bridge for a missing molar? Looking for cost and timeline comparison. |

### CONV-015

| Field | Value |
| --- | --- |
| Unique ID | CONV-015 |
| Customer Name | Neha Gupta |
| Channel | Google Reviews |
| Clinic | Apollo Dental Connaught Place, Delhi |
| Date & Time | 2026-07-26 19:05 IST |
| Conversation Type | Positive Review |
| Conversation Text | Very professional team. Root canal was painless and the doctor checked in the next day. Five stars. |

### CONV-016

| Field | Value |
| --- | --- |
| Unique ID | CONV-016 |
| Customer Name | Imran Sheikh |
| Channel | WhatsApp Business |
| Clinic | Apollo Dental Anna Nagar, Chennai |
| Date & Time | 2026-07-23 21:12 IST |
| Conversation Type | Refund Request |
| Conversation Text | I was billed for aligner refinements that were never delivered. Requesting a refund of ₹12,500 and a written confirmation. |

### CONV-017

| Field | Value |
| --- | --- |
| Unique ID | CONV-017 |
| Customer Name | Kavya Menon |
| Channel | Email |
| Clinic | Apollo Dental Jubilee Hills, Hyderabad |
| Date & Time | 2026-07-28 08:20 IST |
| Conversation Type | Follow-up Issue |
| Conversation Text | After my extraction on Monday, the bleeding stopped but I still have a bad taste and mild fever. Should I be concerned about infection? |

### CONV-018

| Field | Value |
| --- | --- |
| Unique ID | CONV-018 |
| Customer Name | Rahul Chatterjee |
| Channel | Website Chat |
| Clinic | Apollo Dental Salt Lake, Kolkata |
| Date & Time | 2026-07-28 16:15 IST |
| Conversation Type | Appointment Request |
| Conversation Text | Looking for a same-week appointment for a routine checkup and X-ray before starting braces consultation. |

### CONV-019

| Field | Value |
| --- | --- |
| Unique ID | CONV-019 |
| Customer Name | Fatima Qureshi |
| Channel | Google Reviews |
| Clinic | Apollo Dental Koramangala, Bengaluru |
| Date & Time | 2026-07-27 22:50 IST |
| Conversation Type | Complaint |
| Conversation Text | Front desk refused to honor a promotional cleaning package I booked online. Felt misled. Sharing this so others are careful. |

### CONV-020

| Field | Value |
| --- | --- |
| Unique ID | CONV-020 |
| Customer Name | Aditya Rao |
| Channel | WhatsApp Business |
| Clinic | Apollo Dental Bandra, Mumbai |
| Date & Time | 2026-07-28 13:33 IST |
| Conversation Type | Treatment Enquiry |
| Conversation Text | Do you provide sedation dentistry for anxious patients undergoing multiple fillings? Also, is weekend availability possible? |

---

# AI Conversation Intelligence

Every conversation includes simulated AI outputs. Values are realistic and consistent with the conversation text.

## CONV-001 — Ananya Sharma

| Field | Value |
| --- | --- |
| Intent | Post-treatment emergency follow-up |
| Sentiment | Negative |
| Entities | Implant surgery, 3 days, pain, callback request, Apollo Dental Bandra |
| Conversation Summary | Patient reports worsening pain three days after implant surgery with no clinic contact and requests an urgent callback. |
| Duplicate Detection | Possible duplicate of related implant aftercare thread at Bandra |
| Spam Detection | Not spam |
| Suggested Reply | We are sorry you have not received follow-up care. A clinician from Apollo Dental Bandra will contact you today to assess your post-implant pain and schedule urgent review if needed. |
| AI Confidence Score | 94% |

## CONV-002 — Rohan Mehta

| Field | Value |
| --- | --- |
| Intent | Billing dispute / service complaint |
| Sentiment | Negative |
| Entities | Cleaning package, extra charge, staff behavior, Koramangala |
| Conversation Summary | Public review alleging unexpected cleaning charges and rude staff interaction at Koramangala. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Thank you for sharing this feedback. We take billing transparency seriously and will review your package charges and clinic experience. Our CX team will follow up privately to resolve this. |
| AI Confidence Score | 91% |

## CONV-003 — Priya Nair

| Field | Value |
| --- | --- |
| Intent | Appointment booking |
| Sentiment | Neutral |
| Entities | Invisalign, aligners, Tuesday/Thursday after 6 PM, Anna Nagar |
| Conversation Summary | Customer requests evening aligner consultation slots next week in Chennai. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Thank you for your interest in aligners. We can offer Thursday 6:30 PM at Apollo Dental Anna Nagar. Reply yes to confirm or share another preferred time. |
| AI Confidence Score | 96% |

## CONV-004 — Vikram Singh

| Field | Value |
| --- | --- |
| Intent | Billing clarification |
| Sentiment | Neutral-Negative |
| Entities | Duplicate consultation fee, 21 July invoice, Connaught Place |
| Conversation Summary | Patient questions a possible duplicate consultation charge on a single visit invoice. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Thank you for flagging this. We will audit the 21 July invoice and confirm whether the second consultation fee was applied in error within one business day. |
| AI Confidence Score | 93% |

## CONV-005 — Sneha Kapoor

| Field | Value |
| --- | --- |
| Intent | Refund request |
| Sentiment | Negative |
| Entities | Root canal advance, clinic cancellation, full refund, Bandra |
| Conversation Summary | Patient requests full refund after clinic-cancelled root canal appointment. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | We apologize for the cancellation. Your refund request has been logged and finance will process the advance back to the original payment method within 5–7 business days. |
| AI Confidence Score | 95% |

## CONV-006 — Arjun Patel

| Field | Value |
| --- | --- |
| Intent | Treatment enquiry |
| Sentiment | Neutral |
| Entities | Ceramic braces, adults, duration, cost, Ahmedabad |
| Conversation Summary | Prospective patient asks about ceramic braces suitability, timeline, and starting cost. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Yes, we offer ceramic braces for adults. Typical treatment runs 12–24 months. Please book a complimentary orthodontic consult for a personalized cost estimate at Satellite clinic. |
| AI Confidence Score | 92% |

## CONV-007 — Meera Iyer

| Field | Value |
| --- | --- |
| Intent | Positive feedback |
| Sentiment | Positive |
| Entities | Whitening treatment, hygienist, Jubilee Hills |
| Conversation Summary | Highly positive public review of whitening treatment and clinic cleanliness. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Thank you for the wonderful review. We are delighted your whitening visit went well and look forward to serving you again at Jubilee Hills. |
| AI Confidence Score | 97% |

## CONV-008 — Kabir Khan

| Field | Value |
| --- | --- |
| Intent | Post-treatment follow-up |
| Sentiment | Concerned |
| Entities | Filling, cold sensitivity, Friday visit, Koramangala |
| Conversation Summary | Patient reports cold sensitivity after a recent filling and asks whether in-clinic review is needed. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Mild sensitivity can occur after a filling, but persistent pain deserves a check. We can reserve a short review slot tomorrow—reply with a preferred time. |
| AI Confidence Score | 90% |

## CONV-009 — Divya Reddy

| Field | Value |
| --- | --- |
| Intent | Pediatric emergency enquiry |
| Sentiment | Urgent / Negative |
| Entities | Child, severe tooth pain, facial swelling, walk-in, Banjara Hills |
| Conversation Summary | Parent reports child’s severe pain and facial swelling and asks about emergency walk-in availability. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Please bring your child in today. Facial swelling with severe pain needs urgent evaluation. Our Banjara Hills team will prioritize pediatric emergency walk-ins—call the clinic on arrival. |
| AI Confidence Score | 95% |

## CONV-010 — Nikhil Joshi

| Field | Value |
| --- | --- |
| Intent | Service delay complaint |
| Sentiment | Negative |
| Entities | 10 AM appointment, 55-minute wait, repeat issue, Pune |
| Conversation Summary | Patient complains about a long wait despite confirmation and notes a repeated delay pattern at Pune. |
| Duplicate Detection | Related to prior wait-time complaint pattern at FC Road |
| Spam Detection | Not spam |
| Suggested Reply | We apologize for the wait and for the repeated inconvenience. Operations will review today’s schedule slippage and a clinic manager will contact you to make this right. |
| AI Confidence Score | 89% |

## CONV-011 — Aisha Rahman

| Field | Value |
| --- | --- |
| Intent | Aftercare complaint / escalation risk |
| Sentiment | Strongly Negative |
| Entities | Implant follow-up, three unanswered calls, post-surgery pain, Bandra |
| Conversation Summary | Public review criticizing failed post-implant callbacks and aftercare quality in Mumbai. |
| Duplicate Detection | Likely related to CONV-001 implant aftercare theme at Bandra |
| Spam Detection | Not spam |
| Suggested Reply | We sincerely apologize for the lapse in aftercare. A senior clinician will contact you today. Implant recovery concerns are treated as priority cases at Apollo Dental. |
| AI Confidence Score | 93% |

## CONV-012 — Harsh Verma

| Field | Value |
| --- | --- |
| Intent | Appointment reschedule |
| Sentiment | Neutral |
| Entities | Scaling appointment, Saturday 11 AM to Sunday, Salt Lake |
| Conversation Summary | Patient requests moving a scaling appointment from Saturday to Sunday morning. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | We can help reschedule. Sunday 10:00 AM and 11:30 AM are open at Salt Lake—reply with your preferred slot to confirm. |
| AI Confidence Score | 98% |

## CONV-013 — Pooja Desai

| Field | Value |
| --- | --- |
| Intent | Insurance / billing documentation |
| Sentiment | Neutral |
| Entities | Crown procedure, insurance claim, treatment code, corrected invoice |
| Conversation Summary | Patient needs corrected invoice and claim documents with missing treatment code for a crown. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Thank you for letting us know. Billing will email the corrected invoice and insurance claim form with the treatment code today. |
| AI Confidence Score | 94% |

## CONV-014 — Sameer Kulkarni

| Field | Value |
| --- | --- |
| Intent | Treatment comparison enquiry |
| Sentiment | Neutral |
| Entities | Dental implant, bridge, missing molar, cost, timeline, Pune |
| Conversation Summary | Prospective patient asks for implant vs bridge comparison for a missing molar. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Both implants and bridges can replace a missing molar. The better option depends on bone health and adjacent teeth. We recommend a consult with X-rays for an accurate cost and timeline plan. |
| AI Confidence Score | 91% |

## CONV-015 — Neha Gupta

| Field | Value |
| --- | --- |
| Intent | Positive feedback |
| Sentiment | Positive |
| Entities | Root canal, follow-up call, Connaught Place |
| Conversation Summary | Positive public review highlighting painless root canal care and next-day doctor follow-up. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Thank you for your kind words. We are glad your root canal experience was comfortable and appreciate you recommending Apollo Dental CP. |
| AI Confidence Score | 97% |

## CONV-016 — Imran Sheikh

| Field | Value |
| --- | --- |
| Intent | Refund request |
| Sentiment | Negative |
| Entities | Aligner refinements, ₹12,500, written confirmation, Anna Nagar |
| Conversation Summary | Patient requests refund and written confirmation for undelivered aligner refinements. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | We apologize for the service gap. Your ₹12,500 refund request is under review and we will share written confirmation once finance approves the reversal. |
| AI Confidence Score | 92% |

## CONV-017 — Kavya Menon

| Field | Value |
| --- | --- |
| Intent | Post-extraction complication concern |
| Sentiment | Concerned |
| Entities | Extraction, bad taste, mild fever, infection concern, Jubilee Hills |
| Conversation Summary | Patient reports possible infection signs after extraction and seeks clinical guidance. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Fever and persistent bad taste after extraction should be examined promptly. Please visit Jubilee Hills today or tomorrow morning for an infection check. |
| AI Confidence Score | 90% |

## CONV-018 — Rahul Chatterjee

| Field | Value |
| --- | --- |
| Intent | Appointment booking |
| Sentiment | Neutral |
| Entities | Routine checkup, X-ray, braces consultation, same-week, Kolkata |
| Conversation Summary | Prospective patient wants same-week checkup and X-ray before braces consultation. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | We have Thursday 5:00 PM available for checkup and X-ray at Salt Lake, with braces consult packaging if needed. Shall we book it? |
| AI Confidence Score | 95% |

## CONV-019 — Fatima Qureshi

| Field | Value |
| --- | --- |
| Intent | Promotional offer dispute |
| Sentiment | Negative |
| Entities | Online promotional cleaning package, front desk refusal, Koramangala |
| Conversation Summary | Public review alleging refusal to honor an online promotional cleaning package. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | We are sorry for this experience. Our team is reviewing the online offer redemption issue and will contact you to honor a valid booking or provide an equivalent resolution. |
| AI Confidence Score | 88% |

## CONV-020 — Aditya Rao

| Field | Value |
| --- | --- |
| Intent | Treatment enquiry |
| Sentiment | Neutral |
| Entities | Sedation dentistry, anxious patients, multiple fillings, weekend availability, Bandra |
| Conversation Summary | Patient asks about sedation options for multiple fillings and weekend appointment availability. |
| Duplicate Detection | No duplicate found |
| Spam Detection | Not spam |
| Suggested Reply | Yes, sedation options are available for anxious patients. Weekend slots can be arranged based on clinician availability—share a preferred date and we will confirm. |
| AI Confidence Score | 93% |

---

# Business Impact Intelligence

Every conversation includes business signals and prioritization outputs. Values reflect realistic business reasoning.

Priority bands used in the MVP:

| Priority | Score Range |
| --- | --- |
| Critical | 80–100 |
| High | 65–79 |
| Medium | 40–64 |
| Low | 0–39 |

## CONV-001

| Field | Value |
| --- | --- |
| Urgency | Critical |
| Revenue Impact | High — implant case retention and possible corrective care |
| Reputation Risk | High — clinical aftercare failure theme |
| Escalation Prediction | Very likely within 24 hours |
| Business Impact Score | 96 |
| Priority | Critical |
| Assigned Team | CX Head + Clinic Manager |
| Response SLA | 1 hour |
| Recommended Action | Call patient immediately and schedule urgent post-implant review |

## CONV-002

| Field | Value |
| --- | --- |
| Urgency | High |
| Revenue Impact | Medium — package trust and future visit risk |
| Reputation Risk | High — public Google Review |
| Escalation Prediction | Likely if unanswered publicly |
| Business Impact Score | 84 |
| Priority | Critical |
| Assigned Team | CX Team |
| Response SLA | 2 hours |
| Recommended Action | Respond publicly and open private billing review |

## CONV-003

| Field | Value |
| --- | --- |
| Urgency | Medium |
| Revenue Impact | High — aligner case conversion opportunity |
| Reputation Risk | Low |
| Escalation Prediction | Unlikely |
| Business Impact Score | 58 |
| Priority | Medium |
| Assigned Team | Front Desk / Sales Consult |
| Response SLA | 4 hours |
| Recommended Action | Confirm evening consultation slot and capture lead |

## CONV-004

| Field | Value |
| --- | --- |
| Urgency | Medium |
| Revenue Impact | Medium — billing trust |
| Reputation Risk | Low |
| Escalation Prediction | Possible if unresolved |
| Business Impact Score | 61 |
| Priority | Medium |
| Assigned Team | Billing |
| Response SLA | 4 hours |
| Recommended Action | Audit invoice and clarify duplicate consultation fee |

## CONV-005

| Field | Value |
| --- | --- |
| Urgency | High |
| Revenue Impact | High — refund liability |
| Reputation Risk | Medium |
| Escalation Prediction | Likely if delayed beyond promised window |
| Business Impact Score | 79 |
| Priority | High |
| Assigned Team | Finance + Clinic Manager |
| Response SLA | 4 hours |
| Recommended Action | Approve and process full advance refund |

## CONV-006

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | Medium — orthodontic lead |
| Reputation Risk | Low |
| Escalation Prediction | Unlikely |
| Business Impact Score | 42 |
| Priority | Medium |
| Assigned Team | Treatment Coordinator |
| Response SLA | 8 hours |
| Recommended Action | Share ceramic braces overview and book consult |

## CONV-007

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | Positive — advocacy and retention |
| Reputation Risk | Positive signal |
| Escalation Prediction | None |
| Business Impact Score | 18 |
| Priority | Low |
| Assigned Team | CX Team |
| Response SLA | 24 hours |
| Recommended Action | Thank patient publicly and tag as brand advocate |

## CONV-008

| Field | Value |
| --- | --- |
| Urgency | Medium |
| Revenue Impact | Medium — prevent rework or complaint |
| Reputation Risk | Low |
| Escalation Prediction | Possible if pain worsens |
| Business Impact Score | 67 |
| Priority | High |
| Assigned Team | Clinic Manager |
| Response SLA | 2 hours |
| Recommended Action | Offer same-week clinical review for sensitivity |

## CONV-009

| Field | Value |
| --- | --- |
| Urgency | Critical |
| Revenue Impact | High — pediatric emergency care |
| Reputation Risk | High if delayed |
| Escalation Prediction | Very likely without same-day response |
| Business Impact Score | 98 |
| Priority | Critical |
| Assigned Team | Clinic Manager + On-call Dentist |
| Response SLA | 30 minutes |
| Recommended Action | Confirm emergency walk-in and prepare pediatric assessment |

## CONV-010

| Field | Value |
| --- | --- |
| Urgency | Medium |
| Revenue Impact | Medium — retention risk |
| Reputation Risk | Medium — repeat operational failure |
| Escalation Prediction | Likely if pattern continues |
| Business Impact Score | 72 |
| Priority | High |
| Assigned Team | Regional Manager |
| Response SLA | 3 hours |
| Recommended Action | Review Pune scheduling SLA and personally follow up |

## CONV-011

| Field | Value |
| --- | --- |
| Urgency | Critical |
| Revenue Impact | High — implant case and clinic reputation |
| Reputation Risk | Critical — public aftercare complaint |
| Escalation Prediction | Very likely; may attract further negative reviews |
| Business Impact Score | 97 |
| Priority | Critical |
| Assigned Team | CX Head |
| Response SLA | 1 hour |
| Recommended Action | Escalate implant aftercare failure and contact patient today |

## CONV-012

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | Low |
| Reputation Risk | Low |
| Escalation Prediction | Unlikely |
| Business Impact Score | 28 |
| Priority | Low |
| Assigned Team | Front Desk |
| Response SLA | 8 hours |
| Recommended Action | Offer Sunday scaling slots and confirm reschedule |

## CONV-013

| Field | Value |
| --- | --- |
| Urgency | Medium |
| Revenue Impact | Medium — claim processing dependency |
| Reputation Risk | Low |
| Escalation Prediction | Possible with insurer deadlines |
| Business Impact Score | 55 |
| Priority | Medium |
| Assigned Team | Billing |
| Response SLA | 4 hours |
| Recommended Action | Send corrected invoice and insurance documents |

## CONV-014

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | High — implant/bridge case potential |
| Reputation Risk | Low |
| Escalation Prediction | Unlikely |
| Business Impact Score | 50 |
| Priority | Medium |
| Assigned Team | Treatment Coordinator |
| Response SLA | 8 hours |
| Recommended Action | Book consult with X-ray for treatment comparison |

## CONV-015

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | Positive — reputation lift |
| Reputation Risk | Positive signal |
| Escalation Prediction | None |
| Business Impact Score | 15 |
| Priority | Low |
| Assigned Team | CX Team |
| Response SLA | 24 hours |
| Recommended Action | Public thank-you response on Google Reviews |

## CONV-016

| Field | Value |
| --- | --- |
| Urgency | High |
| Revenue Impact | High — ₹12,500 refund exposure |
| Reputation Risk | Medium |
| Escalation Prediction | Likely without written confirmation |
| Business Impact Score | 81 |
| Priority | Critical |
| Assigned Team | Finance + Clinic Manager |
| Response SLA | 2 hours |
| Recommended Action | Validate undelivered refinements and process refund |

## CONV-017

| Field | Value |
| --- | --- |
| Urgency | High |
| Revenue Impact | Medium — clinical risk mitigation |
| Reputation Risk | Medium |
| Escalation Prediction | Likely if infection develops |
| Business Impact Score | 86 |
| Priority | Critical |
| Assigned Team | Clinic Manager |
| Response SLA | 1 hour |
| Recommended Action | Schedule urgent post-extraction infection check |

## CONV-018

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | Medium — braces pipeline |
| Reputation Risk | Low |
| Escalation Prediction | Unlikely |
| Business Impact Score | 44 |
| Priority | Medium |
| Assigned Team | Front Desk |
| Response SLA | 8 hours |
| Recommended Action | Book same-week checkup and X-ray slot |

## CONV-019

| Field | Value |
| --- | --- |
| Urgency | High |
| Revenue Impact | Medium — promo trust and conversion loss |
| Reputation Risk | High — public Google Review |
| Escalation Prediction | Likely without public response |
| Business Impact Score | 83 |
| Priority | Critical |
| Assigned Team | CX Team |
| Response SLA | 2 hours |
| Recommended Action | Verify online offer and respond publicly with resolution path |

## CONV-020

| Field | Value |
| --- | --- |
| Urgency | Low |
| Revenue Impact | Medium — multi-filling case potential |
| Reputation Risk | Low |
| Escalation Prediction | Unlikely |
| Business Impact Score | 46 |
| Priority | Medium |
| Assigned Team | Treatment Coordinator |
| Response SLA | 8 hours |
| Recommended Action | Confirm sedation options and weekend availability |

---

# Dashboard Metrics

KPI values are derived from the 20-conversation dataset and should be treated as exact MVP targets.

| KPI | Value | Derivation Notes |
| --- | --- | --- |
| Total Conversations | 20 | Full mock dataset size |
| Critical Conversations | 7 | CONV-001, 002, 009, 011, 016, 017, 019 |
| High Priority Conversations | 3 | CONV-005, 008, 010 |
| Medium Priority Conversations | 7 | CONV-003, 004, 006, 013, 014, 018, 020 |
| Low Priority Conversations | 3 | CONV-007, 012, 015 |
| Average Response Time | 2.4 hours | Weighted operational average across open items |
| Customer Satisfaction | 78% | Blend of positive reviews and unresolved complaint pressure |
| Average AI Confidence | 93% | Mean of conversation confidence scores |
| Open Escalations | 5 | Critical clinical/reputation cases awaiting closure |
| Resolved Today | 4 | Mock resolved subset for dashboard realism |
| Negative Sentiment Share | 45% | Complaints, emergencies, and refund-driven negatives |
| Positive Sentiment Share | 10% | CONV-007 and CONV-015 |
| Google Review Conversations | 5 | Channel count |
| WhatsApp Conversations | 6 | Channel count |
| Email Conversations | 5 | Channel count |
| Website Chat Conversations | 4 | Channel count |

Do not replace these with vague placeholders. Frontend mock JSON should match these figures.

---

# AI Insights

Executive insight cards derived from the dataset themes.

1. **Implant aftercare complaints are clustering in Mumbai.**  
   CONV-001 and CONV-011 indicate failed post-implant follow-up at Apollo Dental Bandra.

2. **Apollo Dental Bandra has the highest negative sentiment concentration.**  
   Multiple critical and high-severity conversations originate from the Mumbai Bandra clinic.

3. **Refund requests increased in the current period.**  
   CONV-005 and CONV-016 represent material refund exposure, including a ₹12,500 aligner dispute.

4. **Public Google Reviews are driving reputation risk.**  
   Four of five Google Review conversations are negative or dispute-related; only one is strongly positive.

5. **Pediatric emergency demand needs faster clinic response.**  
   CONV-009 shows same-day facial swelling and pain requiring sub-hour SLA handling.

6. **Weekend and schedule reliability issues are emerging in Pune.**  
   CONV-010 highlights repeated wait-time failures that may require staffing or queue redesign.

7. **Aligner and orthodontic demand remains a conversion opportunity.**  
   CONV-003, CONV-006, CONV-014, CONV-016, and CONV-018 show active treatment interest across cities.

---

# Recommended Actions

AI-generated recommendations for the dashboard actions panel.

1. **Escalate implant aftercare failures at Mumbai Bandra.**  
   Assign CX Head oversight for CONV-001 and CONV-011 and mandate same-day clinician callbacks.

2. **Increase frontline responsiveness for pediatric emergencies.**  
   Ensure Banjara Hills and peer clinics can accept urgent walk-ins within 30 minutes.

3. **Respond publicly to negative Google Reviews within 2 hours.**  
   Prioritize CONV-002, CONV-011, and CONV-019 with empathetic public replies plus private resolution.

4. **Review appointment scheduling process at Pune FC Road.**  
   Investigate repeated wait-time breaches and publish an internal SLA recovery plan.

5. **Accelerate refund processing for cancelled or undelivered treatments.**  
   Clear CONV-005 and CONV-016 with finance confirmation and written closure notes.

6. **Convert high-intent treatment enquiries within the same business day.**  
   Route aligner, implant, and sedation leads to treatment coordinators with defined follow-up ownership.

7. **Thank and amplify positive reviewers.**  
   Publicly acknowledge CONV-007 and CONV-015 to balance reputation mix.

---

# Filters

Frontend filters should support the following realistic values.

## Channels

- All Channels
- Google Reviews
- WhatsApp Business
- Email
- Website Chat

## Priority

- All Priorities
- Critical
- High
- Medium
- Low

## Sentiment

- All Sentiments
- Positive
- Neutral
- Concerned
- Negative
- Strongly Negative

## Clinic

- All Clinics
- Apollo Dental Bandra, Mumbai
- Apollo Dental Koramangala, Bengaluru
- Apollo Dental Anna Nagar, Chennai
- Apollo Dental Connaught Place, Delhi
- Apollo Dental Satellite, Ahmedabad
- Apollo Dental Jubilee Hills, Hyderabad
- Apollo Dental Banjara Hills, Hyderabad
- Apollo Dental FC Road, Pune
- Apollo Dental Salt Lake, Kolkata
- Apollo Dental Navrangpura, Ahmedabad

## Conversation Type

- All Types
- Complaints
- Appointment Requests
- Billing Questions
- Refund Requests
- Treatment Enquiries
- Positive Reviews
- Follow-up Issues
- Emergency Concerns

## Date Range

- Today
- Last 7 Days
- Last 14 Days
- Custom Range

For the MVP mock window, all 20 conversations fall within **23 July 2026 – 28 July 2026**.

---

# Search Examples

Realistic search queries the UI should support against conversation text, entities, clinic names, and types.

| Query | Expected Matches (examples) |
| --- | --- |
| implant | CONV-001, CONV-011, CONV-014 |
| refund | CONV-005, CONV-016 |
| appointment | CONV-003, CONV-010, CONV-012, CONV-018 |
| billing | CONV-002, CONV-004, CONV-013 |
| aligners | CONV-003, CONV-016 |
| root canal | CONV-005, CONV-015 |
| swelling | CONV-009 |
| braces | CONV-006, CONV-018 |
| Pune | CONV-010, CONV-014 |
| Bandra | CONV-001, CONV-005, CONV-011, CONV-020 |
| Google | All Google Review conversations |
| fever | CONV-017 |
| sedation | CONV-020 |
| cleaning | CONV-002, CONV-019 |

Search should be case-insensitive and match against customer name, clinic, channel, conversation text, intent, and entities where practical.

---

# Data Relationships

The mock dataset must remain internally consistent across all screens.

## Relationship Rules

1. **Dashboard metrics match the conversation dataset.**  
   Total Conversations = 20. Critical Conversations = 7. Channel counts equal the dataset distribution.

2. **Business Impact Scores match the AI analysis.**  
   Severe clinical language, public complaints, refund exposure, and emergency cues map to higher scores. Positive reviews map to low scores.

3. **Priority Queue displays the highest Business Impact Scores first.**  
   Default sort order by Business Impact Score descending:

   1. CONV-009 — 98  
   2. CONV-011 — 97  
   3. CONV-001 — 96  
   4. CONV-017 — 86  
   5. CONV-002 — 84  
   6. CONV-019 — 83  
   7. CONV-016 — 81  
   8. CONV-005 — 79  
   9. CONV-010 — 72  
   10. CONV-008 — 67  
   11. CONV-004 — 61  
   12. CONV-003 — 58  
   13. CONV-013 — 55  
   14. CONV-014 — 50  
   15. CONV-020 — 46  
   16. CONV-018 — 44  
   17. CONV-006 — 42  
   18. CONV-012 — 28  
   19. CONV-007 — 18  
   20. CONV-015 — 15  

4. **Critical conversations appear consistently across all screens.**  
   A conversation marked Critical on the dashboard must remain Critical on Conversation Intelligence context chips and Business Impact priority badges.

5. **Conversation IDs are stable across the journey.**  
   Selecting CONV-001 on the dashboard opens `/conversation/CONV-001` and then `/business-impact/CONV-001` with the same customer, clinic, score, and recommendation set.

6. **AI Insights and Recommended Actions are grounded in the same records.**  
   Insight statements about implant complaints, refunds, Pune delays, and Google Review risk must map to concrete conversation IDs above.

7. **Duplicate Detection remains coherent.**  
   CONV-001 and CONV-011 may surface as related implant-aftercare issues at Bandra. Other records default to no duplicate unless noted.

This document is the dataset specification for frontend mock JSON authoring. It does not include application implementation code.
