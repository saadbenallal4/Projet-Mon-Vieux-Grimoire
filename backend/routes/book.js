/* Définition des routes liées aux livres
 * Certaines routes sont protégées par le middleware d'authentification */
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');
// Middleware d'authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* GET tous les livres
 * Route publique (pas besoin d'être connecté) */
router.get('/', bookController.getAllBooks);

/* GET les 3 livres les mieux notés */
/* Route publique (pas besoin d'être connecté) */
router.get('/bestrating', bookController.getBestRatedBooks);

/* GET un livre par son ID */
router.get('/:id', bookController.getOneBook);

/* POST créer un livre
   Route protégée (token obligatoire) */
router.post('/', auth, multer, bookController.createBook);

/* DELETE supprimer un livre
   Route protégée (token obligatoire) */
router.delete('/:id', auth, bookController.deleteBook);

/* PUT modifier un livre
   Route protégée (token obligatoire)*/
router.put('/:id', auth, bookController.updateBook);

/* POST noter un livre 
   Route protégée (token obligatoire)*/
router.post('/:id/rating', auth, bookController.rateBook);

module.exports = router;