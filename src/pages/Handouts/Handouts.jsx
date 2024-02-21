import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

const menuItems = [
    {
        text: "Food Log",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/handouts-food_log.pdf",
    },
    {
        text: "Faith",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Notes.pdf",
    },
    {
        text: "Devotion",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Book_Excerpt.pdf",
    },
    {
        text: "Faith always wins",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Faith_Always_Wins.pdf",
    },
    {
        text: "Psalm 92",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_1/Psalm_92.pdf",
    },
    {
        text: "Mind Renewal Scriptures",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_2/WK2_KRC_MIND_RENEWAL_SCRIPTURES.pdf",
    },
    {
        text: "Dominating the Flesh",
        path: "https://batchmedia.s3.us-east-2.amazonaws.com/KRC/Weekly/Week_2/DominatingtheFlesh.pdf",
    },
    {
        text: "Nova Care Exercises",
        path: "https://www.kingdomrunningclub.org/media/attachments/2018/05/01/doc015.pdf",
    },
    {
        text: "Pre/Post Stretches",
        path: "https://www.kingdomrunningclub.org/media/attachments/2018/05/01/doc018.pdf",
    },
    // add rest as needed
    // { text: "", path: "" },
    // { text: "", path: "" },
    // { text: "", path: "" },
];

const Handouts = () => {


    //This was surrounding the list
    // const Demo = styled('div')(({ theme }) => ({
    //     backgroundColor: theme.palette.background.paper,
    //   }));

    //delete this? from api
    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            })
        );
    }
    return (
        <>
            <List>
                {generate(
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Single-line item" />
                    </ListItem>
                )}
            </List>
        </>
    );
};

export default Handouts;
