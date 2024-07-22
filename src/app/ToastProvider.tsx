"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const ToastProvider = () => {
    return <ToastContainer autoClose={3000} />;
};

export default ToastProvider;
