import { SignInButton } from "@components/atoms/button/button";
import { BodyText_1, BodyText_2, HeaderText_1, HeaderText_2 } from "@components/atoms/font";


const advertisement = [
    {
        "title":"Get Started",
        "description":"Please login to get started with uploading and sharing your reports",
        "button":  <SignInButton>{"Know More"}</SignInButton>

    },
    {
        "title":"Access Demo",
        "description":"We are currently offering the service free of cost to help you",
        "button": <SignInButton>{"Know More"}</SignInButton>

    },
    {
        "title":"Check Offer",
        "description":"We are currently offering the service free of cost to help you.",
        "button":<SignInButton>{"Know More"}</SignInButton>
    }
]

export function Advertisement() {
	return (
        <div className='h-auto my-20 mx-[4%] lg:mx-[10%]'>
            <section className="h-[170px] border-2 border-gray-200 rounded-xl text-center flex mb-30 shadow-xl">
                <p className="font-bold text-3xl self-center mx-auto">Advertisement</p>
                <HeaderText_1 >{Advertisement}</HeaderText_1>
            </section>
            <section className="lg:flex gap-[2%] my-[7%] w-[100%] justify-around">
                {advertisement.map(ad => {
                    return <section  className="text-center bg-[#eef0fa] my-6 lg:my-0 lg:w-[33%] lg:h-[350px] p-4 lg:p-10 rounded-lg">
                    <HeaderText_2 style="my-8">{ad.title}</HeaderText_2>
                    <BodyText_2 style="text-gray-500 my-8">{ad.description}</BodyText_2>
                    {ad?.button}
                </section>
                })}
            </section>
        </div>
        )
}

