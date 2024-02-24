import React, { useState } from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import './logo.module.css';
interface LogoUploaderProps {
  handleImage: (images: { logo: UploadFile[] }) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const LogoUploader: React.FC<LogoUploaderProps> = ({ handleImage }) => {
  const [preview, setPreview] = useState<{ open: boolean; image: string; title: string }>({
    open: false,
    image: '',
    title: '',
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj as RcFile)) || '';
    }

    setPreview({
      open: true,
      image: file.url || (file.preview as string),
      title: file.name || (file.url?.substring(file.url.lastIndexOf('/') + 1) || ''),
    });
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handleImage({ logo: newFileList });
  };

  return (
    <>
      <Upload
        action=''
        className='my-upload'
        listType='picture-circle'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : (
          <div>
            <PlusOutlined className='w-8 text-gray-400 m-auto' />
            <div style={{ marginTop: 8 }}>Brand Logo</div>
          </div>
        )}
      </Upload>
      <Modal open={preview.open} title={preview.title} footer={null} onCancel={() => setPreview({ ...preview, open: false })}>
        <img alt='example' style={{ width: '100%' }} src={preview.image} />
      </Modal>
    </>
  );
};

export default LogoUploader;
