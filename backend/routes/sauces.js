//importation d'express
const express = require('express');
// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();
// Déclaration et importation du middleware auth qui protège les routes sélectionnées et vérifiera que l'utilisateur est authentifié par token avant d'autoriser l'envoi de ses requêtes
const auth = require('../middlewares/auth');
// Déclaration et importation du middleware multer-config qui permet ici l'upload de fichiers images dans le dossier /images
const multer = require('../middlewares/multer-config');
// controller pour associer les fonctions aux différentes routes
const sauceControl = require('../controllers/sauces');
// Déclaration et importation du controller like et sa logique métier
const likeCtrl = require("../controllers/like");

// route post pour envoyer une nouvelle sauce
router.post("/",auth, multer, sauceControl.createSauce);
// route pour modifier une sauce
router.put("/:id",auth, multer, sauceControl.modifySauce);
//route pour supprimer une sauce
router.delete("/:id",auth, sauceControl.deleteSauce);
// route get implementer afin de recuperer une sauce specifique
router.get("/:id",auth, sauceControl.getOneSauce);
//route get implementer afin qu'elle renvoie tous les sauces dans la base de données
router.get("/",auth, sauceControl.getAllSauce);
//Les routes POST pour la gestion des likes
router.post("/:id/like", auth, likeCtrl.likeSauce);

// exportation du router
module.exports = router;