import React, { useState } from 'react';
import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const BannerUploader = ({handleImage}:any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handleImage({"banner":newFileList[0].originFileObj})
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const cropDimensions = {
    aspect: 16 / 9, // Desired aspect ratio (width / height)
    width: 14400, // Desired width in pixels
    height: 850, // Desired height in pixels
  };

  return (
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        className={"text-left"}
      >
        {fileList.length < 1 && '+ Upload Banner'}
      </Upload>
  );
};

export default BannerUploader;