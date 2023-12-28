import { DiscoverHeader } from "@/components/Discover/DiscoverHeader";
import DiscoverSidePanel from "@/components/Discover/DiscoverSidePanel";
import GeneralLayout from "@/utils/GeneralLayout";

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
