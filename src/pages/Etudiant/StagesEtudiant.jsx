import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import React from "react";
import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";

const StagesEtudiant = () => {
    const user = usersByRole.etudiant;
    const offres = OffresFake;


    const [openDomaine, setOpenDomaine] = useState(false);
    const [openVille, setOpenVille] = useState(false);
    const [openType, setOpenType] = useState(false);

    const [selectedDomaine, setSelectedDomaine] = useState("Tous les domaines");
    const [selectedVille, setSelectedVille] = useState("Toutes les villes");
    const [selectedType, setSelectedType] = useState("Tous les types");

    const domaines = ["Tous les domaines", "Software", "Design", "Data"];
    const villes = ["Toutes les villes", "Meknes", "Rabat", "Casablanca"];
    const types = ["Tous les types", "Stage", "Temps plein"];



    return (
        <div id="page_etudiant_stages" className="min-h-screen bg-slate-200/30">
            <header id="header_dashboard" className="p-7 ">
                <div id="header_text">
                    <h1 id="header_title" className="text-2xl font-[700]  text-slate-800 ">Stages disponibles</h1>
                    <p id="header_subtitle" className="text-gray-500 py-1 sm:text-[10px] md:text-[12px] lg:text-[14px]"> {offres.length} offres correspondant à votre recherche.</p>
                </div>
            </header>

            <section id="search_section" className="w-full px-7 pb-7">

                <div id="search_container" className="flex flex-col lg:flex-row gap-4">

                    {/* 🔍 INPUT */}
                    <div
                        id="search_input_wrapper"
                        className="flex items-center w-full lg:w-[400px] text-sm  border border-gray-200 rounded-lg px-4 py-2 bg-white shadow-sm transition focus:outline-none focus-within:ring-1 focus-within:ring-blue-500 ">

                        <svg id="search_icon" className="size-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <input
                            id="search_input"
                            type="text"
                            placeholder="Titre, entreprise, compétence..."
                            className="w-full outline-none"
                        />
                    </div>

                    {/* 🔽 FUNCTION COMPONENT */}
                    {[
                        {
                            open: openDomaine,
                            setOpen: setOpenDomaine,
                            selected: selectedDomaine,
                            setSelected: setSelectedDomaine,
                            data: domaines,
                            name: "domaine"
                        },
                        {
                            open: openVille,
                            setOpen: setOpenVille,
                            selected: selectedVille,
                            setSelected: setSelectedVille,
                            data: villes,
                            name: "ville"
                        },
                        {
                            open: openType,
                            setOpen: setOpenType,
                            selected: selectedType,
                            setSelected: setSelectedType,
                            data: types,
                            name: "type"
                        }
                    ].map((select, i) => (

                        <div id={`select_${select.name}_wrapper`} key={i} className="relative w-[230px]">

                            {/* BUTTON */}
                            <div
                                id={`select_${select.name}_button`}
                                tabIndex={0}
                                onClick={() => select.setOpen(!select.open)}
                                className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-2 bg-white cursor-pointer shadow-sm transition focus:outline-none focus:ring-1 focus:ring-blue-500 "
                            >
                                <span id={`select_${select.name}_label`} className="text-sm text-gray-700">
                                    {select.selected}
                                </span>

                                <svg id={`select_${select.name}_icon`} className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* DROPDOWN */}
                            {select.open && (
                                <div id={`select_${select.name}_dropdown`} className="absolute mt-2 w-full bg-white rounded-xl shadow-lg p-1 z-50 ">

                                    {select.data.map((option, index) => (
                                        <div
                                            id={`select_${select.name}_option_${index}`}
                                            key={index}
                                            onClick={() => {
                                                select.setSelected(option);
                                                select.setOpen(false);
                                            }}
                                            className={`px-4 py-1 my-1 rounded-lg text-sm cursor-pointer transition 
                                        ${select.selected === option
                                                    ? " bg-green-800 text-white"
                                                    : "hover:bg-green-800/20 "
                                                }`}
                                        >
                                            {option}
                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>

                    ))}

                </div>

            </section>

            <section id="offres" className="px-7">
                <div id="cards-offres" className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">

                    {offres.map((item) => (
                        <div
                            id={`cards_item_${item.id}`}
                            key={item.id}
                            className="bg-white rounded-xl min-h-[280px] shadow p-4 flex flex-col group hover:drop-shadow-lg hover:bg-gray-100 transition duration-500"
                        >

                            {/* TOP */}
                            <div id={`card_top_${item.id}`} className="flex justify-between">
                                <div id={`logo_icon_${item.id}`} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30">
                                    <svg id={`svg_logo_${item.id}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-blue-600 size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                                    </svg>
                                </div>

                                <p id={`formation_${item.id}`} className="font-medium text-gray-700 bg-gray-200/50 h-5 rounded-xl text-[12px] px-3">
                                    {item.formation}
                                </p>
                            </div>

                            {/* TITLE */}
                            <h3 id={`title_${item.id}`} className="font-semibold text-[16px] mt-4 group-hover:text-blue-600 transition">
                                {item.title}
                            </h3>

                            <p id={`company_${item.id}`} className="text-xs font-semibold text-gray-500 mb-3">
                                {item.company}
                            </p>

                            <span id={`description_${item.id}`} className="text-sm text-gray-500">
                                {item.description}
                            </span>

                            <div id={`competences_${item.id}`} className="flex flex-wrap gap-2 mt-2">
                                {item.competences.map((comp, index) => (
                                    <span
                                        id={`competence_${item.id}_${index}`}
                                        key={index}
                                        className="text-xs font-medium bg-gray-100 text-gray-600 px-3 h-5 rounded-full"
                                    >
                                        {comp}
                                    </span>
                                ))}
                            </div>

                            {/* INFOS */}
                            <div id={`infos_${item.id}`} className="grid grid-cols-2 gap-3 mt-3 text-[10px] font-semibold text-gray-500">

                                <div id={`location_${item.id}`} className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /> </svg>
                                    {item.location}
                                </div>

                                <div id={`duration_${item.id}`} className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>
                                    {item.duration}
                                </div>

                                <div id={`date_${item.id}`} className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /> </svg>
                                    {item.type}
                                </div>

                                <div id={`date_${item.id}`} className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /> </svg>
                                    {item.dateLimite}
                                </div>
                            </div>

                            {/* Button Poustelr */}

                            <div id="postuler-offre" className="flex mt-auto">
                                <button id={`postuler_${item.id}`} type="button" onClick={() => handlePostuler(item.id)} className="bg-blue-700 hover:bg-blue-800 text-white w-full py-2  mx-1 mt-5 rounded-md">Postuler</button>
                            </div>

                        </div>
                    ))}

                </div>
            </section>

        </div >
    )

}

export default StagesEtudiant;