import { useEffect, useState } from "react";
import api from "../../api/axios";
import Toast from "../../components/Toast";

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

const CandidateursEtudiant = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/applications/my/");
      setApplications(res.data.results ?? res.data);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async () => {
    try {
      await api.delete(`/applications/${cancelTarget.id}/`);
      setToast({ message: "Candidature annulée.", type: "success" });
      setCancelTarget(null);
      load();
    } catch (_) {
      setToast({ message: "Impossible d'annuler cette candidature.", type: "error" });
      setCancelTarget(null);
    }
  };

  const filters = [
    { key: "all",       label: `Toutes (${applications.length})` },
    { key: "pending",   label: `En attente (${applications.filter(a => a.status === "pending").length})` },
    { key: "reviewing", label: `En révision (${applications.filter(a => a.status === "reviewing").length})` },
    { key: "accepted",  label: `Acceptées (${applications.filter(a => a.status === "accepted").length})` },
    { key: "rejected",  label: `Refusées (${applications.filter(a => a.status === "rejected").length})` },
  ];

  const filtered = activeFilter === "all" ? applications : applications.filter(a => a.status === activeFilter);

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <h1 className="text-2xl font-bold text-slate-800">Mes candidatures</h1>
        <p className="text-gray-500 text-sm">Suivez l'avancement de vos candidatures aux stages.</p>
      </header>

      {/* FILTER TABS */}
      <section className="px-7 pb-6">
        <div className="bg-gray-200/30 w-fit rounded-lg px-1">
          <ul className="flex gap-2 whitespace-nowrap overflow-x-auto">
            {filters.map((f) => (
              <li key={f.key}>
                <button onClick={() => setActiveFilter(f.key)}
                  className={`font-semibold rounded-lg my-1 px-3 py-1 text-sm transition
                    ${activeFilter === f.key ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LIST */}
      <section className="px-7 pb-8">
        {loading ? <p className="text-gray-400">Chargement...</p> :
          filtered.length === 0 ? <p className="text-gray-400">Aucune candidature.</p> : (
            <div className="flex flex-col gap-3">
              {filtered.map((a) => (
                <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex justify-between items-center hover:shadow-md transition">
                  <div className="flex gap-3 items-start">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200/70 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-600 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{a.offer_title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Candidaté le {new Date(a.applied_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md border ${statusStyles[a.status]}`}>
                      {statusText[a.status]}
                    </span>
                    {(a.status === "pending" || a.status === "reviewing") && (
                      <button onClick={() => setCancelTarget(a)}
                        className="text-xs text-red-500 hover:text-red-700 transition">
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </section>

      {/* CANCEL CONFIRM */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Annuler la candidature</h2>
            <p className="text-gray-600 text-sm mb-5">
              Voulez-vous annuler votre candidature pour <strong>{cancelTarget.offer_title}</strong> ?
            </p>
            <div className="flex gap-3">
              <button onClick={handleCancel}
                className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition">
                Confirmer
              </button>
              <button onClick={() => setCancelTarget(null)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
                Garder
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CandidateursEtudiant;
