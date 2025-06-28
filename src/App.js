import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddClientForm from './pages/AddClientForm';
import ClientList from './pages/ClientList';

export default function App() {
  const [user, setUser] = useState(null);

  // Vérifie si un utilisateur est déjà connecté via le localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const nom = localStorage.getItem('nom');
    const numero = localStorage.getItem('numero');
    const role = localStorage.getItem('role');
    if (token && nom && numero && role) {
      setUser({ token, nom, numero, role });
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('nom', userData.nom);
    localStorage.setItem('numero', userData.numero);
    localStorage.setItem('role', userData.role);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  // 🔐 Si pas connecté, affichage des pages Login/Signup
  if (!user) {
    return (
      <>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
        <hr style={{ margin: '40px 0' }} />
        <RegisterPage onRegisterSuccess={() => alert('Inscris-toi puis connecte-toi !')} />
      </>
    );
  }

  // 👤 Si connecté (utilisateur ou admin)
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Bienvenue {user.nom} ({user.role})</h1>
      <p>Numéro : {user.numero}</p>
      <button onClick={handleLogout}>Se déconnecter</button>

      {/* ADMIN : peut voir la liste */}
      {user.role === 'admin' && (
        <>
          <h2>Ajouter un client</h2>
          <AddClientForm token={user.token} />
          <ClientList token={user.token} />
        </>
      )}

      {/* USER : peut juste ajouter ses propres mesures */}
      {user.role === 'user' && (
        <>
          <h2>Ajouter une mesure</h2>
          <AddClientForm token={user.token} />
        </>
      )}
    </div>
  );
}
