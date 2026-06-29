import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityImage } from "../sanity-image";

type ResumeBlockProps = PagebuilderType<"resume">;
type BioBlockProps = { author?: ResumeBlockProps["author"] };

export function BioBlock({ author }: BioBlockProps) {
  const authorName = author?.[0]?.name;
  const authorImage = author?.[0]?.image;
  const authorBio = author?.[0]?.introduction?.[0]?.bio;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16">
      <aside className="flex flex-col items-center text-center md:items-start md:text-left">
        <h1 className="font-roboto-600 text-2xl font-bold uppercase tracking-widest lg:text-3xl">
          {authorName}
        </h1>
        <hr className="mt-2 h-1 w-full border-0 bg-foreground/20 dark:bg-blue-700" />
        {authorImage && (
          <SanityImage
            asset={authorImage}
            alt={authorName ?? "Portrait"}
            width={320}
            height={320}
            priority={false}
            loading="lazy"
            quality={100}
            className="mt-8 aspect-square w-28 rounded-full object-cover md:mt-10 md:w-36 lg:w-40"
          />
        )}
      </aside>

      <div className="text-justify">
        <RichText richText={authorBio} />
      </div>
    </div>
  );
}
