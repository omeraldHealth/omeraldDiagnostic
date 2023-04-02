
import { Logo, LogoImage } from "@components/atoms/nav/logo";

import { navigation } from "utils/static";


export function Footer() {
  return (
    <footer className="bg-gray-100" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Logo />
            <p className={"text-black text-md m-0"}>
              Omerald is a personalized health report service, which enables
              users to obtain detailed information and reports based on their
              previous reports.
            </p>
            <div className="flex space-x-6">
              {navigation?.social.map((item) => (
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  key={item?.name}
                  href={item?.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item?.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Policies
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.policies.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </p>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className={"text-black text-md text-center"}>
            &copy; 2023 Omerald-diagnostic.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


// import { SubscribeButton } from '@components/atoms/buttons/button'
// import { CopyRightFont, FooterHeaderFont, FooterLinkFont } from '@components/atoms/font'
// import { SocialMediaIcons } from '@components/atoms/buttons/socialMedia'
// import Link from 'next/link'
// import React, { useState } from 'react'

// const navFooterLinks = [
//     {"navLink":"/aboutUs","navText":"About Us"},
//     {"navLink":"/careers","navText":"Careers"},
//     {"navLink":"/blog","navText":"Blog"},
//     {"navLink":"/pricing","navText":"Pricing"}
// ]

// const navFooterLinks2 = [
//     {"navLink":"/privacyPolicy","navText":"Privacy Policy"},
//     {"navLink":"/knowledge","navText":"Knowledge"},
//     {"navLink":"/support","navText":"Support"},
//     {"navLink":"/faq","navText":"FAQ"}
// ]

// export function Footer() {
//     const [email,setEmail] = useState("")
// 	return (
//         // <div className='text-center w-[100%] lg:min-h-[50vh] py-10 px-[10%]'>
//         //     {/*Footer Links  */}
//         //     <section className='min-h-[20vh] lg:min-h-[30vh] h-auto w-[100%] grid sm:grid-cols-3 xl:grid-cols-4 text-left gap-10'>
//         //         <section>
//         //             <FooterHeaderFont>{"Omerald"}</FooterHeaderFont>
//         //             <p className='font-base text-md text-[#757095] my-6'>Diagnostic centre Application</p>
//         //             <SocialMediaIcons/>
//         //         </section>
//         //         <section>
//         //             <FooterHeaderFont>{"Company"}</FooterHeaderFont>
//         //             <section className='mt-6 grid gap-2 text-gray-400'>
//         //                 {navFooterLinks.map((nav,index) => <Link key={index} className="text-gray-400" href={nav.navLink}><FooterLinkFont>{nav.navText}</FooterLinkFont></Link> )}
//         //             </section>
//         //         </section>
//         //         <section>
//         //             <FooterHeaderFont>{"Resources"}</FooterHeaderFont>
//         //             <section className='mt-6 grid gap-2'>
//         //             {navFooterLinks2.map((nav,index) => <Link key={index} href={nav.navLink}><FooterLinkFont>{nav.navText}</FooterLinkFont></Link> )}
//         //             </section>
//         //         </section>    
//         //         <section className='hidden xl:block'>
//         //             <FooterHeaderFont>{"Join our newsletter"}</FooterHeaderFont>
//         //             <section>
//         //                 <section className='flex border-2 mt-6'>
//         //                     <input className='border-1 p-2 border-black bg-slate-50 text-slate-600' type={"text"} placeholder="Your email address" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
//         //                     <SubscribeButton>{"Subscribe"}</SubscribeButton>
//         //                 </section>
//         //                 <p className='font-xs text-light text-[#181433] opacity-50 my-6'>* Will send you weekly updates for your better finance management.</p>
//         //             </section>
//         //         </section>
//         //     </section>
//         //     {/* Footer CopyRight */}
//         //     <section className='w-[100%] my-12 sm:my-6'>
//         //         <hr className='hidden xl:block w-[100%] bg-primary border-2 my-[40px]' />
//         //         <CopyRightFont>Copyright @ Omerald 2023. All Rights Reserved.</CopyRightFont>
//         //     </section>
//         // </div>
        
// 	)
// }

