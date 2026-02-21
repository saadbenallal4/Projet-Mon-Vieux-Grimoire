/**
 * ==============================
 * ROUTES AUTHENTIFICATION
 * ==============================
 */

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * ==============================
 * ROUTE SIGNUP
 * ==============================
 * Crée un nouvel utilisateur
 * - Hash le mot de passe
 * - Enregistre l'utilisateur en base
 */

router.post('/signup', (req, res) => {

    // Hash du mot de passe avec 10 tours de salage
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {

            const user = new User({
                email: req.body.email,
                password: hash
            });

            return user.save();

        })
        .then(() => {
            res.status(201).json({ message: 'Utilisateur créé !' });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });

});

module.exports = router;
