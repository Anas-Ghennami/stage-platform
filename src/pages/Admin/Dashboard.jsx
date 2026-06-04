import { useEffect, useState } from "react";
import api from "../../api/axios";

const StatCard = ({ label, value, color }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${color}`}>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-3xl font-bold text-gray-800 mt-1">{value ?? "..."}</p>
  </div>
);

const DashboardAdmin = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const [companies, offers, reports] = await Promise.all([
          api.get("/accounts/admin/companies/?status=pending"),
          api.get("/offers/pending/?status=pending"),
          api.get("/applications/reports/all/?status=pending"),
        ]);
        setStats({
          pendingCompanies: companies.data.count,
          pendingOffers: offers.data.count,
          pendingReports: reports.data.count,
        });
      } catch (_) {}
    };
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Tableau de bord</h1>
      <p className="text-gray-500 mb-8">Vue d'ensemble de la plateforme</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Entreprises en attente" value={stats.pendingCompanies} color="border-yellow-400" />
        <StatCard label="Offres en attente" value={stats.pendingOffers} color="border-blue-400" />
        <StatCard label="Rapports en attente" value={stats.pendingReports} color="border-green-400" />
      </div>
    </div>
  );
};

export default DashboardAdmin;
