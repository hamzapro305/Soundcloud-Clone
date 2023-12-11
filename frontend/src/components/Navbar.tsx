"use client"
import React from "react";

const Navbar = () => {
    return (
        <nav className="header-nav">
            <div>
                <div>Logo</div>
            </div>
            <div className="nav-btns">
                <button onClick={()=>{}}>Signin</button>
                <button>Create Account</button>
                <div>For Artists</div>
            </div>
        </nav>
    );
};

export default Navbar;
