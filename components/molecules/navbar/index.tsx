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
        <div  className={`flex justify-between items-center px-[1%] sm:px-[4%] xl:px-[10%]`}>
            <Link href={"/"}><span className='flex'>
                <Logo width={80} height={80}/>
                <p className='font-sans hidden sm:block sm:text-lg sm:font-bold self-center'>OMERALD DIAGNOSTICS</p>
            </span>
            </Link>
            <section className='hidden lg:flex'>
                {navLinks.map(nav => <Link href={nav.navLink}><NavFont>{nav.navText}</NavFont></Link> )}
            </section>
            <section className='lg:flex items-center'>
               <span className='lg:flex'><Link href={"/signIn"}><NavFont>{"Sign In"}</NavFont></Link></span>
               <span className='hidden lg:flex'><Link href={"/signIn"}><SignInButton style="mx-8">{"Start Free"}</SignInButton></Link></span>
            </section>
        </div>
	)
}

