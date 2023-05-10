import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.css';
import SideBar from './components/SideBar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e6fcf',
      dark: '#121b3e'
    },
    text: {
      primary: '#42526E',
      disabled: '#7F8898'
    },
    background: {
      default: "#F5F5F5"
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SideBar/>
      </div>
    </ThemeProvider>
  );
}

export default App;