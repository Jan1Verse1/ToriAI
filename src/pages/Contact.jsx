import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import TextField from "../components/TextField.jsx";

const SECTION = "max-w-6xl mx-auto px-5 md:px-8";

const INFO = [
  { icon: Mail, t: "Email", d: "hello@toriai.ng", s: "We reply within one business day." },
  { icon: Phone, t: "Phone", d: "+234 (0) 700 8674 000", s: "Mon–Fri, 9am–6pm WAT." },
  { icon: MapPin, t: "Office", d: "Yaba, Lagos, Nigeria", s: "Visits by appointment." },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "", topic: "General enquiry", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div>
      <section className="border-b border-(--line)" style={{ backgroundImage: "radial-gradient(circle at 90% -20%, #F6E7DF, transparent 45%)" }}>
        <div className={SECTION + " py-16 md:py-20"}>
          <span className="text-[12px] font-bold uppercase tracking-widest text-(--clay)">Contact us</span>
          <h1 className="font-news text-[36px] md:text-[46px] font-semibold tracking-tight mt-2">Let's talk newsrooms</h1>
          <p className="text-(--ink-soft) text-[17px] mt-3 max-w-xl leading-relaxed">
            Questions about languages, voices, pricing or a custom rollout for your team? Send a note and we'll get back to you.
          </p>
        </div>
      </section>

      <section className={SECTION + " py-14 grid lg:grid-cols-[1fr_1.3fr] gap-12"}>
        {/* info */}
        <div>
          <div className="space-y-5">
            {INFO.map((i) => {
              const Icon = i.icon;
              return (
                <div key={i.t} className="flex gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-(--clay-tint) text-(--clay-700) grid place-items-center">
                    <Icon size={19} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wide font-semibold text-(--muted)">{i.t}</div>
                    <div className="font-semibold text-[15px] mt-0.5">{i.d}</div>
                    <div className="text-[13px] text-(--ink-soft) mt-0.5">{i.s}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl border border-(--line) bg-(--surface) p-5 flex items-start gap-3">
            <Clock size={18} className="text-(--green) mt-0.5 shrink-0" />
            <p className="text-[13.5px] text-(--ink-soft) leading-relaxed">
              Working on a breaking story and need help fast? Mention <span className="font-semibold text-(--ink)">“urgent”</span> in your message and we'll prioritise it.
            </p>
          </div>
        </div>

        {/* form */}
        <div className="rounded-2xl border border-(--line) bg-(--surface) p-6 md:p-8">
          {sent ? (
            <div className="h-full grid place-items-center text-center py-10 animate-fade-up">
              <div>
                <div className="w-14 h-14 rounded-full bg-(--green-soft) grid place-items-center mx-auto">
                  <CheckCircle2 size={28} className="text-(--green)" />
                </div>
                <h3 className="font-news text-[22px] font-semibold mt-4">Message sent</h3>
                <p className="text-(--ink-soft) text-sm mt-2 max-w-sm">
                  Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""} — we've got your note and will reply to{" "}
                  <span className="font-semibold text-(--ink)">{form.email || "your email"}</span> shortly.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", org: "", topic: "General enquiry", message: "" }); }} className="mt-5 text-sm font-semibold text-(--clay-700)">
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <TextField label="Full name" placeholder="Amara Okeke" value={form.name} onChange={set("name")} required />
                <TextField label="Work email" type="email" placeholder="you@newsroom.com" value={form.email} onChange={set("email")} required />
              </div>
              <TextField label="Organisation" placeholder="Your newsroom or outlet" value={form.org} onChange={set("org")} />
              <label className="block mb-4">
                <span className="block text-[12.5px] font-semibold text-(--ink-soft)] mb-1.5">Topic</span>
                <select value={form.topic} onChange={set("topic")} className="w-full bg-(--surface-2)] border border-(--line)] rounded-xl px-3.5 py-2.5 text-sm transition focus:outline-none focus:border-(--clay)] focus:bg-white focus:ring-2 focus:ring-(--clay-soft)]">
                  {["General enquiry", "Sales & pricing", "Technical support", "Press", "Partnership"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="block mb-5">
                <span className="block text-[12.5px] font-semibold text-(--ink-soft)] mb-1.5">Message</span>
                <textarea required rows={5} placeholder="Tell us a bit about your newsroom and what you need…" value={form.message} onChange={set("message")} className="w-full bg-(--surface-2)] border border-(--line)] rounded-xl px-3.5 py-3 text-sm leading-relaxed resize-y transition focus:outline-none focus:border-(--clay)] focus:bg-white focus:ring-2 focus:ring-(--clay-soft)]" />
              </label>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm shadow-[0_2px_0(--clay-700)] hover:bg-(--clay-700)] hover:-translate-y-px transition">
                <Send size={16} /> Send message
              </button>
              <p className="text-[12px] text-(--muted)] text-center mt-3">We'll only use your details to respond to this enquiry.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
