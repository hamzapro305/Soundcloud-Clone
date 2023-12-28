"use client";
import { useAppDispatch } from "@/Redux/Hooks";
import { GlobalVariablesActions } from "@/Redux/Slices/GlobalVariablesSlice";
import Image from "next/legacy/image";

const Navbar = () => {
    const dispatch = useAppDispatch();
    return (
        <nav className="header-nav">
            <div>
                <Image
                    src="/soundCloudLogo.png"
                    width={200}
                    height={35}
                    alt="Logo"
                />
            </div>
            <div className="nav-btns">
                <button
                    onClick={() => {
                        dispatch(GlobalVariablesActions.setLoginModal(true));
                    }}
                >
                    Sign in
                </button>
                <button>Create Account</button>
                <div>For Artists</div>
            </div>
        </nav>
    );
};

export default Navbar;
