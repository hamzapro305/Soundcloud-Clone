"use client";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchBox = () => {
    const [value, setValue] = useState<string>("");
    return (
        <div className="SearchBox">
            <input
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <IoSearchOutline />
        </div>
    );
};

export default SearchBox;
