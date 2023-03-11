import { SignInButton } from '@components/atoms/buttons/button'
import { BodyText_1, BodyText_2, HeaderText_2 } from '@components/atoms/font'
import React from 'react'

export function BottomBanner() {
	return (
        <div className='w-[100%] h-auto bg-darkBlue px-[4%] sm:px-[10%] py-10 lg:grid grid-cols-2'>
            <section className=''>
                <BodyText_1 style='uppercase my-4'>Why Choose Us</BodyText_1>
                <HeaderText_2 style='text-white uppercase my-4 mr-10'>Efficient, streamlined diagnostic centre operations</HeaderText_2>
                <BodyText_2 style='uppercase my-4'>Digital solutions for diagnostic centre</BodyText_2>
            </section>
            <section className='flex '>
               <SignInButton style="w-[500px] uppercase h-[20%] self-center">Login</SignInButton>
            </section>
        </div>
        )
}

