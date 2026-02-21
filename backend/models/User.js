/**
 * ==============================
 * MODELE USER
 * ==============================
 * Définit la structure des utilisateurs en base MongoDB.
 */

const mongoose = require('mongoose');

/**
 * Schema utilisateur
 * - email : string unique obligatoire
 * - password : string obligatoire (sera hashé)
 */

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

/**
 * Export du modèle User
 */
module.exports = mongoose.model('User', userSchema);
