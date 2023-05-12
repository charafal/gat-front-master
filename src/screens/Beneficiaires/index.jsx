import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  }
});

export default function TableBasic() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get("http://172.22.25.208:8089/beneficiaires");
      console.log(result.data)
   

      const statuts = result.data.map((element) => element.rfBeneficiaire.statutBeneficiaire);
      console.log(statuts);


      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: "nom",
      field: "nom"
    },
    {
      name: "prenom",
      field: "prenom"
    },
    {
      name: "matricule",
      field: "matricule"
    },
    {
      name: "dateDepart",
      field: "date_depart"
    },
    {
      name: "rfdirection",
      field: "rfdirection" // Si le champ de l'objet est "nom"
    },
    {
      name: "rfbeneficiaire",
      field: "rfBeneficiaire",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = data[tableMeta.rowIndex];
          return rowData.rfBeneficiaire.statutBeneficiaire;
        }
      }
    },
    {
      name: "centrecout",
      field: "Centre_Cout"
    }  ,
  ];

  const options = {   
    filterType: 'checkbox'
  };

  const handleAddBeneficiaire = () => {
    // Code pour ajouter un bénéficiaire
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleAddBeneficiaire}
      >
        Ajouter bénéficiaire
      </Button>
      <MUIDataTable
        title={"Liste des bénéficiaires"}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
}


