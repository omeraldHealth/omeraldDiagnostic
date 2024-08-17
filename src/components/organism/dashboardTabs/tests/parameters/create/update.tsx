import { errorAlert2 } from "@components/atoms/alerts/alert";
import { testDetailsState } from "@components/common/recoil/testDetails";
import { paramState } from "@components/common/recoil/testDetails/param";
import { bioRefState } from "@components/common/recoil/testDetails/test";
import { Form, Input, Modal, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import InputForm from "./bioRef";

const UpdateParam = ({ handleHide }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [form] = Form.useForm();
  const [testDetail, setTestDetail] = useRecoilState(testDetailsState);
  const [bioRefValue, setBioRefValue] = useRecoilState(bioRefState);
  const [parmValue, setParmValue] = useRecoilState(paramState);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        //console.logparmValue)
        const parameters = {
          ...parmValue,
          bioRefRange: { ...bioRefValue },
        };

        if (!parameters?.name) {
          errorAlert2("Please add valid param name");
          return;
        }
        const updatedTest = {
          ...testDetail,
          parameters:
            testDetail?.parameters?.map((param) =>
              param.name === parameters.name
                ? { ...param, ...parameters }
                : param,
            ) || [],
        };

        // If no matching parameter was found, add the new parameter
        if (
          !updatedTest.parameters.some(
            (param) => param.name === parameters.name,
          )
        ) {
          updatedTest.parameters.push(parameters);
        }

        setTestDetail(updatedTest);
        setBioRefValue({});
        setParmValue({});
        form.resetFields();
      })
      .catch((info) => {
        //console.log'Validate Failed:', info);
      });
    handleHide();
  };

  const handleCancel = () => {
    handleHide();
  };

  return (
    <div>
      <Modal
        title="Add Parameters"
        visible={true}
        onOk={handleOk}
        width={"50vw"}
        onCancel={handleCancel}
      >
        <section className="grid grid-cols-2">
          <ParamForm />
          <InputForm edit={true} />
        </section>
      </Modal>
    </div>
  );
};

export default UpdateParam;

const { TextArea } = Input;

const ParamForm = () => {
  const [param, setParam] = useRecoilState(paramState);
  const [formData, setFormData] = useState(param);

  useEffect(() => {
    setFormData(param);
  }, []);

  const handleFormChange = (changedValues, allValues) => {
    //console.logchangedValues);
    setFormData(allValues);
    //console.logallValues); // Logs the updated form values
    setParam(allValues); // Uncomment if you want to update param with the new formData
  };

  const handleAliasesChange = (value) => {
    const formattedValues = value
      .join(",")
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v); // Removes any empty strings
    setFormData((prevData) => ({
      ...prevData,
      aliases: formattedValues,
    }));

    setParam((prevData) => ({
      ...prevData,
      aliases: formattedValues,
    }));
  };

  return (
    <Form
      layout="vertical"
      onValuesChange={handleFormChange}
      initialValues={formData}
      className="w-[70%] space-y-4"
    >
      <Form.Item
        label="Parameter Name"
        name="name"
        rules={[{ required: true, message: "Please enter a parameter name" }]}
      >
        <Input placeholder="Add Parameter Name" />
      </Form.Item>

      <Form.Item label="Parameter Description" name="description">
        <TextArea placeholder="Add Parameter Description" rows={4} />
      </Form.Item>

      <Form.Item label="Parameter Remedy" name="remedy">
        <TextArea placeholder="Add Remedy" rows={4} />
      </Form.Item>

      <Form.Item label="Parameter Aliases" name="aliases">
        <Select
          mode="tags"
          style={{ width: "100%" }}
          placeholder="Add or Select Aliases"
          onChange={handleAliasesChange}
          tokenSeparators={[","]}
        />
      </Form.Item>

      <Form.Item label="Is Active" name="isActive" valuePropName="checked">
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
