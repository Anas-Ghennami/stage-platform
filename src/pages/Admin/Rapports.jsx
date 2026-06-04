import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/Pagination";
import Toast from "../../components/Toast";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  verified: "bg-green-100 text-green-700",
  non_compliant: "bg-red-100 text-red-700",
};
const statusLabels = { pending: "En attente", verified: "Vérifié", non_compliant: "Non conforme" };

const Rapports = () => {
  const [reports, setReports] = useState([]);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const params = filter ? `?status=${filter}&page=${p}` : `?page=${p}`;
      const res = await api.get(`/applications/reports/all/${params}`);
      setReports(res.data.results);
      setCount(res.data.count);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { setPage(1); load(1); }, [filter]);
  useEffect(() => { load(); }, [page]);

  const handleAction = async () => {
    try {
      await api.patch(`/applications/reports/${confirm.id}/`, { status: confirm.status });
      setToast({ message: confirm.status === "verified" ? "Rapport vérifié." : "Rapport marqué non conforme.", type: "success" });
      load();
    } catch (_) {
      setToast({ message: "Erreur lors de la mise à jour.", type: "error" });
    }
    setConfirm(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Rapports de stage</h1>
      <p className="text-gray-500 mb-6">Vérifiez les rapports soumis par les étudiants</p>

      <div className="flex gap-2 mb-6">
        {[{ key: "", label: "Tous" }, { key: "pending", label: "En attente" }, { key: "verified", label: "Vérifiés" }, { key: "non_compliant", label: "Non conformes" }].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === f.key ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? <p className="text-gray-400">Chargement...</p> : reports.length === 0 ? (
        <p className="text-gray-400">Aucun rapport.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-800">{r.student_name || "Étudiant"}</h2>
                <p className="text-sm text-gray-500">Soumis le : {new Date(r.submitted_at).toLocaleDateString("fr-FR")}</p>
                <span className={`mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[r.status]}`}>
                  {statusLabels[r.status]}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <a href={`http://127.0.0.1:8000${r.file}`} target="_blank" rel="noreferrer"
                  className="px-4 py-1.5 bg-blue-50 text-blue-600 text-sm rounded-xl hover:bg-blue-100 transition">
                  Voir fichier
                </a>
                {r.status === "pending" && (
                  <>
                    <button onClick={() => setConfirm({ id: r.id, status: "verified", label: "vérifier" })}
                      className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600 transition">
                      Vérifier
                    </button>
                    <button onClick={() => setConfirm({ id: r.id, status: "non_compliant", label: "marquer non conforme" })}
                      className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600 transition">
                      Non conforme
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination count={count} page={page} onPageChange={setPage} />

      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Confirmer</h2>
            <p className="text-gray-600 text-sm mb-5">Voulez-vous vraiment <strong>{confirm.label}</strong> ce rapport ?</p>
            <div className="flex gap-3">
              <button onClick={handleAction}
                className={`flex-1 py-2 text-white rounded-xl text-sm font-medium transition ${confirm.status === "verified" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>
                Confirmer
              </button>
              <button onClick={() => setConfirm(null)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Rapports;
