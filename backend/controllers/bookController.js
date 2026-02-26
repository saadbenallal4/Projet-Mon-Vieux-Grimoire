// Import du modèle Book
// Permet d’interagir avec la collection "books" de MongoDB
const Book = require('../models/Book');
const sharp = require('sharp');
const fs = require('fs');

// CREER UN LIVRE
// Route : POST /api/books
exports.createBook = async (req, res) => {
    try {
        const bookObject = JSON.parse(req.body.book);

        // Nom unique pour l'image
        const filename = Date.now() + '.webp';

        // Optimisation de l'image avec Sharp
        await sharp(req.file.buffer)
            .resize({ width: 800 }) // largeur max 800px
            .webp({ quality: 80 }) // conversion en WebP compressé
            .toFile(`images/${filename}`); // sauvegarde optimisée

        const book = new Book({
            userId: req.auth.userId,
            ...bookObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${filename}`
        });

        await book.save();

        res.status(201).json({ message: 'Livre enregistré avec image optimisée !' });

    } catch (error) {
        res.status(400).json({ error });
    }
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

// SUPPRIMER UN LIVRE
// Route : DELETE /api/books/:id
/* Supprimer un livre + supprimer son image sur le serveur */
const fs = require('fs');

exports.deleteBook = (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            console.log("book.userId:", book.userId);
            console.log("req.auth.userId:", req.auth.userId);
            // Sécurité : seul le propriétaire peut supprimer
            // utilisation de .equals() pour éviter les pb de comparaisons de type
            if (!book.userId.equals(req.auth.userId)) {
                return res.status(403).json({ message: "Non autorisé !" });
            }

            // Suppression du fichier image
            console.log("imageUrl:", book.imageUrl);
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                // Suppression du livre en base
                Book.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(400).json({ error }));
};

// MODIFIER UN LIVRE
// Route : PUT /api/books/:id
exports.updateBook = (req, res) => {

    // Si une nouvelle image est envoyée
    const bookObject = req.file
        ? {
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        : { ...req.body };

    delete bookObject._userId; // On empêche la modification du userId

    // On vérifie que le livre appartient bien à l'utilisateur connecté
    Book.findOne({ _id: req.params.id })
        .then(book => {

            if (book.userId !== req.auth.userId) {
                return res.status(403).json({ message: "Non autorisé !" });
            }

            // Si une nouvelle image est envoyée → on supprime l’ancienne
            if (req.file) {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { });
            }

            // Mise à jour du livre
            Book.updateOne(
                { _id: req.params.id },
                { ...bookObject, _id: req.params.id }
            )
                .then(() => res.status(200).json({ message: "Livre modifié !" }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(400).json({ error }));
};