import React from "react";
import Navbar from "./Navbar";

const Header = () => {
    return (
        // <header className='main-header'>
        //   <Navbar />
        // </header>
        <header className='main-header'>
            <Navbar />
            <div className="content">
                <div className="title">Connect on SoundCloud</div>
                <div className="desc">Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</div>
                <button>Sign Up for free</button>
            </div>
        </header>
    );
};

export default Header;
