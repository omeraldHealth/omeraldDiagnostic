import { errorAlert, successAlert } from "@/components/common/alerts";
import { uploadPathSignature } from "@/utils/api";
import { Button, Input, Select, Form, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";

interface AddEntityFormProps {
  formSchema: FormField[]; // Array of form field configurations
  handleSubmit: (formData: any) => void; // Method to handle form submission
  handleCancel: () => void; // Method to handle form cancellation
  initialData?: any; // Optional initial data for form pre-filling
  entityType: string; // Entity type for dynamic headings
}

interface AddEntityFormProps {
  formSchema: FormField[]; // Array of form field configurations
  handleSubmit: (formData: any) => void; // Method to handle form submission
  handleCancel: () => void; // Method to handle form cancellation
  initialData?: any; // Optional initial data for form pre-filling
  entityType: string; // Entity type for dynamic headings
}

interface FormField {
  label: string; // Label of the form field
  name: string; // Name of the form field
  type: "input" | "select" | "upload"; // Type of the form field
  placeholder?: string; // Placeholder for input fields
  required?: boolean; // Whether the field is required
  options?: { label: string; value: string }[]; // Options for select fields
  uploadOptions?: UploadOptions; // Options specific to file uploads
}

interface UploadOptions {
  accept?: string; // Allowed file types (e.g., image/*, application/pdf, etc.)
  multiple?: boolean; // Whether to allow multiple file uploads
  action?: string; // Upload endpoint
}

const AddEntityForm: React.FC<AddEntityFormProps> = ({
  formSchema,
  handleSubmit,
  handleCancel,
  initialData = {},
  entityType,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading]= useState(false)

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (fileField: string, info: any) => {
    const { file, fileList } = info;
    if (file.status === "done") {
      // Store the file URL or object in the formData
      handleChange(fileField, file.response?.url || file.originFileObj);
    }
    setFileList(fileList);
  };

  const customRequest = async ({ action, file, onSuccess, onError }: any) => {
    try {
      setLoading(true); // Start loading

      const formDataSend = new FormData();
      formDataSend.append("file", file);

      const response = await axios.post(uploadPathSignature, formDataSend);

      if (response?.status === 200) {
        successAlert("File uploaded successfully");

        // Call onSuccess to mark the upload as successful and set the file URL
        onSuccess(response.data, file);

        // Set the uploaded file URL or file object into formData
        setFormData({
          ...formData,
          signature: response.data?.url || file.originFileObj, // For example, update 'signature'
        });
      }
    } catch (error) {
      errorAlert("File upload failed.");
      onError(error); // Pass the error to the Upload component
    } finally {
      setLoading(false); // End loading
    }
  };

  const onSubmit = () => {
    handleSubmit(formData);
  };

  return (
    <div className="my-2 max-w-full bg-white">
      <section className="m-auto xl:w-[50%]">
        <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
          Add {entityType}
        </p>
        <Form onFinish={onSubmit} layout="vertical">
          {formSchema.map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={[{ required: field.required, message: `${field.label} is required` }]}
            >
              {field.type === "input" ? (
                <Input
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : field.type === "select" ? (
                <Select
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(value) => handleChange(field.name, value)}
                >
                  {field.options?.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              ) : field.type === "upload" ? (
                <Upload
                  name={field.name}
                  listType="picture"
                  fileList={fileList}
                  customRequest={(options) => customRequest({ ...options, action: field.uploadOptions?.action })}
                  onChange={(info) => handleFileChange(field.name, info)}
                  accept={field.uploadOptions?.accept || "image/*"}
                  multiple={field.uploadOptions?.multiple || false}
                >
                  <Button icon={<FaUpload />}>
                    {field.uploadOptions?.multiple ? "Upload Files" : "Upload File"}
                  </Button>
                </Upload>
              ) : null}
            </Form.Item>
          ))}

          <Button type="primary" htmlType="submit">
            Add {entityType}
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </section>
    </div>
  );
};

export default AddEntityForm;
