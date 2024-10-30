import "./globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Dribbble",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
