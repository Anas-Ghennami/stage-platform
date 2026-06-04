import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import Toast from "../../components/Toast";

const ProfileEntreprise = () => {
  const [form, setForm] = useState({
    name: "", description: "", industry: "", contact: "",
    legal_id: "", website: "", address: "",
  });
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/accounts/profile/");
        const d = res.data;
        setEmail(d.email || "");
        setForm({
          name: d.name || "",
          description: d.description || "",
          industry: d.industry || "",
          contact: d.contact || "",
          legal_id: d.legal_id || "",
          website: d.website || "",
          address: d.address || "",
        });
        if (d.logo) setLogo(`http://127.0.0.1:8000${d.logo}`);
      } catch (_) {}
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (fileRef.current?.files[0]) data.append("logo", fileRef.current.files[0]);
      await api.put("/accounts/profile/", data);
      setToast({ message: "Profil mis à jour.", type: "success" });
    } catch (err) {
      const data = err.response?.data;
      const fieldLabels = {
        name: "Nom de l'entreprise",
        industry: "Secteur",
        contact: "Contact",
        legal_id: "RC / ICE",
        website: "Site web (doit commencer par https://)",
        address: "Adresse",
        description: "À propos",
        logo: "Logo",
      };
      const msg = data
        ? Object.entries(data).map(([k, v]) => `${fieldLabels[k] || k} : ${[].concat(v).join(", ")}`).join("\n")
        : "Erreur lors de la sauvegarde.";
      setToast({ message: msg, type: "error" });
    }
    setSaving(false);
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";

  if (loading) return <div className="p-8 text-gray-400">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-200/30">
      <header className="p-7">
        <h1 className="text-2xl font-bold text-slate-800">Profil entreprise</h1>
        <p className="text-gray-500 text-sm">Gérez les informations publiques de votre organisation.</p>
      </header>

      <section className="grid grid-cols-1 px-7 lg:grid-cols-9 gap-6 items-stretch pb-8">

        {/* LEFT — logo */}
        <div className="lg:col-span-3 flex flex-col gap-4 bg-white rounded-xl shadow items-center justify-center p-7">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center overflow-hidden text-3xl font-bold cursor-pointer"
            onClick={() => fileRef.current.click()}>
            {logo ? <img src={logo} alt="logo" className="w-full h-full object-cover" /> : form.name?.charAt(0) || "E"}
          </div>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-md font-semibold">{form.name || "Entreprise"}</h1>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          <button type="button" onClick={() => fileRef.current.click()}
            className="text-xs font-medium py-1 px-3 rounded-md border border-gray-200 hover:bg-gray-100">
            Changer le logo
          </button>
        </div>

        {/* RIGHT — form */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Informations</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom de l'entreprise</label>
                  <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Nom de l'entreprise" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input value={email} disabled className={`${inputClass} bg-gray-50 text-gray-400 cursor-not-allowed`} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Secteur d'activité</label>
                  <input name="industry" value={form.industry} onChange={handleChange} className={inputClass} placeholder="Ex: Informatique" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact (téléphone)</label>
                  <input name="contact" value={form.contact} onChange={handleChange} className={inputClass} placeholder="Ex: 0612345678" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Site web</label>
                  <input name="website" value={form.website} onChange={handleChange} className={inputClass} placeholder="https://exemple.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">RC / ICE</label>
                  <input name="legal_id" value={form.legal_id} onChange={handleChange} className={inputClass} placeholder="Numéro légal" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Adresse</label>
                <input name="address" value={form.address} onChange={handleChange} className={inputClass} placeholder="Rue, ville..." />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">À propos</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="4"
                  className={inputClass} placeholder="Décrivez votre entreprise..." />
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ProfileEntreprise;
