import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Toast from "../../components/Toast";
import Pagination from "../../components/Pagination";

const statusStyles = {
  pending:  "bg-orange-100 text-orange-600 border border-orange-300",
  approved: "bg-green-100 text-green-600 border border-green-300",
  rejected: "bg-red-100 text-red-600 border border-red-300",
  expired:  "bg-gray-100 text-gray-500 border border-gray-300",
};
const statusText = { pending: "En attente", approved: "Publiée", rejected: "Refusée", expired: "Expirée" };

const appStatusStyles = {
  pending:   "bg-orange-100 text-orange-600",
  reviewing: "bg-blue-100 text-blue-600",
  accepted:  "bg-green-100 text-green-600",
  rejected:  "bg-red-100 text-red-600",
  cancelled: "bg-gray-100 text-gray-500",
};
const appStatusText = { pending: "En attente", reviewing: "En révision", accepted: "Accepté", rejected: "Refusé", cancelled: "Annulé" };

const EMPTY_FORM = { title: "", description: "", skills_required: "", city: "", duration: "", duration_unit: "months", stage_type: "internship", address: "", salary: "" };

const OffresEntreprise = () => {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [editOffer, setEditOffer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const loadOffers = async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/offers/my/?page=${p}`);
      setOffers(res.data.results ?? res.data);
      setCount(res.data.count ?? 0);
    } catch (_) {}
    setLoading(false);
  };

  const loadApplications = async () => {
    try {
      const res = await api.get("/applications/company/");
      setApplications(res.data.results ?? res.data);
    } catch (_) {}
  };

  useEffect(() => { loadOffers(page); }, [page]);
  useEffect(() => { loadApplications(); }, []);

  const offerApplications = (offerId) => applications.filter(a => a.offer === offerId);

  const updateAppStatus = async (appId, status) => {
    try {
      await api.patch(`/applications/${appId}/`, { status });
      setToast({ message: "Statut mis à jour.", type: "success" });
      loadApplications();
    } catch (_) {
      setToast({ message: "Erreur lors de la mise à jour.", type: "error" });
    }
  };

  const handleEdit = async () => {
    try {
      await api.put(`/offers/${editOffer.id}/`, {
        ...editOffer,
        duration: parseInt(editOffer.duration),
        salary: editOffer.salary || null,
      });
      setToast({ message: "Offre mise à jour. En attente de revalidation.", type: "success" });
      setEditOffer(null);
      loadOffers(page);
    } catch (_) {
      setToast({ message: "Erreur lors de la modification.", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/offers/${deleteTarget.id}/`);
      setToast({ message: "Offre supprimée.", type: "success" });
      setDeleteTarget(null);
      if (selectedOffer?.id === deleteTarget.id) setSelectedOffer(null);
      loadOffers(page);
    } catch (_) {
      setToast({ message: "Erreur lors de la suppression.", type: "error" });
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mes offres</h1>
          <p className="text-gray-500 text-sm">Gérez vos offres de stage.</p>
        </div>
        <Link to="/entreprise/CreateOffre"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md">
          + Nouvelle offre
        </Link>
      </header>

      <div className="px-7 pb-8 grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* OFFERS LIST */}
        <div className={`${selectedOffer ? "lg:col-span-2" : "lg:col-span-5"} flex flex-col gap-3`}>
          {loading ? <p className="text-gray-400">Chargement...</p> :
            offers.length === 0 ? <p className="text-gray-400">Aucune offre.</p> :
            offers.map((o) => (
              <div key={o.id}
                onClick={() => setSelectedOffer(selectedOffer?.id === o.id ? null : o)}
                className={`bg-white rounded-xl shadow p-4 cursor-pointer border-2 transition
                  ${selectedOffer?.id === o.id ? "border-blue-500" : "border-transparent hover:border-gray-200"}`}>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{o.title}</h3>
                    <p className="text-sm text-gray-500">{o.city} · {o.duration} {o.duration_unit === "months" ? "mois" : "semaines"}</p>
                    <p className="text-xs text-gray-400 mt-1">Deadline : {o.application_deadline}</p>
                    <p className="text-xs text-gray-400">{offerApplications(o.id).length} candidature(s)</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${statusStyles[o.status]}`}>
                      {statusText[o.status]}
                    </span>
                    {o.status !== "approved" && (
                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setEditOffer({ ...o })}
                          className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg">✏️</button>
                        <button onClick={() => setDeleteTarget(o)}
                          className="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg">🗑</button>
                      </div>
                    )}
                    {o.status === "approved" && (
                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setDeleteTarget(o)}
                          className="text-xs px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg">🗑</button>
                      </div>
                    )}
                  </div>
                </div>
                {o.rejection_reason && (
                  <p className="mt-2 text-xs text-red-500">Motif : {o.rejection_reason}</p>
                )}
              </div>
            ))
          }
          <Pagination count={count} page={page} onPageChange={setPage} />
        </div>

        {/* APPLICATIONS PANEL */}
        {selectedOffer && (
          <div className="lg:col-span-3 bg-white rounded-xl shadow p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">{selectedOffer.title}</h2>
              <button onClick={() => setSelectedOffer(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <p className="text-sm text-gray-500 mb-4">{selectedOffer.city} · {selectedOffer.duration} {selectedOffer.duration_unit === "months" ? "mois" : "semaines"}</p>

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Candidatures ({offerApplications(selectedOffer.id).length})
            </h3>

            {offerApplications(selectedOffer.id).length === 0 ? (
              <p className="text-gray-400 text-sm">Aucune candidature pour cette offre.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {offerApplications(selectedOffer.id).map((a) => (
                  <div key={a.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">{a.student_name}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${appStatusStyles[a.status]}`}>
                        {appStatusText[a.status]}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      Candidaté le : {new Date(a.applied_at).toLocaleDateString("fr-FR")}
                    </p>
                    {(a.status === "pending" || a.status === "reviewing") && (
                      <div className="flex gap-2">
                        {a.status === "pending" && (
                          <button onClick={() => updateAppStatus(a.id, "reviewing")}
                            className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                            En révision
                          </button>
                        )}
                        <button onClick={() => updateAppStatus(a.id, "accepted")}
                          className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                          Accepter
                        </button>
                        <button onClick={() => updateAppStatus(a.id, "rejected")}
                          className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                          Refuser
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editOffer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Modifier l'offre</h2>
              <button onClick={() => setEditOffer(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <input className={inputClass} placeholder="Titre" value={editOffer.title}
                onChange={e => setEditOffer({ ...editOffer, title: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <select className={inputClass} value={editOffer.stage_type}
                  onChange={e => setEditOffer({ ...editOffer, stage_type: e.target.value })}>
                  <option value="internship">Stage classique</option>
                  <option value="pfe">PFE</option>
                  <option value="observation">Stage d'observation</option>
                </select>
                <input className={inputClass} placeholder="Ville" value={editOffer.city}
                  onChange={e => setEditOffer({ ...editOffer, city: e.target.value })} />
                <input className={inputClass} type="number" placeholder="Durée" value={editOffer.duration}
                  onChange={e => setEditOffer({ ...editOffer, duration: e.target.value })} />
                <select className={inputClass} value={editOffer.duration_unit}
                  onChange={e => setEditOffer({ ...editOffer, duration_unit: e.target.value })}>
                  <option value="months">Mois</option>
                  <option value="weeks">Semaines</option>
                </select>
                <input className={inputClass} type="date" value={editOffer.start_date}
                  onChange={e => setEditOffer({ ...editOffer, start_date: e.target.value })} />
                <input className={inputClass} type="date" value={editOffer.application_deadline}
                  onChange={e => setEditOffer({ ...editOffer, application_deadline: e.target.value })} />
              </div>
              <input className={inputClass} placeholder="Compétences requises" value={editOffer.skills_required}
                onChange={e => setEditOffer({ ...editOffer, skills_required: e.target.value })} />
              <textarea className={inputClass} rows={4} placeholder="Description" value={editOffer.description}
                onChange={e => setEditOffer({ ...editOffer, description: e.target.value })} />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleEdit}
                className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                Enregistrer
              </button>
              <button onClick={() => setEditOffer(null)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Supprimer l'offre</h2>
            <p className="text-gray-600 text-sm mb-5">Voulez-vous vraiment supprimer <strong>{deleteTarget.title}</strong> ?</p>
            <div className="flex gap-3">
              <button onClick={handleDelete}
                className="flex-1 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition">
                Supprimer
              </button>
              <button onClick={() => setDeleteTarget(null)}
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

export default OffresEntreprise;
