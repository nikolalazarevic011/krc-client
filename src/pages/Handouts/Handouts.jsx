import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Container, Link } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";

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
];

const Handouts = () => {
    return (
        <>
            <Container maxWidth="md">
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                //possible link for download?
                                <IconButton edge="end" aria-label="delete">
                                    <DownloadIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <PictureAsPdfIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Link href={item.path} >
                                <ListItemText primary={item.text}  />                
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default Handouts;
