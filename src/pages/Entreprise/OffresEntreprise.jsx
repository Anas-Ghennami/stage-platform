import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import { Link } from "react-router-dom";
import { useState } from "react";
const OffresEntreprise = () => {

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


    const [openCandidates, setOpenCandidates] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);


    // pour accetpte ou refuser un candidateur
    const [candidatures, setCandidatures] = useState(OffresFake);

    const updateStatus = (offerId, candidatId, newStatus) => {

        const updated = candidatures.map((offer) => {

            if (offer.id === offerId) {

                return {
                    ...offer,

                    candidatures: offer.candidatures.map((candidat) =>

                        candidat.id === candidatId
                            ? { ...candidat, candidatureStatus: newStatus }
                            : candidat
                    )
                };
            }

            return offer;
        });

        setCandidatures(updated);

        // bach tb9a selectedOffer updated
        const updatedOffer = updated.find((offer) => offer.id === offerId);
        setSelectedOffer(updatedOffer);
    };


    // pour editer une offre ou deleter 
    const [offers, setOffers] = useState(OffresFake);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedEditOffer, setSelectedEditOffer] = useState(null);




    return (

        <div id="page_etudiant_dashboard" className="min-h-screen bg-slate-200/30">
            {/* responsive */}
            <header id="header_dashboard" className="p-7">
                <div id="header_text" className="flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-[700] text-slate-800">
                            Mes offres de stage
                        </h1>

                        <p className="text-gray-500 text-sm">
                            {offres.filter(item => item.offerStatus === "pending" || "active").length} offres publiées ou en attente.
                        </p>
                    </div>

                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md">
                        + Nouvelle offre
                    </button>

                </div>
            </header>

            <section className="p-7">
                {/* CARD EXAMPLE */}

                <div id="cards-stages-left-cards" className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

                    {offres.map((item) => (
                        <div
                            id={`cards_item_${item.id}`}
                            key={item.id}
                            className="bg-white rounded-xl min-h-[200px] shadow p-4 group hover:drop-shadow-lg hover:bg-gray-100 transition duration-500"
                        >

                            {/* TOP */}
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



                            <p id={`company_${item.id}`} className="text-xs font-semibold text-gray-500 mb-3">
                                {item.formation}
                            </p>


                            <div id={`competences_${item.id}`} className="flex flex-wrap gap-2 mt-2">
                                {/* INFOS */}
                                <div id={`infos_${item.id}`} className=" flex flex-row gap-3 mt-3 text-[10px] font-semibold text-gray-500">

                                    <div id={`location_${item.id}`} className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /> </svg>
                                        {item.location}
                                    </div>

                                    <div id={`duration_${item.id}`} className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>
                                        {item.duration}
                                    </div>

                                    <div id={`date_${item.id}`} className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /> </svg>
                                        {item.type}
                                    </div>

                                    <div id={`date_${item.id}`} className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 mr-2"> <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /> </svg>
                                        {item.dateLimite}
                                    </div>
                                </div>

                            </div>
                            <div className=" flex gap-3 mt-3 text-[10px] font-semibold text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-1">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                {item.candidatures?.length || 0} Candidateurs
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center justify-between mt-5">

                                {/* LEFT BUTTON */}
                                <button
                                    onClick={() => {
                                        setSelectedOffer(item);
                                        setOpenCandidates(true);
                                    }}
                                    className="flex items-center gap-2 text-[12px] font-medium bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md"
                                >
                                    Candidateurs

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </button>

                                {/* RIGHT BUTTONS */}
                                <div className="flex items-center gap-2">

                                    {/* EDIT */}
                                    <button
                                        onClick={() => {
                                            setSelectedEditOffer(item);
                                            setOpenEditModal(true);
                                        }}
                                        className="p-2 rounded-lg border border-gray-200 hover:bg-blue-100 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-4 text-blue-700"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                                            />
                                        </svg>
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => {
                                            const confirmDelete = window.confirm(
                                                "Voulez-vous supprimer cette offre ?"
                                            );

                                            if (confirmDelete) {
                                                setOffers(
                                                    offers.filter((offer) => offer.id !== item.id)
                                                );
                                            }
                                        }}
                                        className="p-2 rounded-lg border border-red-200 hover:bg-red-100 transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-4 text-red-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M19.228 5.79 18.16 19.673A2.25 2.25 0 0 1 15.916 21.75H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </button>

                                </div>

                            </div>



                        </div>
                    ))}


                    {/* B999999999999999999999999999iiiiiiiiiiiiiiiiiiiiiiittttttttttttttttttttt hna*/}

                    {/* Pour editer ou supprimer un offre */}
                    {openEditModal && selectedEditOffer && (

                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">

                                {/* CLOSE */}
                                <button
                                    onClick={() => setOpenEditModal(false)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                >
                                    ✕
                                </button>

                                {/* TITLE */}
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Modifier l'offre
                                </h2>

                                {/* FORM */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    {/* TITLE */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Titre
                                        </label>

                                        <input
                                            type="text"
                                            value={selectedEditOffer.title}
                                            onChange={(e) =>
                                                setSelectedEditOffer({
                                                    ...selectedEditOffer,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* FORMATION */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Formation
                                        </label>

                                        <input
                                            type="text"
                                            value={selectedEditOffer.formation}
                                            onChange={(e) =>
                                                setSelectedEditOffer({
                                                    ...selectedEditOffer,
                                                    formation: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* LOCATION */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Localisation
                                        </label>

                                        <input
                                            type="text"
                                            value={selectedEditOffer.location}
                                            onChange={(e) =>
                                                setSelectedEditOffer({
                                                    ...selectedEditOffer,
                                                    location: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* DURATION */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Durée
                                        </label>

                                        <input
                                            type="text"
                                            value={selectedEditOffer.duration}
                                            onChange={(e) =>
                                                setSelectedEditOffer({
                                                    ...selectedEditOffer,
                                                    duration: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* TYPE */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Type
                                        </label>

                                        <input
                                            type="text"
                                            value={selectedEditOffer.type}
                                            onChange={(e) =>
                                                setSelectedEditOffer({
                                                    ...selectedEditOffer,
                                                    type: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* DATE */}
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Date limite
                                        </label>

                                        <input
                                            type="text"
                                            value={selectedEditOffer.dateLimite}
                                            onChange={(e) =>
                                                setSelectedEditOffer({
                                                    ...selectedEditOffer,
                                                    dateLimite: e.target.value,
                                                })
                                            }
                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>

                                </div>

                                {/* DESCRIPTION */}
                                <div className="mt-5">

                                    <label className="text-sm font-medium text-gray-600">
                                        Description
                                    </label>

                                    <textarea
                                        rows="4"
                                        value={selectedEditOffer.description}
                                        onChange={(e) =>
                                            setSelectedEditOffer({
                                                ...selectedEditOffer,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />

                                </div>

                                {/* BUTTONS */}
                                <div className="flex justify-end gap-3 mt-6">

                                    <button
                                        onClick={() => setOpenEditModal(false)}
                                        className="px-5 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
                                    >
                                        Annuler
                                    </button>

                                    <button
                                        onClick={() => {

                                            setOffers(
                                                offers.map((offer) =>
                                                    offer.id === selectedEditOffer.id
                                                        ? selectedEditOffer
                                                        : offer
                                                )
                                            );

                                            setOpenEditModal(false);
                                        }}
                                        className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-medium"
                                    >
                                        Enregistrer
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}




                    {/* MODAL CANDIDATEURS */}

                    {openCandidates && selectedOffer && (
                        <>
                            {/* // pour afficher les candidateurs d'une offre */}
                            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                                <div className="bg-white w-[95%] max-w-6xl h-[70vh] rounded-2xl shadow-xl p-6 relative overflow-y-auto">

                                    {/* CLOSE */}
                                    <button
                                        onClick={() => setOpenCandidates(false)}
                                        className="absolute top-3 right-3 text-gray-500 hover:text-black"
                                    >
                                        ✕
                                    </button>

                                    {/* TITLE */}
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                        Liste des candidateurs
                                    </h2>

                                    {/* IF EMPTY */}
                                    {!selectedOffer?.candidatures ||
                                        selectedOffer.candidatures.length === 0 ? (

                                        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400 text-center">

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-14 mb-3"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M18 18.72a9.094 9.094 0 0 0 3.742-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.035.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.204-.576-5.96-1.584A6.062 6.062 0 0 1 6 18.75m12-6.75a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Zm-9 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                                                />
                                            </svg>

                                            <p className="text-sm font-medium">
                                                Aucun candidat pour cette offre
                                            </p>

                                        </div>

                                    ) : (

                                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">

                                            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">

                                                {selectedOffer?.candidatures?.map((candidat) => (

                                                    <div
                                                        key={candidat.id}
                                                        className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between shadow-sm"
                                                    >

                                                        {/* LEFT */}
                                                        <div className="flex items-start gap-4">

                                                            {/* AVATAR */}
                                                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                                                {candidat.name.charAt(0)}
                                                            </div>

                                                            {/* INFOS */}
                                                            <div className="flex flex-col gap-2">

                                                                {/* NAME + STATUS */}
                                                                <div className="flex items-center gap-3">

                                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                                        {candidat.name}
                                                                    </h3>

                                                                    <span
                                                                        className={`text-[12px] px-3 py-1 rounded-full font-medium border ${statusStyles[candidat.candidatureStatus]}`}
                                                                    >
                                                                        {statusText[candidat.candidatureStatus]}
                                                                    </span>

                                                                </div>

                                                                {/* EMAIL + DATE */}
                                                                <div className="flex items-center gap-5 text-sm text-gray-500">

                                                                    <div className="flex items-center gap-1">

                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            strokeWidth="1.5"
                                                                            stroke="currentColor"
                                                                            className="size-4"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0-8.69 5.52a2.25 2.25 0 0 1-2.12 0L2.25 6.75"
                                                                            />
                                                                        </svg>

                                                                        {candidat.email}

                                                                    </div>

                                                                    <div className="flex items-center gap-1">

                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            strokeWidth="1.5"
                                                                            stroke="currentColor"
                                                                            className="size-4"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 5.25h15A1.5 1.5 0 0 1 21 6.75v12A1.5 1.5 0 0 1 19.5 20.25h-15A1.5 1.5 0 0 1 3 18.75v-12A1.5 1.5 0 0 1 4.5 5.25Z"
                                                                            />
                                                                        </svg>

                                                                        {candidat.datePostulation}

                                                                    </div>

                                                                </div>

                                                                {/* DESCRIPTION */}
                                                                <p className="text-gray-500 text-sm">
                                                                    {candidat.descri}
                                                                </p>

                                                            </div>

                                                        </div>

                                                        {/* RIGHT BUTTONS */}
                                                        <div className="flex flex-col items-end gap-2">

                                                            {/* ACCEPT */}
                                                            <button
                                                                disabled={candidat.candidatureStatus !== "pending"}
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        selectedOffer.id,
                                                                        candidat.id,
                                                                        "accepted"
                                                                    )
                                                                }
                                                                className={`flex items-center border px-4 py-1 rounded-xl text-sm font-medium transition w-full min-w-[100px]

                                                                    ${candidat.candidatureStatus !== "pending"
                                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                                        : "bg-green-800/90 hover:bg-green-900/90 text-white"
                                                                    }
                                                                `}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.5"
                                                                    stroke="currentColor"
                                                                    className="size-5 mr-2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="m4.5 12.75 6 6 9-13.5"
                                                                    />
                                                                </svg>

                                                                Accepter
                                                            </button>

                                                            {/* REFUSE */}
                                                            <button
                                                                disabled={candidat.candidatureStatus !== "pending"}
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        selectedOffer.id,
                                                                        candidat.id,
                                                                        "rejected"
                                                                    )
                                                                }
                                                                className={`flex items-center border px-4 py-1 rounded-xl text-sm font-medium transition w-full min-w-[100px]

                                                                    ${candidat.candidatureStatus !== "pending"
                                                                        ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                                                                        : "border-red-300 hover:bg-red-50 text-red-600"
                                                                    }
                                                                `}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.5"
                                                                    stroke="currentColor"
                                                                    className="size-5 mr-2"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M6 18 18 6M6 6l12 12"
                                                                    />
                                                                </svg>

                                                                Refuser
                                                            </button>

                                                        </div>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                    )}

                                </div>

                            </div>


                        </>
                    )}

                </div>
            </section >

        </div >



    )
}

export default OffresEntreprise;