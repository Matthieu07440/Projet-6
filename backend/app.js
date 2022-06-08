// Importations
const express = require('express');
const mongoose = require('mongoose');
// déclaration et importation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// importation de morgan "http request logger"
const morgan = require("morgan");
// importation du module express-mongo-sanitize qui nettoie les données fournies par l'utilisateur pour empêcher des injections sql vers mongoDB
const mongoSanitize = require("express-mongo-sanitize");
// importation du module path qui fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
const path = require('path');
// Importation du module dotenv pour utiliser les variables d'environnement écrites dans le  fichier .env dans le répertoire racine du dossier backend
const dotenv = require("dotenv");
dotenv.config();

//DATA BASE
mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//on appelle express avec cette const, ce qui permet de créer l'application express
const app = express();
// log des requests et des responses
app.use(morgan("dev"));
app.use((req, res, next) => {
  // Header qui permet à d'accéder à notre API depuis n'importe quelle origine ('*')
  res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajout des headers suivant aux requête envoyées vers notre API
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer les requêtes avec les méthodes (GET, POST, PUT ...)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

// express prend toutes les requêtes qui ont comme content-type application/json et met à disposition leur body  directement sur l'objet req
app.use(express.json());

//protection injection sql qui remplace les caractères interdits "$" et "." par _
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
); 

//Route générale "./routes/userRoute" pour l'authentification et création utilisateur
app.use('/api/auth', userRoutes);
//Route générale "./routes/sauceRoute.js" pour la création, la modification et suppression des sauces
app.use('/api/sauces', saucesRoutes);
// Gestion static qui permet les requêtes des images du répertoire /images indiqué au module Path
app.use('/images', express.static(path.join(__dirname, 'images')));


// on export avec module.export pour qu'on puisse y acceder depuis les autres fichiers
module.exports = app;