import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box, Link, Skeleton, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { isLaptop } from "../navigation/Root";
import { useEffect } from "react";

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== "hasurl" && prop !== "loading", // Do not forward 'hasurl' or 'loading' prop to the DOM element
})(({ theme, hasurl, loading }) => ({
    display: "grid",
    gridTemplateRows: "auto 1fr auto", // Header, content, and actions areas
    // height: loading ? "770px" : hasurl ? "770px" : "373.3px",
}));

export default function VideoCard({
    title,
    url,
    description,
    toPage,
    subheader,
    loading,
    toDetailsPage,
    class_document_title,
    class_document_pdf,
    link1Href,
    link1Title,
    link2Href,
    link2Title,
    link3Href,
    link3Title,
    link4Href,
    link4Title,
    link5Href,
    link5Title,
    link6Href,
    link6Title,
    link7Href,
    link7Title,
    link8Href,
    link8Title,
    link9Href,
    link9Title,
    link10Href,
    link10Title,
    link11Href,
    link11Title,
    link12Href,
    link12Title,
    link13Href,
    link13Title,
    link14Href,
    link14Title,
    link15Href,
    link15Title,
    link16Href,
    link16Title,
    link17Href,
    link17Title,
    link18Href,
    link18Title,
    link19Href,
    link19Title,
    link20Href,
    link20Title,
    link21Href,
    link21Title,
    link22Href,
    link22Title,
    link23Href,
    link23Title,
    link24Href,
    link24Title,
    link25Href,
    link25Title,
    link26Href,
    link26Title,
    link27Href,
    link27Title,
    link28Href,
    link28Title,
    link29Href,
    link29Title,
    link30Href,
    link30Title,
    link31Href,
    link31Title,
    link32Href,
    link32Title,
    link33Href,
    link33Title,
    link34Href,
    link34Title,
    link35Href,
    link35Title,
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
        window.open(toDetailsPage, "_blank");
        setIsSubmitting(false);
    };

    return (
        <StyledCard
            sx={{ maxWidth: "545px", backgroundColor: "primary.light" }}
            hasurl={!!url}
            loading={loading} // Pass loading as a prop
        >
            {loading ? (
                <>
                    <Skeleton variant="text" width="20%" height={50} />
                    <Skeleton variant="text" width="40%" height={50} />
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="350px"
                    />
                    <Skeleton variant="text" width="30%" height={50} />
                    <Skeleton variant="text" width="20%" height={50} />
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
                            mt: -1.5,
                        }}
                    >
                        {description && (
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        )}
                        {(class_document_pdf || link1Href || link2Href) && (
                            <>
                                {/* "More Links :" stays fixed */}
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    More Links :
                                </Typography>

                                {/* Make the links scrollable */}
                                <Stack
                                    mt={1}
                                    sx={{
                                        // maxHeight: "160px", // Adjust height as needed
                                        // maxHeight: isLaptop ? "190px" : "160px", // Adjust height as needed
                                        overflowY: "auto", // Enables scrolling only for links
                                    }}
                                    spacing={0.2}
                                >
                                    {class_document_pdf && (
                                        <Link href={class_document_pdf}>
                                            {class_document_title}
                                        </Link>
                                    )}
                                    {link1Href && (
                                        <Link href={link1Href}>
                                            {link1Title}
                                        </Link>
                                    )}
                                    {link24Href && (
                                        <Link href={link24Href}>
                                            {link24Title}
                                        </Link>
                                    )}
                                    {link2Href && (
                                        <Link href={link2Href}>
                                            {link2Title}
                                        </Link>
                                    )}
                                    {link3Href && (
                                        <Link href={link3Href}>
                                            {link3Title}
                                        </Link>
                                    )}
                                    {link4Href && (
                                        <Link href={link4Href}>
                                            {link4Title}
                                        </Link>
                                    )}
                                    {link5Href && (
                                        <Link href={link5Href}>
                                            {link5Title}
                                        </Link>
                                    )}
                                    {link6Href && (
                                        <Link href={link6Href}>
                                            {link6Title}
                                        </Link>
                                    )}
                                    {link7Href && (
                                        <Link href={link7Href}>
                                            {link7Title}
                                        </Link>
                                    )}
                                    {link8Href && (
                                        <Link href={link8Href}>
                                            {link8Title}
                                        </Link>
                                    )}
                                    {link9Href && (
                                        <Link href={link9Href}>
                                            {link9Title}
                                        </Link>
                                    )}
                                    {link10Href && (
                                        <Link href={link10Href}>
                                            {link10Title}
                                        </Link>
                                    )}
                                    {link11Href && (
                                        <Link href={link11Href}>
                                            {link11Title}
                                        </Link>
                                    )}
                                    {link12Href && (
                                        <Link href={link12Href}>
                                            {link12Title}
                                        </Link>
                                    )}
                                    {link13Href && (
                                        <Link href={link13Href}>
                                            {link13Title}
                                        </Link>
                                    )}
                                    {link14Href && (
                                        <Link href={link14Href}>
                                            {link14Title}
                                        </Link>
                                    )}
                                    {link15Href && (
                                        <Link href={link15Href}>
                                            {link15Title}
                                        </Link>
                                    )}
                                    {link16Href && (
                                        <Link href={link16Href}>
                                            {link16Title}
                                        </Link>
                                    )}
                                    {link17Href && (
                                        <Link href={link17Href}>
                                            {link17Title}
                                        </Link>
                                    )}
                                    {link18Href && (
                                        <Link href={link18Href}>
                                            {link18Title}
                                        </Link>
                                    )}
                                    {link19Href && (
                                        <Link href={link19Href}>
                                            {link19Title}
                                        </Link>
                                    )}
                                    {link20Href && (
                                        <Link href={link20Href}>
                                            {link20Title}
                                        </Link>
                                    )}
                                    {link21Href && (
                                        <Link href={link21Href}>
                                            {link21Title}
                                        </Link>
                                    )}
                                    {link22Href && (
                                        <Link href={link22Href}>
                                            {link22Title}
                                        </Link>
                                    )}
                                    {link23Href && (
                                        <Link href={link23Href}>
                                            {link23Title}
                                        </Link>
                                    )}
                                    {link25Href && (
                                        <Link href={link25Href}>
                                            {link25Title}
                                        </Link>
                                    )}
                                    {link26Href && (
                                        <Link href={link26Href}>
                                            {link26Title}
                                        </Link>
                                    )}
                                    {link27Href && (
                                        <Link href={link27Href}>
                                            {link27Title}
                                        </Link>
                                    )}
                                    {link28Href && (
                                        <Link href={link28Href}>
                                            {link28Title}
                                        </Link>
                                    )}
                                    {link29Href && (
                                        <Link href={link29Href}>
                                            {link29Title}
                                        </Link>
                                    )}
                                    {link30Href && (
                                        <Link href={link30Href}>
                                            {link30Title}
                                        </Link>
                                    )}
                                    {link31Href && (
                                        <Link href={link31Href}>
                                            {link31Title}
                                        </Link>
                                    )}
                                    {link32Href && (
                                        <Link href={link32Href}>
                                            {link32Title}
                                        </Link>
                                    )}
                                    {link33Href && (
                                        <Link href={link33Href}>
                                            {link33Title}
                                        </Link>
                                    )}
                                    {link34Href && (
                                        <Link href={link34Href}>
                                            {link34Title}
                                        </Link>
                                    )}
                                    {link35Href && (
                                        <Link href={link35Href}>
                                            {link35Title}
                                        </Link>
                                    )}
                                </Stack>
                            </>
                        )}
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
                        {toPage && (
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
                        )}
                    </CardActions>
                </>
            )}
        </StyledCard>
    );
}
