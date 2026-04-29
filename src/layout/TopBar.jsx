import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = ({ role }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // !! Token temporaire (authentification)
    // sera utilisé plus tard avec le backend (JWT / API)
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Login");
    };


    // !!! FAKE DATA (temporary)
    // pour le test
    // apres en aprendres les donnees dans Backend (API / Database / Auth)
    const usersByRole = {
        etudiant: {
            id: "usr_test_001",
            name: "Anas Student",
            email: "anas@student.com",
            role: "Etudiant",
            image: "../../src/assets/anas.png"
        },
        entreprise: {
            id: "usr_test_002",
            name: "Neo ELec",
            email: "neoelec@gmail.com",
            role: "Entreprise",
            image: "../../src/assets/best.jpg"
        },
        admin: {
            id: "usr_test_003",
            name: "Admin System",
            email: "admin@stageo.com",
            role: "Admin",
            image: null
        }
    };

    const user = usersByRole[role];

    return (
        <div
            id="topbar"
            className="h-16 bg-white/10 border-gray-500/40 rounded-2xl rounded-l border-b flex items-center justify-between px-6 backdrop-blur-md"
        >

            {/* LEFT SIDE */}
            <h1
                id="app_title"
                className="text-lg font-semibold text-gray-800"
            >
            </h1>

            {/* RIGHT SIDE */}
            <div
                id="user_section"
                className="relative flex items-center gap-3 rounded-2xl pl-2 hover:bg-gray-200/80 transition"
            >

                {/* USER INFO */}
                <div
                    id="user_info"
                    className="flex flex-col items-center justify-center"
                >

                    <span
                        id="user_name"
                        data-user-id={user.id}
                        className="text-sm text-gray-700 font-medium"
                    >
                        {user.name}
                    </span>

                    <span
                        id="user_role"
                        className="text-xs text-gray-400 font-medium"
                    >
                        {user.role}
                    </span>
                </div>

                {/* PROFILE CIRCLE */}
                <div
                    id="profile_button"
                    data-user-id={user.id}
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer overflow-hidden"
                >
                    {user?.image ? (
                        <img
                            id="profile_image"
                            src={user.image}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span id="profile_initial">
                            {user?.name?.charAt(0)}
                        </span>
                    )}
                </div>

                {/* DROPDOWN */}
                {open && (
                    <div
                        id="dropdown_menu"
                        className="absolute right-0 top-12 w-55 p-4 bg-white border border-gray-200 rounded-lg shadow-md"
                    >

                        <h1
                            id="dropdown_name"
                            className="text-sm font-semibold"
                        >
                            {user.name}
                        </h1>

                        <p
                            id="dropdown_email"
                            className="text-sm font-medium text-gray-400"
                        >
                            {user.email}
                        </p>

                        <hr
                            id="dropdown_separator"
                            className="my-2 border-gray-200"
                        />

                        <button
                            id="logout_button"
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center text-left py-2 text-md font-semibold text-red-600 hover:bg-green-700 hover:text-white hover:rounded-md transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 ml-2 mr-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                                />
                            </svg>

                            <span id="logout_text">
                                Se déconnecter
                            </span>
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default TopBar;