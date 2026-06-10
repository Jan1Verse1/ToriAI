import { Link } from "react-router-dom";
import { Newspaper, Check } from "lucide-react";

const BULLETS = [
  "Summaries, audio and video in under 3 minutes",
  "Five languages with real, named voices",
  "Publish straight to WhatsApp, TikTok and your site",
];

export default function AuthLayout({ heading, sub, wide, children }) {
  return (
    <div className="min-h-screen flex bg-[var(--paper)] text-[var(--ink)]">
      {/* brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[44%] p-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(150deg,#9B3A1F,#BC4A2A 48%,#7d2f18)" }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 15%, #E8A87C55, transparent 45%), radial-gradient(circle at 10% 90%, #2E6B4E55, transparent 45%)",
          }}
        />
        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="w-[36px] h-[36px] rounded-[10px] bg-white/15 backdrop-blur grid place-items-center">
            <Newspaper size={20} />
          </div>
          <span className="font-news font-bold text-xl">ToriAI</span>
        </Link>

        <div className="relative">
          <h2 className="font-news text-[34px] leading-[1.15] font-semibold tracking-tight max-w-[420px]">
            Put your newsroom on air — in the languages your audience speaks.
          </h2>
          <ul className="mt-7 space-y-3">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-white/90">
                <span className="w-5 h-5 mt-0.5 rounded-full bg-white/20 grid place-items-center shrink-0">
                  <Check size={13} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5">
          <p className="font-news text-[17px] leading-relaxed">
            “We pushed a Pidgin audio bulletin while the story was still breaking. ToriAI paid for itself in one news cycle.”
          </p>
          <div className="text-sm text-white/75 mt-3">Newsroom editor · independent Lagos outlet</div>
        </div>
      </div>

      {/* form side */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex items-center">
          <Link to="/" className="flex items-center gap-2.5 lg:hidden">
            <div className="w-[32px] h-[32px] rounded-[9px] bg-[var(--clay)] grid place-items-center text-white">
              <Newspaper size={18} />
            </div>
            <span className="font-news font-bold text-lg">ToriAI</span>
          </Link>
          <Link to="/" className="ml-auto text-sm text-[var(--muted)] hover:text-[var(--ink)] transition">
            ← Back to site
          </Link>
        </div>

        <div className="flex-1 grid place-items-center px-5 pb-12">
          <div className={"w-full " + (wide ? "max-w-[480px]" : "max-w-[400px]")}>
            <h1 className="font-news text-[28px] font-semibold tracking-tight">{heading}</h1>
            <p className="text-[var(--ink-soft)] text-sm mt-1.5 mb-7">{sub}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
