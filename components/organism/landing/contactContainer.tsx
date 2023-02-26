import { SignInButton } from '@components/atoms/button/button'
import React from 'react'
import styles from "./landing.module.css"

export function ContactContainer() {
	return (
        <div className={`w-[100%] h-[100vh] py-[10%] text-center ${styles['contactUs']}`}>
            <p className='font-bold text-sm text-btnPrimary-600 mx-auto my-4'>DC Management App</p>
            <p className='font-[600] text-[40px] w-[40%] mx-auto my-4'>Contact our Customer support via Whatsapp</p>
            <p className='font-[500] text-[18px] text-gray-400'>End-to-end Diagnostic centre management in a single solution.</p>
            <SignInButton style={"rounded-full my-10 w-[10%]"}>Message</SignInButton>
        </div>
        )
}

