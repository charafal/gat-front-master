import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      field: "rfdirection"
    },
    {
      name: "rfbeneficiaire",
      field: "rfbeneficiaire"
    },
    {
      name: "centrecout",
      field: "centrecout"
    }

  ];

  const options = {
    filterType: 'checkbox'
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <MUIDataTable
        title={"Liste des bénéficiaires"}
        data={data}
        columns={columns}
        options={options}
      />
    </ThemeProvider>
  );
}
