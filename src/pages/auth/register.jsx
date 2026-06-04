import COVER_IMAGE from '../../assets/back_sign-up.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("etudiant");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Student fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [studyLevel, setStudyLevel] = useState("Licence 3");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [contact, setContact] = useState("");
  const [legalId, setLegalId] = useState("");

  // Common
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      if (role === "etudiant") {
        await api.post("/accounts/register/student/", {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          field_of_study: fieldOfStudy,
          study_level: studyLevel,
        });
        navigate("/login");
      } else {
        await api.post("/accounts/register/company/", {
          email,
          password,
          name: companyName,
          industry,
          contact,
          legal_id: legalId,
        });
        setError("");
        alert("Compte créé. En attente de validation par l'administrateur.");
        navigate("/login");
      }
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const messages = Object.values(data).flat().join(" ");
        setError(messages);
      } else {
        setError("Erreur lors de l'inscription.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full hidden md:block">
        <div className="relative w-full h-full">
          <img src={COVER_IMAGE} className="w-full h-full object-cover" alt="cover" />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>

        <div className="absolute top-15 left-15 flex items-center gap-2">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 border border-gray-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13L3.74 11.5 12 7l8.26 4.5L12 16z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <img src="./src/assets/logowhite2.png" alt="logo" className="w-22" />
            <span className="text-blue-200 text-xs tracking-widest mt-1">STAGE MANAGEMENT PLATFORM</span>
          </div>
        </div>

        <div className="absolute top-1/3 left-15 w-full md:w-120">
          <p className="text-white font-semibold text-5xl">
            Rejoignez la nouvelle façon de gérer les stages.
          </p>
        </div>

        <div className="absolute top-[90%] left-15">
          <p className="text-blue-200 text-xs tracking-widest mt-1">© 2026 STAGEO · Tous droits réservés</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-full flex justify-center overflow-y-auto">
        <div className="flex flex-col justify-center p-10 bg-white w-8/10 min-h-full">

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Créer un compte</h2>
          <p className="text-gray-600 mb-5">Choisissez votre profil pour commencer.</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div onClick={() => setRole("etudiant")}
              className={`cursor-pointer border rounded-3xl p-4 flex flex-col items-start transition
                ${role === "etudiant" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className={`w-6 h-6 ${role === "etudiant" ? "text-blue-600" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              <h3 className="font-semibold mt-2">Étudiant<br /><span className="text-gray-500 text-sm font-normal">Trouver un stage</span></h3>
            </div>

            <div onClick={() => setRole("entreprise")}
              className={`cursor-pointer border rounded-3xl p-4 flex flex-col items-start transition
                ${role === "entreprise" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                className={`w-6 h-6 ${role === "entreprise" ? "text-blue-600" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
              </svg>
              <h3 className="font-semibold mt-2">Entreprise<br /><span className="text-gray-500 text-sm font-normal">Recruter un stagiaire</span></h3>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-lg">

            {role === "etudiant" && (
              <>
                <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
                <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
                <input type="text" placeholder="Filière (ex: Informatique)" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
                <select value={studyLevel} onChange={(e) => setStudyLevel(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900">
                  <option>Licence 1</option>
                  <option>Licence 2</option>
                  <option>Licence 3</option>
                  <option>Master 1</option>
                  <option>Master 2</option>
                  <option>Doctorat</option>
                </select>
              </>
            )}

            {role === "entreprise" && (
              <>
                <input type="text" placeholder="Nom de l'entreprise" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
                <input type="text" placeholder="Secteur d'activité" value={industry} onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
                <input type="text" placeholder="Contact (téléphone)" value={contact} onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
                <input type="text" placeholder="Numéro légal (RC / ICE)" value={legalId} onChange={(e) => setLegalId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
              </>
            )}

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />
            <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900" required />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition">
              {loading ? "Chargement..." : "S'inscrire"}
            </button>

            <p className="pt-2 text-sm self-center">
              Déjà inscrit ?{" "}
              <Link to="/login" className="text-blue-800 hover:underline hover:text-blue-600 transition">Se connecter</Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;
