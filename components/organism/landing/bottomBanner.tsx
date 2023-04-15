import { SignInButton } from '@components/atoms/buttons/button'
import { BodyText_1, BodyText_2, HeaderText_2, HeaderText_3 } from '@components/atoms/font'
import React from 'react'

export function BottomBanner() {
	return (
        <div className='w-[100%] h-auto bg-indigo-900 px-[4%] sm:px-[10%] py-10 lg:grid grid-cols-2'>
            <section className=''>
            <p className="my-4 lg:my-2"><BodyText_1 style='uppercase my-4'>Why Choose Us</BodyText_1></p>
            <p className="my-2">  <HeaderText_3 style='text-white uppercase my-4 mr-10'>Efficient, streamlined diagnostic centre operations</HeaderText_3>
               </p>
             <BodyText_2 style='uppercase my-4'>Digital solutions for diagnostic centre</BodyText_2>
            </section>
        </div>
        )
}

