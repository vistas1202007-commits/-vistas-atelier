"use client";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Respects the visitor's reduced-motion setting for every animation below.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// True only after mount, and only when the visitor hasn't asked for reduced motion.
// Keeps server and client markup identical, avoiding hydration mismatches.
function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => setAllowed(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return allowed;
}

// Fades and lifts its children in the first time they scroll into view.
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}

// Splits a heading into words that rise into place one after another.
// Wrap a phrase in *asterisks* to give it the accent style.
export function SplitText({
  text,
  as = "h2",
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const Tag = motion[as];
  const lines = text.split("\n");
  let i = 0;
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-40px" } };
  return (
    <Tag className={className} initial="hide" {...trigger} aria-label={text.replace(/\*/g, "")}>
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden>
          {line
            .split(/(\*[^*]+\*)/)
            .filter(Boolean)
            .flatMap((chunk) => {
              const accent = chunk.startsWith("*");
              return chunk
                .replace(/\*/g, "")
                .split(" ")
                .filter(Boolean)
                .map((word) => {
                  const n = i++;
                  return (
                    <Fragment key={n}>
                      <span className="split-mask">
                        <motion.span
                          className={accent ? "split-word accent" : "split-word"}
                          variants={{
                            hide: { y: "110%" },
                            show: { y: "0%", transition: { duration: 0.9, delay: delay + n * 0.05, ease } },
                          }}
                        >
                          {word}
                        </motion.span>
                      </span>{" "}
                    </Fragment>
                  );
                });
            })}
        </span>
      ))}
    </Tag>
  );
}

// Pulls its child slightly toward the cursor while hovered.
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const allowed = useMotionAllowed();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={allowed ? { x: sx, y: sy } : undefined}
      onPointerMove={(e) => {
        if (!allowed || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

// Moves its child vertically at a different speed from the page scroll.
export function Parallax({ children, offset = 60, className }: { children: ReactNode; offset?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} className={className} style={allowed ? { y } : undefined}>
      {children}
    </motion.div>
  );
}
