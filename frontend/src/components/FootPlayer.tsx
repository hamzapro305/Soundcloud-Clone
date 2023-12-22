"use client";

import {
    MdSkipPrevious,
    MdSkipNext,
    MdPause,
    MdPlayArrow,
} from "react-icons/md";
import { TfiControlShuffle } from "react-icons/tfi";
import { IoRepeat } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

const FootPlayer = () => {
    const dispatch = useAppDispatch();
    
    return (
        <div className="FootPlayer">
            <div className="FootPlayer-wrapper general-container">
                <div className="actions">
                    <button className="action prev">
                        <MdSkipPrevious />
                    </button>
                    <button className="action status" >
                        {true ? <MdPause /> : <MdPlayArrow />}
                    </button>
                    <button className="action next">
                        <MdSkipNext />
                    </button>
                    <button className="action shuffle">
                        <TfiControlShuffle />
                    </button>
                    <button className="action repeat">
                        <IoRepeat />
                    </button>
                </div>
                <div className="playbackTimeline">
                    <div className="timeStamp">0:00</div>
                    <div className="timeLine"></div>
                    <div className="duration">3:00</div>
                </div>
                <div className="song">
                    <div className="image"></div>
                    <div className="info"></div>
                    <div className="song-actions"></div>
                </div>
            </div>
        </div>
    );
};

export default FootPlayer;
