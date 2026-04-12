import { useState, useMemo } from "react";
import { useLeads } from "@/hooks/useLeads";
import { StatsCards } from "@/components/crm/StatsCards";
import { LeadTable } from "@/components/crm/LeadTable";
import { LeadFormDialog } from "@/components/crm/LeadFormDialog";
import { LeadDetailSheet } from "@/components/crm/LeadDetailSheet";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Lead, LeadStatus } from "@/types/lead";
import { Search, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  const { leads, addLead, updateLead, deleteLead, addNote, deleteNote } = useLeads();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "all">("all");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === "all" || l.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, filterStatus]);

  // Keep selectedLead in sync with leads state
  const activeLead = selectedLead ? leads.find((l) => l.id === selectedLead.id) ?? null : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-lg bg-primary">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold tracking-tight">LeadFlow</h1>
              <p className="text-xs text-muted-foreground">Client Lead Management</p>
            </div>
          </motion.div>
          <LeadFormDialog mode="add" onSubmit={(data) => addLead(data)} />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <StatsCards leads={leads} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as LeadStatus | "all")}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <LeadTable
          leads={filtered}
          onSelect={setSelectedLead}
          onUpdateStatus={(id, status) => updateLead(id, { status })}
          onDelete={deleteLead}
        />
      </main>

      <LeadDetailSheet
        lead={activeLead}
        open={!!activeLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={updateLead}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
      />
    </div>
  );
}
