import React from "react";
import Banner from "@/components/LandingBanner";
import TrendingSection from "@/components/TrendingSection";
import CreatorSection from "@/components/CreatorSection";
import LandingFooter from "@/components/LandingFooter";


const page = () => {
    return (
        <div className="general-container">
            <Banner />
            Sommething
            <TrendingSection />
            <CreatorSection />
            <LandingFooter />
        </div>
    );
};

export default page;
