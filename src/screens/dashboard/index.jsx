import { Typography, Box, Link } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Dashboard() {
  const theme = useTheme();
  return (
    <Box>
        <Typography variant="h6">Dashboard</Typography>
        <Typography variant="p" sx={{color: theme.palette.primary.disabled, fontSize: '.9rem'}}>
          You have 
          <Link href="#" underline="none"> 5 notifications</Link>
        </Typography>
        
    </Box>
  );
}

export default Dashboard;
