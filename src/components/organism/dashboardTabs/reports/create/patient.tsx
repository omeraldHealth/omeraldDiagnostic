import {
  useCurrentBranchValue,
  useProfileValue,
} from "@components/common/constants/recoilValues";
import { reportState } from "@components/common/recoil/report";
import { reportDataState } from "@components/common/recoil/report/reportData";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useSetRecoilState } from "recoil";

const { Option } = Select;

export function PatientDetails({ form, handleNext }) {
  const profile = useProfileValue();
  const currentBranch = useCurrentBranchValue();
  const reportDetails = useSetRecoilState(reportDataState);

  const handleSubmit = (values) => {
    reportDetails(form.getFieldsValue());
    handleNext(); // You can trigger the next step here if needed
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit} // Triggered only when validation is successful
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {/* Patient Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Patient Information</h2>
            <Form.Item
              name={["patient", "name"]}
              label="Name"
              rules={[
                { required: true, message: "Please enter the patient's name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={["patient", "dob"]}
                  label="Date of Birth"
                  rules={[
                    {
                      required: true,
                      message: "Please select the date of birth",
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["patient", "gender"]}
                  label="Gender"
                  rules={[
                    { required: true, message: "Please select the gender" },
                  ]}
                >
                  <Select placeholder="Select Gender">
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name={["patient", "contact", "phone"]}
              label="Phone"
              rules={[
                { required: true, message: "Please enter the phone number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["patient", "contact", "email"]}
              label="Email"
              rules={[
                { required: true, message: "Please enter the email address" },
                {
                  type: "email",
                  message: "Please enter a valid email address",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          {/* Diagnostic Center Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Diagnostic Center Information
            </h2>
            <Form.Item
              name={["diagnosticCenter", "name"]}
              label="Center Name"
              initialValue={profile?.centerName || ""}
              rules={[
                { required: true, message: "Please enter the center name" },
              ]}
            >
              <Input disabled={!!profile?.centerName} />
            </Form.Item>
            <Form.Item
              name={["diagnosticCenter", "branch", "name"]}
              label="Branch Name"
              initialValue={currentBranch?.branchName || ""}
              rules={[
                { required: true, message: "Please enter the branch name" },
              ]}
            >
              <Input disabled={!!currentBranch?.branchName} />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mt-4">
            Next
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
