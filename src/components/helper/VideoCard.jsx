// VideoCard.js - Refactored to handle dynamic links
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Link, Skeleton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "./VideoPlayer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== "hasurl" && prop !== "loading",
})(({ theme, hasurl, loading }) => ({
    display: "grid",
    gridTemplateRows: "auto 1fr auto", // Header, content, and actions areas
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
    ...props
}) {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Extract all link properties into an array of link objects
    const links = [];

    // Add class document if available
    if (class_document_pdf) {
        links.push({
            href: class_document_pdf,
            title: class_document_title,
        });
    }

    // Add main details link if available
    if (toDetailsPage) {
        links.push({
            href: toDetailsPage,
            title: title,
        });
    }

    // Loop through numbered links from props (link1Href, link1Title, etc.)
    for (let i = 1; i <= 35; i++) {
        const hrefKey = `link${i}Href`;
        const titleKey = `link${i}Title`;

        if (props[hrefKey] && props[titleKey]) {
            links.push({
                href: props[hrefKey],
                title: props[titleKey],
            });
        }
    }

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

    if (loading) {
        return (
            <StyledCard
                sx={{ maxWidth: "545px", backgroundColor: "primary.light" }}
                hasurl={false}
                loading={true}
            >
                <Skeleton variant="text" width="20%" height={50} />
                <Skeleton variant="text" width="40%" height={50} />
                <Skeleton variant="rectangular" width="100%" height="350px" />
                <Skeleton variant="text" width="30%" height={50} />
                <Skeleton variant="text" width="20%" height={50} />
            </StyledCard>
        );
    }

    return (
        <StyledCard
            sx={{ maxWidth: "545px", backgroundColor: "primary.light" }}
            hasurl={!!url}
            loading={loading}
        >
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

                {links.length > 0 && (
                    <>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            More Links :
                        </Typography>

                        <Stack
                            mt={1}
                            sx={{
                                overflowY: "auto",
                            }}
                            spacing={0.2}
                        >
                            {links.map((link, index) => (
                                <Link key={index} href={link.href}>
                                    {link.title}
                                </Link>
                            ))}
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
        </StyledCard>
    );
}
