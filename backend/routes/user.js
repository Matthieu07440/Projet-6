//importation d'express
const express = require('express');

// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();
// Déclaration et importation du middleware email pour le contrôle de la validité de l'adresse mail
const mail = require("../middlewares/email");

// le controller pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');


router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;