import Link from "next/link";
import HeadshotGallery from "@/components/HeadshotGallery";
import { headshotImages } from "@/content/site";

export default function HeadshotsPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[var(--bg)]">
      <nav className="fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-20">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-xs uppercase tracking-[0.4em] text-neutral-500 no-underline hover:text-[var(--accent)]"
        >
          ← Index
        </Link>
      </nav>

      <HeadshotGallery images={headshotImages} />
    </main>
  );
}
