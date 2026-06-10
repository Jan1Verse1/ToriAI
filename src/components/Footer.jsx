import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { LANGS } from "../data.js";

const COLS = [
  { h: "Product", links: [["Features", "/#features"], ["How it works", "/#how"], ["Languages", "/#languages"], ["Sign in", "/signin"]] },
  { h: "Company", links: [["Contact", "/contact"], ["FAQs", "/faqs"], ["About", "/#"], ["Careers", "/#"]] },
  { h: "Legal", links: [["Privacy", "/#"], ["Terms", "/#"], ["Data & sources", "/faqs"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-[34px] h-[34px] rounded-[9px] bg-[var(--clay)] grid place-items-center text-white shadow-[0_2px_0_var(--clay-700)]">
                <Newspaper size={19} />
              </div>
              <div className="font-news font-bold text-xl tracking-tight">ToriAI</div>
            </Link>
            <p className="text-sm text-[var(--ink-soft)] mt-3 max-w-[260px] leading-relaxed">
              The newsroom engine that turns stories into audio and video, in the languages your audience speaks.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {LANGS.map((l) => (
                <span key={l.id} className="text-[11px] font-semibold px-2 py-1 rounded-full" style={{ background: l.color + "14", color: l.color }}>
                  {l.name}
                </span>
              ))}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.h}>
              <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--muted)] mb-3.5">{c.h}</div>
              <ul className="space-y-2.5">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-[var(--ink-soft)] hover:text-[var(--clay-700)] transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[var(--line)] mt-10 pt-6 flex flex-col sm:flex-row items-center gap-2 text-xs text-[var(--muted)]">
          <span>© {new Date().getFullYear()} ToriAI. Built for African newsrooms.</span>
          <span className="sm:ml-auto">Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
