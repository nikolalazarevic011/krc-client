import React, { useEffect, useState } from "react";
import { baseURL } from "../App";
import store from "../store";
import { UIActions } from "../store/ui";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import UpdatedDetailedComp from "../components/home and classes page/UpdatedDetailedComp";

const HomePage = () => {
    const data = useLoaderData();
    const loading = useSelector((state) => state.ui.isLoading);

    return (
        <>
            <UpdatedDetailedComp data={data} loading={loading} />
        </>
    );
};

export default HomePage;

export async function loader() {
    store.dispatch(UIActions.isLoading(true));

    const url1 = `${baseURL}/ce/v1/krc_classes`;

    try {
        // Execute the fetch request
        const response1 = await fetch(url1);

        // Check if the response is ok
        if (!response1.ok) {
            throw new Error("Failed to fetch class data");
        }

        // Parse the JSON response
        const data1 = await response1.json();

        // Function to find the object with the highest class_number in the data set
        const findHighestClassNumberObject = (dataSet) =>
            dataSet.reduce((max, item) => {
                const maxClassNumber = parseInt(max.class_number, 10);
                const currentItemClassNumber = parseInt(item.class_number, 10);
                return currentItemClassNumber > maxClassNumber ? item : max;
            }, dataSet[0]);

        // Find the object with the highest class_number in the dataset
        const newestClass = findHighestClassNumberObject(data1);

        // Return the object with the highest class_number
        const transformedData = {
            ...newestClass,
        };
        store.dispatch(UIActions.isLoading(false));
        return transformedData;
    } catch (error) {
        // Handle any errors that occurred during fetch or JSON parsing
        throw new Error(error.message);
    }
}
