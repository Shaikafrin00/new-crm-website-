import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Lead, LeadStatus } from "@/types/lead";
import { StatusBadge } from "./StatusBadge";
import { LeadNotesPanel } from "./LeadNotesPanel";
import { LeadFormDialog } from "./LeadFormDialog";
import { Mail, Phone, Globe, Calendar } from "lucide-react";

interface Props {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Pick<Lead, "name" | "email" | "phone" | "source" | "status">>) => void;
  onAddNote: (leadId: string, text: string) => void;
  onDeleteNote: (leadId: string, noteId: string) => void;
}

export function LeadDetailSheet({ lead, open, onClose, onUpdate, onAddNote, onDeleteNote }: Props) {
  if (!lead) return null;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-xl">{lead.name}</SheetTitle>
            <div className="flex items-center gap-2">
              <StatusBadge status={lead.status} />
              <LeadFormDialog
                mode="edit"
                lead={lead}
                onSubmit={(data) => onUpdate(lead.id, data)}
              />
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" /> {lead.email}
            </div>
            {lead.phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> {lead.phone}
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" /> {lead.source}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" /> Added {new Date(lead.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm mb-3">Notes & Follow-ups</h3>
            <LeadNotesPanel
              notes={lead.notes}
              onAdd={(text) => onAddNote(lead.id, text)}
              onDelete={(noteId) => onDeleteNote(lead.id, noteId)}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
