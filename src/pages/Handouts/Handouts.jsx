import React from "react";
import DrawerItemListView from "../../components/helper/DrawerItemListView";
import { baseURL } from "../../App";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";

const Handouts = () => {
    const handouts = useRouteLoaderData("handoutsLoader");
    return <DrawerItemListView data={handouts} />;
};

export default Handouts;

export async function loader() {
    const response = await fetch(`${baseURL}/ce/v1/krc_handouts`);
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
