import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, FormControl, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddBeneficiaire from './AddBeneficiaire';

const Beneficiaire = () => {
  const [rows, setRows] = useState([]);
  const [searchInputNom, setSearchInputNom] = useState('');
  const [searchInputPrenom, setSearchInputPrenom] = useState('');
  const [searchInputMatricule, setSearchInputMatricule] = useState('');

  useEffect(() => {
    fetchBeneficiaires();
  }, []);

  const fetchBeneficiaires = async (page) => {
    try {
      const response = await axios.get('http://localhost:8089/beneficiaire/beneficiares', {
        params: {
          page: page,
          pageSize: 5
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching beneficiaires:', error);
    }
  };

  const handleSearch = async () => {
    if (searchInputNom === '' && searchInputPrenom === '' && searchInputMatricule === '') {
      fetchBeneficiaires();
      return;
    }
    try {
      const response = await axios.get('http://localhost:8089/beneficiaire/recherche', {
        params: {
          nom: searchInputNom,
          prenom: searchInputPrenom,
          matricule: searchInputMatricule,
          page: 1,
          pageSize: 5
        }
      });
      setRows(response.data);
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



  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'matricule', headerName: 'Matricule', width: 130 },
    { field: 'dateDepart', headerName: 'Date de Départ', width: 160 },
    { field: 'rfDirection', headerName: 'Direction', width: 130, valueGetter: (params) => params.row.rfDirection.nomDirection },
    { field: 'rfBeneficiaire', headerName: 'Statut Bénéficiaire', width: 180, valueGetter: (params) => params.row.rfBeneficiaire.statutBeneficiaire },
    { field: 'centreCout', headerName: 'Centre de Coût', width: 130, valueGetter: (params) => params.row.centreCout.centreCout },
  ];

  return (
    <>
      <Box sx={{ width: '95%', marginX: '2%' }}>

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
          to="/AddBeneficiaire"
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
