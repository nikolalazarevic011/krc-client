import { Toolbar } from "@mui/material";
import React from "react";
import { baseURL } from "../../App";
import { json, useLoaderData } from "react-router-dom";
import DetailComp from "../../components/detailComp/DetailComp";

const ClassesDetailPage = () => {
    const singleClass = useLoaderData();

    return (
        <>
            <Toolbar />
            <DetailComp data={singleClass}/>
        </>
    );
};

export default ClassesDetailPage;

export async function loader({ params }) {
    const id = params.classId;

    const response = await fetch(`${baseURL}/ce/v1/krc_classes_name/` + id);

    if (!response.ok) {
        throw json(
            { message: "Could not fetch details for this class." },
            {
                status: 500,
            }
        );
    } else {
        return response;
    }
}
