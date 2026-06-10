import { RefreshCw, Copy } from "lucide-react";
import GhostButton from "./GhostButton.jsx";

export default function StoryCard({ story, onReuse }) {
  const r = story;
  const tag =
    r.st === "Published"
      ? { background: "var(--green-soft)", color: "var(--green)" }
      : { background: "var(--gold-soft)", color: "var(--gold)" };
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 mb-2.5 bg-[var(--surface)] border border-[var(--line)] rounded-xl transition hover:border-[var(--line-strong)] hover:shadow-[0_4px_16px_-10px_rgba(40,30,15,0.22)]">
      <div
        className="w-11 h-11 shrink-0 rounded-[10px] grid place-items-center font-news font-semibold text-lg"
        style={{ background: r.c + "1A", color: r.c }}
      >
        {r.t[0]}
      </div>
      <div className="min-w-0">
        <div className="font-news font-semibold text-[15.5px] tracking-tight">{r.t}</div>
        <div className="text-[11.5px] text-[var(--muted)] mt-0.5 flex items-center gap-2.5 flex-wrap">
          <span>{r.langs.join(" · ")}</span><span>·</span>
          <span>{r.type}</span><span>·</span>
          <span>{r.time}</span>
          <span className="text-[10.5px] px-2 py-0.5 rounded-full font-semibold" style={tag}>{r.st}</span>
        </div>
      </div>
      <div className="ml-auto flex gap-1.5 shrink-0">
        <GhostButton onClick={onReuse}><RefreshCw size={13} /> Re-use</GhostButton>
        <GhostButton onClick={onReuse}><Copy size={13} /> Duplicate</GhostButton>
      </div>
    </div>
  );
}
