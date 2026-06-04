import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const statusStyles = {
  pending:   "bg-orange-100 text-orange-600 border border-orange-300",
  reviewing: "bg-blue-100 text-blue-600 border border-blue-300",
  accepted:  "bg-green-100 text-green-600 border border-green-300",
  rejected:  "bg-red-100 text-red-600 border border-red-300",
  cancelled: "bg-gray-100 text-gray-500 border border-gray-300",
};
const statusText = {
  pending: "En attente", reviewing: "En révision", accepted: "Accepté", rejected: "Refusé", cancelled: "Annulé",
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl p-4 hover:drop-shadow-lg hover:scale-105 transition duration-300">
    <div className={`flex items-center justify-center shrink-0 h-12 w-12 rounded-xl ${color}`}>{icon}</div>
    <div className="flex flex-col ml-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-bold text-2xl">{value ?? "..."}</div>
    </div>
  </div>
);

const DashboardEtudiant = () => {
  const [applications, setApplications] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const firstName = localStorage.getItem("user_email")?.split("@")[0] || "Étudiant";

  useEffect(() => {
    const load = async () => {
      try {
        const [appRes, offRes] = await Promise.all([
          api.get("/applications/my/"),
          api.get("/offers/"),
        ]);
        setApplications(appRes.data.results ?? appRes.data);
        setOffers(offRes.data.results ?? offRes.data);
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, []);

  const count = (arr, key, val) => arr.filter(i => i[key] === val).length;

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <h1 className="text-2xl font-bold text-slate-800">Bonjour, {firstName}</h1>
        <p className="text-gray-500 text-sm">Voici un aperçu de votre recherche de stage.</p>
      </header>

      {/* STAT CARDS */}
      <section className="px-7 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="CANDIDATURES" value={loading ? "..." : applications.length} color="bg-blue-100 text-blue-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" /></svg>}
          />
          <StatCard label="EN ATTENTE" value={loading ? "..." : count(applications, "status", "pending")} color="bg-orange-100 text-orange-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
          <StatCard label="ACCEPTÉES" value={loading ? "..." : count(applications, "status", "accepted")} color="bg-green-100 text-green-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
          <StatCard label="REFUSÉES" value={loading ? "..." : count(applications, "status", "rejected")} color="bg-red-100 text-red-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
        </div>
      </section>

      <section className="w-full px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">

          {/* Recent offers */}
          <div className="lg:col-span-6 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800">Stages recommandés</h2>
              <Link to="/etudiant/stages" className="text-sm text-blue-600 hover:underline animate-pulse">Tout voir →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? <p className="text-gray-400 text-sm">Chargement...</p> :
                offers.slice(0, 4).map((o) => (
                  <div key={o.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                    <h3 className="font-semibold text-gray-800 text-sm">{o.title}</h3>
                    <p className="text-xs text-gray-500">{o.company_name}</p>
                    <p className="text-xs text-gray-400 mt-1">{o.city} · {o.duration} {o.duration_unit === "months" ? "mois" : "semaines"}</p>
                    <p className="text-xs text-gray-400">Deadline : {o.application_deadline}</p>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Recent applications */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow p-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Activité récente</h2>
            {loading ? <p className="text-gray-400 text-sm">Chargement...</p> :
              applications.length === 0 ? <p className="text-gray-400 text-sm">Aucune candidature.</p> :
              applications.slice(0, 5).map((a) => (
                <div key={a.id} className="border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{a.offer_title}</p>
                    <p className="text-xs text-gray-400">{new Date(a.applied_at).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${statusStyles[a.status]}`}>
                    {statusText[a.status]}
                  </span>
                </div>
              ))
            }
          </div>

        </div>
      </section>
    </div>
  );
};

export default DashboardEtudiant;
