//importation d'express
const express = require('express');
// La méthode express.Router() permet de créer des routeurs séparés pour chaque route principale de l' application – on y enregistrez ensuite les routes individuelles.
const router = express.Router();

// le controller pour associer les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// route d'inscription
router.post("/signup", userCtrl.signup);
// route pour se connecter
router.post("/login", userCtrl.login);

//exportation du router
module.exports = router;