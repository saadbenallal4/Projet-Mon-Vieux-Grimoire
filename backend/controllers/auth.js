const bcrypt = require('bcrypt');
const User = require('../models/User'); // On importe le modèle Mongoose "User"
const jwt = require('jsonwebtoken'); // Librairie pour créer des tokens sécurisés

/* SIGNUP */
exports.signup = (req, res) => {
    const { email, password } = req.body;

    // Si email ou password manquent → 400
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // Hash du mot de passe (10 = nombre de "tours de salage")
    bcrypt.hash(password, 10)
        .then((hash) => {
            // Création d’un document User avec password hashé
            const user = new User({
                email,
                password: hash
            });

            // Sauvegarde en base MongoDB
            return user.save();
        })
        .then(() => {
            // On répond une seule fois
            return res.status(201).json({ message: "Utilisateur créé !" });
        })
        .catch((error) => {
            return res.status(400).json({ error });
        });
};


/* LOGIN */
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Si informations manquantes → 400
    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // On cherche l’utilisateur en base via son email
    return User.findOne({ email })
        .then((user) => {
            // Si user n’existe pas → 401 (non autorisé)
            if (!user) {
                return res.status(401).json({ message: "Utilisateur introuvable !" });
            }

            // On compare le password envoyé (clair) avec le hash stocké en DB
            // bcrypt.compare renvoie true/false
            return bcrypt.compare(password, user.password).then((valid) => {
                if (!valid) {
                    return res.status(401).json({ message: "Mot de passe incorrect !" });
                }

                // Création du token JWT
                const token = jwt.sign(
                    { userId: user._id },        // Payload (données stockées dans le token)
                    process.env.JWT_SECRET,      // Clé secrète (vient du .env)
                    { expiresIn: '24h' }         // Durée de validité du token
                );

                // On renvoie le token au client
                return res.status(200).json({
                    userId: user._id,
                    token: token
                });
            });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};