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
      </div>
  );
}
