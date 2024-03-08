import React from "react";
import { Toolbar } from "@mui/material";
import HomeMain from "../components/home/HomeMain";
import { useLoaderData } from "react-router-dom";

const HomePage = () => {
    const latest = useLoaderData()
    return (
        <>
            <Toolbar />
            <HomeMain />
        </>
    );
};

export default HomePage;

export async function loader() {
    
    
}