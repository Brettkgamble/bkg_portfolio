"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { stegaClean } from "next-sanity";

import { SkillsModal, type Skill } from "../modals/skillsModal";
import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";

export type WorkExperienceRole = {
  _key?: string;
  title?: string | null;
  status?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: unknown;
};

export type WorkExperienceEntry = {
  _id?: string;
  title?: string | null;
  organization?: Array<{
    _id?: string;
    title?: string | null;
    website?: string | null;
    linkedInUrl?: string | null;
    logo?: unknown;
  }> | null;
  roles?: WorkExperienceRole[] | null;
  skills?: Skill[] | null;
};

type ExperienceListProps = {
  title?: string | null;
  entries?: WorkExperienceEntry[] | null;
};

function formatMonthYear(date?: string | null) {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatRoleTenure(role: WorkExperienceRole) {
  const start = formatMonthYear(role.startDate);
  if (!start) return null;

  const status = stegaClean(role.status);
  if (status === "current") {
    return `${start} – Present`;
  }

  const end = formatMonthYear(role.endDate);
  if (end) return `${start} – ${end}`;
  return start;
}

export function ExperienceList({
  title,
  entries,
}: ExperienceListProps) {
  const list = (entries ?? []).filter(
    (entry) => (entry?.roles?.length ?? 0) > 0 || (entry?.skills?.length ?? 0) > 0,
  );

  const [openValue, setOpenValue] = useState<string>("");

  if (list.length === 0) return null;

  const sectionTitle = title ?? "Work Experience";

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
        <aside className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
            {sectionTitle}
          </h1>
          <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
        </aside>
        <div className="hidden md:block" aria-hidden />
      </div>

      <div className="flex flex-col">
        {list.map((entry, index) => {
          const value = entry._id ?? `experience-${index}`;
          const org = entry.organization?.[0];
          const roles = entry.roles?.filter(Boolean) ?? [];
          const skills = entry.skills?.filter(Boolean) ?? [];
          const primaryRole = roles[0];
          const employer = org?.title || entry.title || "Work experience";
          const roleTitle = primaryRole?.title;
          const tenure = primaryRole ? formatRoleTenure(primaryRole) : null;
          const isOpen = openValue === value;

          return (
            <div
              key={value}
              className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16"
            >
              <aside
                className={`flex min-h-[1px] flex-col items-center text-center ${
                  isOpen ? "" : "md:pt-4"
                }`}
              >
                {isOpen && (
                  <>
                    {org?.logo && (
                      <div className="relative mb-3 mt-8 h-[11.25rem] w-full max-w-[360px]">
                        <SanityImage
                          asset={org.logo}
                          alt={employer}
                          fill
                          sizes="360px"
                          className="object-contain object-center"
                        />
                      </div>
                    )}
                    <h2 className="text-base font-semibold text-foreground">
                      {employer}
                    </h2>
                  </>
                )}
              </aside>

              <Accordion
                type="single"
                collapsible
                value={isOpen ? value : ""}
                onValueChange={(next) => setOpenValue(next)}
                className="w-full"
              >
                <AccordionItem
                  value={value}
                  className="relative border-white/10 data-[state=open]:[&>h3]:absolute data-[state=open]:[&>h3]:right-0 data-[state=open]:[&>h3]:top-0 data-[state=open]:[&>h3]:z-10"
                >
                  <AccordionTrigger
                    className={`text-base font-semibold no-underline hover:no-underline ${
                      isOpen ? "justify-end py-2" : ""
                    }`}
                  >
                    <span
                      className={
                        isOpen
                          ? "sr-only"
                          : "flex flex-col items-start gap-0.5 pr-4 text-left"
                      }
                    >
                      <span>{employer}</span>
                      {(roleTitle || tenure) && (
                        <span className="text-sm font-normal text-muted-foreground">
                          {[roleTitle, tenure].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="flex flex-col gap-4">
                      {roles.map((role, roleIndex) => {
                        const roleTenure = formatRoleTenure(role);
                        return (
                          <div
                            key={role._key ?? `role-${roleIndex}`}
                            className="flex flex-col gap-1"
                          >
                            {roleTenure && (
                              <p className="text-sm text-muted-foreground">
                                {roleTenure}
                              </p>
                            )}
                            {role.title && (
                              <h3 className="text-base font-semibold text-foreground">
                                {role.title}
                              </h3>
                            )}
                            {role.description && (
                              <div className="pt-1">
                                <RichText
                                  richText={role.description}
                                  className="max-w-none prose-p:my-2 prose-p:text-foreground/80 prose-headings:text-foreground prose-li:text-foreground/80 prose-strong:text-foreground"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {skills.length > 0 && (
                        <div>
                          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, skillIndex) => (
                              <SkillsModal
                                key={skill._id ?? `skill-${skillIndex}`}
                                skill={skill}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <hr className="mt-6 h-px w-full border-0 bg-foreground/20 dark:bg-blue-700" />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
