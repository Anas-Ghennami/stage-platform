import usersByRole from "../../DonneesUserFake/FakeUser";
import OffresFake from "../../DonneesUserFake/OffresFake";
import RapportEtud from "../../DonneesUserFake/RapportEtud";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfileEntreprise = () => {

    const user = usersByRole.entreprise;

    // les infos de l'etudiant
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email|| "",
        siteWeb: user.siteWeb || "",
        secteur: user.secteur || "",
        Adresse: user.Adresse || "",
        about: user.about || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        const saved = localStorage.getItem(`user:${user.id}:data`);
        if (saved) {
            setFormData(JSON.parse(saved));
        }
    }, []);

    // Alert de Profil mise a jour 
    const [showAlert, setShowAlert] = useState(false);



    // pour chnager l'image
    const [image, setImage] = useState(user?.image || null);

    useEffect(() => {
        const savedImage = localStorage.getItem(`user:${user.id}:image`);

        if (savedImage) {
            setImage(savedImage);
        }
    }, []);


    return (

        <div id="page_etudiant_stages" className="min-h-screen bg-slate-200/30">

            {showAlert && (
                <div className="fixed bottom-20  right-10 w-70 h-20 flex-col bg-gray-700  px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn">

                    <div className="text-green-800 bg-green-200 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                            <path stroke-linecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>

                    </div>

                    <div>
                        <span className="text-sm font-medium text-white">
                            Profil mis à jour
                        </span>

                    </div>

                </div>
            )}


            <header id="header_dashboard" className="p-7">
                <div id="header_text">
                    <h1 id="header_title" className="text-2xl font-[700]  text-slate-800 ">Profil entreprise</h1>
                    <p id="header_subtitle" className="text-gray-500 py-1 sm:text-[10px] md:text-[12px] lg:text-[14px]">Gérez les informations publiques de votre organisation.</p>
                </div>
            </header>

            <section className="grid grid-cols-1 px-7 lg:grid-cols-9 gap-6 items-stretch">



                {/* LEFT SIDE (25%) */}
                <div
                    id="cards-infos-Profile"
                    className="lg:col-span-3 flex flex-col gap-4 bg-white rounded-xl shadow items-center justify-center p-7 h-full"

                >
                    {/* PROFILE */}
                    <div
                        className="w-24 h-24 rounded-full bg-blue-600 text-white items-center justify-center cursor-pointer overflow-hidden"
                    >
                        {image ? (
                            <img
                                src={image}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span>{user?.name?.charAt(0)}</span>
                        )}
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-md font-semibold">
                            {user.name}
                        </h1>

                        <p className="text-sm font-medium text-gray-400">
                            {user.email}
                        </p>
                    </div>

                    <input
                        type="file"
                        id="upload-photo"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {

                            const file = e.target.files[0];

                            if (file) {

                                const reader = new FileReader();

                                reader.onloadend = () => {

                                    const imageBase64 = reader.result;

                                    setImage(imageBase64);

                                    localStorage.setItem(
                                        `user:${user.id}:image`,
                                        imageBase64
                                    );

                                };

                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => document.getElementById("upload-photo").click()}
                        className="hover:bg-gray-100 text-[12px] font-medium py-1 px-2 rounded-md border border-gray-200"
                    >
                        Changer la photo
                    </button>


                </div>

                {/* RIGHT SIDE (75%) */}
                <div
                    id="right_side"
                    className="lg:col-span-6 flex flex-col gap-4 h-full"
                >
                    <div
                        id="recent_activity"
                        className="bg-white rounded-xl shadow p-4 flex-1"
                    >
                        <h2 className="text-[15px] font-medium text-slate-800 px-1">
                            Informations

                        </h2>

                        <form
                            onSubmit={(e) => {

                            }}

                            onSubmit={(e) => {
                                // save data hna (localStorage wla backend)
                                e.preventDefault();
                                localStorage.setItem(
                                    `user:${user.id}:data`,
                                    JSON.stringify(formData)
                                );
                                console.log("saved", formData);

                                setShowAlert(true);

                                setTimeout(() => {
                                    setShowAlert(false);
                                }, 3000); // 3 seconds
                            }}

                            className=" p-4 flex flex-col gap-4"
                        >

                            {/* LINE 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <label
                                        id="Name_entreprise"
                                        className="text-sm font-medium text-gray-700"
                                        htmlFor="name"
                                    >
                                        Nom de l'entreprise
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Nom de l'entreprise"
                                    />
                                </div>

                                <div>
                                    <label
                                        id="email_etudiant"
                                        className="text-sm font-medium text-gray-700"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>

                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Ex: exemple@gmail.com"
                                    />
                                </div>

                            </div>

                            {/* LINE 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <label
                                        id="site_entreprise"
                                        className="text-sm font-medium text-gray-700"
                                        htmlFor="siteWeb"
                                    >
                                        Site web
                                    </label>

                                    <input
                                        name="siteWeb"
                                        value={formData.siteWeb}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Ex: https://exemple.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        id="secteur_entreprise"
                                        className="text-sm font-medium text-gray-700"
                                        htmlFor="secteur"
                                    >
                                        Secteur
                                    </label>

                                    <input
                                        name="secteur"
                                        value={formData.secteur}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        placeholder="Ex: Software"
                                    />
                                </div>




                            </div>

                            {/* LINE 3 */}
                            <div>
                                <label
                                    id="adresse_entreprise"
                                    className="text-sm font-medium text-gray-700"
                                    htmlFor="adresse"
                                >
                                    Adresse
                                </label>

                                <input
                                    name="adresse"
                                    value={formData.Adresse}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Ex: Rue de la paix, 123, Casablanca"
                                />
                            </div>


                            {/* LINE 4 */}
                            <div>
                                <label
                                    id="about_etudiant"
                                    className="text-sm font-medium text-gray-700"
                                    htmlFor="about"
                                >
                                    Á propos
                                </label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="À propos"
                                />
                            </div>



                            {/* LINE 5 */}
                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-6 py-2 rounded-md"
                                >
                                    Enregistrer
                                </button>



                            </div>

                        </form>

                    </div>
                </div>

            </section>

        </div>
    )

}

export default ProfileEntreprise;