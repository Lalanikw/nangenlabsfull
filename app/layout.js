import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
const outfitFont = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "NanGenLabs",
  description: "Empowering the Future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfitFont.className}>
      <body className={outfitFont.className}>
        <div className="relative">
          <Header />
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}