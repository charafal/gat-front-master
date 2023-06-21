import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { mainMenuData, otherMenuData } from './SideBarData'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Container, Menu, Avatar, MenuItem, Badge, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {drawerWidth} from '../../constants'
import Content from '../Routes/index.jsx'
import { Image } from 'mui-image'
import RmaLogo from '../../assets/rma-logo.svg'

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        overflowX: 'hidden',
      },
    },
  }),
);



export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate(); 
  const handleRouteChange = (path) =>{ 
    navigate(path);
  }

  const [selectedPath, setselectedPath] = useState('/');
  const handleListItemClick = (path) => {
    setselectedPath(path);
  };
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: "white" }}>
         <Toolbar>
         <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              
              ...(open && { display: 'none' }),
            }}
         >
            <MenuIcon sx={{color: theme.palette.primary.dark}}/>
         </IconButton>
         <Box sx={{ flexGrow: 1 }}>
            <Image src={RmaLogo} width='10%' duration={500}/>
         </Box>

               <Box sx={{padding: '0px 12px'}}>
                  <IconButton aria-label={notificationsLabel(5)}>
                     <Badge color="error" badgeContent={5} showZero>
                           <NotificationsIcon />
                     </Badge>
                  </IconButton>
               </Box>
                <Box>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Shanks" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
          </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{
          sx: {
            backgroundColor: theme.palette.primary.dark,
            color: 'white'
          }
        }}>
        <DrawerHeader sx={{justifyContent: 'space-between'}}>
          <Typography variant='h4' 
            sx={{
              fontWeight: 'bolder', 
              padding: '0 16px', 
              color: 'white',
              fontSize: '32px',
              }}>GAT
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }}/> : <ChevronLeftIcon style={{ color: 'white' }}/>}
          </IconButton>
        </DrawerHeader>
        
        <List>
         {mainMenuData.map((val, key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton selected={selectedPath === val.path}
                onClick={() => {
                  handleListItemClick(val.path);
                  handleRouteChange(val.path);
                }}>
              <ListItemIcon sx={{color: selectedPath === val.path ? theme.palette.primary.main : 'white'}}>
                {val.icon}
              </ListItemIcon>
              <ListItemText primary={val.title} />
            </ListItemButton>
          </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: theme.palette.primary.light, opacity: '.3' }}/>
        <List>
          {otherMenuData.map((val, key) => (
            <ListItem key={key} disablePadding>
              <ListItemButton selected={selectedPath === val.path}
                  onClick={() => {
                    handleListItemClick(val.path);
                    handleRouteChange(val.path);
                  }}>
                <ListItemIcon sx={{color: selectedPath === val.path ? theme.palette.primary.main : 'white'}}>
                  {val.icon}
                </ListItemIcon>
                <ListItemText primary={val.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
          <Container component="main" style={{  

}}
sx={{
  borderRadius: '8px',
  backgroundColor: '#F5F5F5',
  boxShadow: '0',
  marginTop: '96px' 
  }}    >
            <Content/>
        </Container>
    </Box>
  );
}