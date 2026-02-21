const Book = require('../models/Book');

// CREER UN LIVRE
exports.createBook = (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// RECUPERER TOUS LES LIVRES
exports.getAllBooks = (req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

// RECUPERER UN LIVRE
exports.getOneBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

// SUPPRIMER UN LIVRE
exports.deleteBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};