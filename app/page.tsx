import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryExplore from "@/components/CategoryExplore";
import CourseHighlights from "@/components/CourseHighlights";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Fatra Academy",
    "url": "https://fatra.academy",
    "logo": "https://fatra.academy/logo.png",
    "description": "Join our AI-powered online learning platform designed for students preparing for entrance exams and GAT. Access live sessions, personalized learning, and high-quality recorded courses.",
    "sameAs": [
      "https://facebook.com/fatra_academy",
      "https://twitter.com/fatra_academy",
      "https://linkedin.com/company/fatra-academy"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ET"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <Stats />

        <CategoryExplore />
        
        <CourseHighlights />

        <Features />

        <FeaturedCourses />

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
