import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Onboarding from "./Onboarding.jsx";

export default function Layout() {
  const [onboard, setOnboard] = useState(true);
  const navigate = useNavigate();

  // One-click demo: jump to the create flow with a flag the page reads.
  const runDemo = () => {
    setOnboard(false);
    navigate("/app/create", { state: { demo: Date.now() } });
  };

  return (
    <div className="relative min-h-screen text-[var(--ink)] bg-[var(--paper)]">
      <div className="flex flex-col md:flex-row md:h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0 md:overflow-y-auto">
          <Header />
          <Outlet />
        </main>
      </div>
      {onboard && <Onboarding onClose={() => setOnboard(false)} onDemo={runDemo} />}
    </div>
  );
}
