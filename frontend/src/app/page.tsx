"use client";
import React from "react";
import Banner from "@/components/LandingBanner";
import TrendingSection from "@/components/TrendingSection";
import CreatorSection from "@/components/CreatorSection";
import LandingFooter from "@/components/LandingFooter";
import SearchBox from "@/components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/Redux/Hooks";
import LandingPage from "@/components/LandingPage";
import { DiscoverHeader } from "@/components/DiscoverHeader";
import { makeStore } from "../Redux/Store";

const page = () => {
    const token = useAppSelector((state) => {
        return state.GlobalVariable.token;
    });
    // const store= makeStore()
    // console.log(store.getState().GlobalVariable.token,"======")

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