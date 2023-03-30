import { TitleText } from '@components/atoms/font'
import { partners } from '@utils'
import { Animation } from 'utils/animation'
import { m } from "framer-motion";

export function Partners() {
	return (
        <div className='w-[100vw] h-auto lg:px-[10%] py-10 text-center my-4'>
            <TitleText style='px-10'>Over 100+ Diagnostic Centres are growing with Omerald</TitleText>
            <Animation>
            <m.div
                className="slider"
                initial={ {x: -100 }}
                animate={{ x: "100vw " }} transition={{x: { duration: 2 },default: { ease: "linear" }}}
                >
            <section className='flex sm:my-10 mx-auto p-4 w-[100%] sm:w-[90%] lg:w-[80%] justify-around'>
                {partners.map((partner,index) => <img key={index} src={partner} className='w-[18%] lg:w-[15%] lg:h-[15%]' alt="partnerLogog" /> )}
            </section>
            </m.div>
            </Animation>
           
        </div>
        )
}

