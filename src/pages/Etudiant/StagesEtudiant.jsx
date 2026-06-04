import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Toast from "../../components/Toast";
import Pagination from "../../components/Pagination";

const isProfileComplete = (p) =>
  p && p.first_name && p.last_name && p.field_of_study && p.study_level;

const StagesEtudiant = () => {
  const [offers, setOffers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [applying, setApplying] = useState(null);
  const [showCvDialog, setShowCvDialog] = useState(false);
  const [toast, setToast] = useState(null);

  const loadOffers = async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/offers/?page=${p}`);
      setOffers(res.data.results ?? res.data);
      setCount(res.data.count ?? 0);
    } catch (_) {}
    setLoading(false);
  };

  const loadMyApplications = async () => {
    try {
      const res = await api.get("/applications/my/");
      const apps = res.data.results ?? res.data;
      setAppliedIds(new Set(apps.map(a => a.offer)));
    } catch (_) {}
  };

  const loadProfile = async () => {
    try {
      const res = await api.get("/accounts/profile/");
      setProfile(res.data);
    } catch (_) {}
  };

  useEffect(() => { loadOffers(page); }, [page]);
  useEffect(() => { loadMyApplications(); loadProfile(); }, []);

  const handleApply = async (offerId) => {
    if (!profile?.cv) {
      setShowCvDialog(true);
      return;
    }
    setApplying(offerId);
    try {
      await api.post("/applications/apply/", { offer: offerId });
      setAppliedIds(prev => new Set([...prev, offerId]));
      setToast({ message: "Candidature envoyée avec succès !", type: "success" });
    } catch (err) {
      const data = err.response?.data;
      const msg = data ? Object.values(data).flat().join(" ") : "Erreur lors de la candidature.";
      setToast({ message: msg, type: "error" });
    }
    setApplying(null);
  };

  const stageTypeLabels = { pfe: "PFE", observation: "Observation", internship: "Stage" };

  const filtered = offers.filter(o => {
    const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.skills_required?.toLowerCase().includes(search.toLowerCase());
    const matchCity = !filterCity || o.city === filterCity;
    const matchType = !filterType || o.stage_type === filterType;
    return matchSearch && matchCity && matchType;
  });

  const cities = [...new Set(offers.map(o => o.city).filter(Boolean))];

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <h1 className="text-2xl font-bold text-slate-800">Stages disponibles</h1>
        <p className="text-gray-500 text-sm">{count} offres disponibles.</p>
      </header>

      {profile && !isProfileComplete(profile) && (
        <div className="mx-7 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-yellow-500 shrink-0 mt-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-yellow-800">Profil incomplet — vous ne pouvez pas postuler</p>
            <p className="text-xs text-yellow-700 mt-1">
              Complétez votre profil avec votre {[
                !profile.first_name && "prénom",
                !profile.last_name && "nom",
                !profile.field_of_study && "filière",
                !profile.study_level && "niveau d'études",
              ].filter(Boolean).join(", ")} pour pouvoir postuler.
            </p>
          </div>
          <Link to="/etudiant/profile"
            className="text-xs font-semibold text-yellow-800 underline hover:text-yellow-900 whitespace-nowrap">
            Compléter →
          </Link>
        </div>
      )}

      {/* FILTERS */}
      <section className="px-7 pb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex items-center w-full lg:w-96 border border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
            <svg className="size-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" placeholder="Titre, entreprise, compétence..."
              value={search} onChange={e => setSearch(e.target.value)} className="w-full outline-none text-sm" />
          </div>

          <select value={filterCity} onChange={e => setFilterCity(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Toutes les villes</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="">Tous les types</option>
            <option value="pfe">PFE</option>
            <option value="observation">Observation</option>
            <option value="internship">Stage classique</option>
          </select>

          {(filterCity || filterType || search) && (
            <button onClick={() => { setSearch(""); setFilterCity(""); setFilterType(""); }}
              className="text-sm text-gray-500 hover:text-red-500 transition">
              Réinitialiser
            </button>
          )}
        </div>
      </section>

      {/* OFFERS GRID */}
      <section className="px-7 pb-8">
        {loading ? <p className="text-gray-400">Chargement...</p> :
          filtered.length === 0 ? <p className="text-gray-400">Aucune offre trouvée.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filtered.map((o) => (
                <div key={o.id} className="bg-white rounded-xl shadow p-4 flex flex-col hover:drop-shadow-lg transition duration-300">

                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-blue-600 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-0.5 rounded-full">
                      {stageTypeLabels[o.stage_type] || o.stage_type}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-1">{o.title}</h3>
                  <p className="text-xs font-semibold text-gray-500 mb-2">{o.company_name}</p>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{o.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {o.skills_required?.split(",").slice(0, 3).map((s, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s.trim()}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                      {o.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                      {o.duration} {o.duration_unit === "months" ? "mois" : "sem."}
                    </span>
                    {o.salary && <span className="flex items-center gap-1 col-span-2">💰 {o.salary} MAD</span>}
                    <span className="col-span-2 text-gray-400">Deadline : {o.application_deadline}</span>
                  </div>

                  <div className="mt-auto">
                    {appliedIds.has(o.id) ? (
                      <button disabled className="w-full py-2 rounded-md bg-green-100 text-green-600 text-sm font-medium cursor-not-allowed">
                        ✓ Candidature envoyée
                      </button>
                    ) : !isProfileComplete(profile) ? (
                      <button disabled className="w-full py-2 rounded-md bg-gray-100 text-gray-400 text-sm font-medium cursor-not-allowed">
                        Complétez votre profil
                      </button>
                    ) : (
                      <button onClick={() => handleApply(o.id)} disabled={applying === o.id}
                        className="w-full py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold transition disabled:opacity-50">
                        {applying === o.id ? "Envoi..." : "Postuler"}
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )
        }
        <Pagination count={count} page={page} onPageChange={setPage} />
      </section>

      {/* CV required dialog */}
      {showCvDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="bg-blue-50 px-6 pt-6 pb-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-800">CV requis</h2>
              <p className="text-sm text-gray-500 mt-2">
                Les entreprises ont besoin de votre CV pour examiner votre candidature. Uploadez-le depuis votre profil.
              </p>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3">
              <Link to="/etudiant/profile"
                onClick={() => setShowCvDialog(false)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold text-center transition">
                Uploader mon CV →
              </Link>
              <button onClick={() => setShowCvDialog(false)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-medium transition">
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default StagesEtudiant;
