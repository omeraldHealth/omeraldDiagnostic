import { testDetailsState } from '@components/common/recoil/testDetails';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InputForm from './bioRef';
import { useParamValue, useTestDetailValue } from '@components/common/constants/recoilValues';
import { paramState } from '@components/common/recoil/testDetails/param';

const AddParameters = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const parmValue = useParamValue()
    const testDetail = useTestDetailValue()
    const testDetails = useSetRecoilState(testDetailsState)

  const showModal = () => {
    setIsModalVisible(true);
  };
    
    const handleOk = () => {
        // const paramObj = { ...testDetail, parameters: { parmValue } }
        // testDetails(paramObj)
        // console.log(testDetail)    
        // form
        // .validateFields()
        // .then((values) => {
        //     form.resetFields();
        //     setIsModalVisible(false);
        // })
        // .catch((info) => {
        //     console.log('Validate Failed:', info);
        // });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Parameters
      </Button>
      <Modal
        title="Add Parameters"
        visible={isModalVisible}
        onOk={handleOk}
        width={"50vw"}
        onCancel={handleCancel}
          >
            <section className='grid grid-cols-2'>
                <ParamForm />
                <InputForm/>      
            </section>
      </Modal>
    </div>
  );
};

export default AddParameters;


const { TextArea } = Input;

const ParamForm = () => {
    const [formData, setFormData] = useState({});
    const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
    const [param, setParam] = useRecoilState(paramState);

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
    };

    const handleSubmit = () => {
        setParam(formData); // Assuming you want to update testDetail with form data
    };

    const handleAliasesChange = (value) => {
        const formattedValues = value
            .join(',')
            .split(',')
            .map((v) => v.trim())
            .filter((v) => v); // Removes any empty strings
        setFormData((prevData) => ({
            ...prevData,
            aliases: formattedValues,
        }));
    };

    return (
        <Form
            layout="vertical"
            onValuesChange={handleFormChange}
            onFinish={handleSubmit}
            initialValues={{ isActive: true }}
            className="w-[70%] space-y-4"
        >
            <Form.Item
                label="Parameter Name"
                name="name"
                rules={[{ required: true, message: 'Please enter a parameter name' }]}
            >
                <Input placeholder="Add Parameter Name" />
            </Form.Item>

            <Form.Item
                label="Parameter Description"
                name="description"
            >
                <TextArea placeholder="Add Parameter Description" rows={4} />
            </Form.Item>

            <Form.Item
                label="Parameter Remedy"
                name="remedy"
            >
                <TextArea placeholder="Add Remedy" rows={4} />
            </Form.Item>

            <Form.Item
                label="Parameter Aliases"
                name="aliases"
            >
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Add or Select Aliases"
                    onChange={handleAliasesChange}
                    tokenSeparators={[',']}
                />
            </Form.Item>

            <Form.Item
                label="Is Active"
                name="isActive"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

