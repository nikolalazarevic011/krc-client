import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
    // useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import store from "../../store/index";
import { UIActions } from "../../store/ui";
import UserOptions from "./UserOptions";
import { NavLink, useLocation } from "react-router-dom";
import { isNotMobile } from "../navigation/Root";
import { useSelector } from "react-redux";
import logoPic from "../../imgs/Logo_white.png";

function Navbar() {
    const location = useLocation();

    let token = localStorage.getItem("token");
    //get drawer state
    let isDrawerOpen = useSelector((state) => state.ui.toggleDrawer);

    const handleDrawerClick = () => {
        store.dispatch(UIActions.toggleDrawer(!isDrawerOpen));
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                // backgroundColor: "primary.dark",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar>
                    {/* {(token || isOfficeAtHandRoute) && ( */}
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
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerClick}
                        sx={{
                            // display:
                            //     isNotMobile && isOfficeAtHandRoute
                            //         ? "none"
                            //         : "",
                            marginRight: 2,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* )} */}
                    

                    {/* {isNotMobile && (
                        <NavLink to={"/"}>
                            <img
                                src="/Logo_white.png"
                                alt="Logo"
                                style={{
                                    height: "46px",
                                    marginLeft: "10px",
                                    // flexGrow:0 ,
                                }}
                            />
                        </NavLink>
                    )} */}
                    <UserOptions />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
