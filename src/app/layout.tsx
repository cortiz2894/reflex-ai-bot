import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./utils/react-query-provider";

export const metadata: Metadata = {
  title: "Reflex AI Bot",
  description: "Challenge for Reflex AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
