import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/Pagination";
import Toast from "../../components/Toast";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const statusLabels = { pending: "En attente", approved: "Approuvée", rejected: "Rejetée" };

const Entreprises = () => {
  const [companies, setCompanies] = useState([]);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("pending");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const res = await api.get(`/accounts/admin/companies/?status=${filter}&page=${p}`);
      setCompanies(res.data.results);
      setCount(res.data.count);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { setPage(1); load(1); }, [filter]);
  useEffect(() => { load(); }, [page]);

  const handleAction = async () => {
    const { id, action } = confirm;
    try {
      await api.post(`/accounts/admin/companies/${id}/${action}/`);
      setToast({ message: action === "approve" ? "Entreprise approuvée." : "Entreprise rejetée.", type: "success" });
      load();
    } catch (_) {
      setToast({ message: "Une erreur est survenue.", type: "error" });
    }
    setConfirm(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Entreprises</h1>
      <p className="text-gray-500 mb-6">Gérez les comptes entreprises</p>

      <div className="flex gap-2 mb-6">
        {["pending", "approved", "rejected", "all"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {s === "pending" ? "En attente" : s === "approved" ? "Approuvées" : s === "rejected" ? "Rejetées" : "Toutes"}
          </button>
        ))}
      </div>

      {loading ? <p className="text-gray-400">Chargement...</p> : companies.length === 0 ? (
        <p className="text-gray-400">Aucune entreprise.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {companies.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-gray-800">{c.name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[c.status]}`}>
                      {statusLabels[c.status]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{c.email} · {c.industry}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition">
                    {expanded === c.id ? "Masquer" : "Détails"}
                  </button>
                  {c.status === "pending" && (
                    <>
                      <button onClick={() => setConfirm({ id: c.id, action: "approve", name: c.name })}
                        className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600 transition">
                        Approuver
                      </button>
                      <button onClick={() => setConfirm({ id: c.id, action: "reject", name: c.name })}
                        className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600 transition">
                        Rejeter
                      </button>
                    </>
                  )}
                </div>
              </div>
              {expanded === c.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div><span className="font-medium text-gray-700">Contact :</span> {c.contact}</div>
                  <div><span className="font-medium text-gray-700">RC / ICE :</span> {c.legal_id}</div>
                  <div className="col-span-2"><span className="font-medium text-gray-700">Description :</span> {c.description || "—"}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Pagination count={count} page={page} onPageChange={setPage} />

      {/* Confirm dialog */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Confirmer</h2>
            <p className="text-gray-600 text-sm mb-5">
              Voulez-vous vraiment <strong>{confirm.action === "approve" ? "approuver" : "rejeter"}</strong> l'entreprise <strong>{confirm.name}</strong> ?
            </p>
            <div className="flex gap-3">
              <button onClick={handleAction}
                className={`flex-1 py-2 text-white rounded-xl text-sm font-medium transition ${confirm.action === "approve" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>
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

export default Entreprises;
