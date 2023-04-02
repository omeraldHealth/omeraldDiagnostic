import { giftBoxImage } from "@utils";

export function Billing() {
	return (
        <div>
           <section className='w-[100%] sm:h-auto h-auto'>
                <img src={giftBoxImage} className='w-[50vw] md:w-[24vw] lg:w-[20vw] xl:w-[14vw] m-auto my-10' />
                <p className='text-orange-500 md:text-lg text-center xl:w-[50%]  m-auto'><span className='font-bold py-4 text-green-800'>Great news! 
                Our service is completely free of charge</span><br className="mb-5"/> We're happy to offer this service to you for free and we hope that you continue to find it helpful. </p>
            </section>
        </div>
    )
}

