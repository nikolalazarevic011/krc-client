import * as React from "react";
import {  Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
    useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const CustomLoadingButton = ({path, text}) => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clickHandler = (path) => {
        setIsSubmitting(true);
        navigate(path);
    };

    return (
        <LoadingButton
            // component={reactNavLink}
            // to={item.slug}
            variant="contained"
            loading={isSubmitting}
            color="secondary"
            endIcon={<InfoIcon color="bgWhite" />}
            onClick={() => clickHandler(path)}
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
