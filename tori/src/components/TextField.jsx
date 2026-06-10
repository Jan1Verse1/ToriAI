export default function TextField({ label, icon: Icon, rightSlot, className = "", ...props }) {
  return (
    <label className="block mb-4">
      {label && <span className="block text-[12.5px] font-semibold text-[var(--ink-soft)] mb-1.5">{label}</span>}
      <span className="relative flex items-center">
        {Icon && <Icon size={16} className="absolute left-3 text-[var(--muted)] pointer-events-none" />}
        <input
          className={
            "w-full bg-[var(--surface-2)] border border-[var(--line)] rounded-xl py-2.5 text-sm transition " +
            "focus:outline-none focus:border-[var(--clay)] focus:bg-white focus:ring-2 focus:ring-[var(--clay-soft)] " +
            (Icon ? "pl-9 " : "pl-3.5 ") +
            (rightSlot ? "pr-10 " : "pr-3.5 ") +
            className
          }
          {...props}
        />
        {rightSlot}
      </span>
    </label>
  );
}
