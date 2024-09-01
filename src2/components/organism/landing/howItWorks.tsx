import React from 'react';
import { SignInButton } from '@components/atoms/buttons/button';
import Link from 'next/link';
import styles from './landing.module.css';

type HowItWorksSectionProps = {
  title: string;
  description: string;
  isHidden?: boolean;
};

type HowItWorksProps = {
  section1: HowItWorksSectionProps;
  section2: HowItWorksSectionProps;
  section3: HowItWorksSectionProps;
};

export function HowItWorks({
  section1,
  section2,
  section3,
}: HowItWorksProps): React.ReactElement {
  return (
    <div className="py-[3vh] lg:pt-[10vh]">
      <div
        className={`h-auto px-[7%] lg:px-[10%] text-center lg:grid grid-rows-2 ${styles['howItWorks']}`}
      >
        <section className="flex lg:grid grid-cols-3 justify-between lg:h-[40vh]">
          {/* Section 1 */}
          <section className="text-left">
            <p className="text-[#5D5FEF] my-6 lg:my-0 uppercase font-bold text-sm">
              {section1.title}
            </p>
            <p className="sm:text-[37px] text-[24px] my-6 lg:my-0 font-[600]">
              {section1.description}
            </p>
            <p className="text-[#64607D] my-6 lg:my-0 font-light">
              {section1.description}
            </p>
            <Link href="/signIn">
              <SignInButton style="hidden my-6 lg:my-4 lg:block rounded-full shodow-md my-4 mx-0">
                Get Started
              </SignInButton>
            </Link>
          </section>

          {/* Section 2 (Empty) */}
          <section></section>

          {/* Section 3 */}
          <section
            className={
              section3.isHidden
                ? 'hidden lg:block'
                : 'text-left xl:pl-[20%] pr-[20%] pt-[20%]'
            }
          >
            <p className="text-[16px] font-[600] my-2">{section3.title}</p>
            <p className="text-[#64607D] font-light">{section3.description}</p>
          </section>
        </section>

        <section className="lg:grid grid-cols-3 justify-between lg:h-[40vh]">
          {/* Section 4 */}
          <section className="text-left my-6 lg:my-0 lg:p-[20%] lg:py-[30%]">
            <p className="text-[16px] font-[600] my-2">{section2.title}</p>
            <p className="text-[#64607D] font-light">{section2.description}</p>
          </section>

          {/* Section 5 */}
          <section className="text-left my-6 lg:my-0 lg:px-[10%]">
            <p className="text-[16px] font-[600] my-2">{section3.title}</p>
            <p className="text-[#64607D] font-light">{section3.description}</p>
          </section>

          {/* Section 6 (Hidden for LG screens) */}
          <section
            className={
              section3.isHidden
                ? 'block lg:hidden my-6 lg:my-0 text-left lg:pl-[20%] lg:pr-[20%] lg:pt-[20%]'
                : ''
            }
          >
            <p className="text-[16px] font-[600] my-2">{section3.title}</p>
            <p className="text-[#64607D] font-light">{section3.description}</p>
          </section>

          {/* Section 7 (Empty) */}
          <section></section>

          {/* Sign In Button (Hidden for LG screens) */}
          <Link href="/signIn">
            {/* <SignInButton style='block lg:hidden rounded-full shodow-md my-4 mx-0'>Get Started</SignInButton> */}
          </Link>
        </section>
      </div>
    </div>
  );
}
