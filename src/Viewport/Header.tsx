import React, { useState } from "react";

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AppBar from '@mui/material/AppBar';
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { GetUser } from '@/auth/getUser';

const Header = () => {
    const navigate = useNavigate();
    const [person, setPerson] = useState<any>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    GetUser(setPerson);

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

    const logout = async () => {
        localStorage.clear();
        // await fetch(`https://${import.meta.env.VITE_AUTH_DOMAIN}/logout`, {
        //     headers: {
        //         'content-type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     },
        // });
        window.location.href = '/';
    }


    return (
        <AppBar position="relative" sx={{ padding: 1 }} elevation={0} >
            <Toolbar variant='dense' sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <Link underline="none" sx={{ display: 'flex', '& svg': { fontSize: '2rem', mr: 1 }, alignItems: 'center', color: 'info.main', cursor: 'pointer' }} onClick={() => handleNavigate("/")}>
                    <Typography color="background.paper">Messages</Typography>
                </Link>
                {/* {loading && <Skeleton width={100} height={24} />} */}


                {person ?
                    <>
                        <Button onClick={handleClick} color="inherit" endIcon={<Avatar sx={{ width: 24, height: 24 }} alt={person.name} src={person.picture} />} >
                            {person.name}
                        </Button>
                        <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleClose}  >
                            <MenuItem onClick={() => handleNavigate("/account")}>
                                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                                <Typography >Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => logout()}>
                                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </>
                    :
                    <Box>
                        <Button onClick={() => handleNavigate("/sign-up")} color="inherit" >Sign Up</Button>
                        <Button onClick={() => handleNavigate('/login')} color="inherit" >Login</Button>
                    </Box>
                }

            </Toolbar>
        </AppBar>
    )
}

export default Header