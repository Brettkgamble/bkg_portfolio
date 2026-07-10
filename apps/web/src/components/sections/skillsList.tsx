import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

import { SkillsModal, type Skill } from "../modals/skillsModal";

type SkillGroup = {
  _id?: string;
  title?: string | null;
  description?: string | null;
  skills?: Skill[] | null;
};

type SkillsListProps = { skillGroups?: SkillGroup[] | null };

export function SkillsList({ skillGroups }: SkillsListProps) {
  const groups = (skillGroups ?? []).filter(
    (group) => (group?.skills?.length ?? 0) > 0,
  );

  if (groups.length === 0) return null;

  const firstValue = groups[0]?._id ?? "group-0";

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
      <aside className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          Skills
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
      </aside>

      <Accordion
        type="multiple"
        defaultValue={[firstValue]}
        className="w-full"
      >
        {groups.map((group, index) => {
          const value = group?._id ?? `group-${index}`;
          const count = group?.skills?.length ?? 0;

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
                <div className="flex flex-wrap gap-2">
                  {(group?.skills ?? []).map((skill, skillIndex) => (
                    <SkillsModal
                      key={`${skill?._id ?? "skill"}-${skillIndex}`}
                      skill={skill}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
