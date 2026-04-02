import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fatra Academy | Modern Learning Platform",
  description: "Choose from our comprehensive range of courses designed for every stage of your educational journey. Explore entrance exam prep, technology courses, and soft skills.",
  keywords: "online learning, courses, education, edtech, entrance exam, GAT preparation",
  openGraph: {
    title: "Fatra Academy | Modern Learning Platform",
    description: "Explore Learning Paths - courses for every stage of your educational journey",
    type: "website",
  },
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Chatbot />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
