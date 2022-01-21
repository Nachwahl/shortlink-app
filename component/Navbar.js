import React from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Button from "@mui/material/Button";
import {signIn, signOut, useSession} from "next-auth/react";
import LocalPoliceRoundedIcon from '@mui/icons-material/LocalPoliceRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import {Logout} from "@mui/icons-material";
import md5 from "md5";
import Link from "next/link";
import {useRouter} from "next/router";

const drawerWidth = 240;

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
    width: `calc(${theme.spacing(9)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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


const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
    }),
);


const Navbar = ({children}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const {data: session, status} = useSession()
    const router = useRouter()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                            Build the Earth Shortlinks
                        </Typography>
                        {
                            status !== "authenticated" ?
                                <Button onClick={() => signIn()} color="inherit">Login</Button> :
                                <Box>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ml: 2}}
                                            aria-controls={openMenu ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMenu ? 'true' : undefined}
                                        >
                                            <Avatar sx={{width: 32, height: 32}}
                                                    src={`https://www.gravatar.com/avatar/${md5(session.user.email.toLowerCase().trim())}`}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={openMenu}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    >
                                        <MenuItem onClick={() => signOut()}>
                                            <ListItemIcon>
                                                <Logout fontSize="small"/>
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </Box>


                        }

                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List sx={{p: 1}}>
                        <Link href="/" passHref>
                            <ListItem button key={"test"} selected={router.route === "/"}
                                      sx={{borderRadius: "5px", mb: 1}}>
                                <ListItemIcon>
                                    <HomeRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"}/>
                            </ListItem>
                        </Link>
                        <ListItem button key={"shortlinks"} sx={{borderRadius: "5px", mb: 1}}>
                            <ListItemIcon>
                                <FormatListBulletedRoundedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Your Shortlinks"}/>
                        </ListItem>
                        <Link href="/admin" passHref>
                            <ListItem button key={"admindashboard"} sx={{borderRadius: "5px", mb: 1}} selected={router.route === "/admin"}>
                                <ListItemIcon>
                                    <LocalPoliceRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Administration"}/>
                            </ListItem>
                        </Link>

                    </List>
                </Drawer>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>
                    {children}
                </Box>
            </Box>
        </div>
    );
}

export default Navbar
