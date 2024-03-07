// import * as React from "react";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItemText from "@mui/material/ListItemText";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import { Button, Container, Link, Toolbar, Typography } from "@mui/material";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import DownloadIcon from "@mui/icons-material/Download";
// import InfoIcon from "@mui/icons-material/Info";
// import { NavLink as reactNavLink, useLocation } from "react-router-dom";

// const DrawerItemListView = ({ data }) => {
//     //blocked by CORS, should be working?

//     // const handleDownload = (path, fileName) => {
//     //     fetch(path)
//     //         .then((response) => response.blob())
//     //         .then((blob) => {
//     //             const url = window.URL.createObjectURL(new Blob([blob]));
//     //             const link = document.createElement("a");
//     //             link.href = url;
//     //             link.setAttribute("download", fileName);
//     //             document.body.appendChild(link);
//     //             link.click();
//     //             link.parentNode.removeChild(link);
//     //         })
//     //         .catch((error) => {
//     //             console.error("Error downloading file:", error);
//     //         });
//     // };

//     return (
//         <>
//             <Toolbar />
//             <Container maxWidth="sm" sx={{ mt: 3 }}>
//                 <List>
//                     {data.map((item) => (
//                         <ListItem
//                             key={item.id}
//                             secondaryAction={
//                                 <Button
//                                     component={reactNavLink}
//                                     to={item.slug}
//                                     variant="contained"
//                                     color="secondary"
//                                     endIcon={<InfoIcon color="bgWhite" />}
//                                 >
//                                     <Typography
//                                         sx={{
//                                             color: "bgWhite.main",
//                                         }}
//                                     >
//                                         View Details
//                                     </Typography>
//                                 </Button>
//                             }
//                         >
//                             <ListItemAvatar>
//                                 <Avatar>
//                                     <PictureAsPdfIcon />
//                                 </Avatar>
//                             </ListItemAvatar>
//                             <Link
//                                 href={item.class_document_1}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                             >
//                                 <ListItemText primary={item.title} />
//                             </Link>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Container>
//         </>
//     );
// };

// export default DrawerItemListView;

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

const DrawerItemListView = ({ data }) => {
    //blocked by CORS, should be working?

    // const handleDownload = (path, fileName) => {
    //     fetch(path)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             const url = window.URL.createObjectURL(new Blob([blob]));
    //             const link = document.createElement("a");
    //             link.href = url;
    //             link.setAttribute("download", fileName);
    //             document.body.appendChild(link);
    //             link.click();
    //             link.parentNode.removeChild(link);
    //         })
    //         .catch((error) => {
    //             console.error("Error downloading file:", error);
    //         });
    // };

    return (
        <>
            <Toolbar />
            <Container maxWidth="sm" sx={{ mt: 3 }}>
                <List>
                    {data.map((item) => (
                        <ListItem
                            key={item.id}
                            secondaryAction={
                                <CustomLoadingButton path={item.slug} text={'View Details'} />
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <PictureAsPdfIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <Link
                                href={item.class_document_1}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ListItemText primary={item.title} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default DrawerItemListView;
