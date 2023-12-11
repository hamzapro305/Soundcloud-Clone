"use client";
import React from "react";
import BackDrop from "../Backdrop";
import { useAppDispatch } from "@/Redux/Hooks";
import { GlobalVariablesActions } from "@/Redux/Slices/GlobalVariablesSlice";

const LoginModal = () => {
    const dispatch = useAppDispatch()
    return (
        <BackDrop onClick={() => {
            dispatch(GlobalVariablesActions.setLoginModal(false))
        }}>
            <div>
                sdisadiosahdsadj
            </div>
        </BackDrop>
    );
};

export default LoginModal;
