import { CenterFocusStrong, Directions, Logout, Person2 } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';    
import Forfait from "../../screens/Forfait";

export const mainMenuData = [
    {
        title: 'Dashboard',
        icon: <DashboardRoundedIcon/>,
        path: '/'
    },


    {
        title: 'Beneficiaire',
        icon: <Person2/>,
        path: '/beneficiaires'
    },
    {
        title: 'Centre de cout',
        icon: <CenterFocusStrong/>,
        path: '/centreCouts'
    },
   
    {
        title: 'forfait',
        icon: <Directions/>,
        path: '/forfaits'
    },
]

export const otherMenuData = [
    {
        title: 'Settings',
        icon: <SettingsIcon/>,
        path: '/settings'
    },
    {
        title: 'Log-out',
        icon: <Logout/>,
        path: '/logout'
    }
]