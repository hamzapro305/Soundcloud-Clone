import React from "react";
import Navbar from "./Navbar";

const LandingBanner = () => {
    return (
        <header className='landing-banner'>
            <Navbar />
            <div className="content">
                <h1 className="title">Connect on SoundCloud</h1>
                <div className="desc">Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</div>
                <button>Sign Up for free</button>
            </div>
        </header>
    );
};

export default LandingBanner;
