import { Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../App";
import { json, useLoaderData } from "react-router-dom";
import UpdatedDetailedComp from "../../components/home and classes page/UpdatedDetailedComp";
import store from "../../store";
import { UIActions } from "../../store/ui";
import { useSelector } from "react-redux";

const ClassesDetailPage = () => {
    const singleClass = useLoaderData();

    const loading = useSelector((state) => state.ui.isLoading);

    return (
        <>
            <UpdatedDetailedComp data={singleClass} loading={loading} />
        </>
    );
};

export default ClassesDetailPage;

export async function loader({ params }) {
    const id = params.classId;
    store.dispatch(UIActions.isLoading(true));

    const response = await fetch(`${baseURL}/ce/v1/krc_classes`);

    if (!response.ok) {
        throw json(
            { message: "Could not fetch details for this class." },
            {
                status: 500,
            }
        );
    } else {
        const data = await response.json();

        // Find the class with the matching class_number
        const classData = data.find(
            (cls) => cls.class_number.toString() === id
        );

        if (!classData) {
            throw json({ message: `Class with id ${id} not found.` });
        }

        // Find the highest class_number
        const highestClassNumber = Math.max(
            ...data.map((cls) => parseInt(cls.class_number))
        );

        const transformedData = {
            ...classData,
            newestClass: highestClassNumber.toString(),
        };

        store.dispatch(UIActions.isLoading(false));
        return transformedData;
    }
}
