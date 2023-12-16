import { DiscoverHeader } from "@/components/DiscoverHeader";
import GeneralLayout from "@/utils/GeneralLayout";

export default GeneralLayout((children) => {
    return (
        <div className="wrapper">
            <DiscoverHeader />
            {children}
        </div>
    );
});
