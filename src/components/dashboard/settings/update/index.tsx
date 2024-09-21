import { Button, Input, Select, Form } from "antd";
import { useState, useEffect } from "react";

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
  type: "input" | "select"; // Type of the form field
  placeholder?: string; // Placeholder for input fields
  required?: boolean; // Whether the field is required
  options?: { label: string; value: string }[]; // Options for select fields
}

const UpdateEntityForm: React.FC<UpdateEntityFormProps> = ({
  formSchema,
  handleSubmit,
  handleCancel,
  initialData,
  entityType,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData); // Update the form data when the initial data changes
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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
              {field.type === "input" ? (
                <Input
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              ) : (
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
              )}
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
