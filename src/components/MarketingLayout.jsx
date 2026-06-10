import { Outlet } from "react-router-dom";
import MarketingNav from "./MarketingNav.jsx";
import Footer from "./Footer.jsx";

export default function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <MarketingNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
