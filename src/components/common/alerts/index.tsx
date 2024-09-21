import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const displayedMessages = new Set<string>();

const showToastIfDisplayed = (msg: string, options: ToastOptions): void => {
  toast(msg, options);
  displayedMessages.add(msg);
};

export const successAlert = (msg: string): void =>
  showToastIfDisplayed(msg, { type: 'success' });

export const infoAlert = (msg: string): void =>
  showToastIfDisplayed(msg, { type: 'info' });

export const warningAlert = (msg: string): void =>
  showToastIfDisplayed(msg, { type: 'warning' });

export const errorAlert = (msg: string): void =>
  showToastIfDisplayed(msg, { type: 'error' });
