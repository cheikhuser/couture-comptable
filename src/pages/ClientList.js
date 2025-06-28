import { useEffect, useState } from 'react';

export default function ClientList({ token }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('http://localhost:5000/clients', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setClients(data);
          setFilteredClients(data);
        } else {
          alert(data.message || 'Erreur lors du chargement des clients');
        }
      } catch (err) {
        alert('Erreur réseau');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [token]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(c =>
        c.numero.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  };

  if (loading) return <p>Chargement des clients...</p>;
  if (clients.length === 0) return <p>Aucun client enregistré.</p>;

  return (
    <div style={{ maxWidth: '100%', margin: '20px auto', textAlign: 'left' }}>
      <h2>Liste des clients</h2>

      <input
        type="text"
        placeholder="Rechercher par numéro..."
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
      />

      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Sexe</th>
            <th>Bénéficiaire</th>
            <th>Buste</th>
            <th>Épaule</th>
            <th>Bras</th>
            <th>Cou</th>
            <th>Pantalon</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((c) => (
            <tr key={c.id}>
              <td>{c.nom}</td>
              <td>{c.prenom}</td>
              <td>{c.numero}</td>
              <td>{c.adresse}</td>
              <td>{c.sexe}</td>
              <td>{c.beneficiaire}</td>
              <td>{c.buste}</td>
              <td>{c.epaule}</td>
              <td>{c.bras}</td>
              <td>{c.cou}</td>
              <td>{c.pantalon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
