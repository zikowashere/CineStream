import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import Provider from "./components/providers/provider";
import { ThemeProvider } from "./components/theme/themeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CineStream Movies",
  description: "Stream your movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en">
        <body className="bg-black h-full ">
          <Navbar />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Provider>
  );
}
