import React from 'react';
import { Toaster } from 'react-hot-toast';

const DisplayToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: '',
        duration: 5000,
        style: {
          background: '#19222f',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: '#fff',
            secondary: '#19222f',
          },
        },
      }}
    />
  );
};

export default DisplayToaster;
