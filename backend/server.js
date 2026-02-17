/* IMPORTATIONS DES DEPENDANCES */
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

/*CREATION DE L'APPLICATION*/
const app = express();

/* Middleware permettant d'analyser les requêtes entrantes
 * contenant du JSON.
 * Il transforme le body JSON en objet JavaScript
 * accessible via req.body.*/
app.use(express.json());

/* CONNEXION A MONGODB */
mongoose.connect('mongodb://localhost:27017/monvieuxgrimoire')
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
    })
    .catch((error) => {
        console.error('Connexion à MongoDB échouée !', error);
    });

/* DEFINITION DU PORT*/
const PORT = 3000;

/* ROUTE GET TEST
  Permet de vérifier que le serveur fonctionne.*/
app.get('/', (req, res) => {
    res.send('Serveur fonctionnel');
});

/* ROUTE POST - CREATION D'UN LIVRE
   Permet d'enregistrer un nouveau livre en base.*/
app.post('/api/books', (req, res) => {

    // Création d'une nouvelle instance du modèle Book
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre
    });

    // Sauvegarde du livre en base
    book.save()
        .then(() => {
            /* Code HTTP 201 = Ressource créée avec succès */
            res.status(201).json({
                message: 'Livre enregistré avec succès !'
            });
        })
        .catch((error) => {
            /* Code HTTP 400 = Mauvaise requête */
            res.status(400).json({
                error: error
            });
        });
});

/* DEMARRAGE DU SERVEUR*/
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});

/* ROUTE GET - RECUPERER TOUS LES LIVRES
   Permet de récupérer tous les livres enregistrés en bas.e*/

app.get('/api/books', (req, res) => {

    Book.find()
        .then((books) => {
            res.status(200).json(books);
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
});

/* ROUTE GET - RECUPERER UN LIVRE PAR ID */

app.get('/api/books/:id', (req, res) => {

    Book.findById(req.params.id)
        .then((book) => {

            if (!book) {
                return res.status(404).json({
                    message: 'Livre non trouvé'
                });
            }

            res.status(200).json(book);

        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });

});

/* ROUTE PUT - MODIFIER UN LIVRE */

app.put('/api/books/:id', (req, res) => {

    Book.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => {
            res.status(200).json({ message: 'Livre modifié avec succès !' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });

});

/* ROUTE DELETE - SUPPRIMER UN LIVRE */

app.delete('/api/books/:id', (req, res) => {

    Book.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Livre supprimé avec succès !' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });

});



