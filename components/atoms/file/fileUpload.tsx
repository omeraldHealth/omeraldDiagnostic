import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';

import type { UploadFile } from 'antd/es/upload/interface';
import { errorAlert } from '../alerts/alert';



export const FileUploader = ({handleImage}:any) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);
  
    const props: UploadProps = {
        name: 'file',
        action: '',
        accept: 'image/jpeg,image/png,application/pdf',
        showUploadList:false,
        beforeUpload: beforeUpload,
      };

      function beforeUpload(file) {
        const allowedTypes = ['image/jpeg', 'image/png','image/jpg', 'application/pdf'];
        const isAllowed = allowedTypes.includes(file.type);
        if (!isAllowed) {
          errorAlert('You can only upload JPG/PNG/PDF file!');
        }
        return isAllowed;
      }
    
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList) 
        handleImage({"logo":newFileList[0].originFileObj})
    };

    
    return (      
        <section>
        <Upload {...props}  fileList={fileList} onChange={handleChange}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </section>
      )
 }

