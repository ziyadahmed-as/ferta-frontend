import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryExplore from "@/components/CategoryExplore";
import CourseHighlights from "@/components/CourseHighlights";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black overflow-x-hidden">
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
