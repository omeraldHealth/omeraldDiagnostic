import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  .ant-upload-list-picture-circle{
    display: flex !important;
  }
  .ant-btn-primary {
    background-color: #1890ff !important;
    border-color: #1890ff !important;
    color: white;
    box-shadow: #1890ff 1 1;
  }
  .PhoneInputInput{
    padding:10px !important
  }
  .cl-internal-b3fm6y{
    display: none !important;
    visibility: hidden !important;  
  }
  .description-container p {
    color: #808080;
    margin-bottom: 16px; /* Adjust the value as needed */
  }

  /* Customize the toast container */
.Toastify__toast-container {
  width: auto !important; /* Ensure the container fits the content */
}

/* Customize individual toasts */
.Toastify__toast {
  background-color: #fff; /* Change background color if necessary */
  border-radius: 8px; /* Add border-radius for a softer look */
}

/* Customize the icon */
.Toastify__toast-icon {
  width: 24px; /* Adjust the size of the icon */
  height: 24px; /* Adjust the size of the icon */
}

/* Ensure the tick icon fits within the toast */
.Toastify__toast-icon svg {
  width: 100%;
  height: 100%;
}

`;
