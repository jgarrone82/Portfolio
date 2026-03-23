import { AnimatedSection } from '@/src/components/ui/AnimatedSection';
import { HeroSection } from '@/src/components/sections/HeroSection';
import { AboutSection } from '@/src/components/sections/AboutSection';
import { SkillsSection } from '@/src/components/sections/SkillsSection';
import { ProjectsSection } from '@/src/components/sections/ProjectsSection';
import { ContactSection } from '@/src/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <section id="home">
        <AnimatedSection delay={0}>
          <HeroSection />
        </AnimatedSection>
      </section>

      <section id="about">
        <AnimatedSection delay={0.1}>
          <AboutSection />
        </AnimatedSection>
      </section>

      <section id="skills">
        <AnimatedSection delay={0.1}>
          <SkillsSection />
        </AnimatedSection>
      </section>

      <section id="projects">
        <AnimatedSection delay={0.1}>
          <ProjectsSection />
        </AnimatedSection>
      </section>

      <section id="contact">
        <AnimatedSection delay={0.1}>
          <ContactSection />
        </AnimatedSection>
      </section>
    </>
  );
}
