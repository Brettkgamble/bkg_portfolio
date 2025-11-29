import { client } from "../../lib/sanity/client";
import { SanityImage } from "../../components/sanity-image";
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import serializers from "../../components/serializers/serializer";
import { RichText } from "@/components/richtext";

const query = groq `
  *[_type=='author'] {
      ...,
        name,
        introduction[]->{
         bio[]
         },
        image{
        ...,
        ...asset->{
          "alt": coalesce(altText, originalFilename, "no-alt"),
          "blurData": metadata.lqip,
          "dominantColor": metadata.palette.dominant.background
        }
      },
    }
  `

const p = await client.fetch(query)
const person = p[0];

export default async function Page() {

  return (
    <div className="flex flex-wrap">
      <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
      <div className=" flex-none pt-8">
          <h1 className="pt-4 font-roboto-600 font-bold text-xl lg:text-3xl w-full uppercase
              text-start tracking-widest  ">ABOUT ME
              <hr className="mt-2 w-full h-2 dark:bg-blue-700"/>
          </h1>
          <div className="relative flex flex-col justify-center items-center py-8 w-full mx-auto">
            <SanityImage
              asset={person.image}
              alt={person.name ?? "Blog post image"}
              width="300"
              height="300"
              priority={false}
              loading="lazy"
              quality={100}
              className="mx-auto w-3/5 rounded-full "
            />
          </div>
      </div>
      <div className="w-full flex-none pt-16 px-8 md:w-2/4 lg:w-2/4">
        <div className=" font-roboto-400 text-white  text-justify md:pt-16">
            <section>
              <RichText richText={person.introduction[0].bio} />
            </section>
        </div>
    </div>
    <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
    </div>
  );
}
