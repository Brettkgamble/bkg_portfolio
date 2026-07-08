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
import { useState } from "react";

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

function proficiencyColor(proficiency?: string | null) {
  const key = stegaClean(proficiency);
  if (!key) return DEFAULT_COLOR;
  return PROFICIENCY_COLOR[key] ?? DEFAULT_COLOR;
}

function ProficiencyBadge({ proficiency }: { proficiency?: string | null }) {
  const clean = stegaClean(proficiency);
  if (!clean) return null;
  const color = proficiencyColor(proficiency);
  const label = clean.charAt(0).toUpperCase() + clean.slice(1);
  return (
    <span
      className="inline-flex items-center rounded-md border-2 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-gray-900"
      style={{ borderColor: color, backgroundColor: `${color}1f` }}
    >
      {label}
    </span>
  );
}

export function SkillsModal({ skill }: { skill: Skill }) {
  const [active, setActive] = useState(false);
  if (!skill?.title) return null;

  const color = proficiencyColor(skill.proficiency);

  return (
    <Dialog>
      <DialogTrigger
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="inline-flex items-center rounded-full border px-3.5 py-1 text-sm font-semibold tracking-wide outline-none transition-all duration-200"
        style={{
          color,
          borderColor: color,
          backgroundColor: active ? `${color}26` : `${color}14`,
          boxShadow: active
            ? `0 0 22px -4px ${color}, 0 0 8px -2px ${color}, inset 0 0 10px -6px ${color}`
            : `0 0 12px -5px ${color}, inset 0 0 8px -7px ${color}`,
          transform: active ? "translateY(-1px)" : "none",
        }}
        title="Click for more info"
      >
        {skill.title}
      </DialogTrigger>

      <DialogContent
        className="border-2 bg-white text-gray-900"
        style={{
          borderColor: color,
          boxShadow: `0 0 40px -6px ${color}, 0 0 16px -4px ${color}, 0 30px 60px -24px rgba(0,0,0,0.7)`,
        }}
      >
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
