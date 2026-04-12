import type { Lead } from "@/types/lead";
import { Users, UserPlus, Phone, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  leads: Lead[];
}

export function StatsCards({ leads }: Props) {
  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;

  const stats = [
    { label: "Total Leads", value: total, icon: Users, color: "text-foreground" },
    { label: "New", value: newCount, icon: UserPlus, color: "text-status-new" },
    { label: "Contacted", value: contactedCount, icon: Phone, color: "text-status-contacted" },
    { label: "Converted", value: convertedCount, icon: CheckCircle, color: "text-status-converted" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl bg-card border border-border p-5 flex items-center gap-4"
        >
          <div className={`p-2.5 rounded-lg bg-muted ${s.color}`}>
            <s.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
