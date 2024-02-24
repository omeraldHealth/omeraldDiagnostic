import React from 'react';
import { BodyText_1, BodyText_2, HeaderText_3 } from '@components/atoms/font';

/**
 * BottomBanner component to display information about why to choose the diagnostic center.
 * @returns {React.ReactElement} - The rendered BottomBanner component.
 */
export function BottomBanner(): React.ReactElement {
  return (
    <div className='w-[100%] h-auto bg-indigo-900 px-[4%] sm:px-[10%] py-10 lg:grid grid-cols-2'>
      <section className=''>
        {/* Why Choose Us */}
        <div className='my-4 lg:my-2'>
          <BodyText_1 style='uppercase my-4'>Why Choose Us</BodyText_1>
        </div>
        {/* Efficient Operations */}
        <div className='my-2'>
          <HeaderText_3 style='text-white uppercase my-4 mr-10'>Efficient, streamlined diagnostic centre operations</HeaderText_3>
        </div>
        {/* Digital Solutions */}
        <div>
          <BodyText_2 style='uppercase my-4'>Digital solutions for diagnostic centres</BodyText_2>
        </div>
      </section>
    </div>
  );
}
