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
        className="block text-sm font-medium text-gray-700 pb-4"
        htmlFor={labelName}
      >
        {labelName}
      </label>
      <input
        onChange={handleFileChange}
        className="block w-full pr-10 sm:text-sm rounded-md placeholder:text-xs file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-xs 
        file:bg-indigo-700 file:text-white
        hover:file:bg-primary border border-solid p-1 border-gray-500 p-1 focus:outline-primary "
        id={labelName}
        type="file"
        accept="application/pdf"
      />
    </div>
  );
};

export default UploadInput;
