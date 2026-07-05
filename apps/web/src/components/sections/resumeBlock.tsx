import type { PagebuilderType } from "@/types";

import { BioBlock } from "./bioBlock";


type ResumeBlockProps = PagebuilderType<"resume">;

export function ResumeBlock({
  name,
  author,
  buttons,
  badge,
  image,
  richText,
}: ResumeBlockProps) {
  const authorName = author?.[0]?.name;

  return (
    <section id="resume" className="mt-4 md:my-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <BioBlock author={author} />
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* <SkillsListBlock skills={skills} /> */}
      </div>
    </section>
  );
}
