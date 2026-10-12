import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BookProvider } from "@/context/BookContext";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Book Vibe — Next.js Book Listing App",
  description: "Discover, list, and track your favorite books with Book Vibe.",
  icons: {
    icon: "/book.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#131313] py-4 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-12 antialiased selection:bg-[#23BE0A]/20 selection:text-[#131313]">
        <BookProvider>
          <div className="max-w-[1240px] mx-auto bg-white rounded-2xl sm:rounded-[32px] shadow-2xl p-4 sm:p-8 lg:p-12 min-h-[90vh] flex flex-col">
            <Navbar />
            <main className="flex-1 w-full flex flex-col">
              {children}
            </main>
          </div>
        </BookProvider>
      </body>
    </html>
  );
}
