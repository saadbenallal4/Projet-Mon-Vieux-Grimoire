/* IMPORTATIONS DES DEPENDANCES */
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes');

/*CREATION DE L'APPLICATION*/
const app = express();

/* Middleware permettant d'analyser les requêtes entrantes
 * contenant du JSON.
 * Il transforme le body JSON en objet JavaScript
 * accessible via req.body.*/
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

/* CONNEXION A MONGODB */
mongoose.connect('mongodb://localhost:27017/monvieuxgrimoire')
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
    })
    .catch((error) => {
        console.error('Connexion à MongoDB échouée !', error);
    });

/* DEFINITION DU PORT*/
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});





