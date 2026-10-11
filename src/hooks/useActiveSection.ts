import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], defaultSection: string = 'hero') {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold is 35% down the viewport for comfortable section detection
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      let currentSection = defaultSection;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, defaultSection]);

  return activeSection;
}
