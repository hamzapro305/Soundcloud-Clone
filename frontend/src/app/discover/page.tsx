import Card from "@/components/ui/Cards";
import DividerLine from "@/components/ui/DividerLine";
import React from "react";

const page = () => {
    return (
        <>
            <h2>Today's Mixes</h2>
            <div className="today-mixes">
                <Card
                    description="Your MegaMix"
                    authorName="SAINT CHAOS & .."
                />
                <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
            </div>
            <DividerLine />
                <h2>Made For Yahya Salman</h2>
            <div className="made-for-user">
            <Card
                    description="Your MegaMix"
                    authorName="SAINT CHAOS & .."
                />
                <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
            </div>
            <DividerLine />
            <h2>Trending Music on SoundCloud</h2>
            <div className="trending-section">
            <Card
                    description="Your MegaMix"
                    authorName="SAINT CHAOS & .."
                />
                <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
                <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
                <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
            </div>
        </>
    );
};

export default page;
