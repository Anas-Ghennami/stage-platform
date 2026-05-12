import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FakeUser from "../DonneesUserFake/FakeUser";

const TopBar = ({ role, setOpenSidebar }) => {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // USER
  const user = FakeUser[role];

  // PROFILE IMAGE
  const savedImage = localStorage.getItem(
    `user:${user.id}:image`
  );

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };


  return (


    <div
      id="topbar"
      className="h-15  bg-white/10 border-gray-500/40 rounded-l rounded-2xl border-b flex items-center justify-between px-6 backdrop-blur-md sticky top-0 z-40"
    >


      {/* HEADER (logo section) */}

      <div id="sidebar_header" className="flex items-center gap-3 mb-6 pr-5 pl-5 pt-5 ">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            id="menu_button"
            onClick={() => setOpenSidebar(true)}
            className="lg:hidden text-gray-800  rounded-[20%] px-3 py-2 hover:bg-gray-400  hover:text-white  font-bold"
          >
            ☰
          </button>

          <h1 className="text-lg font-semibold text-gray-800">
            {/* title */}
          </h1>
        </div>

        {/* icon box */}
        <div id="logo_icon" className="w-10 h-10 flex items-center justify-center rounded-xl 
                    bg-gradient-to-r from-cyan-500 to-blue-500 lg:hidden">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
          >
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13L3.74 11.5 12 7l8.26 4.5L12 16z" />
          </svg>



        </div>


        {/* logo text */}
        <div id="logo_text" className="flex flex-col">
          <img
            id="logo_img"
            src="../../src/assets/logoblue2.png"
            alt="logo"
            className="w-17 lg:hidden"
          />

          <span id="logo_subtitle" className="text-gray-400 text-xs tracking-widest mt-1 lg:hidden">
            STAGE PLATFORM
          </span>
        </div>

      </div>



      {/* RIGHT SIDE */}
      <div
        id="user_section"
        className="relative flex items-center gap-3 rounded-2xl pl-2 hover:bg-gray-200/80 transition"
      >
        {/* USER INFO */}
        <div className="flex flex-col items-center justify-center ">
          <span className="text-sm text-gray-700 font-medium">
            {user.name}
          </span>

          <span className="text-xs text-gray-400 font-medium">
            {user.role}
          </span>
        </div>

        {/* PROFILE */}
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {savedImage ? (
            <img
              src={savedImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : user?.image ? (
            <img
              src={user.image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{user?.name?.charAt(0)}</span>
          )}
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-12 w-55 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h1 className="text-sm font-semibold">{user.name}</h1>
            <p className="text-sm font-medium text-gray-400">
              {user.email}
            </p>

            <hr className="my-2 border-gray-200" />

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center py-2 text-md font-semibold text-red-600 hover:bg-red-700 hover:text-white hover:rounded-md transition"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;