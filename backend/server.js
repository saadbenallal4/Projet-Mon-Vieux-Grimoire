// On importe express
const express = require('express');

// On crée une application Express
const app = express();

// On définit le port du serveur
const PORT = 3000;

// Route GET simple pour tester
app.get('/', (req, res) => {
    res.send('Serveur fonctionnel');
});

// On lance le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
