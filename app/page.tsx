import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TeamSection } from "@/components/TeamSection";
import { FuturePlans } from "@/components/FuturePlans";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <FuturePlans />
    </main>
  );
}
