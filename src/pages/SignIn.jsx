import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import TextField from "../components/TextField.jsx";
// import GoogleButton from "../components/GoogleButton.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Mock auth — replace with a real request, then navigate into the product.
  const submit = (e) => { e.preventDefault(); navigate("/app"); };

  return (
    <AuthLayout heading="Welcome back" sub="Sign in to keep your newsroom on air.">
      {/* <GoogleButton onClick={() => navigate("/app")} /> */}

      {/* <div className="flex items-center gap-3 my-5 text-[12px] text-[var(--muted)]">
        <span className="flex-1 h-px bg-[var(--line)]" /> or <span className="flex-1 h-px bg-[var(--line)]" />
      </div> */}

      <form onSubmit={submit}>
        <TextField label="Work email" type="email" icon={Mail} placeholder="you@newsroom.com" required />
        <TextField
          label="Password"
          type={show ? "text" : "password"}
          icon={Lock}
          placeholder="Your password"
          required
          rightSlot={
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute  right-3 text-[var(--muted)] hover:text-[var(--ink)]">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <div className="flex items-center justify-between -mt-1 mb-5 text-[13px]">
          <label className="flex items-center gap-2 text-[var(--ink-soft)] cursor-pointer">
            <input type="checkbox" className="accent-[var(--clay)] w-4 h-4" /> Remember me
          </label>
          <Link to="/contact" className="font-semibold text-[var(--clay-700)]">Forgot password?</Link>
        </div>

        <button type="submit" className="w-full px-5 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm shadow-[0_2px_0_var(--clay-700)] hover:bg-[var(--clay-700)] hover:-translate-y-px transition">
          Sign in
        </button>
      </form>

      <p className="text-sm text-[var(--ink-soft)] text-center mt-6">
        New to ToriAI? <Link to="/signup" className="font-semibold text-[var(--clay-700)]">Create an account</Link>
      </p>
    </AuthLayout>
  );
}
