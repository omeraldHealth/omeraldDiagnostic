import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import ErrorComp from "../alerts/error";

interface SpinnerProps {
  // Add any props if needed
}

export const Spinner: React.FC<SpinnerProps> = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // Wait for 10 seconds before showing the message
    const timer = setTimeout(() => {
      setError(true);
    }, 30000);

    // Clear the timer when the component unmounts or error occurs
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute text-center">
        {error ? (
          <ErrorComp pageName="" />
        ) : (
          <>
          <ColorRing
            visible={true}
            height={120}
            width={120}
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper"
            wrapperStyle={{
              alignSelf: "center",
            }}
          />
          {/* <div className="flex justify-center items-center h-full"> */}
          {/* <div className="spinner-border inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...
            </span>
          </div> */}
        {/* </div> */}
        </>
        )}
      </div>
    </div>
  );
};

