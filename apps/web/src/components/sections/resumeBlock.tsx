import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";

import { BioBlock } from "./bioBlock";

type ResumeBlockProps = PagebuilderType<"resume">;
type BioBlockProps = { author?: ResumeBlockProps["author"] };

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
      <div className="container mx-auto px-4 md:px-6">
        <BioBlock author={author} />
      </div>
    </section>
  );
}
