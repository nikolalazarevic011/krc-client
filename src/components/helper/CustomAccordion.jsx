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
    Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UIActions } from "../../store/ui";
import store from "../../store";
import { isNotMobile } from "../../components/navigation/Root";
import { NavLink as reactNavLink, useLocation } from "react-router-dom";

const CustomAccordion = ({ title, array, loading }) => {
    const location = useLocation();

    const classes = {
        list: {
            backgroundColor: "#C3DAC3",
        },
        activeItem: {
            backgroundColor: "#E8EAF2",
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
                <Typography variant="body1">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {loading
                        ? Array.from(new Array(4)).map((_, index) => (
                              <Stack key={index} spacing={2}>
                                  <Skeleton variant="rounded" height={48}  />
                                  <Skeleton variant="text" height={4}/>
                              </Stack>
                          ))
                        : array.map((item, index) => (
                              <Stack key={index}>
                                  <Button
                                      sx={{
                                          borderBottom:
                                              index === array.length - 1
                                                  ? 0
                                                  : "1px solid",
                                          ...(location.pathname ===
                                              `/${item.slug}` &&
                                              classes.activeItem), // Apply selected style if the path matches
                                      }}
                                      fullWidth
                                      component={reactNavLink}
                                      to={`${item.url}/${item.slug}`}
                                      onClick={handleMenuItemClick}
                                  >
                                      <ListItemButton>
                                          <Typography
                                              variant="body2"
                                              sx={{
                                                  color: "primary.main",
                                              }}
                                          >
                                              {item.title}
                                          </Typography>
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
