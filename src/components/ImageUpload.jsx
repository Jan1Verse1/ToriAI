import { Image, Upload } from "lucide-react";

export default function ImageUpload({ label = "Logo", image, onChange, shape = "square", hint = "PNG, JPG or SVG" }) {
  const previewClass = shape === "circle" ? "rounded-full" : "rounded-lg";
  return (
    <label className="block mb-4 cursor-pointer">
      <span className="block text-[12.5px] font-semibold text-[var(--ink-soft)] mb-1.5">{label}</span>
      <span className="flex items-center gap-3.5 bg-[var(--surface-2)] border border-dashed border-[var(--line-strong)] rounded-xl py-3 px-3.5 hover:border-[var(--clay)] transition">
        <span className={`w-12 h-12 ${previewClass} bg-[var(--surface)] border border-[var(--line)] grid place-items-center overflow-hidden shrink-0`}>
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            <Image size={18} className="text-[var(--muted)]" />
          )}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--clay-700)]">
          <Upload size={15} /> {image ? "Change" : "Upload"}
        </span>
        <span className="ml-auto text-[12px] text-[var(--muted)] hidden sm:inline shrink-0">{hint}</span>
      </span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(URL.createObjectURL(file));
        }}
      />
    </label>
  );
}
