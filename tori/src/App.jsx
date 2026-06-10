import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MarketingLayout from "./components/MarketingLayout.jsx";
import Layout from "./components/Layout.jsx";
import Landing from "./pages/Landing.jsx";
import Contact from "./pages/Contact.jsx";
import FAQs from "./pages/FAQs.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Create from "./pages/Create.jsx";
import Library from "./pages/Library.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public marketing pages */}
        <Route element={<MarketingLayout />}>
          <Route index element={<Landing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faqs" element={<FAQs />} />
        </Route>

        {/* auth pages (own full-screen layout) */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/* the product (after onboarding) */}
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<Create />} />
          <Route path="library" element={<Library />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
