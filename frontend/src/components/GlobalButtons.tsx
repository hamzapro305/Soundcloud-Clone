import { FC } from "react";
import { motion } from "framer-motion"
import { WarnToast } from "./Toastify";

type GlobalButton = FC<{
    disabled?: boolean | undefined;
    onClick?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
    children?: any | undefined;
    cssClass?: string | undefined;
    isLoading?: boolean | undefined;
    ButtonRef?: any | undefined;
}>;
const GlobalButton: GlobalButton = ({
    disabled,
    onClick,
    children,
    cssClass,
    isLoading,
    ButtonRef,
}) => (
    <motion.button
        disabled={disabled ?? false}
        className={`GlobalMainButton ${cssClass ?? ""}`}
        onClick={isLoading ? () => WarnToast("Please Wait") : onClick && onClick}
        style={{ cursor: isLoading ? "progress" : "pointer" }}
        ref={ButtonRef ?? null}
        transition={{ type: "tween" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0, transition: { type: "tween" } }}
    >
        {isLoading ? "Loading" : children}
    </motion.button>
);

export {
    GlobalButton,
};
