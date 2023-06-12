import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, FormControl, Paper,MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddBeneficiaire from './AddBeneficiaire';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import {InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const Beneficiaire = () => {
  const [rows, setRows] = useState([]);
  const [searchInputNom, setSearchInputNom] = useState('');
  const [searchInputPrenom, setSearchInputPrenom] = useState('');
  const [searchInputMatricule, setSearchInputMatricule] = useState('');
  const [searchInputCentreCout, setSearchInputCentreCout] = useState('');
const [searchInputDirection, setSearchInputDirection] = useState('');
const [searchInputStatutBeneficiaire, setSearchInputStatutBeneficiaire] = useState('');

  useEffect(() => {
    fetchBeneficiaires();
  }, []);

  const fetchBeneficiaires = async (page) => {
    try {
      const response = await axios.get('http://localhost:8089/Beneficiaire/beneficiares', {
        params: {
          page: page,
          pageSize: 5,
          sort: 'id,desc'
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching beneficiaires:', error);
    }
  };
  

  const handleSearch = async () => {
    if (searchInputNom === ''
     && searchInputPrenom === '' &&
      searchInputMatricule === ''&& 
      searchInputCentreCout === '' &&
    searchInputDirection === '' &&
    searchInputStatutBeneficiaire === '') {
      fetchBeneficiaires();
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8089/Beneficiaire/multi',{
        nom: searchInputNom,
        prenom: searchInputPrenom,
        matricule: searchInputMatricule,
        centreCout: searchInputCentreCout,
        rfDirection: searchInputDirection,
        rfBeneficiaire: searchInputStatutBeneficiaire
      }).then((response) => {
        console.log(response)
      setRows(response.data);
      return response.data})
    } catch (error) {
      console.error('Error searching beneficiaires:', error);
    }
  };

  const handleInputChangeNom = (e) => {
    setSearchInputNom(e.target.value);
  };

  const handleInputChangePrenom = (e) => {
    setSearchInputPrenom(e.target.value);
  };

  const handleInputChangeMatricule = (e) => {
    setSearchInputMatricule(e.target.value);
  };
  const handleInputChangeCentreCout = (e) => {
    setSearchInputCentreCout(e.target.value);
  };
  
  const handleInputChangeDirection = (e) => {
    setSearchInputDirection(e.target.value);
  };
  
  const handleInputChangeStatutBeneficiaire = (e) => {
    setSearchInputStatutBeneficiaire(e.target.value);
  };
  
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'matricule', headerName: 'Matricule', width: 130 },
    { field: 'dateDepart', headerName: 'Date de Départ', width: 160 },
    { field: 'rfDirection', headerName: 'Direction', width: 130, valueGetter: (params) => params.row.rfDirection.nomDirection },
    { field: 'rfBeneficiaire', headerName: 'Statut Bénéficiaire', width: 180, valueGetter: (params) => params.row.rfBeneficiaire.statutBeneficiaire },
    { field: 'centreCout', headerName: 'Centre de Coût', width: 130, valueGetter: (params) => params.row.centreCout.centreCout },
   
    {
      field: 'Modfier/Consulter',
      headerName: 'Modfier/Consulter',
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            aria-label="Modifier"
            component={Link}
            to={`/modifierBeneficiaire/${params.row.id}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Consulter"
            component={Link}
            to={`/consulterBeneficiaire/${params.row.id}`}
          >
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <Box sx={{width: '95%', marginX: '2%' }}>
      <Box sx={{width: '95%', marginX: '2%' }}>

        <Paper sx={{ width: "100%", mb: 2, padding: "1%" }}>
          <div>
            <Box sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              textAlign: "center",
            }}
            >
              <Box>
                
              </Box>

              <TextField
                label="Nom"
                variant="outlined"
                value={searchInputNom}
                onChange={handleInputChangeNom}
                placeholder="Rechercher par nom"
                fullWidth
              />
              <TextField
                label="Prénom"
                variant="outlined"
                value={searchInputPrenom}
                onChange={handleInputChangePrenom}
                placeholder="Rechercher par prénom"
                fullWidth
              />
              <TextField
                label="Matricule"
                variant="outlined"
                value={searchInputMatricule}
                onChange={handleInputChangeMatricule}
                placeholder="Rechercher par matricule"
                fullWidth
              />
              <TextField
                label="Centre de cout"
                variant="outlined"
                value={searchInputCentreCout}
                onChange={handleInputChangeCentreCout}
                placeholder="Rechercher par CentreCout"
                fullWidth
                select
                >
                {centreeCout.map((centreCout) => (
                    <MenuItem key={centreCout.id} value={centreCout.id}>
                    {centreCout.centreCout}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
   label="Direction"
   variant="outlined"
   value={searchInputDirection}
   onChange={handleInputChangeDirection}
   placeholder="Rechercher par Direction"
   fullWidth
   select
   InputProps={{
      endAdornment: (
         <InputAdornment position="end">
            {searchInputDirection && (
               <IconButton onClick={() => handleInputChangeDirection('')}>
                  <CancelIcon />
               </IconButton>
            )}
         </InputAdornment>
      )
   }}
>
   {rfDirections.map((rfDirection) => (
      <MenuItem key={rfDirection.id} value={rfDirection.id}>
         {rfDirection.nomDirection}
      </MenuItem>
   ))}
</TextField>
              <TextField
                label="Statut du bénéficiaire"
                variant="outlined"
                value={searchInputStatutBeneficiaire}
                onChange={handleInputChangeStatutBeneficiaire}
                placeholder="Rechercher par StatutBeneficiaire"
                fullWidth
                select

                >
                {rfBeneficiaires.map((rfBeneficiaire) => (
                  <MenuItem key={rfBeneficiaire.id} value={rfBeneficiaire.id}>
                    {rfBeneficiaire.statutBeneficiaire}
                  </MenuItem>
                ))}
              </TextField>
                <Button
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  Chercher
                </Button>
            

            </Box>
          </div>

        </Paper>

      </Box>

      <Box>
        <h1>Résultat de recherche</h1>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/addBeneficiaire"
        >
          Ajouter
        </Button>
      </Box>

      <Box style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
        />
      </Box>
      

    </>

  );
};

export default Beneficiaire;
