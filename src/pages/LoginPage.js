import { useState } from 'react';

export default function LoginPage({ onLoginSuccess }) {
  const [form, setForm] = useState({ numero: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.numero || !form.password) {
      alert('Remplissez tous les champs');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Erreur lors de la connexion');
        return;
      }

      // Succès de la connexion
      onLoginSuccess({
        token: data.token,
        nom: data.nom,
        numero: data.numero,
        role: data.role, // facultatif pour la suite
      });

    } catch (err) {
      alert('Erreur réseau');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" style={{ marginTop: '10px' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
