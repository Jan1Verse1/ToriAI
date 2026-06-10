import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Plus, Library, Newspaper, Settings, LogOut } from "lucide-react";
import { USER, initials } from "../data.js";

const NAV = [
  { to: "/app", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/create", label: "Create", icon: Plus },
  { to: "/app/library", label: "Library", icon: Library },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="relative overflow-hidden w-full md:w-[230px] md:shrink-0 flex md:flex-col items-center md:items-stretch gap-1 md:gap-0 p-2.5 md:p-4 overflow-x-auto text-white"
      style={{ background: "linear-gradient(150deg,#9B3A1F,#BC4A2A 48%,#7d2f18)" }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 15%, #E8A87C55, transparent 45%), radial-gradient(circle at 10% 90%, #2E6B4E55, transparent 45%)",
        }}
      />

      {/* brand */}
      <NavLink to="/app" end className="relative flex items-center gap-2.5 px-2 md:pb-4 shrink-0">
        <div className="w-[34px] h-[34px] shrink-0 rounded-[9px] bg-white/15 backdrop-blur grid place-items-center text-white">
          <Newspaper size={19} />
        </div>
        <div className="hidden md:block">
          <div className="font-news font-bold text-lg leading-tight">ToriAI</div>
          <div className="text-[10.5px] text-white/60 tracking-widest uppercase -mt-0.5">Newsroom Engine</div>
        </div>
      </NavLink>

      {/* nav */}
      <nav className="relative flex md:flex-col gap-0.5 md:mt-1">
        {NAV.map((n) => {
          const Icon = n.icon;
          return (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                "flex items-center gap-2.5 px-2.5 py-2.5 rounded-[9px] text-sm font-medium transition whitespace-nowrap " +
                (isActive
                  ? "bg-white/15 text-white font-semibold"
                  : "text-white/75 hover:bg-white/10 hover:text-white")
              }
            >
              <Icon size={18} /> <span className="hidden md:inline">{n.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* user */}
      <div className="relative flex items-center gap-1.5 md:gap-2 ml-auto md:ml-0 md:mt-auto shrink-0">
        <NavLink
          to="/app/settings"
          className="flex items-center gap-2.5 min-w-0 px-1.5 py-1.5 -mx-1.5 rounded-[9px] hover:bg-white/10 transition"
        >
          <span className="w-9 h-9 shrink-0 rounded-full bg-white/15 backdrop-blur grid place-items-center font-news font-bold text-[12.5px]">
            {initials(USER.name)}
          </span>
          <span className="hidden md:block min-w-0">
            <span className="block text-[13.5px] font-semibold leading-tight truncate">{USER.name}</span>
            <span className="block text-[11px] text-white/60 leading-tight truncate">{USER.role}</span>
          </span>
        </NavLink>
        <button
          onClick={() => navigate("/signin")}
          title="Log out"
          className="shrink-0 w-9 h-9 grid place-items-center rounded-[9px] text-white/70 hover:bg-white/10 hover:text-white transition"
        >
          <LogOut size={17} />
        </button>
      </div>
    </aside>
  );
}
