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
import { stegaClean } from "next-sanity";

export type Skill = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  proficiency?: string | null;
};

const PROFICIENCY_BORDER: Record<string, string> = {
  beginner: "#94a3b8", // slate-400
  intermediate: "#3b82f6", // blue-500
  advanced: "#10b981", // emerald-500
  expert: "#f59e0b", // amber-500
};

const DEFAULT_BORDER = "#d1d5db"; // gray-300

function proficiencyBorderColor(proficiency?: string | null) {
  const key = stegaClean(proficiency);
  if (!key) return DEFAULT_BORDER;
  return PROFICIENCY_BORDER[key] ?? DEFAULT_BORDER;
}

function ProficiencyBadge({ proficiency }: { proficiency?: string | null }) {
  const clean = stegaClean(proficiency);
  if (!clean) return null;
  const label = clean.charAt(0).toUpperCase() + clean.slice(1);
  return (
    <span
      className="inline-flex items-center rounded-md border-2 bg-white px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-900"
      style={{ borderColor: proficiencyBorderColor(proficiency) }}
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
          "inline-flex items-center rounded-md border-2 bg-white px-2.5 py-1 text-sm font-medium text-gray-900 transition-colors",
          "hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        )}
        style={{ borderColor: proficiencyBorderColor(skill.proficiency) }}
        title="Click for more info"
      >
        {skill.title}
      </DialogTrigger>

      <DialogContent className="border-gray-200 bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900">{skill.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Details for the {skill.title} skill
          </DialogDescription>
        </DialogHeader>

        {skill.proficiency && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Level:</span>
            <ProficiencyBadge proficiency={skill.proficiency} />
          </div>
        )}

        {skill.description && (
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
            {skill.description}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
