import React from "react";
import VideoCard from "../helper/VideoCard";
import {
    Container,
    Grid,
    Toolbar,
    Box,
    Typography,
    Skeleton,
    Button,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import { basePath } from "../../App";
import CustomLoadingButton from "../helper/CustomLoadingButton";

const UpdatedDetailedComp = ({ data, loading }) => {
    const { classId } = useParams(); // how homework card
    const location = useLocation();

    const isBasePath = location.pathname === basePath;
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
                        {/* <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                size="large"
                                href="https://form.jotform.com/231454157893059"
                                color="secondary"
                                sx={{
                                    color: "white",
                                    my: 2,
                                }}
                            >
                                Get Your Certification Here
                            </Button>
                        </Box> */}
                    </>
                )}
                <Grid container spacing={3}>
                    {loading ? (
                        // Show 3 placeholders while loading
                        Array.from({ length: 3 }, (_, index) => (
                            <Grid item xs={12} md={4} key={`loading-${index}`}>
                                <VideoCard loading={true} />
                            </Grid>
                        ))
                    ) : (
                        // Show all 4 VideoCard components with actual data after loading is done
                        <>
                            <Grid item xs={12} md={4}>
                                <VideoCard
                                    title={data.class_title}
                                    url={data.class_video_url}
                                    description={data.class_week_description}
                                    // toDetailsPage={data.class_document_1} // all class docs are now in the handout card
                                    toPage={`${basePath}classes`}
                                    subheader="Class Replay"
                                    loading={false}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <VideoCard
                                    title={data.exercise_title}
                                    url={data.exercize_video}
                                    description={data.exercise_week_description}
                                    toPage={`${basePath}exercises`}
                                    toDetailsPage={data.exercize_pdf}
                                    subheader="Exercise of the Week"
                                    link1Href={data.exercize_pdfs[1]}
                                    link1Title={data.exercise_2_title}
                                    link2Href={data.exercize_pdfs[2]}
                                    link2Title={data.exercise_3_title || ""}
                                    link3Href={data.exercize_pdfs[3]}
                                    link3Title={data.handout_doc_4_title}
                                />
                            </Grid>
                            {/* Third and Fourth VideoCard components are placed in a nested Grid container */}
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={3} direction="column">
                                    <Grid item xs={12}>
                                        {!classId ? (
                                            <VideoCard
                                                title={
                                                    data.homework_title || ""
                                                }
                                                // url={data.class_video_url || ""}
                                                description={
                                                    data.homework_week_description ||
                                                    ""
                                                }
                                                // toPage={`${basePath}homework`}
                                                toDetailsPage={
                                                    data.homework_pdf || ""
                                                }
                                                subheader={
                                                    "Homework of the week"
                                                }
                                                loading={false}
                                            />
                                        ) : (
                                            <VideoCard
                                                title={
                                                    data.homework_title || ""
                                                }
                                                // url={data.class_video_url || ""}
                                                description={
                                                    classId !== data.newestClass
                                                        ? "No longer available"
                                                        : data.homework_week_description ||
                                                          ""
                                                }
                                                // toPage={`${basePath}homework`}
                                                toDetailsPage={
                                                    classId !== data.newestClass
                                                        ? null
                                                        : data.homework_pdf
                                                }
                                                subheader={
                                                    "Homework of the week"
                                                }
                                                loading={false}
                                            />
                                        )}
                                    </Grid>
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
                                            link1Href={data.class_document_2}
                                            link1Title={
                                                data.handout_doc_2_title
                                            }
                                            link2Href={data.class_document_3}
                                            link2Title={
                                                data.handout_doc_3_title
                                            }
                                            link3Href={data.class_document_4}
                                            link3Title={
                                                data.handout_doc_4_title
                                            }
                                            subheader={
                                                "Handouts or/and weekly challenges"
                                            }
                                            loading={false}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Container>
            <Toolbar />
        </>
    );
};

export default UpdatedDetailedComp;
