import { useNavigate } from "react-router-dom";
import { Newspaper, Languages, Headphones, Film, ArrowRight } from "lucide-react";
import { LANG_USAGE, RECENT } from "../data.js";
import StatCard from "../components/StatCard.jsx";
import StoryCard from "../components/StoryCard.jsx";

const STATS = [
  { icon: Newspaper, value: "38", label: "Stories this week", delta: "+12 vs last week", bg: "#FBF1EB", fg: "#BC4A2A" },
  { icon: Languages, value: "5", label: "Languages used", delta: "All channels live", bg: "#E2EFE7", fg: "#2E6B4E" },
  { icon: Headphones, value: "94", label: "Audio generated", delta: "+27 this week", bg: "#F6ECD3", fg: "#BE8E2C" },
  { icon: Film, value: "61", label: "Videos generated", delta: "+18 this week", bg: "#E6EEF2", fg: "#3A6276" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const goCreate = () => navigate("/app/create");

  return (
    <div className="p-4 md:p-6 animate-fade-up">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>

      <div className="flex items-center mt-6 mb-3.5">
        <h2 className="text-[15px] font-semibold">Languages used this week</h2>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {LANG_USAGE.map((l) => (
          <div key={l.id} className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--surface)] border border-[var(--line)] text-[13px] font-medium">
            <span className="w-4 h-4 rounded-[5px]" style={{ background: l.color }} />
            {l.name} <span className="text-[11.5px] text-[var(--muted)]">{l.pct}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-6 mb-3.5">
        <h2 className="text-[15px] font-semibold">Recent stories</h2>
        <button onClick={goCreate} className="ml-auto text-[12.5px] font-semibold text-[var(--clay-700)] flex items-center gap-1">
          New story <ArrowRight size={13} />
        </button>
      </div>
      {RECENT.map((r, i) => (
        <StoryCard key={i} story={r} onReuse={goCreate} />
      ))}
    </div>
  );
}
