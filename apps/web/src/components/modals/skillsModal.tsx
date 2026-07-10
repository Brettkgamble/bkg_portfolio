"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { stegaClean } from "next-sanity";

export type Skill = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  proficiency?: string | null;
};

// Bright jewel tones chosen to stand out on a black background while
// still reading as professional. Ordered as an ascending skill ramp.
const PROFICIENCY_COLOR: Record<string, string> = {
  beginner: "#34d399", // emerald-400
  intermediate: "#38bdf8", // sky-400
  advanced: "#c084fc", // purple-400
  expert: "#fbbf24", // amber-400
};

const DEFAULT_COLOR = "#94a3b8"; // slate-400

export function proficiencyColor(proficiency?: string | null) {
  const key = stegaClean(proficiency);
  if (!key) return DEFAULT_COLOR;
  return PROFICIENCY_COLOR[key] ?? DEFAULT_COLOR;
}

function ProficiencyLabel({ proficiency }: { proficiency?: string | null }) {
  const clean = stegaClean(proficiency);
  if (!clean) return null;
  const label = clean.charAt(0).toUpperCase() + clean.slice(1);
  return (
    <span
      className="text-xs font-semibold uppercase tracking-wide"
      style={{ color: proficiencyColor(proficiency) }}
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
        className="inline-flex items-center rounded-full border border-white/20 bg-white px-3.5 py-1 text-xs font-normal text-gray-900 outline-none transition-colors duration-200 hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-white/40"
        title="Click for more info"
      >
        {skill.title}
      </DialogTrigger>

      <DialogContent className="max-w-[40rem] border border-blue-700/60 bg-zinc-950 text-white shadow-lg [&>button]:text-white/70 [&>button]:hover:text-white">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-white">
            {skill.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Details for the {skill.title} skill
          </DialogDescription>
        </DialogHeader>

        {skill.proficiency && (
          <div className="flex items-center gap-2">
            <span className="text-base leading-7 text-white/80">Level:</span>
            <ProficiencyLabel proficiency={skill.proficiency} />
          </div>
        )}

        {skill.description && (
          <p className="whitespace-pre-line text-base leading-7 text-white/80">
            {skill.description}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
