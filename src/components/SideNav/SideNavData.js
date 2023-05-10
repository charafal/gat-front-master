import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpIcon from '@mui/icons-material/Help';

export const sideNavData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon/>,
        link: '/dash'
    },
    {
        title: "Home",
        icon: <HomeIcon/>,
        link: '/home'
    },
    {
        title: "Help Center",
        icon: <HelpIcon/>,
        link: '/help'
    }
]