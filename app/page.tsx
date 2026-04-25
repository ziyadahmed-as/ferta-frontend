import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryExplore from "@/components/CategoryExplore";
import CourseHighlights from "@/components/CourseHighlights";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Fatra Academy",
    "url": "https://fatra.academy",
    "logo": "https://fatra.academy/logo.png",
    "description": "Fatra Academy offers a wide range of expert-led courses from entrance exam preparation to professional development.",
    "sameAs": [
      "https://facebook.com/fatra_academy",
      "https://twitter.com/fatra_academy",
      "https://linkedin.com/company/fatra-academy"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryExplore />
        <CourseHighlights />
        <FeaturedCourses />
        <Features />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
