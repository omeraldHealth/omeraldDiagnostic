import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const displayedMessages = new Set();

const showToastIfNotDisplayed = (msg, options) => {
  if (!displayedMessages.has(msg)) {
    // Display the toast
    toast(msg, options);

    // Add the message to the set to mark it as displayed
    displayedMessages.add(msg);
  }
};

export const successAlert = (msg) => showToastIfNotDisplayed(msg, { type: "success" });

export const infoAlert = (msg) => showToastIfNotDisplayed(msg, { type: "info", id: "infoMessage" });

export const warningAlert = (msg) => showToastIfNotDisplayed(msg, { type: "warning" });

export const errorAlert = (msg) => showToastIfNotDisplayed(msg, { type: "error" });
