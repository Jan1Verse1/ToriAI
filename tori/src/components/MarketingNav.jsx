import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Newspaper, Menu, X } from "lucide-react";

const LINKS = [
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

export default function MarketingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur border-b border-[var(--line)]"
      style={{ backgroundColor: "rgba(251,246,238,0.82)" }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--clay)] grid place-items-center text-white shadow-[0_2px_0_var(--clay-700)]">
            <Newspaper size={19} />
          </div>
          <div className="font-news font-bold text-xl tracking-tight">ToriAI</div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                "px-3 py-2 rounded-lg text-sm font-medium transition " +
                (isActive ? "text-[var(--clay-700)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-2">
          <Link to="/signin" className="px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px transition"
          >
            Get started
          </Link>
        </div>

        <button className="ml-auto md:hidden p-2 -mr-2 text-[var(--ink)]" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--surface)] px-5 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="px-2 py-2.5 rounded-lg text-sm font-medium text-[var(--ink-soft)]">
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            <Link to="/signin" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--line-strong)] text-[var(--ink-soft)]">
              Sign in
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-green-600 text-white">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
