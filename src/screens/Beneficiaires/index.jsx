import { useEffect } from "react";
import { useState } from "react"
import axios from "axios";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';


function Beneficiaires() {
  const [beneficiaires, setBeneficiaires] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://172.22.25.208:8089/beneficiaires'
      );

      console.log(result.data)
      setBeneficiaires(result.data);
    };

    fetchData();
  }, []);
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch', height: '3rem' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Rechercher par Id"
          />

          <TextField
            required
            id="outlined-required"
            label="Rechercher par Matricule"
          />

         

          <Button variant="contained" sx={{ m: 1, width: '25ch', height: '3rem' }}>recherche</Button>
        </div>
      </Box>

      <TableContainer sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>version</TableCell>
              <TableCell>nom</TableCell>
              <TableCell>prenom </TableCell>
              <TableCell>matricule</TableCell>
              <TableCell>garantie</TableCell>
              <TableCell>date_depart</TableCell>
              <TableCell>creeLe</TableCell>
              <TableCell>creePar</TableCell>
              <TableCell>modifierLe</TableCell>
              <TableCell>modifierPar</TableCell>
              <TableCell>rfdirection</TableCell>
              <TableCell>rfbeneficiaire</TableCell>
              <TableCell>centrecout</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beneficiaires.map(beneficiaires => (
              <TableRow key={beneficiaires.id}>
                <TableCell>{beneficiaires.id}</TableCell>
                <TableCell>{beneficiaires.version}</TableCell>
                <TableCell>{beneficiaires.nom}</TableCell>
                <TableCell>{beneficiaires.prenom}</TableCell>
                <TableCell>{beneficiaires.matricule}</TableCell>
                <TableCell>{beneficiaires.garantie}</TableCell>
                <TableCell>{beneficiaires.dateDepart}</TableCell>
                <TableCell>{beneficiaires.creeLe}</TableCell>
                <TableCell>{beneficiaires.creePar}</TableCell>
                <TableCell>{beneficiaires.modifierLe}</TableCell>
                <TableCell>{beneficiaires.modifierPar}</TableCell>
                <TableCell>{beneficiaires.rfDirection.id}</TableCell>
                <TableCell>{beneficiaires.rfBeneficiaire.statutBeneficiaire}</TableCell>
                <TableCell>{beneficiaires.centreCout.centreCout}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}


export default Beneficiaires;