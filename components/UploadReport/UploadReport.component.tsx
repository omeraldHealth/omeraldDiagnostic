import React, { useState } from "react";

type UploadInputProps = {
  labelName: string;
  file: string | undefined;
  setFile: (val: string) => void;
};
const UploadInput = ({ labelName, file, setFile }: UploadInputProps) => {
  const handleFileChange = async (e: any) => {
    console.log(e);
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor={labelName}
      >
        {labelName}
      </label>
      <input
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id={labelName}
        type="file"
        accept="application/pdf"
      />
    </div>
  );
};

export default UploadInput;
