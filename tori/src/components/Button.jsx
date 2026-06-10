export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0";
  const variants = {
    primary:
      "bg-[var(--clay)] text-white shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px",
    dark:
      "bg-[var(--ink)] text-[var(--paper)] shadow-[0_2px_0_#000] hover:bg-black hover:-translate-y-px",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
