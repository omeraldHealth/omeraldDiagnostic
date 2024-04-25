import React from 'react';
import { TitleText } from '@components/atoms/font';

interface PartnersProps {
  customerLogos: Object
}

const Partners: React.FC<PartnersProps> = (customerLogos:any) => {
  return (
    <div className='h-auto lg:py-10 text-center my-4'>
      <TitleText style='px-10'>Over 100+ Diagnostic Centres are growing with Omerald</TitleText>
      <section className='flex sm:my-10 mx-auto p-4 w-full sm:w-[90%] lg:w-[80%] justify-around'>
        {customerLogos?.customerLogos?.landing?.customerLogos?.map((partner:any, index:any) => (
          <img key={index} src={partner.url} className='w-[18%] lg:w-[15%] lg:h-[15%]' alt={partner.meta} />
        ))}
      </section>
    </div>
  );
};

export default Partners;
