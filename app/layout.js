import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
const outfitFont = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "NanGenLabs",
  description: "Empowering the Future",
  icons: {
    icon: '/favicon.png', // or '/favicon.ico'
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
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
          <Footer/>
          
        </div>
        
      </body>
      
    </html>
  );
}