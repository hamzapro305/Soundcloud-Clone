"use client";

import React, { useState } from "react";
import BackDrop from "../Backdrop";
import { useAppDispatch } from "@/Redux/Hooks";
import { GlobalVariablesActions } from "@/Redux/Slices/GlobalVariablesSlice";
import { IoIosClose } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";

const LoginModal = () => {
    const [localLogin, setLocalLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isToken, setToken] = useLocalStorage("token", "");

    const dispatch = useAppDispatch();

    const openGoogleLoginWindow = () => {
        let child = window.open(
            "http://localhost:8000/api/auth/login/google",
            "Google Login",
            "width=500,height=600"
        );

        window.addEventListener("message", (e) => {
            if (e.source === child) setToken(() => e.data?.token);
        });
    };
    return (
        <BackDrop>
            <div className="login-modal">
                <div
                    className="close-btn"
                    onClick={() => {
                        dispatch(GlobalVariablesActions.setLoginModal(false));
                    }}
                >
                    <IoIosClose />
                </div>
                {!localLogin && (
                    <div className="login-strategies">
                        <button className="fb-strategy">
                            <FaFacebook />
                            Continue with Facebook
                        </button>
                        <button
                            onClick={openGoogleLoginWindow}
                            className="google-strategy"
                        >
                            <FcGoogle />
                            Continue with Google
                        </button>
                        <button className="apple-strategy">
                            <FaApple />
                            Continue with Apple
                        </button>
                        or
                        <input
                            type="text"
                            placeholder="Your Email Address or Profile URL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="primary-btn"
                            onClick={() => setLocalLogin(true)}
                        >
                            Continue
                        </button>
                    </div>
                )}
                {localLogin && (
                    <>
                        <center>
                            <h2>Welcome Back!</h2>
                        </center>
                        <div className="input-creds">
                            <input
                                type="text"
                                placeholder="Your Email Address or Profile URL"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="signin-btn">Sign In</button>
                    </>
                )}
                <div hidden={localLogin} className="details">
                    <div className="need-help">
                        <a href="">Need Help?</a>
                    </div>
                    <div className="tc-text">
                        When registering, you agree that we may use your
                        provided data for the registration and to send you
                        notifications on our products and services. You can
                        unsubscribe from notifications at any time in your
                        settings. For additional info please refer to our{" "}
                        <a href="">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </BackDrop>
    );
};

export default LoginModal;
