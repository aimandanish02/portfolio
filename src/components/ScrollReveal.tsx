"use client";

import React, { useEffect, useRef, useMemo, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  as?: 'h2' | 'h3' | 'p' | 'blockquote';
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as = 'p',
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  className = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(
    () =>
      children.split(/(\s+)/).map((word, index) => {
        if (/^\s+$/.test(word)) return word;
        return (
          <span className="word inline-block" key={index}>
            {word}
          </span>
        );
      }),
    [children]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scroller = scrollContainerRef?.current ?? window;
    const wordElements = el.querySelectorAll<HTMLElement>('.word');
    const wordTrigger = { trigger: el, scroller, start: 'top bottom-=20%', end: wordAnimationEnd, scrub: true };

    const tweens = [
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        { ease: 'none', rotate: 0, scrollTrigger: { trigger: el, scroller, start: 'top bottom', end: rotationEnd, scrub: true } }
      ),
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        { ease: 'none', opacity: 1, stagger: 0.05, scrollTrigger: wordTrigger }
      )
    ];

    if (enableBlur) {
      tweens.push(
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          { ease: 'none', filter: 'blur(0px)', stagger: 0.05, scrollTrigger: { ...wordTrigger } }
        )
      );
    }

    return () => {
      tweens.forEach(tween => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  // One concrete tag type keeps the ref typing simple; all options are plain HTMLElements.
  const Tag = as as 'p';
  return (
    <Tag ref={containerRef as RefObject<HTMLParagraphElement>} className={className}>
      {splitText}
    </Tag>
  );
};

export default ScrollReveal;
