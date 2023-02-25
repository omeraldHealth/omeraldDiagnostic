import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const successAlert = (msg) => toast.success(msg)

export const infoAlert = (msg) => toast.info(msg)

export const warningAlert = (msg) => toast.warn(msg)

export const errorAlert = (msg) => toast.error(msg)

