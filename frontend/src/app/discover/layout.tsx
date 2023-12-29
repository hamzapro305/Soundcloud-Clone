import { DiscoverHeader } from "@/components/Discover/DiscoverHeader";
import DiscoverSidePanel from "@/components/Discover/DiscoverSidePanel";
import GeneralLayout from "@/utils/GeneralLayout";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default GeneralLayout((children) => {
    return (
        <>
            <DiscoverHeader />
            <div className="discover-wrapper">
                <div className="main-content">{children}</div>
                <DiscoverSidePanel />
            </div>
        </>
    );
});
