import { useState, useEffect, useCallback } from "react";
import type { Lead, LeadStatus, Note } from "@/types/lead";

const STORAGE_KEY = "crm-leads";

const loadLeads = (): Lead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  }, [leads]);

  const addLead = useCallback((data: Omit<Lead, "id" | "notes" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const lead: Lead = {
      ...data,
      id: crypto.randomUUID(),
      notes: [],
      createdAt: now,
      updatedAt: now,
    };
    setLeads((prev) => [lead, ...prev]);
    return lead;
  }, []);

  const updateLead = useCallback((id: string, data: Partial<Pick<Lead, "name" | "email" | "phone" | "source" | "status">>) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...data, updatedAt: new Date().toISOString() } : l))
    );
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const addNote = useCallback((leadId: string, text: string) => {
    const note: Note = { id: crypto.randomUUID(), text, createdAt: new Date().toISOString() };
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, notes: [note, ...l.notes], updatedAt: new Date().toISOString() } : l
      )
    );
  }, []);

  const deleteNote = useCallback((leadId: string, noteId: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? { ...l, notes: l.notes.filter((n) => n.id !== noteId), updatedAt: new Date().toISOString() }
          : l
      )
    );
  }, []);

  return { leads, addLead, updateLead, deleteLead, addNote, deleteNote };
}
