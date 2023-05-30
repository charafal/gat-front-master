import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'version', headerName: 'version ', width: 130 },
  { field: 'nomForfait', headerName: 'nomForfait', width: 130 },
  {
    field: 'option_forfait',
    headerName: 'option_forfait',
    type: 'String',
    width: 90,
  },
  {
    field: 'soldeData',
    headerName: 'soldeData ',
  
    width: 160,
   
  },
  { field: 'montant', headerName: 'montant', width: 130 },
  { field: 'dateActivation', headerName: 'dateActivation', width: 130 },
  { field: 'dateResiliation', headerName: 'dateResiliation', width: 130 },
  { field: 'dateRenouvelement', headerName: 'dateRenouvelement', width: 130 },
  { field: 'creeLe', headerName: 'creeLe', width: 130 },
  { field: 'creePar', headerName: 'creePar', width: 130 },

];

export default function Forfait() {
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = useState({
    version: '',
    nomForfait: '',
    optionForfait: ''
  });

  useEffect(() => {
    fetchForfaits();
  }, []);

  const fetchForfaits = async () => {
    try {
      const response = await axios.get('http://localhost:8089/forfaits');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching forfaits:', error);
    }
  };
  const handleAdd = () => {
    // Logique pour gérer l'ajout
  };


  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8089/forfaits/rechercheForfait', {
        params: { nomForfait: searchInput.nomForfait, version: searchInput.version }
      });
  
      const filteredRows = response.data.filter(forfait => {
        const matchesNomForfait = searchInput.nomForfait === '' || forfait.nomForfait.toLowerCase().includes(searchInput.nomForfait.toLowerCase());
        const matchesVersion = searchInput.version === '' || forfait.version.toLowerCase().includes(searchInput.version.toLowerCase());
        return matchesNomForfait && matchesVersion;
      });
  
      setRows(filteredRows);
    } catch (error) {
      console.error('Error searching forfaits:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

  setSearchInput({ ...searchInput, [name]: value });

  // Vérifier si la valeur du champ de recherche est vide
  if (name === 'nomForfait' && value === '') {
    fetchForfaits(); // Récupérer tous les forfaits
  }
  };

  return (
    <div
    style={{
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
>
  <Box>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <input
        type="text"
        name="version"
        placeholder="Version"
        value={searchInput.version}
        onChange={handleInputChange}
        style={{
          marginRight: '10px',
          border: 'none',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
      <input
        type="text"
        name="nomForfait"
        placeholder="Nom Forfait"
        value={searchInput.nomForfait}
        onChange={handleInputChange}
        style={{
          marginRight: '10px',
          border: 'none',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
      <input
        type="text"
        name="optionForfait"
        placeholder="Option Forfait"
        value={searchInput.optionForfait}
        onChange={handleInputChange}
        style={{
          marginRight: '10px',
          border: 'none',
          padding: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Rechercher
      </button>
    </div>
  </Box>

  <Box>
    <h1>Résultat de recherche</h1>
  </Box>

  <Box style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      checkboxSelection
    />
  </Box>
</div>

  );
}