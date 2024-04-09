import { Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../App";
import { json, useLoaderData } from "react-router-dom";
import DetailComp from "../../components/detailComp/DetailComp";
import UpdatedDetailedComp from "../../components/detailComp/UpdatedDetailedComp";
import store from "../../store";
import { UIActions } from "../../store/ui";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ClassesDetailPage = () => {
    const { classId } = useParams(); // This is the URL parameter
    const singleClass = useLoaderData();
    const [isValidClass, setIsValidClass] = useState(false); // State to track if the class is valid

    useEffect(() => {
        // Check if singleClass has a matching class_number with classId
        if (singleClass && singleClass.class_number.toString() === classId) {
            setIsValidClass(true); // Set to true if they match
        } else {
            setIsValidClass(false); // Set to false if they don't match or singleClass is undefined
        }
    }, [classId, singleClass]); // Depend on classId and singleClass

    const loading = useSelector((state) => state.ui.isLoading);

    return (
        // <>
        //     <Toolbar />
        //     <UpdatedDetailedComp data={singleClass} loading={loading} />
        // </>
        <>
            <Toolbar />
            {isValidClass ? (
                <UpdatedDetailedComp data={singleClass} loading={loading} />
            ) : (
                // Optionally, render something else if the class is not valid
                <div>Loading or class not found...</div>
            )}
        </>
    );
};

export default ClassesDetailPage;

export async function loader({ params }) {
    const id = params.classId;
    // const id = localStorage.getItem("selectedClassNumber")
    store.dispatch(UIActions.isLoading(true));

    const response = await fetch(`${baseURL}/ce/v1/krc_classes`);

    if (!response.ok) {
        console.log("first er");

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

        const transformedData = { ...classData };
        // console.log(transformedData);
        store.dispatch(UIActions.isLoading(false));
        // localStorage.removeItem("selectedClassNumber");
        return transformedData;
    }
}
