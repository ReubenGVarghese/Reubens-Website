import Link from "next/link";
import { resumeContent, site } from "@/content/site";

export default function ResumePage() {
  const { pdfHref, summary, experience, education, projects, skillGroups } = resumeContent;
  const telHref = `tel:+1${site.phone.replace(/\D/g, "").replace(/^1/, "")}`;

  return (
    <main className="resume-root mx-auto min-h-dvh max-w-2xl px-[max(1.25rem,env(safe-area-inset-left))] py-16 pb-[max(7rem,env(safe-area-inset-bottom))] pr-[max(1.25rem,env(safe-area-inset-right))] text-[var(--fg)]">
      <header className="border-b border-white/10 pb-10">
        <p className="mb-3 text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
          Résumé
        </p>
        <h1 className="mb-4 text-2xl font-normal tracking-tight text-[var(--fg)]">
          {site.displayName}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          <a
            className="text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            href={telHref}
          >
            {site.phone}
          </a>
          <a
            className="text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          <a
            className="text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            href={site.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            reubenvarghese.ca
          </a>
          <a
            className="text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {pdfHref ? (
            <a
              href={pdfHref}
              download
              className="text-[var(--fg)] no-underline hover:text-[var(--accent)]"
            >
              Download PDF
            </a>
          ) : null}
        </div>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-neutral-300">{summary}</p>
      </section>

      {education.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
            Education
          </h2>
          <ul className="space-y-6">
            {education.map((ed, i) => (
              <li
                key={`${ed.school}-${i}`}
                className="flex flex-col gap-1 border-t border-white/8 pt-6 first:border-t-0 first:pt-0 sm:flex-row sm:justify-between"
              >
                <div>
                  <p className="text-sm text-[var(--fg)]">
                    {ed.school}
                    {ed.location ? (
                      <span className="text-neutral-500"> · {ed.location}</span>
                    ) : null}
                  </p>
                  <p className="text-sm text-neutral-400">{ed.credential}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{ed.year}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {experience.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
            Experience
          </h2>
          <ul className="space-y-10">
            {experience.map((job, i) => (
              <li key={`${job.organization}-${i}`} className="border-t border-white/8 pt-8 first:border-t-0 first:pt-0">
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-base text-[var(--fg)]">{job.title}</p>
                    <p className="text-sm text-neutral-400">{job.organization}</p>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.2em] text-neutral-500 sm:text-right">
                    <p>{job.period}</p>
                    {job.location ? <p className="mt-1 normal-case tracking-normal text-neutral-600">{job.location}</p> : null}
                  </div>
                </div>
                <ul className="mt-4 list-none space-y-2 pl-0">
                  {job.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="relative pl-4 text-sm leading-relaxed text-neutral-300 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--muted)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
            Projects
          </h2>
          <ul className="space-y-10">
            {projects.map((proj, i) => (
              <li
                key={`${proj.name}-${i}`}
                className="border-t border-white/8 pt-8 first:border-t-0 first:pt-0"
              >
                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-base text-[var(--fg)]">{proj.name}</p>
                    <p className="text-sm text-neutral-400">
                      {proj.stack}
                      {proj.location ? ` · ${proj.location}` : null}
                    </p>
                  </div>
                  <p className="text-right text-xs uppercase tracking-[0.2em] text-neutral-500 sm:text-right">
                    {proj.period}
                  </p>
                </div>
                <ul className="mt-4 list-none space-y-2 pl-0">
                  {proj.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="relative pl-4 text-sm leading-relaxed text-neutral-300 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--muted)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillGroups.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-6 text-xs uppercase tracking-[0.45em] text-[var(--muted)]">
            Technical skills & interests
          </h2>
          <div className="space-y-8">
            {skillGroups.map((group, i) => (
              <div key={`${group.heading}-${i}`}>
                <h3 className="mb-3 text-[0.65rem] uppercase tracking-[0.25em] text-neutral-500">
                  {group.heading}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-white/12 px-3 py-1.5 text-xs text-neutral-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <nav className="resume-no-print mt-20 border-t border-white/10 pt-10">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.35em] text-neutral-500 no-underline hover:text-[var(--accent)]"
        >
          ← Back to home
        </Link>
      </nav>
    </main>
  );
}
