import { useEffect, useState } from "react";
import api from "../../api/axios";
import Pagination from "../../components/Pagination";
import Toast from "../../components/Toast";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-600",
};
const statusLabels = { pending: "En attente", approved: "Approuvée", rejected: "Rejetée", expired: "Expirée" };

const Offres = () => {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("pending");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [reason, setReason] = useState("");
  const [confirmApprove, setConfirmApprove] = useState(null);
  const [toast, setToast] = useState(null);

  const load = async (p = page) => {
    setLoading(true);
    try {
      const res = await api.get(`/offers/pending/?status=${filter}&page=${p}`);
      setOffers(res.data.results);
      setCount(res.data.count);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { setPage(1); load(1); }, [filter]);
  useEffect(() => { load(); }, [page]);

  const approve = async () => {
    try {
      await api.post(`/offers/${confirmApprove.id}/approve/`);
      setToast({ message: "Offre approuvée.", type: "success" });
      load();
    } catch (_) {
      setToast({ message: "Erreur lors de l'approbation.", type: "error" });
    }
    setConfirmApprove(null);
  };

  const reject = async () => {
    try {
      await api.post(`/offers/${rejectTarget.id}/reject/`, { reason });
      setToast({ message: "Offre rejetée.", type: "success" });
      load();
    } catch (_) {
      setToast({ message: "Erreur lors du rejet.", type: "error" });
    }
    setRejectTarget(null);
    setReason("");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Offres de stage</h1>
      <p className="text-gray-500 mb-6">Validez les offres soumises par les entreprises</p>

      <div className="flex gap-2 mb-6">
        {["pending", "approved", "rejected", "all"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${filter === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {s === "pending" ? "En attente" : s === "approved" ? "Approuvées" : s === "rejected" ? "Rejetées" : "Toutes"}
          </button>
        ))}
      </div>

      {loading ? <p className="text-gray-400">Chargement...</p> : offers.length === 0 ? (
        <p className="text-gray-400">Aucune offre.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {offers.map((o) => (
            <div key={o.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-semibold text-gray-800">{o.title}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>
                      {statusLabels[o.status]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{o.company_name} · {o.city} · {o.duration} {o.duration_unit}</p>
                  <p className="text-sm text-gray-500">Deadline : {o.application_deadline}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition">
                    {expanded === o.id ? "Masquer" : "Détails"}
                  </button>
                  {o.status === "pending" && (
                    <>
                      <button onClick={() => setConfirmApprove({ id: o.id, title: o.title })}
                        className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600 transition">
                        Approuver
                      </button>
                      <button onClick={() => setRejectTarget({ id: o.id, title: o.title })}
                        className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600 transition">
                        Rejeter
                      </button>
                    </>
                  )}
                </div>
              </div>
              {expanded === o.id && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4 text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium text-gray-700">Description :</span> {o.description}</p>
                  <p><span className="font-medium text-gray-700">Compétences :</span> {o.skills_required}</p>
                  <p><span className="font-medium text-gray-700">Salaire :</span> {o.salary ? `${o.salary} MAD` : "Non précisé"}</p>
                  <p><span className="font-medium text-gray-700">Début :</span> {o.start_date}</p>
                  {o.rejection_reason && <p><span className="font-medium text-red-600">Motif de rejet :</span> {o.rejection_reason}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Pagination count={count} page={page} onPageChange={setPage} />

      {/* Confirm approve */}
      {confirmApprove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Confirmer l'approbation</h2>
            <p className="text-gray-600 text-sm mb-5">Approuver l'offre <strong>{confirmApprove.title}</strong> ?</p>
            <div className="flex gap-3">
              <button onClick={approve} className="flex-1 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition">Confirmer</button>
              <button onClick={() => setConfirmApprove(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Motif du rejet</h2>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={4}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Expliquez le motif du rejet..." />
            <div className="flex gap-3 mt-4">
              <button onClick={reject} className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition">Confirmer</button>
              <button onClick={() => setRejectTarget(null)} className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">Annuler</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Offres;
