import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { stegaClean } from "next-sanity";

import { SkillsModal, proficiencyColor, type Skill } from "../modals/skillsModal";

type SkillGroup = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  skills?: Skill[] | null;
};

type SkillsListProps = { skillGroups?: SkillGroup[] | null };

const PROFICIENCY_ORDER = [
  "expert",
  "advanced",
  "intermediate",
  "beginner",
] as const;

const PROFICIENCY_LABELS: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
};

function buildProficiencySections(skills: Skill[]) {
  const sections = [
    ...PROFICIENCY_ORDER.map((prof) => ({
      key: prof,
      label: PROFICIENCY_LABELS[prof],
      skills: skills.filter((skill) => stegaClean(skill?.proficiency) === prof),
    })),
    {
      key: "other",
      label: "Other",
      skills: skills.filter((skill) => {
        const proficiency = stegaClean(skill?.proficiency);
        return (
          !proficiency ||
          !(PROFICIENCY_ORDER as readonly string[]).includes(proficiency)
        );
      }),
    },
  ];

  return sections.filter((section) => section.skills.length > 0);
}

export function SkillsList({ skillGroups }: SkillsListProps) {
  const groups = (skillGroups ?? []).filter(
    (group) => (group?.skills?.length ?? 0) > 0,
  );

  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
      <aside className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          Skills
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
      </aside>

      <Accordion type="multiple" defaultValue={[]} className="w-full md:mt-12">
        {groups.map((group, index) => {
          const value = group?._id ?? `group-${index}`;
          const count = group?.skills?.length ?? 0;
          const sections = buildProficiencySections(group?.skills ?? []);

          return (
            <AccordionItem
              key={value}
              value={value}
              className="border-white/10"
            >
              <AccordionTrigger className="text-base font-semibold no-underline hover:no-underline">
                <span className="flex items-center gap-3">
                  {group?.title ?? "Skills"}
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs font-normal text-muted-foreground">
                    {count}
                  </span>
                </span>
              </AccordionTrigger>

              <AccordionContent>
                {group?.description && (
                  <p className="mb-4 text-base leading-7 text-foreground/80">
                    {group.description}
                  </p>
                )}

                <div className="flex flex-col gap-4">
                  {sections.map((section) => (
                    <div key={section.key}>
                      <h4
                        className="mb-2 text-xs font-semibold uppercase tracking-wide"
                        style={{ color: proficiencyColor(section.key) }}
                      >
                        {section.label}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {section.skills.map((skill, skillIndex) => (
                          <SkillsModal
                            key={`${skill?._id ?? "skill"}-${skillIndex}`}
                            skill={skill}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="mt-6 h-px w-full border-0 bg-foreground/20 dark:bg-blue-700" />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
