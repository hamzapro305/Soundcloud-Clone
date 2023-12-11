"use client"
import { useAppDispatch } from "@/Redux/Hooks";
import { GlobalVariablesActions } from "@/Redux/Slices/GlobalVariablesSlice";

const Navbar = () => {
    const dispatch = useAppDispatch()
    return (
        <nav className="header-nav">
            <div>
                <div>Logo</div>
            </div>
            <div className="nav-btns">
                <button onClick={() => {
                    dispatch(GlobalVariablesActions.setLoginModal(true))
                }}>Sign in</button>
                <button>Create Account</button>
                <div>For Artists</div>
            </div>
        </nav>
    );
};

export default Navbar;
