import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import RapportEtud from "../../DonneesUserFake/RapportEtud";
import { Link } from "react-router-dom";
import { useState } from "react";

const RapportEtudiant = () => {
    const [Titel_rapport, setTitel_rapport] = useState("");


    const user = usersByRole.etudiant;
    const rapport = RapportEtud;

    const statusStyles = {
        submitted: "bg-blue-100 text-blue-800 border border-blue-800",
        evaluated: "bg-purple-100 text-purple-800 border border-purple-800",
        draft: "bg-gray-200 text-gray-800 border border-gray-800",
    };

    const statusText = {
        submitted: "Soumis",
        evaluated: "Évalué",
        draft: "Brouillon",
    };

    return (
        <div id="page_etudiant_stages" className="h-screen bg-slate-200/30">
            <header id="header_dashboard" className="p-7">
                <div id="header_text">
                    <h1 id="header_title" className="text-2xl font-[700]  text-slate-800 ">Mon rapport de stage</h1>
                    <p id="header_subtitle" className="text-gray-500 py-1 sm:text-[10px] md:text-[12px] lg:text-[14px]"> Soumettez votre rapport et suivez son évaluation.</p>
                </div>
            </header>

            <section className="grid grid-cols-1 px-7 lg:grid-cols-9 gap-4 ">

                {/* LEFT SIDE (75%) */}
                <form
                    id="cards-stages-left"
                    className="lg:col-span-6 flex flex-col gap-2 bg-white rounded-xl shadow p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log("submit"); // دابا غير test
                    }}
                >

                    {/* TITLE */}
                    <div id="card_rapport_title">
                        <h2
                            id="cards-stages-left-title-inner-title"
                            className="text-[15px] font-medium text-slate-800 "
                        >
                            Soumettre un nouveau rapport
                        </h2>
                    </div>

                    {/* INPUT TITRE */}
                    <div id="input_titre_container" className="px-4 flex flex-col gap-2">
                        <label
                            id="label_titre_rapport"
                            className="text-sm font-medium text-gray-700"
                            htmlFor="Titel_rapport"
                        >
                            Titre du rapport
                        </label>

                        <div id="input_titre_wrapper" className="relative">
                            <input
                                id="Titel_rapport"
                                name="Titel_rapport"
                                type="text"
                                value={Titel_rapport}
                                onChange={(e) => setTitel_rapport(e.target.value)}
                                placeholder="Ex: Rapport stage React"
                                className="w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* INPUT RESUME */}
                    <div id="input_resume_container" className=" px-4 flex flex-col gap-2">
                        <label
                            id="label_resume"
                            className="text-sm font-medium text-gray-700"
                            htmlFor="resume"
                        >
                            Résumé
                        </label>

                        <textarea
                            id="resume"
                            name="resume"
                            rows="4"
                            placeholder="Décrivez brièvement votre rapport..."
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* INPUT FILE PDF */}
                    <div id="input_file_container" className="px-4  flex flex-col gap-2">
                        <label
                            id="label_file"
                            className="text-sm font-medium text-gray-700"
                            htmlFor="file_pdf"
                        >
                            Ajouter le rapport (PDF)
                        </label>

                        <div class="flex items-center justify-center w-full ">
                            <label htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center 
                                        w-full h-45 border border-dashed border-gray-400 
                                        rounded-lg cursor-pointer hover:bg-gray-100
                                        focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500 transition">
                                <div className="flex flex-col items-center text-gray-500/70 justify-center text-body pt-5 pb-6 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 font-semibold">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <p class="mb-2 text-sm"><span class="font-semibold">Glissez-déposez votre fichier ou cliquez</span></p>
                                    <p class="text-xs">PDF ou DOCX, max 10 Mo</p>
                                </div>
                                <input id="dropzone-file" type="file" class="sr-only" />
                            </label>
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div id="submit_button_container" className=" p-4">
                        <button
                            id="submit_rapport"
                            type="submit"
                            className="w-full bg-blue-700 hover:bg-blue-800 text-white/90 text-sm font-semibold px-6 py-2 rounded-md transition"
                        >
                            Soumettre le rapport
                        </button>
                    </div>

                </form>

                {/* RIGHT SIDE (25%) */}
                <div id="right_side" className="lg:col-span-3 flex flex-col gap-4">

                    <div id="recent_activity" className="bg-white rounded-xl shadow p-4">
                        <h2 id="cards-stages-left-title-inner-title" className="text-[15px] font-medium text-slate-800  px-1 flex ">
                            Historique
                        </h2>

                        <div id="recent_activity" className=" p-4 flex flex-col gap-3">
                            {rapport.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm border border-gray-200"
                                >
                                    <div className="flex gap-3">



                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg>
                                        </div>

                                        <div className="flex flex-col ">
                                            <span className="text-sm font-semibold text-gray-800 w-45">
                                                {item.title}
                                            </span>


                                            <span className="text-[11px] text-gray-500 flex items-center mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /> </svg>
                                                {item.date}
                                            </span>
                                        </div>

                                    </div>

                                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${statusStyles[item.status]}`}>
                                        {statusText[item.status]}
                                    </span>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default RapportEtudiant;