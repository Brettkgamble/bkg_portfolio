"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { stegaClean } from "next-sanity";

import { RichText } from "../richtext";

export type RelatedWorkExperience = {
  _id?: string;
  title?: string | null;
  organization?: Array<{
    _id?: string;
    title?: string | null;
    logo?: unknown;
  }> | null;
  roles?: Array<{
    _key?: string;
    title?: string | null;
    status?: string | null;
    startDate?: string | null;
    endDate?: string | null;
  }> | null;
};

export type Skill = {
  _id?: string;
  title?: string | null;
  description?: unknown;
  proficiency?: string | null;
  relatedWorkExperience?: RelatedWorkExperience[] | null;
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

function proficiencyLabel(proficiency?: string | null) {
  const clean = stegaClean(proficiency);
  if (!clean) return null;
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function ProficiencyLabel({ proficiency }: { proficiency?: string | null }) {
  const label = proficiencyLabel(proficiency);
  if (!label) return null;
  return (
    <span className="text-xs font-semibold uppercase tracking-wide text-gray-900">
      {label}
    </span>
  );
}

function formatMonthYear(date?: string | null) {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatRelatedTenure(
  role?: NonNullable<RelatedWorkExperience["roles"]>[number],
) {
  if (!role?.startDate) return null;
  const start = formatMonthYear(role.startDate);
  if (!start) return null;
  if (stegaClean(role.status) === "current") return `${start} – Present`;
  const end = formatMonthYear(role.endDate);
  return end ? `${start} – ${end}` : start;
}

export function SkillsModal({ skill }: { skill: Skill }) {
  if (!skill?.title) return null;

  const related = skill.relatedWorkExperience?.filter(Boolean) ?? [];

  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex items-center rounded-full border border-white/20 bg-white px-3.5 py-1 text-xs font-normal text-gray-900 outline-none transition-colors duration-200 hover:bg-violet-300 focus-visible:ring-2 focus-visible:ring-white/40"
        title="Click for more info"
      >
        {skill.title}
      </DialogTrigger>

      <DialogContent className="flex max-h-[min(70vh,36rem)] w-[min(92vw,56rem)] max-w-[min(92vw,56rem)] flex-col gap-0 overflow-hidden border border-gray-200 bg-white p-0 text-gray-900 shadow-lg [&>button]:text-gray-500 [&>button]:hover:text-gray-900">
        <DialogTitle className="sr-only">{skill.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Details for the {skill.title} skill
        </DialogDescription>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 pt-6 text-center">
          <h3 className="pt-2 text-xl font-medium text-gray-900">{skill.title}</h3>

          {skill.proficiency && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
              <ProficiencyLabel proficiency={skill.proficiency} />
            </div>
          )}

          {skill.description && (
            <div className="max-w-full py-4 text-left break-words">
              <RichText
                richText={skill.description}
                className="max-w-none overflow-x-hidden prose-p:text-gray-700 prose-headings:text-gray-900 prose-li:text-gray-700 prose-strong:text-gray-900 prose-img:max-w-full"
              />
            </div>
          )}

          {related.length > 0 && (
            <div className="py-4 text-left">
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                Related experience
              </h4>
              <ul className="space-y-3">
                {related.map((entry, index) => {
                  const org = entry.organization?.[0];
                  const primaryRole = entry.roles?.[0];
                  const tenure = formatRelatedTenure(primaryRole);
                  const label =
                    [org?.title, primaryRole?.title].filter(Boolean).join(" · ") ||
                    entry.title ||
                    "Work experience";

                  return (
                    <li key={entry._id ?? `related-${index}`}>
                      <p className="text-sm font-medium text-gray-900">{label}</p>
                      {tenure && (
                        <p className="text-xs text-gray-600">{tenure}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-gray-100 px-6 py-3 text-center">
          <DialogClose className="w-2/5 min-w-[8rem] rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50">
            Close
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
