import React from "react";
import {
    Box,
    IconButton,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    ListItemIcon,
    Stack,
    Typography,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { isNotMobile } from "../navigation/Root";

const settings = [
    { text: "Logout", icon: <Logout fontSize="small" />, path: "/logout" },
];

const UserOptions = () => {
    // const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // !
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Stack
            direction="row"
            sx={{
                marginLeft: "auto", // Move UserOptions to the right
            }}
        >
            {/* {isNotMobile && (
                <Typography sx={{ mt: 1, mr: 1 }}>
                    Welcome user
                </Typography>
            )} */}

            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Nikola Sharp" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <Link
                        to={setting.path}
                        key={setting.text}
                        style={{ textDecoration: "none" }}
                    >
                        <MenuItem
                            onClick={handleCloseUserMenu}
                            style={{ color: "gray" }}
                        >
                            <ListItemIcon>{setting.icon}</ListItemIcon>
                            {setting.text}
                        </MenuItem>
                    </Link>
                ))}
            </Menu>
        </Stack>
    );
};

export default UserOptions;
