import { useState } from "react";
import { Wand2, Zap, ChevronRight } from "lucide-react";
import { LANGS } from "../data.js";
import Button from "./Button.jsx";

const SLIDES = [
  {
    eyebrow: "Welcome to ToriAI",
    title: "From story to broadcast in minutes",
    text: "Turn any written report into a short summary, then into audio and video — translated into the languages your audience actually speaks.",
    visual: (
      <div className="w-full h-full grid place-items-center" style={{ background: "linear-gradient(135deg,#BC4A2A,#9B3A1F)" }}>
        <Wand2 size={54} color="#fff" className="opacity-95" />
      </div>
    ),
  },
  {
    eyebrow: "Five languages, real voices",
    title: "English, Pidgin, Hausa, Yoruba & Igbo",
    text: "Each language comes with named, natural voices — like Chidi for Pidgin or Aisha for Hausa — so your audio sounds human, not robotic.",
    visual: (
      <div className="w-full h-full flex items-center justify-center gap-2.5" style={{ background: "linear-gradient(135deg,#2A2118,#43331F)" }}>
        {LANGS.map((l) => (
          <div key={l.id} className="w-[42px] h-[42px] rounded-[11px] grid place-items-center text-white font-news font-bold text-[15px]" style={{ background: l.color }}>
            {l.abbr}
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Try it now",
    title: "One click. Pidgin audio. Done.",
    text: "We've loaded a sample story for you. Tap below to watch ToriAI summarise it and generate a Pidgin audio clip — your first “aha” moment.",
    visual: (
      <div className="w-full h-full grid place-items-center" style={{ background: "linear-gradient(135deg,#2E6B4E,#1f4a36)" }}>
        <Zap size={54} color="#fff" className="opacity-95" />
      </div>
    ),
  },
];

export default function Onboarding({ onClose, onDemo }) {
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const s = SLIDES[i];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-5 bg-[rgba(28,22,14,0.46)] backdrop-blur-sm">
      <div className="w-full max-w-[460px] bg-[var(--surface)] rounded-[20px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(20,14,8,0.5)] animate-pop">
        <div className="h-[172px] relative overflow-hidden grid place-items-center">{s.visual}</div>
        <div className="px-7 pt-6 pb-6">
          <div className="text-[11px] font-bold tracking-widest uppercase text-[var(--clay)]">{s.eyebrow}</div>
          <div className="font-news text-2xl font-semibold tracking-tight my-2">{s.title}</div>
          <div className="text-sm text-[var(--ink-soft)] leading-relaxed">{s.text}</div>
          <div className="flex items-center mt-6">
            <div className="flex gap-1.5">
              {SLIDES.map((_, k) => (
                <span key={k} className="h-[7px] rounded-full transition-all" style={{ width: k === i ? 20 : 7, background: k === i ? "var(--clay)" : "var(--line-strong)" }} />
              ))}
            </div>
            <div className="ml-auto flex items-center">
              <button className="text-[12.5px] text-[var(--muted)] font-medium mr-3.5" onClick={onClose}>Skip</button>
              {last ? (
                <Button onClick={onDemo}><Zap size={16} /> Generate audio in Pidgin</Button>
              ) : (
                <Button variant="dark" onClick={() => setI(i + 1)}>Next <ChevronRight size={16} /></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
