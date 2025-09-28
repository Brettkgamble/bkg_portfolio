import { client } from "../../lib/sanity/client";
import { SanityImage } from "../../components/sanity-image";
import { groq } from 'next-sanity';

const query = groq `
  *[_type=='author'] {
        name,
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

console.log('Person', person)
  return (
    <div className="flex flex-wrap">
      <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
      <div className=" flex-none pt-8 pl-2 w-11/12 md:w-1/5 lg:w-1/6">
          <h1 className="pt-4 pl-4 font-roboto-600 font-bold text-3xl w-full uppercase
              text-start tracking-widest  ">ABOUT ME
              <hr className="mt-2 w-64 h-2 dark:bg-blue-700"/>
          </h1>
          <div className="relative flex flex-col justify-center py-16 px-16 sm:w-4/5 ">
            <SanityImage
              asset={person.image}
              // alt={title ?? "Blog post image"}
              fill
              width="300"
              height="300"
              priority={false}
              loading="lazy"
              quality={100}
              className="mx-auto w-1/3 rounded-full sm:w-2/5 md:w-3/4 lg:w-2/4"
            />
            </div>
            </div>
      </div>
  );
}
