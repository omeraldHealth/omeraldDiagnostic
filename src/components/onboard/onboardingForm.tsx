// @ts-nocheck
import { useUser } from "@clerk/clerk-react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { errorAlert, successAlert } from "../common/alerts";
import { PageLoader } from "../common/pageLoader";
import { uploadDiagnosticLogoApi } from "@/utils/api";

interface OnboardingFormProps {
  next: () => void;
  setFormData: (data: any) => void;
  formData: any;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({
  next,
  setFormData,
  formData,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, isLoaded } = useUser();
  const userContact = user?.phoneNumbers?.[0]?.phoneNumber || "";

  const onFinish = (values: any) => {
    if (imageUrl) {
      values = { ...values, brandLogo: imageUrl };
    }
    setFormData(values);
    next();
  };

  const handleUpload = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const url = info.file.response.url;
      setImageUrl(url);
      setLoading(false);
      form.setFieldsValue({ brandLogo: imageUrl });
      successAlert(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      setLoading(false);
      errorAlert("Error uploading file");
    }
  };

  const customRequest = async ({ file }: { file: File }) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(uploadDiagnosticLogoApi, formData);
      if (response?.status === 201) {
        setImageUrl(response.data.url);
        setLoading(false);
        return response;
      } else {
        setLoading(false);
        errorAlert("Error uploading file");
      }
    } catch (error) {
      setLoading(false);
      errorAlert("File upload failed.");
    }
  };

  return (
    <div className="w-full">
      {(loading || !isLoaded) && <PageLoader />}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          phoneNumber: formData?.phoneNumber || userContact,
          email: formData?.email,
          centerName: formData?.centerName,
          branchContact: formData?.branchContact,
          branchEmail: formData?.branchEmail,
          branchName: formData?.branchName,
          branchAddress: formData?.branchAddress,
          brandLogo: formData?.brandLogo,
        }}
        validateTrigger="onSubmit"
      >
        {/* Brand Details Section */}
        <div className="grid-cols-12 gap-2 border-b-2 border-slate-200 pb-4 my-8">
          <p className="col-span-2 text-xl my-4">Brand Details</p>
          <section className="col-span-10 grid grid-cols-2 gap-4">
            <Form.Item name="brandLogo" label="Brand Logo">
              <span>
                <Upload
                  name="file"
                  customRequest={customRequest}
                  listType="picture-card"
                  showUploadList={false}
                  onChange={handleUpload}
                  accept="image/*"
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" className="my-2 w-full" />
                  ) : (
                    <div>
                      {loading ? <LoaderIcon /> : <PlusCircleIcon />}
                      <div className="mt-2">Upload</div>
                    </div>
                  )}
                </Upload>
              </span>
            </Form.Item>
          </section>
        </div>

        {/* Basic Details Section */}
        <div className="grid-cols-12 gap-2 border-b-2 border-slate-200 pb-4">
          <p className="col-span-2 text-xl my-4">Basic Details</p>
          <section className="col-span-10 grid grid-cols-2 gap-4">
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter contact number!" }]}
            >
              <Input
                disabled={!!userContact}
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter your contact number"
              />
            </Form.Item>
            <Form.Item
              name="centerName"
              label="Diagnostic Name"
              rules={[{ required: true, message: "Please enter diagnostic name!" }]}
            >
              <Input
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter diagnostic name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Diagnostic Email"
              rules={[{ required: true, message: "Please enter diagnostic email!" }]}
            >
              <Input
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter diagnostic email"
              />
            </Form.Item>
          </section>
        </div>

        {/* Branch Details Section */}
        <div className="grid-cols-12 gap-2 border-b-2 border-slate-200 pb-4 my-8">
          <p className="col-span-2 text-xl my-4">Branch Details</p>
          <section className="col-span-10 grid grid-cols-2 gap-4">
            <Form.Item
              name="branchContact"
              label="Branch Phone Number"
              rules={[{ required: true, message: "Please enter branch contact!" }]}
            >
              <Input
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter branch contact"
              />
            </Form.Item>
            <Form.Item
              name="branchEmail"
              label="Branch Email"
              rules={[{ required: true, message: "Please enter branch email!" }]}
            >
              <Input
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter branch email"
              />
            </Form.Item>
            <Form.Item
              name="branchName"
              label="Branch Name"
              rules={[{ required: true, message: "Please enter branch name!" }]}
            >
              <Input
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter branch name"
              />
            </Form.Item>
            <Form.Item
              name="branchAddress"
              label="Branch Address"
              rules={[{ required: true, message: "Please enter branch address!" }]}
            >
              <Input
                className="w-[100%] py-2 bg-gray-100"
                placeholder="Enter branch address"
              />
            </Form.Item>
          </section>
        </div>

        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};
