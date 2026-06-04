import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { City } from "country-state-city";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../api/axios";
import Toast from "../../components/Toast";

const villesMaroc = City.getCitiesOfCountry("MA")?.map((c) => ({ value: c.name, label: c.name }));

const EMPTY = {
  title: "", description: "", skills_required: "", city: "",
  duration: "", duration_unit: "months", stage_type: "internship",
  address: "", salary: "",
};

const CreateOffre = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [startDate, setStartDate] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const reset = () => { setForm(EMPTY); setStartDate(null); setDeadline(null); };

  const handleSubmit = async () => {
    if (!startDate || !deadline) {
      setToast({ message: "Veuillez remplir les dates.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await api.post("/offers/create/", {
        ...form,
        duration: parseInt(form.duration),
        start_date: startDate.toISOString().split("T")[0],
        application_deadline: deadline.toISOString().split("T")[0],
        salary: form.salary || null,
      });
      setToast({ message: "Offre soumise avec succès. En attente de validation.", type: "success" });
      reset();
      setTimeout(() => navigate("/entreprise/offres"), 1500);
    } catch (err) {
      const data = err.response?.data;
      const msg = data ? Object.values(data).flat().join(" ") : "Erreur lors de la soumission.";
      setToast({ message: msg, type: "error" });
    }
    setLoading(false);
  };

  const inputClass = "w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-5">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Nouvelle offre de stage</h1>
        <p className="text-gray-500 mt-2">Décrivez le poste pour attirer les bons profils.</p>
      </header>

      <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md border border-gray-200 p-8">

        {/* TITLE */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Titre du poste *</label>
          <input type="text" placeholder="Ex: Développeur Full-Stack React/Node"
            value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TYPE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type de stage *</label>
            <select value={form.stage_type} onChange={(e) => set("stage_type", e.target.value)} className={inputClass}>
              <option value="internship">Stage classique</option>
              <option value="pfe">PFE</option>
              <option value="observation">Stage d'observation</option>
            </select>
          </div>

          {/* CITY */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ville *</label>
            <Select options={villesMaroc} placeholder="Choisir une ville"
              value={villesMaroc?.find(v => v.value === form.city) || null}
              onChange={(opt) => set("city", opt?.value || "")}
              className="text-sm"
              styles={{ control: (b, s) => ({ ...b, borderColor: s.isFocused ? "#3b82f6" : "#e5e7eb" }) }}
            />
          </div>

          {/* DURATION */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Durée *</label>
            <div className="flex gap-2">
              <input type="number" min="1" placeholder="Ex: 6"
                value={form.duration} onChange={(e) => set("duration", e.target.value)}
                className={`${inputClass} w-24`} />
              <select value={form.duration_unit} onChange={(e) => set("duration_unit", e.target.value)} className={inputClass}>
                <option value="months">Mois</option>
                <option value="weeks">Semaines</option>
              </select>
            </div>
          </div>

          {/* SALARY */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Salaire (MAD) <span className="text-gray-400 font-normal">optionnel</span></label>
            <input type="number" min="0" placeholder="Ex: 2000"
              value={form.salary} onChange={(e) => set("salary", e.target.value)} className={inputClass} />
          </div>

          {/* START DATE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date de début *</label>
            <DatePicker selected={startDate} onChange={setStartDate} dateFormat="dd/MM/yyyy"
              wrapperClassName="w-full" placeholderText="jj/mm/aaaa"
              className={inputClass} />
          </div>

          {/* DEADLINE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date limite de candidature *</label>
            <DatePicker selected={deadline} onChange={setDeadline} dateFormat="dd/MM/yyyy"
              wrapperClassName="w-full" placeholderText="jj/mm/aaaa"
              className={inputClass} />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse <span className="text-gray-400 font-normal">optionnel</span></label>
            <input type="text" placeholder="Ex: Rue Hassan II, Casablanca"
              value={form.address} onChange={(e) => set("address", e.target.value)} className={inputClass} />
          </div>

          {/* SKILLS */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Compétences requises *</label>
            <input type="text" placeholder="Ex: React, TypeScript, Node.js"
              value={form.skills_required} onChange={(e) => set("skills_required", e.target.value)} className={inputClass} />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description du poste *</label>
          <textarea rows="6" placeholder="Missions, environnement de travail, profil recherché..."
            value={form.description} onChange={(e) => set("description", e.target.value)} className={inputClass} />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={reset}
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium">
            Réinitialiser
          </button>
          <button onClick={handleSubmit} disabled={loading || !form.title || !form.city || !form.duration || !form.description}
            className="px-6 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold disabled:opacity-50">
            {loading ? "Envoi..." : "Publier l'offre"}
          </button>
        </div>

      </section>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CreateOffre;
