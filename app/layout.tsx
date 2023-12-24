import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/provider/theme-provider";
import SessionProvider from "@/components/provider/session-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Optido",
  description: "Optimize your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="theme-2"
            >
              <Toaster position="bottom-center" />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
