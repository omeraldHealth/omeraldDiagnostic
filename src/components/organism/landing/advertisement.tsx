import { ReactElement } from 'react';
import { SignInButton } from '@components/atoms/buttons/button';
import { BodyText_2, HeaderText_3 } from '@components/atoms/font';
import Link from 'next/link';
import { advertisement } from '@utils/static/static';
import { Carousel } from 'antd';

interface AdvertisementItem {
  title: string;
  description: string;
  button: string;
}

/**
 * Advertisement component.
 * @returns {ReactElement} - The rendered Advertisement component.
 */
export function Advertisement({ advertisementBanner }: any): ReactElement {
  return (
    <div className="my-20 mx-[4%] lg:mx-[10%]">
      {/* Advertisement Title */}
      <header className="h-[170px] border-2 border-gray-200 rounded-xl text-center flex mb-8 shadow-xl">
        <div className="w-[100%] h-full flex justify-center items-center">
          <img
            src={advertisementBanner?.landing?.advertisementBanners[0].url}
            alt={advertisementBanner?.landing?.advertisementBanners[0].meta}
            className="object-cover w-full h-full"
          />
        </div>
      </header>

      {/* Advertisement Items */}
      <section className="lg:flex gap-[2%] my-[7%] w-[100%] justify-around">
        {advertisement.map((ad: AdvertisementItem, index: number) => (
          <div
            key={index}
            className="text-center bg-[#eef0fa] my-6 lg:my-0 lg:w-[33%] lg:h-[300px] p-4 lg:p-10 rounded-lg"
          >
            <HeaderText_3 style="my-8">{ad.title}</HeaderText_3>
            <BodyText_2 style="text-gray-500 my-8">{ad.description}</BodyText_2>
            {}
            <a
              target="_blank"
              href={
                ad?.title === 'Get Started'
                  ? advertisementBanner?.landing?.getStartedUrl
                  : advertisementBanner?.landing?.demoVideoUrl
              }
            >
              <SignInButton style="my-4">{ad?.button}</SignInButton>
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}

// const AdvertisementCarousel = ({ advertisementBanners }:any) => {
//   return (
//     <div className=''>
//     <Carousel autoplay className="w-full h-full">
//       {advertisementBanners?.map((banner: any, index: any) => (
//         <div key={index}>
//           <img src={banner.url} alt={banner.meta} className="object-cover w-full h-full" />
//         </div>
//       ))}
//     </Carousel>
//   </div>
//   );
// };
