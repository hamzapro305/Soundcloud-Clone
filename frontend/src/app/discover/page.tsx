"use client"
import Card from "@/components/ui/Cards";
import DividerLine from "@/components/ui/DividerLine";
import SimpleSlider from "./SimpleSlider";

const page = () => {
    const sliderSettings={
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
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
            <SimpleSlider />
            {/* <Slider {...sliderSettings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider> */}
        </>
    );
};

export default page;
