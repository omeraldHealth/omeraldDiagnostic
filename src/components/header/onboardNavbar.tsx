import { logoIcon } from "@/utils/constants/cloudinary";
import { UserButton } from "@clerk/clerk-react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import Link from "next/link";

export const OnboardNavbar = () => {
    return (
      <>
        <Head>
            <title>{"Onboard"}</title>
            <meta name="description" content={""} />
            <link rel="icon" href={logoIcon} />
        </Head>
        <section className="py-4 flex justify-between w-full px-[10vw] items-center border-b-2 border-gray-200">
          <Link href="/">
            <span className="flex">
              <p className="font-sans hidden sm:block sm:text-lg sm:font-bold self-center">
                OMERALD DIAGNOSTICS
              </p>
            </span>
          </Link>
          <section className="flex justify-center items-center h-full ">
            <p className="text-lg flex">
              <InformationCircleIcon className="w-[30px] text-blue-700 mx-2" />{" "}
              Diagnostic Details
            </p>
            <span className="mx-4">
              <UserButton afterSignOutUrl="/signIn" />
            </span>
          </section>
        </section>
      </>
    );
};