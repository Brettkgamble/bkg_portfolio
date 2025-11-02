import { client } from "../../lib/sanity/client";
import { SanityImage } from "../../components/sanity-image";
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import serializers from "../../components/serializers/serializer";

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

console.log('Person', person.introduction[0].bio);
  return (
    <div className="flex flex-wrap">
      <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
      <div className=" flex-none pt-8 pl-2 ">
          <h1 className="pt-4 pl-4 font-roboto-600 font-bold text-3xl w-full uppercase
              text-start tracking-widest  ">ABOUT ME
              <hr className="mt-2 w-64 h-2 dark:bg-blue-700"/>
          </h1>
          <div className="relative flex flex-col justify-center items-center py-8 w-3/5 mx-auto">
            <SanityImage
              asset={person.image}
              alt={person.name ?? "Blog post image"}
              width="300"
              height="300"
              priority={false}
              loading="lazy"
              quality={100}
              className="mx-auto w-full rounded-full "
            />
          </div>
      </div>
      <div className="w-full flex-none pt-16 px-8 md:w-2/4 lg:w-2/4">
        <div className=" font-roboto-400 text-white  text-justify md:pt-16">
          {/* {person.introduction[0].bio} */}
            <section>
                <PortableText
                    // style={{fontSize: "3rem"}}
                    value={person.introduction[0].bio}
                    components={serializers}
                    // projectId={client.projectId}
                    // dataset={client.dataset}
                    // imageOptions={{w: 500, h: 440, fit: 'max'}}
                />
            </section>
        </div>
    </div>
    <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
    </div>
  );
}
