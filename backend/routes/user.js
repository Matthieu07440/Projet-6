//importation d'express
const express = require('express');
// La méthode express.Router() permet de créer des routeurs séparés.
const router = express.Router();

// controller pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// route d'inscription
router.post("/signup", userCtrl.signup);
// route pour se connecter
router.post("/login", userCtrl.login);

//exportation du router
module.exports = router;