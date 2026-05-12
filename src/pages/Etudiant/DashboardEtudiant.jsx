import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import { Link } from "react-router-dom";

const DashboardEtudiant = () => {
  const user = usersByRole.etudiant;
  const offres = OffresFake;


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

    <div id="page_etudiant_dashboard" className="min-h-screen bg-slate-200/30">
      {/* responsive */}
      <header id="header_dashboard" className="p-7">
        <div id="header_text">
          <h1 id="header_title" className="text-2xl font-[700]  text-slate-800 ">Bonjour, {user.name}</h1>
          <p id="header_subtitle" className="text-gray-500 py-1 sm:text-[10px] md:text-[12px] lg:text-[14px]">Voici un aperçu de votre recherche de stage.</p>
        </div>
      </header>

      <section id="cards_dashboard"  className="">

        {/* <!-- component --> */}
        <div id="cards"  className="flex text-gray-800">
          <div id="cards_container"  className="px-7 py-0 w-full">
            <div id="cards_grid"  className="grid grid-cols-12 gap-4">

              <div   id="cards_candidate" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                <div id="cards_candidate_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                  <div id="icon_candidate" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-600">
                    <svg id="svg_candidate" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>
                  </div>
                  <div id="content_candidate" className="flex flex-col flexGrow ml-4">
                    <div id="title_candidate" className="text-sm text-gray-500">CANDIDATEURS</div>
                    <div id="number_candidate" className="font-bold text-2xl ">{offres.length}</div>
                  </div>
                </div>
              </div>

              <div id="cards_pending" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                <div id="cards_pending_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                  <div id="icon_pending" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-600">
                    <svg id="svg_pending" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div id="content_pending" className="flex flex-col flexGrow ml-4">
                    <div id="title_pending" className="text-sm text-gray-500">EN ATTENTE</div>
                    <div id="number_pending" className="font-bold text-2xl">{offres.filter(item => item.status === "pending").length}</div>
                  </div>
                </div>
              </div>

              <div id="cards_accepted" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                <div id="cards_accepted_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                  <div id="icon_accepted" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-600">
                    <svg id="svg_accepted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div id="content_accepted" className="flex flex-col flexGrow ml-4 ">
                    <div id="title_accepted" className="text-sm text-gray-500">ACCEPTEES</div>
                    <div id="number_accepted" className="font-bold text-2xl">{offres.filter(item => item.status === "accepted").length}</div>
                  </div>
                </div>
              </div>

              <div id="cards_rejected" className="col-span-12 sm:col-span-6 md:col-span-3 hover:drop-shadow-lg hover:scale-105 transition duration-300">
                <div id="cards_rejected_inner" className="flex flex-row border border-gray-200 bg-white drop-shadow-md rounded-2xl  p-4">
                  <div id="icon_rejected" className="flex items-center justify-center flexShrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-600">
                    <svg id="svg_rejected" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                  </div>
                  <div id="content_rejected" className="flex flex-col flexGrow ml-4">
                    <div id="title_rejected" className="text-sm text-gray-500">REFUSE</div>
                    <div id="number_rejected" className="font-bold text-2xl">{offres.filter(item => item.status === "rejected").length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cards-stages" className="w-full px-6 py-6">

        <div id="cards-stages-inner" className="grid grid-cols-1 lg:grid-cols-9 gap-6">

          {/* LEFT SIDE (75%) */}
          <div id="cards-stages-left" className="lg:col-span-6 flex flex-col  gap-4">

            <div id="cards-stages-left-title" className="flex flex-row justify-between">
              <div id="cards-stages-left-title-inner" className="">
                {/* TITLE */}
                <h2 id="cards-stages-left-title-inner-title" className="  text-xl font-[600]  text-slate-800 ">
                  Stages recommandés
                </h2>
              </div>

              <div id="cards-stages-left-link" className=" mr-4 mt-1 cursor-pointer">
                {/* TITLE */}
                <h6 id="cards-stages-left-link-inner" className="text-sm -5  text-slate-800 ">
                  <Link id="cards-stages-left-link-inner-titel" to="/etudiant/stages" className="flex justify-between  animate-pulse hover:bg-gray-200 hover:animate-none px-2 font-medium rounded-lg duration-300 ">
                    Tout voir
                    <svg id="svg-link" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" mx-2 size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </h6>
              </div>
            </div>


            {/* CARD EXAMPLE */}

            <div id="cards-stages-left-cards" className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

              {offres.map((item) => (
                <div
                  id={`cards_item_${item.id}`}
                  key={item.id}
                  className="bg-white rounded-xl min-h-[280px] shadow p-4 group hover:drop-shadow-lg hover:bg-gray-100 transition duration-500"
                >

                  {/* TOP */}
                  <div id={`card_top_${item.id}`} className="flex justify-between">
                    <div id={`logo_icon_${item.id}`} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500/30 to-blue-500/30">
                      <svg id={`svg_logo_${item.id}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-blue-600 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
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
              ))}

            </div>
          </div>

          {/* RIGHT SIDE (25%) */}
          <div id="right_side" className="lg:col-span-3 flex flex-col gap-4 ">

            <div id="recent_activity" className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">

              <h2 id="recent_activity_title" className="text-xl font-semibold text-gray-800 mb-3">
                Activité récente
              </h2>

              {offres.map((item) => (
                <div
                  id={`activity_${item.id}`}
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mx-2 transition duration-300 hover:shadow-lg hover:scale-[1.02]"
                >

                  {/* TOP */}
                  <div id={`activity_top_${item.id}`} className="">

                    <div id={`activity_top_left_${item.id}`} className="flex flex-col">
                      <div id={`activity_top_left_logo_${item.id}`} className="flex justify-between">
                        <div id={`activity_top_left_logo_icon_${item.id}`} className="flex w-10 h-10  items-center justify-center rounded-xl bg-slate-300/70">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-blue-600 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                          </svg>
                        </div>

                        <div id={`activity_top_left_logo_status_${item.id}`} className="flex justify-between">
                          {/* STATUS */}
                          <span id={`activity_top_left_logo_status_text_${item.id}`} className={`font-medium h-5 rounded-md text-[12px] px-3 ${statusStyles[item.status]}`}>
                            {statusText[item.status]}
                          </span>
                        </div>
                      </div>

                      <span id={`activity_top_left_title_${item.id}`} className="flex flex-row w-50 text-sm font-semibold text-gray-800">
                        {item.title}
                      </span>

                      <span id={`activity_top_left_company_${item.id}`} className="text-xs font-semibold text-gray-500 mb-2">
                        {item.company}
                      </span>

                      <span id={`activity_top_left_date_${item.id}`} className="text-[11px] text-gray-400 mt-1 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                        Postulée le {item.datePostulation}
                      </span>
                    </div>



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

export default DashboardEtudiant;