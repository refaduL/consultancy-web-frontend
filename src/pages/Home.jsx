import CTASection from "../components/home/CTASection";
import HeroSection from "../components/home/HeroSection";
import ServicesPreview from "../components/home/ServicePreview";
import SuccessStories from "../components/home/SuccessStories";
import UniversitiesPreview from "../components/home/UniversitiesPreview";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <ServicesPreview />
      <UniversitiesPreview />
      <SuccessStories />
      <CTASection />
    </div>
  );
}
