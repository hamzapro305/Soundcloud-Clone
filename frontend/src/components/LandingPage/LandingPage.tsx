"use client";
import React from "react";
import Banner from "@/components/LandingPage/LandingBanner";
import TrendingSection from "@/components/LandingPage/TrendingSection";
import CreatorSection from "@/components/CreatorSection";
import LandingFooter from "@/components/LandingPage/LandingFooter";
import SearchBox from "@/components/SearchBox";

const LandingPage = () => {

    return (
        <div className="general-container">
            <Banner />
            <br />
            <SearchBox />
            <br />
            <br />
            <TrendingSection />
            <CreatorSection />
            <LandingFooter />
        </div>
    );
};

export default LandingPage;
