import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import { errorAlert } from "../alerts/alert";
import { ArrowUpCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import type { UploadProps } from "antd/es/upload/interface";
import type { UploadFile } from "antd/es/upload/interface";

interface FileUploaderProps {
  handleImage: (data: { file: any }) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ handleImage }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    name: "file",
    action: "",
    showUploadList: false,
    accept: ".pdf,image/*",
    beforeUpload: beforeUpload,
  };

  function beforeUpload(file: UploadFile) {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    const isAllowed = allowedTypes.includes(file.type || "");

    if (!isAllowed) {
      errorAlert("You can only upload allowed files!");
    }

    if (fileList.length >= 1) {
      message.error("You can only upload one file at a time");
      return false;
    }

    return isAllowed;
  }

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList([]);
    setFileList(newFileList);
    handleImage({ file: newFileList[0] });
  };

  return (
    <section>
      <Upload
        accept="image/*"
        maxCount={1}
        {...props}
        fileList={fileList}
        onChange={handleChange}
      >
        <section className="flex">
          <Button
            className="flex"
            icon={<ArrowUpCircleIcon className="w-6 text-blue-500" />}
          >
            Click to Upload
          </Button>
          {fileList.length > 0 && (
            <CheckCircleIcon className="w-6 text-green-700 ml-2" />
          )}
        </section>
        {fileList.length > 0 && (
          <p className="text-red-600 my-2">{fileList[0]?.name}</p>
        )}
      </Upload>
    </section>
  );
};

// Add LoadableComponent import if needed.
