import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const TopBar = ({ role, setOpenSidebar }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("role") === "student"
    ? localStorage.getItem("user_email") || "Étudiant"
    : localStorage.getItem("role") === "company"
    ? localStorage.getItem("user_email") || "Entreprise"
    : localStorage.getItem("user_email") || "Admin";

  const initial = email.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) await api.post("/accounts/logout/", { refresh });
    } catch (_) {}
    localStorage.clear();
    navigate("/login");
  };

  const roleLabel = {
    student: "Étudiant",
    company: "Entreprise",
    admin: "Administrateur",
  }[localStorage.getItem("role")] || role;

  return (
    <div className="h-15 bg-white/10 border-gray-500/40 rounded-l rounded-2xl border-b flex items-center justify-between px-6 backdrop-blur-md sticky top-0 z-40">

      {/* LEFT — mobile menu button */}
      <div className="flex items-center gap-3 lg:hidden">
        <button onClick={() => setOpenSidebar(true)}
          className="text-gray-800 rounded-[20%] px-3 py-2 hover:bg-gray-400 hover:text-white font-bold">
          ☰
        </button>
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13L3.74 11.5 12 7l8.26 4.5L12 16z" />
          </svg>
        </div>
      </div>

      <div className="hidden lg:block" />

      {/* RIGHT — user menu */}
      <div className="relative flex items-center gap-3 rounded-2xl pl-2 hover:bg-gray-200/80 transition cursor-pointer"
        onClick={() => setOpen(!open)}>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-700 font-medium">{email}</span>
          <span className="text-xs text-gray-400">{roleLabel}</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {initial}
        </div>

        {open && (
          <div className="absolute right-0 top-12 w-52 p-4 bg-white border border-gray-200 rounded-lg shadow-md z-50">
            <p className="text-sm font-semibold text-gray-800">{email}</p>
            <p className="text-xs text-gray-400 mb-3">{roleLabel}</p>
            <hr className="mb-3 border-gray-200" />
            <button onClick={handleLogout}
              className="w-full py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white rounded-md transition">
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
