import React, { useEffect, useState } from "react";
import { baseURL } from "../App";
import store from "../store";
import { UIActions } from "../store/ui";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatedDetailedComp from "../components/home and classes page/UpdatedDetailedComp";
import { Box, Typography, Button, Paper } from "@mui/material";
import qrCodeImg from "../assets/imgs/KRC_HaW_QR.png";

const HomePage = () => {
    const data = useLoaderData();
    const loading = useSelector((state) => state.ui.isLoading);

    return (
        <>
            <UpdatedDetailedComp data={data} loading={loading}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        mb: 4,
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
                        }
                    }}
                >
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom 
                        sx={{ 
                            fontFamily: "SofiaSansCondensed", 
                            fontWeight: 800,
                            color: "primary.main",
                            textTransform: "uppercase",
                            letterSpacing: "0.8px",
                            fontSize: { xs: "1.8rem", md: "2.4rem" }
                        }}
                    >
                        Health and Wellness Certificate
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary" 
                        sx={{ 
                            mb: 4, 
                            fontFamily: "Inter", 
                            fontWeight: 500,
                            fontSize: "1.05rem",
                            opacity: 0.85
                        }}
                    >
                        Get your certificate here
                    </Typography>

                    <Box 
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            alignItems: "center", 
                            gap: 2,
                            mb: 4 
                        }}
                    >
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontWeight: 700, 
                                color: "primary.dark",
                                fontFamily: "Inter",
                                letterSpacing: "0.5px"
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
                                maxWidth: 170,
                                height: "auto",
                                p: 1.5,
                                border: "1.5px solid",
                                borderColor: "primary.light",
                                borderRadius: "16px",
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.04)",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.04)",
                                }
                            }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        color="secondary"
                        href="https://form.jotform.com/231454157893059"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            fontFamily: "Poppins",
                            fontWeight: 700,
                            px: 5,
                            py: 1.8,
                            borderRadius: "50px",
                            color: "primary.dark",
                            textTransform: "none",
                            fontSize: "1.05rem",
                            boxShadow: "0px 6px 15px rgba(154, 195, 57, 0.3)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                backgroundColor: "secondary.dark",
                                transform: "scale(1.03)",
                                boxShadow: "0px 8px 20px rgba(154, 195, 57, 0.4)",
                            }
                        }}
                    >
                        Or Click Here
                    </Button>
                </Paper>
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
