import HeroSection from "@/components/hero/HeroSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import WorkSection from "@/components/sections/WorkSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExpertiseSection />
      <WorkSection />
      <ProjectsSection />
    </main>
  );
}
