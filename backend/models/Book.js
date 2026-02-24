const mongoose = require('mongoose');

/* Schéma Book
   Définit la structure des données stockées en base.
 Chaque champ possède un type */
const bookSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    ratings: [
        {
            userId: { type: String },
            grade: { type: Number }
        }
    ],
    averageRating: {
        type: Number,
        default: 0
    }
});

/* Export du modèle Book.
  Mongoose va créer automatiquement une collection "books"
   à partir du nom du modèle.*/
module.exports = mongoose.model('Book', bookSchema);

