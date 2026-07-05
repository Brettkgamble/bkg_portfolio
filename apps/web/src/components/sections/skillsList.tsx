import type { PagebuilderType } from "@/types";

type ResumeBlockProps = PagebuilderType<"resume">;
type SkillsListProps = { skills?: ResumeBlockProps["skills"] };

export function SkillsList({ skills }: SkillsListProps) {
  const skillName = skills?.[0]?.title?.[0];

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
      <aside className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          {skillName}
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
      </aside>

      <div className="text-justify">
        test
      </div>
    </div>
  );
}
