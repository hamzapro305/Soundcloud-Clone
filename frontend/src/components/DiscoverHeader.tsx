import Logo from "@/Assets/SVGs/Logo";
import SearchBox from "./SearchBox";
import Link from "next/link";

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
                </div>
                <div className="right"></div>
            </div>
        </header>
    );
};
