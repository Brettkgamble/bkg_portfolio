"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { cn } from "@workspace/ui/lib/utils";

export type Skill = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  proficiency?: string | null;
};

const PROFICIENCY_TINT: Record<string, string> = {
  beginner:
    "border-slate-500/20 bg-slate-500/10 text-slate-600 dark:text-slate-300",
  intermediate:
    "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300",
  advanced:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  expert:
    "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-300",
};

function ProficiencyBadge({ proficiency }: { proficiency?: string | null }) {
  if (!proficiency) return null;
  const label = proficiency.charAt(0).toUpperCase() + proficiency.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        PROFICIENCY_TINT[proficiency] ??
          "border-border bg-secondary text-secondary-foreground",
      )}
    >
      {label}
    </span>
  );
}

export function SkillsModal({ skill }: { skill: Skill }) {
  if (!skill?.title) return null;

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-medium transition-opacity",
          "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          skill.proficiency
            ? (PROFICIENCY_TINT[skill.proficiency] ??
              "border-border bg-secondary/50 text-foreground")
            : "border-border bg-secondary/50 text-foreground",
        )}
        title="Click for more info"
      >
        {skill.title}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Details for the {skill.title} skill
          </DialogDescription>
        </DialogHeader>

        {skill.proficiency && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Level:</span>
            <ProficiencyBadge proficiency={skill.proficiency} />
          </div>
        )}

        {skill.description && (
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
            {skill.description}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
