import { useEffect, useState, useRef, useCallback } from "react";
import api from "../../api/axios";
import Toast from "../../components/Toast";

const statusConfig = {
  pending:       { label: "En attente de vérification", color: "bg-orange-50 border-orange-200 text-orange-700", dot: "bg-orange-400" },
  verified:      { label: "Rapport vérifié",             color: "bg-green-50 border-green-200 text-green-700",   dot: "bg-green-500" },
  non_compliant: { label: "Non conforme",                color: "bg-red-50 border-red-200 text-red-700",         dot: "bg-red-500" },
};

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
};

const RapportEtudiant = () => {
  const [acceptedApps, setAcceptedApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    try {
      const [appRes, repRes] = await Promise.all([
        api.get("/applications/my/"),
        api.get("/applications/reports/my/"),
      ]);
      const apps = appRes.data.results ?? appRes.data;
      const reps = repRes.data.results ?? repRes.data;
      const reportedAppIds = new Set(reps.map(r => r.application));
      setAcceptedApps(apps.filter(a => a.status === "accepted" && !reportedAppIds.has(a.id)));
      setReports(reps);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleFileSelect = (file) => {
    if (!file) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setToast({ message: "Format non supporté. Utilisez PDF ou Word.", type: "error" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setToast({ message: "Fichier trop lourd. Maximum 10 Mo.", type: "error" });
      return;
    }
    setSelectedFile(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  const removeFile = () => {
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApp || !selectedFile) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("application", selectedApp);
      data.append("file", selectedFile);
      await api.post("/applications/reports/submit/", data);
      setToast({ message: "Rapport soumis avec succès !", type: "success" });
      setSelectedApp("");
      setSelectedFile(null);
      if (fileRef.current) fileRef.current.value = "";
      load();
    } catch (err) {
      const data = err.response?.data;
      const msg = data ? Object.values(data).flat().join(" ") : "Erreur lors de la soumission.";
      setToast({ message: msg, type: "error" });
    }
    setSubmitting(false);
  };

  const canSubmit = selectedApp && selectedFile && !submitting;

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <h1 className="text-2xl font-bold text-slate-800">Mon rapport de stage</h1>
        <p className="text-gray-500 text-sm">Soumettez votre rapport et suivez son évaluation.</p>
      </header>

      <section className="grid grid-cols-1 px-7 lg:grid-cols-9 gap-6 pb-8">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-6 bg-white rounded-xl shadow p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Soumettre un rapport</h2>
            <p className="text-sm text-gray-400 mt-0.5">Les deux champs sont requis avant de pouvoir soumettre.</p>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Chargement...</p>
          ) : acceptedApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Aucun stage à rapporter</p>
                <p className="text-xs text-gray-400 mt-1">Vous pourrez soumettre un rapport une fois qu'une candidature est acceptée par une entreprise.</p>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold shrink-0">1</span>
                  <label className="text-sm font-medium text-gray-700">Choisir le stage concerné</label>
                </div>
                <select value={selectedApp} onChange={e => setSelectedApp(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="">-- Sélectionner un stage --</option>
                  {acceptedApps.map(a => (
                    <option key={a.id} value={a.id}>{a.offer_title}</option>
                  ))}
                </select>
              </div>

              {/* STEP 2 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ${selectedApp ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}`}>2</span>
                  <label className="text-sm font-medium text-gray-700">Uploader le fichier rapport</label>
                </div>

                {selectedFile ? (
                  <div className="flex items-center justify-between gap-3 border border-green-200 bg-green-50 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-green-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 truncate max-w-xs">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{formatSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <button type="button" onClick={removeFile}
                      className="text-gray-400 hover:text-red-500 transition text-lg leading-none">✕</button>
                  </div>
                ) : (
                  <div
                    onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
                    onClick={() => fileRef.current.click()}
                    className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition
                      ${isDragging ? "border-blue-400 bg-blue-50 scale-[1.01]" : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                      className={`size-8 mb-2 transition ${isDragging ? "text-blue-500" : "text-gray-400"}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    {isDragging ? (
                      <p className="text-sm font-medium text-blue-600">Déposez le fichier ici</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">Glissez-déposez ou <span className="text-blue-600 font-medium">cliquez pour choisir</span></p>
                        <p className="text-xs text-gray-400 mt-1">PDF ou Word — max 10 Mo</p>
                      </>
                    )}
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={e => handleFileSelect(e.target.files[0])} />
                  </div>
                )}
              </div>

              {/* SUBMIT */}
              <button type="submit" disabled={!canSubmit}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition
                  ${canSubmit
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}>
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : !selectedApp ? "Sélectionnez un stage pour continuer"
                  : !selectedFile ? "Uploadez votre rapport pour continuer"
                  : "Soumettre le rapport"}
              </button>
            </>
          )}
        </form>

        {/* HISTORY */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Historique</h2>
            <p className="text-xs text-gray-400 mt-0.5">{reports.length} rapport(s) soumis</p>
          </div>

          {loading ? (
            <p className="text-gray-400 text-sm">Chargement...</p>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p className="text-sm text-gray-400">Aucun rapport soumis</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {reports.map(r => {
                const cfg = statusConfig[r.status] || statusConfig.pending;
                return (
                  <div key={r.id} className={`rounded-xl border p-4 ${cfg.color}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{r.offer_title || "Stage"}</p>
                      <span className="flex items-center gap-1 text-xs font-medium shrink-0">
                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Soumis le {new Date(r.submitted_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <a href={`http://127.0.0.1:8000${r.file}`} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      Télécharger le rapport
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </section>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default RapportEtudiant;
