import Card from "@/components/ui/Cards";
import React, { Component } from "react";
import Slider from "react-slick";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <button style={{"backgroundColor":"black"}}>Next</button>,
      prevArrow: <button>Prev</button>
    };
    return (
      <div>
        <h2>Custom Arrows</h2>
        <Slider {...settings}>
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        <Card description="Your Mix 1" authorName="SAINT CHAOS & .." />
        </Slider>
      </div>
    );
  }
}