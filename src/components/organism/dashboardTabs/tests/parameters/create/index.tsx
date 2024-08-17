import { testDetailsState } from '@components/common/recoil/testDetails';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import InputForm from './bioRef';
import { paramState } from '@components/common/recoil/testDetails/param';
import { errorAlert2 } from '@components/atoms/alerts/alert';
import { bioRefState } from '@components/common/recoil/testDetails/test';

const AddParameters = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [testDetail, setTestDetail] = useRecoilState(testDetailsState)
    const [bioRefValue, setBioRefValue] = useRecoilState(bioRefState)
    const [parmValue, setParmValue] = useRecoilState(paramState)

  const showModal = () => {
    setIsModalVisible(true);
  };
    
  const handleOk = () => {
        form
        .validateFields()
            .then((values) => {
                console.log(values)
                console.log(testDetail)
            const parameters = {
                ...parmValue,
                bioRefRange: {...bioRefValue}
            }
    
            if (!parameters?.name) { 
                errorAlert2("Please add valid param name")
                return 
            }
    
            const updatedTest = { 
                ...testDetail, 
                parameters: [...(testDetail?.parameters || []), ...(Array.isArray(parameters) ? parameters : [parameters])]
            };

            setTestDetail(updatedTest)
            setIsModalVisible(false);
            setBioRefValue({})
            setParmValue({})
            form.resetFields();
        })
        .catch((info) => {
            console.log('Validate Failed:', info);
        });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
        {!edit && <Button type="primary" onClick={showModal}>
              Add Parameters
        </Button>}
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
    const [param, setParam] = useRecoilState(paramState);

    useEffect(() => {setParam(formData) },[formData])

    const handleFormChange = (changedValues, allValues) => {
        setFormData(allValues);
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
            // onFinish={handleSubmit}
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

            {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item> */}
        </Form>
    );
};

