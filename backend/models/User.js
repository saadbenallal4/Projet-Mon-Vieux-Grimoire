/* Définit la structure des utilisateurs en base MongoDB */
const mongoose = require('mongoose');

/* Schema utilisateur */
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


module.exports = mongoose.model('User', userSchema);
