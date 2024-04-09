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
import { useParams } from "react-router-dom";

const UpdatedDetailedComp = ({ data, loading }) => {
    const { classId } = useParams();

    return (
        <>
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
                    <Typography
                        mb={3}
                        mx={3}
                        mt={3}
                        variant="h5"
                        textAlign="center"
                    >
                        {`${data.title} ${data.class_text} information`}
                    </Typography>
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
                                    title={data.title}
                                    url={data.class_video_url}
                                    description={data.class_week_description}
                                    toDetailsPage={data.class_document_1}
                                    toPage={"/classes"}
                                    subheader="Class Replay"
                                    loading={false}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <VideoCard
                                    title={data.exercise_title}
                                    url={data.exercize_video}
                                    description={data.exercise_week_description}
                                    toPage={"/exercises"}
                                    toDetailsPage={data.exercize_pdf}
                                    subheader="Exercise of the Week"
                                    loading={false}
                                />
                            </Grid>
                            {/* Third and Fourth VideoCard components are placed in a nested Grid container */}
                            <Grid item xs={12} md={4}>
                                <Grid container spacing={3} direction="column">
                                    <Grid item xs={12}>
                                        <VideoCard
                                            title={data.homework_title || ""}
                                            // url={data.class_video_url || ""}
                                            description={
                                                classId !==
                                                data.newestClass
                                                    ? "No longer available"
                                                    : data.homework_week_description ||
                                                      ""
                                            }
                                            // toPage={"/homework"}
                                            toDetailsPage={classId !== data.newestClass ? null : data.homework_pdf}

                                            subheader={"Homework of the week"}
                                            loading={false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <VideoCard
                                            title={data.handout_title || ""}
                                            description={
                                                data.handout_week_description ||
                                                ""
                                            }
                                            toPage={"/handouts"}
                                            toDetailsPage={
                                                data.class_handouts[0]
                                            }
                                            link1Href={data.class_handouts[1]}
                                            link1Title={"Additional Handout"}
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
