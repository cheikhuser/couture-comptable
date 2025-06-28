app.post('/login', (req, res) => {
  const { numero, password } = req.body;
  if (!numero || !password) return res.status(400).json({ message: 'Champs manquants' });

  db.get('SELECT * FROM users WHERE numero = ?', [numero], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user.id }, 'secret');
    res.json({
      token,
      nom: user.nom,
      numero: user.numero,
      role: user.role // ← Important pour différencier admin et user
    });
  });
});
