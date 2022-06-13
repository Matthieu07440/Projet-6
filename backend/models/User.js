// importation du module mongoose
const mongoose = require('mongoose');
// importation du module mongoose-unique-validator pour controler le mail et n'avoir qu'un mail unique dans la base de données
const uniqueValidator = require('mongoose-unique-validator');
// on crée un schema de données qui contient les champs souhaités pour chaque utilisateur en utilisant la méthode schéma de Mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
// on exporte ce schéma en tant que modèle mongoose
module.exports = mongoose.model('users', userSchema);