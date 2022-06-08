//Importation schéma mongoose
const Sauce = require('../models/Sauce');
//Package pour accéder et interagir avec le système de fichiers
const fs = require("fs");

//Création d'une nouvelle sauce
exports.createSauce =(req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersdisLiked: [" "],
  });
  //enregister la sauce dans la base de donnée en appelant la méthode save
  sauce
    .save()
    .then((sauce) => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));

};
// Modification d'une sauce
exports.modifySauce =(req, res, next) => {
    // récupérer le nom du fichier
    Sauce.findOne({ _id: req.params.id }).then(
      (sauce) => {
        //si la sauce n'appartient pas à l'user connecté
        if (sauce.userId !== req.auth.userId) {
          res.status(400).json({
            error: new Error('Requête non autorisée!')
          });
        }
        const filename = sauce.imageUrl.split("/images")[1];
        //suppression de l'image de la sauce car elle va être remplacer par la nouvelle image de sauce
        // On utilise la méthode unlink du package fs qui supprime un fichier ou un lien symbolique
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
        // Vérification si le user modifie l'image en regardant si le req.file existe et on traite la nouvelle image
        // s'il n'existe pas, on traite simplement l'objet entrant        
        const sauceObject = req.file ?
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
      Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
      }
    )
  };
// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD
  Sauce.findOne({ _id: req.params.id }) 
    .then((sauce) => {
      // On récupère avec la méthode split le nom ficher image dans l'URL
      const filename = sauce.imageUrl.split("/images/")[1]; 
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
// Récupération d'une sauce
exports.getOneSauce =(req, res, next) => {
  // nous utilisons l'ID que nous recevons en paramètres pour accéder à la Sauce correspondant dans la BDD
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};
// Récupération de toutes les sauces
exports.getAllSauce =(req, res, next) => {
  // utilisation de la méthode find() pour avoir la liste complete
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};