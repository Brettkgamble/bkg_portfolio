import type { PagebuilderType } from "@/types";

import { BioBlock } from "./bioBlock";
import { EducationList } from "./educationList";
import { ExperienceList } from "./experienceList";
import { SkillsList } from "./skillsList";

type ResumeBlockProps = PagebuilderType<"resume">;

export function ResumeBlock({
  author,
  skillGroups,
  educationGroups,
  workExperience,
}: ResumeBlockProps) {
  return (
    <section id="resume" className="mt-4 md:my-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <BioBlock author={author} />
      </div>
      <div className="container mx-auto mt-10 px-4 md:mt-16 md:px-6 lg:px-8">
        <SkillsList skillGroups={skillGroups} />
      </div>
      {workExperience && workExperience.length > 0 && (
        <div className="container mx-auto mt-10 px-4 md:mt-16 md:px-6 lg:px-8">
          <ExperienceList entries={workExperience} />
        </div>
      )}
      {educationGroups && educationGroups.length > 0 && (
        <div className="container mx-auto mt-10 px-4 md:mt-16 md:px-6 lg:px-8">
          <EducationList educationGroups={educationGroups} />
        </div>
      )}
    </section>
  );
}

