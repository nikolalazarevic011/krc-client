import React, { useEffect, useState } from "react";
import { Grid, Toolbar, Typography } from "@mui/material";
import background from "../../assets/imgs/gary-butterfield-XGKSeGYGP0A-unsplash.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoginForm from "./LoginForm";
import { useActionData, useNavigation } from "react-router-dom";
import BasicSnackbar from "../helper/CustomSnackBar";
import { CardActions, Link } from "@mui/material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Divider
} from "@mui/material";

const LoginComp = () => {
    const errorData = useActionData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    const [open, setOpen] = useState(errorData);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleClick = () => {
        // console.log(errorData);
        if (errorData) {
            setOpen(true);
        }
        setOpen(null);
    };

    const handleClose = (event, reason) => {
        //don't close on click away
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        //for 1st click on login
        // Update the open state whenever errorData changes
        if (errorData) {
            setOpen(true);
        }
        setOpenDialog(true);
    }, [errorData]);

    return (
        <>
            <Toolbar />
            <Grid
                container
                sx={{
                    height: { xs: "95vh", sm: "90vh" },
                    backgroundImage: `url('${background}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPositionY: { xs: "0px", sm: "-19vh" },
                    backgroundPositionX: { xs: "-96vh", sm: "0" },
                    transform: "scalex(-1)",
                    display: "flex",
                }}
            >
                <Grid
                    item
                    xs={9}
                    sm={5}
                    textAlign="center"
                    sx={{
                        transform: "scalex(-1)",
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: { xs: 235, sm: 450 },
                            padding: 2,
                            mt: "20vh",
                            backgroundColor: "background.main",
                        }}
                    >
                        <CardContent
                            sx={{
                                color: "secondary.main",
                                position: "relative",
                            }}
                        >
                            <IconButton
                                onClick={handleDialogOpen}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: "secondary.main",
                                }}
                            >
                                Help
                            </IconButton>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ paddingTop: "36px" }}
                            >
                                Login
                            </Typography>
                            <LoginForm
                                isSubmitting={isSubmitting}
                                handleClick={handleClick}
                            />
                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                            <Link
                                href="https://kingdomrunningclub.org/member-register/"
                                target="_blank"
                                sx={{ textDecoration: "none", marginLeft: 2 }}
                            >
                                Register
                            </Link>
                            <Link
                                href="https://kingdomrunningclub.org/password-reset/"
                                target="_blank"
                                sx={{ textDecoration: "none", marginRight: 2 }}
                            >
                                Forget Password
                            </Link>
                        </CardActions>
                    </Card>
                    <Dialog open={openDialog} onClose={handleDialogClose}>
                        <DialogTitle>Member Instructions</DialogTitle>
                        <DialogContent>
                            <DialogContentText marginBottom={2}>
                                If you already have an account, close and
                                proceed to Login.
                            </DialogContentText>
                            <Divider sx={{ my: 2 }} /> {/* Here's the Divider with margin for spacing */}

                            <DialogContentText>
                                To access our online portal, KRC members seeking
                                registration should follow these steps:
                                <br />
                                Navigate to the following{" "}
                                <Link href="https://kingdomrunningclub.org/member-register/">
                                    link
                                </Link>
                                <br />
                                Complete the registration form provided.
                                <br />
                                Upon submission, your registration request will
                                be evaluated. Once approved, you will receive an
                                email confirming your access to the portal.
                            </DialogContentText>
                            <DialogContentText
                                sx={{
                                    mt: 2,
                                }}
                            >
                                For further assistance, please feel free to
                                contact us via email at{" "}
                                <Link href="mailto:web@livingwd.org">
                                    web@livingwd.org
                                </Link>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                onClick={handleDialogClose}
                                sx={{ mt: -4 }}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <BasicSnackbar
                        open={open}
                        reason="clickaway"
                        onClose={handleClose}
                        severity="error"
                        message={errorData}
                    />
                </Grid>
                <Grid item xs={false} sm={5}></Grid>
            </Grid>
        </>
    );
};

export default LoginComp;
