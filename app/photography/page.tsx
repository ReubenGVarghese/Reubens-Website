"use client";

import { useEffect } from "react";
import Link from "next/link";
import InfiniteGallery from "@/components/InfiniteGallery";
import { photographyImages } from "@/content/site";

export default function PhotographyPage() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden bg-black overscroll-none">
      <InfiniteGallery
        images={photographyImages}
        className="absolute inset-0 h-full w-full"
        speed={1.1}
        visibleCount={photographyImages.length}
        fadeSettings={{
          fadeIn: { start: 0.02, end: 0.1 },
          fadeOut: { start: 0.9, end: 0.98 },
        }}
        blurSettings={{
          blurIn: { start: 0.0, end: 0.06 },
          blurOut: { start: 0.94, end: 1.0 },
          maxBlur: 3.0,
        }}
      />
      <nav className="pointer-events-auto fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-20 mix-blend-difference">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.4em] text-white no-underline hover:text-[var(--accent)]"
        >
          ← Index
        </Link>
      </nav>
      <p className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-20 max-w-[11rem] text-right text-[0.6rem] uppercase leading-relaxed tracking-[0.25em] text-white/60 sm:max-w-xs">
        <span className="sm:hidden">Swipe to navigate</span>
        <span className="hidden sm:inline">
          Scroll to navigate · Hover to distort
        </span>
      </p>
    </div>
  );
}
