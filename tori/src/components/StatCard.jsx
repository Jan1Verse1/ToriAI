// Reusable usage card. Used on the dashboard, but generic enough for anywhere.
export default function StatCard({ icon: Icon, value, label, delta, bg, fg, style }) {
  return (
    <div
      className="relative overflow-hidden bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 animate-fade-up"
      style={style}
    >
      <div className="w-8 h-8 rounded-lg grid place-items-center mb-3" style={{ background: bg, color: fg }}>
        <Icon size={18} />
      </div>
      <div className="font-news text-[27px] font-semibold tracking-tight leading-none">{value}</div>
      <div className="text-[12.5px] text-[var(--muted)] mt-1">{label}</div>
      {delta && <div className="text-[11.5px] font-semibold text-[var(--green)] mt-1.5">{delta}</div>}
    </div>
  );
}
