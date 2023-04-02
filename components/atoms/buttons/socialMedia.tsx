import Link from 'next/link'
import React, { FC } from 'react'
import { FaFacebook,FaTwitter,FaInstagram,FaYoutube } from 'react-icons/fa'

export const socialIcons = [
    {"key":"facebook","url":"","component":<FaFacebook />},
    {"key":"twitter","url":"","component":<FaTwitter />},
    {"key":"instagram","url":"","component":<FaInstagram />},
    {"key":"youtube","url":"","component":<FaYoutube />}
]

export const SocialMediaIcons = () => {
    return <div className='flex gap-6 my-10 sm:ml-0  text-center sm:justify-start justify-center'>
        {socialIcons.map((social) => <Link key={social.key} href={social.url}><p className={"w-4 text-[#3734A9]"}>{social.component}</p></Link> )}
    </div>
}