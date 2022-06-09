// Déclaration et importation du package NPM jsonwebtoken   
const jwt = require('jsonwebtoken');
//importation pour utilisation des variables d'environnements
const dotenv = require("dotenv");
dotenv.config();
// Middleware d'authentification
module.exports = (req, res, next) => {
  try {
    //fonction split pour récupérer tout après l'espace dans le header. Les erreurs générées ici s'afficheront dans le bloc catch
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    //La méthode verify() de jsonwebtoken permet de vérifier la validité d'un token
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    console.log(userId);
    //envoyer le userId dans l'objet request
    req.auth = { userId };
    
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Identifiant invalide!';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée')
    });
  }
};