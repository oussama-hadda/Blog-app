"use client";

import React, { useState } from 'react';
import { AppBar, Badge, IconButton, InputBase, Toolbar, Tooltip, Typography, Menu, MenuItem } from '@mui/material';
import {
    AccountCircle as AccountCircleIcon,
    Home as HomeIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import './AppTopBarStyles.css';

const AppTopBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar sx={{ bgcolor: "var(--primary-background)" }}>
            <Toolbar>
                <IconButton edge="start">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'var(--primary-text)' }}>
                    Blog
                </Typography>

                <div>
                    <IconButton className="icon-button" onMouseEnter={handleMenuOpen}>
                        Categories
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            onMouseLeave: handleMenuClose,
                        }}
                    >
                        <MenuItem >Category 1</MenuItem>
                        <MenuItem >Category 2</MenuItem>
                        <MenuItem >Category 3</MenuItem>
                    </Menu>
                </div>

                <IconButton className="icon-button">About</IconButton>
                <IconButton className="icon-button">Contact</IconButton>

                <div className="search-container">
                    <SearchIcon className="search-icon" />
                    <InputBase className="input-base" placeholder="Search…" inputProps={{ 'aria-label': 'search google maps' }} />
                </div>

                <Tooltip title="Notifications">
                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>

                <IconButton className="iconButton"> <AccountCircleIcon /> </IconButton>

            </Toolbar>
        </AppBar>
    );
};

export default AppTopBar;
