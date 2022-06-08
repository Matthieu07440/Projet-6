//Importation module bcrypt pour hasher mot de passe
const bcrypt = require('bcrypt');
//Importation module jsonwebtoken qui permet un échange sécurisé de donnée entre deux parties avec access token (jeton d'accès)
const jwt = require('jsonwebtoken');
//Importation schéma mongoose
const User= require ('../models/User');
//importation pour utilisation des variables
require("dotenv").config();

// signup pour enregistrer un nouvel utilisateur
exports.signup = (req, res, next) => {
  // bcrypt pour hasher le mot de passe
    bcrypt.hash(req.body.password, 10) //l'algorithme de hashage sera exécuté 10 fois
    .then(hash => {
      // ce qui sera enregistré dans mongoDB
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // pour l'enregistrer dans la base de donnée
      user
      .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
// Login pour controller la validité de l'utilisateur qui se connecte
exports.login = (req, res, next) => {
    // chercher avec la méthode findOne() de mongoDB le mail de l'utilsateur dans la base de donnée s'il existe
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // le user existe on utilise la methode compare() de bcrypt pour comparé le mdp envoyé par l'utilisateur avec le hash qui est enregistré avec le user dans la base de donnée
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // après validation, on retourne un token valable 24h
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.RANDOM_TOKEN_SECRET,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};