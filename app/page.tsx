import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { SolutionIntro } from "@/components/sections/SolutionIntro";
import { ModuleTour } from "@/components/sections/ModuleTour";
import { BotSection } from "@/components/sections/BotSection";
import { Benefits } from "@/components/sections/Benefits";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <SolutionIntro />
      <ModuleTour />
      <BotSection />
      <Benefits />
      <CTA />
    </main>
  );
}
