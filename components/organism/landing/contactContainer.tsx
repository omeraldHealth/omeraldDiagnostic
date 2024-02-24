import React from 'react';
import Link from 'next/link';
import { BodyText_2, HeaderText_2, HeaderText_3 } from '@components/atoms/font';
import styles from './landing.module.css';

/**
 * ContactContainer component to display contact information and a link to the contact page.
 * @returns {React.ReactElement} - The rendered ContactContainer component.
 */
export function ContactContainer(): React.ReactElement {
  return (
    <div className={`w-[100%] h-auto py-[10%] px-2 text-center ${styles['contactUs']}`}>
      {/* DC Management App Header */}
      <div className="my-4 lg:my-2">
        <HeaderText_3 style='text-btnPrimary-600 mx-auto my-4'>DC Management App</HeaderText_3>
      </div>
      {/* Contact via WhatsApp Header */}
      <div className="my-4 lg:my-2">
        <HeaderText_2 style='w-[80%] mx-auto my-4'>Contact us via WhatsApp</HeaderText_2>
      </div>
      {/* App Description */}
      <div className='mb-10'>
        <BodyText_2 style='text-gray-400'>End-to-end Diagnostic centre management in a single solution.</BodyText_2>
      </div>
      {/* Message Link */}
      <Link href='/contact'>
        <a className='rounded-lg text-white w-[10%] bg-purple-800 px-4 py-3 sm:px-8 sm:py-4'>Message</a>
      </Link>
    </div>
  );
}
