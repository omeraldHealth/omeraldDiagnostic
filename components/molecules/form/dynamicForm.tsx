import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select, Spin } from 'antd';
import { FormType } from 'utils/types/molecules/forms.interface';

interface DynamicFormType {
  formProps: Array<FormType>;
  buttonText: string;
  handleSubmit: (values: any) => void;
  handleSearch?: (values: any) => void;
  selectedValue?: any;
  disabledFields?: string[]; // Array of field names to be disabled
  defaultValues?: { [key: string]: any };
}

const DynamicFormGenerator: React.FC<DynamicFormType> = ({ formProps, buttonText, handleSubmit, disabledFields = [], defaultValues = {}, handleSearch, selectedValue  }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    handleSubmit(values);
  };

  const isFieldDisabled = (fieldName: string) => disabledFields.includes(fieldName);

  const renderFormItem = (formItem: FormType) => {
    const disableField = isFieldDisabled(formItem.name);
    const defaultValue = defaultValues[formItem.name];
    const [fetching, setFetching] = useState(false);

    switch (formItem.type) {
      case 'text':
      case 'email':
      case 'contact':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ pattern: formItem.pattern, required: formItem.required }]}
            initialValue={defaultValue}
          >
            <Input placeholder={formItem.label} disabled={disableField} />
          </Form.Item>
        );
      case 'phoneNumber':
        // Implement your phone number input logic
        return null;
      case 'select':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ pattern: formItem.pattern, required: formItem.required }]}
            initialValue={defaultValue}
          >
            <Select placeholder={formItem.label} disabled={disableField} />
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ pattern: formItem.pattern, required: formItem.required }]}
          >
            <DatePicker disabled={disableField} />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item
            key={formItem.name}
            label={formItem.label}
            name={formItem.name}
            rules={[{ pattern: formItem.pattern, required: formItem.required }]}
            initialValue={defaultValue}
          >
            <Radio.Group disabled={disableField}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="others">Others</Radio>
            </Radio.Group>
          </Form.Item>
        );
      case 'tags':
        return (
          <Form.Item key={formItem.label+1} className='mb-6' name={formItem.name} labelCol={{ span: 0 }} >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Aliases"
            />
          </Form.Item>
        );
      case 'search':
        return (
          <Form.Item key={formItem.label+1} className='mb-6' name={formItem.name} labelCol={{ span: 0 }} >
           <Select
              showSearch
              style={{ width: 380 }}
              placeholder={"Test Name"}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              // onChange={handleSubmit}
              onSearch={handleSearch}
              notFoundContent={null}
              options={(selectedValue || []).map((d:any) => ({
                key: d._id,
                value: d._id,
                label: d.name,
              }))}
          />
          </Form.Item>
        );
        default:
        return null;
    }
  };

  return (
    <Form form={form} onFinish={handleFormSubmit} layout="vertical">
      {formProps.map((formItem) => renderFormItem(formItem))}
      <Form.Item className={`flex justify-start col-span-2`}>
        <Button className={`bg-blue-500`} type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicFormGenerator;