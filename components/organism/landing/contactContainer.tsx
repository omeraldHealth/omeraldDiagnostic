import { SignInButton } from '@components/atoms/buttons/button'
import { BodyText_1, HeaderText_2, TitleText } from '@components/atoms/font'
import React from 'react'
import styles from "./landing.module.css"

export function ContactContainer() {
	return (
        <div className={`w-[100%] h-auto py-[10%] px-2  text-center ${styles['contactUs']}`}>
            <div className='mb-4'>
            <TitleText style='text-btnPrimary-600 mx-auto my-4'>DC Management App</TitleText></div>
            <div className='mb-4'>
            <HeaderText_2 style='w-[80%] mx-auto my-4'>Contact our Customer support via Whatsapp</HeaderText_2></div>
            <BodyText_1 style='text-gray-400'>End-to-end Diagnostic centre management in a single solution.</BodyText_1>
            <SignInButton style={"rounded-full my-10 w-[10%]"}>Message</SignInButton>
        </div>
        )
}

