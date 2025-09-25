import { SanityImage } from "../../components/sanity-image";

export default async function Page() {

  return (
    <div className="flex flex-wrap">
      <div className="hidden flex-none p-2 sm:flex sm:w-1/12 md:w-1/6"></div>
      <div className=" flex-none pt-8 pl-2 w-11/12 md:w-1/5 lg:w-1/6">
          <h1 className="pt-4 pl-4 font-roboto-600 font-bold text-3xl w-full uppercase
              text-start tracking-widest  ">ABOUT ME
              <hr className="mt-2 w-64 h-2 dark:bg-blue-700"/>
          </h1>
        </div>
        {/* <SanityImage
                asset={image}
                alt={title ?? "Blog post image"}
                fill
                priority={false}
                loading="lazy"
                quality={80}
                objectFit="cover"
                className="rounded-2xl"
              /> */}
      </div>
  );
}
