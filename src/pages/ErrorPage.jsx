import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { basePath } from "../App";
import { Link, useNavigation } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const ErrorPage = () => {
    const navigation = useNavigation(); // Use useNavigation hook to access navigation state
    const isNavigating = navigation.state === "loading"; // Check if the navigation state is 'loading'

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 100, color: "error.main" }} />
            <Typography variant="h4" align="center" gutterBottom>
                Oops! Something went wrong.
            </Typography>
            <Typography variant="body1" align="center" paragraph>
                We're sorry, but an unexpected error occurred.
            </Typography>
            <Stack spacing={2} direction="row">
                <Link to={basePath}>
                    <LoadingButton
                        loading={isNavigating}
                        variant="contained"
                        color="primary"
                    >
                        Go to Home
                    </LoadingButton>
                </Link>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => window.history.back()}
                >
                    Go Back
                </Button>
            </Stack>
        </Container>
    );
};

export default ErrorPage;
