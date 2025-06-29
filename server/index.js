const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express(); // <<--- Important, définir app ici
app.use(cors());
app.use(express.json());

// Exemple de route login simple
app.post('/login', (req, res) => {
  const { numero, password } = req.body;
  if (numero === '0000000000' && password === 'admin123') {
    res.json({ token: 'token-fake', nom: 'Admin', numero });
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
});

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, '../build')));

// Toutes les autres routes renvoient le React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
