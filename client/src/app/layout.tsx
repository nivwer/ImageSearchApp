import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar/Navbar";
import Background from "@/components/layout/Background/Background";
import Header from "@/components/layout/Header/Header";
import Loader from "@/components/layout/Loader/Loader";
import Footer from "@/components/layout/Footer/Footer";

const font = Cinzel({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Image Search",
  description: "Image Search is an application for searching images.",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Loader />
          <Background />
          <div className="container max-w-4xl mx-auto p-2 sm:p-4 sm:pb-14 min-h-screen flex flex-col justify-between">
            <div>
              <Navbar />
              <Header />
              {children}
            </div>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
