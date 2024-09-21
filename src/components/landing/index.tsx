import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '@/styles/component/component.module.css';

const LandingPage = () => {
  return (
    <div>
      <div className={styles['landingBanner']}>
        <section className="px-6 sm:px-8 lg:px-[12%] my-[10%] lg:my-[5%]">
          <div className="my-8 lg:my-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Diagnostic Centre Solution in Single Platform.
            </h1>
          </div>
          <div className="my-6 lg:my-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 my-2">
              Managing Diagnostic Centre has never been easier
            </h2>
          </div>
          <p className="text-base py-4 sm:text-lg xl:text-xl text-gray-700 xl:w-[80%] mx-auto lg:mx-0">
            Omerald digitalizes diagnostic centres, offering website creation,
            test selection, report generation, and branding updates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start my-8 space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center">
              <FaCheckCircle className="text-indigo-600 mr-2" />
              <span className="text-base sm:text-lg text-gray-700">
                Free Register
              </span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="text-indigo-600 mr-2" />
              <span className="text-base sm:text-lg text-gray-700">
                Great Service
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
