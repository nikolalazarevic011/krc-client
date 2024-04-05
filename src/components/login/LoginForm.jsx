import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Form } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

const LoginForm = ({ isSubmitting, handleClick }) => {
    return (
        <Form
            method="post"
            sx={{
                width: "100%",
                marginTop: (theme) => theme.spacing(1),
            }}
            noValidate
        >
            <TextField
                variant="outlined"
                type="username"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                sx={{ mb: -1 }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
            />
            <LoadingButton
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
                loading={isSubmitting}
                onClick={handleClick}
                sx={{ position: "relative" }}
            >
                <Typography color="bgWhite.main">
                    {isSubmitting ? "Submitting" : "Sign In"}
                </Typography>
            </LoadingButton>
        </Form>
    );
};

export default LoginForm;
