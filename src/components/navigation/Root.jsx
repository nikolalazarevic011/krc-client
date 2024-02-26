import React from 'react'
import { useEffect, useState } from "react";
// import { Outlet, useLoaderData } from "react-router-dom";
import DrawerComp from "./DrawerComp";
import { useSelector } from "react-redux";
// import Footer from "./Footer";
import { Box } from "@mui/material";
import Navbar from "./navbar/Navbar";

export const isNotMobile = window.innerWidth >= 435;

function Root() {
    // const token = useLoaderData();
    const token = true
    let toggleDrawer = useSelector((state) => state.ui.toggleDrawer);
    const [marginLeft, setMarginLeft] = useState(null);

    useEffect(() => {
        //so the user option icon don't get pushed to the right on mobile devices
        if (isNotMobile) {
            setMarginLeft(toggleDrawer ? 240 : 0);
        }
    }, [toggleDrawer]);

    //! kad napravis loader za token ubaci

    const simpleStyles = {
        content: {
            marginLeft: marginLeft,
            padding: 3,
        },
    };

    return (
        <>
            {/* <Box sx={{ minHeight: "100vh" }}> */}
            <Box sx={{ minHeight: "97vh" }}>
                {/* {!token && (
                    <main>
                        <Navbar />
                        <Outlet />
                    </main>
                )} */}
                {token && (
                    <main style={simpleStyles.content}>
                        <Navbar/>
                        <DrawerComp />
                    </main>
                )}
            </Box>
            {/* <Footer /> */}
        </>
    );
}

export default Root;
