import React, { useEffect, useState } from "react";
import { baseURL } from "../App";
import store from "../store";
import { UIActions } from "../store/ui";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatedDetailedComp from "../components/home and classes page/UpdatedDetailedComp";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import qrCodeImg from "../assets/imgs/KRC_HaW_QR.png";

const SEASON_RECAP_ALBUM_URL = "https://photos.app.goo.gl/FVQJgPuNaUdKuW5PA";
const CERTIFICATE_FORM_URL = "https://form.jotform.com/231454157893059";

const cardSurfaceSx = {
    p: { xs: 2.5, md: 3 },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, #ffffff 0%, #f9fbf7 100%)",
    borderRadius: "20px",
    border: "1.5px solid",
    borderColor: "primary.light",
    boxShadow: "0px 10px 30px rgba(40, 54, 24, 0.06)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0px 15px 35px rgba(40, 54, 24, 0.1)",
    },
};

const cardHeadingSx = {
    fontFamily: "SofiaSansCondensed",
    fontWeight: 800,
    color: "primary.main",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    fontSize: { xs: "1.6rem", md: "1.95rem" },
};

const cardSubtitleSx = {
    mb: 2,
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: "0.95rem",
    opacity: 0.85,
};

const cardButtonSx = {
    fontFamily: "Poppins",
    fontWeight: 700,
    px: 3.5,
    py: 1.3,
    borderRadius: "50px",
    color: "primary.dark",
    textTransform: "none",
    fontSize: "0.95rem",
    boxShadow: "0px 6px 15px rgba(154, 195, 57, 0.3)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        backgroundColor: "secondary.dark",
        transform: "scale(1.03)",
        boxShadow: "0px 8px 20px rgba(154, 195, 57, 0.4)",
    },
};

const HomePage = () => {
    const data = useLoaderData();
    const loading = useSelector((state) => state.ui.isLoading);

    return (
        <>
            <UpdatedDetailedComp data={data} loading={loading}>
                <Grid container spacing={3} sx={{ mt: 2, mb: 4 }} alignItems="stretch">
                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={cardSurfaceSx}>
                            <Box sx={{ width: "100%" }}>
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        mx: "auto",
                                        mb: 1.5,
                                        borderRadius: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "rgba(154, 195, 57, 0.16)",
                                        border: "1.5px solid",
                                        borderColor: "primary.light",
                                        color: "primary.main",
                                    }}
                                >
                                    <AddPhotoAlternateIcon sx={{ fontSize: 30 }} />
                                </Box>
                                <Typography
                                    variant="h4"
                                    component="h1"
                                    gutterBottom
                                    sx={cardHeadingSx}
                                >
                                    2026 Season Recap
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={cardSubtitleSx}
                                >
                                    Share your 2026 Season photos and videos in our shared Google Photos album
                                </Typography>
                                <Box
                                    component="ol"
                                    sx={{
                                        textAlign: "left",
                                        pl: 2.5,
                                        pr: 1,
                                        my: 2,
                                        mx: "auto",
                                        maxWidth: 360,
                                        fontFamily: "Inter",
                                        fontSize: "0.875rem",
                                        color: "text.secondary",
                                        "& li": { mb: 0.75 },
                                    }}
                                >
                                    <li>
                                        Click <strong>&ldquo;Add Photos to 2026 Album&rdquo;</strong> below to open Google Photos.
                                    </li>
                                    <li>
                                        Sign in to Google and tap <strong>Join</strong> if prompted.
                                    </li>
                                    <li>
                                        Tap <strong>Add photos</strong> (the photo <strong>+</strong> icon), pick your photos or videos, and tap <strong>Done</strong>.
                                    </li>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                color="secondary"
                                href={SEASON_RECAP_ALBUM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ ...cardButtonSx, mt: 1 }}
                            >
                                Add Photos to 2026 Album
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={cardSurfaceSx}>
                            <Box sx={{ width: "100%" }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    gutterBottom
                                    sx={cardHeadingSx}
                                >
                                    Health and Wellness Certificate
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    sx={cardSubtitleSx}
                                >
                                    Get your certificate here
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 1.25,
                                        mb: 2.5,
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 700,
                                            color: "primary.dark",
                                            fontFamily: "Inter",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Scan a QR code
                                    </Typography>
                                    <Box
                                        component="img"
                                        src={qrCodeImg}
                                        alt="Health and Wellness Certificate QR Code"
                                        sx={{
                                            width: "100%",
                                            maxWidth: 125,
                                            height: "auto",
                                            p: 1,
                                            border: "1.5px solid",
                                            borderColor: "primary.light",
                                            borderRadius: "14px",
                                            backgroundColor: "#ffffff",
                                            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.04)",
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "scale(1.04)",
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                color="secondary"
                                href={CERTIFICATE_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={cardButtonSx}
                            >
                                Or Click Here
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </UpdatedDetailedComp>
        </>
    );
};

export default HomePage;

export async function loader() {
    store.dispatch(UIActions.isLoading(true));

    const url1 = `${baseURL}/ce/v1/krc_classes`;

    try {
        // Execute the fetch request
        const response1 = await fetch(url1);

        // Check if the response is ok
        if (!response1.ok) {
            throw new Error("Failed to fetch class data");
        }

        // Parse the JSON response
        const data1 = await response1.json();

        // Function to find the object with the highest class_number in the data set
        const findHighestClassNumberObject = (dataSet) =>
            dataSet.reduce((max, item) => {
                const maxClassNumber = parseInt(max.class_number, 10);
                const currentItemClassNumber = parseInt(item.class_number, 10);
                return currentItemClassNumber > maxClassNumber ? item : max;
            }, dataSet[0]);

        // Find the object with the highest class_number in the dataset
        const newestClass = findHighestClassNumberObject(data1);

        // Return the object with the highest class_number
        const transformedData = {
            ...newestClass,
        };
        store.dispatch(UIActions.isLoading(false));
        return transformedData;
    } catch (error) {
        // Handle any errors that occurred during fetch or JSON parsing
        throw new Error(error.message);
    }
}
