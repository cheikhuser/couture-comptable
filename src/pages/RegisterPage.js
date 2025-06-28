import { useState } from 'react';

export default function RegisterPage({ onRegisterSuccess }) {
  const [form, setForm] = useState({ nom: '', numero: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nom || !form.numero || !form.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Erreur lors de l\'inscription');
      } else {
        alert('Inscription réussie ! Connectez-vous.');
        onRegisterSuccess();
      }
    } catch (err) {
      alert('Erreur réseau');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
        /><br />
        <input
          name="numero"
          placeholder="Numéro de téléphone"
          value={form.numero}
          onChange={handleChange}
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
        /><br />
        <button type="submit" style={{ marginTop: '10px' }}>S’inscrire</button>
      </form>
    </div>
  );
}
