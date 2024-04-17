import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Button, Container, Link, Toolbar, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import {
    NavLink as reactNavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import CustomLoadingButton from "./CustomLoadingButton";
import { basePath } from "../../App";

const DrawerItemListView = ({ data, route }) => {
    const location = useLocation();

    // const isOnClassesRoute = location.pathname === '/classes';
    const isOnClassesRoute =
        location.pathname === `${basePath}classes` ||
        location.pathname === "/classes";

    return (
        <>
            <Toolbar />
            <Container maxWidth="sm" sx={{ mt: 3 }}>
                <Typography
                    variant="h5"
                    textAlign="center"
                    my={5}
                    color="secondary.main"
                >
                    All available classes
                </Typography>
                <List>
                    {data.map((item, index) => (
                        <ListItem
                            key={index}
                            sx={{ my: { xs: 2, sm: false } }}
                            secondaryAction={
                                <CustomLoadingButton
                                    path={
                                        isOnClassesRoute
                                            ? item.class_number
                                            : item.slug
                                    }
                                    text={"View Details"}
                                    route={route}
                                ></CustomLoadingButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <InfoIcon />
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={item.title}
                                sx={{ color: "secondary.main" }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default DrawerItemListView;
