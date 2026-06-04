import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const statusStyles = {
  pending:  "bg-orange-100 text-orange-600 border border-orange-300",
  approved: "bg-green-100 text-green-600 border border-green-300",
  rejected: "bg-red-100 text-red-600 border border-red-300",
  expired:  "bg-gray-100 text-gray-500 border border-gray-300",
};
const statusText = {
  pending: "En attente", approved: "Publiée", rejected: "Refusée", expired: "Expirée",
};
const appStatusStyles = {
  pending:   "bg-orange-100 text-orange-600 border border-orange-300",
  reviewing: "bg-blue-100 text-blue-600 border border-blue-300",
  accepted:  "bg-green-100 text-green-600 border border-green-300",
  rejected:  "bg-red-100 text-red-600 border border-red-300",
  cancelled: "bg-gray-100 text-gray-500 border border-gray-300",
};
const appStatusText = {
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

const DashboardEntreprise = () => {
  const [offers, setOffers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [offRes, appRes] = await Promise.all([
          api.get("/offers/my/"),
          api.get("/applications/company/"),
        ]);
        setOffers(offRes.data.results ?? offRes.data);
        setApplications(appRes.data.results ?? appRes.data);
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, []);

  const count = (arr, key, val) => arr.filter(i => i[key] === val).length;

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
            <p className="text-gray-500 text-sm">Pilotez vos offres et candidatures.</p>
          </div>
          <Link to="/entreprise/CreateOffre"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md">
            + Nouvelle offre
          </Link>
        </div>
      </header>

      {/* STAT CARDS */}
      <section className="px-7 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="OFFRES ACTIVES"
            value={loading ? "..." : count(offers, "status", "approved")}
            color="bg-blue-100 text-blue-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>}
          />
          <StatCard
            label="OFFRES EN ATTENTE"
            value={loading ? "..." : count(offers, "status", "pending")}
            color="bg-orange-100 text-orange-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
          <StatCard
            label="CANDIDATURES ACCEPTÉES"
            value={loading ? "..." : count(applications, "status", "accepted")}
            color="bg-green-100 text-green-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>}
          />
          <StatCard
            label="CANDIDATURES EN ATTENTE"
            value={loading ? "..." : count(applications, "status", "pending")}
            color="bg-orange-100 text-orange-600"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>}
          />
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="w-full px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent offers */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-slate-800">Offres récentes</h2>
              <Link to="/entreprise/offres" className="text-sm text-blue-600 hover:underline">Tout voir →</Link>
            </div>
            {loading ? <p className="text-gray-400 text-sm">Chargement...</p> :
              offers.slice(0, 5).map((o) => (
                <div key={o.id} className="border-b border-gray-100 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-800">{o.title}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${statusStyles[o.status]}`}>
                      {statusText[o.status]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{o.city} · {applications.filter(a => a.offer === o.id).length} candidature(s)</span>
                </div>
              ))
            }
          </div>

          {/* Recent applications */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Dernières candidatures</h2>
            {loading ? <p className="text-gray-400 text-sm">Chargement...</p> :
              applications.slice(0, 5).map((a) => (
                <div key={a.id} className="border-b border-gray-100 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-800">{a.student_name}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${appStatusStyles[a.status]}`}>
                      {appStatusText[a.status]}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{a.offer_title}</span>
                </div>
              ))
            }
          </div>

        </div>
      </section>
    </div>
  );
};

export default DashboardEntreprise;
