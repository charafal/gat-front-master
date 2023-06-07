import React, { useState, useEffect } from 'react';
import { TextField, Button, Box , MenuItem} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const AddBeneficiaire = ({ onAddBeneficiaire }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [matricule, setMatricule] = useState('');
  const [version, setVersion] = useState('0');
  const [garantie, setGarantie] = useState('');
  const [dateDepart, setDateDepart] = useState('');
  const [rfDirection, setRfDirection] =  useState([]);
  const [rfBeneficiaire, setRfBeneficiaire] =  useState([]);
  const [centreCout, setCentrCout] = useState();
  const [creeLe, setCreeLe] = useState('');
  const [creePar , setCreePar] = useState('');
  const [modifierLe, setModfierLe] = useState('');
  const [modifierPar, setModifierPar] = useState('');
  const [centreCoutId, setCentreCoutId] = useState('');

    const [beneficiaire, setBeneficiaire]=useState({
        nom: 'nom',
        prenom : 'prenom',
        matricule: 'matricule',
        version: 'version',
        garantie: 'garantie',
        dateDepart : 'dateDepart',
        rfDirection :'rfDirection',
        rfBeneficiaire:'rfBeneficiaire',
        centreCout:'centreCout' 
    })

    // interface IcentreCout{
    //     centreCout:String
    // }
   
      
  const handleNomChange = (e) => {
    
    setBeneficiaire({...beneficiaire,nom:e.target.value})
  };

  const handlePrenomChange = (e) => {
    setBeneficiaire({...beneficiaire,prenom:e.target.value})
  };

  const handleMatriculeChange = (e) => {
    setBeneficiaire({...beneficiaire,matricule:e.target.value})
  };

  const handleVersionChange = (e) => {
    setBeneficiaire({...beneficiaire,version:e.target.value})
  };

  const handleGarantieChange = (e) => {
    setBeneficiaire({...beneficiaire,garantie:e.target.value})
  };

  const handleDateDepartChange = (e) => {
    setBeneficiaire({...beneficiaire,dateDepart:e.target.value})
  };
  const handleRfDirectionChange = (e) =>{
    setBeneficiaire({...beneficiaire,rfDirection:e.target.value});
    setRfDirection(e.target.value);
  }
  const handleRfBeneficiaireChange = (e)=>{
    setBeneficiaire({...beneficiaire,rfBeneficiaire:e.target.value});
    setRfBeneficiaire(e.target.value);

  }
  const handleCentreCoutChange = (e) =>{
    setBeneficiaire({...beneficiaire,centreCout:e.target.value});
    setCentreCoutId(e.target.value);
    setCentrCout(e.target.value);
  }
  const handlecreeLeChange = (e) =>{
    setBeneficiaire({...beneficiaire,creeLe:e.target.value})
  }
  const handlecreeParChange = (e) =>{
    setBeneficiaire({...beneficiaire,creePar:e.target.value})
  } 
  const handlemodifierLeChange = (e)=>{
    setBeneficiaire({...beneficiaire,modifierLe:e.target.value})
  }
  const handlemodifierParChange = (e)=>{
    setBeneficiaire({...beneficiaire,modifierPar:e.target.value})
  }
  
  const newBeneficiaire = {
    version: version,
    nom: nom,
    prenom: prenom,
    matricule: matricule,
    garantie: garantie,
    dateDepart: dateDepart,
    rfDirection:rfDirection,
    rfBeneficiaire: rfBeneficiaire,
    centreCout: centreCoutId,
    creeLe: creeLe,
    creePar: creePar,
    modifierLe: modifierLe,
    modifierPar: modifierPar,
    CentreCout_Id: centreCoutId,
  };



  useEffect(() => {
    const fetchCentreCout = async () => {
      try {
        const response = await axios.get('http://localhost:8089/centreCouts');
        setCentrCout(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des centres de coût :', error);
      }
    };
  
    fetchCentreCout();
  }, []);

  const [rfBeneficiaires, setRfBeneficiaires] = useState([]);
  const [centreeCout, setCentreCout] = useState([]);

  useEffect(() => {
    const fetchRfBeneficiaires = async () => {
      try {
        const response = await axios.get('http://localhost:8089/rfbeneficiaires');
        setRfBeneficiaires(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RfBeneficiaires :', error);
      }
    };

    fetchRfBeneficiaires();
  }, []);

  useEffect(() => {
    const fetchCentreCout = async () => {
      try {
        const response = await axios.get('http://localhost:8089/centreCouts');
        setCentreCout(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des centres de coût :', error);
      }
    };
  
    fetchCentreCout();
  }, []);
  
  const [rfDirections, setRfDirections] = useState([]);

  useEffect(() => {
    const fetchRfDirections = async () => {
      try { 
        const response = await axios.get('http://localhost:8089/rfdirections');
        setRfDirections(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des RfDirections :', error);
      }
    };

    fetchRfDirections();
  }, []);
  


  const handleAddBeneficiaire = async () => {
    try {
      console.log("Add")
      console.log("££££££££££££",beneficiaire)
      console.log("££££££££££££",rfBeneficiaire)
      console.log("££££££££££££",rfDirection)
      const ccentre = {id : centreCout}
      const rfben = {id : rfBeneficiaire}
      const rfdire = {id : rfDirection}

      beneficiaire.centreCout=ccentre
      beneficiaire.rfBeneficiaire=rfben
      beneficiaire.rfDirection=rfdire
      beneficiaire.version=0

      console.log(beneficiaire)
      const response = await axios.post('http://localhost:8089/Beneficiaire/add', beneficiaire, {
        
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        
        }

      });
      
      setOpen(true);
      onAddBeneficiaire(response.data); // Mettre à jour la liste des bénéficiaires
    } catch (error) {
  
      toast.error('Erreur lors de l\'enregistrement du bénéficiaire.');
  
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        backgroundColor: '',
      }}
    >
      <h2>Ajouter un bénéficiaire</h2>
      
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
        <TextField
          label="Nom"
          variant="outlined" 
          onChange={handleNomChange}
          fullWidth
        />
        <TextField
          label="Prénom"
          variant="outlined"
          
          onChange={handlePrenomChange}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
         
        label="Matricule"
        variant="outlined"
        
        onChange={handleMatriculeChange}
        fullWidth
      />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="Garantie"
        variant="outlined"
        
        onChange={handleGarantieChange}
        fullWidth
      />
      <TextField
       label="Date  départ"
       type="date"
       variant="outlined"
        
       onChange={handleDateDepartChange}
       fullWidth
       />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="RfDirection"
        variant="outlined"
        onChange={handleRfDirectionChange}
        fullWidth
        select
      >
        {rfDirections.map((rfDirection) => (
          <MenuItem key={rfDirection.id} value={rfDirection.id}>
            {rfDirection.nomDirection}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="RfBeneficiaire"
        variant="outlined"
        onChange={handleRfBeneficiaireChange}
        fullWidth
        select
      >
        {rfBeneficiaires.map((rfBeneficiaire) => (
          <MenuItem key={rfBeneficiaire.id} value={rfBeneficiaire.id}>
            {rfBeneficiaire.statutBeneficiaire}
          </MenuItem>
        ))}
      </TextField>
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', margin:'10px' }}>
      <TextField
        label="Centre de cout"
        variant="outlined"
        onChange={handleCentreCoutChange}
        fullWidth
        select
        >
        {centreeCout.map((centreCout) => (
            <MenuItem key={centreCout.id} value={centreCout.id}>
            {centreCout.centreCout}
            </MenuItem>
        ))}
        </TextField>

      
      </Box>
    
      <Button variant="contained" color="primary" onClick={handleAddBeneficiaire}
      component={Link}
      to="/beneficiaires">
        Sauvgarder
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>

    </Box>
    
  );
};

export default AddBeneficiaire;
