import {BodyText_2,HeaderText_2, HeaderText_3 } from '@components/atoms/font'
import React from 'react'
import styles from "./landing.module.css"
import Link from 'next/link'

export function ContactContainer() {
	return (
                <div className={`w-[100%] h-auto py-[10%] px-2 text-center ${styles['contactUs']}`}>
                <div className="my-4 lg:my-2">
                    <HeaderText_3 style='text-btnPrimary-600 mx-auto my-4'>DC Management App</HeaderText_3>
                </div>
                <div className="my-4 lg:my-2">
                    <HeaderText_2 style='w-[80%] mx-auto my-4'>Contact us via WhatsApp</HeaderText_2>
                </div>
            
                <div className='mb-10'>
                    <BodyText_2 style='text-gray-400'>End-to-end Diagnostic centre management in a single solution.</BodyText_2>
                </div>
                
                <Link className={"rounded-lg text-white w-[10%] bg-purple-800 px-4 py-3 sm:px-8 sm:py-4"} href={"/contact"}>
                    Message
                </Link>
            </div>
            
        )
}

