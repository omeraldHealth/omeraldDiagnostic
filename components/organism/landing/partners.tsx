import { partners } from '@utils'

export function Partners() {
	return (
        <div className='w-[100vw] h-[30vh] px-[10%] py-10 text-center my-4'>
            <p className='font-[700] text-[22px]'>Over 100+ Diagnostic Centres are growing with Omerald</p>
            <section className='flex my-10 p-4 w-[100%] justify-around'>
                {partners.map(partner => <img src={partner} className='w-[200px]' alt="partnerLogog" /> )}
            </section>
        </div>
        )
}

