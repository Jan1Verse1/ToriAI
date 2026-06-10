import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import GhostButton from "./GhostButton.jsx";

export function StatusBar({ msg }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 my-1 rounded-xl bg-[var(--clay-tint)] border border-[var(--clay-soft)]">
      <Loader2 size={18} className="animate-spin text-[var(--clay)]" />
      <div>
        <div className="text-[13.5px] font-semibold text-[var(--clay-700)]">{msg}</div>
        <div className="text-xs text-[var(--muted)]">This usually takes a few seconds</div>
      </div>
    </div>
  );
}

export function ErrorBox({ title, msg, onRetry, onAlt, altLabel }) {
  return (
    <div className="flex gap-3 px-4 py-3.5 my-1 rounded-xl bg-[#FCEEEA] border border-[#F1C9BC]">
      <AlertCircle size={19} className="text-[var(--clay-700)] shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="text-[13.5px] font-semibold text-[var(--clay-700)]">{title}</div>
        <div className="text-[12.5px] text-[var(--ink-soft)] mt-0.5 leading-relaxed">{msg}</div>
        <div className="flex gap-2 mt-2.5">
          <GhostButton onClick={onRetry}><RefreshCw size={13} /> Try again</GhostButton>
          {onAlt && <GhostButton onClick={onAlt}>{altLabel}</GhostButton>}
        </div>
      </div>
    </div>
  );
}
