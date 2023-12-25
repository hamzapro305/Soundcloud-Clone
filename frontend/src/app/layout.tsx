import type { Metadata } from "next";
import "./../styles/style.scss";
import HSToast from "@/components/Toastify";
import StoreProvider from "@/Redux/StoreProvide";
import ModalsInit from "@/components/ModalsInit";
import FootPlayer from "@/components/FootPlayer";

export const metadata: Metadata = {
    title: "Soundcloud Clone",
    description: "Made by yaya & hamze",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <StoreProvider>
                <body>
                    {children}
                    <div className="Middlewares">
                        <HSToast />
                        <ModalsInit />
                    </div>
                    {/* <FootPlayer /> */}
                </body>
            </StoreProvider>
        </html>
    );
}
