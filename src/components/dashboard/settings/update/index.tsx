import { Button, Input, Select, Form, Upload, Image, message } from "antd";
import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { uploadPathSignature } from "@/utils/api";

interface UpdateEntityFormProps {
  formSchema: FormField[]; // Array of form field configurations
  handleSubmit: (formData: any) => void; // Method to handle form submission
  handleCancel: () => void; // Method to handle form cancellation
  initialData: any; // Pre-filled data for the edit form
  entityType: string; // Entity type for dynamic headings
}

interface FormField {
  label: string; // Label of the form field
  name: string; // Name of the form field
  type: "input" | "select" | "upload"; // Add 'upload' type for image upload fields
  placeholder?: string; // Placeholder for input fields
  required?: boolean; // Whether the field is required
  options?: { label: string; value: string }[]; // Options for select fields
  uploadOptions?: UploadOptions; // Options specific to file uploads
}

interface UploadOptions {
  accept?: string; // Allowed file types (e.g., image/*, application/pdf, etc.)
  multiple?: boolean; // Whether to allow multiple file uploads
  action?: string; // Upload endpoint (required for file uploads)
}

const UpdateEntityForm: React.FC<UpdateEntityFormProps> = ({
  formSchema,
  handleSubmit,
  handleCancel,
  initialData,
  entityType,
}) => {
  const [formData, setFormData] = useState(initialData || {});
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(initialData); // Update the form data when the initial data changes
    if (initialData?.signature) {
      setFileList([
        {
          uid: '-1',
          name: 'signature.png',
          status: 'done',
          url: initialData.signature, // Pre-existing signature URL
        },
      ]);
    }
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (fileField: string, info: any) => {
    const { file, fileList } = info;

    if (file.status === 'done' && file.response) {
      // Update form data with the file URL or object
      handleChange(fileField, file.response?.url || file.originFileObj);

      // Update the fileList to show the uploaded file preview
      const updatedFileList = fileList.map((f) =>
        f.uid === file.uid ? { ...f, url: file.response?.url, status: 'done' } : f
      );

      setFileList(updatedFileList);
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
        message.success("File uploaded successfully");

        // Call onSuccess to mark the upload as successful and set the file URL
        onSuccess(response.data, file);

        // Set the uploaded file URL or file object into formData
        setFormData({
          ...formData,
          signature: response.data?.url || file.originFileObj,
        });
      }
    } catch (error) {
      message.error("File upload failed.");
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
          Edit {entityType}
        </p>
        <Form onFinish={onSubmit} layout="vertical">
          {formSchema.map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={[
                {
                  required: field.required,
                  message: `${field.label} is required`,
                },
              ]}
              initialValue={formData[field.name]} // Pre-populated with initial data
            >
              {field.type === 'input' ? (
                <Input
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : field.type === 'select' ? (
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
              ) : field.type === 'upload' ? (
                <>
                  {formData.signature && (
                    <div className="mb-4">
                      <Image
                        width={100}
                        height={100}
                        src={formData.signature} // Show existing signature
                        alt="Current Signature"
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </div>
                  )}
                  <Upload
                    name={field.name}
                    listType="picture"
                    fileList={fileList}
                    customRequest={(options) =>
                      customRequest({ ...options, action: field.uploadOptions?.action })
                    }
                    onChange={(info) => handleFileChange(field.name, info)}
                    accept={field.uploadOptions?.accept || 'image/*'}
                    multiple={field.uploadOptions?.multiple || false}
                  >
                    <Button icon={<FaUpload />} loading={loading}>
                      {field.uploadOptions?.multiple ? 'Upload Files' : 'Upload File'}
                    </Button>
                  </Upload>
                </>
              ) : null}
            </Form.Item>
          ))}

          <Button type="primary" htmlType="submit">
            Update {entityType}
          </Button>
          <Button type="default" className="ml-2" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </section>
    </div>
  );
};

export default UpdateEntityForm;
