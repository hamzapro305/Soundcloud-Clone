"use client"
import React, { useState } from "react";
import LoginModal from "./Modals/LoginModal";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [showLoginModal, setShowLoginModal]= useState<boolean>(false);

    return (
        <nav className="header-nav">
            <div>
                <div>Logo</div>
            </div>
            <div className="nav-btns">
                <button onClick={()=>{setShowLoginModal(true)}}>Signin</button>
                <button>Create Account</button>
                <div>For Artists</div>
            </div>
            <AnimatePresence >
                {showLoginModal &&
                <LoginModal />
                }
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
