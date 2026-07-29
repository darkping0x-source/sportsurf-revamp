"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1500;

export default function CountUpStat({ value, label }: { value: string; label: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (target === null || !ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target!));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div>
      <p ref={ref} className="font-display text-3xl font-bold sm:text-4xl">
        {target === null ? value : `${count}${suffix}`}
      </p>
      <p className="mt-1 text-xs tracking-wide text-white/60 uppercase">{label}</p>
    </div>
  );
}
