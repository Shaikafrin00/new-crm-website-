import { useState } from "react";
import type { Note } from "@/types/lead";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  notes: Note[];
  onAdd: (text: string) => void;
  onDelete: (noteId: string) => void;
}

export function LeadNotesPanel({ notes, onAdd, onDelete }: Props) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note or follow-up..."
          className="min-h-[60px] resize-none text-sm"
          onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleAdd(); }}
        />
        <Button onClick={handleAdd} size="icon" className="shrink-0 self-end bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10">
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-lg bg-muted p-3 text-sm group"
          >
            <p className="flex-1 text-foreground/90">{note.text}</p>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-[10px] text-muted-foreground">{new Date(note.createdAt).toLocaleDateString()}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                onClick={() => onDelete(note.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
