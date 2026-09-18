"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { killScramble, scrambleElementText } from "@/lib/scramble";
import type { EntertainmentRow } from "@/content/site";
import { site } from "@/content/site";

function EntRow({
  row,
  active,
  idle,
  onEnter,
  listRef,
}: {
  row: EntertainmentRow;
  active: boolean;
  idle: boolean;
  onEnter: (id: string, image: string) => void;
  listRef: (el: HTMLAnchorElement | null) => void;
}) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fields: [RefObject<HTMLSpanElement | null>, string][] = [
      [titleRef, row.title],
      [subtitleRef, row.subtitle],
      [categoryRef, row.category],
      [labelRef, row.label],
      [yearRef, row.year],
    ];

    if (active) {
      fields.forEach(([ref, text]) => {
        if (ref.current) scrambleElementText(ref.current, text);
      });
    } else {
      fields.forEach(([ref, text]) => {
        if (ref.current) {
          killScramble(ref.current);
          ref.current.textContent = text;
        }
      });
    }
  }, [active, row]);

  return (
    <a
      ref={listRef}
      href={row.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`ent-item ${active ? "active" : ""} ${idle ? "idle" : ""}`}
      onMouseEnter={() => onEnter(row.id, row.image)}
      onPointerEnter={() => onEnter(row.id, row.image)}
      onFocus={() => onEnter(row.id, row.image)}
      onTouchStart={() => onEnter(row.id, row.image)}
    >
      <span className="label">Title</span>
      <span ref={titleRef} className="value hover-text">
        {row.title}
      </span>
      <span className="label">Artist / Director</span>
      <span ref={subtitleRef} className="value hover-text">
        {row.subtitle}
      </span>
      <span className="label">Kind</span>
      <span ref={categoryRef} className="value hover-text">
        {row.category}
      </span>
      <span className="label">Label / Genre</span>
      <span ref={labelRef} className="value hover-text">
        {row.label}
      </span>
      <span className="label">Year</span>
      <span ref={yearRef} className="value hover-text">
        {row.year}
      </span>
    </a>
  );
}

export default function EntertainmentWall({
  tracks,
  films,
}: {
  tracks: EntertainmentRow[];
  films: EntertainmentRow[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isIdle, setIsIdle] = useState(true);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const filmRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    [...tracks, ...films].forEach((item) => {
      if (!item.image) return;
      const img = new Image();
      img.src = item.image;
    });
  }, [tracks, films]);

  const stopIdleAnimation = useCallback(() => {
    if (idleTimelineRef.current) {
      idleTimelineRef.current.kill();
      idleTimelineRef.current = null;
    }
    [...trackRefs.current, ...filmRefs.current].forEach((el) => {
      if (el) gsap.set(el, { opacity: 1 });
    });
  }, []);

  const startIdleAnimation = useCallback(() => {
    if (idleTimelineRef.current) return;
    const items = [...trackRefs.current, ...filmRefs.current].filter(Boolean);
    if (items.length === 0) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    items.forEach((item, index) => {
      const hideTime = index * 0.05;
      const showTime = (items.length * 0.05 * 0.5 + index * 0.05) as number;
      tl.to(
        item,
        { opacity: 0.08, duration: 0.12, ease: "power2.inOut" },
        hideTime
      );
      tl.to(
        item,
        { opacity: 1, duration: 0.12, ease: "power2.inOut" },
        showTime
      );
    });
    idleTimelineRef.current = tl;
  }, []);

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!activeId) {
        setIsIdle(true);
        startIdleAnimation();
      }
    }, site.idleDelay);
  }, [activeId, startIdleAnimation]);

  const stopIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const handleEnter = useCallback(
    (id: string, imageUrl: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      stopIdleAnimation();
      stopIdleTimer();
      setIsIdle(false);
      if (activeId === id) return;
      setActiveId(id);

      const bg = backgroundRef.current;
      if (imageUrl && bg) {
        bg.style.transition = "none";
        bg.style.transform = "translate(-50%, -50%) scale(1.12)";
        bg.style.backgroundImage = `url(${imageUrl})`;
        bg.classList.add("visible");

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bg.style.transition =
              "opacity 0.55s ease, transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            bg.style.transform = "translate(-50%, -50%) scale(1)";
          });
        });
      }
    },
    [activeId, stopIdleAnimation, stopIdleTimer]
  );

  const handleLeavePanel = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setActiveId(null);
    backgroundRef.current?.classList.remove("visible");
    startIdleTimer();
  }, [startIdleTimer]);

  useEffect(() => {
    startIdleTimer();
    return () => {
      stopIdleTimer();
      stopIdleAnimation();
    };
  }, [startIdleTimer, stopIdleTimer, stopIdleAnimation]);

  return (
    <div className="ent-page">
      <div
        ref={backgroundRef}
        className="ent-bg"
        aria-hidden
      />
      <div
        className="ent-container"
        onMouseLeave={handleLeavePanel}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") handleLeavePanel();
        }}
        role="presentation"
      >
        <section className="ent-panel">
          <h2>Audio</h2>
          <div className="ent-list" role="list">
            {tracks.map((row, index) => (
              <EntRow
                key={row.id}
                row={row}
                active={activeId === row.id}
                idle={isIdle}
                onEnter={handleEnter}
                listRef={(el) => {
                  trackRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </section>
        <section className="ent-panel">
          <h2>Video</h2>
          <div className="ent-list" role="list">
            {films.map((row, index) => (
              <EntRow
                key={row.id}
                row={row}
                active={activeId === row.id}
                idle={isIdle}
                onEnter={handleEnter}
                listRef={(el) => {
                  filmRefs.current[index] = el;
                }}
              />
            ))}
          </div>
        </section>
      </div>
      <nav className="ent-corner corner-tl" aria-label="Site">
        <Link href="/">← Back to home</Link>
      </nav>
    </div>
  );
}
