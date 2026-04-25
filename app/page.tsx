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
        
        {/* SEO Optimized Content Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">About Our Platform</h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p>
                Our platform is an advanced AI-powered online learning system designed to help students succeed in entrance exams and GAT preparation. We connect learners with experienced instructors through interactive live sessions, while also offering a wide range of high-quality prerecorded courses for flexible learning.
              </p>
              <p>
                With intelligent AI features, the platform personalizes study plans based on each student’s needs, helping them focus on the right topics at the right time. Students can access structured lessons, practice materials, and real-time guidance—all managed by professional admins to ensure quality and consistency.
              </p>
              <p>
                Whether you prefer live interaction or self-paced learning, our platform provides everything you need to prepare effectively and achieve your academic goals.
              </p>
            </div>
          </div>
        </section>

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
