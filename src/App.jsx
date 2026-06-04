import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import DashboardLayout from "./layout/layoutDashbord";

import DashboardEtudiant from "./pages/Etudiant/DashboardEtudiant";
import StagesEtudiant from "./pages/Etudiant/StagesEtudiant";
import CandidateursEtudiant from "./pages/Etudiant/CandidateursEtudiant";
import RapportEtudiant from "./pages/Etudiant/RapportEtudiant";
import ProfileEtudiant from "./pages/Etudiant/ProfileEtudiant";

import DashboardEntreprise from "./pages/Entreprise/DashboardEntreprise";
import OffresEntreprise from "./pages/Entreprise/OffresEntreprise";
import CreateOffre from "./pages/Entreprise/CreateOffre";
import ProfileEntreprise from "./pages/Entreprise/ProfileEntreprise";

import DashboardAdmin from "./pages/Admin/Dashboard";

const AdminCompanies = () => <h1 className="text-center mt-50 text-5xl">Entreprises</h1>;
const AdminOffres = () => <h1 className="text-center mt-50 text-5xl">Offres</h1>;
const AdminRapports = () => <h1 className="text-center mt-50 text-5xl">Rapports</h1>;
const AdminUsers = () => <h1 className="text-center mt-50 text-5xl">Utilisateurs</h1>;

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" />;
  return children;
};

const RoleRedirect = () => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role === "student") return <Navigate to="/etudiant/dashboard" />;
  if (role === "company") return <Navigate to="/entreprise/dashboard" />;
  if (role === "admin") return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<RoleRedirect />} />

          {/* ETUDIANT */}
          <Route path="/etudiant" element={
            <PrivateRoute allowedRole="student"><DashboardLayout /></PrivateRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardEtudiant />} />
            <Route path="stages" element={<StagesEtudiant />} />
            <Route path="candidatures" element={<CandidateursEtudiant />} />
            <Route path="rapport" element={<RapportEtudiant />} />
            <Route path="profile" element={<ProfileEtudiant />} />
          </Route>

          {/* ENTREPRISE */}
          <Route path="/entreprise" element={
            <PrivateRoute allowedRole="company"><DashboardLayout /></PrivateRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardEntreprise />} />
            <Route path="offres" element={<OffresEntreprise />} />
            <Route path="CreateOffre" element={<CreateOffre />} />
            <Route path="profile" element={<ProfileEntreprise />} />
          </Route>

          {/* ADMIN */}
          <Route path="/admin" element={
            <PrivateRoute allowedRole="admin"><DashboardLayout /></PrivateRoute>
          }>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardAdmin />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="entreprises" element={<AdminCompanies />} />
            <Route path="offres" element={<AdminOffres />} />
            <Route path="rapports" element={<AdminRapports />} />
          </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
