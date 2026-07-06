import type { PagebuilderType } from "@/types";

type ResumeBlockProps = PagebuilderType<"resume">;
type SkillsListProps = { skills?: ResumeBlockProps["skills"] };

export function SkillsList({ skills }: SkillsListProps) {
  const individualSkills = skills ?? [];

  if (individualSkills.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
      <aside className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          Skills
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
      </aside>

      <ul className="grid gap-3 md:mt-16">
        {individualSkills.map((skill: any, index: number) => (
          <li
            key={`${skill?._id ?? "skill"}-${index}`}
            className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-2"
          >
            <span className="font-medium">{skill?.title}</span>
            {skill?.proficiency && (
              <span className="text-sm uppercase tracking-wide text-foreground/60">
                {skill.proficiency}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
