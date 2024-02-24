import React from 'react';
import { TitleText } from '@components/atoms/font';
import { partners } from '@utils';

interface PartnersProps {}

const Partners: React.FC<PartnersProps> = () => {
  return (
    <div className='h-auto lg:py-10 text-center my-4'>
      <TitleText style='px-10'>Over 100+ Diagnostic Centres are growing with Omerald</TitleText>
      <section className='flex sm:my-10 mx-auto p-4 w-full sm:w-[90%] lg:w-[80%] justify-around'>
        {partners.map((partner, index) => (
          <img key={index} src={partner} className='w-[18%] lg:w-[15%] lg:h-[15%]' alt={`partnerLogo-${index}`} />
        ))}
      </section>
    </div>
  );
};

export default Partners;
