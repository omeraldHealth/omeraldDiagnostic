import { TitleText } from '@components/atoms/font'
import { partners } from '@utils'

export function Partners() {
	return (
        <div className='h-auto lg:py-10 text-center my-4'>
            <TitleText style='px-10'>Over 100+ Diagnostic Centres are growing with Omerald</TitleText>
            <section className='flex sm:my-10 mx-auto p-4 w-[100%] sm:w-[90%] lg:w-[80%] justify-around'>
                {partners.map((partner,index) => <img key={index} src={partner} className='w-[18%] lg:w-[15%] lg:h-[15%]' alt="partnerLogog" /> )}
            </section>
        </div>
        )
}

