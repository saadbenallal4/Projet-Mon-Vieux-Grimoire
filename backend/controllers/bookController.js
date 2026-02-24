// Import du modèle Book
// Permet d’interagir avec la collection "books" de MongoDB
const Book = require('../models/Book');

// CREER UN LIVRE
// Route : POST /api/books
exports.createBook = (req, res) => {

    // Création d'une nouvelle instance du modèle Book
    const book = new Book({
        userId: req.auth.userId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.genre
        // ratings et averageRating sont gérés automatiquement
    });

    // Sauvegarde en base de données
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// RECUPERER TOUS LES LIVRES
// Route : GET /api/books
exports.getAllBooks = (req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

// RECUPERER UN SEUL LIVRE
// Route : GET /api/books/:id
exports.getOneBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};


// MODIFIER UN LIVRE
// Route : PUT /api/books/:id
exports.updateBook = (req, res) => {
    Book.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Livre modifié !" }))
        .catch(error => res.status(400).json({ error }));
};

// SUPPRIMER UN LIVRE
// Route : DELETE /api/books/:id
exports.deleteBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};