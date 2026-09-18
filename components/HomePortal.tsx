import Link from "next/link";
import { site } from "@/content/site";

const LINKS = [
  { href: "/photography", label: "Personal Photography" },
  { href: "/headshots", label: "Headshots" },
  { href: "/entertainment", label: "Let me put you on" },
  { href: "/resume", label: "Résumé" },
  { href: "/about", label: "About" },
] as const;

export default function HomePortal() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <header
        className="absolute right-[max(1.25rem,env(safe-area-inset-right))] top-[max(1.25rem,env(safe-area-inset-top))] z-10 max-w-[14rem] text-right sm:top-8 sm:right-8 sm:max-w-[16rem]"
        aria-label={`${site.displayName}, established 2007`}
      >
        <p className="text-[0.55rem] uppercase leading-relaxed tracking-[0.28em] text-neutral-500">
          <span>{site.displayName.toUpperCase()}</span>
          <sup className="ml-0.5 translate-y-[-0.15em] text-[0.6em] tracking-normal">
            ™
          </sup>
          <br />
          <span className="tracking-[0.35em]">EST. 2007</span>
        </p>
      </header>
      <nav
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-10 flex flex-col items-start gap-2.5 text-left sm:bottom-6 sm:left-6"
        aria-label="Site sections"
      >
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[0.7rem] uppercase leading-none tracking-[0.35em] text-neutral-500 no-underline transition-colors hover:text-[var(--accent)] active:text-[var(--accent)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
