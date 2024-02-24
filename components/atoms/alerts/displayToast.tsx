import React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * DisplayToaster component for rendering toast notifications.
 * @returns JSX element for displaying toasts.
 */
const DisplayToaster: React.FC = () => {
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
        },
      }}
    />
  );
};

export default DisplayToaster;
