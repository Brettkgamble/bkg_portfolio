import type { PagebuilderType } from "@/types";

import { BioBlock } from "./bioBlock";
import { SkillsList } from "./skillsList";

type ResumeBlockProps = PagebuilderType<"resume">;

export function ResumeBlock({ author, skills }: ResumeBlockProps) {
  return (
    <section id="resume" className="mt-4 md:my-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <BioBlock author={author} />
      </div>
      <div className="container mx-auto mt-10 px-4 md:mt-16 md:px-6 lg:px-8">
        <SkillsList skills={skills} />
      </div>
    </section>
  );
}
