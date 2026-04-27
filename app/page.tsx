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
    <div className="flex flex-col min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <Stats />

        <CategoryExplore />
        
        {/* SEO Optimized Content Section */}
        <section className="section-padding bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <span className="badge-text">Educational Ecosystem</span>
            <h2 className="section-title mb-8 text-slate-900 dark:text-white">About Our Platform</h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p>
                Our AI-powered platform is designed for entrance exam and GAT success. We combine interactive live sessions with high-quality recorded courses to provide a flexible, expert-led learning experience tailored to your needs.
              </p>
              <p>
                With personalized study plans and real-time guidance, we help you focus on what matters most. Whether you prefer live interaction or self-paced learning, we provide the tools you need to achieve your academic goals.
              </p>
            </div>
          </div>
        </section>

        <CourseHighlights />
        <FeaturedCourses />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
