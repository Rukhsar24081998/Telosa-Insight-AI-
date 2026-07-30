import { clinics } from "@/mock/clinics";
import { patients } from "@/mock/patients";
import type {
  AIAnalysis,
  Conversation,
  ConversationChannel,
  ConversationStatus,
  ConversationTimelineEvent,
  Team,
} from "@/types/domain";

export type ConversationSeed = {
  id: string;
  patientId: string;
  clinicId: string;
  channel: ConversationChannel;
  createdAt: string;
  text: string;
  status: ConversationStatus;
  assignedTeam: Team;
  conversationType: string;
  tags?: string[];
  aiAnalysis: AIAnalysis;
  timeline: ConversationTimelineEvent[];
};

function clinic(id: string) {
  const found = clinics.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown clinic: ${id}`);
  }
  return found;
}

function patient(id: string) {
  const found = patients.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown patient: ${id}`);
  }
  return found;
}

export const conversationSeeds: ConversationSeed[] = [
  {
    id: "CONV-001",
    patientId: "pat-001",
    clinicId: "clinic-bandra",
    channel: "WhatsApp",
    createdAt: "2026-07-28T09:14:00+05:30",
    text: "I've been waiting three days after my implant surgery and nobody has contacted me. The pain is getting worse and I need someone to call me today.",
    status: "Escalated",
    assignedTeam: "CX Head",
    conversationType: "Emergency Concern",
    tags: ["implant", "aftercare", "high-value"],
    aiAnalysis: {
      intent: "Emergency Concern",
      sentiment: "Negative",
      entities: [
        { type: "treatment", value: "implant surgery" },
        { type: "timeframe", value: "3 days" },
        { type: "symptom", value: "worsening pain" },
        { type: "clinic", value: "Apollo Dental Bandra" },
      ],
      summary:
        "High-value patient reports worsening pain three days after implant surgery with no clinic contact and requests an urgent callback.",
      suggestedReply:
        "We are sorry you have not received follow-up care. A clinician from Apollo Dental Bandra will contact you today to assess your post-implant pain and schedule urgent review if needed.",
      confidence: 94,
      isDuplicate: true,
      isSpam: false,
      duplicateOfId: "CONV-011",
      source: "mock",
    },
    timeline: [
      {
        id: "tl-001-1",
        type: "Received",
        label: "Conversation received",
        occurredAt: "2026-07-28T09:14:00+05:30",
      },
      {
        id: "tl-001-2",
        type: "AI Analyzed",
        label: "AI analysis completed",
        occurredAt: "2026-07-28T09:14:08+05:30",
      },
      {
        id: "tl-001-3",
        type: "Escalated",
        label: "Marked for escalation",
        occurredAt: "2026-07-28T09:14:12+05:30",
      },
    ],
  },
  {
    id: "CONV-002",
    patientId: "pat-002",
    clinicId: "clinic-koramangala",
    channel: "Google Reviews",
    createdAt: "2026-07-27T18:42:00+05:30",
    text: "Extremely disappointed. I was charged extra for a cleaning that was supposed to be included in my package. Staff were rude when I asked for an explanation. Will not recommend.",
    status: "In Progress",
    assignedTeam: "CX Team",
    conversationType: "Complaint",
    tags: ["billing", "reputation"],
    aiAnalysis: {
      intent: "Billing Dispute",
      sentiment: "Negative",
      entities: [
        { type: "treatment", value: "cleaning package" },
        { type: "issue", value: "extra charge" },
        { type: "clinic", value: "Apollo Dental Koramangala" },
      ],
      summary:
        "Public review alleging unexpected cleaning charges and rude staff interaction at Koramangala.",
      suggestedReply:
        "Thank you for sharing this feedback. We take billing transparency seriously and will review your package charges and clinic experience. Our CX team will follow up privately to resolve this.",
      confidence: 91,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-002-1",
        type: "Received",
        label: "Google Review received",
        occurredAt: "2026-07-27T18:42:00+05:30",
      },
      {
        id: "tl-002-2",
        type: "AI Analyzed",
        label: "AI analysis completed",
        occurredAt: "2026-07-27T18:42:10+05:30",
      },
    ],
  },
  {
    id: "CONV-003",
    patientId: "pat-003",
    clinicId: "clinic-anna-nagar",
    channel: "Email",
    createdAt: "2026-07-28T11:05:00+05:30",
    text: "Hi, I would like to book a consultation for Invisalign / aligners next week. Preferably Tuesday or Thursday evening after 6 PM. Please confirm availability.",
    status: "New",
    assignedTeam: "Front Desk",
    conversationType: "Appointment Request",
    tags: ["aligners", "lead"],
    aiAnalysis: {
      intent: "Appointment Booking",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "Invisalign" },
        { type: "treatment", value: "aligners" },
        { type: "preference", value: "Tuesday or Thursday after 6 PM" },
      ],
      summary:
        "High-intent patient requests an evening aligner consultation next week in Chennai.",
      suggestedReply:
        "Thank you for your interest in aligners. We can offer Thursday 6:30 PM at Apollo Dental Anna Nagar. Reply yes to confirm or share another preferred time.",
      confidence: 96,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-003-1",
        type: "Received",
        label: "Email received",
        occurredAt: "2026-07-28T11:05:00+05:30",
      },
    ],
  },
  {
    id: "CONV-004",
    patientId: "pat-004",
    clinicId: "clinic-cp",
    channel: "Website Chat",
    createdAt: "2026-07-28T14:22:00+05:30",
    text: "My invoice shows two consultation fees for the same visit on 21 July. Can someone clarify whether this is a duplicate charge?",
    status: "Awaiting Response",
    assignedTeam: "Billing",
    conversationType: "Billing Question",
    tags: ["billing"],
    aiAnalysis: {
      intent: "Billing Question",
      sentiment: "Concerned",
      entities: [
        { type: "invoice_date", value: "21 July" },
        { type: "issue", value: "duplicate consultation fee" },
      ],
      summary:
        "Patient questions a possible duplicate consultation charge on a single-visit invoice.",
      suggestedReply:
        "Thank you for flagging this. We will audit the 21 July invoice and confirm whether the second consultation fee was applied in error within one business day.",
      confidence: 93,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-004-1",
        type: "Received",
        label: "Website chat received",
        occurredAt: "2026-07-28T14:22:00+05:30",
      },
    ],
  },
  {
    id: "CONV-005",
    patientId: "pat-005",
    clinicId: "clinic-bandra",
    channel: "Email",
    createdAt: "2026-07-26T16:40:00+05:30",
    text: "I paid an advance for a root canal that was cancelled by the clinic due to doctor unavailability. Please process a full refund to my original payment method within this week.",
    status: "In Progress",
    assignedTeam: "Finance",
    conversationType: "Refund Request",
    tags: ["refund", "root canal"],
    aiAnalysis: {
      intent: "Refund Request",
      sentiment: "Negative",
      entities: [
        { type: "treatment", value: "root canal" },
        { type: "issue", value: "clinic cancellation" },
        { type: "request", value: "full refund" },
      ],
      summary:
        "Patient requests a full refund after a clinic-cancelled root canal appointment.",
      suggestedReply:
        "We apologize for the cancellation. Your refund request has been logged and finance will process the advance back to the original payment method within 5–7 business days.",
      confidence: 95,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-005-1",
        type: "Received",
        label: "Refund request received",
        occurredAt: "2026-07-26T16:40:00+05:30",
      },
    ],
  },
  {
    id: "CONV-006",
    patientId: "pat-006",
    clinicId: "clinic-satellite",
    channel: "WhatsApp",
    createdAt: "2026-07-28T10:03:00+05:30",
    text: "Do you offer ceramic braces for adults? What is the approximate treatment duration and starting cost at the Ahmedabad clinic?",
    status: "New",
    assignedTeam: "Treatment Coordinator",
    conversationType: "Treatment Enquiry",
    tags: ["braces", "lead"],
    aiAnalysis: {
      intent: "Treatment Enquiry",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "ceramic braces" },
        { type: "audience", value: "adults" },
        { type: "city", value: "Ahmedabad" },
      ],
      summary:
        "Prospective patient asks about ceramic braces suitability, timeline, and starting cost.",
      suggestedReply:
        "Yes, we offer ceramic braces for adults. Typical treatment runs 12–24 months. Please book a complimentary orthodontic consult for a personalized cost estimate at Satellite clinic.",
      confidence: 92,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-006-1",
        type: "Received",
        label: "WhatsApp enquiry received",
        occurredAt: "2026-07-28T10:03:00+05:30",
      },
    ],
  },
  {
    id: "CONV-007",
    patientId: "pat-007",
    clinicId: "clinic-jubilee",
    channel: "Google Reviews",
    createdAt: "2026-07-25T20:15:00+05:30",
    text: "Excellent experience with my whitening treatment. The hygienist explained every step and the clinic was spotless. Highly recommend Apollo Dental Jubilee Hills.",
    status: "Resolved",
    assignedTeam: "CX Team",
    conversationType: "Positive Review",
    tags: ["whitening", "advocacy"],
    aiAnalysis: {
      intent: "Positive Feedback",
      sentiment: "Positive",
      entities: [
        { type: "treatment", value: "whitening" },
        { type: "clinic", value: "Apollo Dental Jubilee Hills" },
      ],
      summary:
        "Highly positive public review of whitening treatment and clinic cleanliness.",
      suggestedReply:
        "Thank you for the wonderful review. We are delighted your whitening visit went well and look forward to serving you again at Jubilee Hills.",
      confidence: 97,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-007-1",
        type: "Received",
        label: "Positive review received",
        occurredAt: "2026-07-25T20:15:00+05:30",
      },
      {
        id: "tl-007-2",
        type: "Resolved",
        label: "Public thank-you posted",
        occurredAt: "2026-07-25T21:00:00+05:30",
      },
    ],
  },
  {
    id: "CONV-008",
    patientId: "pat-008",
    clinicId: "clinic-koramangala",
    channel: "WhatsApp",
    createdAt: "2026-07-27T08:55:00+05:30",
    text: "I had a filling done last Friday and the tooth still hurts when I drink cold water. Is this normal or should I come in for a check?",
    status: "Awaiting Response",
    assignedTeam: "Clinic Manager",
    conversationType: "Follow-up Issue",
    tags: ["filling", "sensitivity"],
    aiAnalysis: {
      intent: "Follow-up Issue",
      sentiment: "Concerned",
      entities: [
        { type: "treatment", value: "filling" },
        { type: "symptom", value: "cold sensitivity" },
        { type: "timeframe", value: "last Friday" },
      ],
      summary:
        "Patient reports cold sensitivity after a recent filling and asks whether in-clinic review is needed.",
      suggestedReply:
        "Mild sensitivity can occur after a filling, but persistent pain deserves a check. We can reserve a short review slot tomorrow—reply with a preferred time.",
      confidence: 90,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-008-1",
        type: "Received",
        label: "Follow-up received",
        occurredAt: "2026-07-27T08:55:00+05:30",
      },
    ],
  },
  {
    id: "CONV-009",
    patientId: "pat-009",
    clinicId: "clinic-banjara",
    channel: "Website Chat",
    createdAt: "2026-07-28T12:48:00+05:30",
    text: "My child has severe tooth pain and facial swelling since morning. Do you take pediatric emergency walk-ins today?",
    status: "Escalated",
    assignedTeam: "On-call Dentist",
    conversationType: "Emergency Concern",
    tags: ["pediatric", "emergency", "high-value"],
    aiAnalysis: {
      intent: "Emergency Concern",
      sentiment: "Strongly Negative",
      entities: [
        { type: "patient", value: "child" },
        { type: "symptom", value: "severe tooth pain" },
        { type: "symptom", value: "facial swelling" },
        { type: "request", value: "emergency walk-in" },
      ],
      summary:
        "Parent reports child’s severe pain and facial swelling and asks about same-day emergency walk-in availability.",
      suggestedReply:
        "Please bring your child in today. Facial swelling with severe pain needs urgent evaluation. Our Banjara Hills team will prioritize pediatric emergency walk-ins—call the clinic on arrival.",
      confidence: 95,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-009-1",
        type: "Received",
        label: "Emergency chat received",
        occurredAt: "2026-07-28T12:48:00+05:30",
      },
      {
        id: "tl-009-2",
        type: "Escalated",
        label: "Routed to on-call dentist",
        occurredAt: "2026-07-28T12:48:20+05:30",
      },
    ],
  },
  {
    id: "CONV-010",
    patientId: "pat-010",
    clinicId: "clinic-fc-road",
    channel: "Email",
    createdAt: "2026-07-24T13:10:00+05:30",
    text: "My appointment was confirmed for 10 AM but I waited 55 minutes without any update. This is the second time this has happened at the Pune clinic.",
    status: "In Progress",
    assignedTeam: "Regional Manager",
    conversationType: "Complaint",
    tags: ["wait-time", "operations"],
    aiAnalysis: {
      intent: "Complaint",
      sentiment: "Negative",
      entities: [
        { type: "appointment_time", value: "10 AM" },
        { type: "wait", value: "55 minutes" },
        { type: "clinic", value: "Pune" },
      ],
      summary:
        "Patient complains about a long wait despite confirmation and notes a repeated delay pattern at Pune.",
      suggestedReply:
        "We apologize for the wait and for the repeated inconvenience. Operations will review today’s schedule slippage and a clinic manager will contact you to make this right.",
      confidence: 89,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-010-1",
        type: "Received",
        label: "Complaint received",
        occurredAt: "2026-07-24T13:10:00+05:30",
      },
    ],
  },
  {
    id: "CONV-011",
    patientId: "pat-011",
    clinicId: "clinic-bandra",
    channel: "Google Reviews",
    createdAt: "2026-07-28T07:30:00+05:30",
    text: "Post-implant follow-up has been terrible. Called three times, no callback. Pain after surgery should not be ignored. Extremely poor aftercare.",
    status: "Escalated",
    assignedTeam: "CX Head",
    conversationType: "Complaint",
    tags: ["implant", "aftercare", "reputation", "high-value"],
    aiAnalysis: {
      intent: "Complaint",
      sentiment: "Strongly Negative",
      entities: [
        { type: "treatment", value: "implant" },
        { type: "issue", value: "no callback" },
        { type: "symptom", value: "post-surgery pain" },
        { type: "clinic", value: "Apollo Dental Bandra" },
      ],
      summary:
        "Public review criticizing failed post-implant callbacks and aftercare quality in Mumbai.",
      suggestedReply:
        "We sincerely apologize for the lapse in aftercare. A senior clinician will contact you today. Implant recovery concerns are treated as priority cases at Apollo Dental.",
      confidence: 93,
      isDuplicate: true,
      isSpam: false,
      duplicateOfId: "CONV-001",
      source: "mock",
    },
    timeline: [
      {
        id: "tl-011-1",
        type: "Received",
        label: "Critical review received",
        occurredAt: "2026-07-28T07:30:00+05:30",
      },
      {
        id: "tl-011-2",
        type: "Escalated",
        label: "Escalated to CX Head",
        occurredAt: "2026-07-28T07:30:30+05:30",
      },
    ],
  },
  {
    id: "CONV-012",
    patientId: "pat-012",
    clinicId: "clinic-salt-lake",
    channel: "WhatsApp",
    createdAt: "2026-07-28T15:05:00+05:30",
    text: "Can I reschedule my scaling appointment from Saturday 11 AM to Sunday morning? Something urgent came up at work.",
    status: "New",
    assignedTeam: "Front Desk",
    conversationType: "Appointment Request",
    tags: ["scaling", "reschedule"],
    aiAnalysis: {
      intent: "Appointment Reschedule",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "scaling" },
        { type: "from", value: "Saturday 11 AM" },
        { type: "to", value: "Sunday morning" },
      ],
      summary:
        "Patient requests moving a scaling appointment from Saturday to Sunday morning.",
      suggestedReply:
        "We can help reschedule. Sunday 10:00 AM and 11:30 AM are open at Salt Lake—reply with your preferred slot to confirm.",
      confidence: 98,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-012-1",
        type: "Received",
        label: "Reschedule request received",
        occurredAt: "2026-07-28T15:05:00+05:30",
      },
    ],
  },
  {
    id: "CONV-013",
    patientId: "pat-013",
    clinicId: "clinic-navrangpura",
    channel: "Email",
    createdAt: "2026-07-27T17:28:00+05:30",
    text: "The insurance claim form for my crown procedure is missing the treatment code. Could you email the corrected invoice and claim documents?",
    status: "Awaiting Response",
    assignedTeam: "Billing",
    conversationType: "Billing Question",
    tags: ["insurance", "crown"],
    aiAnalysis: {
      intent: "Billing Question",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "crown" },
        { type: "document", value: "insurance claim form" },
        { type: "issue", value: "missing treatment code" },
      ],
      summary:
        "Patient needs corrected invoice and claim documents with a missing treatment code for a crown.",
      suggestedReply:
        "Thank you for letting us know. Billing will email the corrected invoice and insurance claim form with the treatment code today.",
      confidence: 94,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-013-1",
        type: "Received",
        label: "Insurance document request received",
        occurredAt: "2026-07-27T17:28:00+05:30",
      },
    ],
  },
  {
    id: "CONV-014",
    patientId: "pat-014",
    clinicId: "clinic-fc-road",
    channel: "Website Chat",
    createdAt: "2026-07-28T09:40:00+05:30",
    text: "What is the difference between a dental implant and a bridge for a missing molar? Looking for cost and timeline comparison.",
    status: "New",
    assignedTeam: "Treatment Coordinator",
    conversationType: "Treatment Enquiry",
    tags: ["implant", "bridge", "high-value"],
    aiAnalysis: {
      intent: "Treatment Enquiry",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "dental implant" },
        { type: "treatment", value: "bridge" },
        { type: "tooth", value: "missing molar" },
      ],
      summary:
        "High-value lead asks for implant vs bridge comparison for a missing molar.",
      suggestedReply:
        "Both implants and bridges can replace a missing molar. The better option depends on bone health and adjacent teeth. We recommend a consult with X-rays for an accurate cost and timeline plan.",
      confidence: 91,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-014-1",
        type: "Received",
        label: "Treatment enquiry received",
        occurredAt: "2026-07-28T09:40:00+05:30",
      },
    ],
  },
  {
    id: "CONV-015",
    patientId: "pat-015",
    clinicId: "clinic-cp",
    channel: "Google Reviews",
    createdAt: "2026-07-26T19:05:00+05:30",
    text: "Very professional team. Root canal was painless and the doctor checked in the next day. Five stars.",
    status: "Resolved",
    assignedTeam: "CX Team",
    conversationType: "Positive Review",
    tags: ["root canal", "advocacy"],
    aiAnalysis: {
      intent: "Positive Feedback",
      sentiment: "Positive",
      entities: [
        { type: "treatment", value: "root canal" },
        { type: "clinic", value: "Apollo Dental Connaught Place" },
      ],
      summary:
        "Positive public review highlighting painless root canal care and next-day doctor follow-up.",
      suggestedReply:
        "Thank you for your kind words. We are glad your root canal experience was comfortable and appreciate you recommending Apollo Dental CP.",
      confidence: 97,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-015-1",
        type: "Received",
        label: "Positive review received",
        occurredAt: "2026-07-26T19:05:00+05:30",
      },
      {
        id: "tl-015-2",
        type: "Resolved",
        label: "Public thank-you posted",
        occurredAt: "2026-07-26T19:40:00+05:30",
      },
    ],
  },
  {
    id: "CONV-016",
    patientId: "pat-016",
    clinicId: "clinic-anna-nagar",
    channel: "WhatsApp",
    createdAt: "2026-07-23T21:12:00+05:30",
    text: "I was billed for aligner refinements that were never delivered. Requesting a refund of ₹12,500 and a written confirmation.",
    status: "Escalated",
    assignedTeam: "Finance",
    conversationType: "Refund Request",
    tags: ["refund", "aligners"],
    aiAnalysis: {
      intent: "Refund Request",
      sentiment: "Negative",
      entities: [
        { type: "treatment", value: "aligner refinements" },
        { type: "amount", value: "₹12,500" },
        { type: "request", value: "written confirmation" },
      ],
      summary:
        "Patient requests refund and written confirmation for undelivered aligner refinements.",
      suggestedReply:
        "We apologize for the service gap. Your ₹12,500 refund request is under review and we will share written confirmation once finance approves the reversal.",
      confidence: 92,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-016-1",
        type: "Received",
        label: "Refund dispute received",
        occurredAt: "2026-07-23T21:12:00+05:30",
      },
    ],
  },
  {
    id: "CONV-017",
    patientId: "pat-017",
    clinicId: "clinic-jubilee",
    channel: "Email",
    createdAt: "2026-07-28T08:20:00+05:30",
    text: "After my extraction on Monday, the bleeding stopped but I still have a bad taste and mild fever. Should I be concerned about infection?",
    status: "Escalated",
    assignedTeam: "Clinic Manager",
    conversationType: "Follow-up Issue",
    tags: ["extraction", "infection-risk"],
    aiAnalysis: {
      intent: "Follow-up Issue",
      sentiment: "Concerned",
      entities: [
        { type: "treatment", value: "extraction" },
        { type: "symptom", value: "bad taste" },
        { type: "symptom", value: "mild fever" },
        { type: "risk", value: "infection" },
      ],
      summary:
        "Patient reports possible infection signs after extraction and seeks clinical guidance.",
      suggestedReply:
        "Fever and persistent bad taste after extraction should be examined promptly. Please visit Jubilee Hills today or tomorrow morning for an infection check.",
      confidence: 90,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-017-1",
        type: "Received",
        label: "Post-op concern received",
        occurredAt: "2026-07-28T08:20:00+05:30",
      },
    ],
  },
  {
    id: "CONV-018",
    patientId: "pat-018",
    clinicId: "clinic-salt-lake",
    channel: "Website Chat",
    createdAt: "2026-07-28T16:15:00+05:30",
    text: "Looking for a same-week appointment for a routine checkup and X-ray before starting braces consultation.",
    status: "New",
    assignedTeam: "Front Desk",
    conversationType: "Appointment Request",
    tags: ["checkup", "braces"],
    aiAnalysis: {
      intent: "Appointment Booking",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "checkup" },
        { type: "treatment", value: "X-ray" },
        { type: "treatment", value: "braces consultation" },
      ],
      summary:
        "Prospective patient wants a same-week checkup and X-ray before braces consultation.",
      suggestedReply:
        "We have Thursday 5:00 PM available for checkup and X-ray at Salt Lake, with braces consult packaging if needed. Shall we book it?",
      confidence: 95,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-018-1",
        type: "Received",
        label: "Booking enquiry received",
        occurredAt: "2026-07-28T16:15:00+05:30",
      },
    ],
  },
  {
    id: "CONV-019",
    patientId: "pat-019",
    clinicId: "clinic-koramangala",
    channel: "Google Reviews",
    createdAt: "2026-07-27T22:50:00+05:30",
    text: "Front desk refused to honor a promotional cleaning package I booked online. Felt misled. Sharing this so others are careful.",
    status: "In Progress",
    assignedTeam: "CX Team",
    conversationType: "Complaint",
    tags: ["promo", "reputation"],
    aiAnalysis: {
      intent: "Complaint",
      sentiment: "Negative",
      entities: [
        { type: "offer", value: "promotional cleaning package" },
        { type: "issue", value: "offer not honored" },
      ],
      summary:
        "Public review alleging refusal to honor an online promotional cleaning package.",
      suggestedReply:
        "We are sorry for this experience. Our team is reviewing the online offer redemption issue and will contact you to honor a valid booking or provide an equivalent resolution.",
      confidence: 88,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-019-1",
        type: "Received",
        label: "Promo dispute review received",
        occurredAt: "2026-07-27T22:50:00+05:30",
      },
    ],
  },
  {
    id: "CONV-020",
    patientId: "pat-020",
    clinicId: "clinic-bandra",
    channel: "WhatsApp",
    createdAt: "2026-07-28T13:33:00+05:30",
    text: "Do you provide sedation dentistry for anxious patients undergoing multiple fillings? Also, is weekend availability possible?",
    status: "New",
    assignedTeam: "Treatment Coordinator",
    conversationType: "Treatment Enquiry",
    tags: ["sedation", "high-value"],
    aiAnalysis: {
      intent: "Treatment Enquiry",
      sentiment: "Neutral",
      entities: [
        { type: "treatment", value: "sedation dentistry" },
        { type: "treatment", value: "multiple fillings" },
        { type: "preference", value: "weekend availability" },
      ],
      summary:
        "High-value patient asks about sedation options for multiple fillings and weekend appointment availability.",
      suggestedReply:
        "Yes, sedation options are available for anxious patients. Weekend slots can be arranged based on clinician availability—share a preferred date and we will confirm.",
      confidence: 93,
      isDuplicate: false,
      isSpam: false,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-020-1",
        type: "Received",
        label: "Sedation enquiry received",
        occurredAt: "2026-07-28T13:33:00+05:30",
      },
    ],
  },
  {
    id: "CONV-021",
    patientId: "pat-021",
    clinicId: "clinic-cp",
    channel: "Email",
    createdAt: "2026-07-28T11:55:00+05:30",
    text: "CONGRATULATIONS!!! You have been selected for a FREE teeth whitening cruise package. Click http://totally-not-spam.example/win now to claim your prize before midnight!!!",
    status: "Closed",
    assignedTeam: "CX Team",
    conversationType: "Spam",
    tags: ["spam"],
    aiAnalysis: {
      intent: "Spam",
      sentiment: "Neutral",
      entities: [
        { type: "url", value: "http://totally-not-spam.example/win" },
        { type: "offer", value: "FREE teeth whitening cruise package" },
      ],
      summary:
        "Unsolicited promotional spam message with suspicious link and urgency bait.",
      suggestedReply:
        "No patient response required. Message flagged as spam and excluded from priority queues.",
      confidence: 99,
      isDuplicate: false,
      isSpam: true,
      source: "mock",
    },
    timeline: [
      {
        id: "tl-021-1",
        type: "Received",
        label: "Message received",
        occurredAt: "2026-07-28T11:55:00+05:30",
      },
      {
        id: "tl-021-2",
        type: "Note",
        label: "Marked as spam",
        occurredAt: "2026-07-28T11:55:05+05:30",
      },
    ],
  },
  {
    id: "CONV-022",
    patientId: "pat-022",
    clinicId: "clinic-bandra",
    channel: "WhatsApp",
    createdAt: "2026-07-28T10:05:00+05:30",
    text: "Following up again on my implant surgery. Still no call after three days and the pain is worse. Please escalate this now.",
    status: "Escalated",
    assignedTeam: "CX Head",
    conversationType: "Emergency Concern",
    tags: ["implant", "duplicate", "high-value"],
    aiAnalysis: {
      intent: "Emergency Concern",
      sentiment: "Strongly Negative",
      entities: [
        { type: "treatment", value: "implant surgery" },
        { type: "timeframe", value: "three days" },
        { type: "symptom", value: "worsening pain" },
      ],
      summary:
        "Duplicate follow-up from the same implant aftercare case requesting immediate escalation.",
      suggestedReply:
        "We have linked this to your earlier message and escalated to the clinic manager and CX Head. You will receive a clinician callback shortly.",
      confidence: 96,
      isDuplicate: true,
      isSpam: false,
      duplicateOfId: "CONV-001",
      source: "mock",
    },
    timeline: [
      {
        id: "tl-022-1",
        type: "Received",
        label: "Duplicate follow-up received",
        occurredAt: "2026-07-28T10:05:00+05:30",
      },
      {
        id: "tl-022-2",
        type: "Note",
        label: "Linked to CONV-001",
        description: "Duplicate of implant aftercare thread",
        occurredAt: "2026-07-28T10:05:08+05:30",
      },
    ],
  },
];

export function hydrateConversationSeed(
  seed: ConversationSeed,
): Omit<Conversation, "businessImpact"> {
  return {
    id: seed.id,
    patient: patient(seed.patientId),
    clinic: clinic(seed.clinicId),
    channel: seed.channel,
    createdAt: seed.createdAt,
    text: seed.text,
    status: seed.status,
    assignedTeam: seed.assignedTeam,
    conversationType: seed.conversationType,
    aiAnalysis: seed.aiAnalysis,
    timeline: seed.timeline,
    tags: seed.tags,
  };
}

export function getAllConversationSeeds(): ConversationSeed[] {
  return conversationSeeds;
}

export function getConversationSeedById(
  id: string,
): ConversationSeed | undefined {
  return conversationSeeds.find((seed) => seed.id === id);
}
