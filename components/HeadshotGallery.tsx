"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type HeadshotImage = {
  src: string;
  alt: string;
};

export default function HeadshotGallery({
  images,
}: {
  images: HeadshotImage[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const didSwipeRef = useRef(false);

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-10">
        <header className="mb-10 sm:mb-12">
          <h1 className="text-xs uppercase tracking-[0.5em] text-[var(--muted)]">
            Headshots
          </h1>
        </header>

        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-neutral-900 text-left outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                aria-label={`Open headshot ${index + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeIndex !== null && images[activeIndex] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Headshot ${activeIndex + 1}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 sm:p-8"
          style={{ touchAction: "none" }}
          onClick={() => {
            if (didSwipeRef.current) {
              didSwipeRef.current = false;
              return;
            }
            close();
          }}
          onPointerDown={(e) => {
            if (e.pointerType === "touch" || e.pointerType === "pen") {
              swipeRef.current = { x: e.clientX, y: e.clientY };
              didSwipeRef.current = false;
            }
          }}
          onPointerUp={(e) => {
            const start = swipeRef.current;
            swipeRef.current = null;
            if (!start) return;
            const dx = e.clientX - start.x;
            const dy = e.clientY - start.y;
            if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
            didSwipeRef.current = true;
            e.stopPropagation();
            if (dx < 0) showNext();
            else showPrev();
          }}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.35em] text-white/70 hover:text-white"
          >
            Close
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-1/2 z-10 hidden min-h-11 -translate-y-1/2 items-center text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white sm:inline-flex"
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 z-10 hidden min-h-11 -translate-y-1/2 items-center text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white sm:inline-flex"
            aria-label="Next image"
          >
            →
          </button>

          <figure
            className="relative flex max-h-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex].src}
              alt=""
              className="max-h-[75dvh] w-auto max-w-full object-contain sm:max-h-[80dvh]"
              draggable={false}
            />
            <figcaption className="mt-4 text-center text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
              <span className="sm:hidden">Swipe · </span>
              {activeIndex + 1} / {images.length}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
