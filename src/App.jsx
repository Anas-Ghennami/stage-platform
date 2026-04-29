import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import TopBar from "./layout/TopBar";
import SideBar from "./layout/SideBar";
import DashboardLayout from "./layout/layoutDashbord";
import { Navigate } from "react-router-dom";

function App() {

  // ⚠️ FAKE USER (sera remplacé par backend + authentification)
  const user = {
    id: "usr_fake_001",
    role: "etudiant"
  };

  // !!! PAGES TEMPORAIRES (juste pour test - seront remplacées par vraies pages)
  const DashboardEtudiant = () => <h1 id="page_etudiant_dashboard" className="text-center mt-50 text-5xl">Etudiant Dashboard</h1>;
  const Stages = () => <h1 id="page_etudiant_stages" className="text-center mt-50 text-5xl">Stages</h1>;
  const Candidatures = () => <h1 id="page_etudiant_candidatures" className="text-center mt-50 text-5xl">Mes candidatures</h1>;
  const Rapport = () => <h1 id="page_etudiant_rapport" className="text-center mt-50 text-5xl">Mon rapport</h1>;
  const ProfileEtudiant = () => <h1 id="page_etudiant_profile" className="text-center mt-50 text-5xl">Profil</h1>;

  const DashboardEntreprise = () => <h1 id="page_entreprise_dashboard" className="text-center mt-50 text-5xl">Entreprise Dashboard</h1>;
  const MesOffres = () => <h1 id="page_entreprise_offres" className="text-center mt-50 text-5xl">Mes offres</h1>;
  const CreateOffre = () => <h1 id="page_entreprise_create_offre" className="text-center mt-50 text-5xl">Create Offre</h1>;
  const ProfileEntreprise = () => <h1 id="page_entreprise_profile" className="text-center mt-50 text-5xl">Profil</h1>;

  const DashboardAdmin = () => <h1 id="page_admin_dashboard" className="text-center mt-50 text-5xl">Admin Dashboard</h1>;
  const Users = () => <h1 id="page_admin_users" className="text-center mt-50 text-5xl">Utilisateurs</h1>;
  const Entreprises = () => <h1 id="page_admin_entreprises" className="text-center mt-50 text-5xl">Entreprises</h1>;
  const Offres = () => <h1 id="page_admin_offres" className="text-center mt-50 text-5xl">Offres</h1>;
  const Rapports = () => <h1 id="page_admin_rapports" className="text-center mt-50 text-5xl">Rapports</h1>;

  return (
    <BrowserRouter>
      <Routes id="routes_container">

        <Route id="route_login" path="/login" element={<Login />} />
        <Route id="route_register" path="/register" element={<Register />} />

        {/* !!! REDIRECTION TEMPORAIRE SELON ROLE (backend plus tard) */}
        <Route
          id="route_redirect_by_role"
          path="/"
          element={
            user.role === "etudiant" ? (
              <Navigate to="/etudiant/dashboard" />
            ) : user.role === "entreprise" ? (
              <Navigate to="/entreprise/dashboard" />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />

        {/* ETUDIANT */}
        <Route id="route_etudiant_layout" path="/etudiant" element={<DashboardLayout />}>
          <Route id="route_etudiant_dashboard" path="dashboard" element={<DashboardEtudiant />} />
          <Route id="route_etudiant_stages" path="stages" element={<Stages />} />
          <Route id="route_etudiant_candidatures" path="candidatures" element={<Candidatures />} />
          <Route id="route_etudiant_rapport" path="rapport" element={<Rapport />} />
          <Route id="route_etudiant_profile" path="profile" element={<ProfileEtudiant />} />
        </Route>

        {/* ENTREPRISE */}
        <Route id="route_entreprise_layout" path="/entreprise" element={<DashboardLayout />}>
          <Route id="route_entreprise_dashboard" path="dashboard" element={<DashboardEntreprise />} />
          <Route id="route_entreprise_offres" path="offres" element={<MesOffres />} />
          <Route id="route_entreprise_create_offre" path="create-offre" element={<CreateOffre />} />
          <Route id="route_entreprise_profile" path="profile" element={<ProfileEntreprise />} />
        </Route>

        {/* ADMIN */}
        <Route id="route_admin_layout" path="/admin" element={<DashboardLayout />}>
          <Route id="route_admin_dashboard" path="dashboard" element={<DashboardAdmin />} />
          <Route id="route_admin_users" path="users" element={<Users />} />
          <Route id="route_admin_entreprises" path="entreprises" element={<Entreprises />} />
          <Route id="route_admin_offres" path="offres" element={<Offres />} />
          <Route id="route_admin_rapports" path="rapports" element={<Rapports />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;