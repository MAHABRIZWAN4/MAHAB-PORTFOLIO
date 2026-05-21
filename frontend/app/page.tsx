import HeroSection from "@/components/hero/HeroSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import WorkSection from "@/components/sections/WorkSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExpertiseSection />
      <WorkSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
