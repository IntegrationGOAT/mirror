import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mirror",
  description: "A digital twin that remembers what you said, did, and avoided.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
