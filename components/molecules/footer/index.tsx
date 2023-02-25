import { SubscribeButton } from '@components/atoms/button/button'
import { CopyRightFont, FooterHeaderFont, FooterLinkFont } from '@components/atoms/font'
import { SocialMediaIcons } from '@components/atoms/icons/socialMedia'
import Link from 'next/link'
import React, { useState } from 'react'

const navFooterLinks = [
    {"navLink":"/aboutUs","navText":"About Us"},
    {"navLink":"/careers","navText":"Careers"},
    {"navLink":"/blog","navText":"Blog"},
    {"navLink":"/pricing","navText":"Pricing"}
]

const navFooterLinks2 = [
    {"navLink":"/privacyPolicy","navText":"Privacy Policy"},
    {"navLink":"/knowledge","navText":"Knowledge"},
    {"navLink":"/support","navText":"Support"},
    {"navLink":"/faq","navText":"FAQ"}
]

export function Footer() {
    const [email,setEmail] = useState("")
	return (
        <div className='text-center w-[100%] h-[50vh] py-10 px-[10%]'>
            {/*Footer Links  */}
            <section className='h-[30vh] w-[100%] grid grid-cols-4 text-left gap-10'>
                <section>
                    <FooterHeaderFont>{"Omerald"}</FooterHeaderFont>
                    <p className='font-base text-md text-[#757095] my-6'>Diagnostic centre Application</p>
                    <SocialMediaIcons/>
                </section>
                <section>
                    <FooterHeaderFont>{"Company"}</FooterHeaderFont>
                    <section className='mt-6'>
                    {navFooterLinks.map(nav => <Link href={nav.navLink}><FooterLinkFont>{nav.navText}</FooterLinkFont></Link> )}
                    </section>
                </section>
                <section>
                    <FooterHeaderFont>{"Resources"}</FooterHeaderFont>
                    <section className='mt-6'>
                    {navFooterLinks2.map(nav => <Link href={nav.navLink}><FooterLinkFont>{nav.navText}</FooterLinkFont></Link> )}
                    </section>
                </section>    
                <section>
                    <FooterHeaderFont>{"Join our newsletter"}</FooterHeaderFont>
                    <section>
                        <section className='flex border-2 mt-6'>
                            <input className='border-4 border-black bg-slate-50 text-slate-600' type={"text"} placeholder="Your email address" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            <SubscribeButton>{"Subscribe"}</SubscribeButton>
                        </section>
                        <p className='font-xs text-light text-[#181433] opacity-50 my-6'>* Will send you weekly updates for your better finance management.</p>
                    </section>
                </section>
            </section>
            {/* Footer CopyRight */}
            <section className='w-[100%]'>
                <hr className='w-[100%] bg-primary border-2 mb-[40px]' />
                <CopyRightFont>Copyright @ Omerald 2023. All Rights Reserved.</CopyRightFont>
            </section>
        </div>
	)
}

