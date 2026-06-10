import { Fragment } from "react";
import { Check } from "lucide-react";

export default function Stepper({ steps, current, done, onJump }) {
  return (
    <div className="flex items-center flex-wrap mb-6">
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && (
            <div
              className="w-[30px] h-[1.5px] mx-1.5 transition-colors"
              style={{ background: done[i - 1] ? "var(--green)" : "var(--clay)" }}
            />
          )}
          <button
            className="flex items-center gap-2.5"
            onClick={() => { if (done[i] || i <= current) onJump(i); }}
          >
            <span
              className="w-[27px] h-[27px] rounded-full grid place-items-center text-[12.5px] font-semibold transition-colors"
              style={
                done[i]
                  ? { background: "var(--green)", color: "#fff" }
                  : current === i
                  ? { background: "var(--clay)", color: "#fff", boxShadow: "0 0 0 4px var(--clay-soft)" }
                  : { background: "var(--clay)", color: "#fff" }
              }
            >
              {done[i] ? <Check size={14} /> : i + 1}
            </span>
            <span
              className="text-[12.5px] hidden sm:inline"
              style={{
                color: current === i || done[i] ? "var(--ink)" : "var(--muted)",
                fontWeight: current === i || done[i] ? 600 : 500,
              }}
            >
              {s}
            </span>
          </button>
        </Fragment>
      ))}
    </div>
  );
}
