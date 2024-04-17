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
    const response = await fetch(`${baseURL}/ce/v1/krc_classes`);

    // we need id, title and some kind of slug
    if (!response.ok) {
        throw json(
            { message: "Could not fetch classes." },
            {
                status: 500,
            }
        );
    } else {
        const classesData = await response.json();

        const allExercises = [];

        classesData.forEach((classItem) => {
            if (classItem.exercize_video || classItem.exercize_pdf) {
                allExercises.push({
                    title: classItem.exercise_title,
                    slug: classItem.exercise_title,
                });
            }

            if(classItem.exercize_pdfs[1]) {
                allExercises.push({
                    title: classItem.exercise_2_title,
                    slug: classItem.exercise_2_title,
                });
            }
            if(classItem.exercize_pdfs[2]) {
                allExercises.push({
                    title: classItem.exercise_3_title,
                    slug: classItem.exercise_3_title,
                });
            }
            if(classItem.exercize_pdfs[3]) {
                allExercises.push({
                    title: classItem.exercise_4_title,
                    slug: classItem.exercise_4_title,
                });
            }
        });
        console.log(allExercises);
        return allExercises;
    }
}
