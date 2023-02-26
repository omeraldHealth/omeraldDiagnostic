import { Logo, NavFont } from '@components/atoms'
import { SignInButton } from '@components/atoms/button/button'
import Link from 'next/link'
import React from 'react'

const navLinks = [
    {"navLink":"/feature","navText":"Features"},
    {"navLink":"/knowledge","navText":"Knowledge"},
    {"navLink":"/blog","navText":"Blog"},
    {"navLink":"/pricing","navText":"Pricing"}
]

export function Navbar() {
	return (
        <div className='flex justify-between items-center px-[10%]'>
            <span className='flex'>
                <Logo width={80} height={80}/>
                <p className='font-sans text-lg font-bold self-center'>OMERALD DIAGNOSTICS</p>
            </span>
            
            <section className='flex'>
                {navLinks.map(nav => <Link href={nav.navLink}><NavFont>{nav.navText}</NavFont></Link> )}
            </section>
            <section className='flex items-center'>
                <Link href={"/signIn"}><NavFont>{"Sign In"}</NavFont></Link>
                <Link href={"/signIn"}><SignInButton>{"Start Free"}</SignInButton></Link>
            </section>
        </div>
	)
}

