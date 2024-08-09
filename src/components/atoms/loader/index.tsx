import React from "react";
import { ButtonSpinner } from "@chakra-ui/react";

export const Spinner: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
      <section className="w-auto flex justify-between gap-4">
        <p><ButtonSpinner/></p>
        <p className="mx-2">Loading...</p>
      </section>
    </div>
  );
};

