import * as React from "react";
import { Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";


const CustomLoadingButton = ({ path, text }) => {
    const theme = useTheme();
    const isSmallScreen = theme.breakpoints.values.sm > window.innerWidth;
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clickHandler = (path) => {
        setIsSubmitting(true);
        navigate(path);
    };

    return (
        <LoadingButton
            variant="contained"
            loading={isSubmitting}
            color="secondary"
            endIcon={isSmallScreen ? null : <InfoIcon color="bgWhite" />}
            onClick={() => clickHandler(path)}
            sx={{ width: { xs: "70px", sm: "170px" } }}
        >
            <Typography
                sx={{
                    color: "bgWhite.main",
                }}
            >
                {text}
            </Typography>
        </LoadingButton>
    );
};

export default CustomLoadingButton;
