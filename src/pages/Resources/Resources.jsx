import React, { useEffect, useState } from "react";
import { useParams, json, useRouteLoaderData, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import DrawerItemListView from "../../components/helper/DrawerItemListView";
import { baseURL } from "../../App";

const Resources = () => {

    const { resourceId } = useParams();
    const resources = useRouteLoaderData("resourcesLoader");
    // const resources = useLoaderData();

    return (
        <>
            <DrawerItemListView data={resources} route={`${resourceId} resources`} />
        </>
    );
};

export default Resources;

export async function loader({ params }) {
    const id = params.resourceId;

    const response = await fetch(`${baseURL}/ce/v1/krc_handouts`);
    if (!response.ok) {
        throw json(
            { message: "Could not fetch resources." },
            {
                status: 500,
            }
        );
    } else {
        const resourcesData = await response.json();

        // Find the resource matching the slug
        const resourceItem = resourcesData.find((item) => item.slug === id);

        if (!resourceItem) {
            console.error("No resource found with the slug:", id);
            return []; // Return an empty object or handle the error as needed
        }

        const resources = resourceItem.handouts.map((handout) => ({
            title: handout.title,
            slug: handout.file, 
        }));

        return resources;
    }
}
