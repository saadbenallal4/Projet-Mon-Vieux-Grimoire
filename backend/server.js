/* CHARGEMENT DES VARIABLES D’ENVIRONNEMENT
   dotenv permet de charger les variables
   définies dans le fichier .env
   et de les rendre accessibles via process.env */
require('dotenv').config();

/* IMPORTATIONS DES DEPENDANCES */
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes');

/*CREATION DE L'APPLICATION*/
const app = express();

/* CONFIGURATION CORS
   Permet au frontend (localhost:3000)
   d'accéder au backend (localhost:4000)*/
app.use((req, res, next) => {
    // Autorise les requêtes venant du frontend React
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Autorise certains headers (dont Authorization pour le token)
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );

    // Autorise les méthodes HTTP nécessaires
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );

    next();
});

/* Middleware permettant d'analyser les requêtes entrantes
 * contenant du JSON.
 * Il transforme le body JSON en objet JavaScript
 * accessible via req.body.*/
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
const path = require('path');

/* Rend le dossier images accessible publiquement */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* CONNEXION A MONGODB 
L’URI de connexion est stockée dans le .env
pour éviter d’exposer des informations sensibles
dans le code */
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
    })
    .catch((error) => {
        console.error('Connexion à MongoDB échouée !', error);
    });

/* DEFINITION DU PORT
 Le port est récupéré depuis le fichier .env
 Cela permet de modifier le port sans toucher
 au code source */
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});





