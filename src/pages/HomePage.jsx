import React from "react";
import { Toolbar } from "@mui/material";
import HomeMain from "../components/home/HomeMain";
import { useLoaderData } from "react-router-dom";
import { baseURL } from "../App";

const HomePage = () => {
    const latest = useLoaderData();
    return (
        <>
            <Toolbar />
            <HomeMain data={latest} />
        </>
    );
};

export default HomePage;

export async function loader() {
    const url1 = `${baseURL}/ce/v1/krc_classes`;
    const url2 = `${baseURL}/ce/v1/krc_homework`;
    const url3 = `${baseURL}/wp/v2/krc-exercise`;

    try {
        // Execute all fetch requests concurrently
        const responses = await Promise.all([
            fetch(url1),
            fetch(url2),
            fetch(url3),
        ]);

        // Check if any of the responses are not ok
        if (!responses.every((response) => response.ok)) {
            throw new Error("Failed to fetch data");
        }

        // Parse JSON responses concurrently
        const [data1, data2, data3] = await Promise.all(
            responses.map((response) => response.json())
        );

        // Function to find the object with the highest id in each data set
        const findHighestIdObject = (dataSet) =>
            dataSet.reduce(
                (max, item) => (item.id > max.id ? item : max),
                dataSet[0]
            );

        // Find the object with the highest id in each dataset
        const newestClass = findHighestIdObject(data1);
        const newestHomework = findHighestIdObject(data2);
        const newestExerciseArray = data3.map((item) => ({
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
        const newestExercise = findHighestIdObject(newestExerciseArray);

        // Return an object containing the highest id object from each API call
        return [
            newestClass,
            newestHomework,
            newestExercise,
        ];
    } catch (error) {
        // Handle any errors that occurred during fetch or JSON parsing
        throw new Error(error.message);
    }
}
