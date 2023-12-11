"use client"
import React, { FC } from "react";
import { MotionStyle, motion } from "framer-motion";

type Component = FC<{
    children?: JSX.Element;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    Animation?: any;
    Styles?: MotionStyle
}>;
const BackDrop: Component = ({ children, onClick, Animation, Styles }) => (
    <motion.div
        className="BackDrop"
        {...(Animation ?? PageAnimation)}
        style={{ ...Styling, ...(Styles ?? {}) }}
        onClick={(e) => {
            onClick && onClick(e);
        }}
    >
        {children ?? ""}
    </motion.div>
);

const Styling = {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#000000AA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: 100,
    height: "100vh",
};

const PageAnimation = {
    variants: {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    },
    initial: "hidden",
    animate: "show",
    exit: "hidden",
};

export default BackDrop;