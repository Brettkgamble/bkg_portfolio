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
  const list = entries?.filter(Boolean) ?? [];
  if (list.length === 0) return null;

  const sectionTitle = title ?? "Work Experience";

  return (
    <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
      <div className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          {sectionTitle}
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
      </div>

      <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
        {list.map((entry, index) => {
          const org = entry.organization?.[0];
          const roles = entry.roles?.filter(Boolean) ?? [];
          const skills = entry.skills?.filter(Boolean) ?? [];

          return (
            <div
              key={entry._id ?? `experience-${index}`}
              className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16"
            >
              <aside className="flex flex-col items-center text-center md:items-start md:text-left">
                {org?.logo && (
                  <div className="relative mb-3 h-16 w-full max-w-[140px]">
                    <SanityImage
                      asset={org.logo}
                      alt={org.title ?? "Organization logo"}
                      fill
                      sizes="140px"
                      className="object-contain object-center md:object-left"
                    />
                  </div>
                )}
                {org?.title && (
                  <h2 className="font-roboto-600 text-lg font-bold tracking-wide lg:text-xl">
                    {org.title}
                  </h2>
                )}
              </aside>

              <div className="flex w-full flex-col gap-6 md:mt-2">
                {roles.map((role, roleIndex) => {
                  const tenure = formatRoleTenure(role);
                  return (
                    <div
                      key={role._key ?? `role-${roleIndex}`}
                      className="flex flex-col gap-1"
                    >
                      {tenure && (
                        <p className="text-sm text-muted-foreground">{tenure}</p>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
