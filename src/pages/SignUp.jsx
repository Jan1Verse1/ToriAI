import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Building2, Eye, EyeOff, Quote, ChevronLeft, Check } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import TextField from "../components/TextField.jsx";
import Stepper from "../components/Stepper.jsx";
import ColorField from "../components/ColorField.jsx";
import ImageUpload from "../components/ImageUpload.jsx";
import { PLANS } from "../data.js";

const STEPS = ["Your account", "Your newsroom", "Your plan"];

const HEADINGS = [
  { heading: "Create your account", sub: "Start free — your first multilingual story is minutes away." },
  { heading: "Set up your newsroom", sub: "We'll use this to brand your dashboard with your name, logo and colours." },
  { heading: "Choose your plan", sub: "Start on any plan — you can change it any time from settings." },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);

  const [account, setAccount] = useState({ name: "", email: "", org: "", password: "", agree: false });
  const [newsroom, setNewsroom] = useState({
    name: "",
    slogan: "",
    logo: "",
    primaryColor: "#BC4A2A",
    secondaryColor: "#2E6B4E",
  });
  const [plan, setPlan] = useState("growth");

  const submitAccount = (e) => {
    e.preventDefault();
    setNewsroom((n) => ({ ...n, name: n.name || account.org }));
    setStep(1);
  };

  const submitNewsroom = (e) => {
    e.preventDefault();
    setStep(2);
  };

  // Mock sign-up — replace with a real request, then navigate into the product.
  const submitPlan = (e) => {
    e.preventDefault();
    navigate("/app");
  };

  const { heading, sub } = HEADINGS[step];

  return (
    <AuthLayout heading={heading} sub={sub} wide>
      <Stepper steps={STEPS} current={step} done={[step > 0, step > 1, false]} onJump={(i) => { if (i <= step) setStep(i); }} />

      {step === 0 ? (
        <form onSubmit={submitAccount}>
          <TextField
            label="Full name"
            icon={User}
            placeholder="Amara Okeke"
            required
            value={account.name}
            onChange={(e) => setAccount((a) => ({ ...a, name: e.target.value }))}
          />
          <TextField
            label="Work email"
            type="email"
            icon={Mail}
            placeholder="you@newsroom.com"
            required
            value={account.email}
            onChange={(e) => setAccount((a) => ({ ...a, email: e.target.value }))}
          />
          <TextField
            label="Newsroom / organisation"
            icon={Building2}
            placeholder="Your outlet"
            value={account.org}
            onChange={(e) => setAccount((a) => ({ ...a, org: e.target.value }))}
          />
          <TextField
            label="Password"
            type={show ? "text" : "password"}
            icon={Lock}
            placeholder="At least 8 characters"
            minLength={8}
            required
            value={account.password}
            onChange={(e) => setAccount((a) => ({ ...a, password: e.target.value }))}
            rightSlot={
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 text-[var(--muted)] hover:text-[var(--ink)]">
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <label className="flex items-start gap-2.5 mb-5 text-[13px] text-[var(--ink-soft)] cursor-pointer">
            <input
              type="checkbox"
              checked={account.agree}
              onChange={(e) => setAccount((a) => ({ ...a, agree: e.target.checked }))}
              className="accent-[var(--clay)] w-4 h-4 mt-0.5"
              required
            />
            <span>I agree to the <Link to="/" className="font-semibold text-[var(--clay-700)]">Terms</Link> and <Link to="/" className="font-semibold text-[var(--clay-700)]">Privacy Policy</Link>.</span>
          </label>

          <button type="submit" disabled={!account.agree} className="w-full px-5 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px transition disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
            Continue
          </button>
        </form>
      ) : step === 1 ? (
        <form onSubmit={submitNewsroom}>
          <TextField
            label="Newsroom name"
            icon={Building2}
            placeholder="Your outlet"
            required
            value={newsroom.name}
            onChange={(e) => setNewsroom((n) => ({ ...n, name: e.target.value }))}
          />
          <TextField
            label="Slogan / tagline"
            icon={Quote}
            placeholder="The news you can trust"
            value={newsroom.slogan}
            onChange={(e) => setNewsroom((n) => ({ ...n, slogan: e.target.value }))}
          />
          <ImageUpload label="Newsroom logo" image={newsroom.logo} onChange={(logo) => setNewsroom((n) => ({ ...n, logo }))} />

          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Primary colour" value={newsroom.primaryColor} onChange={(v) => setNewsroom((n) => ({ ...n, primaryColor: v }))} />
            <ColorField label="Secondary colour" value={newsroom.secondaryColor} onChange={(v) => setNewsroom((n) => ({ ...n, secondaryColor: v }))} />
          </div>

          <p className="text-[12.5px] text-[var(--muted)] mb-5 -mt-1">
            We'll use these colours to brand your dashboard, reports and shared clips.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="px-5 py-3 rounded-xl border border-[var(--line-strong)] text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-2)] transition flex items-center gap-1.5"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button type="submit" className="flex-1 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px transition">
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={submitPlan}>
          {PLANS.map((p) => {
            const selected = plan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id)}
                className={
                  "w-full text-left flex items-start gap-3 p-3.5 rounded-[13px] border transition mb-2.5 " +
                  (selected ? "border-[var(--clay)] bg-[var(--clay-tint)]" : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]")
                }
                style={{ borderWidth: 1.5 }}
              >
                <span className="flex-1 min-w-0">
                  <span className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-news font-semibold text-[15px]">{p.name}</span>
                    <span className="text-[13px] text-[var(--muted)]">{p.price}/mo</span>
                    {p.id === "growth" && (
                      <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[var(--green-soft)] text-[var(--green)]">Recommended</span>
                    )}
                  </span>
                  <span className="block text-[12px] text-[var(--ink-soft)] mt-1">{p.features.join(" · ")}</span>
                </span>
                <span className={"mt-0.5 w-5 h-5 shrink-0 rounded-full grid place-items-center border " + (selected ? "bg-[var(--clay)] border-[var(--clay)] text-white" : "bg-[var(--surface)] border-[var(--line-strong)]")}>
                  {selected && <Check size={12} />}
                </span>
              </button>
            );
          })}

          <p className="text-[12.5px] text-[var(--muted)] mb-5 mt-1">
            You won't be charged today — change or cancel your plan any time from settings.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-[var(--line-strong)] text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface-2)] transition flex items-center gap-1.5"
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button type="submit" className="flex-1 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px transition">
              Create account
            </button>
          </div>
        </form>
      )}

      <p className="text-sm text-[var(--ink-soft)] text-center mt-6">
        Already have an account? <Link to="/signin" className="font-semibold text-[var(--clay-700)]">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
