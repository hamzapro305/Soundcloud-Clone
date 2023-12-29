import Logo from "@/Assets/SVGs/Logo";
import SearchBox from "../SearchBox";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { GoKebabHorizontal } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


export const DiscoverHeader = () => {
    return (
        <header className="DiscoverHeader">
            <div className="DiscoverHeader-wrapper general-container">
                <div className="left">
                    <div className="logo">
                        <Logo fill="red" width="50px" />
                        <p>SOUNDCLOUD</p>
                    </div>
                    <Link className="link-tag" href="#">Home</Link>
                    <Link className="link-tag" href="#">Feed</Link>
                    <Link className="link-tag" href="#">Library</Link>
                </div>
                <div className="middle">
                    <SearchBox placeholder="Search for artists, bands, tracks, podcasts"/>
                    <Link className="link-tag" href="#">Try Next Pro</Link>
                    <Link className="link-tag" href="#">For Artists</Link>
                    <Link className="link-tag" href="#">Upload</Link>
                </div>
                <div className="right">
                    <div className="profile-section">
                    <div className="circle"></div>
                    <MdOutlineKeyboardArrowDown size={16} />
                    </div>
                    <IoIosMail size={25} />
                    <IoMdNotifications size={25} />
                    <GoKebabHorizontal size={25} />

                </div>
            </div>
        </header>
    );
};
