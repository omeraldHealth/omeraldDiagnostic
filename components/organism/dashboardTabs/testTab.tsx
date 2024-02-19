import React, { useState } from 'react';
import { TestTable } from '@components/molecules/test/testTable';
import { TestToggle } from '@components/molecules/test/testToggle';
import { AddTestComponent } from '@components/molecules/addReport/addTest';

export function TestTab() {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className="p-0 sm:p-6 xl:p-8 h-auto bg-signBanner relative flex justify-center">
      <TestToggle showTest={showTest} setShowTest={setShowTest} />
      <div className="w-[95vw] md:w-[90vw] xl:w-[70vw] h-auto bg-white shadow-2xl sm:shadow-lg my-24 sm:mt-14 rounded-lg">
        {!showTest ? <TestTable /> : <AddTestComponent setTest={setShowTest} />}
      </div>
    </div>
  );
}
