import type { Patient } from "@/types/domain";

export const patients: Patient[] = [
  { id: "pat-001", name: "Ananya Sharma", phone: "+91 98765 41001", isHighValue: true },
  { id: "pat-002", name: "Rohan Mehta", email: "rohan.mehta@email.com" },
  { id: "pat-003", name: "Priya Nair", email: "priya.nair@email.com", isHighValue: true },
  { id: "pat-004", name: "Vikram Singh", phone: "+91 98765 41004" },
  { id: "pat-005", name: "Sneha Kapoor", email: "sneha.kapoor@email.com" },
  { id: "pat-006", name: "Arjun Patel", phone: "+91 98765 41006" },
  { id: "pat-007", name: "Meera Iyer", email: "meera.iyer@email.com" },
  { id: "pat-008", name: "Kabir Khan", phone: "+91 98765 41008" },
  { id: "pat-009", name: "Divya Reddy", phone: "+91 98765 41009", isHighValue: true },
  { id: "pat-010", name: "Nikhil Joshi", email: "nikhil.joshi@email.com" },
  { id: "pat-011", name: "Aisha Rahman", phone: "+91 98765 41011", isHighValue: true },
  { id: "pat-012", name: "Harsh Verma", phone: "+91 98765 41012" },
  { id: "pat-013", name: "Pooja Desai", email: "pooja.desai@email.com" },
  { id: "pat-014", name: "Sameer Kulkarni", phone: "+91 98765 41014", isHighValue: true },
  { id: "pat-015", name: "Neha Gupta", email: "neha.gupta@email.com" },
  { id: "pat-016", name: "Imran Sheikh", email: "imran.sheikh@email.com" },
  { id: "pat-017", name: "Kavya Menon", phone: "+91 98765 41017" },
  { id: "pat-018", name: "Rahul Chatterjee", phone: "+91 98765 41018" },
  { id: "pat-019", name: "Fatima Qureshi", email: "fatima.q@email.com" },
  { id: "pat-020", name: "Aditya Rao", phone: "+91 98765 41020", isHighValue: true },
  { id: "pat-021", name: "Spam Bot", email: "winner@lottery-prize.biz" },
  { id: "pat-022", name: "Ananya Sharma", phone: "+91 98765 41001", isHighValue: true },
];

export function getPatientById(id: string): Patient | undefined {
  return patients.find((patient) => patient.id === id);
}
