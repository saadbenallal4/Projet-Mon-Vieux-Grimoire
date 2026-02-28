/* Définition des routes liées aux livres
 * Certaines routes sont protégées par le middleware d'authentification */
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
// Middleware d'authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/* GET tous les livres
 * Route publique (pas besoin d'être connecté) */
router.get('/', bookController.getAllBooks);

/* GET un livre par son ID */
router.get('/:id', bookController.getOneBook);

/* POST créer un livre
   Route protégée (token obligatoire) */
router.post('/', auth, multer, bookController.createBook);

/* DELETE supprimer un livre */
router.delete('/:id', auth, bookController.deleteBook);

/* PUT modifier un livre */
router.put('/:id', auth, bookController.updateBook);

/* POST noter un livre */
router.post('/:id/rating', auth, bookController.rateBook);

module.exports = router;