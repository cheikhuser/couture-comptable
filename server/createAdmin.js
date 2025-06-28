const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db');

const passwordPlain = 'admin123';

bcrypt.hash(passwordPlain, 10, (err, hash) => {
  if (err) throw err;
  db.run(
    `INSERT OR IGNORE INTO users (nom, numero, password, role) VALUES (?, ?, ?, ?)`,
    ['Admin', '0000000000', hash, 'admin'],
    (err) => {
      if (err) throw err;
      console.log('Admin créé avec mot de passe haché');
      db.close();
    }
  );
});
