import React from 'react';
import { ColorRing } from 'react-loader-spinner';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ColorRing
        visible={true}
        height={120}
        width={120}
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
        wrapperStyle={{
          alignSelf: 'center',
        }}
      />
    </div>
  );
};
