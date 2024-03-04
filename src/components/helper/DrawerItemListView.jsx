import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Container, Link, Toolbar } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";

const DrawerItemListView = ({ data }) => {
    //blocked by CORS, should be working?
    const handleDownload = (path, fileName) => {
        fetch(path)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.error("Error downloading file:", error);
            });
    };
    return (
        <>
        <Toolbar/>
            <Container maxWidth="sm" sx={{mt:3}}>
                <List>
                    {data.map((item, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                //possible link for download?
                                <IconButton
                                    edge="start"
                                    aria-label="download"
                                    onClick={() =>
                                        handleDownload(
                                            item.path,
                                            item.path + ".pdf"
                                        )
                                    }
                                >
                                    <DownloadIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <PictureAsPdfIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Link
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ListItemText primary={item.text} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default DrawerItemListView;
