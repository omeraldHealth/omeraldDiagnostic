export const CONTACT_FORM = [
  { name: 'subject', type: 'text', label: 'Subject', required: true },
  { name: 'message', type: 'text', label: 'message', required: true },
  {
    name: 'description',
    type: 'description',
    label: 'description',
    required: true,
  },
];

export const initialContactFormData = {
  subject: '',
  message: '',
  description: '',
  email: '',
};
