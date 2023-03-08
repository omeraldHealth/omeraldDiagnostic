import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';

import type { UploadFile } from 'antd/es/upload/interface';
import { errorAlert } from '../alerts/alert';
import { CheckCircleIcon } from '@heroicons/react/20/solid';



export const FileUploader = ({handleImage}:any) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);
  
    const props: UploadProps = {
        name: 'file',
        action: '',
        showUploadList: false,
        accept: 'image/jpeg,image/png,application/pdf',
        beforeUpload: beforeUpload,
      };

   function beforeUpload(file) {
        const allowedTypes = ['image/jpeg', 'image/png','image/jpg', 'application/pdf'];
        const isAllowed = allowedTypes.includes(file.type);
        if (!isAllowed) {
          errorAlert('You can only upload JPG/PNG/PDF file!');
        }
        if (fileList.length >= 1) {
          message.error('You can only upload one file at a time');
          return false;
        }
        return isAllowed;
      }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList([])
        setFileList(newFileList) 
        handleImage({"logo":newFileList[0].originFileObj})
    };

    
    return (      
        <section>
        <Upload  maxCount={1}  {...props}  fileList={fileList} onChange={handleChange}>

            <section className='flex'>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            {fileList.length>0 && <CheckCircleIcon className="w-6 text-green-700 ml-2"/>}
            </section>
            {fileList.length>0 && <p className='text-red-600 my-2'>{fileList[0]?.name }</p>}
        </Upload>
        </section>
      )
 }

