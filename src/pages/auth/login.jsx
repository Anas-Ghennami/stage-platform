import COVER_IMAGE from '../../assets/back_sign-in.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";


const colors = {
  primary: "#060606",
  background: "#E0E0E0",
  disabled: "#D9D9D9"
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalide");
      return;
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    setError("");
    console.log(email, password);

    setLoading(true);
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
          <div className="absolute inset-0 bg-black/35"></div>

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

            {/* logo */}
            <img
              src="./src/assets/logowhite2.png"
              alt="logo"
              className="w-22"
            />

            {/* phrase */}
            <span className="text-blue-200 text-xs tracking-widest mt-1">
              STAGE MANAGEMENT PLATFORM
            </span>

          </div>

        </div>


        <div className="absolute top-1/4 left-15 w-full md:w-80 border border-gray-500/40 rounded-3xl p-1 bg-white/10 backdrop-blur-md">

          <p className="text-white/80 font-medium flex items-center gap-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>


            Le pont entre étudiants & entreprises

          </p>

        </div>

        <div className="absolute top-1/3 left-15 w-full md:w-150 gap-2">
          <p className="text-white font-semibold text-5xl">
            Trouvez, gérez et validez
            vos stages au même endroit.
          </p>
        </div>


        <div className="absolute top-5/9 left-15 w-full md:w-120 gap-2">
          <p className="text-white/80 font-medium">
            Une plateforme unique pour les étudiants, les entreprises et l'administration — des candidatures suivies en temps réel jusqu'à la soutenance.
          </p>
        </div>


        <div className="absolute top-[67%] left-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-150 mx-auto mt-6">
          <div className="border border-gray-500/40 rounded-3xl p-4 bg-white/10 backdrop-blur-md text-white font-semibold flex flex-col items-center justify-center">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>

            <h3 className="mt-2">Etudiant</h3>
          </div>


          <div className="border border-gray-500/40 rounded-3xl p-4 bg-white/10 backdrop-blur-md text-white font-semibold flex flex-col items-center justify-center">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>


            <h3 className="mt-2">Entreprise</h3>
          </div>



          <div className="border border-gray-500/40 rounded-3xl p-4 bg-white/10 backdrop-blur-md text-white font-semibold flex flex-col items-center justify-center">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>


            <h3 className="mt-2">Admin</h3>
          </div>
        </div>

        <div className="absolute top-[90%] left-15 w-full md:w-150 gap-2">
          <p className="text-blue-200 text-xs tracking-widest mt-1">
            © 2026 STAGEO · Tous droits réservés
          </p>
        </div>

      </div>


      {/* RIGHT SIDE (FORM FULL PANEL) */}
      <div className="w-full md:w-1/2 h-full flex justify-center ">

        <div className="relative flex flex-col justify-center items p-10 md:p-20 bg-white w-8/10 h-full">

          {/* TOP LEFT CONTENT */}
          <div className="flex flex-col items-start mb-10">
            <img src="./src/assets/logoblue2.png" alt="logo" className="w-20 md:w-40 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Bon retour</h2>
            <p className="text-gray-600">Connectez-vous pour accéder à votre espace.</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-4 w-full max-w-lg">

              <label className="block text-sm font-medium text-gray-800" htmlFor="email">
                Email
              </label>

              <div className="w-full">
                <div className="relative">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 8l9 6 9-6M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>

                  <input
                    name="email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-500 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                    placeholder="vous@exemple.com"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M16.5 10.5V7.5a4.5 4.5 0 10-9 0v3m-1.5 0h12a1.5 1.5 0 011.5 1.5v6A1.5 1.5 0 0118 19.5H6a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 016 10.5z" />
                  </svg>

                  <input
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-gray-500 placeholder:text-5xl text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-slate-300 shadow-sm"
                    placeholder='............'
                    required
                  />
                </div>
              </div>

              <a href="#" id="forgot_pw" className="text-sm text-blue-800 self-end hover:underline hover:text-blue-600 transition">Oublié ?</a>


              {/* ERROR MESSAGE */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                name="login"
                type="submit"
                id="login"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>

              <p className=" pt-5 text-sm self-center">
                Pas encore de compte ? <Link
                  id="create_acc"
                  to="/register"
                  className=" text-blue-800 self-end hover:underline hover:text-blue-600 transition"
                >Créer un compte
                </Link>
              </p>

              
              
            </div>

          </form>




        </div>

      </div>

    </div>
  )
}

export default Login;