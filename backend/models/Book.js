const mongoose = require('mongoose');

/* Schéma Book
   Définit la structure des données stockées en base.
 Chaque champ possède un type.*/
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String
    }
});

/* Export du modèle Book.
  Mongoose va créer automatiquement une collection "books"
   à partir du nom du modèle.*/
module.exports = mongoose.model('Book', bookSchema);

