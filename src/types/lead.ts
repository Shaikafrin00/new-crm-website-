export type LeadStatus = "new" | "contacted" | "converted";

export interface Note {
  id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}
