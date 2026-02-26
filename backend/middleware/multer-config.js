const multer = require('multer');

// Stockage en mémoire (buffer) pour pouvoir traiter l'image avec Sharp ensuite
const storage = multer.memoryStorage();

module.exports = multer({ storage }).single('image');