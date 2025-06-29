const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Exemple de route login (à adapter avec ta base)
app.post('/login', (req, res) => {
  const { numero, password } = req.body;

  // Exemple simple, remplace avec vérification dans ta base SQLite
  if (numero === '0000000000' && password === 'admin123') {
    res.json({ token: 'token-fake', nom: 'Admin', numero });
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
});

// Servir les fichiers statiques React buildés
app.use(express.static(path.join(__dirname, '../build')));

// Toutes les autres routes renvoient index.html (React SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
