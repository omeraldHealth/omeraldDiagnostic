import { SignInButton } from '@components/atoms/buttons/button'
import { MenuDropDown } from '@components/atoms/menu'
import { Logo } from '@components/atoms/nav/logo'
import NavFont from '@components/atoms/nav/navFont'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAuthContext } from 'utils/context/auth.context'

const navLinks = [
    {"navLink":"/feature","navText":"Features"},
    {"navLink":"/knowledge","navText":"Knowledge"},
    {"navLink":"/blog","navText":"Blog"},
    {"navLink":"/pricing","navText":"Pricing"}
]

export function Navbar() {

    const {diagnosticDetails} = useAuthContext()
    const {user,signOut} = useAuthContext()
    
	return (
        <div  className={`flex justify-between items-center px-[4%] xl:px-[10%]`}>
            <Link href={"/"}><span className='flex'>
                <Logo/>
                <p className='font-sans hidden sm:block sm:text-lg sm:font-bold self-center'>OMERALD DIAGNOSTICS</p>
            </span>
            </Link>
            <section className='hidden xl:flex'>
                {navLinks.map((nav,index) => <Link key={index} href={nav.navLink}><NavFont>{nav.navText}</NavFont></Link> )}
            </section>

            {!diagnosticDetails?.phoneNumber ? 
            <section className='lg:flex items-center'>
               {!user ?
                <span className='lg:flex'><Link href={"/signIn"}><NavFont>{"Sign In"}</NavFont></Link></span>:
                <a onClick={signOut} href="#" className='lg:flex'><NavFont>{"Sign Out"}</NavFont></a>
               }
               <span className='hidden lg:flex'><Link href={"/signIn"}><SignInButton style="mx-8">{"Start Free"}</SignInButton></Link></span>
            </section>:
            <MenuDropDown/>
            }
        </div>
	)
}

