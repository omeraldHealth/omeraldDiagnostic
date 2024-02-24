import React from 'react';
import {
  HeaderText_2,
  TitleText,
  TitleText_2,
} from '@components/atoms/font';
import { reviewPerson } from '@utils';
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from 'react-icons/fa';

interface TestimonialProps {}

const Testimonial: React.FC<TestimonialProps> = () => {
  const fiveStar = ["", "", "", "", ""];

  return (
    <div className='text-center px-[10%] py-[2vh] h-auto'>
      <TitleText_2 style='text-btnPrimary-600 mx-auto my-4'>TESTIMONIALS</TitleText_2>
      <HeaderText_2 style='w-[80%] mx-auto my-4'>Check what our clients are saying</HeaderText_2>

      <section className='grid xl:grid-cols-2 gap-10 py-20'>
        <div className='flex'>
          <FaArrowAltCircleLeft
            size={'30px'}
            className='text-purple-900 border-2 border-gray-500 rounded-full self-center'
          />
          <img src={reviewPerson} className='h-[80%]' alt='reviewUserImage' />
          <FaArrowAltCircleRight
            size={'30px'}
            className='text-purple-900 border-2 border-gray-500 rounded-full self-center'
          />
        </div>

        <div className='lg:py-16'>
          <span className='flex mb-8'>
            {fiveStar?.map((star, index) => (
              <FaStar key={index} className='text-purple-900 w-[30px]' />
            ))}
          </span>
          <div style={{ textAlign: 'left' }} className='my-4 text-[#1B1C31]'>
            <FaQuoteLeft className='text-orange-400 w-[15px] mr-2 mb-4 inline' />
            Omerald is a valuable resource for individuals and healthcare providers who need accurate reports. They offer a wide range of services and report sharing.
            <FaQuoteRight className='text-orange-400 w-[15px] mb-4 inline' />
          </div>
          <div className='my-4 lg:my-2'>
            <TitleText style='text-left text-black'>
              Raghu Dutta <br />
              <span className='text-sm font-light'>EM, Rakuten</span>
            </TitleText>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
