import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, MessageCircle } from "lucide-react";

const SECTION = "max-w-3xl mx-auto px-5 md:px-8";

const FAQS = [
  { q: "What exactly is ToriAI?", a: "ToriAI is a newsroom tool that turns a written story into a short summary, then into audio and a subtitled video — translated into English, Pidgin, Hausa, Yoruba and Igbo. It's built for speed, so you can publish multilingual versions of a story within a single news cycle." },
  { q: "Which languages and voices are supported?", a: "Five languages today: English, Pidgin, Hausa, Yoruba and Igbo. Each comes with natural, named voices (for example Chidi and Ngozi for Pidgin, Aisha and Sani for Hausa) so your audio sounds human rather than robotic." },
  { q: "How accurate are the translations and voices?", a: "Translations and voices are designed for newsroom use, but you stay in control. You can read and edit every summary and script before any audio or video is generated, and regenerate as many times as you need until it's right." },
  { q: "Can I edit the text before publishing?", a: "Yes — editing is a core part of the flow. After a summary is generated you can change the length, tone or wording, and before export you can edit the script that the voice reads. Nothing is published until you approve it." },
  { q: "What formats can I export?", a: "You can download an MP3 audio file and a 9:16 subtitled MP4 video, copy an embed snippet for your website, or push directly to WhatsApp, TikTok, YouTube Shorts and Instagram." },
  { q: "Is it fast enough for breaking news?", a: "That's the point. The target is paste-to-published audio in under three minutes, with no training required — so it fits into a breaking-news workflow rather than slowing it down." },
  { q: "Do I need technical skills or training?", a: "No. The whole flow is designed to be used on a phone or a low-end laptop with no onboarding. A short three-screen intro and a one-click Pidgin demo get you to your first result immediately." },
  { q: "How does ToriAI handle our data and sources?", a: "ToriAI only reads the article text you provide, and nothing is published automatically — every output is reviewed and approved by you first. For specifics on data handling for your organisation, reach out via the contact page." },
  { q: "Does it work on low bandwidth?", a: "Yes. The interface is mobile-first and bandwidth-sensitive, so it stays usable on slower connections and modest devices, which is where many newsrooms and their audiences actually are." },
  { q: "How much does it cost?", a: "Pricing is flexible depending on the size of your newsroom and how much you produce. Get in touch through the contact page and we'll put together a plan that fits." },
];

export default function FAQs() {
  const [open, setOpen] = useState({ 0: true });
  const [q, setQ] = useState("");
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }));
  const filtered = FAQS.filter((f) => (f.q + f.a).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <section className="border-b border-[var(--line)]" style={{ backgroundImage: "radial-gradient(circle at 10% -20%, #E2EFE7, transparent 45%)" }}>
        <div className={SECTION + " py-16 md:py-20 text-center"}>
          <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--clay)]">Help centre</span>
          <h1 className="font-news text-[36px] md:text-[46px] font-semibold tracking-tight mt-2">Frequently asked questions</h1>
          <p className="text-[var(--ink-soft)] text-[17px] mt-3 max-w-xl mx-auto leading-relaxed">Everything about languages, voices, exports and how ToriAI fits into your newsroom.</p>
          <div className="relative max-w-md mx-auto mt-7">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="w-full bg-[var(--surface)] border border-[var(--line)] rounded-xl pl-11 pr-4 py-3 text-sm transition focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay-soft)]" />
          </div>
        </div>
      </section>

      <section className={SECTION + " py-14"}>
        {filtered.length === 0 ? (
          <p className="text-center text-[var(--muted)] py-10">No questions match “{q}”. Try the <Link to="/contact" className="text-[var(--clay-700)] font-semibold">contact page</Link>.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((f, i) => {
              const isOpen = open[i];
              return (
                <div key={f.q} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
                  <button onClick={() => toggle(i)} className="w-full flex items-center gap-4 text-left px-5 py-4">
                    <span className="font-semibold text-[15.5px] flex-1">{f.q}</span>
                    <ChevronDown size={18} className="text-[var(--muted)] shrink-0 transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 -mt-1 text-[14.5px] text-[var(--ink-soft)] leading-relaxed animate-fade-up">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 text-center">
          <MessageCircle size={24} className="mx-auto text-[var(--clay)]" />
          <h3 className="font-news text-[20px] font-semibold mt-3">Still have a question?</h3>
          <p className="text-[var(--ink-soft)] text-sm mt-1.5">We're happy to help your newsroom get set up.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-[var(--clay)] text-white font-semibold text-sm shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] transition">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
