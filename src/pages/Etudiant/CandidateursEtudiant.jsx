import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import { Link } from "react-router-dom";
import { useState } from "react";

const CandidateursEtudiant = () => {

    const user = usersByRole.etudiant;
    const offres = OffresFake;

    const [activeFilter, setActiveFilter] = useState("Toutes");
    const filteredOffres = offres.filter((item) => {
        if (activeFilter === "Toutes") return true;
        if (activeFilter === "En attente") return item.status === "pending";
        if (activeFilter === "Accepté") return item.status === "accepted";
        if (activeFilter === "Refusé") return item.status === "rejected";
    });


    const menu = [
        { label: `Toutes (${offres.length})`, value: "Toutes" },
        { label: `En attente (${offres.filter(o => o.status === 'pending').length})`, value: "En attente" },
        { label: `Accepté (${offres.filter(o => o.status === 'accepted').length})`, value: "Accepté" },
        { label: `Refusé (${offres.filter(o => o.status === 'rejected').length})`, value: "Refusé" }
    ];
    const statusStyles = {
        pending: "bg-orange-100 text-orange-600 border border-orange-600",
        accepted: "bg-green-100 text-green-600 border border-green-600",
        rejected: "bg-red-100 text-red-600 border border-red-600",
    };


    const statusText = {
        pending: "En attente",
        accepted: "Accepté",
        rejected: "Refusé",
    };


    return (
        <div id="page_etudiant_stages" className="min-h-screen bg-slate-200/30">
            <header id="header_dashboard" className="p-7">
                <div id="header_text">
                    <h1 id="header_title" className="text-2xl font-[700]  text-slate-800 ">Mes Candidateurs</h1>
                    <p id="header_subtitle" className="text-gray-500 py-1 sm:text-[10px] md:text-[12px] lg:text-[14px]"> Suivez l'avancement de vos candidatures aux stages.</p>
                </div>
            </header>

            <section id="menu-candidateurs" className=" px-7 pb-7 ">
                <div className="w-full overflow-x-auto">
                    <div className="bg-gray-200/30 w-fit md:w-fit rounded-lg px-1">
                        <ul className="flex gap-2 whitespace-nowrap">
                            {menu.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setActiveFilter(item.value)} // ⚡ هنا المهم
                                        className={`font-semibold rounded-lg my-1 px-3 transition 
                                            ${activeFilter === item.value
                                                ? "bg-white text-black"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="candidateurs" className="w-full px-7 pb-7">
                <div id="recent_activity" className=" p-4 flex flex-col gap-3">
                    {filteredOffres.map((item, index) => (
                        <div
                            id={`activity_${item.id}`}
                            key={item.id}
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-4  transition duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >

                            {/* TOP */}
                            <div className="flex justify-between items-start">

                                {/* LEFT SIDE */}
                                <div className="flex gap-3">

                                    {/* ICON */}
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-300/70">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-blue-600 size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /> </svg>
                                    </div>

                                    {/* TEXT */}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800">
                                            {item.title}
                                        </span>

                                        <span className="text-xs font-semibold text-gray-500">
                                            {item.company}
                                        </span>

                                        <span className="text-[11px] text-gray-400 flex items-center mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /> </svg>
                                            Postulée le {item.datePostulation}
                                        </span>
                                    </div>

                                </div>

                                {/* RIGHT SIDE (STATUS) */}
                                <span className={`font-medium h-5 rounded-md text-[12px] px-3 ${statusStyles[item.status]}`}>
                                    {statusText[item.status]}
                                </span>

                            </div>

                        </div>
                    ))}

                </div>

            </section>
        </div>


    );
}

export default CandidateursEtudiant;