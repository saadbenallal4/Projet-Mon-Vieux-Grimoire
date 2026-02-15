// Importation du framework Express
const express = require('express');

// Création de l'application Express
const app = express();

// Définition du port d'écoute du serveur
const PORT = 3000;

/*
 * Route GET simple
 * Méthode utilisée pour récupérer des données.
 * Ici elle permet simplement de tester que le serveur fonctionne.
 */
app.get('/', (req, res) => {
    res.send('Serveur fonctionnel 🚀');
});

/**
 * Route POST simple
 * Méthode utilisée pour envoyer des données au serveur.
 * Généralement utilisée pour créer une nouvelle ressource.
 * Ici elle sert uniquement de test.
 */
app.post('/api/test', (req, res) => {
    res.send('Requête POST reçue avec succès');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});

