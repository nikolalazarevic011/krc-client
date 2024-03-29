import React from 'react'
import { Container, Typography, Button, Stack } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { basePath } from '../App';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
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
                <Button variant="contained" color="primary">
                    Go to Home
                </Button>
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
