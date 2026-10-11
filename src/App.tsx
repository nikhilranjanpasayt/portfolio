import { useState } from 'react';
import { FuturisticScene } from './components/3d/FuturisticScene';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { EducationSection } from './components/sections/EducationSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { ContactSection } from './components/sections/ContactSection';
import { ToastProvider } from './components/ui/Toast';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { ScrollSpyRail } from './components/ui/ScrollSpyRail';
import { useReducedMotion } from './hooks/useReducedMotion';

export function PortfolioContent() {
  const { isReducedMotion, toggleMotion } = useReducedMotion();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden', backgroundColor: 'var(--color-black)' }}>
      {/* 3D WebGL Background Scene */}
      <FuturisticScene isReducedMotion={isReducedMotion} />

      {/* Subtle blue atmospheric glow and technical grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 50% 12%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 85% 65%, rgba(147, 197, 253, 0.05) 0%, transparent 50%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Top Navbar */}
      <Navbar
        isReducedMotion={isReducedMotion}
        onToggleMotion={toggleMotion}
      />
      <ScrollProgressBar />
      <ScrollSpyRail onNavigate={scrollTo} />

      {/* Main Page Sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Centered Hero Section */}
        <ScrollReveal>
          <HeroSection
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onExploreProjects={() => scrollTo('projects')}
            onConnect={() => scrollTo('contact')}
            onScrollToAbout={() => scrollTo('about')}
          />
        </ScrollReveal>

        {/* About Section */}
        <ScrollReveal delay={0.04}><AboutSection /></ScrollReveal>

        {/* Education Section */}
        <ScrollReveal delay={0.06}><EducationSection /></ScrollReveal>

        {/* Skills Section */}
        <ScrollReveal delay={0.08}><SkillsSection /></ScrollReveal>

        {/* Projects Section */}
        <ScrollReveal delay={0.1}><ProjectsSection /></ScrollReveal>

        {/* Experience & Achievements Section */}
        <ScrollReveal delay={0.12}><ExperienceSection /></ScrollReveal>

        {/* Resume Section */}
        <ScrollReveal delay={0.14}>
          <ResumeSection
            isModalOpen={isResumeModalOpen}
            onCloseModal={() => setIsResumeModalOpen(false)}
          />
        </ScrollReveal>

        {/* Contact Section */}
        <ScrollReveal delay={0.16}><ContactSection /></ScrollReveal>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PortfolioContent />
    </ToastProvider>
  );
}
