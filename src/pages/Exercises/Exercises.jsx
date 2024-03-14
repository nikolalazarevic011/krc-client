import React from "react";
import DrawerItemListView from "../../components/helper/DrawerItemListView";
import { baseURL } from "../../App";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";

const Exercises = () => {
    const exercises = useRouteLoaderData("exercisesLoader");
    return <DrawerItemListView data={exercises} />;
};

export default Exercises;

export async function loader() {
    const response = await fetch(`${baseURL}/wp/v2/krc-exercise/`);
    if (!response.ok) {
        throw json(
            { message: "Could not fetch exercises." },
            {
                status: 500,
            }
        );
    } else {
        const data = await response.json();

        // Transform the data to the desired format
        const transformedData = data.map((item) => ({
            id: item.id,
            title: item.title.rendered,
            content: item.content.rendered,
            slug: item.id.toString(),
            class_text: item.acf.class_text,
            class_video_url: item.acf.class_video_url,
            class_week_description: item.acf.class_week_description,
            class_document_1: item.acf.class_document_1,
            class_document_2: item.acf.class_document_2,
            class_document_3: item.acf.class_document_3,
        }));

        return transformedData;
    }
}
