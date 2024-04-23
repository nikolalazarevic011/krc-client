import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Container, Toolbar, Typography } from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import { useLocation } from "react-router-dom";

import CustomLoadingButton from "./CustomLoadingButton";
import { basePath } from "../../App";
import { isNotMobile } from "../navigation/Root";

const DrawerItemListView = ({ data, route }) => {
    const location = useLocation();

    const isOnClassesRoute =
        location.pathname === `${basePath}classes` ||
        location.pathname === "/classes";
        

    return (
        <>
            <Toolbar />
            <Container maxWidth="md" sx={{ mt: 3 }}>
                <Typography
                    variant="h5"
                    textAlign="center"
                    my={5}
                    color="secondary.main"
                >
                    All available {route}
                </Typography>
                <List sx={{mb:2}}>
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
                                    text={isNotMobile? 'View Details' : 'Open'}
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
                                sx={{
                                    color: "secondary.main",
                                    maxWidth: { xs: '60%', sm: '75%', md: '85%' }, // Adjust these values as needed
                                    // whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis' // Adds an ellipsis if the text is too long
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default DrawerItemListView;
