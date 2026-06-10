import { useState, useEffect } from "react";
import { Headphones, Play, Pause, Check } from "lucide-react";
import { WAVE } from "../data.js";

export default function AudioPlayer({ voice, lang, accent }) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0); // 0..1
  const TOTAL = 38;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPos((p) => {
        const n = p + 1 / (TOTAL * 4);
        if (n >= 1) { setPlaying(false); return 0; }
        return n;
      });
    }, 250);
    return () => clearInterval(id);
  }, [playing]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[15px] p-[18px]">
      <div className="flex items-center gap-2.5 text-[13px] font-semibold mb-4">
        <Headphones size={16} style={{ color: accent }} /> Audio preview
        <span className="ml-auto text-[11px] font-semibold text-[var(--green)] bg-[var(--green-soft)] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <Check size={11} /> Ready
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-[50px] h-[50px] shrink-0 rounded-full grid place-items-center text-white transition hover:scale-105"
          style={{ background: accent, boxShadow: `0 3px 0 ${accent}` }}
        >
          {playing ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
        </button>
        <div className="flex items-center gap-[2.5px] h-[46px] flex-1">
          {WAVE.map((h, i) => {
            const active = i / WAVE.length <= pos;
            return (
              <span
                key={i}
                className="flex-1 min-w-[2px] rounded-[2px] transition-transform"
                style={{
                  height: `${h * 100}%`,
                  background: active ? accent : "var(--line-strong)",
                  transform: playing && active ? `scaleY(${0.7 + Math.random() * 0.5})` : "scaleY(1)",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3.5 text-[11.5px] text-[var(--muted)]">
        <span>{voice} · {lang}</span>
        <span>{fmt(pos * TOTAL)} / {fmt(TOTAL)}</span>
      </div>
    </div>
  );
}
