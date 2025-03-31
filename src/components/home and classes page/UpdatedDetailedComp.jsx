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
    const currentYear = new Date().getFullYear();

    // Determine if classes are inactive
    const noActiveClasses =
        !data ||
        (!data.class_title &&
            !data.exercize_video &&
            !data.homework_title &&
            !data.handout_title);

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
                        {/* //! CERTIFICATE */}
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
                        {/* //! Week winners */}
                        {/* <Box display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                size="large"
                                target="blank"
                                href="http://kingdomrunningclub.org/wp-content/uploads/2025/03/week-2-winners.jpg"
                                color="secondary"
                                sx={{
                                    color: "white",
                                    my: 2,
                                }}
                            >
                                Week 2 Winners!
                            </Button>
                        </Box> */}
                        {/* //! Week winners end*/}
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
                            // Show all 4 VideoCard components with actual data after loading is done
                            <>
                                <Grid item xs={12} md={4}>
                                    <VideoCard
                                        title={data.class_title}
                                        url={data.class_video_url}
                                        description={
                                            data.class_week_description
                                        }
                                        // toDetailsPage={data.class_document_1} // all class docs are now in the handout card
                                        toPage={`${basePath}classes`}
                                        subheader="Class Replay"
                                        loading={false}
                                        link1Title={"Part 2"}
                                        link1Href={
                                            "https://bwm.cdn.piksel.tech/mm/flvmedia/5007/m/F/C/mF_Class3Part2video-4055116.mp4"
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    {/* Exercise of the Week Card */}
                                    <VideoCard
                                        title={data.exercise_title}
                                        url={data.exercize_video}
                                        description={
                                            data.exercise_week_description
                                        }
                                        toPage={`${basePath}exercises`}
                                        toDetailsPage={data.exercize_pdf}
                                        subheader="Exercise of the Week"
                                        link1Title={data.exercise_2_title}
                                        link1Href={data.exercize_2_video}
                                        link2Title={data.exercise_3_title || ""}
                                        link2Href={data.exercize_3_video}
                                        link3Title={data.exercise_4_title}
                                        link3Href={data.exercize_4_video}
                                    />
                                </Grid>
                                {/* Third and Fourth VideoCard components are placed in a nested Grid container */}
                                <Grid item xs={12} md={4}>
                                    <Grid
                                        container
                                        spacing={3}
                                        direction="column"
                                    >
                                        <Grid item xs={12}>
                                            {!classId ? (
                                                <VideoCard
                                                    title={
                                                        data.homework_title ||
                                                        ""
                                                    }
                                                    subheader={
                                                        "Homework of the week"
                                                    }
                                                    description={
                                                        data.homework_week_description ||
                                                        ""
                                                    }
                                                    toDetailsPage={
                                                        data.homework_pdf || ""
                                                    }
                                                    link1Title={
                                                        data.homework_pdf_2_title ||
                                                        ""
                                                    }
                                                    link1Href={
                                                        data
                                                            .homework_pdfs?.[1] ||
                                                        ""
                                                    }
                                                    link2Title={
                                                        data.homework_pdf_3_title ||
                                                        ""
                                                    }
                                                    link2Href={
                                                        data
                                                            .homework_pdfs?.[2] ||
                                                        ""
                                                    }
                                                    loading={false}
                                                />
                                            ) : (
                                                <VideoCard
                                                    title={
                                                        data.homework_title ||
                                                        ""
                                                    }
                                                    // url={data.class_video_url || ""}
                                                    description={
                                                        classId !==
                                                        data.newestClass
                                                            ? "No longer available"
                                                            : data.homework_week_description ||
                                                              ""
                                                    }
                                                    // toPage={`${basePath}homework`}
                                                    toDetailsPage={
                                                        classId !==
                                                        data.newestClass
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
                                                link1Href={
                                                    data.class_document_2
                                                }
                                                link1Title={
                                                    data.handout_doc_2_title
                                                }
                                                link2Href={
                                                    data.class_document_3
                                                }
                                                link2Title={
                                                    data.handout_doc_3_title
                                                }
                                                link3Href={
                                                    data.class_document_4
                                                }
                                                link3Title={
                                                    data.handout_doc_4_title
                                                }
                                                link4Href={
                                                    data.class_document_5
                                                }
                                                link4Title={
                                                    data.handout_doc_5_title
                                                }
                                                link5Href={
                                                    data.class_document_6
                                                }
                                                link5Title={
                                                    data.handout_doc_6_title
                                                }
                                                link6Href={
                                                    data.class_document_7
                                                }
                                                link6Title={
                                                    data.handout_doc_7_title
                                                }
                                                link7Href={
                                                    data.class_document_8
                                                }
                                                link7Title={
                                                    data.handout_doc_8_title
                                                }
                                                link8Href={
                                                    data.class_document_9
                                                }
                                                link8Title={
                                                    data.handout_doc_9_title
                                                }
                                                link9Href={
                                                    data.class_document_10
                                                }
                                                link9Title={
                                                    data.handout_doc_10_title
                                                }
                                                link10Href={
                                                    data.class_document_11
                                                }
                                                link10Title={
                                                    data.handout_doc_11_title
                                                }
                                                link11Href={
                                                    data.class_document_12
                                                }
                                                link11Title={
                                                    data.handout_doc_12_title
                                                }
                                                link12Href={
                                                    data.class_document_13
                                                }
                                                link12Title={
                                                    data.handout_doc_13_title
                                                }
                                                link13Href={
                                                    data.class_document_14
                                                }
                                                link13Title={
                                                    data.handout_doc_14_title
                                                }
                                                link14Href={
                                                    data.class_document_15
                                                }
                                                link14Title={
                                                    data.handout_doc_15_title
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
                )}
            </Container>
            <Toolbar />
        </>
    );
};

export default UpdatedDetailedComp;
