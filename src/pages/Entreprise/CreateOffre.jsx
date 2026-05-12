import OffresFake from "../../DonneesUserFake/OffresFake";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { City } from "country-state-city";
import Select from "react-select";
const CreateOffre = () => {

    const [offers, setOffers] = useState(OffresFake);


    const [selectedDate, setSelectedDate] = useState(new Date());

    const villesMaroc = City.getCitiesOfCountry("MA")?.map((city) => ({
        value: city.name,
        label: city.name,
    }));


    // FORM
    const [selectedEditOffer, setSelectedEditOffer] = useState({
        title: "",
        formation: "",
        location: "",
        duration: "",
        type: "",
        competences: "",
        description: "",
    });

    // RESET FORM HERE
    const resetForm = () => {
        setSelectedEditOffer({
            title: "",
            formation: "",
            location: "",
            duration: "",
            type: "",
            dateLimite: "",
            competences: "",
            description: "",
        });

        setSelectedDate(new Date()); // reset selected date
    };

    // SUBMIT HERE (optional)
    const handleSubmit = () => {
        const newOffer = {
            ...selectedEditOffer,
            dateLimite: selectedDate.toISOString(),
            offerStatus: "active",
            candidatures: [],
        };

        setOffers((prev) => [...prev, newOffer]);

        resetForm(); // reset form after submit
    };



    return (

        <div
            id="CreateOffre"
            className="min-h-screen bg-slate-100 py-10 px-5"
        >

            {/* HEADER */}
            <header className="max-w-5xl mx-auto mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Nouvelle offre de stage
                </h1>

                <p className="text-gray-500 mt-2">
                    Décrivez le poste pour attirer les bons profils.
                </p>

            </header>

            {/* FORM CONTAINER */}
            <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md border border-gray-200 p-8">

                {/* TITLE */}
                <div className="mb-6">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Titre du poste
                    </label>

                    <input
                        type="text"
                        placeholder="Ex: Développeur Full-Stack React/Node"
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

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* DOMAINE */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Domaine
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Software"
                            value={selectedEditOffer.formation}
                            onChange={(e) =>
                                setSelectedEditOffer({
                                    ...selectedEditOffer,
                                    formation: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                        </input>

                    </div>

                    {/* TYPE */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Type
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Temps plein"
                            value={selectedEditOffer.type}
                            onChange={(e) =>
                                setSelectedEditOffer({
                                    ...selectedEditOffer,
                                    type: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >

                        </input>

                    </div>

                    {/* LIEU */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Lieu
                        </label>

                        <Select
                            options={villesMaroc}
                            placeholder="Choisir une ville"
                            value={
                                villesMaroc.find(
                                    (ville) => ville.value === selectedEditOffer.location
                                ) || null
                            }
                            onChange={(selectedOption) =>
                                setSelectedEditOffer({
                                    ...selectedEditOffer,
                                    location: selectedOption ? selectedOption.value : "",
                                })
                            }
                            className="w-full text-sm"
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: state.isFocused ? "#0000FF" : "#e5e7eb", // green focus

                                }),

                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected
                                        ? "#166534" // green selected
                                        : state.isFocused
                                            ? "#dcfce7" // light green hover
                                            : "white",
                                    color: state.isSelected ? "white" : "#111827",
                                    cursor: "pointer",
                                }),

                                singleValue: (base) => ({
                                    ...base,
                                    color: "#111827",
                                }),
                            }}
                        />
                    </div>

                    {/* DUREE */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Durée
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: 6 mois"
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

                    {/* DATE LIMITE */}
                    <div className="w-full">

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date Limite
                        </label>

                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            wrapperClassName="w-full"
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            calendarClassName="rounded-xl shadow-lg border border-gray-200"
                            dayClassName={(date) =>
                                date.toDateString() === selectedDate?.toDateString()
                                    ? "!bg-green-700 !text-white rounded-full"
                                    : "hover:!bg-green-100 rounded-full"
                            }
                        />

                    </div>




                    {/* COMPETENCES */}
                    <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Compétences requises
                        </label>

                        <input
                            type="text"
                            placeholder="React, TypeScript, Node.js"
                            value={selectedEditOffer.competences}
                            onChange={(e) =>
                                setSelectedEditOffer({
                                    ...selectedEditOffer,
                                    competences: e.target.value,
                                })
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                    </div>

                </div>

                {/* DESCRIPTION */}
                <div className="mt-8">

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description du poste
                    </label>

                    <textarea
                        rows="6"
                        placeholder="Missions, environnement de travail, profil recherché..."
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
                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={resetForm}
                        className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={
                            !selectedEditOffer.title ||
                            !selectedEditOffer.location ||
                            !selectedEditOffer.formation
                        }
                        className="px-6 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold"
                    >
                        Publier l'offre
                    </button>

                </div>

            </section>

        </div>
    );
};

export default CreateOffre;