import { reviewPerson } from '@utils'
import React from 'react'
import {FaStar,FaQuoteLeft,FaQuoteRight,FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa'


const fiveStar = ["","","","",""]
export function Testimonial() {
	return (
        <div className='text-center h-[100vh] px-[10%] py-[5%] '>
            <p className='font-bold text-sm text-btnPrimary-600 mx-auto my-4'>TESTINMONIALS</p>
            <p className='font-[500] text-[36px] w-[40%] mx-auto my-4'>Check what our clients are saying</p>
            <section className='grid grid-cols-2 gap-10 py-20'>
                <section className='flex'>
                    <FaArrowAltCircleLeft size={"30px"} className="text-purple-900 border-2 border-gray-500 rounded-full self-center"/>
                        <img src={reviewPerson} className='h-[80%]' alt='reviewUserImage' />
                    <FaArrowAltCircleRight size={"30px"} className="text-purple-900 border-2 border-gray-500 rounded-full self-center"/>
                </section>
                <section className='py-16'>
                    <span className='flex mb-8'>
                        {fiveStar?.map(star =><FaStar className='text-purple-900 w-[30px]'/> )}
                    </span>
                   
                    <p className='font-[500] w-[70%] text-[24px] text-left my-4 text-[#1B1C31]'> 
                    <FaQuoteLeft className='text-orange-400 w-[15px] mr-2 mb-4 inline' />
                        Omerald is a valuable resource for individuals and healthcare providers who need accurate reports. They offer a wide range services and report sharing .  
                    <FaQuoteRight className='text-orange-400 w-[15px] mb-4 inline' />  </p>
                    <p className='font-bold text-left'>Raghu Dutta <br/><span className='text-sm font-light'>EM, Rakuten</span></p>
                </section>
            </section>
        </div>
    )
}

