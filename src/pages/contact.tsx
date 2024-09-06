'use client';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { PageLayout } from '@/components/layouts/pageLayout';
import { initialContactFormData } from '@/utils/forms';

const { TextArea } = Input;
interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState(initialContactFormData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <PageLayout
      tabDescription="Contact Diagnostic Omerald"
      tabName="Diagnostic Omerald | Contact"
    >
      <div className="min-h-[60vh] bg-gray-50 py-12">
        <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border-t-4 border-orange-400">
          <h1 className="text-3xl font-bold text-center text-green-900 mb-8">
            Contact Us
          </h1>

          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-[50%]">
              <div className="mb-10 rounded-lg shadow-inner">
                <div className="max-w-full bg-white">
                  <section className="m-auto xl:w-[80%]">
                    <Form
                      onFinish={handleSubmit}
                      layout="vertical"
                      className="space-y-4"
                    >
                      <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[
                          { required: true, message: 'Please add a subject' },
                        ]}
                      >
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Add Subject"
                          className="border-2 p-2"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message: 'Please add a description',
                          },
                        ]}
                      >
                        <Input
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Add Description"
                          className="border-2 p-2"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Message"
                        name="message"
                        rules={[
                          { required: true, message: 'Please add a message' },
                        ]}
                      >
                        <TextArea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Add Message"
                          className="border-2 p-2"
                          rows={4}
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          style={{ backgroundColor: 'green', borderColor: 'green' }}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Form>
                  </section>
                </div>
              </div>
            </div>
            <div className="w-full py-4 lg:w-[45%]">
              <div className="mb-8">
                <p className="text-xl font-semibold">
                  Avin Mednologies Private Limited
                </p>
                <address className="mt-4 text-gray-700">
                  <p>
                    <b>Address:</b> 3-1-325/2, 3rd Floor, Near AK Bhavan Hall,
                    Kachiguda Nimboliadda, Hyderabad 500027, TELANGANA
                  </p>
                </address>
              </div>
              <div className="mt-8">
                <p>
                  <b>Contact:</b> 9769105223
                </p>
                <p>
                  <b>Email:</b> bod@omerald.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Contact;
