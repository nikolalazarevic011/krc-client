import React from "react";
import VideoCard from "../helper/VideoCard";
import { Container, Grid, Toolbar, Typography } from "@mui/material";
const Home = () => {
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
                <Grid container spacing={3} sx={{}}>
                    <Grid item xs={12} sm={4}>
                        <VideoCard
                            title={"Classes"}
                            url={
                                "https://www.youtube.com/watch?v=iu-LBY7NXD4&t=660s"
                            }
                            description={' Pariatur ex non culpa proident.'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <VideoCard
                            title={"Exercise of the Week"}
                            url={
                                "https://www.youtube.com/watch?v=iu-LBY7NXD4&t=660s"
                            }
                            description={'Fugiat pariatur anim magna exercitation esse qui adipisicing exercitation magna reprehenderit est in eiusmod nisi. Cillum esse dolore ex ex ea enim ut do consequat sint sunt. Aliqua deserunt exercitation exercitation sint velit.'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <VideoCard
                            title={"Week 4 - 7 Day Challenge"}
                            url={
                                "https://www.youtube.com/watch?v=iu-LBY7NXD4&t=660s"
                            }
                            description={'Ipsum pariatur ut ullamco nostrud tempor ea cupidatat labore consectetur excepteur ut esse. Ut nostrud eiusmod ex sint eu. Occaecat aute excepteur eiusmod ea eu elit aliqua voluptate labore reprehenderit qui. Incididunt amet qui commodo minim minim duis excepteur eu sunt et voluptate sint.'} 
                        />
                    </Grid>
                </Grid>
            </Container>
            <Toolbar />
        </>
    );
};

export default Home;
