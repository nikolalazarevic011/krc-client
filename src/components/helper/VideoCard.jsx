import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme, hasUrl }) => ({
    display: "grid",
    gridTemplateRows: "auto 1fr auto", // Header, content, and actions areas
    height: hasUrl ? "610px" : "250px", // Conditional height based on hasUrl
}));
export default function VideoCardCopy({
    title,
    url,
    description,
    toPage,
    subheader,
    loading,
    toDetailsPage,
}) {
    // const navigation = useNavigation();
    // const isSubmitting = navigation.state === "loading"

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    //for only a singe button of 3 cards on main page to spin
    const viewAllHandler = () => {
        setIsSubmitting(true);
        navigate(toPage);
        setIsSubmitting(false);
    };
    
    const viewDetailHandler = () => {
        setIsSubmitting(true);
        window.open(toDetailsPage, '_blank');
        setIsSubmitting(false);
    };

    return (
        <StyledCard
            sx={{ maxWidth: "545px", backgroundColor: "primary.light" }}
            hasUrl={!!url}
        >
            {loading ? (
                <>
                    <Skeleton variant="text" width="20%" height={60} />
                    <Skeleton variant="rectangular" width="100%" height={194} />
                    <Skeleton variant="text" width="60%" height={60} />
                    <Skeleton variant="text" width="20%" height={60} />
                </>
            ) : (
                <>
                    <CardHeader
                        sx={{
                            color: "primary.main",
                            backgroundColor: "primary.light",
                        }}
                        title={title}
                        subheader={subheader}
                    />
                    {url && (
                        <CardMedia sx={{ mt: 0 }}>
                            <VideoPlayer url={url} />
                        </CardMedia>
                    )}
                    <CardContent
                        sx={{
                            backgroundColor: "primary.light",
                            overflow: "auto",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions
                        disableSpacing
                        sx={{ backgroundColor: "primary.light" }}
                    >
                        {toDetailsPage && (

                        <LoadingButton
                            variant="contained"
                            loading={isSubmitting}
                            sx={{
                                backgroundColor: "secondary.main",
                            }}
                            onClick={viewDetailHandler}
                        >
                            View Details
                        </LoadingButton>
                        )}
                        <LoadingButton
                            variant="contained"
                            loading={isSubmitting}
                            sx={{
                                backgroundColor: "secondary.main",
                                marginLeft: "auto",
                            }}
                            onClick={viewAllHandler}
                        >
                            View All
                        </LoadingButton>
                    </CardActions>
                </>
            )}
        </StyledCard>
    );
}
