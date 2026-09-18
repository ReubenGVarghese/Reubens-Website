import Link from "next/link";
import { site } from "@/content/site";

const ABOUT_PORTRAIT = "/assets/Reuben%20Flick.jpeg";

export default function AboutPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ABOUT_PORTRAIT}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-[115%] w-full -translate-y-[6%] object-cover object-[center_top] sm:-translate-y-[10%]"
        decoding="async"
        fetchPriority="high"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/70 to-black/20 md:bg-gradient-to-r md:from-black/85 md:via-black/40 md:to-black/10"
      />
      <div className="relative z-[2] flex min-h-dvh w-full items-end px-[max(1.25rem,env(safe-area-inset-left))] pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 sm:p-12">
        <div className="max-w-lg text-left pr-[max(1rem,env(safe-area-inset-right))]">
          <h1 className="mb-6 text-xs uppercase tracking-[0.55em] text-[var(--muted)] sm:mb-8">
            About me...
          </h1>
          <p className="mb-5 text-sm leading-relaxed text-neutral-300 sm:mb-6">
            Hey Chat. Welcome to my website. I am a comp sci and business student at
            Western University.
          </p>
          <p className="mb-8 text-sm leading-relaxed text-neutral-300 sm:mb-10">
            Have fun learning about me, and if you want to be inspired, let me put you
            on. <span className="text-[var(--accent)]">{site.displayName}</span>.
          </p>
          <p className="mb-8 flex flex-wrap gap-x-6 gap-y-3 text-sm sm:mb-10">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center break-all text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            >
              {site.email}
            </a>
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.35em] text-neutral-500 no-underline hover:text-[var(--accent)]"
          >
            ← Index
          </Link>
        </div>
      </div>
    </main>
  );
}
