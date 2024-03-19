import "@rms-forge/ui-design-tokens/base.css";
import "@rms-forge/ui-design-tokens/font-loader.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "components/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R Meet",
  description: "Video Calling App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
