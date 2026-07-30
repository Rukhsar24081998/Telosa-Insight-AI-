import type { Clinic } from "@/types/domain";

export const clinics: Clinic[] = [
  {
    id: "clinic-bandra",
    name: "Apollo Dental Bandra",
    city: "Mumbai",
    region: "West",
  },
  {
    id: "clinic-koramangala",
    name: "Apollo Dental Koramangala",
    city: "Bengaluru",
    region: "South",
  },
  {
    id: "clinic-anna-nagar",
    name: "Apollo Dental Anna Nagar",
    city: "Chennai",
    region: "South",
  },
  {
    id: "clinic-cp",
    name: "Apollo Dental Connaught Place",
    city: "Delhi",
    region: "North",
  },
  {
    id: "clinic-satellite",
    name: "Apollo Dental Satellite",
    city: "Ahmedabad",
    region: "West",
  },
  {
    id: "clinic-jubilee",
    name: "Apollo Dental Jubilee Hills",
    city: "Hyderabad",
    region: "South",
  },
  {
    id: "clinic-banjara",
    name: "Apollo Dental Banjara Hills",
    city: "Hyderabad",
    region: "South",
  },
  {
    id: "clinic-fc-road",
    name: "Apollo Dental FC Road",
    city: "Pune",
    region: "West",
  },
  {
    id: "clinic-salt-lake",
    name: "Apollo Dental Salt Lake",
    city: "Kolkata",
    region: "East",
  },
  {
    id: "clinic-navrangpura",
    name: "Apollo Dental Navrangpura",
    city: "Ahmedabad",
    region: "West",
  },
];

export function getClinicById(id: string): Clinic | undefined {
  return clinics.find((clinic) => clinic.id === id);
}
