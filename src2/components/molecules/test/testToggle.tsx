import React from 'react';
import { TestToggleProps } from '../../../utils/types';

export const TestToggle: React.FC<TestToggleProps> = ({
  showTest,
  setShowTest,
}) => {
  const toggleButtonText = showTest ? 'View Test' : 'Add Test';
  const buttonColor = showTest ? 'bg-green-800' : 'bg-blue-500';

  const handleToggle = () => {
    setShowTest(!showTest);
  };

  return (
    <section className="absolute right-2 sm:right-10 mr-0 lg:mr-3 xl:mr-[3.5vw] 2xl:mr-20 mt-8 md:mt-2">
      <button
        onClick={handleToggle}
        className={`${buttonColor} text-white text-bold font-light rounded-md p-2`}
      >
        {toggleButtonText}
      </button>
    </section>
  );
};
