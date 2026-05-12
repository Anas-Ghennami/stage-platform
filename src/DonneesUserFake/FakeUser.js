// !!! FAKE DATA (sera remplacé par backend)


const FakeUser = {
  etudiant: {
    id: "usr_test_001",
    name: "Anas Ghennami",
    email: "anas.ghennami@student.edu",
    role: "Etudiant",
    image: null,
    etablissement: "",
    promotion: "",
    competences: "",
    about: ""
  },

  entreprise: {
    id: "usr_test_002",
    name: "Neo ELec",
    email: "neoelec@gmail.com",
    role: "Entreprise",
    image: "../../src/assets/best.jpg",
    siteWeb:"www.NeoElec.com",
    secteur:"Informatique",
    Adresse:"N 55 SECT 04 KORTOBA MEKNES",
    about:"",
  },
  admin: {
    id: "usr_test_003",
    nameAdmin: "Admin System",
    emailAdmin: "admin@stageo.com",
    role: "Admin",
    image: null
  }
};

export default FakeUser;