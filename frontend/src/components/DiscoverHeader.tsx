import SearchBox from "./SearchBox";

export const DiscoverHeader = () => {
    return (
        <header className="DiscoverHeader">
            <div className="DiscoverHeader-wrapper general-container">
                <div className="left">
                    <div className="logo"></div>
                    <nav></nav>
                </div>
                <div className="middle">
                    <SearchBox />
                </div>
                <div className="right"></div>
            </div>
        </header>
    );
};
