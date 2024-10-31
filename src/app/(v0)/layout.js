import "../globals.css";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/Common/Navbar";
import Provider from "@/utils/Provider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Dribbble",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Provider>
          <Navbar /> {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
