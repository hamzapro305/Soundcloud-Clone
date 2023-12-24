"use client";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

type props = { placeholder?: string };
const SearchBox = ({ placeholder }: props) => {
    const [value, setValue] = useState<string>("");
    return (
        <div className="SearchBox">
            <input
                type="search"
                value={value}
                placeholder={placeholder ?? ""}
                onChange={(e) => setValue(e.target.value)}
            />
            <IoSearchOutline size={12} />
            <button>Upload you own</button>
        </div>
    );
};

export default SearchBox;
