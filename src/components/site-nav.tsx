import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { nav, profile } from "@/data/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
          : "border-transparent bg-background"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-6 lg:grid-cols-[auto_1fr_auto]"
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5 group" aria-label="Home">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 via-blue-600 to-emerald-500 p-0.5 shadow-xs group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-slate-950 font-mono text-[11px] font-black tracking-tighter text-sky-400">
              NFL
            </div>
          </div>
          <span className="truncate text-sm font-semibold tracking-tight group-hover:text-sky-400 transition-colors">
            {profile.name}
          </span>
        </Link>

        <ul className="hidden items-center justify-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/contact"
            className="hidden rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Let's Connect
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface lg:hidden"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-foreground transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-foreground transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[11px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-border transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="block rounded-md px-3 py-2.5 text-base"
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              to="/contact"
              tabIndex={open ? 0 : -1}
              className="block rounded-md bg-primary px-3 py-2.5 text-center text-base font-medium text-primary-foreground"
            >
              Let's Connect
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
