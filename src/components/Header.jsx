import { useLocation } from "react-router-dom";

const TITLES = {
  "/app": { h: "Newsroom", s: "Today’s output at a glance" },
  "/app/create": { h: "Create a story", s: "Summary → audio → video → distribute" },
  "/app/library": { h: "Library", s: "Everything you’ve produced" },
};

export default function Header() {
  const { pathname } = useLocation();
  const t = TITLES[pathname] || TITLES["/app"];
  return (
    <div className="flex items-center gap-3.5 px-4 md:px-6 py-4 border-b border-[var(--line)] bg-white shadow-[0_1px_2px_rgba(20,14,8,0.04)] sticky top-0 z-10">
      <div className="min-w-0">
        <h1 className="font-news text-[19px] font-semibold tracking-tight truncate">{t.h}</h1>
        <div className="text-[12.5px] text-[var(--muted)] mt-px truncate">{t.s}</div>
      </div>
      <div className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[var(--green)] bg-[var(--green-soft)] px-2.5 py-1.5 rounded-full shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> <span className="hidden sm:inline">All systems live</span>
      </div>
    </div>
  );
}
