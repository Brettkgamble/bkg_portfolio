import { ExperienceList } from "./experienceList";

type ExperienceBlockProps = {
  title?: string | null;
  entries?: Parameters<typeof ExperienceList>[0]["entries"];
};

export function ExperienceBlock({ title, entries }: ExperienceBlockProps) {
  return (
    <section id="experience" className="mt-10 md:mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <ExperienceList title={title} entries={entries} />
      </div>
    </section>
  );
}
