import React, { FC } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, IconType } from 'react-icons/fa';

interface SocialIcon {
  key: string;
  url: string;
  component: JSX.Element;
}

const socialIcons: SocialIcon[] = [
  { key: 'facebook', url: '', component: <FaFacebook /> },
  { key: 'twitter', url: '', component: <FaTwitter /> },
  { key: 'instagram', url: '', component: <FaInstagram /> },
  { key: 'youtube', url: '', component: <FaYoutube /> },
];

export const SocialMediaIcons: FC = () => {
  return (
    <div className='flex gap-6 my-10 sm:ml-0 text-center sm:justify-start justify-center'>
      {socialIcons.map((social) => (
        <Link key={social.key} href={social.url}>
          <p className='w-4 text-[#3734A9] cursor-pointer'>{social.component}</p>
        </Link>
      ))}
    </div>
  );
};

// Add LoadableComponent import if needed.
