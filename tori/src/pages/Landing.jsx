import { Link } from "react-router-dom";
import {
  ArrowRight, Play, Check, FileText, Languages, Mic, Film, Share2, Pencil,
  Zap, Clock, Sparkles,
} from "lucide-react";
import { LANGS, WAVE } from "../data.js";

const SECTION = "max-w-6xl mx-auto px-5 md:px-8";

const FEATURES = [
  { icon: FileText, t: "Instant summaries", d: "Paste a link or text and get a clean, broadcast-ready summary in seconds — short or medium, in the tone you choose.", bg: "#FBF1EB", fg: "#BC4A2A" },
  { icon: Languages, t: "Five Nigerian languages", d: "English, Pidgin, Hausa, Yoruba and Igbo — translate once and reach the audiences other tools leave out.", bg: "#E2EFE7", fg: "#2E6B4E" },
  { icon: Mic, t: "Real, named voices", d: "Choose a voice with a name and character — Chidi, Aisha, Bọla — not a robotic “Voice 1”.", bg: "#F6ECD3", fg: "#BE8E2C" },
  { icon: Film, t: "Audio & video, ready to post", d: "Generate an MP3 and a subtitled 9:16 video in one pass — formatted for the feed, not the archive.", bg: "#E6EEF2", fg: "#3A6276" },
  { icon: Share2, t: "One-tap distribution", d: "Push straight to WhatsApp, TikTok, YouTube Shorts and Instagram, or grab an embed for your site.", bg: "#FBF1EB", fg: "#BC4A2A" },
  { icon: Pencil, t: "You stay in control", d: "Edit every summary and script before anything is generated. Nothing publishes until you approve it.", bg: "#E2EFE7", fg: "#2E6B4E" },
];

const STEPS = [
  { n: "1", t: "Paste the story", d: "A URL, raw text, or a linked article." },
  { n: "2", t: "Generate a summary", d: "Pick length, tone and language." },
  { n: "3", t: "Choose a voice", d: "Named voices for each language." },
  { n: "4", t: "Preview & edit", d: "Listen, watch, tweak the script." },
  { n: "5", t: "Export & share", d: "Download or post in a tap." },
];

const TRUST = ["Lagos Daily", "Naija Pulse", "The Northern Star", "Delta Herald", "Sahel Report"];

