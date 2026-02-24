/**
 * middleware/auth.js
 * -------------------
 * Ce middleware sert à protéger les routes.
 * Il vérifie si le token JWT envoyé par le client est valide.
 * 
 * Si le token est valide → on laisse passer la requête.
 * Si le token est invalide ou absent → erreur 401.
 */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        // 1️⃣ Récupération du header Authorization
        // Format attendu : "Bearer TOKEN"
        const authHeader = req.headers.authorization;

        // Si aucun header → refus immédiat
        if (!authHeader) {
            return res.status(401).json({ message: "Token manquant !" });
        }

        // 2️⃣ On extrait uniquement le token
        const token = authHeader.split(' ')[1];

        // 3️⃣ Vérification du token avec la clé secrète
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 4️⃣ On récupère l'userId contenu dans le token
        req.auth = {
            userId: decodedToken.userId
        };

        // 5️⃣ Si tout est OK → on passe à la route suivante
        next();

    } catch (error) {
        return res.status(401).json({ message: "Token invalide !" });
    }
};