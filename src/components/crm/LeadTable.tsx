import type { Lead, LeadStatus } from "@/types/lead";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { Trash2, StickyNote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

export function LeadTable({ leads, onSelect, onUpdateStatus, onDelete }: Props) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-muted-foreground text-sm">No leads yet. Add your first lead to get started!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-heading font-semibold">Name</TableHead>
            <TableHead className="font-heading font-semibold hidden md:table-cell">Email</TableHead>
            <TableHead className="font-heading font-semibold hidden lg:table-cell">Source</TableHead>
            <TableHead className="font-heading font-semibold">Status</TableHead>
            <TableHead className="font-heading font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {leads.map((lead) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                className="group cursor-pointer border-b border-border hover:bg-muted/50 transition-colors"
                onClick={() => onSelect(lead)}
              >
                <TableCell className="font-medium">
                  <div>
                    {lead.name}
                    {lead.notes.length > 0 && (
                      <StickyNote className="w-3 h-3 inline ml-2 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{lead.email}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{lead.source}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select value={lead.status} onValueChange={(v) => onUpdateStatus(lead.id, v as LeadStatus)}>
                    <SelectTrigger className="w-[130px] h-8 border-0 bg-transparent p-0">
                      <StatusBadge status={lead.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                    onClick={() => onDelete(lead.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
