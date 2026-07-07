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

function ProficiencyBadge({ proficiency }: { proficiency?: string | null }) {
  if (!proficiency) return null;
  const label = proficiency.charAt(0).toUpperCase() + proficiency.slice(1);
  return (
    <span className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-900">
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
          "inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-900 transition-colors",
          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        )}
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
