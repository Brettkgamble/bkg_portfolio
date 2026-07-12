import { EducationList } from "./educationList";

type EducationBlockProps = {
  title?: string | null;
  educationGroups?: Parameters<typeof EducationList>[0]["educationGroups"];
};

export function EducationBlock({ title, educationGroups }: EducationBlockProps) {
  return (
    <section id="education" className="mt-10 md:mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <EducationList title={title} educationGroups={educationGroups} />
      </div>
    </section>
  );
}
