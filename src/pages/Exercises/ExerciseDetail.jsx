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
    const id = params.exerciseId; // This should be a title based on the requirement

    const response = await fetch(`${baseURL}/ce/v1/krc_classes`);

    if (!response.ok) {
        throw new Error("Could not fetch class data.", {
            status: 500,
        });
    } else {
        const classesData = await response.json();

        // Find the class that contains the matching exercise title
        const matchingClass = classesData.find(
            (classItem) =>
                classItem.exercise_title === id ||
                classItem.exercise_2_title === id ||
                classItem.exercise_3_title === id ||
                classItem.exercise_4_title === id
        );

        if (!matchingClass) {
            throw new Error(`Exercise with title ${id} not found.`, {
                status: 404,
            });
        }

        // Determine the index to access the correct exercise details
        const exerciseIndex = [
            matchingClass.exercise_title,
            matchingClass.exercise_2_title,
            matchingClass.exercise_3_title,
            matchingClass.exercise_4_title,
        ].indexOf(id);

        const exerciseVideoUrls = [
            matchingClass.exercize_video,
            matchingClass.exercize_2_video,
            matchingClass.exercize_3_video,
            matchingClass.exercize_4_video,
        ];

        const exercisePdfs = [
            matchingClass.exercize_pdfs[0],
            matchingClass.exercize_pdfs[1],
            matchingClass.exercize_pdfs[2],
            matchingClass.exercize_pdfs[3],
        ];

        const exerciseTitle = [
            matchingClass.exercise_title,
            matchingClass.exercise_2_title,
            matchingClass.exercise_3_title,
            matchingClass.exercise_4_title,
        ];

        // Transform the data to the desired format
        const transformedData = {
            id: matchingClass.id,
            title: exerciseTitle[exerciseIndex],
            content: "", // Assuming content is not provided in your schema
            slug: matchingClass.id.toString(),
            class_text: matchingClass.class_text || "",
            class_video_url: exerciseVideoUrls[exerciseIndex] || "",
            class_week_description:
                matchingClass.exercise_week_description || "",
            class_document_1: exercisePdfs[exerciseIndex] || false,
            class_document_2: matchingClass.class_document_2 || false,
            class_document_3: matchingClass.class_document_3 || false,
        };

        return transformedData;
    }
}
