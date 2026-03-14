"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const offset = 24;
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = offset;
  if (direction === "down") initial.y = -offset;
  if (direction === "left") initial.x = offset;
  if (direction === "right") initial.x = -offset;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type FadeInGroupProps = {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
};

export function FadeInGroup({
  children,
  className,
  stagger = 0.1,
}: FadeInGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <FadeIn key={i} delay={i * stagger}>
          {child}
        </FadeIn>
      ))}
    </div>
  );
}
