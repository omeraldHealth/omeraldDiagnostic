import React from 'react';

export const ReportToggle = ({
  debouncedSearch,
  showTest,
  setShowTest,
}: any) => {
  return (
    <section className="absolute right-2 sm:right-10 mr-0 lg:mr-3 xl:mr-[3.5vw] 2xl:mr-20 mt-8 md:mt-2">
      {!showTest ? (
        <button
          onClick={() => setShowTest(!showTest)}
          className="bg-blue-500 text-white text-bold font-light rounded-md p-2"
        >
          Add Report
        </button>
      ) : (
        <button
          onClick={() => setShowTest(!showTest)}
          className="bg-green-800 text-white text-bold font-light rounded-md p-2"
        >
          View Report
        </button>
      )}
    </section>
  );
};
