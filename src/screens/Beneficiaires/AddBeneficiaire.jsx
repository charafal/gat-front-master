import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddBeneficiaire = ({ onAddBeneficiaire }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [matricule, setMatricule] = useState('');
  const [version, setVersion] = useState('');
  const [garantie, setGarantie] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [RfDirection, setRfDirection] = useState('');
  const [RfBeneficiaire, setRfBeneficiaire] = useState('');
  const [CentreCout, setCentrCout] = useState('');
  const [creeLe, setCreeLe] = useState('');
  const [creePar , setCreePar] = useState('');
  const [modifierLe, setModfierLe] = useState('');
  const [modifierPar, setModifierPar] = useState('');

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };

  const handleMatriculeChange = (e) => {
    setMatricule(e.target.value);
  };

  const handleVersionChange = (e) => {
    setVersion(e.target.value);
  };

  const handleGarantieChange = (e) => {
    setGarantie(e.target.value);
  };

  const handleDateDepartChange = (e) => {
    setDateDepart(e.target.value);
  };
  const handleRfDirectionChange = (e) =>{
    setRfDirection(e.target.value);
  }
  const handleRfBeneficiaireChange = (e)=>{
    setRfBeneficiaire(e.target.value);
  }
  const handleCentreCoutChange = (e) =>{
    setCentrCout(e.target.value);
  }
  const handlecreeLeChange = (e) =>{
    setCreeLe(e.target.value);
  }
  const handlecreeParChange = (e) =>{
    setCreePar(e.target.value);
  } 
  const handlemodifierLeChange = (e)=>{
    setModfierLe(e.target.value);
  }
  const handlemodifierParChange = (e)=>{
    setModifierPar(e.target.value);
  }

  const handleAddBeneficiaire = () => {
    const newBeneficiaire = {
      version: version,
      nom: nom,
      prenom: prenom,
      matricule: matricule,
      garantie: garantie,
      dateDepart: dateDepart,
      RfDirection:RfDirection,
      RfBeneficiaire: RfBeneficiaire,
      CentreCout: CentreCout,
      creeLe: creeLe,
      creePar: creePar,
      modifierLe: modifierLe,
      modifierPar: modifierPar,
    };

    onAddBeneficiaire(newBeneficiaire);

    setNom('');
    setPrenom('');
    setMatricule('');
    setVersion('');
    setGarantie('');
    setDateDepart('');
    setRfDirection('');
    setRfBeneficiaire('');
    setCentrCout('');
    setCreeLe('');
    setCreePar('');
    setModfierLe('');
    setModifierPar('');
    alert("good")
  };

  return (
    <Box
      sx={{
        display: '',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '100%',
        margin: '',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      <h2>Ajouter un bénéficiaire</h2>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
        <TextField
          label="Nom"
          variant="outlined"
          value={nom}
          onChange={handleNomChange}
          fullWidth
        />
        <TextField
          label="Prénom"
          variant="outlined"
          value={prenom}
          onChange={handlePrenomChange}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
         
        label="Matricule"
        variant="outlined"
        value={matricule}
        onChange={handleMatriculeChange}
        fullWidth
      />
      <TextField
        label="Version"
        variant="outlined"
        value={version}
        onChange={handleVersionChange}
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="Garantie"
        variant="outlined"
        value={garantie}
        onChange={handleGarantieChange}
        fullWidth
      />
      <TextField
        label="Date de départ"
        variant="outlined"
        value={dateDepart}
        onChange={handleDateDepartChange}
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="RfDirection"
        variant="outlined"
        value={RfDirection}
        onChange={handleRfDirectionChange}
        fullWidth
      />
      <TextField
        label="RfBenenficiaire"
        variant="outlined"
        value={RfBeneficiaire}
        onChange={handleRfBeneficiaireChange}
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="Centre de cout"
        variant="outlined"
        value={CentreCout}
        onChange={handleCentreCoutChange}
        fullWidth
      />
      <TextField
        label="Cree Le"
        variant="outlined"
        value={creeLe}
        onChange={handlecreeLeChange}
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="Cree Par"
        variant="outlined"
        value={creePar}
        onChange={handlecreeParChange}
        fullWidth
      />
      <TextField
        label="Modifier Le"
        variant="outlined"
        value={modifierLe}
        onChange={handlemodifierLeChange}
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', margin:'10px' }}>
      <TextField 
        label="Modifier Par"
        variant="outlined"
        value={modifierPar}
        onChange={handlemodifierParChange}
        fullWidth
      />
      </Box>
      
      <Button variant="contained" color="primary" onClick={handleAddBeneficiaire}>
        Ajouter
      </Button>
    </Box>
  );
};

export default AddBeneficiaire;