function HeroMock() {
  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
      <div className="absolute -inset-6 -z-10 rounded-[28px] opacity-70 blur-2xl" style={{ background: "radial-gradient(circle at 70% 20%, #E8A87C55, transparent 55%), radial-gradient(circle at 20% 90%, #2E6B4E33, transparent 55%)" }} />
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_30px_60px_-30px_rgba(40,30,15,0.4)] p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--clay)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--green)]" />
          <span className="ml-auto text-[11px] font-semibold text-[var(--muted)]">New story</span>
        </div>
        <div className="text-[11px] uppercase tracking-wide text-[var(--muted)] font-semibold">Summary · Pidgin</div>
        <p className="font-news text-[15px] leading-relaxed mt-1.5 text-[var(--ink)]">
          Lagos State don bring solar bus wey go dey carry people for three big routes — to cut transport money and reduce smoke for air.
        </p>

        <div className="mt-4 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-3.5 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[var(--clay)] grid place-items-center text-white shadow-[0_3px_0_var(--clay-700)] shrink-0">
            <Play size={18} style={{ marginLeft: 2 }} />
          </span>
          <span className="flex items-end gap-[2px] h-7 flex-1">
            {WAVE.slice(0, 40).map((h, i) => (
              <span key={i} className="flex-1 rounded-[2px]" style={{ height: `${h * 100}%`, background: i < 18 ? "var(--clay)" : "var(--line-strong)" }} />
            ))}
          </span>
          <span className="text-[11px] text-[var(--muted)] shrink-0">0:12</span>
        </div>

        <div className="flex items-center gap-2 mt-3 text-[11px] font-medium text-[var(--green)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]" /> Chidi · Pidgin voice ready
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {LANGS.map((l) => (
            <span key={l.id} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: l.color + "14", color: l.color }}>
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 85% -10%, #F6E7DF, transparent 45%), radial-gradient(circle at -10% 30%, #E2EFE7, transparent 40%)" }} />
        <div className={SECTION + " pt-16 md:pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center"}>
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--clay-tint)] text-[var(--clay-700)] text-[12.5px] font-semibold animate-fade-up">
              <Zap size={14} /> Built for African newsrooms
            </span>
            <h1 className="font-news text-[40px] md:text-[54px] leading-[1.05] font-semibold tracking-tight mt-5 animate-fade-up" style={{ animationDelay: "40ms" }}>
              From story to broadcast,<br />
              <span className="text-[var(--clay)]">in five languages.</span>
            </h1>
            <p className="text-[var(--ink-soft)] text-[17px] leading-relaxed mt-5 max-w-[520px] animate-fade-up" style={{ animationDelay: "80ms" }}>
              ToriAI turns any written report into a summary, audio and subtitled video — translated into English, Pidgin, Hausa, Yoruba and Igbo. Fast enough for breaking news, simple enough to need no training.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 text-white font-semibold text-[15px] shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px transition">
                Get started free <ArrowRight size={18} />
              </Link>
              <button onClick={() => scrollTo("how")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--line-strong)] font-semibold text-[15px] text-[var(--ink)] hover:bg-[var(--surface)] transition">
                <Play size={16} /> See how it works
              </button>
            </div>
            <div className="flex items-center gap-4 mt-5 text-[13px] text-[var(--muted)] animate-fade-up" style={{ animationDelay: "160ms" }}>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[var(--green)]" /> No training needed</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-[var(--green)]" /> Under 3 minutes</span>
            </div>
          </div>
          <HeroMock />
        </div>

        {/* trust strip */}
        <div className="border-y border-[var(--line)] bg-[var(--surface)]/60">
          <div className={SECTION + " py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2"}>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[var(--muted)]">Trusted by newsrooms like</span>
            {TRUST.map((t) => (
              <span key={t} className="font-news text-[17px] font-semibold text-[var(--ink-soft)]/70">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className={SECTION + " py-20"}>
        <div className="max-w-2xl">
          <h2 className="font-news text-[32px] md:text-[38px] font-semibold tracking-tight leading-tight">Everything a newsroom needs to go multilingual</h2>
          <p className="text-[var(--ink-soft)] text-[16px] mt-3 leading-relaxed">Built around speed, trust and the languages your audience actually speaks — not a generic AI toy.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.t} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[var(--line-strong)] hover:shadow-[0_10px_30px_-18px_rgba(40,30,15,0.35)]">
                <div className="w-11 h-11 rounded-xl grid place-items-center mb-4" style={{ background: f.bg, color: f.fg }}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-[16px]">{f.t}</h3>
                <p className="text-[var(--ink-soft)] text-[14px] leading-relaxed mt-1.5">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-[var(--surface)] border-y border-[var(--line)]">
        <div className={SECTION + " py-20"}>
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--clay)]">How it works</span>
            <h2 className="font-news text-[32px] md:text-[38px] font-semibold tracking-tight mt-2">Five steps. One news cycle.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="w-11 h-11 rounded-full bg-[var(--clay)] text-white grid place-items-center font-news font-semibold text-lg shadow-[0_3px_0_var(--clay-700)]">{s.n}</div>
                <h3 className="font-semibold text-[15px] mt-4">{s.t}</h3>
                <p className="text-[var(--ink-soft)] text-[13.5px] leading-relaxed mt-1">{s.d}</p>
                {i < STEPS.length - 1 && <div className="hidden lg:block absolute top-[22px] left-[52px] right-[-12px] h-px bg-[var(--line-strong)]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section id="languages" className={SECTION + " py-20"}>
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--clay)]">Languages & voices</span>
          <h2 className="font-news text-[32px] md:text-[38px] font-semibold tracking-tight mt-2">Voices with names, not numbers</h2>
          <p className="text-[var(--ink-soft)] text-[16px] mt-3 leading-relaxed">Every language ships with natural, named voices so your audio sounds like a person — because it should.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {LANGS.map((l) => (
            <div key={l.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
              <div className="w-11 h-11 rounded-xl grid place-items-center text-white font-news font-bold" style={{ background: l.color }}>{l.abbr}</div>
              <h3 className="font-semibold text-[16px] mt-4">{l.name}</h3>
              <ul className="mt-2 space-y-1.5">
                {l.voices.map((v) => (
                  <li key={v.n} className="flex items-center gap-2 text-[13px] text-[var(--ink-soft)]">
                    <Mic size={13} className="text-[var(--muted)]" /> {v.n} <span className="text-[var(--muted)]">· {v.d.split(" · ")[0]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg,#2A2118,#43331F 55%,#5C3A22)" }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #C97A3D, transparent 40%), radial-gradient(circle at 85% 80%, #2E6B4E, transparent 45%)" }} />
        <div className={SECTION + " py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 relative"}>
          {[["< 3 min", "Story to finished audio"], ["5", "Languages, 10+ voices"], ["0", "Hours of training needed"], ["4+", "Channels in one tap"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-news text-[40px] md:text-[48px] font-semibold leading-none">{n}</div>
              <div className="text-white/70 text-[14px] mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={SECTION + " py-20"}>
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles size={24} className="mx-auto text-[var(--clay)]" />
          <blockquote className="font-news text-[26px] md:text-[32px] leading-[1.35] font-medium tracking-tight mt-5">
            “We used to publish in English and hope. Now the same story goes out in Pidgin and Hausa before lunch — and that's where most of our audience actually is.”
          </blockquote>
          <div className="text-[var(--muted)] text-[14px] mt-5">Digital editor · independent Nigerian newsroom</div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={SECTION + " pb-24"}>
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-white text-center" style={{ background: "linear-gradient(135deg,#BC4A2A,#9B3A1F)" }}>
          <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 80% 10%, #E8A87C, transparent 45%)" }} />
          <h2 className="relative font-news text-[32px] md:text-[42px] font-semibold tracking-tight max-w-2xl mx-auto leading-tight">Get your newsroom on air in every language</h2>
          <p className="relative text-white/85 text-[16px] mt-4 max-w-xl mx-auto">Start free. Paste a story, generate a Pidgin clip, and feel the difference in under three minutes.</p>
          <div className="relative flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-green-600 text-[var(--clay-700)] font-semibold text-[15px] hover:-translate-y-px transition">
              Get started free <ArrowRight size={18} />
            </Link>
            <Link to="/signin" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-[15px] hover:bg-white/10 transition">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
