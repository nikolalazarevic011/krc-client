// UpdatedDetailedComp.js - Refactored with improved data handling
import React from "react";
import VideoCard from "../helper/VideoCard";
import {
    Container,
    Grid,
    Toolbar,
    Box,
    Typography,
    Skeleton,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { basePath } from "../../App";

const UpdatedDetailedComp = ({ data, loading }) => {
    const { classId } = useParams();
    const location = useLocation();
    const isBasePath = location.pathname === basePath;
    const currentYear = new Date().getFullYear();

    // Determine if classes are inactive
    const noActiveClasses =
        !data ||
        (!data.class_title &&
            !data.exercize_video &&
            !data.homework_title &&
            !data.handout_title);

    // Card configurations for reuse
    const cardConfigs =
        !loading && !noActiveClasses
            ? [
                  {
                      // Class Replay Card
                      gridProps: { xs: 12, md: 4 },
                      cardProps: {
                          title: data.class_title,
                          url: data.class_video_url,
                          description: data.class_week_description,
                          toPage: `${basePath}classes`,
                          subheader: "Class Replay",
                          class_document_title: data.class_document_title,
                          class_document_pdf: data.class_document_pdf,
                      },
                  },
                  {
                      // Exercise Card
                      gridProps: { xs: 12, md: 4 },
                      cardProps: {
                          title: data.exercise_title,
                          url: data.exercize_video,
                          description: data.exercise_week_description,
                          toPage: `${basePath}exercises`,
                          toDetailsPage: data.exercize_pdf,
                          subheader: "Exercise of the Week",
                          link1Title: data.exercise_2_title,
                          link1Href: data.exercize_2_video,
                          link2Title: data.exercise_3_title || "",
                          link2Href: data.exercize_3_video,
                          link3Title: data.exercise_4_title,
                          link3Href: data.exercize_4_video,
                      },
                  },
              ]
            : [];

    // Prepare Homework card config based on conditions
    const homeworkCardProps = !classId
        ? {
              title: data?.homework_title || "",
              subheader: "Homework of the week",
              description: data?.homework_week_description || "",
              toDetailsPage: data?.homework_pdf || "",
              link1Title: data?.homework_pdf_2_title || "",
              link1Href: data?.homework_pdfs?.[1] || "",
              link2Title: data?.homework_pdf_3_title || "",
              link2Href: data?.homework_pdfs?.[2] || "",
          }
        : {
              title: data?.homework_title || "",
              subheader: "Homework of the week",
              description:
                  classId !== data?.newestClass
                      ? "No longer available"
                      : data?.homework_week_description || "",
              toDetailsPage:
                  classId !== data?.newestClass ? null : data?.homework_pdf,
          };

    // Prepare all document links for the handout card
    const handoutLinks = {};
    if (data) {
        for (let i = 1; i <= 35; i++) {
            const docKey = `class_document_${i}`;
            const titleKey = `handout_doc_${i}_title`;

            if (data[docKey]) {
                handoutLinks[`link${i}Href`] = data[docKey];
                handoutLinks[`link${i}Title`] = data[titleKey];
            }
        }
    }

    return (
        <>
            <Toolbar />
            <Container sx={{ maxWidth: { xs: "sm", md: "xl" } }}>
                {loading ? (
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        my={3}
                    >
                        <Skeleton variant="text" width="40%" height={50} />
                    </Box>
                ) : noActiveClasses ? (
                    <Box
                        width="100%"
                        height="50vh"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            textAlign="center"
                        >
                            Classes starting in March {currentYear}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Typography
                            mb={3}
                            mx={3}
                            mt={3}
                            variant="h5"
                            textAlign="center"
                        >
                            {isBasePath
                                ? "Latest class information"
                                : `${data.title} information`}
                        </Typography>
                        {/* Button sections removed as they were commented out */}
                    </>
                )}

                {!noActiveClasses && (
                    <Grid container spacing={3}>
                        {loading ? (
                            // Show 3 placeholders while loading
                            Array.from({ length: 3 }, (_, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    key={`loading-${index}`}
                                >
                                    <VideoCard loading={true} />
                                </Grid>
                            ))
                        ) : (
                            <>
                                {/* First two cards - Class and Exercise */}
                                {cardConfigs.map((config, index) => (
                                    <Grid
                                        item
                                        {...config.gridProps}
                                        key={`card-${index}`}
                                    >
                                        <VideoCard
                                            {...config.cardProps}
                                            loading={false}
                                        />
                                    </Grid>
                                ))}

                                {/* Third column with Homework and Handout cards */}
                                <Grid item xs={12} md={4}>
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                    >
                                        {/* Homework Card */}
                                        <Grid item xs={12}>
                                            <VideoCard
                                                {...homeworkCardProps}
                                                loading={false}
                                            />
                                        </Grid>

                                        {/* Handout Card */}
                                        <Grid item xs={12} md={3}>
                                            <VideoCard
                                                title={data.handout_title || ""}
                                                description={
                                                    data.handout_week_description ||
                                                    ""
                                                }
                                                toPage={`${basePath}handouts`}
                                                toDetailsPage={
                                                    data.class_document_1
                                                }
                                                subheader="Handouts or/and weekly challenges"
                                                loading={false}
                                                {...handoutLinks}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Grid>
                )}
            </Container>
            <Toolbar />
        </>
    );
};

export default UpdatedDetailedComp;
