import { Link } from "@tanstack/react-router";
import { nav, profile } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_auto_auto]">
          <div className="min-w-0">
            <p className="text-base font-semibold tracking-tight">{profile.name}</p>
            <p className="label-mono mt-1">{profile.role}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I build practical systems that solve real operational problems — automation, internal
              tools, and integrations.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label-mono">Navigation</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={profile.links.github}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.links.linkedin}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.links.email}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Email
                </a>
              </li>
              <li>
                <Link
                  to="/resume"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="label-mono">{profile.status}</p>
        </div>
      </div>
    </footer>
  );
}
