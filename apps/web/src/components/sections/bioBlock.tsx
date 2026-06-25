import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";

// type BioBlockProps = PagebuilderType<"bioBlock">;
type ResumeBlockProps = PagebuilderType<"resume">;
type BioBlockProps = { author?: ResumeBlockProps["author"] };

export function BioBlock({
 author,
}: BioBlockProps) {
  const authorName = author?.[0]?.name
  return (
  <section id="bio" className="bg-white pb-32">
    <div className="flex flex-wrap">
      <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
      <div className=" flex-none pt-8 pl-2 w-11/12 md:w-2/5 lg:w-full">
        <h1 className="pt-4 pl-4 font-roboto-600 font-bold text-black text-3xl w-full uppercase text-start tracking-widest">
          ABOUT ME
        <hr className="mt-2 w-64 h-2 dark:bg-blue-700"/>
        </h1>
        <div className="relative flex flex-col justify-center py-8 sm:w-4/5 ">
          {/* {image && (
            <div className="h-96 w-full">
              <SanityImage
                asset={image}
                loading="eager"
                width={800}
                height={800}
                priority
                quality={80}
                className="max-h-96 w-full rounded-3xl object-cover"
              />
            </div>
          )} */}
          <div className="flex pl-8 flex-col justify-center pt-8 text-black text-sm hover:text-blue-700">
            <ol >
                <li key={'linkedinUrl'} >
                    {/* <a
                        href={person.linkedinurl.href.valueOf()}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaLinkedinIn className="text-white bg-linkedin rounded-sm" size={24} style={{paddingTop: "2"}}/>
                    </a> */}
                </li>
            </ol>
        </div>
      </div>
      <div className="w-full flex-none pt-16 px-8 md:w-2/4 lg:w-2/4">
        <div className=" font-roboto-400 text-black  text-justify md:pt-16">
          <h1 className="pt-4 pl-4 font-roboto-600 font-bold text-black text-3xl w-full uppercase text-start tracking-widest">
          Stuff goes here
        </h1>
          {/* <section>
              <BlockContent
                  style={{fontSize: "3rem"}}
                  blocks={person.introduction[0].bio}
                  serializers={serializers}
                  projectId={client.projectId}
                  dataset={client.dataset}
                  imageOptions={{w: 500, h: 440, fit: 'max'}}
              />
          </section> */}
        </div>
      </div>
      <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
    </div>
  </div>
  <div className="flex flex-wrap">
                <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
                <div className=" flex-none pt-2 pl-2 pb-4 w-11/12 md:w-1/5 lg:w-1/6">
                    <h2 className="pl-4 font-roboto-600 font-bold text-black text-2xl w-full uppercase
                        text-start tracking-widest  ">Skills
                       <hr className="mt-2 w-64 h-2 dark:bg-blue-700"/>
                    </h2>
                </div>
            </div>
  </section>
   
  );
}
