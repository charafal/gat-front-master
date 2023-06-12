import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PrintIcon from '@mui/icons-material/Print';

const ModifierBeneficiaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
    fetchBeneficiaire();
  }, []);

  const fetchBeneficiaire = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/Beneficiaire/${id}`);
      setBeneficiaire(response.data);
      setNom(response.data.nom);
      setPrenom(response.data.prenom);
    } catch (error) {
      console.error('Erreur lors de la récupération du bénéficiaire :', error);
    }
  };
  

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleModifier = async () => {
    try {
      const beneficiaireModifie = {
        nom: nom,
        prenom: prenom,
      };

      await axios.put(`http://localhost:8089/Beneficiaire/updateBeneficiaire2/${id}`, beneficiaireModifie);

      navigate(`/consulterBeneficiaire/${id}`);
    } catch (error) {
      console.error('Erreur lors de la modification du bénéficiaire :', error);
    }
  };

  if (!beneficiaire) {
    return <div>Chargement...</div>;
  }

  return (
    <Box sx={{ width: '95%', marginX: '2%' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '1%' }}>
        <h1>Modifier le bénéficiaire</h1>

        <TextField label="Nom" value={nom} onChange={handleNomChange} fullWidth />
        <TextField label="Prénom" value={prenom} onChange={handlePrenomChange} fullWidth />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            component={Link}
            to={`/beneficiaires`}
          >
            Annuler
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleModifier}
          >
            Enregistrer
          </Button>

        </Box>
      </Paper>
    </Box>
  );
};

export default ModifierBeneficiaire;
