import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import {
    useNavigate,
} from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const StyledCard = styled(Card)({
    display: "grid",
    gridTemplateRows: "auto 1fr auto", // Header, content, and actions areas
    height: "590px", // Ensure the card takes full height
});

export default function VideoCardCopy({ title, url, description, toPage }) {
    // const navigation = useNavigation();
    // const isSubmitting = navigation.state === "loading"

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    //for only a singe button of 3 cards on main page to spin
    const clickHandler =  () => {
        setIsSubmitting(true);
         navigate(toPage);
     
    };
    return (
        <StyledCard
            sx={{ maxWidth: "545px", backgroundColor: "primary.light" }}
        >
            <CardHeader
                sx={{ color: "primary.main", backgroundColor: "primary.light" }}
                title={title}
                subheader="September 14, 2016"
            />
            <CardMedia>
                <VideoPlayer url={url} />
            </CardMedia>
            <CardContent
                sx={{ backgroundColor: "primary.light", overflow: "auto" }}
            >
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions
                disableSpacing
                sx={{ backgroundColor: "primary.light" }}
            >
                <LoadingButton
                    variant="contained"
                    loading={isSubmitting}
                    sx={{ backgroundColor: "secondary.main" }}
                    onClick={clickHandler}
                >
                    View All
                </LoadingButton>
            </CardActions>
        </StyledCard>
    );
}
