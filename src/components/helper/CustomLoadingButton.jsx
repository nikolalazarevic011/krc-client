import * as React from "react";
import { Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@mui/material/styles";

const CustomLoadingButton = ({ path, text, route }) => {
    // const theme = useTheme();
    // const isSmallScreen = theme.breakpoints.values.sm > window.innerWidth;
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clickHandler = (path) => {
        setIsSubmitting(true);
        if (route === "handouts" || route === "resources") {
            // Open the link in a new tab
            window.open(path, "_blank");
        } else {
            // Navigate within the app
            navigate(path);
        }
        setIsSubmitting(false);
    };

    return (
        <LoadingButton
            variant="contained"
            loading={isSubmitting}
            color="secondary"
            // endIcon={isSmallScreen ? null : <InfoIcon color="bgWhite" />}
            onClick={() => clickHandler(path)}
            sx={{ width: { xs: "30px", sm: "150px" } }}
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
