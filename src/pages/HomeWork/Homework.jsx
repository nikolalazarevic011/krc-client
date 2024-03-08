import React from "react";
import { baseURL } from "../../App";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import DrawerItemListView from "../../components/helper/DrawerItemListView";

const Homework = () => {
    const homework = useRouteLoaderData("homeworkLoader");
    return (
        <>
            <DrawerItemListView data={homework} />
        </>
    );
};

export default Homework;

export async function loader() {
    const response = await fetch(`${baseURL}/ce/v1/krc_homework`);
    if (!response.ok) {
        throw json(
            { message: "Could not fetch homework." },
            {
                status: 500,
            }
        );
    } else {
        return response;
    }
}
