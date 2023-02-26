import Link from 'next/link'
import React from 'react'

export function BottomBanner() {
	return (
        <div className='w-[100%] h-[50vh] bg-darkBlue px-[10%] py-10 grid grid-cols-2'>
            <section className=''>
                <p className='font-xs text-sm text-gray-300 font-[`Arial Rounded MT Bold`] uppercase my-4'>Why Choose Us</p>
                <p className='text-[50px] text-white font-[400] font-nano uppercase my-4'>Efficient, streamlined diagnostic centre operations</p>
                <p className='font-light text-md text-white font-sans'>Digital solutions for diagnostic centre</p>
            </section>
            <section className='flex '>
               <button className='bg-btnPrimary-600 w-[500px] text-white uppercase h-[20%] self-center'><a>Login</a></button> 
            </section>
        </div>
        )
}

