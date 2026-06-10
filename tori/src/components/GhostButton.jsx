export default function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-semibold " +
        "border border-[var(--line-strong)] text-[var(--ink-soft)] bg-[var(--surface)] transition " +
        "hover:bg-[var(--surface-2)] hover:border-[var(--clay)] hover:text-[var(--clay-700)] " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
