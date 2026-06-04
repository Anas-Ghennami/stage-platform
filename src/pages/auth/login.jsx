import COVER_IMAGE from '../../assets/back_sign-in.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/accounts/login/", { email, password });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user_id", res.data.id);
      localStorage.setItem("user_email", res.data.email);

      if (res.data.role === "student") navigate("/etudiant/dashboard");
      else if (res.data.role === "company") navigate("/entreprise/dashboard");
      else if (res.data.role === "admin") navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full hidden md:block">
        <div className="relative w-full h-full">
          <img src={COVER_IMAGE} className="w-full h-full object-cover" alt="cover" />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        <div className="absolute top-15 left-15 flex items-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-gray-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13L3.74 11.5 12 7l8.26 4.5L12 16z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <img src="./src/assets/logowhite2.png" alt="logo" className="w-22" />
            <span className="text-blue-200 text-xs tracking-widest mt-1">STAGE MANAGEMENT PLATFORM</span>
          </div>
        </div>

        <div className="absolute top-1/3 left-15 w-full md:w-150 gap-2">
          <p className="text-white font-semibold text-5xl">
            Trouvez, gérez et validez vos stages au même endroit.
          </p>
        </div>

        <div className="absolute top-5/9 left-15 w-full md:w-120 gap-2">
          <p className="text-white/80 font-medium">
            Une plateforme unique pour les étudiants, les entreprises et l'administration.
          </p>
        </div>

        <div className="absolute top-[90%] left-15">
          <p className="text-blue-200 text-xs tracking-widest mt-1">© 2026 STAGEO · Tous droits réservés</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-full flex justify-center">
        <div className="relative flex flex-col justify-center p-10 md:p-20 bg-white w-8/10 h-full">

          <div className="flex flex-col items-start mb-10">
            <img src="./src/assets/logoblue2.png" alt="logo" className="w-20 md:w-40 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Bon retour</h2>
            <p className="text-gray-600">Connectez-vous pour accéder à votre espace.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full max-w-lg">

              <label className="block text-sm font-medium text-gray-800" htmlFor="email">Email</label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-transparent text-slate-600 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                  placeholder="vous@exemple.com" required />
              </div>

              <label className="block text-sm font-medium text-gray-800" htmlFor="password">Mot de passe</label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m-1.5 0h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 19.5H6a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 016 10.5z" />
                </svg>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 bg-transparent text-slate-600 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                  placeholder="············" required />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition">
                {loading ? "Connexion..." : "Se connecter"}
              </button>

              <p className="pt-5 text-sm self-center">
                Pas encore de compte ?{" "}
                <Link to="/register" className="text-blue-800 hover:underline hover:text-blue-600 transition">
                  Créer un compte
                </Link>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
