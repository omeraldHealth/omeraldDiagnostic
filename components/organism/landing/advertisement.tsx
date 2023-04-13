import { SignInButton } from "@components/atoms/buttons/button";
import { BodyText_2, HeaderText_3, } from "@components/atoms/font";
import Link from "next/link";
import { advertisement } from "utils/static";

export function Advertisement() {
	return (
        <div className=' my-20 mx-[4%] lg:mx-[10%]'>
            <section className="h-[170px] border-2 border-gray-200 rounded-xl text-center flex mb-30 shadow-xl">
                <p className="font-bold text-3xl self-center mx-auto">Advertisement</p>
            </section>
            <section className="lg:flex gap-[2%] my-[7%] w-[100%] justify-around">
                {advertisement.map((ad,index) => {
                    return <section key={index} className="text-center bg-[#eef0fa] my-6 lg:my-0 lg:w-[33%] lg:h-[300px] p-4 lg:p-10 rounded-lg">
                    <HeaderText_3 style="my-8">{ad.title}</HeaderText_3>
                    <BodyText_2 style="text-gray-500 my-8">{ad.description}</BodyText_2>
                    <Link href="/about"><SignInButton style="my-4">  {ad?.button}</SignInButton></Link> 
                </section>
                })}
            </section>
        </div>
        )
}

