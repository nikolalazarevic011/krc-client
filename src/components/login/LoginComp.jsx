import React from "react";
import { Grid, Toolbar, Typography } from "@mui/material";
import background from "../../assets/imgs/gary-butterfield-XGKSeGYGP0A-unsplash.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoginForm from "./LoginForm";

const LoginComp = () => {

    // const isSubmitting = navigation.state === "submitting";



    //for error data

    // const handleClick = () => {
    //     if (errorData) {
    //         setOpen(true);
    //     }
    // };

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
                        <CardContent 
                        sx={{ color: "secondary.main" }}
                        >
                            <Typography
                                // fontSize={}
                                sx={{}}
                                // gutterBottom
                            >
                                Login
                            </Typography>
                            <LoginForm
                                // isSubmitting={isSubmitting}
                                // handleClick={handleClick}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={false} sm={5}></Grid>
            </Grid>
        </>
    );
};

export default LoginComp;
