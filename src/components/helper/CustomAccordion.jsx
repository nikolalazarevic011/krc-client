import React from "react";
import {
    List,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemButton,
    Button,
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UIActions } from "../../store/ui";
import store from "../../store";
import { isNotMobile } from "../../components/navigation/Root";
import { NavLink as reactNavLink } from "react-router-dom";

const CustomAccordion = ({ title, array }) => {
    const classes = {
        list: {
            backgroundColor: "#C3DAC3",
        },
    };
    const handleMenuItemClick = () => {
        if (!isNotMobile) {
            store.dispatch(UIActions.toggleDrawer(false));
        }
    };

    return (
        <Accordion sx={classes.list}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {array.map((item, index) => (
                        <Stack key={index}>
                            {/* <Link ? */}
                            <Button
                                sx={{
                                    borderBottom:
                                        index === array.length - 1
                                            ? 0
                                            : "1px solid black",
                                    borderBottomColor: "primary.main",
                                }}
                                fullWidth
                                component={reactNavLink}
                                to={`/${item.path}`}
                                onClick={handleMenuItemClick}
                            >
                                <ListItemButton>
                                    {/* <ListItemText
                                    // primary={item.text}
                                    > */}
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "primary.main",
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    {/* </ListItemText> */}
                                </ListItemButton>
                            </Button>
                        </Stack>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
