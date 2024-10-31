import React from "react";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import Provider from "@/utils/Provider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Dribbble - Auth",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <div className="flex h-[100vh]">
          <div className="w-[400px]">
            <video src="/images/signup.mp4" autoPlay={true} className="h-full aspect-video object-cover" muted loop />
          </div>
          <Provider>{children}</Provider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
