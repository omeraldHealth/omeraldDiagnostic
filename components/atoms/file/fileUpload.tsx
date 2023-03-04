import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';

import type { UploadFile } from 'antd/es/upload/interface';



export const FileUploader = ({handleImage}:any) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);
  
    const props: UploadProps = {
        name: 'file',
        action: '',
      };
    
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList) 
        handleImage({"logo":newFileList[0].originFileObj})
    };

    
    return (      
        <>
        <Upload {...props}   fileList={fileList}
            onChange={handleChange}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </>
      )
 }

