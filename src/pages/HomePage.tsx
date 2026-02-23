import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Hero } from '../components/sections/Hero';
import { Problem } from '../components/sections/Problem';
import { ScrollThreadContainer } from '../components/animation/ScrollThreadContainer';

const Possibility = lazy(async () => {
  const mod = await import('../components/sections/Possibility');
  return { default: mod.Possibility };
});

const Approach = lazy(async () => {
  const mod = await import('../components/sections/Approach');
  return { default: mod.Approach };
});

const Modules = lazy(async () => {
  const mod = await import('../components/sections/Modules');
  return { default: mod.Modules };
});

const Results = lazy(async () => {
  const mod = await import('../components/sections/Results');
  return { default: mod.Results };
});

const Philosophy = lazy(async () => {
  const mod = await import('../components/sections/Philosophy');
  return { default: mod.Philosophy };
});

const Founder = lazy(async () => {
  const mod = await import('../components/sections/Founder');
  return { default: mod.Founder };
});

const FinalCTA = lazy(async () => {
  const mod = await import('../components/sections/FinalCTA');
  return { default: mod.FinalCTA };
});

interface DeferredSectionProps {
  children: ReactNode;
  minHeight: number;
  placeholderClassName: string;
  rootMargin?: string;
}

function ScrollThreadReflow({ children }: { children: ReactNode }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('scroll-thread:remeasure'));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <>{children}</>;
}

function DeferredSection({
  children,
  minHeight,
  placeholderClassName,
  rootMargin = '500px 0px',
}: DeferredSectionProps) {
  const placeholderRef = useRef<HTMLElement>(null);
  const [shouldMount, setShouldMount] = useState(() => (
    typeof window !== 'undefined' && !('IntersectionObserver' in window)
  ));

  useEffect(() => {
    if (shouldMount) return;
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, [rootMargin, shouldMount]);

  const fallbackSection = (
    <section
      aria-hidden="true"
      className={placeholderClassName}
      style={{ minHeight }}
    />
  );

  if (!shouldMount) {
    return (
      <section
        ref={placeholderRef}
        aria-hidden="true"
        className={placeholderClassName}
        style={{ minHeight }}
      />
    );
  }

  return (
    <Suspense fallback={fallbackSection}>
      <ScrollThreadReflow>{children}</ScrollThreadReflow>
    </Suspense>
  );
}

export function HomePage() {
  return (
    <ScrollThreadContainer preset="homepage">
      <Hero />
      <Problem />
      <DeferredSection minHeight={960} placeholderClassName="relative overflow-hidden bg-[#f5f1ed] py-20 lg:py-24">
        <Possibility />
      </DeferredSection>
      <DeferredSection minHeight={720} placeholderClassName="relative overflow-hidden bg-cream py-20 lg:py-32">
        <Approach />
      </DeferredSection>
      <DeferredSection minHeight={920} placeholderClassName="relative overflow-hidden bg-white py-20 lg:py-32">
        <Modules />
      </DeferredSection>
      <DeferredSection minHeight={760} placeholderClassName="relative overflow-hidden bg-white py-20 lg:py-32">
        <Results />
      </DeferredSection>
      <DeferredSection minHeight={820} placeholderClassName="relative overflow-hidden bg-navy py-24 lg:py-32">
        <Philosophy />
      </DeferredSection>
      <DeferredSection minHeight={840} placeholderClassName="relative overflow-hidden bg-white py-20 lg:py-32">
        <Founder />
      </DeferredSection>
      <DeferredSection minHeight={620} placeholderClassName="relative overflow-hidden bg-navy py-20 lg:py-32">
        <FinalCTA />
      </DeferredSection>
    </ScrollThreadContainer>
  );
}
