"use client";

import { useEffect } from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { setupWorker } from "msw";
import { handlers } from "@/mocks/handlers";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: 'Create Next App',
// 	description: 'Generated by create next app',
// };

// react-query 세팅
const queryClient = new QueryClient();

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // msw mocking
  useEffect(() => {
    if (typeof window !== "undefined") {
      const worker = setupWorker(...handlers);
      worker.start();
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div>{children}</div>
        </body>
      </html>
    </QueryClientProvider>
  );
};

export default RootLayout;
