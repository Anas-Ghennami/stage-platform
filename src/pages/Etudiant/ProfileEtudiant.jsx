import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import Toast from "../../components/Toast";
import CropDialog from "../../components/CropDialog";

const ProfileEtudiant = () => {
  const [form, setForm] = useState({
    first_name: "", last_name: "", field_of_study: "",
    study_level: "", skills: "", about: "",
  });
  const [email, setEmail] = useState("");
  const [existingCv, setExistingCv] = useState(null);
  const [newCvName, setNewCvName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const cvRef = useRef();
  const photoRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/accounts/profile/");
        const d = res.data;
        setEmail(d.email || "");
        setForm({
          first_name:    d.first_name    || "",
          last_name:     d.last_name     || "",
          field_of_study: d.field_of_study || "",
          study_level:   d.study_level   || "",
          skills:        d.skills        || "",
          about:         d.about         || "",
        });
        if (d.cv) setExistingCv(d.cv);
        if (d.photo) setPhotoPreview(`http://127.0.0.1:8000${d.photo}`);
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (cvRef.current?.files[0]) data.append("cv", cvRef.current.files[0]);
      if (croppedBlob) data.append("photo", croppedBlob, "photo.jpg");
      await api.put("/accounts/profile/", data);
      setToast({ message: "Profil mis à jour.", type: "success" });
    } catch (err) {
      console.error("Profile save error:", err);
      const status = err.response?.status;
      const data = err.response?.data;
      console.error("Status:", status, "Data:", data);
      const fieldLabels = {
        first_name: "Prénom", last_name: "Nom", field_of_study: "Filière",
        study_level: "Niveau", skills: "Compétences", about: "À propos", cv: "CV", photo: "Photo",
      };
      let msg;
      if (!err.response) {
        msg = `Impossible de joindre le serveur — vérifiez que le backend tourne.`;
      } else if (status === 500) {
        msg = `Erreur serveur (500) — vérifiez le terminal Django pour le détail.`;
      } else if (data && typeof data === "object") {
        msg = Object.entries(data).map(([k, v]) => `${fieldLabels[k] || k} : ${[].concat(v).join(", ")}`).join("\n");
      } else if (typeof data === "string") {
        msg = `(${status}) ${data}`;
      } else {
        msg = `Erreur ${status} — contactez l'admin.`;
      }
      setToast({ message: msg, type: "error" });
    }
    setSaving(false);
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";
  const initial = form.first_name?.charAt(0)?.toUpperCase() || email?.charAt(0)?.toUpperCase() || "E";

  if (loading) return <div className="p-8 text-gray-400">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <h1 className="text-2xl font-bold text-slate-800">Mon profil</h1>
        <p className="text-gray-500 text-sm">Gérez vos informations personnelles et académiques.</p>
      </header>

      <section className="grid grid-cols-1 px-7 lg:grid-cols-9 gap-6 items-stretch pb-8">

        {/* LEFT — avatar */}
        <div className="lg:col-span-3 flex flex-col gap-4 bg-white rounded-xl shadow items-center justify-center p-7">
          <div className="relative group cursor-pointer" onClick={() => photoRef.current.click()}>
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold overflow-hidden">
              {photoPreview
                ? <img src={photoPreview} alt="photo" className="w-full h-full object-cover" />
                : initial
              }
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </div>
            <input ref={photoRef} type="file" accept="image/*" className="hidden"
              onChange={e => {
                const file = e.target.files[0];
                if (file) setCropSrc(URL.createObjectURL(file));
              }} />
          </div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-md font-semibold">{form.first_name} {form.last_name}</h1>
            <p className="text-sm text-gray-400">{email}</p>
            {form.study_level && <p className="text-xs text-gray-400 mt-1">{form.study_level} · {form.field_of_study}</p>}
            <p className="text-xs text-gray-400 mt-1">Cliquez sur la photo pour modifier</p>
          </div>

          {/* CV Upload */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 block mb-2">CV</label>

            {existingCv && !newCvName ? (
              <div className="flex items-center justify-between gap-2 w-full border border-green-200 bg-green-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2 text-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span className="text-sm font-medium">CV déjà uploadé</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`http://127.0.0.1:8000${existingCv}`} target="_blank" rel="noreferrer"
                    className="text-xs text-blue-600 hover:underline">Voir</a>
                  <label className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer underline">
                    Remplacer
                    <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                      onChange={e => setNewCvName(e.target.files[0]?.name || null)} />
                  </label>
                </div>
              </div>
            ) : (
              <label className={`flex items-center justify-between gap-2 w-full border border-dashed rounded-xl px-4 py-3 cursor-pointer transition text-sm
                ${newCvName ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-300 hover:bg-gray-50 text-gray-500"}`}>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                  </svg>
                  {newCvName ? <span className="font-medium truncate max-w-[160px]">{newCvName}</span> : <span>Uploader votre CV (PDF)</span>}
                </div>
                {!newCvName && <span className="text-xs text-gray-400">PDF recommandé</span>}
                {newCvName && (
                  <button type="button" onClick={e => { e.preventDefault(); setNewCvName(null); if (cvRef.current) cvRef.current.value = ""; }}
                    className="text-xs text-gray-400 hover:text-red-500">✕</button>
                )}
                <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={e => setNewCvName(e.target.files[0]?.name || null)} />
              </label>
            )}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Informations</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Prénom</label>
                  <input name="first_name" value={form.first_name} onChange={handleChange} className={inputClass} placeholder="Prénom" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom</label>
                  <input name="last_name" value={form.last_name} onChange={handleChange} className={inputClass} placeholder="Nom" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input value={email} disabled className={`${inputClass} bg-gray-50 text-gray-400 cursor-not-allowed`} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Filière</label>
                  <input name="field_of_study" value={form.field_of_study} onChange={handleChange} className={inputClass} placeholder="Ex: Informatique" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Niveau d'études</label>
                  <select name="study_level" value={form.study_level} onChange={handleChange} className={inputClass}>
                    <option value="">Sélectionner...</option>
                    <option>Licence 1</option>
                    <option>Licence 2</option>
                    <option>Licence 3</option>
                    <option>Master 1</option>
                    <option>Master 2</option>
                    <option>Doctorat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Compétences</label>
                <input name="skills" value={form.skills} onChange={handleChange} className={inputClass} placeholder="Ex: React, Python, Django..." />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">À propos</label>
                <textarea name="about" value={form.about} onChange={handleChange} rows="4" className={inputClass} placeholder="Décrivez-vous brièvement..." />
              </div>

              <div className="flex justify-start">
                <button type="submit" disabled={saving}
                  className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-6 py-2 rounded-md disabled:opacity-50">
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>

      </section>

      {cropSrc && (
        <CropDialog
          imageSrc={cropSrc}
          onConfirm={(blob) => {
            setCroppedBlob(blob);
            setPhotoPreview(URL.createObjectURL(blob));
            setCropSrc(null);
            if (photoRef.current) photoRef.current.value = "";
          }}
          onCancel={() => {
            setCropSrc(null);
            if (photoRef.current) photoRef.current.value = "";
          }}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ProfileEtudiant;
