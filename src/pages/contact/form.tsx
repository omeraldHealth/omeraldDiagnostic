import React, { useState } from 'react';
import { FormControl, FormLabel, Stack, Textarea } from '@chakra-ui/react';
import { Button, Input } from 'antd';
import { initialContactFormData } from '@utils/constants';

const ContactPageForm = ({ handleSubmit }) => {
    const [formData, setFormData] = useState(initialContactFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };
  
    return (
        <div className="max-w-full bg-white">
        <section className="m-auto xl:w-[80%]">
            <p className="font-semi-bold text-md my-4 lg:text-xl lg:font-bold">
                Contact Us
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 ">
            <Stack spacing={4}>
                <FormControl id="subject" className="my-2" isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Add Subject"
                    className="border-2 p-2"
                    required
                />
                </FormControl>
                <FormControl id="description" className="my-2" isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add Description"
                    className="border-2 p-2"
                />
                </FormControl>
                <FormControl id="message" className="my-2" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Add Message"
                    className="border-2 p-2"
                />
                </FormControl>
            </Stack>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </form>
        </section>
        </div>
    );
};

export default ContactPageForm;