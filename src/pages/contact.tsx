'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { PageLayout } from '@/components/layouts/pageLayout';
import { initialContactFormData } from '@/utils/forms';
import emailjs from 'emailjs-com';
import { errorAlert, successAlert } from '@/components/common/alerts';
import { PageLoader } from '@/components/common/pageLoader';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/router';

const { TextArea } = Input;
interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState(initialContactFormData);
  const [loading, setLoading] = useState(false); // Loader state
  const [form] = useForm(); 
  const router = useRouter()

  const sendEmail = () => {
    setLoading(true); // Start loading
    emailjs
      .send(
        'service_xghg0ks', // Service ID from EmailJS
        'template_hlvw8pd', // Template ID from EmailJS
        formData,
        'HH5sKm-xgC4Wc-VIY' // User ID from EmailJS dashboard
      )
      .then(
        (result) => {
          successAlert('Email sent successfully! Please wait for admin to reach out');
        },
        (error) => {
          errorAlert('Email sending failed!');
          console.error('Error sending email:', error);
        }
      )
      .finally(() => {
        form.resetFields();
        setFormData(initialContactFormData)
        setLoading(false); // Stop loading after submission
        router.push("/")
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    sendEmail();
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
                      form={form}
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
                        label="email"
                        name="email"
                        rules={[
                          { required: true, message: 'Please add a email' },
                        ]}
                      >
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Add email"
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
                          disabled={loading} // Disable button when loading
                          style={{ backgroundColor: 'green', borderColor: 'green' }}
                        >
                          {loading ? <Spin /> : 'Submit'} {/* Show loader or text */}
                        </Button>
                      </Form.Item>
                    </Form>
                    {loading && <PageLoader />}
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
