const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express(); // <= C'EST CETTE LIGNE QUI MANQUAIT !

const PORT = process.env.PORT || 5000;
const DATABASE_FILE = process.env.DATABASE_FILE || 'users.db';

const db = new sqlite3.Database(path.join(__dirname, DATABASE_FILE));

app.use(cors());
app.use(bodyParser.json());

// === ROUTES ===

app.post('/register', (req, res) => {
  const { nom, numero, password } = req.body;
  if (!nom || !numero || !password) {
    return res.status(400).json({ message: 'Champs manquants' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run(
    'INSERT INTO users (nom, numero, password, role) VALUES (?, ?, ?, ?)',
    [nom, numero, hashedPassword, 'user'],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.json({ message: 'Utilisateur enregistré' });
    }
  );
});

app.post('/login', (req, res) => {
  const { numero, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE numero = ?',
    [numero],
    (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        return res.status(403).json({ message: 'Mot de passe incorrect' });
      }

      const token = jwt.sign({ numero: user.numero, role: user.role }, 'SECRET');
      res.json({ token, nom: user.nom, numero: user.numero, role: user.role });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
