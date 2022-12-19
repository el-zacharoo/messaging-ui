import React, { useState } from "react";

import { useAuth0, User } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AppBar from '@mui/material/AppBar';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout }: User = useAuth0();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        setAnchorEl(null);
    }

    return (
        <AppBar position="relative" sx={{ padding: 1 }} elevation={0} >
            <Toolbar variant='dense' sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <Link underline="none" sx={{ display: 'flex', '& svg': { fontSize: '2rem', mr: 1 }, alignItems: 'center', color: 'info.main', cursor: 'pointer' }} onClick={() => handleNavigate("/")}>
                    <Typography color="background.paper">Messages</Typography>
                </Link>
                <Button onClick={handleClick} color="inherit" endIcon={<Avatar sx={{ width: 24, height: 24 }} alt={user.name} src={user.picture} />} >
                    {user.name}
                </Button>
                <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}  >
                    <MenuItem onClick={() => { handleNavigate("/account") }}>
                        <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                        <Typography >Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                        <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                        <Typography>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Header