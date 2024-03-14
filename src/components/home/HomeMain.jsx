// import React from "react";
// import VideoCard from "../helper/VideoCard";
// import { Container, Grid, Toolbar, Typography } from "@mui/material";
// const Home = ({data}) => {

//     return (
//         <>
//             <Toolbar />
//             <Container
//                 sx={{
//                     maxWidth: { xs: "sm", md: "xl" },
//                 }}
//             >
//                 <Typography mb={3} mx={3} variant="h5" textAlign="center">
//                     We will post each class weekly. Please utilize these
//                     resources while they are available. They will be removed in
//                     the next few weeks. We want to give you an opportunity to
//                     view a missed class and/or come back to review a teaching if
//                     desired.
//                 </Typography>
//                 <Grid container spacing={3} sx={{}}>
//                     <Grid item xs={12} sm={4}>
//                         <VideoCard
//                             title={data.newestClass.title}
//                             url={
//                                 "https://bwm.cdn.piksel.tech/mm/flvmedia/5007/m/F/K/mF_KRC2024_Class1-4049612.mp4"
//                             }
//                             description={" Pariatur ex non culpa proident."}
//                             toPage={"classes"}
//                         />
//                     </Grid>

//                     <Grid item xs={12} sm={4}>
//                         <VideoCard
//                             title={"Week 4 - 7 Day Challenge"}
//                             url={
//                                 "https://www.youtube.com/watch?v=iu-LBY7NXD4&t=660s"
//                             }
//                             description={
//                                 "Ipsum pariatur ut ullamco nostrud tempor ea cupidatat labore consectetur excepteur ut esse. Ut nostrud eiusmod ex sint eu. Occaecat aute excepteur eiusmod ea eu elit aliqua voluptate labore reprehenderit qui. Incididunt amet qui commodo minim minim duis excepteur eu sunt et voluptate sint."
//                             }
//                             toPage={"exercises"}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                         <VideoCard
//                             title={"Exercise of the Week"}
//                             url={
//                                 "https://www.youtube.com/watch?v=iu-LBY7NXD4&t=660s"
//                             }
//                             description={
//                                 "Fugiat pariatur anim magna exercitation esse qui adipisicing exercitation magna reprehenderit est in eiusmod nisi. Cillum esse dolore ex ex ea enim ut do consequat sint sunt. Aliqua deserunt exercitation exercitation sint velit."
//                             }
//                             toPage={"homework"}
//                         />
//                     </Grid>
//                 </Grid>
//             </Container>
//             <Toolbar />
//         </>
//     );
// };

// export default Home;

import React from "react";
import VideoCard from "../helper/VideoCard";
import { Container, Grid, Toolbar, Typography } from "@mui/material";

const Home = ({ data }) => {
    // Assuming data is an array of objects and has at least 3 objects
    const newestClass = data[0]; // Object for the newest class
    const weekChallenge = data[1]; // Object for the week 4 - 7 day challenge
    const exerciseOfWeek = data[2]; // Object for the exercise of the week

    return (
        <>
            <Toolbar />
            <Container
                sx={{
                    maxWidth: { xs: "sm", md: "xl" },
                }}
            >
                <Typography mb={3} mx={3} variant="h5" textAlign="center">
                    We will post each class weekly. Please utilize these
                    resources while they are available. They will be removed in
                    the next few weeks. We want to give you an opportunity to
                    view a missed class and/or come back to review a teaching if
                    desired.
                </Typography>
                <Grid container spacing={3}>
                    {newestClass && (
                        <Grid item xs={12} sm={4}>
                            <VideoCard
                                title={newestClass.title}
                                url={newestClass.class_video_url}
                                description={newestClass.class_week_description}
                                toPage={"classes"}
                                subheader={'Newest Class'}                   
                            />
                        </Grid>
                    )}
                    {weekChallenge && (
                        <Grid item xs={12} sm={4}>
                            <VideoCard
                                title={weekChallenge.title}
                                url={weekChallenge.class_video_url}
                                description={
                                    weekChallenge.class_week_description
                                }
                                toPage={"homework"}
                                subheader={'Newest Homework'}
                            />
                        </Grid>
                    )}
                    {exerciseOfWeek && (
                        <Grid item xs={12} sm={4}>
                            <VideoCard
                                title={exerciseOfWeek.title}
                                url={exerciseOfWeek.class_video_url}
                                description={
                                    exerciseOfWeek.class_week_description
                                }
                                toPage={"exercise"}
                                subheader={'Newest Exercise'}
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
            <Toolbar />
        </>
    );
};

export default Home;
