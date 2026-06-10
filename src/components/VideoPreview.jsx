import { useState, useEffect } from "react";
import { Film, Play, Check, Newspaper } from "lucide-react";

export default function VideoPreview({ headline, subs, accent }) {
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);
  const [subi, setSubi] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProg((p) => {
        const n = p + 0.012;
        if (n >= 1) { setPlaying(false); return 0; }
        return n;
      });
    }, 90);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    setSubi(Math.min(subs.length - 1, Math.floor(prog * subs.length)));
  }, [prog, subs.length]);

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[15px] p-[18px]">
      <div className="flex items-center gap-2.5 text-[13px] font-semibold mb-4">
        <Film size={16} style={{ color: accent }} /> Video preview
        <span className="ml-auto text-[11px] font-semibold text-[var(--green)] bg-[var(--green-soft)] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
          <Check size={11} /> With subtitles
        </span>
      </div>

      <div
        className="relative rounded-xl overflow-hidden grid place-items-center"
        style={{ aspectRatio: "16/9", background: "linear-gradient(135deg,#2A2118,#43331F 55%,#5C3A22)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #C97A3D55, transparent 40%), radial-gradient(circle at 80% 70%, #2E6B4E44, transparent 45%)",
          }}
        />
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 text-white text-[11px] font-semibold opacity-90">
          <span className="w-[18px] h-[18px] rounded-[5px] bg-[var(--clay)] grid place-items-center">
            <Newspaper size={11} color="#fff" />
          </span>
          ToriAI
        </div>

        {!playing && prog === 0 && (
          <div className="relative z-20 text-white font-news font-semibold text-[21px] text-center px-6 leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
            {headline}
          </div>
        )}
        {(playing || prog > 0) && (
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 max-w-[86%] bg-black/60 text-white px-3 py-1.5 rounded-md text-[13px] font-medium text-center leading-snug">
            {subs[subi]}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div className="h-full transition-[width] duration-200" style={{ width: `${prog * 100}%`, background: accent }} />
        </div>

        {!playing && (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 z-40 grid place-items-center bg-[rgba(20,14,8,0.28)] transition">
            <span className="w-[58px] h-[58px] rounded-full bg-white/95 grid place-items-center shadow-[0_6px_24px_rgba(0,0,0,0.35)]" style={{ color: accent }}>
              <Play size={24} style={{ marginLeft: 3 }} />
            </span>
          </button>
        )}
        {playing && <button onClick={() => setPlaying(false)} className="absolute inset-0 z-40 bg-transparent" />}
      </div>

      <div className="flex items-center justify-between mt-3 text-[11.5px] text-[var(--muted)]">
        <span>1080×1920 · 9:16 vertical</span>
        <span>0:{String(Math.floor(prog * 42)).padStart(2, "0")} / 0:42</span>
      </div>
    </div>
  );
}
