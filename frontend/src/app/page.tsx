"use client";
import React from "react";
import LandingPage from "@/components/LandingPage";
import { DiscoverHeader } from "@/components/DiscoverHeader";

const page = async () => {
    return (
        <>
            {token === "" ? (
                // Render Landing Page If user not logged in
                <LandingPage />
            ) : (
                <>
                    <DiscoverHeader />
                    dfsdf
                </>
            )}
        </>
    );
};

export default page;
