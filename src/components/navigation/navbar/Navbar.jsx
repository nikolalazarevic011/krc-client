import React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    Link, // Merged with NavLink
} from "@mui/material";
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    AccountCircle,
    MoreVert as MoreIcon,
    X as XIcon,
    Facebook as FacebookIcon,
    Home as HomeIcon,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../../store/index";
import { UIActions } from "../../../store/ui";
import { isNotMobile } from "../../navigation/Root";
import logoPic from "../../../assets/imgs/Logo_white.png";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    let isDrawerOpen = useSelector((state) => state.ui.toggleDrawer);

    const handleDrawerClick = () => {
        store.dispatch(UIActions.toggleDrawer(!isDrawerOpen));
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* add link component with to prop for each */}
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link href="https://twitter.com/livingwd">
                <MenuItem>
                    <IconButton
                        size="large"
                        aria-label="show 4 new mails"
                        color="inherit"
                    >
                        <Badge>
                            <XIcon />
                        </Badge>
                    </IconButton>
                    <p>X</p>
                </MenuItem>
            </Link>

            <Link href="https://www.facebook.com/KingdomRunningClub/">
                <MenuItem>
                    <IconButton size="large" color="inherit">
                        <Badge>
                            <FacebookIcon />
                        </Badge>
                    </IconButton>
                    <p>Facebook</p>
                </MenuItem>
            </Link>

            <Link href="https://www.kingdomrunningclub.org/">
                <MenuItem>
                    <IconButton size="large" color="inherit">
                        <Badge>
                            <HomeIcon />
                        </Badge>
                    </IconButton>
                    <p>KRC</p>
                </MenuItem>
            </Link>
            <Link>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Link>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
                        onClick={handleDrawerClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <NavLink to={"/"}>
                        <img
                            src={logoPic}
                            alt="Logo"
                            style={{
                                // height: "40px",
                                // marginRight: "10px",
                                height: isNotMobile ? "60px" : "35px", // Adjusted size for mobile
                                marginRight: isNotMobile ? "20px" : "15px", // No margin on mobile
                            }}
                        />
                    </NavLink>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    {/* to puch things to the right */}
                    <Box sx={{ flexGrow: 1 }} />
                    {/*  */}

                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            href="https://twitter.com/livingwd"
                        >
                            <Badge>
                                <XIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            href="https://www.facebook.com/KingdomRunningClub/"
                            size="large"
                            color="inherit"
                        >
                            <Badge>
                                <FacebookIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            href="https://www.kingdomrunningclub.org/"
                            color="inherit"
                            size="large"
                        >
                            {/* <Link to={"https://www.kingdomrunningclub.org/"}> */}
                            <Typography
                                // variant="h6"
                                //! noWrap
                                // component="div"
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    // mt: 1.5,
                                    // ml: 2,
                                    mr: 4,
                                    color: "white",
                                }}
                            >
                                KRC
                            </Typography>
                            {/* </Link> */}
                        </IconButton>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>

                    {/* three dots on mobile devices */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
