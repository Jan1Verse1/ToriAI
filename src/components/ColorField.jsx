export default function ColorField({ label, value, onChange }) {
  return (
    <label className="block mb-4">
      <span className="block text-[12.5px] font-semibold text-[var(--ink-soft)] mb-1.5">{label}</span>
      <span className="flex items-center gap-2.5 bg-[var(--surface-2)] border border-[var(--line)] rounded-xl py-2 px-2.5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-lg border border-[var(--line)] cursor-pointer bg-transparent p-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm font-mono uppercase focus:outline-none"
        />
      </span>
    </label>
  );
}
