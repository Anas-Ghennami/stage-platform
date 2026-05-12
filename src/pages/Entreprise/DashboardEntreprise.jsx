import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import { Link, useNavigate } from "react-router-dom";

const DashboardEntreprise = () => {
    const user = usersByRole.entreprise;
    const offres = OffresFake;


    const statusStyles = {
        pending: "bg-orange-100 text-orange-600 border border-orange-600",
        active: "bg-green-100 text-green-600 border border-green-600",
        accepted: "bg-green-100 text-green-600 border border-green-600",
        rejected: "bg-red-100 text-red-600 border border-red-600",
    };

    const statusText = {
        pending: "En attente",
        active: "Publiée",
        accepted: "Accepté",
        rejected: "Refusé",
    };



    return (

        <div id="page_etudiant_dashboard" className="min-h-screen bg-slate-200/30">
            {/* responsive */}
            <header id="header_dashboard" className="p-7">
                <div id="header_text" className="flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-[700] text-slate-800">
                            Bienvenue, {user.name}
                        </h1>

                        <p className="text-gray-500 text-sm">
                            Pilotez vos offres et candidatures.
                        </p>
                    </div>

                    <Link
                        to="/entreprise/CreateOffre"
                        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        + Nouvelle offre
                    </Link>

                </div>
            </header>

            <section id="cards_dashboard" className="">

                {/* <!-- component --> */}
                <div id="cards" className="flex text-gray-800">
                    <div id="cards_container" className="px-7 py-0 w-full">
                        <div id="cards_grid" className="grid grid-cols-12 gap-4">

                            <div id="cards_candidate" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                                <div id="cards_candidate_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                                    <div id="icon_candidate" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-600">
                                        <svg id="svg_candidate" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>
                                    </div>
                                    <div id="content_candidate" className="flex flex-col flexGrow ml-4">
                                        <div id="title_offreActive" className="text-sm text-gray-500">OFFRES ACTIVES</div>
                                        <div id="number_offreActive" className="font-bold text-2xl ">{offres.filter(item => item.offerStatus === "active").length}</div>
                                    </div>
                                </div>
                            </div>

                            <div id="cards_pending" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                                <div id="cards_pending_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                                    <div id="icon_pending" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-600">
                                        <svg id="svg_pending" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    </div>
                                    <div id="content_pending" className="flex flex-col flexGrow ml-4">
                                        <div id="title_pending" className="text-sm text-gray-500">OFFRES À TRAITER</div>
                                        <div id="number_pending" className="font-bold text-2xl">{offres.filter(item => item.offerStatus === "pending").length}</div>
                                    </div>
                                </div>
                            </div>


                            <div id="cards_accepted" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                                <div id="cards_accepted_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                                    <div id="icon_accepted" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>
                                    </div>
                                    <div id="content_accepted" className="flex flex-col flexGrow ml-4 ">
                                        <div id="title_accepted" className="text-sm text-gray-500">CANDIDATEURS ACCPEPTES</div>
                                        <div id="number_accepted" className="font-bold text-2xl"><div id="number_accepted" className="font-bold text-2xl">{offres.flatMap((offre) => offre.candidateurs?.filter((cand) => cand.candidatureStatus === "accepted")).length}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div id="cards_pending" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                                <div id="cards_pending_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                                    <div id="icon_pending" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-600">
                                        <svg id="svg_pending" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                    </div>
                                    <div id="content_rejected" className="flex flex-col flexGrow ml-4">
                                        <div id="title_rejected" className="text-sm text-gray-500">CANDIDATEURS EN ATTENTE</div>
                                        <div id="number_rejected" className="font-bold text-2xl">{offres.flatMap((offre) => offre.candidateurs?.filter((cand) => cand.candidatureStatus === "pending")).length}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cards-stages" className="w-full px-6 py-6">

                <div id="cards-stages-inner" className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* LEFT SIDE (50%) */}
                    <div id="cards-stages-left" className="bg-white rounded-xl shadow p-4 lg:col-span-2 flex flex-col  gap-4">

                        <div id="cards-stages-left-title" className="flex flex-row justify-between">
                            <div id="cards-stages-left-title-inner" className="">
                                {/* TITLE */}
                                <h2 id="cards-stages-left-title-inner-title" className="  text-xl font-[600]  text-slate-800 ">
                                    Offres récentes
                                </h2>
                            </div>

                            <div id="cards-stages-left-link" className=" mr-4 mt-1 cursor-pointer">
                                {/* TITLE */}
                                <h6 id="cards-stages-left-link-inner" className="text-sm   text-slate-800 ">
                                    <Link id="cards-stages-left-link-inner-titel" to="/etudiant/stages" className="flex justify-between  animate-pulse hover:bg-gray-200 hover:animate-none px-2 font-medium rounded-lg duration-300 ">
                                        Tout voir
                                        <svg id="svg-link" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" mx-2 size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </h6>
                            </div>
                        </div>



                        {/* Offres récentes */}
                        <div id="cards-stages-left-cards" className="grid grid-cols-1 md:grid-cols-1 w-full gap-3">

                            {offres.slice(-5).map((item) => (
                                <div
                                    id={`activity_${item.id}`}
                                    key={item.id}
                                    className="border-b border-gray-200 py-1 mx-2"
                                >

                                    <div id={`activity_top_${item.id}`}>

                                        <div id={`activity_top_left_${item.id}`} className="flex flex-col">

                                            <div id={`activity_top_left_logo_${item.id}`} className="flex justify-between">

                                                <div id={`activity_top_left_logo_icon_${item.id}`}>

                                                    <span
                                                        id={`activity_top_left_title_${item.id}`}
                                                        className="flex flex-row text-sm font-semibold text-gray-800"
                                                    >
                                                        {item.title}
                                                    </span>

                                                </div>

                                                <div id={`activity_top_left_logo_status_${item.id}`}>

                                                    <span
                                                        id={`activity_top_left_logo_status_text_${item.id}`}
                                                        className={`font-medium h-5 rounded-md text-[12px] px-3 ${statusStyles[item.offerStatus]}`}
                                                    >
                                                        {statusText[item.offerStatus]}
                                                    </span>

                                                </div>

                                            </div>

                                            <span
                                                id={`activity_top_left_date_${item.id}`}
                                                className="text-[11px] text-gray-400 flex"
                                            >
                                                {item.location} / {item.candidatures?.length || 0} candidatures
                                            </span>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    </div>

                    {/* RIGHT SIDE (50%) */}
                    <div id="right_side" className="lg:col-span-2 flex flex-col gap-3 ">

                        <div id="recent_activity" className="bg-white rounded-xl shadow px-4 py-3 flex flex-col gap-3">

                            <h2 id="recent_activity_title" className="text-xl font-semibold text-gray-800 mb-1">
                                Dernières candidatures
                            </h2>

                            {/* candidateurs récentes */}
                            {offres
                                .flatMap((item) => item.candidatures || [])
                                .slice(-5)
                                .map((candidat) => (

                                    <div
                                        key={candidat.id}
                                        className="border-b border-gray-200 py-1 mx-2"
                                    >

                                        <div className="flex flex-col">

                                            <div className="flex justify-between">

                                                <span className="text-sm font-semibold text-gray-800">
                                                    {candidat.name}
                                                </span>

                                                <span
                                                    className={`font-medium h-5 rounded-md text-[12px] px-3 ${statusStyles[candidat.candidatureStatus]}`}
                                                >
                                                    {statusText[candidat.candidatureStatus]}
                                                </span>

                                            </div>

                                            <span className="text-[11px] text-gray-400 mt-1 flex">
                                                {candidat.descri}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                        </div>
                    </div>


                </div>

            </section>

        </div>


    );
};

export default DashboardEntreprise;