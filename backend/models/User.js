/* Définit la structure des utilisateurs en base MongoDB */
const mongoose = require('mongoose');
/* Plugin Mangoose */
const uniqueValidator = require('mongoose-unique-validator');

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

/* Ajout du plugin au shema*/
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
