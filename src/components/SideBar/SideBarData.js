import { CenterFocusStrong, Directions, Equalizer, Logout, Person2 } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';    

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
        title: 'Directions',
        icon: <Directions/>,
        path: '/directions'
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