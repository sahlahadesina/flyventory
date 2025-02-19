import { Outfit, Ovo, Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"] //the weight here means the font thickness or boldness  
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});

export const metadata = {
  title: "FlyVentory",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body
        className={'${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden'}
      >
        {children}
      </body>
    </html>
  );
}
