"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoMdPersonAdd } from "react-icons/io";
import { GoKebabHorizontal } from "react-icons/go";
import { FaHeart } from "react-icons/fa";

type Props = {
    description: string;
    authorName: string;
};

const Card = ({ description, authorName }: Props) => {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="song-card">
            <div
                className="poster"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Image
                    src="/card img 1.jpg"
                    layout="fill"
                    alt="Song Thumbnail"
                />
                <AnimatePresence exitBeforeEnter>
                    {hovered && (
                        <motion.div {...animation} className="play">
                            <Image
                                width={70}
                                height={70}
                                src="/playicn.png"
                                alt="Play Logo"
                            />
                            {/* <Play /> */}
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence exitBeforeEnter>
                    {hovered && (
                        <motion.div {...animation} className="options">
                            <div className="heart" >
                            <FaHeart />
                            </div>
                            <div className="add-friend"><IoMdPersonAdd /> </div>
                            <div>
                              <GoKebabHorizontal /> 
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="title">{description}</div>
            <div className="author">{authorName}</div>
        </div>
    );
};

export default Card;

const animation = {
    variants: {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    },
    transition: {
        duration: 0.35,
    },
    initial: "hidden",
    animate: "show",
    exit: "hidden",
};
