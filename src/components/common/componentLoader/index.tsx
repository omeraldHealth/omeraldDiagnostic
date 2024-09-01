import React from 'react';
import { ColorRing } from 'react-loader-spinner';

export const ComponentLoader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <ColorRing
        visible={true}
        height={80}  // Smaller size for component-level loading
        width={80}
        ariaLabel="component-loading-indicator"
        wrapperClass="flex justify-center items-center"
      />
    </div>
  );
};
