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
  title: {
    default: "AI-Powered Online Learning Platform for Entrance & GAT Exam Preparation | Live & Recorded Courses",
    template: "%s | Fatra Academy",
  },
  description: "Join our AI-powered online learning platform designed for students preparing for entrance exams and GAT. Access live sessions with expert instructors, personalized learning, and high-quality recorded courses—all in one place.",
  keywords: [
    "AI learning platform",
    "online learning Ethiopia",
    "entrance exam preparation",
    "GAT exam training",
    "AI tutoring platform",
    "live online classes",
    "recorded courses platform",
    "e-learning for students",
    "exam preparation courses",
    "AI education system",
    "virtual classrooms",
    "instructor-led learning",
    "adaptive learning platform",
    "online tutoring system",
  ],
  authors: [{ name: "Fatra Academy Team" }],
  creator: "Fatra Academy",
  publisher: "Fatra Academy",
  metadataBase: new URL("http://localhost:3000"), // Change to production URL later
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Fatra Academy | Modern Learning Platform",
    description: "Empower your future with expert-led courses. From entrance exams to professional skills, Fatra Academy is your partner in educational excellence.",
    url: "https://fatra.academy",
    siteName: "Fatra Academy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg",
        width: 1200,
        height: 630,
        alt: "Fatra Academy Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatra Academy | Modern Learning Platform",
    description: "Join the future of learning. Expert-led courses, interactive sessions, and accredited programs.",
    creator: "@fatra_academy",
    images: ["https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg"],
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
