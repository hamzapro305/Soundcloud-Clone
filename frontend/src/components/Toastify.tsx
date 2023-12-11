import React from "react";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorToast = (content: string): void => {
    toast.error(content);
};

const WarnToast = (content: string): void => {
    toast.warn(content);
};

const SuccessToast = (content: string): void => {
    toast.success(content);
};

const HSToast = () => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            transition={Zoom}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            newestOnTop
        // limit={2}
        />
    );
};

export default HSToast;

export { ErrorToast, WarnToast, SuccessToast };
