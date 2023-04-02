import { SignInButton } from '@components/atoms/buttons/button'
import { BodyText_1, BodyText_2, HeaderText_1, HeaderText_2, HeaderText_3, TitleText } from '@components/atoms/font'
import React from 'react'
import styles from "./landing.module.css"
import Link from 'next/link'

export function ContactContainer() {
	return (
        <div className={`w-[100%] h-auto py-[10%] px-2 text-center ${styles['contactUs']}`}>
              <p className="my-4 lg:my-2"><HeaderText_3 style='text-btnPrimary-600 mx-auto my-4'>DC Management App</HeaderText_3></p>
              <p className="my-4 lg:my-2"><HeaderText_2 style='w-[80%] mx-auto my-4'>Contact us via whatsapp</HeaderText_2></p>
          
            <p className='mb-10'>  <BodyText_2 style='text-gray-400'>End-to-end Diagnostic centre management in a single solution.</BodyText_2></p>
            <Link className={"rounded-lg text-white w-[10%] bg-secondary px-4 py-3 sm:px-8 sm:py-4"} href={"/dashboard"}>Message</Link>
        </div>
        )
}

