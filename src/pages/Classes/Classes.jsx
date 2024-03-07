import React from "react";
import { baseURL } from "../../App";
import DrawerItemListView from "../../components/helper/DrawerItemListView";
import { json, useRouteLoaderData } from "react-router-dom";

//for View all from classes card from home page
const Classes = () => {
    const classes = useRouteLoaderData("classesLoader");

    return (
        <>
            <DrawerItemListView data={classes} />
        </>
    );
};

export default Classes;

export async function loader() {
    const response = await fetch(`${baseURL}/ce/v1/krc_classes`);
    if (!response.ok) {
        throw json(
            { message: "Could not fetch classes." },
            {
                status: 500,
            }
        );
    } else {
        return response;
    }
}
