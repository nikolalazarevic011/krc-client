import React, { useEffect, useState } from "react";
import { Grid, Toolbar, Typography } from "@mui/material";
import background from "../../assets/imgs/gary-butterfield-XGKSeGYGP0A-unsplash.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoginForm from "./LoginForm";
import { useActionData, useNavigation } from "react-router-dom";
import BasicSnackbar from "../helper/CustomSnackBar";

const LoginComp = () => {
    const errorData = useActionData();

    const navigation = useNavigation();

    const isSubmitting = navigation.state === "submitting";

    const [open, setOpen] = useState(errorData);

    const handleClick = () => {
        // console.log(errorData);
        if (errorData) {
            setOpen(true);
        }
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
                    backgroundPositionY: { xs: "0px", sm: "-20vh" },
                    backgroundPositionX: { xs: "-96vh", sm: "0" },
                    transform: "scalex(-1)",
                    display: "flex",
                }}
            >
                {/* <Toolbar /> */}
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
                            // backgroundColor:"secondary.main"
                        }}
                    >
                        <CardContent sx={{ color: "secondary.main" }}>
                            <Typography
                                // fontSize={}
                                sx={{}}
                                // gutterBottom
                            >
                                Login
                            </Typography>
                            <LoginForm
                                isSubmitting={isSubmitting}
                                handleClick={handleClick}
                            />
                        </CardContent>
                            <BasicSnackbar
                                open={open}
                                reason="clickaway"
                                onClose={handleClose}
                                severity="error"
                                message={errorData}
                            />
                    </Card>
                </Grid>
                <Grid item xs={false} sm={5}></Grid>
            </Grid>
        </>
    );
};

export default LoginComp;
