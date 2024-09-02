"use client";

import React, {useState} from 'react';
import {AppBar, Badge, IconButton, InputBase, Toolbar, Tooltip, Typography, Menu, MenuItem} from '@mui/material';
import {
    AccountCircle as AccountCircleIcon,
    Home as HomeIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import './AppTopBarStyles.css';

const AppTopBar: React.FC = () => {
    const [categoriesAnchorEl, setCategoriesAnchorEl] = useState<null | HTMLElement>(null);
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);

    const handleCategoriesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setCategoriesAnchorEl(event.currentTarget);
    };
    const handleCategoriesMenuClose = () => {
        setCategoriesAnchorEl(null);
    };

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };
    const handleAccountMenuClose = () => {
        setAccountAnchorEl(null);
    };

    return (
        <AppBar sx={{bgcolor: "var(--primary-background)"}}>
            <Toolbar>
                <IconButton edge="start">
                    <HomeIcon/>
                </IconButton>
                <Typography variant="h6" sx={{flexGrow: 1, color: 'var(--primary-text)'}}>
                    Blog
                </Typography>


                <IconButton className="icon-button" onMouseEnter={handleCategoriesMenuOpen}>
                    Categories
                </IconButton>
                <Menu
                    anchorEl={categoriesAnchorEl}
                    open={Boolean(categoriesAnchorEl)}
                    onClose={handleCategoriesMenuClose}
                    MenuListProps={{
                        onMouseLeave: handleCategoriesMenuClose,
                    }}
                >
                    <MenuItem>Category 1</MenuItem>
                    <MenuItem>Category 2</MenuItem>
                    <MenuItem>Category 3</MenuItem>
                </Menu>


                <IconButton className="icon-button">About</IconButton>
                <IconButton className="icon-button">Contact</IconButton>

                <div className="search-container">
                    <SearchIcon className="search-icon"/>
                    <InputBase className="input-base" placeholder="Search…"
                               inputProps={{'aria-label': 'search google maps'}}/>
                </div>

                <Tooltip title="Notifications">
                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                </Tooltip>

                <div>
                    <IconButton className="icon-button" onClick={handleAccountMenuOpen}> <AccountCircleIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={accountAnchorEl}
                        open={Boolean(accountAnchorEl)}
                        onClose={handleAccountMenuClose}
                        MenuListProps={{
                            onClick: handleAccountMenuClose,
                        }}
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Log out</MenuItem>
                    </Menu>
                </div>

            </Toolbar>
        </AppBar>
    );
};

export default AppTopBar;
