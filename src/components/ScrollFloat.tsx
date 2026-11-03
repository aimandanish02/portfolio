"use client";

import React, { useEffect, useMemo, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  as = 'h2',
  id,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Characters animate individually but are grouped per word so lines only wrap between words.
  // The spans are presentational; the full string is exposed once via aria-label.
  const splitText = useMemo(
    () =>
      children.split(' ').map((word, wi, words) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((char, ci) => (
              <span className="inline-block" data-char key={ci}>
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </React.Fragment>
      )),
    [children]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scroller = scrollContainerRef?.current ?? window;
    const charElements = el.querySelectorAll('[data-char]');

    const tween = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  // One concrete tag type keeps the ref typing simple; all options are plain HTMLElements.
  const Tag = as as 'h2';
  return (
    <Tag ref={containerRef as RefObject<HTMLHeadingElement>} id={id} aria-label={children} className={`overflow-hidden ${containerClassName}`}>
      <span className={`block ${textClassName}`}>{splitText}</span>
    </Tag>
  );
};

export default ScrollFloat;
