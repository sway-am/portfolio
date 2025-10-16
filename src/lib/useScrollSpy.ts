import { useEffect, useState } from "react";

export default function useScrollSpy(ids: string[], options?: IntersectionObserverInit) {
  const [activeId, setActiveId] = useState<string>(ids[0] || "");

  useEffect(() => {
    if (!ids || ids.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];

      if (visible?.target instanceof HTMLElement) {
        setActiveId(visible.target.id);
      } else {
        let current = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) current = id;
        }
        setActiveId(current);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
      ...options,
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, options]); 

  return activeId;
}
