import React from "react";
import { baseURL } from "../../App";
import { json, useLoaderData } from "react-router-dom";
import DetailComp from "../../components/detailComp/DetailComp";
const ExerciseDetail = () => {
    const exercise = useLoaderData();
    return (
        <>
            <DetailComp data={exercise} />
        </>
    );
};

export default ExerciseDetail;

export async function loader({ params }) {
    const id = params.exerciseId;

    const response = await fetch(`${baseURL}/wp/v2/krc-exercise/${id}`);

    if (!response.ok) {
        throw json(
            { message: "Could not fetch details for this exercise." },
            {
                status: 500,
            }
        );
    } else {
        const data = await response.json();

        // Transform the data to the desired format
        const transformedData = {
            id: data.id, 
            title: data.title.rendered,
            content: data.content.rendered,
            slug: data.id.toString(),
            class_text: data.acf.class_text || "",
            class_video_url: data.acf.class_video_url || "",
            class_week_description: data.acf.class_week_description || "",
            class_document_1: data.acf.class_document_1 || false, // Use false as a fallback if the value is null
            class_document_2: data.acf.class_document_2 || false,
            class_document_3: data.acf.class_document_3 || false,
        };

        return transformedData;
    }
}
