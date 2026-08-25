"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll reveal. Fires once, animates transform and opacity only.
 *
 * Under reduced motion the travel is dropped but the fade is kept, so the
 * change is still visible rather than silently missing.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure" | "span";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.62, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const wordContainer: Variants = {
  hidden: {},
  shown: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const wordChild: Variants = {
  hidden: { y: "110%" },
  shown: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

/**
 * Masked word-by-word reveal.
 *
 * Splits on words rather than characters deliberately: whole words stay intact
 * in the DOM, so the text is still one readable string for a crawler and for a
 * screen reader. Character splitting would shred it.
 */
export function SplitWords({
  text,
  className,
  stagger = 0.055,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "blockquote";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag className={className}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
        >
          {text}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        variants={wordContainer}
        custom={stagger}
        transition={{ delayChildren: delay }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em" }}
          >
            <motion.span className="inline-block" variants={wordChild}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
