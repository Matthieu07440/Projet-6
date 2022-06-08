// Déclaration et importation du package NPM Multer
const multer = require('multer');
// Objet indiquant la nature et le format d'un document et le relier à une extension de fichier
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// constante storage qui contient la fonction .diskStorage passer à multer pour lui indiquer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // La fonction filename indique une instruction pour changer le nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
// on exporte l'élément multer configuré et on lui passe notre constante storage
// LA méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré
module.exports = multer({storage: storage}).single('image');