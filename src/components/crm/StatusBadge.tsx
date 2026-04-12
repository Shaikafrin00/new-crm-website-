import type { LeadStatus } from "@/types/lead";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const config: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-status-new/15 text-status-new border-status-new/30" },
  contacted: { label: "Contacted", className: "bg-status-contacted/15 text-status-contacted border-status-contacted/30" },
  converted: { label: "Converted", className: "bg-status-converted/15 text-status-converted border-status-converted/30" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("font-medium text-xs capitalize", c.className)}>
      {c.label}
    </Badge>
  );
}
