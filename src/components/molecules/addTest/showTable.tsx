import React from 'react';
import { AddKeyword } from './createdKeyword';

interface ShowTableProps {
  selectedTest: {
    testName: string;
  } | null;
}

export const ShowTable: React.FC<ShowTableProps> = ({ selectedTest }) => {
  return (
    <div>
      <section className="w-[90vw] md:w-[100%]">
        <p className="mb-8">{`Parameters for ${selectedTest?.testName}`}</p>
        <AddKeyword selectedTest={selectedTest} />
      </section>
    </div>
  );
};
