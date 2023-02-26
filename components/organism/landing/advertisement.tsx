import { SignInButton } from "@components/atoms/button/button";


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
        <div className='h-[80vh] my-20 mx-[10%]'>
            <section className="h-[170px] border-2 border-gray-200 rounded-xl text-center flex mb-30 shadow-xl">
                <p className="font-bold text-3xl self-center mx-auto">Advertisement</p>
            </section>
            <section className="flex gap-[2%] my-[7%] w-[100%] justify-around">
                {advertisement.map(ad => {
                    return <section  className="text-center bg-[#eef0fa] w-[33%] h-[350px] p-10 rounded-lg">
                    <p className="font-[800] text-[30px] my-8">{ad.title}</p>
                    <p className="font-[900] text-[16px]  text-gray-500 my-8">{ad.description}</p>
                    {ad?.button}
                </section>
                })}
            </section>
        </div>
        )
}

