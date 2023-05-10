import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Box, Menu, Tooltip, IconButton, Avatar, MenuItem, Badge, Paper, InputBase, Container } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { drawerWidth } from '../../constants'

function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
}

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

  return (
    <AppBar
        position="static"
        sx={{ 
            width: `calc(100% - ${drawerWidth}px)`, 
            ml: `${drawerWidth}px`, 
            mt: '16px', 
            borderRadius: '8px', 
            backgroundColor: '#F5F5F5',
            boxShadow: 0}}
        >
        <Container maxWidth="">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                        >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search...' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
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
        </Container>
    </AppBar>
  );
}