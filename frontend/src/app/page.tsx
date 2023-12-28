"use client";
import React from "react";
import Banner from "@/components/LandingPage/LandingBanner";
import TrendingSection from "@/components/LandingPage/TrendingSection";
import CreatorSection from "@/components/CreatorSection";
import LandingFooter from "@/components/LandingPage/LandingFooter";
import SearchBox from "@/components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/Redux/Hooks";
import LandingPage from "@/components/LandingPage/LandingPage";
import { useRouter } from 'next/navigation'
import { DiscoverHeader } from "@/components/Discover/DiscoverHeader";
import { makeStore } from "../Redux/Store";

const page = () => {

    const router = useRouter()
    const token = useAppSelector((state) => {
        return state.GlobalVariable.token;
    });

    if (token!=="") {
        router.replace('/discover')
    }    

    return (
        <>
            <LandingPage />
        </>
    );
};

export default page;
