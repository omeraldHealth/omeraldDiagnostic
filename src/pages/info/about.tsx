import { PageLayout } from '@/components/layouts/pageLayout';
import { aboutImage } from '@/utils/constants/cloudinary';
import React from 'react';

const About = () => {
  return (
    <PageLayout tabDescription="Home page" tabName="Diagnostic Omerald | Home">
      <div className="min-w-full px-2 sm:px-[10vw] container mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="block lg:hidden flex items-center justify-center">
            <img src={aboutImage} alt="About Us" className="rounded-lg" />
          </section>
          <section className="flex flex-col justify-center">
            <p className="text-grey-700 font-semibold text-sm sm:text-base mb-2 uppercase">
              About Us!
            </p>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-green-900 mb-4">
              Helping Diagnostic Centers <br className="hidden lg:block" />{' '}
              Manage and Share Reports with ease!
            </h1>
            <p className="text-gray-700 text-sm sm:text-lg lg:text-xl mb-6 leading-relaxed">
              Welcome to Omerald Diagnostic, where we empower diagnostic centers
              to revolutionize their operations through seamless online
              management of test reports. Our platform enables diagnostic
              centers to efficiently handle and share test reports with
              patients, maintain detailed records, and derive powerful insights
              that support early disease diagnosis and effective treatment.
            </p>
            <p className="text-lg font-bold text-orange-400 mb-4">
              What We Offer
            </p>
            <ul className="space-y-4">
              <li className="flex">
                <span className="text-blue-500 font-bold mr-2">•</span>
                <span className="text-gray-700">
                  <strong className="text-gray-900">
                    Efficient Test Report Management:
                  </strong>{' '}
                  We offer robust systems that allow diagnostic centers to
                  manage test reports online, ensuring accuracy and
                  accessibility for healthcare professionals and patients.
                </span>
              </li>
              <li className="flex">
                <span className="text-blue-500 font-bold mr-2">•</span>
                <span className="text-gray-700">
                  <strong className="text-gray-900">
                    Secure Patient Data Sharing:
                  </strong>{' '}
                  Through our platform, diagnostic centers can securely share
                  test results with patients, facilitating informed
                  decision-making and empowering individuals in their healthcare
                  journey.
                </span>
              </li>
              <li className="flex">
                <span className="text-blue-500 font-bold mr-2">•</span>
                <span className="text-gray-700">
                  <strong className="text-gray-900">
                    Insightful Analytics:
                  </strong>{' '}
                  We provide powerful analytics tools that generate actionable
                  insights from diagnostic data, supporting healthcare
                  professionals in making informed decisions for early disease
                  detection and personalized treatment plans.
                </span>
              </li>
            </ul>
          </section>
          <section className="hidden lg:block flex items-center justify-center">
            <img
              src={aboutImage}
              alt="About Us"
              className="h-[800px] w-[600px] rounded-lg"
            />
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
