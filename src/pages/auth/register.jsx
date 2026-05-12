import COVER_IMAGE from '../../assets/back_sign-up.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";

const colors = {
  primary: "#060606",
  background: "#E0E0E0",
  disabled: "#D9D9D9"
}

const Register = () => {
  const [role, setRole] = useState("etudiant");
  const [nom_etudiant, setNom_etudiant] = useState("");
  const [etablissement, setEtablissement] = useState("");

  const [nom_contact, setNom_contact] = useState("");
  const [nom_entreprise, setNom_entreprise] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log({
        email,
        password,
        role,
        nom_etudiant,
        etablissement,
        nom_contact,
        nom_entreprise
      });

      setLoading(false);
      setError("");
    }, 1500);


    setError("");

  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE (IMAGE) */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full hidden md:block">

        <div className="relative w-full h-full">

          {/* image */}
          <img
            src={COVER_IMAGE}
            className="w-full h-full object-cover"
            alt="cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/15"></div>

        </div>

        <div className="absolute top-15 left-15 flex items-center gap-2">

          {/* carré icon */}
          <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                          bg-white/10
                          border border-gray-500/40">

            {/* graduation hat SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13L3.74 11.5 12 7l8.26 4.5L12 16z" />
            </svg>

          </div>

          {/* logo + text */}
          <div className="flex flex-col">

            <img
              src="./src/assets/logowhite2.png"
              alt="logo"
              className="w-22"
            />

            <span className="text-blue-200 text-xs tracking-widest mt-1">
              STAGE MANAGEMENT PLATFORM
            </span>

          </div>

        </div>

        <div className="absolute top-1/3 left-15 w-full md:w-120 gap-2">
          <p className="text-white font-semibold text-5xl">
            Rejoignez la nouvelle
            façon <br />
            de gérer les stages.
          </p>
        </div>

        <div className="absolute top-5/9 left-15 w-full md:w-122 gap-2">
          <p className="text-white/80 font-medium">
            Créez votre compte en moins d'une minute et commencez à publier des offres, postuler à des stages, ou superviser une promotion.
          </p>
        </div>

        <div className="absolute top-[90%] left-15 w-full md:w-150 gap-2">
          <p className="text-blue-200 text-xs tracking-widest mt-1">
            © 2026 STAGEO · Tous droits réservés
          </p>
        </div>

      </div>






      {/****** RIGHT SIDE (FORM FULL PANEL) ******/}
      <div className="w-full md:w-1/2 h-full flex justify-center ">

        <div className="relative flex flex-col justify-center items p-10 md:p-10 bg-white w-8/10 h-full">

          {/* TOP LEFT CONTENT */}
          <div className="flex flex-col items-start ">
            <h2 className="text-2xl font-bold text-gray-800">Créer un compte</h2>
            <p className="text-gray-600">Choisissez votre profil pour commencer.</p>

            <div className="grid grid-cols-2 w-full md:w-127 gap-2 mb-5 mt-5">

              {/* ETUDIANT */}
              <div
                onClick={() => setRole("etudiant")}
                className={`cursor-pointer border rounded-3xl p-4 flex flex-col items-start transition
                ${role === "etudiant"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-500/40 bg-white/10"
                  }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${role === "etudiant" ? "text-blue-600" : ""}`}>
                  <path strokeLinejoin="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
                <h3 className='font-semibold mt-2' >
                  Étudiant
                  <br />
                  <span className="text-gray-600 text-sm">Trouver un stage</span>
                </h3>
              </div>

              {/* ENTREPRISE */}
              <div
                onClick={() => setRole("entreprise")}
                className={`cursor-pointer border rounded-3xl p-4 font-semibold flex flex-col items-start transition
                ${role === "entreprise"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-500/40 bg-white/10"
                  }`}
              >

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-6 h-6 ${role === "entreprise" ? "text-blue-600" : ""}`}>
                  <path strokeLinejoin="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                </svg>
                <h3 className='font-semibold mt-3' >
                  Entreprise
                  <br />
                  <span className="text-gray-600 text-sm">Recruter un stagiaire</span>
                </h3>
              </div>

            </div>

          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-lg">

            {role === "etudiant" && (
              <>
                <label className="block text-sm font-medium text-gray-800" htmlFor="nom_complet">
                  Nom complet
                </label>

                <div className="w-full">
                  <div className="relative">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" className='absolute w-5 h-5 top-2.5 right-2.5 text-slate-600'>
                      <path strokeLinejoin="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>


                    <input
                      name="nom_etudiant"
                      type="text"
                      id="nom_etudiant"
                      value={nom_etudiant}
                      onChange={(e) => setNom_etudiant(e.target.value)}
                      className="w-full pl-3 pr-10 py-1 bg-transparent placeholder:text-slate-500 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                      required
                    />
                  </div>
                </div>



                <label className="block text-md font-medium text-gray-800" htmlFor="nom_etablissement">
                  Établissement
                </label>

                <div className="w-full">
                  <div className="relative">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" className='absolute w-5 h-5 top-2.5 right-2.5 text-slate-600'>
                      <path strokeLinejoin="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>



                    <input
                      name="etablissement"
                      type="text"
                      id="etablissement"
                      value={etablissement}
                      onChange={(e) => setEtablissement(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-500 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {role === "entreprise" && (
              <>
                <label className="block text-sm font-medium text-gray-800" htmlFor="nom_contact">
                  Nom du contact
                </label>

                <div className="w-full">
                  <div className="relative">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" className='absolute w-5 h-5 top-2.5 right-2.5 text-slate-600'>
                      <path strokeLinejoin="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>


                    <input
                      name="nom_contact"
                      type="text"
                      id="nom_contact"
                      value={nom_contact}
                      onChange={(e) => setNom_contact(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-500 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                      required
                    />
                  </div>
                </div>



                <label className="block text-md font-medium text-gray-800" htmlFor="etablissement">
                  Nom de l'entreprise
                </label>

                <div className="w-full">
                  <div className="relative">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" className='absolute w-5 h-5 top-2.5 right-2.5 text-slate-600'>
                      <path strokeLinejoin="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                    </svg>




                    <input
                      name="nom_entreprise"
                      type="text"
                      id="nom_entreprise"
                      value={nom_entreprise}
                      onChange={(e) => setNom_entreprise(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-500 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col gap-4 w-full max-w-lg">

              <label className="block text-sm font-medium text-gray-800" htmlFor="email">
                Email
              </label>

              <div className="w-full">
                <div className="relative">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                    <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>

                  <input
                    name="email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-500 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                    required
                  />
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-800" htmlFor="password">
                Mot de passe
              </label>

              <div className="w-full">
                <div className="relative">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                    <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                      d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m-1.5 0h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 19.5H6a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 016 10.5z" />
                  </svg>

                  <input
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-500 placeholder:text-5xl text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                    required
                  />
                </div>
              </div>
              <label className="block text-sm font-medium text-gray-800" htmlFor="confirm-password">
                Confirmer le mot de passe
              </label>

              <div className="w-full">
                <div className="relative">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="absolute w-5 h-5 top-1 right-2.5 text-slate-600">
                    <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                      d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m-1.5 0h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 19.5H6a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 016 10.5z" />
                  </svg>

                  <input
                    name="confirm-password"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-500 placeholder:text-5xl text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                    required
                  />
                </div>
              </div>
            </div>




            {error && (
              <p className="text-red-500 text-sm mb-2">
                {error}
              </p>
            )}
            <button name="register" type="submit" id="register"
              disabled={!role}
              className={`py-2 rounded-md text-white transition
              ${role ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`}>{loading ? "Chargement..." : "S'inscrire"}</button>

            <p className=" pt-2 text-sm self-center">Déjà inscrit ? <Link id="create_acc" to="/login" className=" text-blue-800 self-end hover:underline hover:text-blue-600 transition">Se connecter</Link> </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;