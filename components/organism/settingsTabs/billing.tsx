import { giftBoxImage } from "@utils";

export function Billing() {
	return (
        <div>
           <section className='w-[100%] sm:h-auto h-screen'>
                <img src={giftBoxImage} className='sm:w-[15vw] w-[25vw] m-auto my-10' />
                <p className='text-orange-500 text-lg text-center sm:w-[50%]  m-auto'><span className='font-bold text-green-800'>Great news! 
                Our service is completely free of charge</span><br className="mb-5"/> We're happy to offer this service to you for free and we hope that you continue to find it helpful. </p>
            </section>
        </div>
    )
}

