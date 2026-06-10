import { useState } from "react";
import { User, Building2, CreditCard, Mail, Lock, Quote, Eye, EyeOff, Check } from "lucide-react";
import { USER, NEWSROOM, initials } from "../data.js";
import TextField from "../components/TextField.jsx";
import ColorField from "../components/ColorField.jsx";
import ImageUpload from "../components/ImageUpload.jsx";
import Button from "../components/Button.jsx";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "newsroom", label: "Newsroom", icon: Building2 },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

const PANEL = "bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 animate-fade-up";
const TITLE = "font-news text-[18px] font-semibold tracking-tight";
const SUB = "text-[13px] text-[var(--muted)] mt-0.5 mb-5";

const PLANS = [
  { id: "starter", name: "Starter", price: "$19", features: ["20 stories / month", "2 languages", "Audio only"] },
  { id: "growth", name: "Growth", price: "$49", features: ["Unlimited stories", "5 languages", "Audio + video", "Priority support"] },
  { id: "studio", name: "Studio", price: "$99", features: ["Everything in Growth", "Custom voices", "Team seats", "Dedicated support"] },
];

function ProfileTab() {
  const [profile, setProfile] = useState({ name: USER.name, email: USER.email, role: USER.role, avatar: USER.avatar });
  const [pwd, setPwd] = useState({ current: "", next: "" });
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-5">
      <div className={PANEL}>
        <h2 className={TITLE}>Your profile</h2>
        <p className={SUB}>This is how you appear across ToriAI.</p>

        <div className="flex items-center gap-4 mb-5">
          <span className="w-16 h-16 shrink-0 rounded-full bg-[var(--clay-tint)] text-[var(--clay-700)] grid place-items-center font-news font-bold text-xl overflow-hidden">
            {profile.avatar ? <img src={profile.avatar} alt="" className="w-full h-full object-cover" /> : initials(profile.name)}
          </span>
          <ImageUpload label="Profile photo" image={profile.avatar} shape="circle" hint="JPG or PNG" onChange={(avatar) => setProfile((p) => ({ ...p, avatar }))} />
        </div>

        <TextField label="Full name" icon={User} value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
        <TextField label="Work email" type="email" icon={Mail} value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
        <TextField label="Role" icon={User} value={profile.role} disabled />

        <Button>Save profile</Button>
      </div>

      <div className={PANEL}>
        <h2 className={TITLE}>Password</h2>
        <p className={SUB}>Update the password used to sign in.</p>

        <TextField
          label="Current password"
          type={show ? "text" : "password"}
          icon={Lock}
          value={pwd.current}
          onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
          rightSlot={
            <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 text-[var(--muted)] hover:text-[var(--ink)]">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        <TextField label="New password" type={show ? "text" : "password"} icon={Lock} minLength={8} placeholder="At least 8 characters" value={pwd.next} onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))} />

        <Button>Update password</Button>
      </div>
    </div>
  );
}

function NewsroomTab() {
  const [newsroom, setNewsroom] = useState(NEWSROOM);

  return (
    <div className={PANEL}>
      <h2 className={TITLE}>Newsroom branding</h2>
      <p className={SUB}>This name, logo and colour palette are used across your dashboard, reports and shared clips.</p>

      <TextField label="Newsroom name" icon={Building2} value={newsroom.name} onChange={(e) => setNewsroom((n) => ({ ...n, name: e.target.value }))} />
      <TextField label="Slogan / tagline" icon={Quote} value={newsroom.slogan} onChange={(e) => setNewsroom((n) => ({ ...n, slogan: e.target.value }))} />
      <ImageUpload label="Newsroom logo" image={newsroom.logo} onChange={(logo) => setNewsroom((n) => ({ ...n, logo }))} />

      <div className="grid grid-cols-2 gap-3">
        <ColorField label="Primary colour" value={newsroom.primaryColor} onChange={(v) => setNewsroom((n) => ({ ...n, primaryColor: v }))} />
        <ColorField label="Secondary colour" value={newsroom.secondaryColor} onChange={(v) => setNewsroom((n) => ({ ...n, secondaryColor: v }))} />
      </div>

      <Button>Save newsroom</Button>
    </div>
  );
}

function SubscriptionTab() {
  const current = "growth";

  return (
    <div className="space-y-5">
      <div className={PANEL}>
        <h2 className={TITLE}>Current plan</h2>
        <p className={SUB}>You're on the Growth plan, billed monthly.</p>

        <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3.5 rounded-xl bg-[var(--clay-tint)] border border-[var(--clay-soft)]">
          <div>
            <div className="font-news text-lg font-semibold">Growth — $49/mo</div>
            <div className="text-[12.5px] text-[var(--ink-soft)] mt-0.5">Renews on 1 July 2026</div>
          </div>
          <button className="px-4 py-2 rounded-xl border border-[var(--line-strong)] text-sm font-semibold text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition">
            Manage billing
          </button>
        </div>
      </div>

      <div className={PANEL}>
        <h2 className={TITLE}>Plans</h2>
        <p className={SUB}>Switch plans at any time — changes apply from your next billing cycle.</p>

        <div className="grid sm:grid-cols-3 gap-3.5">
          {PLANS.map((p) => {
            const active = p.id === current;
            return (
              <div key={p.id} className={"rounded-xl border p-4 flex flex-col " + (active ? "border-[var(--clay)] bg-[var(--clay-tint)]" : "border-[var(--line)] bg-[var(--surface)]")}>
                <div className="font-news text-base font-semibold">{p.name}</div>
                <div className="text-[22px] font-news font-semibold tracking-tight mt-1">{p.price}<span className="text-[12.5px] text-[var(--muted)] font-sans font-normal">/mo</span></div>
                <ul className="mt-3 space-y-2 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] text-[var(--ink-soft)]">
                      <Check size={13} className="mt-0.5 shrink-0 text-[var(--green)]" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  disabled={active}
                  className={"mt-4 w-full px-4 py-2 rounded-xl text-sm font-semibold transition " + (active ? "bg-[var(--clay)] text-white cursor-default" : "border border-[var(--line-strong)] text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface-2)]")}
                >
                  {active ? "Current plan" : "Choose plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="p-4 md:p-6 max-w-2xl animate-fade-up">
      <div className="flex gap-1.5 bg-[var(--surface-2)] border border-[var(--line)] rounded-[12px] p-1.5 mb-5 w-full sm:w-fit">
        {TABS.map((t) => {
          const Icon = t.icon;
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={"flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-[9px] text-[13px] font-semibold transition " + (on ? "bg-[var(--surface)] text-[var(--clay-700)] shadow-[0_1px_4px_-1px_rgba(40,30,15,0.18)]" : "text-[var(--ink-soft)] hover:text-[var(--ink)]")}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "profile" && <ProfileTab />}
      {tab === "newsroom" && <NewsroomTab />}
      {tab === "subscription" && <SubscriptionTab />}
    </div>
  );
}
