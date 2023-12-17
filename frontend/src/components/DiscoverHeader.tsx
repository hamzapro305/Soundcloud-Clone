import Logo from "@/Assets/SVGs/Logo";
import SearchBox from "./SearchBox";

export const DiscoverHeader = () => {
    return (
        <header className="DiscoverHeader">
            <div className="DiscoverHeader-wrapper general-container">
                <div className="left">
                    <div className="logo">
                        <Logo fill="red" width="50px" />
                        <p>SOUNDCLOUD</p>
                    </div>
                    <a href="#">Home</a>
                    <a href="#">Feed</a>
                    <a href="#">Library</a>
                </div>
                <div className="middle">
                    <SearchBox placeholder="Search for artists, bands, tracks, podcasts"/>
                </div>
                <div className="right"></div>
            </div>
        </header>
    );
};
