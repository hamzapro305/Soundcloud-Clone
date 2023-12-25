import React from "react";
import Cards from "./ui/Cards";
import trends from "@/utils/MockTrending";
import Link from 'next/link'

const TrendingSection = () => {
    return (
        <div>
            <h2 className="trending-heading">
                Hear what's trending for free in the SoundCloud community
            </h2>
            <div className="trending-cards">
                {trends.map((data, key) => {
                    return (
                        <Cards
                            key={key}
                            authorName={data.author}
                            description={data.description}
                        />
                    );
                })}
            </div>
			<div className="explore-trending-btn">
            <button className="primary-btn" ><Link className="link-tag" href="/discover">Explore Trending playlists</Link></button>
			</div>
        </div>
    );
};

export default TrendingSection;
