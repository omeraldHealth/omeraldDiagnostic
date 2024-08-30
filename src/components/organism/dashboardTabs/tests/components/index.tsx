import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Switch, Upload, Button } from 'antd';

import dynamic from 'next/dynamic';
const CKEditorComponent = dynamic(() => import('./ckeditor'), { 
  ssr: false 
});

const ComponentForm = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const [isDynamic, setIsDynamic] = useState(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setIsDynamic(initialValues.isDynamic || false);
    }
  }, [initialValues, form]);

  const onSwitchChange = (checked) => {
    setIsDynamic(checked);
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? "Edit Component" : "Create a new component"}
      okText={initialValues ? "Save Changes" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate({ ...values, isDynamic });
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="component_form"
        initialValues={initialValues || { modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of the component!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="content" label="Content">
          <CKEditorComponent
            onChange={(data) => form.setFieldsValue({ content: data })}
            data={initialValues?.content || ''} // Initialize CKEditor with content
          />
        </Form.Item>

        <Form.Item label="Dynamic Component" name="isDynamic" valuePropName="checked">
          <Switch checked={isDynamic} onChange={onSwitchChange} />
        </Form.Item>

        {isDynamic && (
          <Form.Item label="Upload Images">
            <Upload
              name="images"
              listType="picture"
              beforeUpload={() => false}
              onChange={({ fileList }) => form.setFieldsValue({ images: fileList.map(file => file.name) })}
            >
              <Button>Select Files</Button>
            </Upload>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ComponentForm;
