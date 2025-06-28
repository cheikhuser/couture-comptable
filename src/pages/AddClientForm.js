import { useState } from 'react';

export default function AddClientForm({ token }) {
  const [form, setForm] = useState({
    numero: '',
    nom: '',
    prenom: '',
    adresse: '',
    sexe: '',
    beneficiaire: '',
    autreBeneficiaire: '',
    buste: '',
    epaule: '',
    bras: '',
    cou: '',
    pantalon: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalForm = {
      ...form,
      beneficiaire: form.beneficiaire === 'Autre' ? form.autreBeneficiaire : form.beneficiaire
    };

    try {
      const res = await fetch('http://localhost:5000/clients', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(finalForm),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Erreur lors de l\'ajout du client');
      } else {
        alert('Client ajouté avec succès !');
        setForm({
          numero: '',
          nom: '',
          prenom: '',
          adresse: '',
          sexe: '',
          beneficiaire: '',
          autreBeneficiaire: '',
          buste: '',
          epaule: '',
          bras: '',
          cou: '',
          pantalon: '',
        });
      }
    } catch (err) {
      alert('Erreur réseau');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '20px auto', textAlign: 'left' }}>
      <h2>Ajouter un client / bénéficiaire</h2>
      <form onSubmit={handleSubmit}>
        <input name="numero" placeholder="Téléphone" value={form.numero} onChange={handleChange} required /><br />
        <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required /><br />
        <input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} required /><br />
        <input name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} required /><br />
        <select name="sexe" value={form.sexe} onChange={handleChange} required>
          <option value="">Sexe</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select><br />

        <select name="beneficiaire" value={form.beneficiaire} onChange={handleChange} required>
          <option value="">Bénéficiaire</option>
          <option value="Moi">Moi</option>
          <option value="Fils">Fils</option>
          <option value="Fille">Fille</option>
          <option value="Épouse">Épouse</option>
          <option value="Neveu">Neveu</option>
          <option value="Autre">Autre</option>
        </select><br />

        {form.beneficiaire === 'Autre' && (
          <input name="autreBeneficiaire" placeholder="Préciser le bénéficiaire" value={form.autreBeneficiaire} onChange={handleChange} required />
        )}<br />

        <input name="buste" placeholder="Buste (cm)" value={form.buste} onChange={handleChange} /><br />
        <input name="epaule" placeholder="Épaule (cm)" value={form.epaule} onChange={handleChange} /><br />
        <input name="bras" placeholder="Bras (cm)" value={form.bras} onChange={handleChange} /><br />
        <input name="cou" placeholder="Tour de cou (cm)" value={form.cou} onChange={handleChange} /><br />
        <input name="pantalon" placeholder="Longueur pantalon (cm)" value={form.pantalon} onChange={handleChange} /><br />

        <button type="submit" style={{ marginTop: '10px' }}>Enregistrer</button>
      </form>
    </div>
  );
}
