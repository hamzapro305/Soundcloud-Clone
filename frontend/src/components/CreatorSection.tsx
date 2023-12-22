import React from "react";
import img1 from "../Assets/images/img1.jpg";
import appstoreImage from "../Assets/images/appstoreImage.png";
import googlePlayImg from "../Assets/images/googlePlayImg.png";
import creatorImage from "../Assets/images/creatorImage.jpg";
import Image from "next/image";

const CreatorSection = () => {
    return (
        <div className="creator-container">
            <div className="playstore-container">
                <div className="img-wrapper">
                    <Image src={img1} fill alt="Some Image here" />
                </div>
                <div className="description">
                    <h1>Never Stop Listening</h1>
                    <h3>
                        SoundCloud is available on Web, iOS, Android, Sonos,
                        Chromecast, and Xbox One.
                    </h3>
                    <div className="download-buttons">
                        <button>
                            <Image
                                src={appstoreImage}
                                fill
                                alt="App Store Button"
                            />
                        </button>
                        <button>
                            <Image
                                src={googlePlayImg}
                                fill
                                alt="App Store Button"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className="creator-section">
                <Image src={creatorImage} fill alt="creator section image" />
                <div className="description">

                <h1>Calling all creators</h1>
                <h3>Get on SoundCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</h3>
                <button>Find Out more</button>
                </div>
            </div>
        </div>
    );
};

export default CreatorSection;
